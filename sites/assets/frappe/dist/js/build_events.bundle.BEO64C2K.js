(() => {
  // frappe/public/js/frappe/build_events/BuildError.vue
  var __vue_script__ = {
    name: "BuildError",
    data() {
      return {
        data: null
      };
    },
    methods: {
      show(data) {
        this.data = data;
      },
      hide() {
        this.data = null;
      },
      open_in_editor(location) {
        frappe.socketio.socket.emit("open_in_editor", location);
      },
      error_component(error2, i) {
        let location = this.data.error.errors[i].location;
        let location_string = `${location.file}:${location.line}:${location.column}`;
        let template = error2.replace(" > " + location_string, ` &gt; <a class="file-link" @click="open">${location_string}</a>`);
        return {
          template: `<div>${template}</div>`,
          methods: {
            open() {
              frappe.socketio.socket.emit("open_in_editor", location);
            }
          }
        };
      }
    }
  };
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", {
      directives: [
        { name: "show", rawName: "v-show", value: _vm.data, expression: "data" }
      ],
      staticClass: "build-error-overlay",
      on: {
        click: function($event) {
          if ($event.target !== $event.currentTarget) {
            return null;
          }
          _vm.data = null;
        }
      }
    }, [
      _vm.data ? _c("div", { staticClass: "window" }, [
        _vm._l(_vm.data.formatted, function(error2, i) {
          return _c("div", { key: i }, [
            _c("pre", { staticClass: "frame" }, [_c(_vm.error_component(error2, i), { tag: "component" })], 1)
          ]);
        }),
        _vm._v(" "),
        _c("pre", { staticClass: "stack" }, [
          _vm._v(_vm._s(_vm.data.stack))
        ])
      ], 2) : _vm._e()
    ]);
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  var __vue_inject_styles__ = function(inject) {
    if (!inject)
      return;
    inject("data-v-0b3de6b7_0", { source: '\n.build-error-overlay {\n	position: fixed;\n	top: 0;\n	left: 0;\n	width: 100%;\n	height: 100%;\n	z-index: 9999;\n	margin: 0;\n	background: rgba(0, 0, 0, 0.66);\n	--monospace: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,\n		monospace;\n	--dim: var(--gray-400);\n}\n.window {\n	font-family: var(--monospace);\n	line-height: 1.5;\n	width: 800px;\n	color: #d8d8d8;\n	margin: 30px auto;\n	padding: 25px 40px;\n	position: relative;\n	background: #181818;\n	border-radius: 6px 6px 8px 8px;\n	box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);\n	overflow: hidden;\n	border-top: 8px solid var(--red);\n}\npre {\n	font-family: var(--monospace);\n	font-size: 13px;\n	margin-top: 0;\n	margin-bottom: 1em;\n	overflow-x: auto;\n	scrollbar-width: none;\n}\ncode {\n	font-size: 13px;\n	font-family: var(--monospace);\n	color: var(--yellow);\n}\n.message {\n	line-height: 1.3;\n	font-weight: 600;\n	white-space: pre-wrap;\n}\n.frame {\n	color: var(--yellow);\n}\n.stack {\n	font-size: 13px;\n	color: var(--dim);\n}\n.file-link {\n	text-decoration: underline !important;\n	cursor: pointer;\n}\n', map: { "version": 3, "sources": ["frappe/public/js/frappe/build_events/BuildError.vue"], "names": [], "mappings": ";AAoDA;CACA,eAAA;CACA,MAAA;CACA,OAAA;CACA,WAAA;CACA,YAAA;CACA,aAAA;CACA,SAAA;CACA,+BAAA;CACA;WACA;CACA,sBAAA;AACA;AACA;CACA,6BAAA;CACA,gBAAA;CACA,YAAA;CACA,cAAA;CACA,iBAAA;CACA,kBAAA;CACA,kBAAA;CACA,mBAAA;CACA,8BAAA;CACA,2EAAA;CACA,gBAAA;CACA,gCAAA;AACA;AAEA;CACA,6BAAA;CACA,eAAA;CACA,aAAA;CACA,kBAAA;CACA,gBAAA;CACA,qBAAA;AACA;AACA;CACA,eAAA;CACA,6BAAA;CACA,oBAAA;AACA;AAEA;CACA,gBAAA;CACA,gBAAA;CACA,qBAAA;AACA;AACA;CACA,oBAAA;AACA;AACA;CACA,eAAA;CACA,iBAAA;AACA;AACA;CACA,qCAAA;CACA,eAAA;AACA", "file": "BuildError.vue", "sourcesContent": ['<template>\n	<div class="build-error-overlay" @click.self="data = null" v-show="data">\n		<div class="window" v-if="data">\n			<div v-for="(error, i) in data.formatted" :key="i">\n				<!-- prettier-ignore -->\n				<pre class="frame"><component :is="error_component(error, i)" /></pre>\n			</div>\n			<pre class="stack">{{ data.stack }}</pre>\n		</div>\n	</div>\n</template>\n<script>\nexport default {\n	name: "BuildError",\n	data() {\n		return {\n			data: null\n		};\n	},\n	methods: {\n		show(data) {\n			this.data = data;\n		},\n		hide() {\n			this.data = null;\n		},\n		open_in_editor(location) {\n			frappe.socketio.socket.emit("open_in_editor", location);\n		},\n		error_component(error, i) {\n			let location = this.data.error.errors[i].location;\n			let location_string = `${location.file}:${location.line}:${\n				location.column\n			}`;\n			let template = error.replace(\n				" > " + location_string,\n				` &gt; <a class="file-link" @click="open">${location_string}</a>`\n			);\n\n			return {\n				template: `<div>${template}</div>`,\n				methods: {\n					open() {\n						frappe.socketio.socket.emit("open_in_editor", location);\n					}\n				}\n			};\n		}\n	}\n};\n<\/script>\n<style>\n.build-error-overlay {\n	position: fixed;\n	top: 0;\n	left: 0;\n	width: 100%;\n	height: 100%;\n	z-index: 9999;\n	margin: 0;\n	background: rgba(0, 0, 0, 0.66);\n	--monospace: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,\n		monospace;\n	--dim: var(--gray-400);\n}\n.window {\n	font-family: var(--monospace);\n	line-height: 1.5;\n	width: 800px;\n	color: #d8d8d8;\n	margin: 30px auto;\n	padding: 25px 40px;\n	position: relative;\n	background: #181818;\n	border-radius: 6px 6px 8px 8px;\n	box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);\n	overflow: hidden;\n	border-top: 8px solid var(--red);\n}\n\npre {\n	font-family: var(--monospace);\n	font-size: 13px;\n	margin-top: 0;\n	margin-bottom: 1em;\n	overflow-x: auto;\n	scrollbar-width: none;\n}\ncode {\n	font-size: 13px;\n	font-family: var(--monospace);\n	color: var(--yellow);\n}\n\n.message {\n	line-height: 1.3;\n	font-weight: 600;\n	white-space: pre-wrap;\n}\n.frame {\n	color: var(--yellow);\n}\n.stack {\n	font-size: 13px;\n	color: var(--dim);\n}\n.file-link {\n	text-decoration: underline !important;\n	cursor: pointer;\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__ = void 0;
  var __vue_module_identifier__ = void 0;
  var __vue_is_functional_template__ = false;
  function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "frappe/public/js/frappe/build_events/BuildError.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function(context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__() {
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;
        style.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style.element = style.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index = parseInt(style.element.getAttribute("data-next-index"));
          style.element.setAttribute("data-next-index", index + 1);
        }
        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index])
            style.element.removeChild(nodes[index]);
          if (nodes.length)
            style.element.insertBefore(textNode, nodes[index]);
          else
            style.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__ = /* @__PURE__ */ __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, __vue_create_injector__, void 0, void 0);
  var BuildError_default = __vue_component__;

  // frappe/public/js/frappe/build_events/BuildSuccess.vue
  var __vue_script__2 = {
    name: "BuildSuccess",
    data() {
      return {
        is_shown: false,
        live_reload: false
      };
    },
    methods: {
      show(data) {
        if (data.live_reload) {
          this.live_reload = true;
          this.reload();
        }
        this.is_shown = true;
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
          this.hide();
        }, 1e4);
      },
      hide() {
        this.is_shown = false;
      },
      reload() {
        window.location.reload();
      }
    }
  };
  var __vue_render__2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.is_shown ? _c("div", {
      staticClass: "flex justify-between build-success-message align-center"
    }, [
      _vm._v("\n	Compiled successfully\n	"),
      !_vm.live_reload ? _c("a", {
        staticClass: "ml-4 text-white underline",
        attrs: { href: "/" },
        on: {
          click: function($event) {
            $event.preventDefault();
            return _vm.reload.apply(null, arguments);
          }
        }
      }, [_vm._v("\n		Refresh\n	")]) : _vm._e()
    ]) : _vm._e();
  };
  var __vue_staticRenderFns__2 = [];
  __vue_render__2._withStripped = true;
  var __vue_inject_styles__2 = function(inject) {
    if (!inject)
      return;
    inject("data-v-702ce366_0", { source: "\n.build-success-message {\n	position: fixed;\n	z-index: 9999;\n	bottom: 0;\n	right: 0;\n	background: rgba(0, 0, 0, 0.6);\n	border-radius: var(--border-radius);\n	padding: 0.5rem 1rem;\n	color: white;\n	font-weight: 500;\n	margin: 1rem;\n}\n", map: { "version": 3, "sources": ["frappe/public/js/frappe/build_events/BuildSuccess.vue"], "names": [], "mappings": ";AAgDA;CACA,eAAA;CACA,aAAA;CACA,SAAA;CACA,QAAA;CACA,8BAAA;CACA,mCAAA;CACA,oBAAA;CACA,YAAA;CACA,gBAAA;CACA,YAAA;AACA", "file": "BuildSuccess.vue", "sourcesContent": ['<template>\n	<div\n		v-if="is_shown"\n		class="flex justify-between build-success-message align-center"\n	>\n		Compiled successfully\n		<a\n			v-if="!live_reload"\n			class="ml-4 text-white underline" href="/" @click.prevent="reload"\n		>\n			Refresh\n		</a>\n	</div>\n</template>\n<script>\nexport default {\n	name: "BuildSuccess",\n	data() {\n		return {\n			is_shown: false,\n			live_reload: false,\n		};\n	},\n	methods: {\n		show(data) {\n			if (data.live_reload) {\n				this.live_reload = true;\n				this.reload();\n			}\n\n			this.is_shown = true;\n			if (this.timeout) {\n				clearTimeout(this.timeout);\n			}\n			this.timeout = setTimeout(() => {\n				this.hide();\n			}, 10000);\n		},\n		hide() {\n			this.is_shown = false;\n		},\n		reload() {\n			window.location.reload();\n		}\n	}\n};\n<\/script>\n<style>\n.build-success-message {\n	position: fixed;\n	z-index: 9999;\n	bottom: 0;\n	right: 0;\n	background: rgba(0, 0, 0, 0.6);\n	border-radius: var(--border-radius);\n	padding: 0.5rem 1rem;\n	color: white;\n	font-weight: 500;\n	margin: 1rem;\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__2 = void 0;
  var __vue_module_identifier__2 = void 0;
  var __vue_is_functional_template__2 = false;
  function __vue_normalize__2(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "frappe/public/js/frappe/build_events/BuildSuccess.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function(context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__2() {
    const styles = __vue_create_injector__2.styles || (__vue_create_injector__2.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;
        style.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style.element = style.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index = parseInt(style.element.getAttribute("data-next-index"));
          style.element.setAttribute("data-next-index", index + 1);
        }
        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index])
            style.element.removeChild(nodes[index]);
          if (nodes.length)
            style.element.insertBefore(textNode, nodes[index]);
          else
            style.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__2 = /* @__PURE__ */ __vue_normalize__2({ render: __vue_render__2, staticRenderFns: __vue_staticRenderFns__2 }, __vue_inject_styles__2, __vue_script__2, __vue_scope_id__2, __vue_is_functional_template__2, __vue_module_identifier__2, false, __vue_create_injector__2, void 0, void 0);
  var BuildSuccess_default = __vue_component__2;

  // frappe/public/js/frappe/build_events/build_events.bundle.js
  var $container = $("#build-events-overlay");
  var success = null;
  var error = null;
  frappe.realtime.on("build_event", (data) => {
    if (data.success) {
      let changed_files = data.changed_files;
      if (Array.isArray(changed_files)) {
        for (let file of changed_files) {
          if (file.includes(".bundle.")) {
            let parts = file.split(".bundle.");
            if (parts.length === 2) {
              let filename = parts[0].split("/").slice(-1)[0];
              frappe.assets.executed_ = frappe.assets.executed_.filter((asset) => !asset.includes(`${filename}.bundle`));
            }
          }
        }
      }
      frappe.call("frappe.sessions.get_boot_assets_json").then((r) => {
        if (r.message) {
          frappe.boot.assets_json = r.message;
          if (frappe.hot_update) {
            frappe.hot_update.forEach((callback) => {
              callback();
            });
          }
        }
      });
      show_build_success(data);
    } else if (data.error) {
      show_build_error(data);
    }
  });
  function show_build_success(data) {
    if (error) {
      error.hide();
    }
    if (!success) {
      let target = $('<div class="build-success-container">').appendTo($container).get(0);
      let vm = new Vue({
        el: target,
        render: (h) => h(BuildSuccess_default)
      });
      success = vm.$children[0];
    }
    success.show(data);
  }
  function show_build_error(data) {
    if (success) {
      success.hide();
    }
    if (!error) {
      let target = $('<div class="build-error-container">').appendTo($container).get(0);
      let vm = new Vue({
        el: target,
        render: (h) => h(BuildError_default)
      });
      error = vm.$children[0];
    }
    error.show(data);
  }
})();
//# sourceMappingURL=build_events.bundle.BEO64C2K.js.map
