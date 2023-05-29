// Copyright (c) 2016, ESS LLP and contributors
// For license information, please see license.txt
frappe.provide('erpnext.queries');
frappe.ui.form.on('Patient Appointment', {
	setup: function(frm) {
		if (frappe.user.has_role('Physician')) {
			frm.custom_make_buttons = {
				'Vital Signs': 'Vital Signs',
				'Patient Encounter': 'Patient Encounter'
			};
		}
	},

	onload: function(frm) {
		if (frm.is_new()) {
			frm.set_value('appointment_time', null);
			frm.disable_save();
		}
	},

	refresh: function(frm) {
		frm.set_query('patient', function() {
			return {
				filters: { 'status': 'Active' }
			};
		});

		frm.set_query('practitioner', function() {
			if (frm.doc.department) {
				return {
					filters: {
						'department': frm.doc.department
					}
				};
			}
		});

		frm.set_query('service_unit', function() {
			return {
				query: 'healthcare.controllers.queries.get_healthcare_service_units',
				filters: {
					company: frm.doc.company,
					inpatient_record: frm.doc.inpatient_record
				}
			};
		});

		frm.set_query('therapy_plan', function() {
			return {
				filters: {
					'patient': frm.doc.patient
				}
			};
		});

		frm.trigger('set_therapy_type_filter');

		if (frm.is_new()) {
			frm.page.set_primary_action(__('Check Availability'), function() {
				if (!frm.doc.patient) {
					frappe.msgprint({
						title: __('Not Allowed'),
						message: __('Please select Patient first'),
						indicator: 'red'
					});
				} else {
					frappe.call({
						method: 'healthcare.healthcare.doctype.patient_appointment.patient_appointment.check_payment_fields_reqd',
						args: { 'patient': frm.doc.patient },
						callback: function(data) {

								check_and_set_availability(frm);
							
						}
					});
				}
			});
		} else {
			frm.page.set_primary_action(__('Save'), () => frm.save());
		}

		if (frm.doc.patient) {
			if (frappe.user.has_role('Physician')) {
			frm.add_custom_button(__('Patient History'), function() {
				frappe.route_options = { 'patient': frm.doc.patient };
				frappe.set_route('patient_history');
			}, __('View'));
			}
		}

		if (frm.doc.status == 'Open' || (frm.doc.status == 'Scheduled' && !frm.doc.__islocal)) {
			
				frm.add_custom_button(__('Cancel'), function() {
					update_status(frm, 'Cancelled');
				});
				frm.add_custom_button(__('Reschedule'), function() {
					check_and_set_availability(frm);
				});
			if (frappe.user.has_role('Physician')) {
				if (frm.doc.procedure_template) {
					frm.add_custom_button(__('Clinical Procedure'), function() {
						frappe.model.open_mapped_doc({
							method: 'healthcare.healthcare.doctype.clinical_procedure.clinical_procedure.make_procedure',
							frm: frm,
						});
					}, __('Create'));
				} else if (frm.doc.therapy_type) {
					frm.add_custom_button(__('Therapy Session'), function() {
						frappe.model.open_mapped_doc({
							method: 'healthcare.healthcare.doctype.therapy_session.therapy_session.create_therapy_session',
							frm: frm,
						})
					}, 'Create');
				} else {
					frm.add_custom_button(__('Patient Encounter'), function() {
						frappe.model.open_mapped_doc({
							method: 'healthcare.healthcare.doctype.patient_appointment.patient_appointment.make_encounter',
							frm: frm,
						});
					}, __('Create'));
				}

				frm.add_custom_button(__('Vital Signs'), function() {
					create_vital_signs(frm);
				}, __('Create'));
			}
		}
	},

	patient: function(frm) {
		if (frm.doc.patient) {
			frm.trigger('toggle_payment_fields');
			frappe.call({
				method: 'frappe.client.get',
				args: {
					doctype: 'Patient',
					name: frm.doc.patient
				},
				callback: function(data) {
					let age = null;
					if (data.message.dob) {
						age = calculate_age(data.message.dob);
					}
					frappe.model.set_value(frm.doctype, frm.docname, 'patient_age', age);
				}
			});
		} else {
			frm.set_value('patient_name', '');
			frm.set_value('patient_sex', '');
			frm.set_value('patient_age', '');
			frm.set_value('inpatient_record', '');
		}
	},

	practitioner: function(frm) {
		if (frm.doc.practitioner) {
		}
	},

	appointment_type: function(frm) {
		if (frm.doc.appointment_type) {
		}
	},



});

