# -*- coding: utf-8 -*-
# Copyright (c) 2015, ESS LLP and contributors
# For license information, please see license.txt


import dateutil
import frappe
from erpnext import get_default_currency
from erpnext.accounts.party import get_dashboard_info
from erpnext.selling.doctype.customer.customer import make_address
from frappe import _
from frappe.contacts.address_and_contact import load_address_and_contact
from frappe.contacts.doctype.contact.contact import get_default_contact
from frappe.model.document import Document
from frappe.model.naming import set_name_by_naming_series
from frappe.utils import cint, cstr, getdate
from frappe.utils.nestedset import get_root_of

from healthcare.healthcare.doctype.healthcare_settings.healthcare_settings import (
	get_income_account,
	get_receivable_account,
	send_registration_sms,
)


class Patient(Document):


	def validate(self):
		self.set_full_name()
		self.flags.is_new_doc = self.is_new()


	def after_insert(self):
		if frappe.db.get_single_value("Healthcare Settings", "collect_registration_fee"):
			frappe.db.set_value("Patient", self.name, "status", "Disabled")
		else:
			send_registration_sms(self)
		self.reload()

	def on_update(self):
		if frappe.db.get_single_value("Healthcare Settings", "link_customer_to_patient"):
			if self.customer:
				customer = frappe.get_doc("Customer", self.customer)
				if self.customer_group:
					customer.customer_group = self.customer_group
				if self.territory:
					customer.territory = self.territory
				customer.customer_name = self.patient_name
				customer.default_price_list = self.default_price_list
				customer.default_currency = self.default_currency
				customer.language = self.language
				customer.image = self.image
				customer.ignore_mandatory = True
				customer.save(ignore_permissions=True)
			else:
				create_customer(self)


		if self.flags.is_new_doc and self.get("address_line1"):
			make_address(self)

		if not self.user_id and self.email and self.invite_user:
			self.create_website_user()

		if self.customer:
			info = get_dashboard_info("Customer", self.customer, None)
			self.set_onload("dashboard_info", info)

	def set_full_name(self):
		if self.last_name:
			self.patient_name = " ".join(filter(None, [self.first_name, self.last_name]))
		else:
			self.patient_name = self.first_name

	def create_website_user(self):
		users = frappe.db.get_all(
			"User",
			fields=["email", "mobile_no"],
			or_filters={"email": self.email, "mobile_no": self.mobile},
		)
		if users and users[0]:
			frappe.throw(
				_(
					"User exists with Email {}, Mobile {}<br>Please check email / mobile or disable 'Invite as User' to skip creating User"
				).format(frappe.bold(users[0].email), frappe.bold(users[0].mobile_no)),
				frappe.DuplicateEntryError,
			)

		user = frappe.get_doc(
			{
				"doctype": "User",
				"first_name": self.first_name,
				"last_name": self.last_name,
				"email": self.email,
				"user_type": "Website User",
				"gender": self.sex,
				"phone": self.phone,
				"mobile_no": self.mobile,
				"birth_date": self.dob,
			}
		)
		user.flags.ignore_permissions = True
		user.enabled = True
		user.send_welcome_email = True
		user.add_roles("Patient")
		self.db_set("user_id", user.name)

	def autoname(self):
		patient_name_by = frappe.db.get_single_value("Healthcare Settings", "patient_name_by")
		if patient_name_by == "Patient Name":
			self.name = self.get_patient_name()
		else:
			set_name_by_naming_series(self)

	def get_patient_name(self):
		self.set_full_name()
		name = self.patient_name
		if frappe.db.get_value("Patient", name):
			count = frappe.db.sql(
				"""select ifnull(MAX(CAST(SUBSTRING_INDEX(name, ' ', -1) AS UNSIGNED)), 0) from tabPatient
				 where name like %s""",
				"%{0} - %".format(name),
				as_list=1,
			)[0][0]
			count = cint(count) + 1
			return "{0} - {1}".format(name, cstr(count))

		return name

	@property
	def age(self):
		if not self.dob:
			return
		dob = getdate(self.dob)
		age = dateutil.relativedelta.relativedelta(getdate(), dob)
		return age

	def get_age(self):
		age = self.age
		if not age:
			return
		age_str = f'{str(age.years)} {_("Year(s)")} {str(age.months)} {_("Month(s)")} {str(age.days)} {_("Day(s)")}'
		return age_str



@frappe.whitelist()
def get_patient_detail(patient):
	patient_dict = frappe.db.sql("""select * from tabPatient where name=%s""", (patient), as_dict=1)
	if not patient_dict:
		frappe.throw(_("Patient not found"))
	vital_sign = frappe.db.sql(
		"""select * from `tabVital Signs` where patient=%s
		order by signs_date desc limit 1""",
		(patient),
		as_dict=1,
	)

	details = patient_dict[0]
	return details


