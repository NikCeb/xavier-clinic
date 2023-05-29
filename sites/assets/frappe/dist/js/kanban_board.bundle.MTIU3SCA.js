(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/vuex/dist/vuex.common.js
  var require_vuex_common = __commonJS({
    "node_modules/vuex/dist/vuex.common.js"(exports, module) {
      "use strict";
      function applyMixin(Vue2) {
        var version2 = Number(Vue2.version.split(".")[0]);
        if (version2 >= 2) {
          Vue2.mixin({ beforeCreate: vuexInit });
        } else {
          var _init = Vue2.prototype._init;
          Vue2.prototype._init = function(options) {
            if (options === void 0)
              options = {};
            options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
            _init.call(this, options);
          };
        }
        function vuexInit() {
          var options = this.$options;
          if (options.store) {
            this.$store = typeof options.store === "function" ? options.store() : options.store;
          } else if (options.parent && options.parent.$store) {
            this.$store = options.parent.$store;
          }
        }
      }
      var target = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
      var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;
      function devtoolPlugin(store) {
        if (!devtoolHook) {
          return;
        }
        store._devtoolHook = devtoolHook;
        devtoolHook.emit("vuex:init", store);
        devtoolHook.on("vuex:travel-to-state", function(targetState) {
          store.replaceState(targetState);
        });
        store.subscribe(function(mutation, state) {
          devtoolHook.emit("vuex:mutation", mutation, state);
        }, { prepend: true });
        store.subscribeAction(function(action, state) {
          devtoolHook.emit("vuex:action", action, state);
        }, { prepend: true });
      }
      function find(list, f) {
        return list.filter(f)[0];
      }
      function deepCopy(obj, cache) {
        if (cache === void 0)
          cache = [];
        if (obj === null || typeof obj !== "object") {
          return obj;
        }
        var hit = find(cache, function(c) {
          return c.original === obj;
        });
        if (hit) {
          return hit.copy;
        }
        var copy = Array.isArray(obj) ? [] : {};
        cache.push({
          original: obj,
          copy
        });
        Object.keys(obj).forEach(function(key) {
          copy[key] = deepCopy(obj[key], cache);
        });
        return copy;
      }
      function forEachValue(obj, fn) {
        Object.keys(obj).forEach(function(key) {
          return fn(obj[key], key);
        });
      }
      function isObject(obj) {
        return obj !== null && typeof obj === "object";
      }
      function isPromise(val) {
        return val && typeof val.then === "function";
      }
      function assert(condition, msg) {
        if (!condition) {
          throw new Error("[vuex] " + msg);
        }
      }
      function partial(fn, arg) {
        return function() {
          return fn(arg);
        };
      }
      var Module = function Module2(rawModule, runtime) {
        this.runtime = runtime;
        this._children = /* @__PURE__ */ Object.create(null);
        this._rawModule = rawModule;
        var rawState = rawModule.state;
        this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
      };
      var prototypeAccessors = { namespaced: { configurable: true } };
      prototypeAccessors.namespaced.get = function() {
        return !!this._rawModule.namespaced;
      };
      Module.prototype.addChild = function addChild(key, module2) {
        this._children[key] = module2;
      };
      Module.prototype.removeChild = function removeChild(key) {
        delete this._children[key];
      };
      Module.prototype.getChild = function getChild(key) {
        return this._children[key];
      };
      Module.prototype.hasChild = function hasChild(key) {
        return key in this._children;
      };
      Module.prototype.update = function update2(rawModule) {
        this._rawModule.namespaced = rawModule.namespaced;
        if (rawModule.actions) {
          this._rawModule.actions = rawModule.actions;
        }
        if (rawModule.mutations) {
          this._rawModule.mutations = rawModule.mutations;
        }
        if (rawModule.getters) {
          this._rawModule.getters = rawModule.getters;
        }
      };
      Module.prototype.forEachChild = function forEachChild(fn) {
        forEachValue(this._children, fn);
      };
      Module.prototype.forEachGetter = function forEachGetter(fn) {
        if (this._rawModule.getters) {
          forEachValue(this._rawModule.getters, fn);
        }
      };
      Module.prototype.forEachAction = function forEachAction(fn) {
        if (this._rawModule.actions) {
          forEachValue(this._rawModule.actions, fn);
        }
      };
      Module.prototype.forEachMutation = function forEachMutation(fn) {
        if (this._rawModule.mutations) {
          forEachValue(this._rawModule.mutations, fn);
        }
      };
      Object.defineProperties(Module.prototype, prototypeAccessors);
      var ModuleCollection = function ModuleCollection2(rawRootModule) {
        this.register([], rawRootModule, false);
      };
      ModuleCollection.prototype.get = function get(path) {
        return path.reduce(function(module2, key) {
          return module2.getChild(key);
        }, this.root);
      };
      ModuleCollection.prototype.getNamespace = function getNamespace(path) {
        var module2 = this.root;
        return path.reduce(function(namespace, key) {
          module2 = module2.getChild(key);
          return namespace + (module2.namespaced ? key + "/" : "");
        }, "");
      };
      ModuleCollection.prototype.update = function update$1(rawRootModule) {
        update([], this.root, rawRootModule);
      };
      ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
        var this$1 = this;
        if (runtime === void 0)
          runtime = true;
        if (true) {
          assertRawModule(path, rawModule);
        }
        var newModule = new Module(rawModule, runtime);
        if (path.length === 0) {
          this.root = newModule;
        } else {
          var parent = this.get(path.slice(0, -1));
          parent.addChild(path[path.length - 1], newModule);
        }
        if (rawModule.modules) {
          forEachValue(rawModule.modules, function(rawChildModule, key) {
            this$1.register(path.concat(key), rawChildModule, runtime);
          });
        }
      };
      ModuleCollection.prototype.unregister = function unregister(path) {
        var parent = this.get(path.slice(0, -1));
        var key = path[path.length - 1];
        var child = parent.getChild(key);
        if (!child) {
          if (true) {
            console.warn("[vuex] trying to unregister module '" + key + "', which is not registered");
          }
          return;
        }
        if (!child.runtime) {
          return;
        }
        parent.removeChild(key);
      };
      ModuleCollection.prototype.isRegistered = function isRegistered(path) {
        var parent = this.get(path.slice(0, -1));
        var key = path[path.length - 1];
        if (parent) {
          return parent.hasChild(key);
        }
        return false;
      };
      function update(path, targetModule, newModule) {
        if (true) {
          assertRawModule(path, newModule);
        }
        targetModule.update(newModule);
        if (newModule.modules) {
          for (var key in newModule.modules) {
            if (!targetModule.getChild(key)) {
              if (true) {
                console.warn("[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed");
              }
              return;
            }
            update(path.concat(key), targetModule.getChild(key), newModule.modules[key]);
          }
        }
      }
      var functionAssert = {
        assert: function(value) {
          return typeof value === "function";
        },
        expected: "function"
      };
      var objectAssert = {
        assert: function(value) {
          return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
        },
        expected: 'function or object with "handler" function'
      };
      var assertTypes = {
        getters: functionAssert,
        mutations: functionAssert,
        actions: objectAssert
      };
      function assertRawModule(path, rawModule) {
        Object.keys(assertTypes).forEach(function(key) {
          if (!rawModule[key]) {
            return;
          }
          var assertOptions = assertTypes[key];
          forEachValue(rawModule[key], function(value, type) {
            assert(assertOptions.assert(value), makeAssertionMessage(path, key, type, value, assertOptions.expected));
          });
        });
      }
      function makeAssertionMessage(path, key, type, value, expected) {
        var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
        if (path.length > 0) {
          buf += ' in module "' + path.join(".") + '"';
        }
        buf += " is " + JSON.stringify(value) + ".";
        return buf;
      }
      var Vue;
      var Store2 = function Store3(options) {
        var this$1 = this;
        if (options === void 0)
          options = {};
        if (!Vue && typeof window !== "undefined" && window.Vue) {
          install2(window.Vue);
        }
        if (true) {
          assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
          assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
          assert(this instanceof Store3, "store must be called with the new operator.");
        }
        var plugins = options.plugins;
        if (plugins === void 0)
          plugins = [];
        var strict = options.strict;
        if (strict === void 0)
          strict = false;
        this._committing = false;
        this._actions = /* @__PURE__ */ Object.create(null);
        this._actionSubscribers = [];
        this._mutations = /* @__PURE__ */ Object.create(null);
        this._wrappedGetters = /* @__PURE__ */ Object.create(null);
        this._modules = new ModuleCollection(options);
        this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
        this._subscribers = [];
        this._watcherVM = new Vue();
        this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
        var store = this;
        var ref = this;
        var dispatch = ref.dispatch;
        var commit = ref.commit;
        this.dispatch = function boundDispatch(type, payload) {
          return dispatch.call(store, type, payload);
        };
        this.commit = function boundCommit(type, payload, options2) {
          return commit.call(store, type, payload, options2);
        };
        this.strict = strict;
        var state = this._modules.root.state;
        installModule(this, state, [], this._modules.root);
        resetStoreVM(this, state);
        plugins.forEach(function(plugin) {
          return plugin(this$1);
        });
        var useDevtools = options.devtools !== void 0 ? options.devtools : Vue.config.devtools;
        if (useDevtools) {
          devtoolPlugin(this);
        }
      };
      var prototypeAccessors$1 = { state: { configurable: true } };
      prototypeAccessors$1.state.get = function() {
        return this._vm._data.$$state;
      };
      prototypeAccessors$1.state.set = function(v) {
        if (true) {
          assert(false, "use store.replaceState() to explicit replace store state.");
        }
      };
      Store2.prototype.commit = function commit(_type, _payload, _options) {
        var this$1 = this;
        var ref = unifyObjectStyle(_type, _payload, _options);
        var type = ref.type;
        var payload = ref.payload;
        var options = ref.options;
        var mutation = { type, payload };
        var entry = this._mutations[type];
        if (!entry) {
          if (true) {
            console.error("[vuex] unknown mutation type: " + type);
          }
          return;
        }
        this._withCommit(function() {
          entry.forEach(function commitIterator(handler) {
            handler(payload);
          });
        });
        this._subscribers.slice().forEach(function(sub) {
          return sub(mutation, this$1.state);
        });
        if (options && options.silent) {
          console.warn("[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools");
        }
      };
      Store2.prototype.dispatch = function dispatch(_type, _payload) {
        var this$1 = this;
        var ref = unifyObjectStyle(_type, _payload);
        var type = ref.type;
        var payload = ref.payload;
        var action = { type, payload };
        var entry = this._actions[type];
        if (!entry) {
          if (true) {
            console.error("[vuex] unknown action type: " + type);
          }
          return;
        }
        try {
          this._actionSubscribers.slice().filter(function(sub) {
            return sub.before;
          }).forEach(function(sub) {
            return sub.before(action, this$1.state);
          });
        } catch (e) {
          if (true) {
            console.warn("[vuex] error in before action subscribers: ");
            console.error(e);
          }
        }
        var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
          return handler(payload);
        })) : entry[0](payload);
        return new Promise(function(resolve, reject) {
          result.then(function(res) {
            try {
              this$1._actionSubscribers.filter(function(sub) {
                return sub.after;
              }).forEach(function(sub) {
                return sub.after(action, this$1.state);
              });
            } catch (e) {
              if (true) {
                console.warn("[vuex] error in after action subscribers: ");
                console.error(e);
              }
            }
            resolve(res);
          }, function(error) {
            try {
              this$1._actionSubscribers.filter(function(sub) {
                return sub.error;
              }).forEach(function(sub) {
                return sub.error(action, this$1.state, error);
              });
            } catch (e) {
              if (true) {
                console.warn("[vuex] error in error action subscribers: ");
                console.error(e);
              }
            }
            reject(error);
          });
        });
      };
      Store2.prototype.subscribe = function subscribe(fn, options) {
        return genericSubscribe(fn, this._subscribers, options);
      };
      Store2.prototype.subscribeAction = function subscribeAction(fn, options) {
        var subs = typeof fn === "function" ? { before: fn } : fn;
        return genericSubscribe(subs, this._actionSubscribers, options);
      };
      Store2.prototype.watch = function watch(getter, cb, options) {
        var this$1 = this;
        if (true) {
          assert(typeof getter === "function", "store.watch only accepts a function.");
        }
        return this._watcherVM.$watch(function() {
          return getter(this$1.state, this$1.getters);
        }, cb, options);
      };
      Store2.prototype.replaceState = function replaceState(state) {
        var this$1 = this;
        this._withCommit(function() {
          this$1._vm._data.$$state = state;
        });
      };
      Store2.prototype.registerModule = function registerModule(path, rawModule, options) {
        if (options === void 0)
          options = {};
        if (typeof path === "string") {
          path = [path];
        }
        if (true) {
          assert(Array.isArray(path), "module path must be a string or an Array.");
          assert(path.length > 0, "cannot register the root module by using registerModule.");
        }
        this._modules.register(path, rawModule);
        installModule(this, this.state, path, this._modules.get(path), options.preserveState);
        resetStoreVM(this, this.state);
      };
      Store2.prototype.unregisterModule = function unregisterModule(path) {
        var this$1 = this;
        if (typeof path === "string") {
          path = [path];
        }
        if (true) {
          assert(Array.isArray(path), "module path must be a string or an Array.");
        }
        this._modules.unregister(path);
        this._withCommit(function() {
          var parentState = getNestedState(this$1.state, path.slice(0, -1));
          Vue.delete(parentState, path[path.length - 1]);
        });
        resetStore(this);
      };
      Store2.prototype.hasModule = function hasModule(path) {
        if (typeof path === "string") {
          path = [path];
        }
        if (true) {
          assert(Array.isArray(path), "module path must be a string or an Array.");
        }
        return this._modules.isRegistered(path);
      };
      Store2.prototype.hotUpdate = function hotUpdate(newOptions) {
        this._modules.update(newOptions);
        resetStore(this, true);
      };
      Store2.prototype._withCommit = function _withCommit(fn) {
        var committing = this._committing;
        this._committing = true;
        fn();
        this._committing = committing;
      };
      Object.defineProperties(Store2.prototype, prototypeAccessors$1);
      function genericSubscribe(fn, subs, options) {
        if (subs.indexOf(fn) < 0) {
          options && options.prepend ? subs.unshift(fn) : subs.push(fn);
        }
        return function() {
          var i = subs.indexOf(fn);
          if (i > -1) {
            subs.splice(i, 1);
          }
        };
      }
      function resetStore(store, hot) {
        store._actions = /* @__PURE__ */ Object.create(null);
        store._mutations = /* @__PURE__ */ Object.create(null);
        store._wrappedGetters = /* @__PURE__ */ Object.create(null);
        store._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
        var state = store.state;
        installModule(store, state, [], store._modules.root, true);
        resetStoreVM(store, state, hot);
      }
      function resetStoreVM(store, state, hot) {
        var oldVm = store._vm;
        store.getters = {};
        store._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
        var wrappedGetters = store._wrappedGetters;
        var computed = {};
        forEachValue(wrappedGetters, function(fn, key) {
          computed[key] = partial(fn, store);
          Object.defineProperty(store.getters, key, {
            get: function() {
              return store._vm[key];
            },
            enumerable: true
          });
        });
        var silent = Vue.config.silent;
        Vue.config.silent = true;
        store._vm = new Vue({
          data: {
            $$state: state
          },
          computed
        });
        Vue.config.silent = silent;
        if (store.strict) {
          enableStrictMode(store);
        }
        if (oldVm) {
          if (hot) {
            store._withCommit(function() {
              oldVm._data.$$state = null;
            });
          }
          Vue.nextTick(function() {
            return oldVm.$destroy();
          });
        }
      }
      function installModule(store, rootState, path, module2, hot) {
        var isRoot = !path.length;
        var namespace = store._modules.getNamespace(path);
        if (module2.namespaced) {
          if (store._modulesNamespaceMap[namespace] && true) {
            console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
          }
          store._modulesNamespaceMap[namespace] = module2;
        }
        if (!isRoot && !hot) {
          var parentState = getNestedState(rootState, path.slice(0, -1));
          var moduleName = path[path.length - 1];
          store._withCommit(function() {
            if (true) {
              if (moduleName in parentState) {
                console.warn('[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"');
              }
            }
            Vue.set(parentState, moduleName, module2.state);
          });
        }
        var local = module2.context = makeLocalContext(store, namespace, path);
        module2.forEachMutation(function(mutation, key) {
          var namespacedType = namespace + key;
          registerMutation(store, namespacedType, mutation, local);
        });
        module2.forEachAction(function(action, key) {
          var type = action.root ? key : namespace + key;
          var handler = action.handler || action;
          registerAction(store, type, handler, local);
        });
        module2.forEachGetter(function(getter, key) {
          var namespacedType = namespace + key;
          registerGetter(store, namespacedType, getter, local);
        });
        module2.forEachChild(function(child, key) {
          installModule(store, rootState, path.concat(key), child, hot);
        });
      }
      function makeLocalContext(store, namespace, path) {
        var noNamespace = namespace === "";
        var local = {
          dispatch: noNamespace ? store.dispatch : function(_type, _payload, _options) {
            var args = unifyObjectStyle(_type, _payload, _options);
            var payload = args.payload;
            var options = args.options;
            var type = args.type;
            if (!options || !options.root) {
              type = namespace + type;
              if (!store._actions[type]) {
                console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
                return;
              }
            }
            return store.dispatch(type, payload);
          },
          commit: noNamespace ? store.commit : function(_type, _payload, _options) {
            var args = unifyObjectStyle(_type, _payload, _options);
            var payload = args.payload;
            var options = args.options;
            var type = args.type;
            if (!options || !options.root) {
              type = namespace + type;
              if (!store._mutations[type]) {
                console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
                return;
              }
            }
            store.commit(type, payload, options);
          }
        };
        Object.defineProperties(local, {
          getters: {
            get: noNamespace ? function() {
              return store.getters;
            } : function() {
              return makeLocalGetters(store, namespace);
            }
          },
          state: {
            get: function() {
              return getNestedState(store.state, path);
            }
          }
        });
        return local;
      }
      function makeLocalGetters(store, namespace) {
        if (!store._makeLocalGettersCache[namespace]) {
          var gettersProxy = {};
          var splitPos = namespace.length;
          Object.keys(store.getters).forEach(function(type) {
            if (type.slice(0, splitPos) !== namespace) {
              return;
            }
            var localType = type.slice(splitPos);
            Object.defineProperty(gettersProxy, localType, {
              get: function() {
                return store.getters[type];
              },
              enumerable: true
            });
          });
          store._makeLocalGettersCache[namespace] = gettersProxy;
        }
        return store._makeLocalGettersCache[namespace];
      }
      function registerMutation(store, type, handler, local) {
        var entry = store._mutations[type] || (store._mutations[type] = []);
        entry.push(function wrappedMutationHandler(payload) {
          handler.call(store, local.state, payload);
        });
      }
      function registerAction(store, type, handler, local) {
        var entry = store._actions[type] || (store._actions[type] = []);
        entry.push(function wrappedActionHandler(payload) {
          var res = handler.call(store, {
            dispatch: local.dispatch,
            commit: local.commit,
            getters: local.getters,
            state: local.state,
            rootGetters: store.getters,
            rootState: store.state
          }, payload);
          if (!isPromise(res)) {
            res = Promise.resolve(res);
          }
          if (store._devtoolHook) {
            return res.catch(function(err) {
              store._devtoolHook.emit("vuex:error", err);
              throw err;
            });
          } else {
            return res;
          }
        });
      }
      function registerGetter(store, type, rawGetter, local) {
        if (store._wrappedGetters[type]) {
          if (true) {
            console.error("[vuex] duplicate getter key: " + type);
          }
          return;
        }
        store._wrappedGetters[type] = function wrappedGetter(store2) {
          return rawGetter(local.state, local.getters, store2.state, store2.getters);
        };
      }
      function enableStrictMode(store) {
        store._vm.$watch(function() {
          return this._data.$$state;
        }, function() {
          if (true) {
            assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
          }
        }, { deep: true, sync: true });
      }
      function getNestedState(state, path) {
        return path.reduce(function(state2, key) {
          return state2[key];
        }, state);
      }
      function unifyObjectStyle(type, payload, options) {
        if (isObject(type) && type.type) {
          options = payload;
          payload = type;
          type = type.type;
        }
        if (true) {
          assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
        }
        return { type, payload, options };
      }
      function install2(_Vue) {
        if (Vue && _Vue === Vue) {
          if (true) {
            console.error("[vuex] already installed. Vue.use(Vuex) should be called only once.");
          }
          return;
        }
        Vue = _Vue;
        applyMixin(Vue);
      }
      var mapState2 = normalizeNamespace(function(namespace, states) {
        var res = {};
        if (!isValidMap(states)) {
          console.error("[vuex] mapState: mapper parameter must be either an Array or an Object");
        }
        normalizeMap(states).forEach(function(ref) {
          var key = ref.key;
          var val = ref.val;
          res[key] = function mappedState() {
            var state = this.$store.state;
            var getters = this.$store.getters;
            if (namespace) {
              var module2 = getModuleByNamespace(this.$store, "mapState", namespace);
              if (!module2) {
                return;
              }
              state = module2.context.state;
              getters = module2.context.getters;
            }
            return typeof val === "function" ? val.call(this, state, getters) : state[val];
          };
          res[key].vuex = true;
        });
        return res;
      });
      var mapMutations2 = normalizeNamespace(function(namespace, mutations) {
        var res = {};
        if (!isValidMap(mutations)) {
          console.error("[vuex] mapMutations: mapper parameter must be either an Array or an Object");
        }
        normalizeMap(mutations).forEach(function(ref) {
          var key = ref.key;
          var val = ref.val;
          res[key] = function mappedMutation() {
            var args = [], len = arguments.length;
            while (len--)
              args[len] = arguments[len];
            var commit = this.$store.commit;
            if (namespace) {
              var module2 = getModuleByNamespace(this.$store, "mapMutations", namespace);
              if (!module2) {
                return;
              }
              commit = module2.context.commit;
            }
            return typeof val === "function" ? val.apply(this, [commit].concat(args)) : commit.apply(this.$store, [val].concat(args));
          };
        });
        return res;
      });
      var mapGetters2 = normalizeNamespace(function(namespace, getters) {
        var res = {};
        if (!isValidMap(getters)) {
          console.error("[vuex] mapGetters: mapper parameter must be either an Array or an Object");
        }
        normalizeMap(getters).forEach(function(ref) {
          var key = ref.key;
          var val = ref.val;
          val = namespace + val;
          res[key] = function mappedGetter() {
            if (namespace && !getModuleByNamespace(this.$store, "mapGetters", namespace)) {
              return;
            }
            if (!(val in this.$store.getters)) {
              console.error("[vuex] unknown getter: " + val);
              return;
            }
            return this.$store.getters[val];
          };
          res[key].vuex = true;
        });
        return res;
      });
      var mapActions2 = normalizeNamespace(function(namespace, actions) {
        var res = {};
        if (!isValidMap(actions)) {
          console.error("[vuex] mapActions: mapper parameter must be either an Array or an Object");
        }
        normalizeMap(actions).forEach(function(ref) {
          var key = ref.key;
          var val = ref.val;
          res[key] = function mappedAction() {
            var args = [], len = arguments.length;
            while (len--)
              args[len] = arguments[len];
            var dispatch = this.$store.dispatch;
            if (namespace) {
              var module2 = getModuleByNamespace(this.$store, "mapActions", namespace);
              if (!module2) {
                return;
              }
              dispatch = module2.context.dispatch;
            }
            return typeof val === "function" ? val.apply(this, [dispatch].concat(args)) : dispatch.apply(this.$store, [val].concat(args));
          };
        });
        return res;
      });
      var createNamespacedHelpers2 = function(namespace) {
        return {
          mapState: mapState2.bind(null, namespace),
          mapGetters: mapGetters2.bind(null, namespace),
          mapMutations: mapMutations2.bind(null, namespace),
          mapActions: mapActions2.bind(null, namespace)
        };
      };
      function normalizeMap(map) {
        if (!isValidMap(map)) {
          return [];
        }
        return Array.isArray(map) ? map.map(function(key) {
          return { key, val: key };
        }) : Object.keys(map).map(function(key) {
          return { key, val: map[key] };
        });
      }
      function isValidMap(map) {
        return Array.isArray(map) || isObject(map);
      }
      function normalizeNamespace(fn) {
        return function(namespace, map) {
          if (typeof namespace !== "string") {
            map = namespace;
            namespace = "";
          } else if (namespace.charAt(namespace.length - 1) !== "/") {
            namespace += "/";
          }
          return fn(namespace, map);
        };
      }
      function getModuleByNamespace(store, helper, namespace) {
        var module2 = store._modulesNamespaceMap[namespace];
        if (!module2) {
          console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
        }
        return module2;
      }
      function createLogger2(ref) {
        if (ref === void 0)
          ref = {};
        var collapsed = ref.collapsed;
        if (collapsed === void 0)
          collapsed = true;
        var filter = ref.filter;
        if (filter === void 0)
          filter = function(mutation, stateBefore, stateAfter) {
            return true;
          };
        var transformer = ref.transformer;
        if (transformer === void 0)
          transformer = function(state) {
            return state;
          };
        var mutationTransformer = ref.mutationTransformer;
        if (mutationTransformer === void 0)
          mutationTransformer = function(mut) {
            return mut;
          };
        var actionFilter = ref.actionFilter;
        if (actionFilter === void 0)
          actionFilter = function(action, state) {
            return true;
          };
        var actionTransformer = ref.actionTransformer;
        if (actionTransformer === void 0)
          actionTransformer = function(act) {
            return act;
          };
        var logMutations = ref.logMutations;
        if (logMutations === void 0)
          logMutations = true;
        var logActions = ref.logActions;
        if (logActions === void 0)
          logActions = true;
        var logger = ref.logger;
        if (logger === void 0)
          logger = console;
        return function(store) {
          var prevState = deepCopy(store.state);
          if (typeof logger === "undefined") {
            return;
          }
          if (logMutations) {
            store.subscribe(function(mutation, state) {
              var nextState = deepCopy(state);
              if (filter(mutation, prevState, nextState)) {
                var formattedTime = getFormattedTime();
                var formattedMutation = mutationTransformer(mutation);
                var message = "mutation " + mutation.type + formattedTime;
                startMessage(logger, message, collapsed);
                logger.log("%c prev state", "color: #9E9E9E; font-weight: bold", transformer(prevState));
                logger.log("%c mutation", "color: #03A9F4; font-weight: bold", formattedMutation);
                logger.log("%c next state", "color: #4CAF50; font-weight: bold", transformer(nextState));
                endMessage(logger);
              }
              prevState = nextState;
            });
          }
          if (logActions) {
            store.subscribeAction(function(action, state) {
              if (actionFilter(action, state)) {
                var formattedTime = getFormattedTime();
                var formattedAction = actionTransformer(action);
                var message = "action " + action.type + formattedTime;
                startMessage(logger, message, collapsed);
                logger.log("%c action", "color: #03A9F4; font-weight: bold", formattedAction);
                endMessage(logger);
              }
            });
          }
        };
      }
      function startMessage(logger, message, collapsed) {
        var startMessage2 = collapsed ? logger.groupCollapsed : logger.group;
        try {
          startMessage2.call(logger, message);
        } catch (e) {
          logger.log(message);
        }
      }
      function endMessage(logger) {
        try {
          logger.groupEnd();
        } catch (e) {
          logger.log("\u2014\u2014 log end \u2014\u2014");
        }
      }
      function getFormattedTime() {
        var time = new Date();
        return " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
      }
      function repeat(str, times) {
        return new Array(times + 1).join(str);
      }
      function pad(num, maxLength) {
        return repeat("0", maxLength - num.toString().length) + num;
      }
      var index_cjs = {
        Store: Store2,
        install: install2,
        version: "3.6.2",
        mapState: mapState2,
        mapMutations: mapMutations2,
        mapGetters: mapGetters2,
        mapActions: mapActions2,
        createNamespacedHelpers: createNamespacedHelpers2,
        createLogger: createLogger2
      };
      module.exports = index_cjs;
    }
  });

  // node_modules/vuex/dist/vuex.mjs
  var import_vuex_common = __toESM(require_vuex_common(), 1);
  var {
    Store,
    install,
    version,
    mapState,
    mapMutations,
    mapGetters,
    mapActions,
    createNamespacedHelpers,
    createLogger
  } = import_vuex_common.default;

  // frappe/public/js/frappe/views/kanban/kanban_board.bundle.js
  frappe.provide("frappe.views");
  (function() {
    var method_prefix = "frappe.desk.doctype.kanban_board.kanban_board.";
    let columns_unwatcher = null;
    var store = new import_vuex_common.default.Store({
      state: {
        doctype: "",
        board: {},
        card_meta: {},
        cards: [],
        columns: [],
        filters_modified: false,
        cur_list: {},
        empty_state: true
      },
      mutations: {
        update_state(state, obj) {
          Object.assign(state, obj);
        }
      },
      actions: {
        init: function(context, opts) {
          context.commit("update_state", {
            empty_state: true
          });
          var board = opts.board;
          var card_meta = opts.card_meta;
          opts.card_meta = card_meta;
          opts.board = board;
          var cards = opts.cards.map(function(card) {
            return prepare_card(card, opts);
          });
          var columns = prepare_columns(board.columns);
          context.commit("update_state", {
            doctype: opts.doctype,
            board,
            card_meta,
            cards,
            columns,
            cur_list: opts.cur_list,
            empty_state: false,
            wrapper: opts.wrapper
          });
        },
        update_cards: function(context, cards) {
          var state = context.state;
          var _cards = cards.map((card) => prepare_card(card, state)).concat(state.cards).uniqBy((card) => card.name);
          context.commit("update_state", {
            cards: _cards
          });
        },
        add_column: function(context, col) {
          if (frappe.model.can_create("Custom Field")) {
            store.dispatch("update_column", { col, action: "add" });
          } else {
            frappe.msgprint({
              title: __("Not permitted"),
              message: __("You are not allowed to create columns"),
              indicator: "red"
            });
          }
        },
        archive_column: function(context, col) {
          store.dispatch("update_column", { col, action: "archive" });
        },
        restore_column: function(context, col) {
          store.dispatch("update_column", { col, action: "restore" });
        },
        update_column: function(context, { col, action }) {
          var doctype = context.state.doctype;
          var board = context.state.board;
          fetch_customization(doctype).then(function(doc) {
            return modify_column_field_in_c11n(doc, board, col.title, action);
          }).then(save_customization).then(function() {
            return update_kanban_board(board.name, col.title, action);
          }).then(function(r) {
            var cols = r.message;
            context.commit("update_state", {
              columns: prepare_columns(cols)
            });
          }, function(err) {
            console.error(err);
          });
        },
        add_card: function(context, { card_title, column_title }) {
          var state = context.state;
          var doc = frappe.model.get_new_doc(state.doctype);
          var field = state.card_meta.title_field;
          var quick_entry = state.card_meta.quick_entry;
          var doc_fields = {};
          doc_fields[field.fieldname] = card_title;
          doc_fields[state.board.field_name] = column_title;
          state.cur_list.filter_area.get().forEach(function(f) {
            if (f[2] !== "=")
              return;
            doc_fields[f[1]] = f[3];
          });
          $.extend(doc, doc_fields);
          const card = prepare_card(doc, state);
          card._disable_click = true;
          const cards = [...state.cards, card];
          const old_name = doc.name;
          context.commit("update_state", { cards });
          if (field && !quick_entry) {
            return insert_doc(doc).then(function(r) {
              const updated_doc = r.message;
              const index = state.cards.findIndex((card3) => card3.name === old_name);
              const card2 = prepare_card(updated_doc, state);
              const new_cards = state.cards.slice();
              new_cards[index] = card2;
              context.commit("update_state", { cards: new_cards });
              const args = {
                new: 1,
                name: card2.name,
                colname: updated_doc[state.board.field_name]
              };
              store.dispatch("update_order_for_single_card", args);
            });
          } else {
            frappe.new_doc(state.doctype, doc);
          }
        },
        update_card: function(context, card) {
          var index = -1;
          context.state.cards.forEach(function(c, i) {
            if (c.name === card.name) {
              index = i;
            }
          });
          var cards = context.state.cards.slice();
          if (index !== -1) {
            cards.splice(index, 1, card);
          }
          context.commit("update_state", { cards });
        },
        update_order_for_single_card: function(context, card) {
          const _cards = context.state.cards.slice();
          const _columns = context.state.columns.slice();
          let args = {};
          let method_name = "";
          if (card.new) {
            method_name = "add_card";
            args = {
              board_name: context.state.board.name,
              docname: card.name,
              colname: card.colname
            };
          } else {
            method_name = "update_order_for_single_card";
            args = {
              board_name: context.state.board.name,
              docname: card.name,
              from_colname: card.from_colname,
              to_colname: card.to_colname,
              old_index: card.old_index,
              new_index: card.new_index
            };
          }
          frappe.dom.freeze();
          frappe.call({
            method: method_prefix + method_name,
            args,
            callback: (r) => {
              let board = r.message;
              let updated_cards = [
                { name: card.name, column: card.to_colname || card.colname }
              ];
              let cards = update_cards_column(updated_cards);
              let columns = prepare_columns(board.columns);
              context.commit("update_state", {
                cards,
                columns
              });
              frappe.dom.unfreeze();
            }
          }).fail(function() {
            context.commit("update_state", {
              cards: _cards,
              columns: _columns
            });
            frappe.dom.unfreeze();
          });
        },
        update_order: function(context) {
          const _cards = context.state.cards.slice();
          const _columns = context.state.columns.slice();
          const order = {};
          context.state.wrapper.find(".kanban-column[data-column-value]").each(function() {
            var col_name = $(this).data().columnValue;
            order[col_name] = [];
            $(this).find(".kanban-card-wrapper").each(function() {
              var card_name = decodeURIComponent($(this).data().name);
              order[col_name].push(card_name);
            });
          });
          frappe.call({
            method: method_prefix + "update_order",
            args: {
              board_name: context.state.board.name,
              order
            },
            callback: (r) => {
              var board = r.message[0];
              var updated_cards = r.message[1];
              var cards = update_cards_column(updated_cards);
              var columns = prepare_columns(board.columns);
              context.commit("update_state", {
                cards,
                columns
              });
            }
          }).fail(function() {
            context.commit("update_state", {
              cards: _cards,
              columns: _columns
            });
          });
        },
        update_column_order: function(context, order) {
          return frappe.call({
            method: method_prefix + "update_column_order",
            args: {
              board_name: context.state.board.name,
              order
            }
          }).then(function(r) {
            var board = r.message;
            var columns = prepare_columns(board.columns);
            context.commit("update_state", {
              columns
            });
          });
        },
        set_indicator: function(context, { column, color }) {
          return frappe.call({
            method: method_prefix + "set_indicator",
            args: {
              board_name: context.state.board.name,
              column_name: column.title,
              indicator: color
            }
          }).then(function(r) {
            var board = r.message;
            var columns = prepare_columns(board.columns);
            context.commit("update_state", {
              columns
            });
          });
        }
      }
    });
    frappe.views.KanbanBoard = function(opts) {
      var self = {};
      self.wrapper = opts.wrapper;
      self.cur_list = opts.cur_list;
      self.board_name = opts.board_name;
      self.board_perms = self.cur_list.board_perms;
      self.update = function(cards) {
        opts.cards = cards;
        if (self.wrapper.find(".kanban").length > 0 && self.cur_list.start !== 0) {
          store.dispatch("update_cards", cards);
        } else {
          init();
        }
      };
      function init() {
        store.dispatch("init", opts);
        columns_unwatcher && columns_unwatcher();
        store.watch((state, getters) => {
          return state.columns;
        }, make_columns);
        prepare();
        make_columns();
        store.watch((state, getters) => {
          return state.cur_list;
        }, setup_restore_columns);
        columns_unwatcher = store.watch((state, getters) => {
          return state.columns;
        }, setup_restore_columns);
        store.watch((state, getters) => {
          return state.empty_state;
        }, show_empty_state);
        store.dispatch("update_order");
      }
      function prepare() {
        self.$kanban_board = self.wrapper.find(".kanban");
        if (self.$kanban_board.length === 0) {
          self.$kanban_board = $(frappe.render_template("kanban_board"));
          self.$kanban_board.appendTo(self.wrapper);
        }
        self.$filter_area = self.cur_list.$page.find(".active-tag-filters");
        bind_events();
        setup_sortable();
      }
      function make_columns() {
        self.$kanban_board.find(".kanban-column").not(".add-new-column").remove();
        var columns = store.state.columns;
        columns.filter(is_active_column).map(function(col) {
          frappe.views.KanbanBoardColumn(col, self.$kanban_board, self.board_perms);
        });
      }
      function bind_events() {
        bind_add_column();
        bind_clickdrag();
      }
      function setup_sortable() {
        if (!self.board_perms.write)
          return;
        var sortable = new Sortable(self.$kanban_board.get(0), {
          group: "columns",
          animation: 150,
          dataIdAttr: "data-column-value",
          filter: ".add-new-column",
          handle: ".kanban-column-title",
          onEnd: function() {
            var order = sortable.toArray();
            order = order.slice(1);
            store.dispatch("update_column_order", order);
          }
        });
      }
      function bind_add_column() {
        if (!self.board_perms.write) {
          self.$kanban_board.find(".add-new-column").remove();
          return;
        }
        var $add_new_column = self.$kanban_board.find(".add-new-column"), $compose_column = $add_new_column.find(".compose-column"), $compose_column_form = $add_new_column.find(".compose-column-form").hide();
        $compose_column.on("click", function() {
          $(this).hide();
          $compose_column_form.show();
          $compose_column_form.find("input").focus();
        });
        $compose_column_form.keydown(function(e) {
          if (e.which == 13) {
            e.preventDefault();
            if (!frappe.request.ajax_count) {
              var title = $compose_column_form.serializeArray()[0].value;
              var col = {
                title: title.trim()
              };
              store.dispatch("add_column", col);
              $compose_column_form.find("input").val("");
              $compose_column.show();
              $compose_column_form.hide();
            }
          }
        });
        $compose_column_form.find("input").on("blur", function() {
          $(this).val("");
          $compose_column.show();
          $compose_column_form.hide();
        });
      }
      function bind_clickdrag() {
        let isDown = false;
        let startX;
        let scrollLeft;
        let draggable = self.$kanban_board[0];
        draggable.addEventListener("mousedown", (e) => {
          let ignoreEl = [
            ".kanban-column .kanban-column-header",
            ".kanban-column .add-card",
            ".kanban-column .kanban-card.new-card-area",
            ".kanban-card-wrapper"
          ];
          if (ignoreEl.some((el) => e.target.closest(el)))
            return;
          isDown = true;
          draggable.classList.add("clickdrag-active");
          startX = e.pageX - draggable.offsetLeft;
          scrollLeft = draggable.scrollLeft;
        });
        draggable.addEventListener("mouseleave", () => {
          isDown = false;
          draggable.classList.remove("clickdrag-active");
        });
        draggable.addEventListener("mouseup", () => {
          isDown = false;
          draggable.classList.remove("clickdrag-active");
        });
        draggable.addEventListener("mousemove", (e) => {
          if (!isDown)
            return;
          e.preventDefault();
          const x = e.pageX - draggable.offsetLeft;
          const walk = x - startX;
          draggable.scrollLeft = scrollLeft - walk;
        });
      }
      function setup_restore_columns() {
        var cur_list2 = store.state.cur_list;
        var columns = store.state.columns;
        var list_row_right = cur_list2.$page.find(`[data-list-renderer='Kanban'] .list-row-right`).css("margin-right", "15px");
        list_row_right.empty();
        var archived_columns = columns.filter(function(col) {
          return col.status === "Archived";
        });
        if (!archived_columns.length)
          return;
        var options = archived_columns.reduce(function(a, b) {
          return a + `<li><a class='option'>" +
					"<span class='ellipsis' style='max-width: 100px; display: inline-block'>" +
					__(b.title) + "</span>" +
					"<button style='float:right;' data-column='" + b.title +
					"' class='btn btn-default btn-xs restore-column text-muted'>"
					+ __('Restore') + "</button></a></li>`;
        }, "");
        var $dropdown = $("<div class='dropdown pull-right'><a class='text-muted dropdown-toggle' data-toggle='dropdown'><span class='dropdown-text'>" + __("Archived Columns") + "</span><i class='caret'></i></a><ul class='dropdown-menu'>" + options + "</ul></div>");
        list_row_right.html($dropdown);
        $dropdown.find(".dropdown-menu").on("click", "button.restore-column", function() {
          var column_title = $(this).data().column;
          var col = {
            title: column_title,
            status: "Archived"
          };
          store.dispatch("restore_column", col);
        });
      }
      function show_empty_state() {
        var empty_state = store.state.empty_state;
        if (empty_state) {
          self.$kanban_board.find(".kanban-column").hide();
          self.$kanban_board.find(".kanban-empty-state").show();
        } else {
          self.$kanban_board.find(".kanban-column").show();
          self.$kanban_board.find(".kanban-empty-state").hide();
        }
      }
      init();
      return self;
    };
    frappe.views.KanbanBoardColumn = function(column, wrapper, board_perms) {
      var self = {};
      var filtered_cards = [];
      function init() {
        make_dom();
        setup_sortable();
        make_cards();
        store.watch((state, getters) => {
          return state.cards;
        }, make_cards);
        bind_add_card();
        bind_options();
      }
      function make_dom() {
        self.$kanban_column = $(frappe.render_template("kanban_column", {
          title: column.title,
          doctype: store.state.doctype,
          indicator: frappe.scrub(column.indicator, "-")
        })).appendTo(wrapper);
        self.$kanban_cards = self.$kanban_column.find(".kanban-cards");
      }
      function make_cards() {
        self.$kanban_cards.empty();
        var cards = store.state.cards;
        filtered_cards = get_cards_for_column(cards, column);
        var filtered_cards_names = filtered_cards.map((card) => card.name);
        var order = column.order;
        if (order) {
          order = JSON.parse(order);
          filtered_cards.forEach(function(card) {
            if (order.indexOf(card.name) === -1) {
              frappe.views.KanbanBoardCard(card, self.$kanban_cards);
            }
          });
          order.forEach(function(name) {
            if (!filtered_cards_names.includes(name))
              return;
            frappe.views.KanbanBoardCard(get_card(name), self.$kanban_cards);
          });
        } else {
          filtered_cards.map(function(card) {
            frappe.views.KanbanBoardCard(card, self.$kanban_cards);
          });
        }
      }
      function setup_sortable() {
        if (!frappe.model.can_write(store.state.doctype))
          return;
        Sortable.create(self.$kanban_cards.get(0), {
          group: "cards",
          animation: 150,
          dataIdAttr: "data-name",
          forceFallback: true,
          onStart: function() {
            wrapper.find(".kanban-card.add-card").fadeOut(200, function() {
              wrapper.find(".kanban-cards").height("100vh");
            });
          },
          onEnd: function(e) {
            wrapper.find(".kanban-card.add-card").fadeIn(100);
            wrapper.find(".kanban-cards").height("auto");
            const args = {
              name: decodeURIComponent($(e.item).attr("data-name")),
              from_colname: $(e.from).parents(".kanban-column").attr("data-column-value"),
              to_colname: $(e.to).parents(".kanban-column").attr("data-column-value"),
              old_index: e.oldIndex,
              new_index: e.newIndex
            };
            store.dispatch("update_order_for_single_card", args);
          },
          onAdd: function() {
          }
        });
      }
      function bind_add_card() {
        var $wrapper = self.$kanban_column;
        var $btn_add = $wrapper.find(".add-card");
        var $new_card_area = $wrapper.find(".new-card-area");
        if (!frappe.model.can_create(store.state.doctype)) {
          $btn_add.remove();
          $new_card_area.remove();
          return;
        }
        var $textarea = $new_card_area.find("textarea");
        $new_card_area.hide();
        $btn_add.on("click", function() {
          $btn_add.hide();
          $new_card_area.show();
          $textarea.focus();
        });
        $new_card_area.keydown(function(e) {
          if (e.which == 13) {
            e.preventDefault();
            if (!frappe.request.ajax_count) {
              e.preventDefault();
              var card_title = $textarea.val();
              $new_card_area.hide();
              $textarea.val("");
              store.dispatch("add_card", {
                card_title,
                column_title: column.title
              }).then(() => {
                $btn_add.show();
              });
            }
          }
        });
        $textarea.on("blur", function() {
          $(this).val("");
          $btn_add.show();
          $new_card_area.hide();
        });
      }
      function bind_options() {
        if (!board_perms.write) {
          self.$kanban_column.find(".column-options").remove();
          return;
        }
        self.$kanban_column.find(".column-options .dropdown-menu").on("click", "[data-action]", function() {
          var $btn = $(this);
          var action = $btn.data().action;
          if (action === "archive") {
            store.dispatch("archive_column", column);
          } else if (action === "indicator") {
            var color = $btn.data().indicator;
            store.dispatch("set_indicator", { column, color });
          }
        });
        get_column_indicators(function(indicators) {
          let html = `<li class="button-group">${indicators.map((indicator) => {
            let classname = frappe.scrub(indicator, "-");
            return `<div data-action="indicator" data-indicator="${indicator}" class="btn btn-default btn-xs indicator-pill ${classname}"></div>`;
          }).join("")}</li>`;
          self.$kanban_column.find(".column-options .dropdown-menu").append(html);
        });
      }
      init();
    };
    frappe.views.KanbanBoardCard = function(card, wrapper) {
      var self = {};
      function init() {
        if (!card)
          return;
        make_dom();
        render_card_meta();
      }
      function make_dom() {
        var opts = {
          name: card.name,
          title: frappe.utils.html2text(card.title),
          disable_click: card._disable_click ? "disable-click" : "",
          creation: card.creation,
          doc_content: get_doc_content(card),
          image_url: cur_list.get_image_url(card),
          form_link: frappe.utils.get_form_link(card.doctype, card.name)
        };
        self.$card = $(frappe.render_template("kanban_card", opts)).appendTo(wrapper);
        if (!frappe.model.can_write(card.doctype)) {
          self.$card.find(".kanban-card-body").css("cursor", "default");
        }
      }
      function get_doc_content(card2) {
        let fields = [];
        for (let field_name of cur_list.board.fields) {
          let field = frappe.meta.get_docfield(card2.doctype, field_name, card2.name) || frappe.model.get_std_field(field_name);
          let label = cur_list.board.show_labels ? `<span>${__(field.label)}: </span>` : "";
          let value = frappe.format(card2.doc[field_name], field);
          fields.push(`
					<div class="text-muted text-truncate">
						${label}
						<span>${value}</span>
					</div>
				`);
        }
        return fields.join("");
      }
      function get_tags_html(card2) {
        return card2.tags ? `<div class="kanban-tags">
					${cur_list.get_tags_html(card2.tags, 3, true)}
				</div>` : "";
      }
      function render_card_meta() {
        let html = get_tags_html(card);
        if (card.comment_count > 0)
          html += `<span class="list-comment-count small text-muted ">
					${frappe.utils.icon("small-message")}
					${card.comment_count}
				</span>`;
        const $assignees_group = get_assignees_group();
        html += `
				<span class="kanban-assignments"></span>
				${cur_list.get_like_html(card)}
			`;
        if (card.color && frappe.ui.color.validate_hex(card.color)) {
          const $div = $("<div>");
          $("<div></div>").css({
            width: "30px",
            height: "4px",
            borderRadius: "2px",
            marginBottom: "8px",
            backgroundColor: card.color
          }).appendTo($div);
          self.$card.find(".kanban-card .kanban-title-area").prepend($div);
        }
        self.$card.find(".kanban-card-meta").empty().append(html).find(".kanban-assignments").append($assignees_group);
      }
      function get_assignees_group() {
        return frappe.avatar_group(card.assigned_list, 3, {
          css_class: "avatar avatar-small",
          action_icon: "add",
          action: show_assign_to_dialog
        });
      }
      function show_assign_to_dialog(e) {
        e.preventDefault();
        e.stopPropagation();
        self.assign_to = new frappe.ui.form.AssignToDialog({
          obj: self,
          method: "frappe.desk.form.assign_to.add",
          doctype: card.doctype,
          docname: card.name,
          callback: function() {
            const users = self.assign_to_dialog.get_values().assign_to;
            card.assigned_list = [...new Set(card.assigned_list.concat(users))];
            store.dispatch("update_card", card);
          }
        });
        self.assign_to_dialog = self.assign_to.dialog;
        self.assign_to_dialog.show();
      }
      init();
    };
    function prepare_card(card, state, doc) {
      var assigned_list = card._assign ? JSON.parse(card._assign) : [];
      var comment_count = card._comment_count || 0;
      if (doc) {
        card = Object.assign({}, card, doc);
      }
      return {
        doctype: state.doctype,
        name: card.name,
        title: card[state.card_meta.title_field.fieldname],
        creation: moment(card.creation).format("MMM DD, YYYY"),
        _liked_by: card._liked_by,
        image: card[cur_list.meta.image_field],
        tags: card._user_tags,
        column: card[state.board.field_name],
        assigned_list: card.assigned_list || assigned_list,
        comment_count: card.comment_count || comment_count,
        color: card.color || null,
        doc: doc || card
      };
    }
    function prepare_columns(columns) {
      return columns.map(function(col) {
        return {
          title: col.column_name,
          status: col.status,
          order: col.order,
          indicator: col.indicator || "gray"
        };
      });
    }
    function modify_column_field_in_c11n(doc, board, title, action) {
      doc.fields.forEach(function(df) {
        if (df.fieldname === board.field_name && df.fieldtype === "Select") {
          if (!df.options)
            df.options = "";
          if (action === "add") {
            if (!df.options.includes(title))
              df.options += "\n" + title;
          } else if (action === "delete") {
            var options = df.options.split("\n");
            var index = options.indexOf(title);
            if (index !== -1)
              options.splice(index, 1);
            df.options = options.join("\n");
          }
        }
      });
      return doc;
    }
    function fetch_customization(doctype) {
      return new Promise(function(resolve) {
        frappe.model.with_doc("Customize Form", "Customize Form", function() {
          var doc = frappe.get_doc("Customize Form");
          doc.doc_type = doctype;
          frappe.call({
            doc,
            method: "fetch_to_customize",
            callback: function(r) {
              resolve(r.docs[0]);
            }
          });
        });
      });
    }
    function save_customization(doc) {
      if (!doc)
        return;
      doc.hide_success = true;
      return frappe.call({
        doc,
        method: "save_customization"
      });
    }
    function insert_doc(doc) {
      return frappe.call({
        method: "frappe.client.insert",
        args: {
          doc
        },
        callback: function() {
          frappe.model.clear_doc(doc.doctype, doc.name);
          frappe.show_alert({ message: __("Saved"), indicator: "green" }, 1);
        }
      });
    }
    function update_kanban_board(board_name, column_title, action) {
      var method;
      var args = {
        board_name,
        column_title
      };
      if (action === "add") {
        method = "add_column";
      } else if (action === "archive" || action === "restore") {
        method = "archive_restore_column";
        args.status = action === "archive" ? "Archived" : "Active";
      }
      return frappe.call({
        method: method_prefix + method,
        args
      });
    }
    function is_active_column(col) {
      return col.status !== "Archived";
    }
    function get_cards_for_column(cards, column) {
      return cards.filter(function(card) {
        return card.column === column.title;
      });
    }
    function get_card(name) {
      return store.state.cards.find(function(c) {
        return c.name === name;
      });
    }
    function update_cards_column(updated_cards) {
      var cards = store.state.cards;
      cards.forEach(function(c) {
        updated_cards.forEach(function(uc) {
          if (uc.name === c.name) {
            c.column = uc.column;
          }
        });
      });
      return cards;
    }
    function get_column_indicators(callback) {
      frappe.model.with_doctype("Kanban Board Column", function() {
        var meta = frappe.get_meta("Kanban Board Column");
        var indicators;
        meta.fields.forEach(function(df) {
          if (df.fieldname === "indicator") {
            indicators = df.options.split("\n");
          }
        });
        if (!indicators) {
          indicators = ["green", "blue", "orange", "gray"];
        }
        callback(indicators);
      });
    }
  })();
})();
/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */
//# sourceMappingURL=kanban_board.bundle.MTIU3SCA.js.map