let check_and_set_availability = function(frm) {
	let selected_slot = null;
	let service_unit = null;
	let duration = null;
	let overlap_appointments = null;
	let counter = 0;


	show_availability();

	function show_empty_state(practitioner, appointment_date) {
		frappe.msgprint({
			title: __('Not Available'),
			message: __('Healthcare Practitioner {0} not available on {1}', [practitioner.bold(), appointment_date.bold()]),
			indicator: 'red'
		});
	}

	function show_availability() {
		let selected_practitioner = '';
		let d = new frappe.ui.Dialog({
			title: __('Available slots'),
			fields: [
				{ fieldtype: 'Link', options: 'Medical Department', reqd: 1, fieldname: 'department', label: 'Medical Department' },
				{ fieldtype: 'Column Break' },
				{ fieldtype: 'Link', options: 'Healthcare Practitioner', reqd: 1, fieldname: 'practitioner', label: 'Healthcare Practitioner' },
				{ fieldtype: 'Column Break' },
				{ fieldtype: 'Date', reqd: 1, fieldname: 'appointment_date', label: 'Date', min_date: new Date(frappe.datetime.get_today()) },
				{ fieldtype: 'Section Break' },
				{ fieldtype: 'HTML', fieldname: 'available_slots' },
			],
			secondary_action_label: __('Change Doctor'),
			primary_action_label: __('Book'),
			primary_action: function() {
				frm.set_value('appointment_time', selected_slot);


				if (!frm.doc.duration) {
					frm.set_value('duration', duration);
				}

				frm.set_value('practitioner', d.get_value('practitioner'));
				frm.set_value('department', d.get_value('department'));
				frm.set_value('appointment_date', d.get_value('appointment_date'));

				if (service_unit) {
					frm.set_value('service_unit', service_unit);
				}
				counter = 0;
				d.hide();
				frm.enable_save();
				frm.save();
				d.get_primary_btn().attr('disabled', true);
			},

			secondary_action: function(){
				counter ++;
				
				frappe.db.get_list('Healthcare Practitioner', {
					fields: ['department', 'practitioner_name', 'employee_id'],
					filters: {
						department: d.get_value('department')
					}
				}).then(records => {
	
					if (counter == parseInt(records.length)) {
						d.get_secondary_btn().attr('disabled', true);
					}else{
						d.set_values({'practitioner':''})
						d.set_values({'practitioner': records[counter].practitioner_name + ' - ' + records[counter].employee_id })
					}
				})
			}
		});

		d.set_values({
			'department': frm.doc.department,
			'appointment_date': frm.doc.appointment_date,

		});

		let selected_department = frm.doc.department;

		d.fields_dict['department'].df.onchange = () => {
			counter == 0;
			if (selected_department != d.get_value('department')) {
				/*d.set_values({
					'practitioner': ''
				});*/
				selected_department = d.get_value('department');
				counter = 0;
			}
			if (d.get_value('department')) {
				d.fields_dict.practitioner.get_query = function() {
					return {
						filters: {
							'department': selected_department
						}
					};
				};

				frappe.db.get_list('Healthcare Practitioner', {
					fields: ['department', 'practitioner_name', 'employee_id'],
					filters: {
						department: selected_department
					}
				}).then(records => {
					d.set_values({'practitioner': records[0].practitioner_name + ' - ' + records[0].employee_id })

				})
				counter = 0;
			}

			d.get_secondary_btn().attr('disabled', null);

		};

		
		// disable dialog action initially
		d.get_primary_btn().attr('disabled', null);

		// Field Change Handler

		let fd = d.fields_dict;

		d.fields_dict['appointment_date'].df.onchange = () => {
			show_slots(d, fd);
		};
		d.fields_dict['practitioner'].df.onchange = () => {
			if (d.get_value('practitioner') && d.get_value('practitioner') != selected_practitioner) {
				selected_practitioner = d.get_value('practitioner');
				show_slots(d, fd);
			}
		};

		d.show();
	}


	function show_slots(d, fd) {
		if (d.get_value('appointment_date') && d.get_value('practitioner')) {
			fd.available_slots.html('');
			frappe.call({
				method: 'healthcare.healthcare.doctype.patient_appointment.patient_appointment.get_availability_data',
				args: {
					practitioner: d.get_value('practitioner'),
					date: d.get_value('appointment_date'),
					appointment: frm.doc
				},
				callback: (r) => {
					let data = r.message;
					if (data.slot_details.length > 0) {
						let $wrapper = d.fields_dict.available_slots.$wrapper;

						// make buttons for each slot
						let slot_html = get_slots(data.slot_details, d.get_value('appointment_date'));

						$wrapper
							.css('margin-bottom', 0)
							.addClass('text-center')
							.html(slot_html);

						// highlight button when clicked
						$wrapper.on('click', 'button', function() {
							let $btn = $(this);
							$wrapper.find('button').removeClass('btn-outline-primary');
							$btn.addClass('btn-outline-primary');
							selected_slot = $btn.attr('data-name');
							service_unit = $btn.attr('data-service-unit');
							duration = $btn.attr('data-duration');
							overlap_appointments = parseInt($btn.attr('data-overlap-appointments'));
							// show option to opt out of tele conferencing
							if ($btn.attr('data-tele-conf') == 1) {
								if (d.$wrapper.find(".opt-out-conf-div").length) {
									d.$wrapper.find(".opt-out-conf-div").show();
								} else {
									overlap_appointments ?
										d.footer.prepend(
											`<div class="opt-out-conf-div ellipsis text-muted" style="vertical-align:text-bottom;">
												<label>
													<span class="label-area">
													${__("Video Conferencing disabled for group consultations")}
													</span>
												</label>
											</div>`
										)
									:
										d.footer.prepend(
											`<div class="opt-out-conf-div ellipsis" style="vertical-align:text-bottom;">
											<label>
												<input type="checkbox" class="opt-out-check"/>
												<span class="label-area">
												${__("Do not add Video Conferencing")}
												</span>
											</label>
										</div>`
										);
								}
							} else {
								d.$wrapper.find(".opt-out-conf-div").hide();
							}

							// enable primary action 'Book'
							d.get_primary_btn().attr('disabled', null);
						});

					} else {
						//	fd.available_slots.html('Please select a valid date.'.bold())
						show_empty_state(d.get_value('practitioner'), d.get_value('appointment_date'));
					}
				},
				freeze: true,
				freeze_message: __('Fetching Schedule...')
			});
		} else {
			fd.available_slots.html(__('Appointment date and Healthcare Practitioner are Mandatory').bold());
		}
	}

	function get_slots(slot_details, appointment_date) {
		let slot_html = '';
		let appointment_count = 0;
		let disabled = false;
		let start_str, slot_start_time, slot_end_time, interval, count, count_class, tool_tip, available_slots;

		slot_details.forEach((slot_info) => {
			slot_html += `<div class="slot-info">`;


			slot_html += `
				<span><b>
				${__('Practitioner Schedule: ')} </b> ${slot_info.slot_name}
					${slot_info.tele_conf && !slot_info.allow_overlap ? '<i class="fa fa-video-camera fa-1x" aria-hidden="true"></i>' : ''}
				</span><br>
				<span><b> ${__('Service Unit: ')} </b> ${slot_info.service_unit}</span>`;

			if (slot_info.service_unit_capacity) {
				slot_html += `<br><span> <b> ${__('Maximum Capacity:')} </b> ${slot_info.service_unit_capacity} </span>`;
			}

			slot_html += '</div><br>';

			slot_html += slot_info.avail_slot.map(slot => {
				appointment_count = 0;
				disabled = false;
				count_class = tool_tip = '';
				start_str = slot.from_time;
				slot_start_time = moment(slot.from_time, 'HH:mm:ss');
				slot_end_time = moment(slot.to_time, 'HH:mm:ss');
				interval = (slot_end_time - slot_start_time) / 60000 | 0;

				// restrict past slots based on the current time.
				let now = moment();
				if((now.format("YYYY-MM-DD") == appointment_date) && slot_start_time.isBefore(now)){
					disabled = true;
				} else {
					// iterate in all booked appointments, update the start time and duration
					slot_info.appointments.forEach((booked) => {
						let booked_moment = moment(booked.appointment_time, 'HH:mm:ss');
						let end_time = booked_moment.clone().add(booked.duration, 'minutes');

						// Deal with 0 duration appointments
						if (booked_moment.isSame(slot_start_time) || booked_moment.isBetween(slot_start_time, slot_end_time)) {
							if (booked.duration == 0) {
								disabled = true;
								return false;
							}
						}

						// Check for overlaps considering appointment duration
						if (slot_info.allow_overlap != 1) {
							if (slot_start_time.isBefore(end_time) && slot_end_time.isAfter(booked_moment)) {
								// There is an overlap
								disabled = true;
								return false;
							}
						} else {
							if (slot_start_time.isBefore(end_time) && slot_end_time.isAfter(booked_moment)) {
								appointment_count++;
							}
							if (appointment_count >= slot_info.service_unit_capacity) {
								// There is an overlap
								disabled = true;
								return false;
							}
						}
					});
				}

				if (slot_info.allow_overlap == 1 && slot_info.service_unit_capacity > 1) {
					available_slots = slot_info.service_unit_capacity - appointment_count;
					count = `${(available_slots > 0 ? available_slots : __('Full'))}`;
					count_class = `${(available_slots > 0 ? 'badge-success' : 'badge-danger')}`;
					tool_tip =`${available_slots} ${__('slots available for booking')}`;
				}

				return `
					<button class="btn btn-secondary" data-name=${start_str}
						data-duration=${interval}
						data-service-unit="${slot_info.service_unit || ''}"
						data-tele-conf="${slot_info.tele_conf || 0}"
						data-overlap-appointments="${slot_info.service_unit_capacity || 0}"
						style="margin: 0 10px 10px 0; width: auto;" ${disabled ? 'disabled="disabled"' : ""}
						data-toggle="tooltip" title="${tool_tip || ''}">
						${start_str.substring(0, start_str.length - 3)}
						${slot_info.service_unit_capacity ? `<br><span class='badge ${count_class}'> ${count} </span>` : ''}
					</button>`;

			}).join("");

			if (slot_info.service_unit_capacity) {
				slot_html += `<br/><small>${__('Each slot indicates the capacity currently available for booking')}</small>`;
			}
			slot_html += `<br/><br/>`;
		});

		return slot_html;
	}
};




let create_vital_signs = function(frm) {
	if (frappe.user.has_role('Physician')) {
		if (!frm.doc.patient) {
			frappe.throw(__('Please select patient'));
		}
		frappe.route_options = {
			'patient': frm.doc.patient,
			'appointment': frm.doc.name,
			'company': frm.doc.company
		};
		frappe.new_doc('Vital Signs');
	}
};

let update_status = function(frm, status) {
	let doc = frm.doc;
	frappe.confirm(__('Are you sure you want to cancel this appointment?'),
		function() {
			frappe.call({
				method: 'healthcare.healthcare.doctype.patient_appointment.patient_appointment.update_status',
				args: { appointment_id: doc.name, status: status },
				callback: function(data) {
					if (!data.exc) {
						frm.reload_doc();
					}
				}
			});
		}
	);
};

let calculate_age = function(birth) {
	let ageMS = Date.parse(Date()) - Date.parse(birth);
	let age = new Date();
	age.setTime(ageMS);
	let years =  age.getFullYear() - 1970;
	return `${years} ${__('Years(s)')} ${age.getMonth()} ${__('Month(s)')} ${age.getDate()} ${__('Day(s)')}`;
};