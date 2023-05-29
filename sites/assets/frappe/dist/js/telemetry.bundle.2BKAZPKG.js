(() => {
  // frappe/public/js/lib/posthog.js
  !function(t, e) {
    var o, n, p, r;
    e.__SV || (window.posthog = e, e._i = [], e.init = function(i, s, a) {
      function g(t2, e2) {
        var o2 = e2.split(".");
        o2.length == 2 && (t2 = t2[o2[0]], e2 = o2[1]), t2[e2] = function() {
          t2.push([e2].concat(Array.prototype.slice.call(arguments, 0)));
        };
      }
      (p = t.createElement("script")).type = "text/javascript", p.async = true, p.src = s.api_host + "/static/array.js", (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
      var u = e;
      for (a !== void 0 ? u = e[a] = [] : a = "posthog", u.people = u.people || [], u.toString = function(t2) {
        var e2 = "posthog";
        return a !== "posthog" && (e2 += "." + a), t2 || (e2 += " (stub)"), e2;
      }, u.people.toString = function() {
        return u.toString(1) + ".people (stub)";
      }, o = "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "), n = 0; n < o.length; n++)
        g(u, o[n]);
      e._i.push([i, s, a]);
    }, e.__SV = 1);
  }(document, window.posthog || []);

  // frappe/public/js/telemetry/index.js
  var TelemetryManager = class {
    constructor() {
      this.enabled = false;
      this.project_id = frappe.boot.posthog_project_id;
      this.telemetry_host = frappe.boot.posthog_host;
      if (cint(frappe.boot.enable_telemetry) && this.project_id && this.telemetry_host) {
        this.enabled = true;
      }
    }
    initialize() {
      if (!this.enabled)
        return;
      try {
        posthog.init(this.project_id, {
          api_host: this.telemetry_host,
          autocapture: false,
          capture_pageview: false,
          capture_pageleave: false,
          advanced_disable_decide: true
        });
        posthog.identify(frappe.boot.sitename);
        this.send_heartbeat();
      } catch (e) {
        console.trace("Failed to initialize telemetry", e);
        this.enabled = false;
      }
    }
    capture(event, app) {
      if (!this.enabled)
        return;
      posthog.capture(`${app}_${event}`);
    }
    disable() {
      this.enabled = false;
      posthog.opt_out_capturing();
    }
    send_heartbeat() {
      const KEY = "ph_last_heartbeat";
      const now = frappe.datetime.system_datetime(true);
      const last = localStorage.getItem(KEY);
      if (!last || moment(now).diff(moment(last), "hours") > 12) {
        localStorage.setItem(KEY, now.toISOString());
        this.capture("heartbeat", "frappe");
      }
    }
  };
  frappe.telemetry = new TelemetryManager();
  frappe.telemetry.initialize();
})();
//# sourceMappingURL=telemetry.bundle.2BKAZPKG.js.map
