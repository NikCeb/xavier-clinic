(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

  // node_modules/vuedraggable/node_modules/sortablejs/Sortable.js
  var require_Sortable = __commonJS({
    "node_modules/vuedraggable/node_modules/sortablejs/Sortable.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.Sortable = factory());
      })(exports, function() {
        "use strict";
        function _typeof(obj) {
          if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function(obj2) {
              return typeof obj2;
            };
          } else {
            _typeof = function(obj2) {
              return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            };
          }
          return _typeof(obj);
        }
        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function _extends() {
          _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }
            return target;
          };
          return _extends.apply(this, arguments);
        }
        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            var ownKeys = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
              ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
              }));
            }
            ownKeys.forEach(function(key) {
              _defineProperty(target, key, source[key]);
            });
          }
          return target;
        }
        function _objectWithoutPropertiesLoose(source, excluded) {
          if (source == null)
            return {};
          var target = {};
          var sourceKeys = Object.keys(source);
          var key, i;
          for (i = 0; i < sourceKeys.length; i++) {
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0)
              continue;
            target[key] = source[key];
          }
          return target;
        }
        function _objectWithoutProperties(source, excluded) {
          if (source == null)
            return {};
          var target = _objectWithoutPropertiesLoose(source, excluded);
          var key, i;
          if (Object.getOwnPropertySymbols) {
            var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
            for (i = 0; i < sourceSymbolKeys.length; i++) {
              key = sourceSymbolKeys[i];
              if (excluded.indexOf(key) >= 0)
                continue;
              if (!Object.prototype.propertyIsEnumerable.call(source, key))
                continue;
              target[key] = source[key];
            }
          }
          return target;
        }
        function _toConsumableArray(arr) {
          return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
        }
        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) {
            for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
              arr2[i] = arr[i];
            return arr2;
          }
        }
        function _iterableToArray(iter) {
          if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
            return Array.from(iter);
        }
        function _nonIterableSpread() {
          throw new TypeError("Invalid attempt to spread non-iterable instance");
        }
        var version = "1.10.2";
        function userAgent(pattern) {
          if (typeof window !== "undefined" && window.navigator) {
            return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
          }
        }
        var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
        var Edge = userAgent(/Edge/i);
        var FireFox = userAgent(/firefox/i);
        var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
        var IOS = userAgent(/iP(ad|od|hone)/i);
        var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
        var captureMode = {
          capture: false,
          passive: false
        };
        function on(el, event, fn) {
          el.addEventListener(event, fn, !IE11OrLess && captureMode);
        }
        function off(el, event, fn) {
          el.removeEventListener(event, fn, !IE11OrLess && captureMode);
        }
        function matches(el, selector) {
          if (!selector)
            return;
          selector[0] === ">" && (selector = selector.substring(1));
          if (el) {
            try {
              if (el.matches) {
                return el.matches(selector);
              } else if (el.msMatchesSelector) {
                return el.msMatchesSelector(selector);
              } else if (el.webkitMatchesSelector) {
                return el.webkitMatchesSelector(selector);
              }
            } catch (_) {
              return false;
            }
          }
          return false;
        }
        function getParentOrHost(el) {
          return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
        }
        function closest(el, selector, ctx, includeCTX) {
          if (el) {
            ctx = ctx || document;
            do {
              if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
                return el;
              }
              if (el === ctx)
                break;
            } while (el = getParentOrHost(el));
          }
          return null;
        }
        var R_SPACE = /\s+/g;
        function toggleClass(el, name, state) {
          if (el && name) {
            if (el.classList) {
              el.classList[state ? "add" : "remove"](name);
            } else {
              var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
              el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
            }
          }
        }
        function css(el, prop, val) {
          var style = el && el.style;
          if (style) {
            if (val === void 0) {
              if (document.defaultView && document.defaultView.getComputedStyle) {
                val = document.defaultView.getComputedStyle(el, "");
              } else if (el.currentStyle) {
                val = el.currentStyle;
              }
              return prop === void 0 ? val : val[prop];
            } else {
              if (!(prop in style) && prop.indexOf("webkit") === -1) {
                prop = "-webkit-" + prop;
              }
              style[prop] = val + (typeof val === "string" ? "" : "px");
            }
          }
        }
        function matrix(el, selfOnly) {
          var appliedTransforms = "";
          if (typeof el === "string") {
            appliedTransforms = el;
          } else {
            do {
              var transform = css(el, "transform");
              if (transform && transform !== "none") {
                appliedTransforms = transform + " " + appliedTransforms;
              }
            } while (!selfOnly && (el = el.parentNode));
          }
          var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
          return matrixFn && new matrixFn(appliedTransforms);
        }
        function find(ctx, tagName, iterator) {
          if (ctx) {
            var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;
            if (iterator) {
              for (; i < n; i++) {
                iterator(list[i], i);
              }
            }
            return list;
          }
          return [];
        }
        function getWindowScrollingElement() {
          var scrollingElement = document.scrollingElement;
          if (scrollingElement) {
            return scrollingElement;
          } else {
            return document.documentElement;
          }
        }
        function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
          if (!el.getBoundingClientRect && el !== window)
            return;
          var elRect, top, left, bottom, right, height, width;
          if (el !== window && el !== getWindowScrollingElement()) {
            elRect = el.getBoundingClientRect();
            top = elRect.top;
            left = elRect.left;
            bottom = elRect.bottom;
            right = elRect.right;
            height = elRect.height;
            width = elRect.width;
          } else {
            top = 0;
            left = 0;
            bottom = window.innerHeight;
            right = window.innerWidth;
            height = window.innerHeight;
            width = window.innerWidth;
          }
          if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
            container = container || el.parentNode;
            if (!IE11OrLess) {
              do {
                if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
                  var containerRect = container.getBoundingClientRect();
                  top -= containerRect.top + parseInt(css(container, "border-top-width"));
                  left -= containerRect.left + parseInt(css(container, "border-left-width"));
                  bottom = top + elRect.height;
                  right = left + elRect.width;
                  break;
                }
              } while (container = container.parentNode);
            }
          }
          if (undoScale && el !== window) {
            var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
            if (elMatrix) {
              top /= scaleY;
              left /= scaleX;
              width /= scaleX;
              height /= scaleY;
              bottom = top + height;
              right = left + width;
            }
          }
          return {
            top,
            left,
            bottom,
            right,
            width,
            height
          };
        }
        function isScrolledPast(el, elSide, parentSide) {
          var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
          while (parent) {
            var parentSideVal = getRect(parent)[parentSide], visible = void 0;
            if (parentSide === "top" || parentSide === "left") {
              visible = elSideVal >= parentSideVal;
            } else {
              visible = elSideVal <= parentSideVal;
            }
            if (!visible)
              return parent;
            if (parent === getWindowScrollingElement())
              break;
            parent = getParentAutoScrollElement(parent, false);
          }
          return false;
        }
        function getChild(el, childNum, options) {
          var currentChild = 0, i = 0, children = el.children;
          while (i < children.length) {
            if (children[i].style.display !== "none" && children[i] !== Sortable.ghost && children[i] !== Sortable.dragged && closest(children[i], options.draggable, el, false)) {
              if (currentChild === childNum) {
                return children[i];
              }
              currentChild++;
            }
            i++;
          }
          return null;
        }
        function lastChild(el, selector) {
          var last = el.lastElementChild;
          while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
            last = last.previousElementSibling;
          }
          return last || null;
        }
        function index(el, selector) {
          var index2 = 0;
          if (!el || !el.parentNode) {
            return -1;
          }
          while (el = el.previousElementSibling) {
            if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
              index2++;
            }
          }
          return index2;
        }
        function getRelativeScrollOffset(el) {
          var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
          if (el) {
            do {
              var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
              offsetLeft += el.scrollLeft * scaleX;
              offsetTop += el.scrollTop * scaleY;
            } while (el !== winScroller && (el = el.parentNode));
          }
          return [offsetLeft, offsetTop];
        }
        function indexOfObject(arr, obj) {
          for (var i in arr) {
            if (!arr.hasOwnProperty(i))
              continue;
            for (var key in obj) {
              if (obj.hasOwnProperty(key) && obj[key] === arr[i][key])
                return Number(i);
            }
          }
          return -1;
        }
        function getParentAutoScrollElement(el, includeSelf) {
          if (!el || !el.getBoundingClientRect)
            return getWindowScrollingElement();
          var elem = el;
          var gotSelf = false;
          do {
            if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
              var elemCSS = css(elem);
              if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
                if (!elem.getBoundingClientRect || elem === document.body)
                  return getWindowScrollingElement();
                if (gotSelf || includeSelf)
                  return elem;
                gotSelf = true;
              }
            }
          } while (elem = elem.parentNode);
          return getWindowScrollingElement();
        }
        function extend(dst, src) {
          if (dst && src) {
            for (var key in src) {
              if (src.hasOwnProperty(key)) {
                dst[key] = src[key];
              }
            }
          }
          return dst;
        }
        function isRectEqual(rect1, rect2) {
          return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
        }
        var _throttleTimeout;
        function throttle(callback, ms) {
          return function() {
            if (!_throttleTimeout) {
              var args = arguments, _this = this;
              if (args.length === 1) {
                callback.call(_this, args[0]);
              } else {
                callback.apply(_this, args);
              }
              _throttleTimeout = setTimeout(function() {
                _throttleTimeout = void 0;
              }, ms);
            }
          };
        }
        function cancelThrottle() {
          clearTimeout(_throttleTimeout);
          _throttleTimeout = void 0;
        }
        function scrollBy(el, x, y) {
          el.scrollLeft += x;
          el.scrollTop += y;
        }
        function clone(el) {
          var Polymer = window.Polymer;
          var $2 = window.jQuery || window.Zepto;
          if (Polymer && Polymer.dom) {
            return Polymer.dom(el).cloneNode(true);
          } else if ($2) {
            return $2(el).clone(true)[0];
          } else {
            return el.cloneNode(true);
          }
        }
        function setRect(el, rect) {
          css(el, "position", "absolute");
          css(el, "top", rect.top);
          css(el, "left", rect.left);
          css(el, "width", rect.width);
          css(el, "height", rect.height);
        }
        function unsetRect(el) {
          css(el, "position", "");
          css(el, "top", "");
          css(el, "left", "");
          css(el, "width", "");
          css(el, "height", "");
        }
        var expando = "Sortable" + new Date().getTime();
        function AnimationStateManager() {
          var animationStates = [], animationCallbackId;
          return {
            captureAnimationState: function captureAnimationState() {
              animationStates = [];
              if (!this.options.animation)
                return;
              var children = [].slice.call(this.el.children);
              children.forEach(function(child) {
                if (css(child, "display") === "none" || child === Sortable.ghost)
                  return;
                animationStates.push({
                  target: child,
                  rect: getRect(child)
                });
                var fromRect = _objectSpread({}, animationStates[animationStates.length - 1].rect);
                if (child.thisAnimationDuration) {
                  var childMatrix = matrix(child, true);
                  if (childMatrix) {
                    fromRect.top -= childMatrix.f;
                    fromRect.left -= childMatrix.e;
                  }
                }
                child.fromRect = fromRect;
              });
            },
            addAnimationState: function addAnimationState(state) {
              animationStates.push(state);
            },
            removeAnimationState: function removeAnimationState(target) {
              animationStates.splice(indexOfObject(animationStates, {
                target
              }), 1);
            },
            animateAll: function animateAll(callback) {
              var _this = this;
              if (!this.options.animation) {
                clearTimeout(animationCallbackId);
                if (typeof callback === "function")
                  callback();
                return;
              }
              var animating = false, animationTime = 0;
              animationStates.forEach(function(state) {
                var time = 0, target = state.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target, true);
                if (targetMatrix) {
                  toRect.top -= targetMatrix.f;
                  toRect.left -= targetMatrix.e;
                }
                target.toRect = toRect;
                if (target.thisAnimationDuration) {
                  if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
                    time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
                  }
                }
                if (!isRectEqual(toRect, fromRect)) {
                  target.prevFromRect = fromRect;
                  target.prevToRect = toRect;
                  if (!time) {
                    time = _this.options.animation;
                  }
                  _this.animate(target, animatingRect, toRect, time);
                }
                if (time) {
                  animating = true;
                  animationTime = Math.max(animationTime, time);
                  clearTimeout(target.animationResetTimer);
                  target.animationResetTimer = setTimeout(function() {
                    target.animationTime = 0;
                    target.prevFromRect = null;
                    target.fromRect = null;
                    target.prevToRect = null;
                    target.thisAnimationDuration = null;
                  }, time);
                  target.thisAnimationDuration = time;
                }
              });
              clearTimeout(animationCallbackId);
              if (!animating) {
                if (typeof callback === "function")
                  callback();
              } else {
                animationCallbackId = setTimeout(function() {
                  if (typeof callback === "function")
                    callback();
                }, animationTime);
              }
              animationStates = [];
            },
            animate: function animate(target, currentRect, toRect, duration) {
              if (duration) {
                css(target, "transition", "");
                css(target, "transform", "");
                var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
                target.animatingX = !!translateX;
                target.animatingY = !!translateY;
                css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
                repaint(target);
                css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
                css(target, "transform", "translate3d(0,0,0)");
                typeof target.animated === "number" && clearTimeout(target.animated);
                target.animated = setTimeout(function() {
                  css(target, "transition", "");
                  css(target, "transform", "");
                  target.animated = false;
                  target.animatingX = false;
                  target.animatingY = false;
                }, duration);
              }
            }
          };
        }
        function repaint(target) {
          return target.offsetWidth;
        }
        function calculateRealTime(animatingRect, fromRect, toRect, options) {
          return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
        }
        var plugins = [];
        var defaults = {
          initializeByDefault: true
        };
        var PluginManager = {
          mount: function mount(plugin) {
            for (var option in defaults) {
              if (defaults.hasOwnProperty(option) && !(option in plugin)) {
                plugin[option] = defaults[option];
              }
            }
            plugins.push(plugin);
          },
          pluginEvent: function pluginEvent2(eventName, sortable, evt) {
            var _this = this;
            this.eventCanceled = false;
            evt.cancel = function() {
              _this.eventCanceled = true;
            };
            var eventNameGlobal = eventName + "Global";
            plugins.forEach(function(plugin) {
              if (!sortable[plugin.pluginName])
                return;
              if (sortable[plugin.pluginName][eventNameGlobal]) {
                sortable[plugin.pluginName][eventNameGlobal](_objectSpread({
                  sortable
                }, evt));
              }
              if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
                sortable[plugin.pluginName][eventName](_objectSpread({
                  sortable
                }, evt));
              }
            });
          },
          initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
            plugins.forEach(function(plugin) {
              var pluginName = plugin.pluginName;
              if (!sortable.options[pluginName] && !plugin.initializeByDefault)
                return;
              var initialized = new plugin(sortable, el, sortable.options);
              initialized.sortable = sortable;
              initialized.options = sortable.options;
              sortable[pluginName] = initialized;
              _extends(defaults2, initialized.defaults);
            });
            for (var option in sortable.options) {
              if (!sortable.options.hasOwnProperty(option))
                continue;
              var modified = this.modifyOption(sortable, option, sortable.options[option]);
              if (typeof modified !== "undefined") {
                sortable.options[option] = modified;
              }
            }
          },
          getEventProperties: function getEventProperties(name, sortable) {
            var eventProperties = {};
            plugins.forEach(function(plugin) {
              if (typeof plugin.eventProperties !== "function")
                return;
              _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
            });
            return eventProperties;
          },
          modifyOption: function modifyOption(sortable, name, value) {
            var modifiedValue;
            plugins.forEach(function(plugin) {
              if (!sortable[plugin.pluginName])
                return;
              if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
                modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
              }
            });
            return modifiedValue;
          }
        };
        function dispatchEvent(_ref) {
          var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
          sortable = sortable || rootEl2 && rootEl2[expando];
          if (!sortable)
            return;
          var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
          if (window.CustomEvent && !IE11OrLess && !Edge) {
            evt = new CustomEvent(name, {
              bubbles: true,
              cancelable: true
            });
          } else {
            evt = document.createEvent("Event");
            evt.initEvent(name, true, true);
          }
          evt.to = toEl || rootEl2;
          evt.from = fromEl || rootEl2;
          evt.item = targetEl || rootEl2;
          evt.clone = cloneEl2;
          evt.oldIndex = oldIndex2;
          evt.newIndex = newIndex2;
          evt.oldDraggableIndex = oldDraggableIndex2;
          evt.newDraggableIndex = newDraggableIndex2;
          evt.originalEvent = originalEvent;
          evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
          var allEventProperties = _objectSpread({}, extraEventProperties, PluginManager.getEventProperties(name, sortable));
          for (var option in allEventProperties) {
            evt[option] = allEventProperties[option];
          }
          if (rootEl2) {
            rootEl2.dispatchEvent(evt);
          }
          if (options[onName]) {
            options[onName].call(sortable, evt);
          }
        }
        var pluginEvent = function pluginEvent2(eventName, sortable) {
          var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, ["evt"]);
          PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread({
            dragEl,
            parentEl,
            ghostEl,
            rootEl,
            nextEl,
            lastDownEl,
            cloneEl,
            cloneHidden,
            dragStarted: moved,
            putSortable,
            activeSortable: Sortable.active,
            originalEvent,
            oldIndex,
            oldDraggableIndex,
            newIndex,
            newDraggableIndex,
            hideGhostForTarget: _hideGhostForTarget,
            unhideGhostForTarget: _unhideGhostForTarget,
            cloneNowHidden: function cloneNowHidden() {
              cloneHidden = true;
            },
            cloneNowShown: function cloneNowShown() {
              cloneHidden = false;
            },
            dispatchSortableEvent: function dispatchSortableEvent(name) {
              _dispatchEvent({
                sortable,
                name,
                originalEvent
              });
            }
          }, data));
        };
        function _dispatchEvent(info) {
          dispatchEvent(_objectSpread({
            putSortable,
            cloneEl,
            targetEl: dragEl,
            rootEl,
            oldIndex,
            oldDraggableIndex,
            newIndex,
            newDraggableIndex
          }, info));
        }
        var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = false, ignoreNextClick = false, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = false, isCircumstantialInvert = false, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = false, savedInputChecked = [];
        var documentExists = typeof document !== "undefined", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
          if (!documentExists)
            return;
          if (IE11OrLess) {
            return false;
          }
          var el = document.createElement("x");
          el.style.cssText = "pointer-events:auto";
          return el.style.pointerEvents === "auto";
        }(), _detectDirection = function _detectDirection2(el, options) {
          var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
          if (elCSS.display === "flex") {
            return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
          }
          if (elCSS.display === "grid") {
            return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
          }
          if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
            var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
            return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
          }
          return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
        }, _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
          var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
          return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
        }, _detectNearestEmptySortable = function _detectNearestEmptySortable2(x, y) {
          var ret;
          sortables.some(function(sortable) {
            if (lastChild(sortable))
              return;
            var rect = getRect(sortable), threshold = sortable[expando].options.emptyInsertThreshold, insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
            if (threshold && insideHorizontally && insideVertically) {
              return ret = sortable;
            }
          });
          return ret;
        }, _prepareGroup = function _prepareGroup2(options) {
          function toFn(value, pull) {
            return function(to, from, dragEl2, evt) {
              var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
              if (value == null && (pull || sameGroup)) {
                return true;
              } else if (value == null || value === false) {
                return false;
              } else if (pull && value === "clone") {
                return value;
              } else if (typeof value === "function") {
                return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
              } else {
                var otherGroup = (pull ? to : from).options.group.name;
                return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
              }
            };
          }
          var group = {};
          var originalGroup = options.group;
          if (!originalGroup || _typeof(originalGroup) != "object") {
            originalGroup = {
              name: originalGroup
            };
          }
          group.name = originalGroup.name;
          group.checkPull = toFn(originalGroup.pull, true);
          group.checkPut = toFn(originalGroup.put);
          group.revertClone = originalGroup.revertClone;
          options.group = group;
        }, _hideGhostForTarget = function _hideGhostForTarget2() {
          if (!supportCssPointerEvents && ghostEl) {
            css(ghostEl, "display", "none");
          }
        }, _unhideGhostForTarget = function _unhideGhostForTarget2() {
          if (!supportCssPointerEvents && ghostEl) {
            css(ghostEl, "display", "");
          }
        };
        if (documentExists) {
          document.addEventListener("click", function(evt) {
            if (ignoreNextClick) {
              evt.preventDefault();
              evt.stopPropagation && evt.stopPropagation();
              evt.stopImmediatePropagation && evt.stopImmediatePropagation();
              ignoreNextClick = false;
              return false;
            }
          }, true);
        }
        var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
          if (dragEl) {
            evt = evt.touches ? evt.touches[0] : evt;
            var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
            if (nearest) {
              var event = {};
              for (var i in evt) {
                if (evt.hasOwnProperty(i)) {
                  event[i] = evt[i];
                }
              }
              event.target = event.rootEl = nearest;
              event.preventDefault = void 0;
              event.stopPropagation = void 0;
              nearest[expando]._onDragOver(event);
            }
          }
        };
        var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
          if (dragEl) {
            dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
          }
        };
        function Sortable(el, options) {
          if (!(el && el.nodeType && el.nodeType === 1)) {
            throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
          }
          this.el = el;
          this.options = options = _extends({}, options);
          el[expando] = this;
          var defaults2 = {
            group: null,
            sort: true,
            disabled: false,
            store: null,
            handle: null,
            draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
            swapThreshold: 1,
            invertSwap: false,
            invertedSwapThreshold: null,
            removeCloneOnHide: true,
            direction: function direction() {
              return _detectDirection(el, this.options);
            },
            ghostClass: "sortable-ghost",
            chosenClass: "sortable-chosen",
            dragClass: "sortable-drag",
            ignore: "a, img",
            filter: null,
            preventOnFilter: true,
            animation: 0,
            easing: null,
            setData: function setData(dataTransfer, dragEl2) {
              dataTransfer.setData("Text", dragEl2.textContent);
            },
            dropBubble: false,
            dragoverBubble: false,
            dataIdAttr: "data-id",
            delay: 0,
            delayOnTouchOnly: false,
            touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
            forceFallback: false,
            fallbackClass: "sortable-fallback",
            fallbackOnBody: false,
            fallbackTolerance: 0,
            fallbackOffset: {
              x: 0,
              y: 0
            },
            supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window,
            emptyInsertThreshold: 5
          };
          PluginManager.initializePlugins(this, el, defaults2);
          for (var name in defaults2) {
            !(name in options) && (options[name] = defaults2[name]);
          }
          _prepareGroup(options);
          for (var fn in this) {
            if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
              this[fn] = this[fn].bind(this);
            }
          }
          this.nativeDraggable = options.forceFallback ? false : supportDraggable;
          if (this.nativeDraggable) {
            this.options.touchStartThreshold = 1;
          }
          if (options.supportPointer) {
            on(el, "pointerdown", this._onTapStart);
          } else {
            on(el, "mousedown", this._onTapStart);
            on(el, "touchstart", this._onTapStart);
          }
          if (this.nativeDraggable) {
            on(el, "dragover", this);
            on(el, "dragenter", this);
          }
          sortables.push(this.el);
          options.store && options.store.get && this.sort(options.store.get(this) || []);
          _extends(this, AnimationStateManager());
        }
        Sortable.prototype = {
          constructor: Sortable,
          _isOutsideThisEl: function _isOutsideThisEl(target) {
            if (!this.el.contains(target) && target !== this.el) {
              lastTarget = null;
            }
          },
          _getDirection: function _getDirection(evt, target) {
            return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
          },
          _onTapStart: function _onTapStart(evt) {
            if (!evt.cancelable)
              return;
            var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
            _saveInputCheckedState(el);
            if (dragEl) {
              return;
            }
            if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
              return;
            }
            if (originalTarget.isContentEditable) {
              return;
            }
            target = closest(target, options.draggable, el, false);
            if (target && target.animated) {
              return;
            }
            if (lastDownEl === target) {
              return;
            }
            oldIndex = index(target);
            oldDraggableIndex = index(target, options.draggable);
            if (typeof filter === "function") {
              if (filter.call(this, evt, target, this)) {
                _dispatchEvent({
                  sortable: _this,
                  rootEl: originalTarget,
                  name: "filter",
                  targetEl: target,
                  toEl: el,
                  fromEl: el
                });
                pluginEvent("filter", _this, {
                  evt
                });
                preventOnFilter && evt.cancelable && evt.preventDefault();
                return;
              }
            } else if (filter) {
              filter = filter.split(",").some(function(criteria) {
                criteria = closest(originalTarget, criteria.trim(), el, false);
                if (criteria) {
                  _dispatchEvent({
                    sortable: _this,
                    rootEl: criteria,
                    name: "filter",
                    targetEl: target,
                    fromEl: el,
                    toEl: el
                  });
                  pluginEvent("filter", _this, {
                    evt
                  });
                  return true;
                }
              });
              if (filter) {
                preventOnFilter && evt.cancelable && evt.preventDefault();
                return;
              }
            }
            if (options.handle && !closest(originalTarget, options.handle, el, false)) {
              return;
            }
            this._prepareDragStart(evt, touch, target);
          },
          _prepareDragStart: function _prepareDragStart(evt, touch, target) {
            var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
            if (target && !dragEl && target.parentNode === el) {
              var dragRect = getRect(target);
              rootEl = el;
              dragEl = target;
              parentEl = dragEl.parentNode;
              nextEl = dragEl.nextSibling;
              lastDownEl = target;
              activeGroup = options.group;
              Sortable.dragged = dragEl;
              tapEvt = {
                target: dragEl,
                clientX: (touch || evt).clientX,
                clientY: (touch || evt).clientY
              };
              tapDistanceLeft = tapEvt.clientX - dragRect.left;
              tapDistanceTop = tapEvt.clientY - dragRect.top;
              this._lastX = (touch || evt).clientX;
              this._lastY = (touch || evt).clientY;
              dragEl.style["will-change"] = "all";
              dragStartFn = function dragStartFn2() {
                pluginEvent("delayEnded", _this, {
                  evt
                });
                if (Sortable.eventCanceled) {
                  _this._onDrop();
                  return;
                }
                _this._disableDelayedDragEvents();
                if (!FireFox && _this.nativeDraggable) {
                  dragEl.draggable = true;
                }
                _this._triggerDragStart(evt, touch);
                _dispatchEvent({
                  sortable: _this,
                  name: "choose",
                  originalEvent: evt
                });
                toggleClass(dragEl, options.chosenClass, true);
              };
              options.ignore.split(",").forEach(function(criteria) {
                find(dragEl, criteria.trim(), _disableDraggable);
              });
              on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
              on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
              on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
              on(ownerDocument, "mouseup", _this._onDrop);
              on(ownerDocument, "touchend", _this._onDrop);
              on(ownerDocument, "touchcancel", _this._onDrop);
              if (FireFox && this.nativeDraggable) {
                this.options.touchStartThreshold = 4;
                dragEl.draggable = true;
              }
              pluginEvent("delayStart", this, {
                evt
              });
              if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
                if (Sortable.eventCanceled) {
                  this._onDrop();
                  return;
                }
                on(ownerDocument, "mouseup", _this._disableDelayedDrag);
                on(ownerDocument, "touchend", _this._disableDelayedDrag);
                on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
                on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
                on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
                options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
                _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
              } else {
                dragStartFn();
              }
            }
          },
          _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
            var touch = e.touches ? e.touches[0] : e;
            if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
              this._disableDelayedDrag();
            }
          },
          _disableDelayedDrag: function _disableDelayedDrag() {
            dragEl && _disableDraggable(dragEl);
            clearTimeout(this._dragStartTimer);
            this._disableDelayedDragEvents();
          },
          _disableDelayedDragEvents: function _disableDelayedDragEvents() {
            var ownerDocument = this.el.ownerDocument;
            off(ownerDocument, "mouseup", this._disableDelayedDrag);
            off(ownerDocument, "touchend", this._disableDelayedDrag);
            off(ownerDocument, "touchcancel", this._disableDelayedDrag);
            off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
            off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
            off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
          },
          _triggerDragStart: function _triggerDragStart(evt, touch) {
            touch = touch || evt.pointerType == "touch" && evt;
            if (!this.nativeDraggable || touch) {
              if (this.options.supportPointer) {
                on(document, "pointermove", this._onTouchMove);
              } else if (touch) {
                on(document, "touchmove", this._onTouchMove);
              } else {
                on(document, "mousemove", this._onTouchMove);
              }
            } else {
              on(dragEl, "dragend", this);
              on(rootEl, "dragstart", this._onDragStart);
            }
            try {
              if (document.selection) {
                _nextTick(function() {
                  document.selection.empty();
                });
              } else {
                window.getSelection().removeAllRanges();
              }
            } catch (err) {
            }
          },
          _dragStarted: function _dragStarted(fallback, evt) {
            awaitingDragStarted = false;
            if (rootEl && dragEl) {
              pluginEvent("dragStarted", this, {
                evt
              });
              if (this.nativeDraggable) {
                on(document, "dragover", _checkOutsideTargetEl);
              }
              var options = this.options;
              !fallback && toggleClass(dragEl, options.dragClass, false);
              toggleClass(dragEl, options.ghostClass, true);
              Sortable.active = this;
              fallback && this._appendGhost();
              _dispatchEvent({
                sortable: this,
                name: "start",
                originalEvent: evt
              });
            } else {
              this._nulling();
            }
          },
          _emulateDragOver: function _emulateDragOver() {
            if (touchEvt) {
              this._lastX = touchEvt.clientX;
              this._lastY = touchEvt.clientY;
              _hideGhostForTarget();
              var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
              var parent = target;
              while (target && target.shadowRoot) {
                target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
                if (target === parent)
                  break;
                parent = target;
              }
              dragEl.parentNode[expando]._isOutsideThisEl(target);
              if (parent) {
                do {
                  if (parent[expando]) {
                    var inserted = void 0;
                    inserted = parent[expando]._onDragOver({
                      clientX: touchEvt.clientX,
                      clientY: touchEvt.clientY,
                      target,
                      rootEl: parent
                    });
                    if (inserted && !this.options.dragoverBubble) {
                      break;
                    }
                  }
                  target = parent;
                } while (parent = parent.parentNode);
              }
              _unhideGhostForTarget();
            }
          },
          _onTouchMove: function _onTouchMove(evt) {
            if (tapEvt) {
              var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
              if (!Sortable.active && !awaitingDragStarted) {
                if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
                  return;
                }
                this._onDragStart(evt, true);
              }
              if (ghostEl) {
                if (ghostMatrix) {
                  ghostMatrix.e += dx - (lastDx || 0);
                  ghostMatrix.f += dy - (lastDy || 0);
                } else {
                  ghostMatrix = {
                    a: 1,
                    b: 0,
                    c: 0,
                    d: 1,
                    e: dx,
                    f: dy
                  };
                }
                var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
                css(ghostEl, "webkitTransform", cssMatrix);
                css(ghostEl, "mozTransform", cssMatrix);
                css(ghostEl, "msTransform", cssMatrix);
                css(ghostEl, "transform", cssMatrix);
                lastDx = dx;
                lastDy = dy;
                touchEvt = touch;
              }
              evt.cancelable && evt.preventDefault();
            }
          },
          _appendGhost: function _appendGhost() {
            if (!ghostEl) {
              var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
              if (PositionGhostAbsolutely) {
                ghostRelativeParent = container;
                while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
                  ghostRelativeParent = ghostRelativeParent.parentNode;
                }
                if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
                  if (ghostRelativeParent === document)
                    ghostRelativeParent = getWindowScrollingElement();
                  rect.top += ghostRelativeParent.scrollTop;
                  rect.left += ghostRelativeParent.scrollLeft;
                } else {
                  ghostRelativeParent = getWindowScrollingElement();
                }
                ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
              }
              ghostEl = dragEl.cloneNode(true);
              toggleClass(ghostEl, options.ghostClass, false);
              toggleClass(ghostEl, options.fallbackClass, true);
              toggleClass(ghostEl, options.dragClass, true);
              css(ghostEl, "transition", "");
              css(ghostEl, "transform", "");
              css(ghostEl, "box-sizing", "border-box");
              css(ghostEl, "margin", 0);
              css(ghostEl, "top", rect.top);
              css(ghostEl, "left", rect.left);
              css(ghostEl, "width", rect.width);
              css(ghostEl, "height", rect.height);
              css(ghostEl, "opacity", "0.8");
              css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
              css(ghostEl, "zIndex", "100000");
              css(ghostEl, "pointerEvents", "none");
              Sortable.ghost = ghostEl;
              container.appendChild(ghostEl);
              css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
            }
          },
          _onDragStart: function _onDragStart(evt, fallback) {
            var _this = this;
            var dataTransfer = evt.dataTransfer;
            var options = _this.options;
            pluginEvent("dragStart", this, {
              evt
            });
            if (Sortable.eventCanceled) {
              this._onDrop();
              return;
            }
            pluginEvent("setupClone", this);
            if (!Sortable.eventCanceled) {
              cloneEl = clone(dragEl);
              cloneEl.draggable = false;
              cloneEl.style["will-change"] = "";
              this._hideClone();
              toggleClass(cloneEl, this.options.chosenClass, false);
              Sortable.clone = cloneEl;
            }
            _this.cloneId = _nextTick(function() {
              pluginEvent("clone", _this);
              if (Sortable.eventCanceled)
                return;
              if (!_this.options.removeCloneOnHide) {
                rootEl.insertBefore(cloneEl, dragEl);
              }
              _this._hideClone();
              _dispatchEvent({
                sortable: _this,
                name: "clone"
              });
            });
            !fallback && toggleClass(dragEl, options.dragClass, true);
            if (fallback) {
              ignoreNextClick = true;
              _this._loopId = setInterval(_this._emulateDragOver, 50);
            } else {
              off(document, "mouseup", _this._onDrop);
              off(document, "touchend", _this._onDrop);
              off(document, "touchcancel", _this._onDrop);
              if (dataTransfer) {
                dataTransfer.effectAllowed = "move";
                options.setData && options.setData.call(_this, dataTransfer, dragEl);
              }
              on(document, "drop", _this);
              css(dragEl, "transform", "translateZ(0)");
            }
            awaitingDragStarted = true;
            _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
            on(document, "selectstart", _this);
            moved = true;
            if (Safari) {
              css(document.body, "user-select", "none");
            }
          },
          _onDragOver: function _onDragOver(evt) {
            var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
            if (_silent)
              return;
            function dragOverEvent(name, extra) {
              pluginEvent(name, _this, _objectSpread({
                evt,
                isOwner,
                axis: vertical ? "vertical" : "horizontal",
                revert,
                dragRect,
                targetRect,
                canSort,
                fromSortable,
                target,
                completed,
                onMove: function onMove(target2, after2) {
                  return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
                },
                changed
              }, extra));
            }
            function capture() {
              dragOverEvent("dragOverAnimationCapture");
              _this.captureAnimationState();
              if (_this !== fromSortable) {
                fromSortable.captureAnimationState();
              }
            }
            function completed(insertion) {
              dragOverEvent("dragOverCompleted", {
                insertion
              });
              if (insertion) {
                if (isOwner) {
                  activeSortable._hideClone();
                } else {
                  activeSortable._showClone(_this);
                }
                if (_this !== fromSortable) {
                  toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
                  toggleClass(dragEl, options.ghostClass, true);
                }
                if (putSortable !== _this && _this !== Sortable.active) {
                  putSortable = _this;
                } else if (_this === Sortable.active && putSortable) {
                  putSortable = null;
                }
                if (fromSortable === _this) {
                  _this._ignoreWhileAnimating = target;
                }
                _this.animateAll(function() {
                  dragOverEvent("dragOverAnimationComplete");
                  _this._ignoreWhileAnimating = null;
                });
                if (_this !== fromSortable) {
                  fromSortable.animateAll();
                  fromSortable._ignoreWhileAnimating = null;
                }
              }
              if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
                lastTarget = null;
              }
              if (!options.dragoverBubble && !evt.rootEl && target !== document) {
                dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
                !insertion && nearestEmptyInsertDetectEvent(evt);
              }
              !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
              return completedFired = true;
            }
            function changed() {
              newIndex = index(dragEl);
              newDraggableIndex = index(dragEl, options.draggable);
              _dispatchEvent({
                sortable: _this,
                name: "change",
                toEl: el,
                newIndex,
                newDraggableIndex,
                originalEvent: evt
              });
            }
            if (evt.preventDefault !== void 0) {
              evt.cancelable && evt.preventDefault();
            }
            target = closest(target, options.draggable, el, true);
            dragOverEvent("dragOver");
            if (Sortable.eventCanceled)
              return completedFired;
            if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
              return completed(false);
            }
            ignoreNextClick = false;
            if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
              vertical = this._getDirection(evt, target) === "vertical";
              dragRect = getRect(dragEl);
              dragOverEvent("dragOverValid");
              if (Sortable.eventCanceled)
                return completedFired;
              if (revert) {
                parentEl = rootEl;
                capture();
                this._hideClone();
                dragOverEvent("revert");
                if (!Sortable.eventCanceled) {
                  if (nextEl) {
                    rootEl.insertBefore(dragEl, nextEl);
                  } else {
                    rootEl.appendChild(dragEl);
                  }
                }
                return completed(true);
              }
              var elLastChild = lastChild(el, options.draggable);
              if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
                if (elLastChild === dragEl) {
                  return completed(false);
                }
                if (elLastChild && el === evt.target) {
                  target = elLastChild;
                }
                if (target) {
                  targetRect = getRect(target);
                }
                if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
                  capture();
                  el.appendChild(dragEl);
                  parentEl = el;
                  changed();
                  return completed(true);
                }
              } else if (target.parentNode === el) {
                targetRect = getRect(target);
                var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
                if (lastTarget !== target) {
                  targetBeforeFirstSwap = targetRect[side1];
                  pastFirstInvertThresh = false;
                  isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
                }
                direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
                var sibling;
                if (direction !== 0) {
                  var dragIndex = index(dragEl);
                  do {
                    dragIndex -= direction;
                    sibling = parentEl.children[dragIndex];
                  } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
                }
                if (direction === 0 || sibling === target) {
                  return completed(false);
                }
                lastTarget = target;
                lastDirection = direction;
                var nextSibling = target.nextElementSibling, after = false;
                after = direction === 1;
                var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
                if (moveVector !== false) {
                  if (moveVector === 1 || moveVector === -1) {
                    after = moveVector === 1;
                  }
                  _silent = true;
                  setTimeout(_unsilent, 30);
                  capture();
                  if (after && !nextSibling) {
                    el.appendChild(dragEl);
                  } else {
                    target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
                  }
                  if (scrolledPastTop) {
                    scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
                  }
                  parentEl = dragEl.parentNode;
                  if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
                    targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
                  }
                  changed();
                  return completed(true);
                }
              }
              if (el.contains(dragEl)) {
                return completed(false);
              }
            }
            return false;
          },
          _ignoreWhileAnimating: null,
          _offMoveEvents: function _offMoveEvents() {
            off(document, "mousemove", this._onTouchMove);
            off(document, "touchmove", this._onTouchMove);
            off(document, "pointermove", this._onTouchMove);
            off(document, "dragover", nearestEmptyInsertDetectEvent);
            off(document, "mousemove", nearestEmptyInsertDetectEvent);
            off(document, "touchmove", nearestEmptyInsertDetectEvent);
          },
          _offUpEvents: function _offUpEvents() {
            var ownerDocument = this.el.ownerDocument;
            off(ownerDocument, "mouseup", this._onDrop);
            off(ownerDocument, "touchend", this._onDrop);
            off(ownerDocument, "pointerup", this._onDrop);
            off(ownerDocument, "touchcancel", this._onDrop);
            off(document, "selectstart", this);
          },
          _onDrop: function _onDrop(evt) {
            var el = this.el, options = this.options;
            newIndex = index(dragEl);
            newDraggableIndex = index(dragEl, options.draggable);
            pluginEvent("drop", this, {
              evt
            });
            parentEl = dragEl && dragEl.parentNode;
            newIndex = index(dragEl);
            newDraggableIndex = index(dragEl, options.draggable);
            if (Sortable.eventCanceled) {
              this._nulling();
              return;
            }
            awaitingDragStarted = false;
            isCircumstantialInvert = false;
            pastFirstInvertThresh = false;
            clearInterval(this._loopId);
            clearTimeout(this._dragStartTimer);
            _cancelNextTick(this.cloneId);
            _cancelNextTick(this._dragStartId);
            if (this.nativeDraggable) {
              off(document, "drop", this);
              off(el, "dragstart", this._onDragStart);
            }
            this._offMoveEvents();
            this._offUpEvents();
            if (Safari) {
              css(document.body, "user-select", "");
            }
            css(dragEl, "transform", "");
            if (evt) {
              if (moved) {
                evt.cancelable && evt.preventDefault();
                !options.dropBubble && evt.stopPropagation();
              }
              ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
              if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
                cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
              }
              if (dragEl) {
                if (this.nativeDraggable) {
                  off(dragEl, "dragend", this);
                }
                _disableDraggable(dragEl);
                dragEl.style["will-change"] = "";
                if (moved && !awaitingDragStarted) {
                  toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
                }
                toggleClass(dragEl, this.options.chosenClass, false);
                _dispatchEvent({
                  sortable: this,
                  name: "unchoose",
                  toEl: parentEl,
                  newIndex: null,
                  newDraggableIndex: null,
                  originalEvent: evt
                });
                if (rootEl !== parentEl) {
                  if (newIndex >= 0) {
                    _dispatchEvent({
                      rootEl: parentEl,
                      name: "add",
                      toEl: parentEl,
                      fromEl: rootEl,
                      originalEvent: evt
                    });
                    _dispatchEvent({
                      sortable: this,
                      name: "remove",
                      toEl: parentEl,
                      originalEvent: evt
                    });
                    _dispatchEvent({
                      rootEl: parentEl,
                      name: "sort",
                      toEl: parentEl,
                      fromEl: rootEl,
                      originalEvent: evt
                    });
                    _dispatchEvent({
                      sortable: this,
                      name: "sort",
                      toEl: parentEl,
                      originalEvent: evt
                    });
                  }
                  putSortable && putSortable.save();
                } else {
                  if (newIndex !== oldIndex) {
                    if (newIndex >= 0) {
                      _dispatchEvent({
                        sortable: this,
                        name: "update",
                        toEl: parentEl,
                        originalEvent: evt
                      });
                      _dispatchEvent({
                        sortable: this,
                        name: "sort",
                        toEl: parentEl,
                        originalEvent: evt
                      });
                    }
                  }
                }
                if (Sortable.active) {
                  if (newIndex == null || newIndex === -1) {
                    newIndex = oldIndex;
                    newDraggableIndex = oldDraggableIndex;
                  }
                  _dispatchEvent({
                    sortable: this,
                    name: "end",
                    toEl: parentEl,
                    originalEvent: evt
                  });
                  this.save();
                }
              }
            }
            this._nulling();
          },
          _nulling: function _nulling() {
            pluginEvent("nulling", this);
            rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
            savedInputChecked.forEach(function(el) {
              el.checked = true;
            });
            savedInputChecked.length = lastDx = lastDy = 0;
          },
          handleEvent: function handleEvent(evt) {
            switch (evt.type) {
              case "drop":
              case "dragend":
                this._onDrop(evt);
                break;
              case "dragenter":
              case "dragover":
                if (dragEl) {
                  this._onDragOver(evt);
                  _globalDragOver(evt);
                }
                break;
              case "selectstart":
                evt.preventDefault();
                break;
            }
          },
          toArray: function toArray() {
            var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
            for (; i < n; i++) {
              el = children[i];
              if (closest(el, options.draggable, this.el, false)) {
                order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
              }
            }
            return order;
          },
          sort: function sort(order) {
            var items = {}, rootEl2 = this.el;
            this.toArray().forEach(function(id, i) {
              var el = rootEl2.children[i];
              if (closest(el, this.options.draggable, rootEl2, false)) {
                items[id] = el;
              }
            }, this);
            order.forEach(function(id) {
              if (items[id]) {
                rootEl2.removeChild(items[id]);
                rootEl2.appendChild(items[id]);
              }
            });
          },
          save: function save() {
            var store = this.options.store;
            store && store.set && store.set(this);
          },
          closest: function closest$1(el, selector) {
            return closest(el, selector || this.options.draggable, this.el, false);
          },
          option: function option(name, value) {
            var options = this.options;
            if (value === void 0) {
              return options[name];
            } else {
              var modifiedValue = PluginManager.modifyOption(this, name, value);
              if (typeof modifiedValue !== "undefined") {
                options[name] = modifiedValue;
              } else {
                options[name] = value;
              }
              if (name === "group") {
                _prepareGroup(options);
              }
            }
          },
          destroy: function destroy() {
            pluginEvent("destroy", this);
            var el = this.el;
            el[expando] = null;
            off(el, "mousedown", this._onTapStart);
            off(el, "touchstart", this._onTapStart);
            off(el, "pointerdown", this._onTapStart);
            if (this.nativeDraggable) {
              off(el, "dragover", this);
              off(el, "dragenter", this);
            }
            Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
              el2.removeAttribute("draggable");
            });
            this._onDrop();
            this._disableDelayedDragEvents();
            sortables.splice(sortables.indexOf(this.el), 1);
            this.el = el = null;
          },
          _hideClone: function _hideClone() {
            if (!cloneHidden) {
              pluginEvent("hideClone", this);
              if (Sortable.eventCanceled)
                return;
              css(cloneEl, "display", "none");
              if (this.options.removeCloneOnHide && cloneEl.parentNode) {
                cloneEl.parentNode.removeChild(cloneEl);
              }
              cloneHidden = true;
            }
          },
          _showClone: function _showClone(putSortable2) {
            if (putSortable2.lastPutMode !== "clone") {
              this._hideClone();
              return;
            }
            if (cloneHidden) {
              pluginEvent("showClone", this);
              if (Sortable.eventCanceled)
                return;
              if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
                rootEl.insertBefore(cloneEl, dragEl);
              } else if (nextEl) {
                rootEl.insertBefore(cloneEl, nextEl);
              } else {
                rootEl.appendChild(cloneEl);
              }
              if (this.options.group.revertClone) {
                this.animate(dragEl, cloneEl);
              }
              css(cloneEl, "display", "");
              cloneHidden = false;
            }
          }
        };
        function _globalDragOver(evt) {
          if (evt.dataTransfer) {
            evt.dataTransfer.dropEffect = "move";
          }
          evt.cancelable && evt.preventDefault();
        }
        function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
          var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
          if (window.CustomEvent && !IE11OrLess && !Edge) {
            evt = new CustomEvent("move", {
              bubbles: true,
              cancelable: true
            });
          } else {
            evt = document.createEvent("Event");
            evt.initEvent("move", true, true);
          }
          evt.to = toEl;
          evt.from = fromEl;
          evt.dragged = dragEl2;
          evt.draggedRect = dragRect;
          evt.related = targetEl || toEl;
          evt.relatedRect = targetRect || getRect(toEl);
          evt.willInsertAfter = willInsertAfter;
          evt.originalEvent = originalEvent;
          fromEl.dispatchEvent(evt);
          if (onMoveFn) {
            retVal = onMoveFn.call(sortable, evt, originalEvent);
          }
          return retVal;
        }
        function _disableDraggable(el) {
          el.draggable = false;
        }
        function _unsilent() {
          _silent = false;
        }
        function _ghostIsLast(evt, vertical, sortable) {
          var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
          var spacer = 10;
          return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
        }
        function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
          var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
          if (!invertSwap) {
            if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
              if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
                pastFirstInvertThresh = true;
              }
              if (!pastFirstInvertThresh) {
                if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
                  return -lastDirection;
                }
              } else {
                invert = true;
              }
            } else {
              if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
                return _getInsertDirection(target);
              }
            }
          }
          invert = invert || invertSwap;
          if (invert) {
            if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
              return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
            }
          }
          return 0;
        }
        function _getInsertDirection(target) {
          if (index(dragEl) < index(target)) {
            return 1;
          } else {
            return -1;
          }
        }
        function _generateId(el) {
          var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
          while (i--) {
            sum += str.charCodeAt(i);
          }
          return sum.toString(36);
        }
        function _saveInputCheckedState(root) {
          savedInputChecked.length = 0;
          var inputs = root.getElementsByTagName("input");
          var idx = inputs.length;
          while (idx--) {
            var el = inputs[idx];
            el.checked && savedInputChecked.push(el);
          }
        }
        function _nextTick(fn) {
          return setTimeout(fn, 0);
        }
        function _cancelNextTick(id) {
          return clearTimeout(id);
        }
        if (documentExists) {
          on(document, "touchmove", function(evt) {
            if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
              evt.preventDefault();
            }
          });
        }
        Sortable.utils = {
          on,
          off,
          css,
          find,
          is: function is(el, selector) {
            return !!closest(el, selector, el, false);
          },
          extend,
          throttle,
          closest,
          toggleClass,
          clone,
          index,
          nextTick: _nextTick,
          cancelNextTick: _cancelNextTick,
          detectDirection: _detectDirection,
          getChild
        };
        Sortable.get = function(element) {
          return element[expando];
        };
        Sortable.mount = function() {
          for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
            plugins2[_key] = arguments[_key];
          }
          if (plugins2[0].constructor === Array)
            plugins2 = plugins2[0];
          plugins2.forEach(function(plugin) {
            if (!plugin.prototype || !plugin.prototype.constructor) {
              throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
            }
            if (plugin.utils)
              Sortable.utils = _objectSpread({}, Sortable.utils, plugin.utils);
            PluginManager.mount(plugin);
          });
        };
        Sortable.create = function(el, options) {
          return new Sortable(el, options);
        };
        Sortable.version = version;
        var autoScrolls = [], scrollEl, scrollRootEl, scrolling = false, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
        function AutoScrollPlugin() {
          function AutoScroll() {
            this.defaults = {
              scroll: true,
              scrollSensitivity: 30,
              scrollSpeed: 10,
              bubbleScroll: true
            };
            for (var fn in this) {
              if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
                this[fn] = this[fn].bind(this);
              }
            }
          }
          AutoScroll.prototype = {
            dragStarted: function dragStarted2(_ref) {
              var originalEvent = _ref.originalEvent;
              if (this.sortable.nativeDraggable) {
                on(document, "dragover", this._handleAutoScroll);
              } else {
                if (this.options.supportPointer) {
                  on(document, "pointermove", this._handleFallbackAutoScroll);
                } else if (originalEvent.touches) {
                  on(document, "touchmove", this._handleFallbackAutoScroll);
                } else {
                  on(document, "mousemove", this._handleFallbackAutoScroll);
                }
              }
            },
            dragOverCompleted: function dragOverCompleted(_ref2) {
              var originalEvent = _ref2.originalEvent;
              if (!this.options.dragOverBubble && !originalEvent.rootEl) {
                this._handleAutoScroll(originalEvent);
              }
            },
            drop: function drop2() {
              if (this.sortable.nativeDraggable) {
                off(document, "dragover", this._handleAutoScroll);
              } else {
                off(document, "pointermove", this._handleFallbackAutoScroll);
                off(document, "touchmove", this._handleFallbackAutoScroll);
                off(document, "mousemove", this._handleFallbackAutoScroll);
              }
              clearPointerElemChangedInterval();
              clearAutoScrolls();
              cancelThrottle();
            },
            nulling: function nulling() {
              touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
              autoScrolls.length = 0;
            },
            _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
              this._handleAutoScroll(evt, true);
            },
            _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
              var _this = this;
              var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x, y);
              touchEvt$1 = evt;
              if (fallback || Edge || IE11OrLess || Safari) {
                autoScroll(evt, this.options, elem, fallback);
                var ogElemScroller = getParentAutoScrollElement(elem, true);
                if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
                  pointerElemChangedInterval && clearPointerElemChangedInterval();
                  pointerElemChangedInterval = setInterval(function() {
                    var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
                    if (newElem !== ogElemScroller) {
                      ogElemScroller = newElem;
                      clearAutoScrolls();
                    }
                    autoScroll(evt, _this.options, newElem, fallback);
                  }, 10);
                  lastAutoScrollX = x;
                  lastAutoScrollY = y;
                }
              } else {
                if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
                  clearAutoScrolls();
                  return;
                }
                autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
              }
            }
          };
          return _extends(AutoScroll, {
            pluginName: "scroll",
            initializeByDefault: true
          });
        }
        function clearAutoScrolls() {
          autoScrolls.forEach(function(autoScroll2) {
            clearInterval(autoScroll2.pid);
          });
          autoScrolls = [];
        }
        function clearPointerElemChangedInterval() {
          clearInterval(pointerElemChangedInterval);
        }
        var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
          if (!options.scroll)
            return;
          var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
          var scrollThisInstance = false, scrollCustomFn;
          if (scrollRootEl !== rootEl2) {
            scrollRootEl = rootEl2;
            clearAutoScrolls();
            scrollEl = options.scroll;
            scrollCustomFn = options.scrollFn;
            if (scrollEl === true) {
              scrollEl = getParentAutoScrollElement(rootEl2, true);
            }
          }
          var layersOut = 0;
          var currentParent = scrollEl;
          do {
            var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
            if (el === winScroller) {
              canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
              canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
            } else {
              canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
              canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
            }
            var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
            var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
            if (!autoScrolls[layersOut]) {
              for (var i = 0; i <= layersOut; i++) {
                if (!autoScrolls[i]) {
                  autoScrolls[i] = {};
                }
              }
            }
            if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
              autoScrolls[layersOut].el = el;
              autoScrolls[layersOut].vx = vx;
              autoScrolls[layersOut].vy = vy;
              clearInterval(autoScrolls[layersOut].pid);
              if (vx != 0 || vy != 0) {
                scrollThisInstance = true;
                autoScrolls[layersOut].pid = setInterval(function() {
                  if (isFallback && this.layer === 0) {
                    Sortable.active._onTouchMove(touchEvt$1);
                  }
                  var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
                  var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
                  if (typeof scrollCustomFn === "function") {
                    if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
                      return;
                    }
                  }
                  scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
                }.bind({
                  layer: layersOut
                }), 24);
              }
            }
            layersOut++;
          } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
          scrolling = scrollThisInstance;
        }, 30);
        var drop = function drop2(_ref) {
          var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
          if (!originalEvent)
            return;
          var toSortable = putSortable2 || activeSortable;
          hideGhostForTarget();
          var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
          var target = document.elementFromPoint(touch.clientX, touch.clientY);
          unhideGhostForTarget();
          if (toSortable && !toSortable.el.contains(target)) {
            dispatchSortableEvent("spill");
            this.onSpill({
              dragEl: dragEl2,
              putSortable: putSortable2
            });
          }
        };
        function Revert() {
        }
        Revert.prototype = {
          startIndex: null,
          dragStart: function dragStart(_ref2) {
            var oldDraggableIndex2 = _ref2.oldDraggableIndex;
            this.startIndex = oldDraggableIndex2;
          },
          onSpill: function onSpill(_ref3) {
            var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
            this.sortable.captureAnimationState();
            if (putSortable2) {
              putSortable2.captureAnimationState();
            }
            var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
            if (nextSibling) {
              this.sortable.el.insertBefore(dragEl2, nextSibling);
            } else {
              this.sortable.el.appendChild(dragEl2);
            }
            this.sortable.animateAll();
            if (putSortable2) {
              putSortable2.animateAll();
            }
          },
          drop
        };
        _extends(Revert, {
          pluginName: "revertOnSpill"
        });
        function Remove() {
        }
        Remove.prototype = {
          onSpill: function onSpill(_ref4) {
            var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
            var parentSortable = putSortable2 || this.sortable;
            parentSortable.captureAnimationState();
            dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
            parentSortable.animateAll();
          },
          drop
        };
        _extends(Remove, {
          pluginName: "removeOnSpill"
        });
        var lastSwapEl;
        function SwapPlugin() {
          function Swap() {
            this.defaults = {
              swapClass: "sortable-swap-highlight"
            };
          }
          Swap.prototype = {
            dragStart: function dragStart(_ref) {
              var dragEl2 = _ref.dragEl;
              lastSwapEl = dragEl2;
            },
            dragOverValid: function dragOverValid(_ref2) {
              var completed = _ref2.completed, target = _ref2.target, onMove = _ref2.onMove, activeSortable = _ref2.activeSortable, changed = _ref2.changed, cancel = _ref2.cancel;
              if (!activeSortable.options.swap)
                return;
              var el = this.sortable.el, options = this.options;
              if (target && target !== el) {
                var prevSwapEl = lastSwapEl;
                if (onMove(target) !== false) {
                  toggleClass(target, options.swapClass, true);
                  lastSwapEl = target;
                } else {
                  lastSwapEl = null;
                }
                if (prevSwapEl && prevSwapEl !== lastSwapEl) {
                  toggleClass(prevSwapEl, options.swapClass, false);
                }
              }
              changed();
              completed(true);
              cancel();
            },
            drop: function drop2(_ref3) {
              var activeSortable = _ref3.activeSortable, putSortable2 = _ref3.putSortable, dragEl2 = _ref3.dragEl;
              var toSortable = putSortable2 || this.sortable;
              var options = this.options;
              lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);
              if (lastSwapEl && (options.swap || putSortable2 && putSortable2.options.swap)) {
                if (dragEl2 !== lastSwapEl) {
                  toSortable.captureAnimationState();
                  if (toSortable !== activeSortable)
                    activeSortable.captureAnimationState();
                  swapNodes(dragEl2, lastSwapEl);
                  toSortable.animateAll();
                  if (toSortable !== activeSortable)
                    activeSortable.animateAll();
                }
              }
            },
            nulling: function nulling() {
              lastSwapEl = null;
            }
          };
          return _extends(Swap, {
            pluginName: "swap",
            eventProperties: function eventProperties() {
              return {
                swapItem: lastSwapEl
              };
            }
          });
        }
        function swapNodes(n1, n2) {
          var p1 = n1.parentNode, p2 = n2.parentNode, i1, i2;
          if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1))
            return;
          i1 = index(n1);
          i2 = index(n2);
          if (p1.isEqualNode(p2) && i1 < i2) {
            i2++;
          }
          p1.insertBefore(n2, p1.children[i1]);
          p2.insertBefore(n1, p2.children[i2]);
        }
        var multiDragElements = [], multiDragClones = [], lastMultiDragSelect, multiDragSortable, initialFolding = false, folding = false, dragStarted = false, dragEl$1, clonesFromRect, clonesHidden;
        function MultiDragPlugin() {
          function MultiDrag(sortable) {
            for (var fn in this) {
              if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
                this[fn] = this[fn].bind(this);
              }
            }
            if (sortable.options.supportPointer) {
              on(document, "pointerup", this._deselectMultiDrag);
            } else {
              on(document, "mouseup", this._deselectMultiDrag);
              on(document, "touchend", this._deselectMultiDrag);
            }
            on(document, "keydown", this._checkKeyDown);
            on(document, "keyup", this._checkKeyUp);
            this.defaults = {
              selectedClass: "sortable-selected",
              multiDragKey: null,
              setData: function setData(dataTransfer, dragEl2) {
                var data = "";
                if (multiDragElements.length && multiDragSortable === sortable) {
                  multiDragElements.forEach(function(multiDragElement, i) {
                    data += (!i ? "" : ", ") + multiDragElement.textContent;
                  });
                } else {
                  data = dragEl2.textContent;
                }
                dataTransfer.setData("Text", data);
              }
            };
          }
          MultiDrag.prototype = {
            multiDragKeyDown: false,
            isMultiDrag: false,
            delayStartGlobal: function delayStartGlobal(_ref) {
              var dragged = _ref.dragEl;
              dragEl$1 = dragged;
            },
            delayEnded: function delayEnded() {
              this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
            },
            setupClone: function setupClone(_ref2) {
              var sortable = _ref2.sortable, cancel = _ref2.cancel;
              if (!this.isMultiDrag)
                return;
              for (var i = 0; i < multiDragElements.length; i++) {
                multiDragClones.push(clone(multiDragElements[i]));
                multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
                multiDragClones[i].draggable = false;
                multiDragClones[i].style["will-change"] = "";
                toggleClass(multiDragClones[i], this.options.selectedClass, false);
                multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
              }
              sortable._hideClone();
              cancel();
            },
            clone: function clone2(_ref3) {
              var sortable = _ref3.sortable, rootEl2 = _ref3.rootEl, dispatchSortableEvent = _ref3.dispatchSortableEvent, cancel = _ref3.cancel;
              if (!this.isMultiDrag)
                return;
              if (!this.options.removeCloneOnHide) {
                if (multiDragElements.length && multiDragSortable === sortable) {
                  insertMultiDragClones(true, rootEl2);
                  dispatchSortableEvent("clone");
                  cancel();
                }
              }
            },
            showClone: function showClone(_ref4) {
              var cloneNowShown = _ref4.cloneNowShown, rootEl2 = _ref4.rootEl, cancel = _ref4.cancel;
              if (!this.isMultiDrag)
                return;
              insertMultiDragClones(false, rootEl2);
              multiDragClones.forEach(function(clone2) {
                css(clone2, "display", "");
              });
              cloneNowShown();
              clonesHidden = false;
              cancel();
            },
            hideClone: function hideClone(_ref5) {
              var _this = this;
              var sortable = _ref5.sortable, cloneNowHidden = _ref5.cloneNowHidden, cancel = _ref5.cancel;
              if (!this.isMultiDrag)
                return;
              multiDragClones.forEach(function(clone2) {
                css(clone2, "display", "none");
                if (_this.options.removeCloneOnHide && clone2.parentNode) {
                  clone2.parentNode.removeChild(clone2);
                }
              });
              cloneNowHidden();
              clonesHidden = true;
              cancel();
            },
            dragStartGlobal: function dragStartGlobal(_ref6) {
              var sortable = _ref6.sortable;
              if (!this.isMultiDrag && multiDragSortable) {
                multiDragSortable.multiDrag._deselectMultiDrag();
              }
              multiDragElements.forEach(function(multiDragElement) {
                multiDragElement.sortableIndex = index(multiDragElement);
              });
              multiDragElements = multiDragElements.sort(function(a, b) {
                return a.sortableIndex - b.sortableIndex;
              });
              dragStarted = true;
            },
            dragStarted: function dragStarted2(_ref7) {
              var _this2 = this;
              var sortable = _ref7.sortable;
              if (!this.isMultiDrag)
                return;
              if (this.options.sort) {
                sortable.captureAnimationState();
                if (this.options.animation) {
                  multiDragElements.forEach(function(multiDragElement) {
                    if (multiDragElement === dragEl$1)
                      return;
                    css(multiDragElement, "position", "absolute");
                  });
                  var dragRect = getRect(dragEl$1, false, true, true);
                  multiDragElements.forEach(function(multiDragElement) {
                    if (multiDragElement === dragEl$1)
                      return;
                    setRect(multiDragElement, dragRect);
                  });
                  folding = true;
                  initialFolding = true;
                }
              }
              sortable.animateAll(function() {
                folding = false;
                initialFolding = false;
                if (_this2.options.animation) {
                  multiDragElements.forEach(function(multiDragElement) {
                    unsetRect(multiDragElement);
                  });
                }
                if (_this2.options.sort) {
                  removeMultiDragElements();
                }
              });
            },
            dragOver: function dragOver(_ref8) {
              var target = _ref8.target, completed = _ref8.completed, cancel = _ref8.cancel;
              if (folding && ~multiDragElements.indexOf(target)) {
                completed(false);
                cancel();
              }
            },
            revert: function revert(_ref9) {
              var fromSortable = _ref9.fromSortable, rootEl2 = _ref9.rootEl, sortable = _ref9.sortable, dragRect = _ref9.dragRect;
              if (multiDragElements.length > 1) {
                multiDragElements.forEach(function(multiDragElement) {
                  sortable.addAnimationState({
                    target: multiDragElement,
                    rect: folding ? getRect(multiDragElement) : dragRect
                  });
                  unsetRect(multiDragElement);
                  multiDragElement.fromRect = dragRect;
                  fromSortable.removeAnimationState(multiDragElement);
                });
                folding = false;
                insertMultiDragElements(!this.options.removeCloneOnHide, rootEl2);
              }
            },
            dragOverCompleted: function dragOverCompleted(_ref10) {
              var sortable = _ref10.sortable, isOwner = _ref10.isOwner, insertion = _ref10.insertion, activeSortable = _ref10.activeSortable, parentEl2 = _ref10.parentEl, putSortable2 = _ref10.putSortable;
              var options = this.options;
              if (insertion) {
                if (isOwner) {
                  activeSortable._hideClone();
                }
                initialFolding = false;
                if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable2)) {
                  var dragRectAbsolute = getRect(dragEl$1, false, true, true);
                  multiDragElements.forEach(function(multiDragElement) {
                    if (multiDragElement === dragEl$1)
                      return;
                    setRect(multiDragElement, dragRectAbsolute);
                    parentEl2.appendChild(multiDragElement);
                  });
                  folding = true;
                }
                if (!isOwner) {
                  if (!folding) {
                    removeMultiDragElements();
                  }
                  if (multiDragElements.length > 1) {
                    var clonesHiddenBefore = clonesHidden;
                    activeSortable._showClone(sortable);
                    if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
                      multiDragClones.forEach(function(clone2) {
                        activeSortable.addAnimationState({
                          target: clone2,
                          rect: clonesFromRect
                        });
                        clone2.fromRect = clonesFromRect;
                        clone2.thisAnimationDuration = null;
                      });
                    }
                  } else {
                    activeSortable._showClone(sortable);
                  }
                }
              }
            },
            dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
              var dragRect = _ref11.dragRect, isOwner = _ref11.isOwner, activeSortable = _ref11.activeSortable;
              multiDragElements.forEach(function(multiDragElement) {
                multiDragElement.thisAnimationDuration = null;
              });
              if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
                clonesFromRect = _extends({}, dragRect);
                var dragMatrix = matrix(dragEl$1, true);
                clonesFromRect.top -= dragMatrix.f;
                clonesFromRect.left -= dragMatrix.e;
              }
            },
            dragOverAnimationComplete: function dragOverAnimationComplete() {
              if (folding) {
                folding = false;
                removeMultiDragElements();
              }
            },
            drop: function drop2(_ref12) {
              var evt = _ref12.originalEvent, rootEl2 = _ref12.rootEl, parentEl2 = _ref12.parentEl, sortable = _ref12.sortable, dispatchSortableEvent = _ref12.dispatchSortableEvent, oldIndex2 = _ref12.oldIndex, putSortable2 = _ref12.putSortable;
              var toSortable = putSortable2 || this.sortable;
              if (!evt)
                return;
              var options = this.options, children = parentEl2.children;
              if (!dragStarted) {
                if (options.multiDragKey && !this.multiDragKeyDown) {
                  this._deselectMultiDrag();
                }
                toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));
                if (!~multiDragElements.indexOf(dragEl$1)) {
                  multiDragElements.push(dragEl$1);
                  dispatchEvent({
                    sortable,
                    rootEl: rootEl2,
                    name: "select",
                    targetEl: dragEl$1,
                    originalEvt: evt
                  });
                  if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
                    var lastIndex = index(lastMultiDragSelect), currentIndex = index(dragEl$1);
                    if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
                      var n, i;
                      if (currentIndex > lastIndex) {
                        i = lastIndex;
                        n = currentIndex;
                      } else {
                        i = currentIndex;
                        n = lastIndex + 1;
                      }
                      for (; i < n; i++) {
                        if (~multiDragElements.indexOf(children[i]))
                          continue;
                        toggleClass(children[i], options.selectedClass, true);
                        multiDragElements.push(children[i]);
                        dispatchEvent({
                          sortable,
                          rootEl: rootEl2,
                          name: "select",
                          targetEl: children[i],
                          originalEvt: evt
                        });
                      }
                    }
                  } else {
                    lastMultiDragSelect = dragEl$1;
                  }
                  multiDragSortable = toSortable;
                } else {
                  multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
                  lastMultiDragSelect = null;
                  dispatchEvent({
                    sortable,
                    rootEl: rootEl2,
                    name: "deselect",
                    targetEl: dragEl$1,
                    originalEvt: evt
                  });
                }
              }
              if (dragStarted && this.isMultiDrag) {
                if ((parentEl2[expando].options.sort || parentEl2 !== rootEl2) && multiDragElements.length > 1) {
                  var dragRect = getRect(dragEl$1), multiDragIndex = index(dragEl$1, ":not(." + this.options.selectedClass + ")");
                  if (!initialFolding && options.animation)
                    dragEl$1.thisAnimationDuration = null;
                  toSortable.captureAnimationState();
                  if (!initialFolding) {
                    if (options.animation) {
                      dragEl$1.fromRect = dragRect;
                      multiDragElements.forEach(function(multiDragElement) {
                        multiDragElement.thisAnimationDuration = null;
                        if (multiDragElement !== dragEl$1) {
                          var rect = folding ? getRect(multiDragElement) : dragRect;
                          multiDragElement.fromRect = rect;
                          toSortable.addAnimationState({
                            target: multiDragElement,
                            rect
                          });
                        }
                      });
                    }
                    removeMultiDragElements();
                    multiDragElements.forEach(function(multiDragElement) {
                      if (children[multiDragIndex]) {
                        parentEl2.insertBefore(multiDragElement, children[multiDragIndex]);
                      } else {
                        parentEl2.appendChild(multiDragElement);
                      }
                      multiDragIndex++;
                    });
                    if (oldIndex2 === index(dragEl$1)) {
                      var update = false;
                      multiDragElements.forEach(function(multiDragElement) {
                        if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                          update = true;
                          return;
                        }
                      });
                      if (update) {
                        dispatchSortableEvent("update");
                      }
                    }
                  }
                  multiDragElements.forEach(function(multiDragElement) {
                    unsetRect(multiDragElement);
                  });
                  toSortable.animateAll();
                }
                multiDragSortable = toSortable;
              }
              if (rootEl2 === parentEl2 || putSortable2 && putSortable2.lastPutMode !== "clone") {
                multiDragClones.forEach(function(clone2) {
                  clone2.parentNode && clone2.parentNode.removeChild(clone2);
                });
              }
            },
            nullingGlobal: function nullingGlobal() {
              this.isMultiDrag = dragStarted = false;
              multiDragClones.length = 0;
            },
            destroyGlobal: function destroyGlobal() {
              this._deselectMultiDrag();
              off(document, "pointerup", this._deselectMultiDrag);
              off(document, "mouseup", this._deselectMultiDrag);
              off(document, "touchend", this._deselectMultiDrag);
              off(document, "keydown", this._checkKeyDown);
              off(document, "keyup", this._checkKeyUp);
            },
            _deselectMultiDrag: function _deselectMultiDrag(evt) {
              if (typeof dragStarted !== "undefined" && dragStarted)
                return;
              if (multiDragSortable !== this.sortable)
                return;
              if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false))
                return;
              if (evt && evt.button !== 0)
                return;
              while (multiDragElements.length) {
                var el = multiDragElements[0];
                toggleClass(el, this.options.selectedClass, false);
                multiDragElements.shift();
                dispatchEvent({
                  sortable: this.sortable,
                  rootEl: this.sortable.el,
                  name: "deselect",
                  targetEl: el,
                  originalEvt: evt
                });
              }
            },
            _checkKeyDown: function _checkKeyDown(evt) {
              if (evt.key === this.options.multiDragKey) {
                this.multiDragKeyDown = true;
              }
            },
            _checkKeyUp: function _checkKeyUp(evt) {
              if (evt.key === this.options.multiDragKey) {
                this.multiDragKeyDown = false;
              }
            }
          };
          return _extends(MultiDrag, {
            pluginName: "multiDrag",
            utils: {
              select: function select(el) {
                var sortable = el.parentNode[expando];
                if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el))
                  return;
                if (multiDragSortable && multiDragSortable !== sortable) {
                  multiDragSortable.multiDrag._deselectMultiDrag();
                  multiDragSortable = sortable;
                }
                toggleClass(el, sortable.options.selectedClass, true);
                multiDragElements.push(el);
              },
              deselect: function deselect(el) {
                var sortable = el.parentNode[expando], index2 = multiDragElements.indexOf(el);
                if (!sortable || !sortable.options.multiDrag || !~index2)
                  return;
                toggleClass(el, sortable.options.selectedClass, false);
                multiDragElements.splice(index2, 1);
              }
            },
            eventProperties: function eventProperties() {
              var _this3 = this;
              var oldIndicies = [], newIndicies = [];
              multiDragElements.forEach(function(multiDragElement) {
                oldIndicies.push({
                  multiDragElement,
                  index: multiDragElement.sortableIndex
                });
                var newIndex2;
                if (folding && multiDragElement !== dragEl$1) {
                  newIndex2 = -1;
                } else if (folding) {
                  newIndex2 = index(multiDragElement, ":not(." + _this3.options.selectedClass + ")");
                } else {
                  newIndex2 = index(multiDragElement);
                }
                newIndicies.push({
                  multiDragElement,
                  index: newIndex2
                });
              });
              return {
                items: _toConsumableArray(multiDragElements),
                clones: [].concat(multiDragClones),
                oldIndicies,
                newIndicies
              };
            },
            optionListeners: {
              multiDragKey: function multiDragKey(key) {
                key = key.toLowerCase();
                if (key === "ctrl") {
                  key = "Control";
                } else if (key.length > 1) {
                  key = key.charAt(0).toUpperCase() + key.substr(1);
                }
                return key;
              }
            }
          });
        }
        function insertMultiDragElements(clonesInserted, rootEl2) {
          multiDragElements.forEach(function(multiDragElement, i) {
            var target = rootEl2.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];
            if (target) {
              rootEl2.insertBefore(multiDragElement, target);
            } else {
              rootEl2.appendChild(multiDragElement);
            }
          });
        }
        function insertMultiDragClones(elementsInserted, rootEl2) {
          multiDragClones.forEach(function(clone2, i) {
            var target = rootEl2.children[clone2.sortableIndex + (elementsInserted ? Number(i) : 0)];
            if (target) {
              rootEl2.insertBefore(clone2, target);
            } else {
              rootEl2.appendChild(clone2);
            }
          });
        }
        function removeMultiDragElements() {
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1)
              return;
            multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
          });
        }
        Sortable.mount(new AutoScrollPlugin());
        Sortable.mount(Remove, Revert);
        Sortable.mount(new SwapPlugin());
        Sortable.mount(new MultiDragPlugin());
        return Sortable;
      });
    }
  });

  // node_modules/vuedraggable/dist/vuedraggable.umd.js
  var require_vuedraggable_umd = __commonJS({
    "node_modules/vuedraggable/dist/vuedraggable.umd.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory(require_Sortable());
        else if (typeof define === "function" && define.amd)
          define(["sortablejs"], factory);
        else if (typeof exports === "object")
          exports["vuedraggable"] = factory(require_Sortable());
        else
          root["vuedraggable"] = factory(root["Sortable"]);
      })(typeof self !== "undefined" ? self : exports, function(__WEBPACK_EXTERNAL_MODULE_a352__) {
        return function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              i: moduleId,
              l: false,
              exports: {}
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, { enumerable: true, get: getter });
            }
          };
          __webpack_require__.r = function(exports2) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports2, "__esModule", { value: true });
          };
          __webpack_require__.t = function(value, mode) {
            if (mode & 1)
              value = __webpack_require__(value);
            if (mode & 8)
              return value;
            if (mode & 4 && typeof value === "object" && value && value.__esModule)
              return value;
            var ns = /* @__PURE__ */ Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", { enumerable: true, value });
            if (mode & 2 && typeof value != "string")
              for (var key in value)
                __webpack_require__.d(ns, key, function(key2) {
                  return value[key2];
                }.bind(null, key));
            return ns;
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? function getDefault() {
              return module2["default"];
            } : function getModuleExports() {
              return module2;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = "fb15");
        }({
          "01f9": function(module2, exports2, __webpack_require__) {
            "use strict";
            var LIBRARY = __webpack_require__("2d00");
            var $export = __webpack_require__("5ca1");
            var redefine = __webpack_require__("2aba");
            var hide = __webpack_require__("32e9");
            var Iterators = __webpack_require__("84f2");
            var $iterCreate = __webpack_require__("41a0");
            var setToStringTag = __webpack_require__("7f20");
            var getPrototypeOf = __webpack_require__("38fd");
            var ITERATOR = __webpack_require__("2b4c")("iterator");
            var BUGGY = !([].keys && "next" in [].keys());
            var FF_ITERATOR = "@@iterator";
            var KEYS = "keys";
            var VALUES = "values";
            var returnThis = function() {
              return this;
            };
            module2.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
              $iterCreate(Constructor, NAME, next);
              var getMethod = function(kind) {
                if (!BUGGY && kind in proto)
                  return proto[kind];
                switch (kind) {
                  case KEYS:
                    return function keys() {
                      return new Constructor(this, kind);
                    };
                  case VALUES:
                    return function values() {
                      return new Constructor(this, kind);
                    };
                }
                return function entries() {
                  return new Constructor(this, kind);
                };
              };
              var TAG = NAME + " Iterator";
              var DEF_VALUES = DEFAULT == VALUES;
              var VALUES_BUG = false;
              var proto = Base.prototype;
              var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
              var $default = $native || getMethod(DEFAULT);
              var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod("entries") : void 0;
              var $anyNative = NAME == "Array" ? proto.entries || $native : $native;
              var methods, key, IteratorPrototype;
              if ($anyNative) {
                IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
                if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
                  setToStringTag(IteratorPrototype, TAG, true);
                  if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != "function")
                    hide(IteratorPrototype, ITERATOR, returnThis);
                }
              }
              if (DEF_VALUES && $native && $native.name !== VALUES) {
                VALUES_BUG = true;
                $default = function values() {
                  return $native.call(this);
                };
              }
              if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
                hide(proto, ITERATOR, $default);
              }
              Iterators[NAME] = $default;
              Iterators[TAG] = returnThis;
              if (DEFAULT) {
                methods = {
                  values: DEF_VALUES ? $default : getMethod(VALUES),
                  keys: IS_SET ? $default : getMethod(KEYS),
                  entries: $entries
                };
                if (FORCED)
                  for (key in methods) {
                    if (!(key in proto))
                      redefine(proto, key, methods[key]);
                  }
                else
                  $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
              }
              return methods;
            };
          },
          "02f4": function(module2, exports2, __webpack_require__) {
            var toInteger = __webpack_require__("4588");
            var defined = __webpack_require__("be13");
            module2.exports = function(TO_STRING) {
              return function(that, pos) {
                var s = String(defined(that));
                var i = toInteger(pos);
                var l = s.length;
                var a, b;
                if (i < 0 || i >= l)
                  return TO_STRING ? "" : void 0;
                a = s.charCodeAt(i);
                return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
              };
            };
          },
          "0390": function(module2, exports2, __webpack_require__) {
            "use strict";
            var at = __webpack_require__("02f4")(true);
            module2.exports = function(S, index, unicode) {
              return index + (unicode ? at(S, index).length : 1);
            };
          },
          "0bfb": function(module2, exports2, __webpack_require__) {
            "use strict";
            var anObject = __webpack_require__("cb7c");
            module2.exports = function() {
              var that = anObject(this);
              var result = "";
              if (that.global)
                result += "g";
              if (that.ignoreCase)
                result += "i";
              if (that.multiline)
                result += "m";
              if (that.unicode)
                result += "u";
              if (that.sticky)
                result += "y";
              return result;
            };
          },
          "0d58": function(module2, exports2, __webpack_require__) {
            var $keys = __webpack_require__("ce10");
            var enumBugKeys = __webpack_require__("e11e");
            module2.exports = Object.keys || function keys(O) {
              return $keys(O, enumBugKeys);
            };
          },
          "1495": function(module2, exports2, __webpack_require__) {
            var dP = __webpack_require__("86cc");
            var anObject = __webpack_require__("cb7c");
            var getKeys = __webpack_require__("0d58");
            module2.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
              anObject(O);
              var keys = getKeys(Properties);
              var length = keys.length;
              var i = 0;
              var P;
              while (length > i)
                dP.f(O, P = keys[i++], Properties[P]);
              return O;
            };
          },
          "214f": function(module2, exports2, __webpack_require__) {
            "use strict";
            __webpack_require__("b0c5");
            var redefine = __webpack_require__("2aba");
            var hide = __webpack_require__("32e9");
            var fails = __webpack_require__("79e5");
            var defined = __webpack_require__("be13");
            var wks = __webpack_require__("2b4c");
            var regexpExec = __webpack_require__("520a");
            var SPECIES = wks("species");
            var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
              var re = /./;
              re.exec = function() {
                var result = [];
                result.groups = { a: "7" };
                return result;
              };
              return "".replace(re, "$<a>") !== "7";
            });
            var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function() {
              var re = /(?:)/;
              var originalExec = re.exec;
              re.exec = function() {
                return originalExec.apply(this, arguments);
              };
              var result = "ab".split(re);
              return result.length === 2 && result[0] === "a" && result[1] === "b";
            }();
            module2.exports = function(KEY, length, exec) {
              var SYMBOL = wks(KEY);
              var DELEGATES_TO_SYMBOL = !fails(function() {
                var O = {};
                O[SYMBOL] = function() {
                  return 7;
                };
                return ""[KEY](O) != 7;
              });
              var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function() {
                var execCalled = false;
                var re = /a/;
                re.exec = function() {
                  execCalled = true;
                  return null;
                };
                if (KEY === "split") {
                  re.constructor = {};
                  re.constructor[SPECIES] = function() {
                    return re;
                  };
                }
                re[SYMBOL]("");
                return !execCalled;
              }) : void 0;
              if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === "replace" && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
                var nativeRegExpMethod = /./[SYMBOL];
                var fns = exec(defined, SYMBOL, ""[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
                  if (regexp.exec === regexpExec) {
                    if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                      return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
                    }
                    return { done: true, value: nativeMethod.call(str, regexp, arg2) };
                  }
                  return { done: false };
                });
                var strfn = fns[0];
                var rxfn = fns[1];
                redefine(String.prototype, KEY, strfn);
                hide(RegExp.prototype, SYMBOL, length == 2 ? function(string, arg) {
                  return rxfn.call(string, this, arg);
                } : function(string) {
                  return rxfn.call(string, this);
                });
              }
            };
          },
          "230e": function(module2, exports2, __webpack_require__) {
            var isObject = __webpack_require__("d3f4");
            var document2 = __webpack_require__("7726").document;
            var is = isObject(document2) && isObject(document2.createElement);
            module2.exports = function(it) {
              return is ? document2.createElement(it) : {};
            };
          },
          "23c6": function(module2, exports2, __webpack_require__) {
            var cof = __webpack_require__("2d95");
            var TAG = __webpack_require__("2b4c")("toStringTag");
            var ARG = cof(function() {
              return arguments;
            }()) == "Arguments";
            var tryGet = function(it, key) {
              try {
                return it[key];
              } catch (e) {
              }
            };
            module2.exports = function(it) {
              var O, T, B;
              return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (T = tryGet(O = Object(it), TAG)) == "string" ? T : ARG ? cof(O) : (B = cof(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : B;
            };
          },
          "2621": function(module2, exports2) {
            exports2.f = Object.getOwnPropertySymbols;
          },
          "2aba": function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__("7726");
            var hide = __webpack_require__("32e9");
            var has = __webpack_require__("69a8");
            var SRC = __webpack_require__("ca5a")("src");
            var $toString = __webpack_require__("fa5b");
            var TO_STRING = "toString";
            var TPL = ("" + $toString).split(TO_STRING);
            __webpack_require__("8378").inspectSource = function(it) {
              return $toString.call(it);
            };
            (module2.exports = function(O, key, val, safe) {
              var isFunction = typeof val == "function";
              if (isFunction)
                has(val, "name") || hide(val, "name", key);
              if (O[key] === val)
                return;
              if (isFunction)
                has(val, SRC) || hide(val, SRC, O[key] ? "" + O[key] : TPL.join(String(key)));
              if (O === global) {
                O[key] = val;
              } else if (!safe) {
                delete O[key];
                hide(O, key, val);
              } else if (O[key]) {
                O[key] = val;
              } else {
                hide(O, key, val);
              }
            })(Function.prototype, TO_STRING, function toString() {
              return typeof this == "function" && this[SRC] || $toString.call(this);
            });
          },
          "2aeb": function(module2, exports2, __webpack_require__) {
            var anObject = __webpack_require__("cb7c");
            var dPs = __webpack_require__("1495");
            var enumBugKeys = __webpack_require__("e11e");
            var IE_PROTO = __webpack_require__("613b")("IE_PROTO");
            var Empty = function() {
            };
            var PROTOTYPE = "prototype";
            var createDict = function() {
              var iframe = __webpack_require__("230e")("iframe");
              var i = enumBugKeys.length;
              var lt = "<";
              var gt = ">";
              var iframeDocument;
              iframe.style.display = "none";
              __webpack_require__("fab2").appendChild(iframe);
              iframe.src = "javascript:";
              iframeDocument = iframe.contentWindow.document;
              iframeDocument.open();
              iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt);
              iframeDocument.close();
              createDict = iframeDocument.F;
              while (i--)
                delete createDict[PROTOTYPE][enumBugKeys[i]];
              return createDict();
            };
            module2.exports = Object.create || function create(O, Properties) {
              var result;
              if (O !== null) {
                Empty[PROTOTYPE] = anObject(O);
                result = new Empty();
                Empty[PROTOTYPE] = null;
                result[IE_PROTO] = O;
              } else
                result = createDict();
              return Properties === void 0 ? result : dPs(result, Properties);
            };
          },
          "2b4c": function(module2, exports2, __webpack_require__) {
            var store = __webpack_require__("5537")("wks");
            var uid = __webpack_require__("ca5a");
            var Symbol2 = __webpack_require__("7726").Symbol;
            var USE_SYMBOL = typeof Symbol2 == "function";
            var $exports = module2.exports = function(name) {
              return store[name] || (store[name] = USE_SYMBOL && Symbol2[name] || (USE_SYMBOL ? Symbol2 : uid)("Symbol." + name));
            };
            $exports.store = store;
          },
          "2d00": function(module2, exports2) {
            module2.exports = false;
          },
          "2d95": function(module2, exports2) {
            var toString = {}.toString;
            module2.exports = function(it) {
              return toString.call(it).slice(8, -1);
            };
          },
          "2fdb": function(module2, exports2, __webpack_require__) {
            "use strict";
            var $export = __webpack_require__("5ca1");
            var context = __webpack_require__("d2c8");
            var INCLUDES = "includes";
            $export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), "String", {
              includes: function includes(searchString) {
                return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : void 0);
              }
            });
          },
          "32e9": function(module2, exports2, __webpack_require__) {
            var dP = __webpack_require__("86cc");
            var createDesc = __webpack_require__("4630");
            module2.exports = __webpack_require__("9e1e") ? function(object, key, value) {
              return dP.f(object, key, createDesc(1, value));
            } : function(object, key, value) {
              object[key] = value;
              return object;
            };
          },
          "38fd": function(module2, exports2, __webpack_require__) {
            var has = __webpack_require__("69a8");
            var toObject = __webpack_require__("4bf8");
            var IE_PROTO = __webpack_require__("613b")("IE_PROTO");
            var ObjectProto = Object.prototype;
            module2.exports = Object.getPrototypeOf || function(O) {
              O = toObject(O);
              if (has(O, IE_PROTO))
                return O[IE_PROTO];
              if (typeof O.constructor == "function" && O instanceof O.constructor) {
                return O.constructor.prototype;
              }
              return O instanceof Object ? ObjectProto : null;
            };
          },
          "41a0": function(module2, exports2, __webpack_require__) {
            "use strict";
            var create = __webpack_require__("2aeb");
            var descriptor = __webpack_require__("4630");
            var setToStringTag = __webpack_require__("7f20");
            var IteratorPrototype = {};
            __webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")("iterator"), function() {
              return this;
            });
            module2.exports = function(Constructor, NAME, next) {
              Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
              setToStringTag(Constructor, NAME + " Iterator");
            };
          },
          "456d": function(module2, exports2, __webpack_require__) {
            var toObject = __webpack_require__("4bf8");
            var $keys = __webpack_require__("0d58");
            __webpack_require__("5eda")("keys", function() {
              return function keys(it) {
                return $keys(toObject(it));
              };
            });
          },
          "4588": function(module2, exports2) {
            var ceil = Math.ceil;
            var floor = Math.floor;
            module2.exports = function(it) {
              return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
            };
          },
          "4630": function(module2, exports2) {
            module2.exports = function(bitmap, value) {
              return {
                enumerable: !(bitmap & 1),
                configurable: !(bitmap & 2),
                writable: !(bitmap & 4),
                value
              };
            };
          },
          "4bf8": function(module2, exports2, __webpack_require__) {
            var defined = __webpack_require__("be13");
            module2.exports = function(it) {
              return Object(defined(it));
            };
          },
          "5147": function(module2, exports2, __webpack_require__) {
            var MATCH = __webpack_require__("2b4c")("match");
            module2.exports = function(KEY) {
              var re = /./;
              try {
                "/./"[KEY](re);
              } catch (e) {
                try {
                  re[MATCH] = false;
                  return !"/./"[KEY](re);
                } catch (f) {
                }
              }
              return true;
            };
          },
          "520a": function(module2, exports2, __webpack_require__) {
            "use strict";
            var regexpFlags = __webpack_require__("0bfb");
            var nativeExec = RegExp.prototype.exec;
            var nativeReplace = String.prototype.replace;
            var patchedExec = nativeExec;
            var LAST_INDEX = "lastIndex";
            var UPDATES_LAST_INDEX_WRONG = function() {
              var re1 = /a/, re2 = /b*/g;
              nativeExec.call(re1, "a");
              nativeExec.call(re2, "a");
              return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
            }();
            var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
            var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;
            if (PATCH) {
              patchedExec = function exec(str) {
                var re = this;
                var lastIndex, reCopy, match, i;
                if (NPCG_INCLUDED) {
                  reCopy = new RegExp("^" + re.source + "$(?!\\s)", regexpFlags.call(re));
                }
                if (UPDATES_LAST_INDEX_WRONG)
                  lastIndex = re[LAST_INDEX];
                match = nativeExec.call(re, str);
                if (UPDATES_LAST_INDEX_WRONG && match) {
                  re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
                }
                if (NPCG_INCLUDED && match && match.length > 1) {
                  nativeReplace.call(match[0], reCopy, function() {
                    for (i = 1; i < arguments.length - 2; i++) {
                      if (arguments[i] === void 0)
                        match[i] = void 0;
                    }
                  });
                }
                return match;
              };
            }
            module2.exports = patchedExec;
          },
          "52a7": function(module2, exports2) {
            exports2.f = {}.propertyIsEnumerable;
          },
          "5537": function(module2, exports2, __webpack_require__) {
            var core = __webpack_require__("8378");
            var global = __webpack_require__("7726");
            var SHARED = "__core-js_shared__";
            var store = global[SHARED] || (global[SHARED] = {});
            (module2.exports = function(key, value) {
              return store[key] || (store[key] = value !== void 0 ? value : {});
            })("versions", []).push({
              version: core.version,
              mode: __webpack_require__("2d00") ? "pure" : "global",
              copyright: "\xA9 2019 Denis Pushkarev (zloirock.ru)"
            });
          },
          "5ca1": function(module2, exports2, __webpack_require__) {
            var global = __webpack_require__("7726");
            var core = __webpack_require__("8378");
            var hide = __webpack_require__("32e9");
            var redefine = __webpack_require__("2aba");
            var ctx = __webpack_require__("9b43");
            var PROTOTYPE = "prototype";
            var $export = function(type, name, source) {
              var IS_FORCED = type & $export.F;
              var IS_GLOBAL = type & $export.G;
              var IS_STATIC = type & $export.S;
              var IS_PROTO = type & $export.P;
              var IS_BIND = type & $export.B;
              var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
              var exports3 = IS_GLOBAL ? core : core[name] || (core[name] = {});
              var expProto = exports3[PROTOTYPE] || (exports3[PROTOTYPE] = {});
              var key, own, out, exp;
              if (IS_GLOBAL)
                source = name;
              for (key in source) {
                own = !IS_FORCED && target && target[key] !== void 0;
                out = (own ? target : source)[key];
                exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == "function" ? ctx(Function.call, out) : out;
                if (target)
                  redefine(target, key, out, type & $export.U);
                if (exports3[key] != out)
                  hide(exports3, key, exp);
                if (IS_PROTO && expProto[key] != out)
                  expProto[key] = out;
              }
            };
            global.core = core;
            $export.F = 1;
            $export.G = 2;
            $export.S = 4;
            $export.P = 8;
            $export.B = 16;
            $export.W = 32;
            $export.U = 64;
            $export.R = 128;
            module2.exports = $export;
          },
          "5eda": function(module2, exports2, __webpack_require__) {
            var $export = __webpack_require__("5ca1");
            var core = __webpack_require__("8378");
            var fails = __webpack_require__("79e5");
            module2.exports = function(KEY, exec) {
              var fn = (core.Object || {})[KEY] || Object[KEY];
              var exp = {};
              exp[KEY] = exec(fn);
              $export($export.S + $export.F * fails(function() {
                fn(1);
              }), "Object", exp);
            };
          },
          "5f1b": function(module2, exports2, __webpack_require__) {
            "use strict";
            var classof = __webpack_require__("23c6");
            var builtinExec = RegExp.prototype.exec;
            module2.exports = function(R, S) {
              var exec = R.exec;
              if (typeof exec === "function") {
                var result = exec.call(R, S);
                if (typeof result !== "object") {
                  throw new TypeError("RegExp exec method returned something other than an Object or null");
                }
                return result;
              }
              if (classof(R) !== "RegExp") {
                throw new TypeError("RegExp#exec called on incompatible receiver");
              }
              return builtinExec.call(R, S);
            };
          },
          "613b": function(module2, exports2, __webpack_require__) {
            var shared = __webpack_require__("5537")("keys");
            var uid = __webpack_require__("ca5a");
            module2.exports = function(key) {
              return shared[key] || (shared[key] = uid(key));
            };
          },
          "626a": function(module2, exports2, __webpack_require__) {
            var cof = __webpack_require__("2d95");
            module2.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
              return cof(it) == "String" ? it.split("") : Object(it);
            };
          },
          "6762": function(module2, exports2, __webpack_require__) {
            "use strict";
            var $export = __webpack_require__("5ca1");
            var $includes = __webpack_require__("c366")(true);
            $export($export.P, "Array", {
              includes: function includes(el) {
                return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
              }
            });
            __webpack_require__("9c6c")("includes");
          },
          "6821": function(module2, exports2, __webpack_require__) {
            var IObject = __webpack_require__("626a");
            var defined = __webpack_require__("be13");
            module2.exports = function(it) {
              return IObject(defined(it));
            };
          },
          "69a8": function(module2, exports2) {
            var hasOwnProperty = {}.hasOwnProperty;
            module2.exports = function(it, key) {
              return hasOwnProperty.call(it, key);
            };
          },
          "6a99": function(module2, exports2, __webpack_require__) {
            var isObject = __webpack_require__("d3f4");
            module2.exports = function(it, S) {
              if (!isObject(it))
                return it;
              var fn, val;
              if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it)))
                return val;
              if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it)))
                return val;
              if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it)))
                return val;
              throw TypeError("Can't convert object to primitive value");
            };
          },
          "7333": function(module2, exports2, __webpack_require__) {
            "use strict";
            var getKeys = __webpack_require__("0d58");
            var gOPS = __webpack_require__("2621");
            var pIE = __webpack_require__("52a7");
            var toObject = __webpack_require__("4bf8");
            var IObject = __webpack_require__("626a");
            var $assign = Object.assign;
            module2.exports = !$assign || __webpack_require__("79e5")(function() {
              var A = {};
              var B = {};
              var S = Symbol();
              var K = "abcdefghijklmnopqrst";
              A[S] = 7;
              K.split("").forEach(function(k) {
                B[k] = k;
              });
              return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join("") != K;
            }) ? function assign(target, source) {
              var T = toObject(target);
              var aLen = arguments.length;
              var index = 1;
              var getSymbols = gOPS.f;
              var isEnum = pIE.f;
              while (aLen > index) {
                var S = IObject(arguments[index++]);
                var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
                var length = keys.length;
                var j = 0;
                var key;
                while (length > j)
                  if (isEnum.call(S, key = keys[j++]))
                    T[key] = S[key];
              }
              return T;
            } : $assign;
          },
          "7726": function(module2, exports2) {
            var global = module2.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
            if (typeof __g == "number")
              __g = global;
          },
          "77f1": function(module2, exports2, __webpack_require__) {
            var toInteger = __webpack_require__("4588");
            var max = Math.max;
            var min = Math.min;
            module2.exports = function(index, length) {
              index = toInteger(index);
              return index < 0 ? max(index + length, 0) : min(index, length);
            };
          },
          "79e5": function(module2, exports2) {
            module2.exports = function(exec) {
              try {
                return !!exec();
              } catch (e) {
                return true;
              }
            };
          },
          "7f20": function(module2, exports2, __webpack_require__) {
            var def = __webpack_require__("86cc").f;
            var has = __webpack_require__("69a8");
            var TAG = __webpack_require__("2b4c")("toStringTag");
            module2.exports = function(it, tag, stat) {
              if (it && !has(it = stat ? it : it.prototype, TAG))
                def(it, TAG, { configurable: true, value: tag });
            };
          },
          "8378": function(module2, exports2) {
            var core = module2.exports = { version: "2.6.5" };
            if (typeof __e == "number")
              __e = core;
          },
          "84f2": function(module2, exports2) {
            module2.exports = {};
          },
          "86cc": function(module2, exports2, __webpack_require__) {
            var anObject = __webpack_require__("cb7c");
            var IE8_DOM_DEFINE = __webpack_require__("c69a");
            var toPrimitive = __webpack_require__("6a99");
            var dP = Object.defineProperty;
            exports2.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
              anObject(O);
              P = toPrimitive(P, true);
              anObject(Attributes);
              if (IE8_DOM_DEFINE)
                try {
                  return dP(O, P, Attributes);
                } catch (e) {
                }
              if ("get" in Attributes || "set" in Attributes)
                throw TypeError("Accessors not supported!");
              if ("value" in Attributes)
                O[P] = Attributes.value;
              return O;
            };
          },
          "9b43": function(module2, exports2, __webpack_require__) {
            var aFunction = __webpack_require__("d8e8");
            module2.exports = function(fn, that, length) {
              aFunction(fn);
              if (that === void 0)
                return fn;
              switch (length) {
                case 1:
                  return function(a) {
                    return fn.call(that, a);
                  };
                case 2:
                  return function(a, b) {
                    return fn.call(that, a, b);
                  };
                case 3:
                  return function(a, b, c) {
                    return fn.call(that, a, b, c);
                  };
              }
              return function() {
                return fn.apply(that, arguments);
              };
            };
          },
          "9c6c": function(module2, exports2, __webpack_require__) {
            var UNSCOPABLES = __webpack_require__("2b4c")("unscopables");
            var ArrayProto = Array.prototype;
            if (ArrayProto[UNSCOPABLES] == void 0)
              __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
            module2.exports = function(key) {
              ArrayProto[UNSCOPABLES][key] = true;
            };
          },
          "9def": function(module2, exports2, __webpack_require__) {
            var toInteger = __webpack_require__("4588");
            var min = Math.min;
            module2.exports = function(it) {
              return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
            };
          },
          "9e1e": function(module2, exports2, __webpack_require__) {
            module2.exports = !__webpack_require__("79e5")(function() {
              return Object.defineProperty({}, "a", { get: function() {
                return 7;
              } }).a != 7;
            });
          },
          "a352": function(module2, exports2) {
            module2.exports = __WEBPACK_EXTERNAL_MODULE_a352__;
          },
          "a481": function(module2, exports2, __webpack_require__) {
            "use strict";
            var anObject = __webpack_require__("cb7c");
            var toObject = __webpack_require__("4bf8");
            var toLength = __webpack_require__("9def");
            var toInteger = __webpack_require__("4588");
            var advanceStringIndex = __webpack_require__("0390");
            var regExpExec = __webpack_require__("5f1b");
            var max = Math.max;
            var min = Math.min;
            var floor = Math.floor;
            var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
            var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;
            var maybeToString = function(it) {
              return it === void 0 ? it : String(it);
            };
            __webpack_require__("214f")("replace", 2, function(defined, REPLACE, $replace, maybeCallNative) {
              return [
                function replace(searchValue, replaceValue) {
                  var O = defined(this);
                  var fn = searchValue == void 0 ? void 0 : searchValue[REPLACE];
                  return fn !== void 0 ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
                },
                function(regexp, replaceValue) {
                  var res = maybeCallNative($replace, regexp, this, replaceValue);
                  if (res.done)
                    return res.value;
                  var rx = anObject(regexp);
                  var S = String(this);
                  var functionalReplace = typeof replaceValue === "function";
                  if (!functionalReplace)
                    replaceValue = String(replaceValue);
                  var global = rx.global;
                  if (global) {
                    var fullUnicode = rx.unicode;
                    rx.lastIndex = 0;
                  }
                  var results = [];
                  while (true) {
                    var result = regExpExec(rx, S);
                    if (result === null)
                      break;
                    results.push(result);
                    if (!global)
                      break;
                    var matchStr = String(result[0]);
                    if (matchStr === "")
                      rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
                  }
                  var accumulatedResult = "";
                  var nextSourcePosition = 0;
                  for (var i = 0; i < results.length; i++) {
                    result = results[i];
                    var matched = String(result[0]);
                    var position = max(min(toInteger(result.index), S.length), 0);
                    var captures = [];
                    for (var j = 1; j < result.length; j++)
                      captures.push(maybeToString(result[j]));
                    var namedCaptures = result.groups;
                    if (functionalReplace) {
                      var replacerArgs = [matched].concat(captures, position, S);
                      if (namedCaptures !== void 0)
                        replacerArgs.push(namedCaptures);
                      var replacement = String(replaceValue.apply(void 0, replacerArgs));
                    } else {
                      replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
                    }
                    if (position >= nextSourcePosition) {
                      accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
                      nextSourcePosition = position + matched.length;
                    }
                  }
                  return accumulatedResult + S.slice(nextSourcePosition);
                }
              ];
              function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
                var tailPos = position + matched.length;
                var m = captures.length;
                var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
                if (namedCaptures !== void 0) {
                  namedCaptures = toObject(namedCaptures);
                  symbols = SUBSTITUTION_SYMBOLS;
                }
                return $replace.call(replacement, symbols, function(match, ch) {
                  var capture;
                  switch (ch.charAt(0)) {
                    case "$":
                      return "$";
                    case "&":
                      return matched;
                    case "`":
                      return str.slice(0, position);
                    case "'":
                      return str.slice(tailPos);
                    case "<":
                      capture = namedCaptures[ch.slice(1, -1)];
                      break;
                    default:
                      var n = +ch;
                      if (n === 0)
                        return match;
                      if (n > m) {
                        var f = floor(n / 10);
                        if (f === 0)
                          return match;
                        if (f <= m)
                          return captures[f - 1] === void 0 ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                        return match;
                      }
                      capture = captures[n - 1];
                  }
                  return capture === void 0 ? "" : capture;
                });
              }
            });
          },
          "aae3": function(module2, exports2, __webpack_require__) {
            var isObject = __webpack_require__("d3f4");
            var cof = __webpack_require__("2d95");
            var MATCH = __webpack_require__("2b4c")("match");
            module2.exports = function(it) {
              var isRegExp;
              return isObject(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : cof(it) == "RegExp");
            };
          },
          "ac6a": function(module2, exports2, __webpack_require__) {
            var $iterators = __webpack_require__("cadf");
            var getKeys = __webpack_require__("0d58");
            var redefine = __webpack_require__("2aba");
            var global = __webpack_require__("7726");
            var hide = __webpack_require__("32e9");
            var Iterators = __webpack_require__("84f2");
            var wks = __webpack_require__("2b4c");
            var ITERATOR = wks("iterator");
            var TO_STRING_TAG = wks("toStringTag");
            var ArrayValues = Iterators.Array;
            var DOMIterables = {
              CSSRuleList: true,
              CSSStyleDeclaration: false,
              CSSValueList: false,
              ClientRectList: false,
              DOMRectList: false,
              DOMStringList: false,
              DOMTokenList: true,
              DataTransferItemList: false,
              FileList: false,
              HTMLAllCollection: false,
              HTMLCollection: false,
              HTMLFormElement: false,
              HTMLSelectElement: false,
              MediaList: true,
              MimeTypeArray: false,
              NamedNodeMap: false,
              NodeList: true,
              PaintRequestList: false,
              Plugin: false,
              PluginArray: false,
              SVGLengthList: false,
              SVGNumberList: false,
              SVGPathSegList: false,
              SVGPointList: false,
              SVGStringList: false,
              SVGTransformList: false,
              SourceBufferList: false,
              StyleSheetList: true,
              TextTrackCueList: false,
              TextTrackList: false,
              TouchList: false
            };
            for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
              var NAME = collections[i];
              var explicit = DOMIterables[NAME];
              var Collection = global[NAME];
              var proto = Collection && Collection.prototype;
              var key;
              if (proto) {
                if (!proto[ITERATOR])
                  hide(proto, ITERATOR, ArrayValues);
                if (!proto[TO_STRING_TAG])
                  hide(proto, TO_STRING_TAG, NAME);
                Iterators[NAME] = ArrayValues;
                if (explicit) {
                  for (key in $iterators)
                    if (!proto[key])
                      redefine(proto, key, $iterators[key], true);
                }
              }
            }
          },
          "b0c5": function(module2, exports2, __webpack_require__) {
            "use strict";
            var regexpExec = __webpack_require__("520a");
            __webpack_require__("5ca1")({
              target: "RegExp",
              proto: true,
              forced: regexpExec !== /./.exec
            }, {
              exec: regexpExec
            });
          },
          "be13": function(module2, exports2) {
            module2.exports = function(it) {
              if (it == void 0)
                throw TypeError("Can't call method on  " + it);
              return it;
            };
          },
          "c366": function(module2, exports2, __webpack_require__) {
            var toIObject = __webpack_require__("6821");
            var toLength = __webpack_require__("9def");
            var toAbsoluteIndex = __webpack_require__("77f1");
            module2.exports = function(IS_INCLUDES) {
              return function($this, el, fromIndex) {
                var O = toIObject($this);
                var length = toLength(O.length);
                var index = toAbsoluteIndex(fromIndex, length);
                var value;
                if (IS_INCLUDES && el != el)
                  while (length > index) {
                    value = O[index++];
                    if (value != value)
                      return true;
                  }
                else
                  for (; length > index; index++)
                    if (IS_INCLUDES || index in O) {
                      if (O[index] === el)
                        return IS_INCLUDES || index || 0;
                    }
                return !IS_INCLUDES && -1;
              };
            };
          },
          "c649": function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            (function(global) {
              __webpack_require__.d(__webpack_exports__, "c", function() {
                return insertNodeAt;
              });
              __webpack_require__.d(__webpack_exports__, "a", function() {
                return camelize;
              });
              __webpack_require__.d(__webpack_exports__, "b", function() {
                return console;
              });
              __webpack_require__.d(__webpack_exports__, "d", function() {
                return removeNode;
              });
              var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a481");
              var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__);
              function getConsole() {
                if (typeof window !== "undefined") {
                  return window.console;
                }
                return global.console;
              }
              var console = getConsole();
              function cached(fn) {
                var cache = /* @__PURE__ */ Object.create(null);
                return function cachedFn(str) {
                  var hit = cache[str];
                  return hit || (cache[str] = fn(str));
                };
              }
              var regex = /-(\w)/g;
              var camelize = cached(function(str) {
                return str.replace(regex, function(_, c) {
                  return c ? c.toUpperCase() : "";
                });
              });
              function removeNode(node) {
                if (node.parentElement !== null) {
                  node.parentElement.removeChild(node);
                }
              }
              function insertNodeAt(fatherNode, node, position) {
                var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
                fatherNode.insertBefore(node, refNode);
              }
            }).call(this, __webpack_require__("c8ba"));
          },
          "c69a": function(module2, exports2, __webpack_require__) {
            module2.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function() {
              return Object.defineProperty(__webpack_require__("230e")("div"), "a", { get: function() {
                return 7;
              } }).a != 7;
            });
          },
          "c8ba": function(module2, exports2) {
            var g;
            g = function() {
              return this;
            }();
            try {
              g = g || new Function("return this")();
            } catch (e) {
              if (typeof window === "object")
                g = window;
            }
            module2.exports = g;
          },
          "ca5a": function(module2, exports2) {
            var id = 0;
            var px = Math.random();
            module2.exports = function(key) {
              return "Symbol(".concat(key === void 0 ? "" : key, ")_", (++id + px).toString(36));
            };
          },
          "cadf": function(module2, exports2, __webpack_require__) {
            "use strict";
            var addToUnscopables = __webpack_require__("9c6c");
            var step = __webpack_require__("d53b");
            var Iterators = __webpack_require__("84f2");
            var toIObject = __webpack_require__("6821");
            module2.exports = __webpack_require__("01f9")(Array, "Array", function(iterated, kind) {
              this._t = toIObject(iterated);
              this._i = 0;
              this._k = kind;
            }, function() {
              var O = this._t;
              var kind = this._k;
              var index = this._i++;
              if (!O || index >= O.length) {
                this._t = void 0;
                return step(1);
              }
              if (kind == "keys")
                return step(0, index);
              if (kind == "values")
                return step(0, O[index]);
              return step(0, [index, O[index]]);
            }, "values");
            Iterators.Arguments = Iterators.Array;
            addToUnscopables("keys");
            addToUnscopables("values");
            addToUnscopables("entries");
          },
          "cb7c": function(module2, exports2, __webpack_require__) {
            var isObject = __webpack_require__("d3f4");
            module2.exports = function(it) {
              if (!isObject(it))
                throw TypeError(it + " is not an object!");
              return it;
            };
          },
          "ce10": function(module2, exports2, __webpack_require__) {
            var has = __webpack_require__("69a8");
            var toIObject = __webpack_require__("6821");
            var arrayIndexOf = __webpack_require__("c366")(false);
            var IE_PROTO = __webpack_require__("613b")("IE_PROTO");
            module2.exports = function(object, names) {
              var O = toIObject(object);
              var i = 0;
              var result = [];
              var key;
              for (key in O)
                if (key != IE_PROTO)
                  has(O, key) && result.push(key);
              while (names.length > i)
                if (has(O, key = names[i++])) {
                  ~arrayIndexOf(result, key) || result.push(key);
                }
              return result;
            };
          },
          "d2c8": function(module2, exports2, __webpack_require__) {
            var isRegExp = __webpack_require__("aae3");
            var defined = __webpack_require__("be13");
            module2.exports = function(that, searchString, NAME) {
              if (isRegExp(searchString))
                throw TypeError("String#" + NAME + " doesn't accept regex!");
              return String(defined(that));
            };
          },
          "d3f4": function(module2, exports2) {
            module2.exports = function(it) {
              return typeof it === "object" ? it !== null : typeof it === "function";
            };
          },
          "d53b": function(module2, exports2) {
            module2.exports = function(done, value) {
              return { value, done: !!done };
            };
          },
          "d8e8": function(module2, exports2) {
            module2.exports = function(it) {
              if (typeof it != "function")
                throw TypeError(it + " is not a function!");
              return it;
            };
          },
          "e11e": function(module2, exports2) {
            module2.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
          },
          "f559": function(module2, exports2, __webpack_require__) {
            "use strict";
            var $export = __webpack_require__("5ca1");
            var toLength = __webpack_require__("9def");
            var context = __webpack_require__("d2c8");
            var STARTS_WITH = "startsWith";
            var $startsWith = ""[STARTS_WITH];
            $export($export.P + $export.F * __webpack_require__("5147")(STARTS_WITH), "String", {
              startsWith: function startsWith(searchString) {
                var that = context(this, searchString, STARTS_WITH);
                var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : void 0, that.length));
                var search = String(searchString);
                return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
              }
            });
          },
          "f6fd": function(module2, exports2) {
            (function(document2) {
              var currentScript = "currentScript", scripts = document2.getElementsByTagName("script");
              if (!(currentScript in document2)) {
                Object.defineProperty(document2, currentScript, {
                  get: function() {
                    try {
                      throw new Error();
                    } catch (err) {
                      var i, res = (/.*at [^\(]*\((.*):.+:.+\)$/ig.exec(err.stack) || [false])[1];
                      for (i in scripts) {
                        if (scripts[i].src == res || scripts[i].readyState == "interactive") {
                          return scripts[i];
                        }
                      }
                      return null;
                    }
                  }
                });
              }
            })(document);
          },
          "f751": function(module2, exports2, __webpack_require__) {
            var $export = __webpack_require__("5ca1");
            $export($export.S + $export.F, "Object", { assign: __webpack_require__("7333") });
          },
          "fa5b": function(module2, exports2, __webpack_require__) {
            module2.exports = __webpack_require__("5537")("native-function-to-string", Function.toString);
          },
          "fab2": function(module2, exports2, __webpack_require__) {
            var document2 = __webpack_require__("7726").document;
            module2.exports = document2 && document2.documentElement;
          },
          "fb15": function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            if (typeof window !== "undefined") {
              if (true) {
                __webpack_require__("f6fd");
              }
              var setPublicPath_i;
              if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
                __webpack_require__.p = setPublicPath_i[1];
              }
            }
            var setPublicPath = null;
            var es6_object_assign = __webpack_require__("f751");
            var es6_string_starts_with = __webpack_require__("f559");
            var web_dom_iterable = __webpack_require__("ac6a");
            var es6_array_iterator = __webpack_require__("cadf");
            var es6_object_keys = __webpack_require__("456d");
            function _arrayWithHoles(arr) {
              if (Array.isArray(arr))
                return arr;
            }
            function _iterableToArrayLimit(arr, i) {
              if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
                return;
              var _arr = [];
              var _n = true;
              var _d = false;
              var _e = void 0;
              try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                  _arr.push(_s.value);
                  if (i && _arr.length === i)
                    break;
                }
              } catch (err) {
                _d = true;
                _e = err;
              } finally {
                try {
                  if (!_n && _i["return"] != null)
                    _i["return"]();
                } finally {
                  if (_d)
                    throw _e;
                }
              }
              return _arr;
            }
            function _arrayLikeToArray(arr, len) {
              if (len == null || len > arr.length)
                len = arr.length;
              for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i];
              }
              return arr2;
            }
            function _unsupportedIterableToArray(o, minLen) {
              if (!o)
                return;
              if (typeof o === "string")
                return _arrayLikeToArray(o, minLen);
              var n = Object.prototype.toString.call(o).slice(8, -1);
              if (n === "Object" && o.constructor)
                n = o.constructor.name;
              if (n === "Map" || n === "Set")
                return Array.from(o);
              if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                return _arrayLikeToArray(o, minLen);
            }
            function _nonIterableRest() {
              throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function _slicedToArray(arr, i) {
              return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
            }
            var es7_array_includes = __webpack_require__("6762");
            var es6_string_includes = __webpack_require__("2fdb");
            function _arrayWithoutHoles(arr) {
              if (Array.isArray(arr))
                return _arrayLikeToArray(arr);
            }
            function _iterableToArray(iter) {
              if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
                return Array.from(iter);
            }
            function _nonIterableSpread() {
              throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function _toConsumableArray(arr) {
              return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
            }
            var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_ = __webpack_require__("a352");
            var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default = /* @__PURE__ */ __webpack_require__.n(external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_);
            var helper = __webpack_require__("c649");
            function buildAttribute(object, propName, value) {
              if (value === void 0) {
                return object;
              }
              object = object || {};
              object[propName] = value;
              return object;
            }
            function computeVmIndex(vnodes, element) {
              return vnodes.map(function(elt) {
                return elt.elm;
              }).indexOf(element);
            }
            function _computeIndexes(slots, children, isTransition, footerOffset) {
              if (!slots) {
                return [];
              }
              var elmFromNodes = slots.map(function(elt) {
                return elt.elm;
              });
              var footerIndex = children.length - footerOffset;
              var rawIndexes = _toConsumableArray(children).map(function(elt, idx) {
                return idx >= footerIndex ? elmFromNodes.length : elmFromNodes.indexOf(elt);
              });
              return isTransition ? rawIndexes.filter(function(ind) {
                return ind !== -1;
              }) : rawIndexes;
            }
            function emit(evtName, evtData) {
              var _this = this;
              this.$nextTick(function() {
                return _this.$emit(evtName.toLowerCase(), evtData);
              });
            }
            function delegateAndEmit(evtName) {
              var _this2 = this;
              return function(evtData) {
                if (_this2.realList !== null) {
                  _this2["onDrag" + evtName](evtData);
                }
                emit.call(_this2, evtName, evtData);
              };
            }
            function isTransitionName(name) {
              return ["transition-group", "TransitionGroup"].includes(name);
            }
            function vuedraggable_isTransition(slots) {
              if (!slots || slots.length !== 1) {
                return false;
              }
              var _slots = _slicedToArray(slots, 1), componentOptions = _slots[0].componentOptions;
              if (!componentOptions) {
                return false;
              }
              return isTransitionName(componentOptions.tag);
            }
            function getSlot(slot, scopedSlot, key) {
              return slot[key] || (scopedSlot[key] ? scopedSlot[key]() : void 0);
            }
            function computeChildrenAndOffsets(children, slot, scopedSlot) {
              var headerOffset = 0;
              var footerOffset = 0;
              var header = getSlot(slot, scopedSlot, "header");
              if (header) {
                headerOffset = header.length;
                children = children ? [].concat(_toConsumableArray(header), _toConsumableArray(children)) : _toConsumableArray(header);
              }
              var footer = getSlot(slot, scopedSlot, "footer");
              if (footer) {
                footerOffset = footer.length;
                children = children ? [].concat(_toConsumableArray(children), _toConsumableArray(footer)) : _toConsumableArray(footer);
              }
              return {
                children,
                headerOffset,
                footerOffset
              };
            }
            function getComponentAttributes($attrs, componentData) {
              var attributes = null;
              var update = function update2(name, value) {
                attributes = buildAttribute(attributes, name, value);
              };
              var attrs = Object.keys($attrs).filter(function(key) {
                return key === "id" || key.startsWith("data-");
              }).reduce(function(res, key) {
                res[key] = $attrs[key];
                return res;
              }, {});
              update("attrs", attrs);
              if (!componentData) {
                return attributes;
              }
              var on = componentData.on, props2 = componentData.props, componentDataAttrs = componentData.attrs;
              update("on", on);
              update("props", props2);
              Object.assign(attributes.attrs, componentDataAttrs);
              return attributes;
            }
            var eventsListened = ["Start", "Add", "Remove", "Update", "End"];
            var eventsToEmit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
            var readonlyProperties = ["Move"].concat(eventsListened, eventsToEmit).map(function(evt) {
              return "on" + evt;
            });
            var draggingElement = null;
            var props = {
              options: Object,
              list: {
                type: Array,
                required: false,
                default: null
              },
              value: {
                type: Array,
                required: false,
                default: null
              },
              noTransitionOnDrag: {
                type: Boolean,
                default: false
              },
              clone: {
                type: Function,
                default: function _default(original) {
                  return original;
                }
              },
              element: {
                type: String,
                default: "div"
              },
              tag: {
                type: String,
                default: null
              },
              move: {
                type: Function,
                default: null
              },
              componentData: {
                type: Object,
                required: false,
                default: null
              }
            };
            var draggableComponent = {
              name: "draggable",
              inheritAttrs: false,
              props,
              data: function data() {
                return {
                  transitionMode: false,
                  noneFunctionalComponentMode: false
                };
              },
              render: function render(h) {
                var slots = this.$slots.default;
                this.transitionMode = vuedraggable_isTransition(slots);
                var _computeChildrenAndOf = computeChildrenAndOffsets(slots, this.$slots, this.$scopedSlots), children = _computeChildrenAndOf.children, headerOffset = _computeChildrenAndOf.headerOffset, footerOffset = _computeChildrenAndOf.footerOffset;
                this.headerOffset = headerOffset;
                this.footerOffset = footerOffset;
                var attributes = getComponentAttributes(this.$attrs, this.componentData);
                return h(this.getTag(), attributes, children);
              },
              created: function created() {
                if (this.list !== null && this.value !== null) {
                  helper["b"].error("Value and list props are mutually exclusive! Please set one or another.");
                }
                if (this.element !== "div") {
                  helper["b"].warn("Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props");
                }
                if (this.options !== void 0) {
                  helper["b"].warn("Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props");
                }
              },
              mounted: function mounted() {
                var _this3 = this;
                this.noneFunctionalComponentMode = this.getTag().toLowerCase() !== this.$el.nodeName.toLowerCase() && !this.getIsFunctional();
                if (this.noneFunctionalComponentMode && this.transitionMode) {
                  throw new Error("Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ".concat(this.getTag()));
                }
                var optionsAdded = {};
                eventsListened.forEach(function(elt) {
                  optionsAdded["on" + elt] = delegateAndEmit.call(_this3, elt);
                });
                eventsToEmit.forEach(function(elt) {
                  optionsAdded["on" + elt] = emit.bind(_this3, elt);
                });
                var attributes = Object.keys(this.$attrs).reduce(function(res, key) {
                  res[Object(helper["a"])(key)] = _this3.$attrs[key];
                  return res;
                }, {});
                var options = Object.assign({}, this.options, attributes, optionsAdded, {
                  onMove: function onMove(evt, originalEvent) {
                    return _this3.onDragMove(evt, originalEvent);
                  }
                });
                !("draggable" in options) && (options.draggable = ">*");
                this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(this.rootContainer, options);
                this.computeIndexes();
              },
              beforeDestroy: function beforeDestroy() {
                if (this._sortable !== void 0)
                  this._sortable.destroy();
              },
              computed: {
                rootContainer: function rootContainer() {
                  return this.transitionMode ? this.$el.children[0] : this.$el;
                },
                realList: function realList() {
                  return this.list ? this.list : this.value;
                }
              },
              watch: {
                options: {
                  handler: function handler(newOptionValue) {
                    this.updateOptions(newOptionValue);
                  },
                  deep: true
                },
                $attrs: {
                  handler: function handler(newOptionValue) {
                    this.updateOptions(newOptionValue);
                  },
                  deep: true
                },
                realList: function realList() {
                  this.computeIndexes();
                }
              },
              methods: {
                getIsFunctional: function getIsFunctional() {
                  var fnOptions = this._vnode.fnOptions;
                  return fnOptions && fnOptions.functional;
                },
                getTag: function getTag() {
                  return this.tag || this.element;
                },
                updateOptions: function updateOptions(newOptionValue) {
                  for (var property in newOptionValue) {
                    var value = Object(helper["a"])(property);
                    if (readonlyProperties.indexOf(value) === -1) {
                      this._sortable.option(value, newOptionValue[property]);
                    }
                  }
                },
                getChildrenNodes: function getChildrenNodes() {
                  if (this.noneFunctionalComponentMode) {
                    return this.$children[0].$slots.default;
                  }
                  var rawNodes = this.$slots.default;
                  return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
                },
                computeIndexes: function computeIndexes() {
                  var _this4 = this;
                  this.$nextTick(function() {
                    _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode, _this4.footerOffset);
                  });
                },
                getUnderlyingVm: function getUnderlyingVm(htmlElt) {
                  var index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);
                  if (index === -1) {
                    return null;
                  }
                  var element = this.realList[index];
                  return {
                    index,
                    element
                  };
                },
                getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
                  var vue = _ref.__vue__;
                  if (!vue || !vue.$options || !isTransitionName(vue.$options._componentTag)) {
                    if (!("realList" in vue) && vue.$children.length === 1 && "realList" in vue.$children[0])
                      return vue.$children[0];
                    return vue;
                  }
                  return vue.$parent;
                },
                emitChanges: function emitChanges(evt) {
                  var _this5 = this;
                  this.$nextTick(function() {
                    _this5.$emit("change", evt);
                  });
                },
                alterList: function alterList(onList) {
                  if (this.list) {
                    onList(this.list);
                    return;
                  }
                  var newList = _toConsumableArray(this.value);
                  onList(newList);
                  this.$emit("input", newList);
                },
                spliceList: function spliceList() {
                  var _arguments = arguments;
                  var spliceList2 = function spliceList3(list) {
                    return list.splice.apply(list, _toConsumableArray(_arguments));
                  };
                  this.alterList(spliceList2);
                },
                updatePosition: function updatePosition(oldIndex, newIndex) {
                  var updatePosition2 = function updatePosition3(list) {
                    return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
                  };
                  this.alterList(updatePosition2);
                },
                getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
                  var to = _ref2.to, related = _ref2.related;
                  var component = this.getUnderlyingPotencialDraggableComponent(to);
                  if (!component) {
                    return {
                      component
                    };
                  }
                  var list = component.realList;
                  var context = {
                    list,
                    component
                  };
                  if (to !== related && list && component.getUnderlyingVm) {
                    var destination = component.getUnderlyingVm(related);
                    if (destination) {
                      return Object.assign(destination, context);
                    }
                  }
                  return context;
                },
                getVmIndex: function getVmIndex(domIndex) {
                  var indexes = this.visibleIndexes;
                  var numberIndexes = indexes.length;
                  return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
                },
                getComponent: function getComponent() {
                  return this.$slots.default[0].componentInstance;
                },
                resetTransitionData: function resetTransitionData(index) {
                  if (!this.noTransitionOnDrag || !this.transitionMode) {
                    return;
                  }
                  var nodes = this.getChildrenNodes();
                  nodes[index].data = null;
                  var transitionContainer = this.getComponent();
                  transitionContainer.children = [];
                  transitionContainer.kept = void 0;
                },
                onDragStart: function onDragStart(evt) {
                  this.context = this.getUnderlyingVm(evt.item);
                  evt.item._underlying_vm_ = this.clone(this.context.element);
                  draggingElement = evt.item;
                },
                onDragAdd: function onDragAdd(evt) {
                  var element = evt.item._underlying_vm_;
                  if (element === void 0) {
                    return;
                  }
                  Object(helper["d"])(evt.item);
                  var newIndex = this.getVmIndex(evt.newIndex);
                  this.spliceList(newIndex, 0, element);
                  this.computeIndexes();
                  var added = {
                    element,
                    newIndex
                  };
                  this.emitChanges({
                    added
                  });
                },
                onDragRemove: function onDragRemove(evt) {
                  Object(helper["c"])(this.rootContainer, evt.item, evt.oldIndex);
                  if (evt.pullMode === "clone") {
                    Object(helper["d"])(evt.clone);
                    return;
                  }
                  var oldIndex = this.context.index;
                  this.spliceList(oldIndex, 1);
                  var removed = {
                    element: this.context.element,
                    oldIndex
                  };
                  this.resetTransitionData(oldIndex);
                  this.emitChanges({
                    removed
                  });
                },
                onDragUpdate: function onDragUpdate(evt) {
                  Object(helper["d"])(evt.item);
                  Object(helper["c"])(evt.from, evt.item, evt.oldIndex);
                  var oldIndex = this.context.index;
                  var newIndex = this.getVmIndex(evt.newIndex);
                  this.updatePosition(oldIndex, newIndex);
                  var moved = {
                    element: this.context.element,
                    oldIndex,
                    newIndex
                  };
                  this.emitChanges({
                    moved
                  });
                },
                updateProperty: function updateProperty(evt, propertyName) {
                  evt.hasOwnProperty(propertyName) && (evt[propertyName] += this.headerOffset);
                },
                computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
                  if (!relatedContext.element) {
                    return 0;
                  }
                  var domChildren = _toConsumableArray(evt.to.children).filter(function(el) {
                    return el.style["display"] !== "none";
                  });
                  var currentDOMIndex = domChildren.indexOf(evt.related);
                  var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
                  var draggedInList = domChildren.indexOf(draggingElement) !== -1;
                  return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
                },
                onDragMove: function onDragMove(evt, originalEvent) {
                  var onMove = this.move;
                  if (!onMove || !this.realList) {
                    return true;
                  }
                  var relatedContext = this.getRelatedContextFromMoveEvent(evt);
                  var draggedContext = this.context;
                  var futureIndex = this.computeFutureIndex(relatedContext, evt);
                  Object.assign(draggedContext, {
                    futureIndex
                  });
                  var sendEvt = Object.assign({}, evt, {
                    relatedContext,
                    draggedContext
                  });
                  return onMove(sendEvt, originalEvent);
                },
                onDragEnd: function onDragEnd() {
                  this.computeIndexes();
                  draggingElement = null;
                }
              }
            };
            if (typeof window !== "undefined" && "Vue" in window) {
              window.Vue.component("draggable", draggableComponent);
            }
            var vuedraggable = draggableComponent;
            var entry_lib = __webpack_exports__["default"] = vuedraggable;
          }
        })["default"];
      });
    }
  });

  // frappe/public/js/print_format_builder/PrintFormat.vue
  var import_vuedraggable4 = __toESM(require_vuedraggable_umd());

  // frappe/public/js/print_format_builder/HTMLEditor.vue
  var __vue_script__ = {
    name: "HTMLEditor",
    props: ["value", "button-label"],
    data() {
      return {
        editing: false
      };
    },
    methods: {
      toggle_edit() {
        if (this.editing) {
          this.$emit("change", this.get_value());
          this.editing = false;
          return;
        }
        this.editing = true;
        if (!this.control) {
          this.control = frappe.ui.form.make_control({
            parent: this.$refs.editor,
            df: {
              fieldname: "editor",
              fieldtype: "HTML Editor",
              min_lines: 10,
              max_lines: 30,
              change: () => {
                this.$emit("change", this.get_value());
              }
            },
            render_input: true
          });
        }
        this.control.set_value(this.value);
      },
      get_value() {
        return frappe.dom.remove_script_and_style(this.control.get_value());
      }
    }
  };
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "html-editor" }, [
      _c("div", { staticClass: "d-flex justify-content-end" }, [
        _c("button", {
          staticClass: "btn btn-default btn-xs btn-edit",
          on: { click: _vm.toggle_edit }
        }, [
          _vm._v("\n			" + _vm._s(!_vm.editing ? _vm.buttonLabel : _vm.__("Done")) + "\n		")
        ])
      ]),
      _vm._v(" "),
      !_vm.editing ? _c("div", { domProps: { innerHTML: _vm._s(_vm.value) } }) : _vm._e(),
      _vm._v(" "),
      _c("div", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.editing,
            expression: "editing"
          }
        ],
        ref: "editor"
      })
    ]);
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  var __vue_inject_styles__ = function(inject) {
    if (!inject)
      return;
    inject("data-v-4b25833c_0", { source: "\n.html-editor {\n	position: relative;\n	border: 1px solid var(--dark-border-color);\n	border-radius: var(--border-radius);\n	padding: 1rem;\n	margin-bottom: 1rem;\n}\n.html-editor:last-child {\n	margin-bottom: 0;\n}\n", map: { "version": 3, "sources": ["frappe/public/js/print_format_builder/HTMLEditor.vue"], "names": [], "mappings": ";AAwDA;CACA,kBAAA;CACA,0CAAA;CACA,mCAAA;CACA,aAAA;CACA,mBAAA;AACA;AAEA;CACA,gBAAA;AACA", "file": "HTMLEditor.vue", "sourcesContent": ['<template>\n	<div class="html-editor">\n		<div class="d-flex justify-content-end">\n			<button\n				class="btn btn-default btn-xs btn-edit"\n				@click="toggle_edit"\n			>\n				{{ !editing ? buttonLabel : __("Done") }}\n			</button>\n		</div>\n		<div v-if="!editing" v-html="value"></div>\n		<div v-show="editing" ref="editor"></div>\n	</div>\n</template>\n<script>\nexport default {\n	name: "HTMLEditor",\n	props: ["value", "button-label"],\n	data() {\n		return {\n			editing: false\n		};\n	},\n	methods: {\n		toggle_edit() {\n			if (this.editing) {\n				this.$emit("change", this.get_value());\n				this.editing = false;\n				return;\n			}\n\n			this.editing = true;\n			if (!this.control) {\n				this.control = frappe.ui.form.make_control({\n					parent: this.$refs.editor,\n					df: {\n						fieldname: "editor",\n						fieldtype: "HTML Editor",\n						min_lines: 10,\n						max_lines: 30,\n						change: () => {\n							this.$emit("change", this.get_value());\n						}\n					},\n					render_input: true\n				});\n			}\n			this.control.set_value(this.value);\n		},\n		get_value() {\n			return frappe.dom.remove_script_and_style(this.control.get_value());\n		}\n	}\n};\n<\/script>\n<style>\n.html-editor {\n	position: relative;\n	border: 1px solid var(--dark-border-color);\n	border-radius: var(--border-radius);\n	padding: 1rem;\n	margin-bottom: 1rem;\n}\n\n.html-editor:last-child {\n	margin-bottom: 0;\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__ = void 0;
  var __vue_module_identifier__ = void 0;
  var __vue_is_functional_template__ = false;
  function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "frappe/public/js/print_format_builder/HTMLEditor.vue";
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
  var HTMLEditor_default = __vue_component__;

  // frappe/public/js/print_format_builder/utils.js
  function create_default_layout(meta, print_format) {
    let layout = {
      header: get_default_header(meta),
      sections: []
    };
    let section = null, column = null;
    function set_column(df) {
      if (!section) {
        set_section();
      }
      column = get_new_column(df);
      section.columns.push(column);
    }
    function set_section(df) {
      section = get_new_section(df);
      column = null;
      layout.sections.push(section);
    }
    function get_new_section(df) {
      if (!df) {
        df = { label: "" };
      }
      return {
        label: df.label || "",
        columns: []
      };
    }
    function get_new_column(df) {
      if (!df) {
        df = { label: "" };
      }
      return {
        label: df.label || "",
        fields: []
      };
    }
    for (let df of meta.fields) {
      if (df.fieldname) {
        df = JSON.parse(JSON.stringify(df));
      } else {
        continue;
      }
      if (df.fieldtype === "Section Break") {
        set_section(df);
      } else if (df.fieldtype === "Column Break") {
        set_column(df);
      } else if (df.label) {
        if (!column)
          set_column();
        if (!df.print_hide) {
          let field = {
            label: df.label,
            fieldname: df.fieldname,
            fieldtype: df.fieldtype,
            options: df.options
          };
          let field_template = get_field_template(print_format, df.fieldname);
          if (field_template) {
            field.label = `${__(df.label)} (${__("Field Template")})`;
            field.fieldtype = "Field Template";
            field.field_template = field_template.name;
            field.fieldname = df.fieldname = "_template";
          }
          if (df.fieldtype === "Table") {
            field.table_columns = get_table_columns(df);
          }
          column.fields.push(field);
          section.has_fields = true;
        }
      }
    }
    layout.sections = layout.sections.filter((section2) => section2.has_fields);
    return layout;
  }
  function get_table_columns(df) {
    let table_columns = [];
    let table_fields = frappe.get_meta(df.options).fields;
    let total_width = 0;
    for (let tf of table_fields) {
      if (!in_list(["Section Break", "Column Break"], tf.fieldtype) && !tf.print_hide && df.label && total_width < 100) {
        let width = typeof tf.width == "number" && tf.width < 100 ? tf.width : tf.width ? 20 : 10;
        table_columns.push({
          label: tf.label,
          fieldname: tf.fieldname,
          fieldtype: tf.fieldtype,
          options: tf.options,
          width
        });
        total_width += width;
      }
    }
    return table_columns;
  }
  function get_field_template(print_format, fieldname) {
    let templates = print_format.__onload.print_templates || {};
    for (let template of templates) {
      if (template.field === fieldname) {
        return template;
      }
    }
    return null;
  }
  function get_default_header(meta) {
    return `<div class="document-header">
	<h3>${meta.name}</h3>
	<p>{{ doc.name }}</p>
</div>`;
  }
  function pluck(object, keys) {
    let out = {};
    for (let key of keys) {
      if (key in object) {
        out[key] = object[key];
      }
    }
    return out;
  }
  function get_image_dimensions(src) {
    return new Promise((resolve) => {
      let img = new Image();
      img.onload = function() {
        resolve({ width: this.width, height: this.height });
      };
      img.src = src;
    });
  }

  // frappe/public/js/print_format_builder/store.js
  var stores = {};
  function getStore(print_format_name) {
    if (stores[print_format_name]) {
      return stores[print_format_name];
    }
    let options = {
      data() {
        return {
          print_format_name,
          letterhead_name: null,
          print_format: null,
          letterhead: null,
          doctype: null,
          meta: null,
          layout: null,
          dirty: false,
          edit_letterhead: false
        };
      },
      watch: {
        layout: {
          deep: true,
          handler() {
            this.dirty = true;
          }
        },
        print_format: {
          deep: true,
          handler() {
            this.dirty = true;
          }
        }
      },
      methods: {
        fetch() {
          return new Promise((resolve) => {
            frappe.model.clear_doc("Print Format", this.print_format_name);
            frappe.model.with_doc("Print Format", this.print_format_name, () => {
              let print_format = frappe.get_doc("Print Format", this.print_format_name);
              frappe.model.with_doctype(print_format.doc_type, () => {
                this.meta = frappe.get_meta(print_format.doc_type);
                this.print_format = print_format;
                this.layout = this.get_layout();
                this.$nextTick(() => this.dirty = false);
                this.edit_letterhead = false;
                resolve();
              });
            });
          });
        },
        update({ fieldname, value }) {
          this.$set(this.print_format, fieldname, value);
        },
        save_changes() {
          frappe.dom.freeze(__("Saving..."));
          this.layout.sections = this.layout.sections.filter((section) => !section.remove).map((section) => {
            section.columns = section.columns.map((column) => {
              column.fields = column.fields.filter((df) => !df.remove).map((df) => {
                if (df.table_columns) {
                  df.table_columns = df.table_columns.map((tf) => {
                    return pluck(tf, [
                      "label",
                      "fieldname",
                      "fieldtype",
                      "options",
                      "width",
                      "field_template"
                    ]);
                  });
                }
                return pluck(df, [
                  "label",
                  "fieldname",
                  "fieldtype",
                  "options",
                  "table_columns",
                  "html",
                  "field_template"
                ]);
              });
              return column;
            });
            return section;
          });
          this.print_format.format_data = JSON.stringify(this.layout);
          frappe.call("frappe.client.save", {
            doc: this.print_format
          }).then(() => {
            if (this.letterhead && this.letterhead._dirty) {
              return frappe.call("frappe.client.save", {
                doc: this.letterhead
              }).then((r) => this.letterhead = r.message);
            }
          }).then(() => this.fetch()).always(() => {
            frappe.dom.unfreeze();
            this.$emit("after_save");
          });
        },
        reset_changes() {
          this.fetch();
        },
        get_layout() {
          if (this.print_format) {
            if (typeof this.print_format.format_data == "string") {
              return JSON.parse(this.print_format.format_data);
            }
            return this.print_format.format_data;
          }
          return null;
        },
        get_default_layout() {
          return create_default_layout(this.meta, this.print_format);
        },
        change_letterhead(letterhead) {
          return frappe.db.get_doc("Letter Head", letterhead).then((doc) => {
            this.letterhead = doc;
          });
        }
      }
    };
    stores[print_format_name] = new Vue(options);
    return stores[print_format_name];
  }
  var storeMixin = {
    inject: ["$store"],
    computed: {
      print_format() {
        return this.$store.print_format;
      },
      layout() {
        return this.$store.layout;
      },
      letterhead() {
        return this.$store.letterhead;
      },
      meta() {
        return this.$store.meta;
      }
    }
  };

  // frappe/public/js/print_format_builder/LetterHeadEditor.vue
  var __vue_script__2 = {
    name: "LetterHeadEditor",
    mixins: [storeMixin],
    data() {
      return {
        range_input_field: null,
        aspect_ratio: null
      };
    },
    watch: {
      letterhead: {
        deep: true,
        immediate: true,
        handler(letterhead) {
          if (!letterhead)
            return;
          if (letterhead.image_width && letterhead.image_height) {
            let dimension = letterhead.image_width > letterhead.image_height ? "width" : "height";
            let dimension_value = letterhead["image_" + dimension];
            letterhead.content = `
						<div style="text-align: ${letterhead.align.toLowerCase()};">
							<img
								src="${letterhead.image}"
								alt="${letterhead.name}"
								${dimension}="${dimension_value}"
								style="${dimension}: ${dimension_value}px;">
						</div>
					`;
          }
        }
      }
    },
    mounted() {
      if (!this.letterhead && frappe.boot.sysdefaults.letter_head) {
        this.set_letterhead(frappe.boot.sysdefaults.letter_head);
      }
      this.$watch(function() {
        return this.letterhead ? this.letterhead[this.range_input_field] : null;
      }, function() {
        if (this.aspect_ratio === null)
          return;
        let update_field = this.range_input_field == "image_width" ? "image_height" : "image_width";
        this.letterhead[update_field] = update_field == "image_width" ? this.aspect_ratio * this.letterhead.image_height : this.letterhead.image_width / this.aspect_ratio;
      });
    },
    methods: {
      toggle_edit_letterhead() {
        if (this.$store.edit_letterhead) {
          this.$store.edit_letterhead = false;
          return;
        }
        this.$store.edit_letterhead = true;
        if (!this.control) {
          this.control = frappe.ui.form.make_control({
            parent: this.$refs.editor,
            df: {
              fieldname: "letterhead",
              fieldtype: "Comment",
              change: () => {
                this.letterhead._dirty = true;
                this.letterhead.content = this.control.get_value();
              }
            },
            render_input: true,
            only_input: true,
            no_wrapper: true
          });
        }
        this.control.set_value(this.letterhead.content);
      },
      change_letterhead() {
        let d = new frappe.ui.Dialog({
          title: __("Change Letter Head"),
          fields: [
            {
              label: __("Letter Head"),
              fieldname: "letterhead",
              fieldtype: "Link",
              options: "Letter Head"
            }
          ],
          primary_action: ({ letterhead }) => {
            if (letterhead) {
              this.set_letterhead(letterhead);
            }
            d.hide();
          }
        });
        d.show();
      },
      upload_image() {
        new frappe.ui.FileUploader({
          folder: "Home/Attachments",
          on_success: (file_doc) => {
            get_image_dimensions(file_doc.file_url).then(({ width, height }) => {
              this.$set(this.letterhead, "image", file_doc.file_url);
              let new_width = width;
              let new_height = height;
              this.aspect_ratio = width / height;
              this.range_input_field = this.aspect_ratio > 1 ? "image_width" : "image_height";
              if (width > 200) {
                new_width = 200;
                new_height = new_width / aspect_ratio;
              }
              if (height > 80) {
                new_height = 80;
                new_width = aspect_ratio * new_height;
              }
              this.$set(this.letterhead, "image_height", new_height);
              this.$set(this.letterhead, "image_width", new_width);
            });
          }
        });
      },
      set_letterhead(letterhead) {
        this.$store.change_letterhead(letterhead).then(() => {
          get_image_dimensions(this.letterhead.image).then(({ width, height }) => {
            this.aspect_ratio = width / height;
            this.range_input_field = this.aspect_ratio > 1 ? "image_width" : "image_height";
          });
        });
      },
      create_letterhead() {
        let d = new frappe.ui.Dialog({
          title: __("Create Letter Head"),
          fields: [
            {
              label: __("Letter Head Name"),
              fieldname: "name",
              fieldtype: "Data"
            }
          ],
          primary_action: ({ name }) => {
            return frappe.db.insert({
              doctype: "Letter Head",
              letter_head_name: name,
              source: "Image"
            }).then((doc) => {
              d.hide();
              this.$store.change_letterhead(doc.name).then(() => {
                this.toggle_edit_letterhead();
              });
            });
          }
        });
        d.show();
      }
    }
  };
  var __vue_render__2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "letterhead" }, [
      _c("div", { staticClass: "mb-4 d-flex justify-content-between" }, [
        _c("div", { staticClass: "d-flex align-items-center" }, [
          _vm.letterhead && _vm.$store.edit_letterhead ? _c("div", {
            staticClass: "btn-group",
            attrs: { role: "group", "aria-label": "Align Letterhead" }
          }, _vm._l(["Left", "Center", "Right"], function(direction) {
            return _c("button", {
              staticClass: "btn btn-xs",
              class: _vm.letterhead.align == direction ? "btn-secondary" : "btn-default",
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  _vm.letterhead.align = direction;
                }
              }
            }, [_vm._v("\n					" + _vm._s(direction) + "\n				")]);
          }), 0) : _vm._e(),
          _vm._v(" "),
          _vm.letterhead && _vm.$store.edit_letterhead ? _c("input", {
            staticClass: "ml-4 custom-range",
            attrs: {
              type: "range",
              name: "image-resize",
              min: "20",
              max: _vm.range_input_field === "image_width" ? 700 : 500
            },
            domProps: { value: _vm.letterhead[_vm.range_input_field] },
            on: {
              input: function(e) {
                return _vm.letterhead[_vm.range_input_field] = parseFloat(e.target.value);
              }
            }
          }) : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", [
          _vm.letterhead && _vm.$store.edit_letterhead ? _c("button", {
            staticClass: "ml-2 btn btn-default btn-xs",
            on: { click: _vm.upload_image }
          }, [
            _vm._v("\n				" + _vm._s(_vm.__("Change Image")) + "\n			")
          ]) : _vm._e(),
          _vm._v(" "),
          _vm.letterhead && _vm.$store.edit_letterhead ? _c("button", {
            staticClass: "ml-2 btn btn-default btn-xs btn-change-letterhead",
            on: { click: _vm.change_letterhead }
          }, [
            _vm._v("\n				" + _vm._s(_vm.__("Change Letter Head")) + "\n			")
          ]) : _vm._e(),
          _vm._v(" "),
          _vm.letterhead ? _c("button", {
            staticClass: "ml-2 btn btn-default btn-xs btn-edit",
            on: { click: _vm.toggle_edit_letterhead }
          }, [
            _vm._v("\n				" + _vm._s(!_vm.$store.edit_letterhead ? _vm.__("Edit Letter Head") : _vm.__("Done")) + "\n			")
          ]) : _vm._e(),
          _vm._v(" "),
          !_vm.letterhead ? _c("button", {
            staticClass: "ml-2 btn btn-default btn-xs btn-edit",
            on: { click: _vm.create_letterhead }
          }, [
            _vm._v("\n				" + _vm._s(_vm.__("Create Letter Head")) + "\n			")
          ]) : _vm._e()
        ])
      ]),
      _vm._v(" "),
      _vm.letterhead && !_vm.$store.edit_letterhead ? _c("div", { domProps: { innerHTML: _vm._s(_vm.letterhead.content) } }) : _vm._e(),
      _vm._v(" "),
      _vm.letterhead && _vm.$store.edit_letterhead ? _c("div", {
        staticClass: "edit-letterhead",
        style: {
          justifyContent: {
            Left: "flex-start",
            Center: "center",
            Right: "flex-end"
          }[_vm.letterhead.align]
        }
      }, [
        _c("div", { staticClass: "edit-image" }, [
          _vm.letterhead.image ? _c("div", [
            _c("img", {
              style: {
                width: _vm.range_input_field === "image_width" ? _vm.letterhead.image_width + "px" : null,
                height: _vm.range_input_field === "image_height" ? _vm.letterhead.image_height + "px" : null
              },
              attrs: { src: _vm.letterhead.image }
            })
          ]) : _c("button", {
            staticClass: "btn btn-default",
            on: { click: _vm.upload_image }
          }, [
            _vm._v("\n				" + _vm._s(_vm.__("Upload Image")) + "\n			")
          ])
        ])
      ]) : _vm._e()
    ]);
  };
  var __vue_staticRenderFns__2 = [];
  __vue_render__2._withStripped = true;
  var __vue_inject_styles__2 = function(inject) {
    if (!inject)
      return;
    inject("data-v-72723dd8_0", { source: "\n.letterhead[data-v-72723dd8] {\n	position: relative;\n	border: 1px solid var(--dark-border-color);\n	border-radius: var(--border-radius);\n	padding: 1rem;\n	margin-bottom: 1rem;\n}\n.edit-letterhead[data-v-72723dd8] {\n	display: flex;\n	align-items: center;\n}\n.edit-image[data-v-72723dd8] {\n	min-width: 40px;\n	min-height: 40px;\n	border: 1px solid var(--border-color);\n}\n.edit-image img[data-v-72723dd8] {\n	height: 100%;\n}\n.edit-title[data-v-72723dd8] {\n	margin-left: 1rem;\n	border: 1px solid transparent;\n	border-radius: var(--border-radius);\n	font-size: var(--text-md);\n	font-weight: 600;\n}\n", map: { "version": 3, "sources": ["frappe/public/js/print_format_builder/LetterHeadEditor.vue"], "names": [], "mappings": ";AAoTA;CACA,kBAAA;CACA,0CAAA;CACA,mCAAA;CACA,aAAA;CACA,mBAAA;AACA;AACA;CACA,aAAA;CACA,mBAAA;AACA;AACA;CACA,eAAA;CACA,gBAAA;CACA,qCAAA;AACA;AACA;CACA,YAAA;AACA;AACA;CACA,iBAAA;CACA,6BAAA;CACA,mCAAA;CACA,yBAAA;CACA,gBAAA;AACA", "file": "LetterHeadEditor.vue", "sourcesContent": [`<template>
	<div class="letterhead">
		<div class="mb-4 d-flex justify-content-between">
			<div class="d-flex align-items-center">
				<div
					v-if="letterhead && $store.edit_letterhead"
					class="btn-group"
					role="group"
					aria-label="Align Letterhead"
				>
					<button
						v-for="direction in ['Left', 'Center', 'Right']"
						type="button"
						class="btn btn-xs"
						@click="letterhead.align = direction"
						:class="
							letterhead.align == direction
								? 'btn-secondary'
								: 'btn-default'
						"
					>
						{{ direction }}
					</button>
				</div>
				<input
					class="ml-4 custom-range"
					v-if="letterhead && $store.edit_letterhead"
					type="range"
					name="image-resize"
					min="20"
					:max="range_input_field === 'image_width' ? 700 : 500"
					:value="letterhead[range_input_field]"
					@input="
						e =>
							(letterhead[range_input_field] = parseFloat(
								e.target.value
							))
					"
				/>
			</div>
			<div>
				<button
					class="ml-2 btn btn-default btn-xs"
					v-if="letterhead && $store.edit_letterhead"
					@click="upload_image"
				>
					{{ __("Change Image") }}
				</button>
				<button
					v-if="letterhead && $store.edit_letterhead"
					class="ml-2 btn btn-default btn-xs btn-change-letterhead"
					@click="change_letterhead"
				>
					{{ __("Change Letter Head") }}
				</button>
				<button
					v-if="letterhead"
					class="ml-2 btn btn-default btn-xs btn-edit"
					@click="toggle_edit_letterhead"
				>
					{{
						!$store.edit_letterhead
							? __("Edit Letter Head")
							: __("Done")
					}}
				</button>
				<button
					v-if="!letterhead"
					class="ml-2 btn btn-default btn-xs btn-edit"
					@click="create_letterhead"
				>
					{{ __("Create Letter Head") }}
				</button>
			</div>
		</div>
		<div
			v-if="letterhead && !$store.edit_letterhead"
			v-html="letterhead.content"
		></div>
		<!-- <div v-show="letterhead && $store.edit_letterhead" ref="editor"></div> -->
		<div
			class="edit-letterhead"
			v-if="letterhead && $store.edit_letterhead"
			:style="{
				justifyContent: {
					Left: 'flex-start',
					Center: 'center',
					Right: 'flex-end'
				}[letterhead.align]
			}"
		>
			<div class="edit-image">
				<div v-if="letterhead.image">
					<img
						:src="letterhead.image"
						:style="{
							width:
								range_input_field === 'image_width'
									? letterhead.image_width + 'px'
									: null,
							height:
								range_input_field === 'image_height'
									? letterhead.image_height + 'px'
									: null
						}"
					/>
				</div>
				<button v-else class="btn btn-default" @click="upload_image">
					{{ __("Upload Image") }}
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import { storeMixin } from "./store";
import { get_image_dimensions } from "./utils";
export default {
	name: "LetterHeadEditor",
	mixins: [storeMixin],
	data() {
		return {
			range_input_field: null,
			aspect_ratio: null
		};
	},
	watch: {
		letterhead: {
			deep: true,
			immediate: true,
			handler(letterhead) {
				if (!letterhead) return;
				if (letterhead.image_width && letterhead.image_height) {
					let dimension =
						letterhead.image_width > letterhead.image_height
							? "width"
							: "height";
					let dimension_value = letterhead["image_" + dimension];
					letterhead.content = \`
						<div style="text-align: \${letterhead.align.toLowerCase()};">
							<img
								src="\${letterhead.image}"
								alt="\${letterhead.name}"
								\${dimension}="\${dimension_value}"
								style="\${dimension}: \${dimension_value}px;">
						</div>
					\`;
				}
			}
		}
	},
	mounted() {
		if (!this.letterhead && frappe.boot.sysdefaults.letter_head) {
			this.set_letterhead(frappe.boot.sysdefaults.letter_head);
		}

		this.$watch(
			function() {
				return this.letterhead
					? this.letterhead[this.range_input_field]
					: null;
			},
			function() {
				if (this.aspect_ratio === null) return;

				let update_field =
					this.range_input_field == "image_width"
						? "image_height"
						: "image_width";
				this.letterhead[update_field] =
					update_field == "image_width"
						? this.aspect_ratio * this.letterhead.image_height
						: this.letterhead.image_width / this.aspect_ratio;
			}
		);
	},
	methods: {
		toggle_edit_letterhead() {
			if (this.$store.edit_letterhead) {
				this.$store.edit_letterhead = false;
				return;
			}
			this.$store.edit_letterhead = true;
			if (!this.control) {
				this.control = frappe.ui.form.make_control({
					parent: this.$refs.editor,
					df: {
						fieldname: "letterhead",
						fieldtype: "Comment",
						change: () => {
							this.letterhead._dirty = true;
							this.letterhead.content = this.control.get_value();
						}
					},
					render_input: true,
					only_input: true,
					no_wrapper: true
				});
			}
			this.control.set_value(this.letterhead.content);
		},
		change_letterhead() {
			let d = new frappe.ui.Dialog({
				title: __("Change Letter Head"),
				fields: [
					{
						label: __("Letter Head"),
						fieldname: "letterhead",
						fieldtype: "Link",
						options: "Letter Head"
					}
				],
				primary_action: ({ letterhead }) => {
					if (letterhead) {
						this.set_letterhead(letterhead);
					}
					d.hide();
				}
			});
			d.show();
		},
		upload_image() {
			new frappe.ui.FileUploader({
				folder: "Home/Attachments",
				on_success: file_doc => {
					get_image_dimensions(file_doc.file_url).then(
						({ width, height }) => {
							this.$set(
								this.letterhead,
								"image",
								file_doc.file_url
							);
							let new_width = width;
							let new_height = height;
							this.aspect_ratio = width / height;
							this.range_input_field =
								this.aspect_ratio > 1
									? "image_width"
									: "image_height";

							if (width > 200) {
								new_width = 200;
								new_height = new_width / aspect_ratio;
							}
							if (height > 80) {
								new_height = 80;
								new_width = aspect_ratio * new_height;
							}

							this.$set(
								this.letterhead,
								"image_height",
								new_height
							);
							this.$set(
								this.letterhead,
								"image_width",
								new_width
							);
						}
					);
				}
			});
		},
		set_letterhead(letterhead) {
			this.$store.change_letterhead(letterhead).then(() => {
				get_image_dimensions(this.letterhead.image).then(
					({ width, height }) => {
						this.aspect_ratio = width / height;
						this.range_input_field =
							this.aspect_ratio > 1
								? "image_width"
								: "image_height";
					}
				);
			});
		},
		create_letterhead() {
			let d = new frappe.ui.Dialog({
				title: __("Create Letter Head"),
				fields: [
					{
						label: __("Letter Head Name"),
						fieldname: "name",
						fieldtype: "Data"
					}
				],
				primary_action: ({ name }) => {
					return frappe.db
						.insert({
							doctype: "Letter Head",
							letter_head_name: name,
							source: "Image"
						})
						.then(doc => {
							d.hide();
							this.$store.change_letterhead(doc.name).then(() => {
								this.toggle_edit_letterhead();
							});
						});
				}
			});
			d.show();
		}
	}
};
<\/script>
<style scoped>
.letterhead {
	position: relative;
	border: 1px solid var(--dark-border-color);
	border-radius: var(--border-radius);
	padding: 1rem;
	margin-bottom: 1rem;
}
.edit-letterhead {
	display: flex;
	align-items: center;
}
.edit-image {
	min-width: 40px;
	min-height: 40px;
	border: 1px solid var(--border-color);
}
.edit-image img {
	height: 100%;
}
.edit-title {
	margin-left: 1rem;
	border: 1px solid transparent;
	border-radius: var(--border-radius);
	font-size: var(--text-md);
	font-weight: 600;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__2 = "data-v-72723dd8";
  var __vue_module_identifier__2 = void 0;
  var __vue_is_functional_template__2 = false;
  function __vue_normalize__2(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "frappe/public/js/print_format_builder/LetterHeadEditor.vue";
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
  var LetterHeadEditor_default = __vue_component__2;

  // frappe/public/js/print_format_builder/PrintFormatSection.vue
  var import_vuedraggable3 = __toESM(require_vuedraggable_umd());

  // frappe/public/js/print_format_builder/Field.vue
  var import_vuedraggable2 = __toESM(require_vuedraggable_umd());

  // frappe/public/js/print_format_builder/ConfigureColumns.vue
  var import_vuedraggable = __toESM(require_vuedraggable_umd());
  var __vue_script__3 = {
    name: "ConfigureColumns",
    props: ["df"],
    components: {
      draggable: import_vuedraggable.default
    },
    methods: {
      remove_column(column) {
        this.$set(this.df, "table_columns", this.df.table_columns.filter((_column) => _column !== column));
      }
    },
    computed: {
      help_message() {
        return __("Drag columns to set order. Column width is set in percentage. The total width should not be more than 100. Columns marked in red will be removed.");
      },
      total_width() {
        return this.df.table_columns.reduce((total, tf) => total + tf.width, 0);
      }
    }
  };
  var __vue_render__3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [
      _c("p", { staticClass: "mb-3 text-muted" }, [
        _vm._v("\n		" + _vm._s(_vm.help_message) + "\n	")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row font-weight-bold" }, [
        _c("div", { staticClass: "col-8" }, [
          _vm._v("\n			" + _vm._s(_vm.__("Column")) + "\n		")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-4" }, [
          _vm._v("\n			" + _vm._s(_vm.__("Width")) + "\n			(" + _vm._s(_vm.__("Total:")) + " " + _vm._s(_vm.total_width) + ")\n		")
        ])
      ]),
      _vm._v(" "),
      _c("draggable", {
        attrs: {
          list: _vm.df.table_columns,
          animation: 200,
          group: _vm.df.fieldname,
          handle: ".icon-drag"
        }
      }, _vm._l(_vm.df.table_columns, function(column) {
        return _c("div", { staticClass: "mt-2 row align-center column-row" }, [
          _c("div", { staticClass: "col-8" }, [
            _c("div", { staticClass: "column-label d-flex align-center" }, [
              _c("div", { staticClass: "px-2 icon-drag ml-n2" }, [
                _c("svg", { staticClass: "icon icon-xs" }, [
                  _c("use", { attrs: { href: "#icon-drag" } })
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "mt-1 ml-1" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: column.label,
                      expression: "column.label"
                    }
                  ],
                  staticClass: "input-column-label",
                  class: { "text-danger": column.invalid_width },
                  attrs: { type: "text" },
                  domProps: { value: column.label },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return;
                      }
                      _vm.$set(column, "label", $event.target.value);
                    }
                  }
                })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-4 d-flex align-items-center" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model.number",
                  value: column.width,
                  expression: "column.width",
                  modifiers: { number: true }
                }
              ],
              staticClass: "text-right form-control",
              class: { "text-danger is-invalid": column.invalid_width },
              attrs: { type: "number", min: "0", max: "100", step: "5" },
              domProps: { value: column.width },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return;
                  }
                  _vm.$set(column, "width", _vm._n($event.target.value));
                },
                blur: function($event) {
                  return _vm.$forceUpdate();
                }
              }
            }),
            _vm._v(" "),
            _c("button", {
              staticClass: "ml-2 btn btn-xs btn-icon",
              on: {
                click: function($event) {
                  return _vm.remove_column(column);
                }
              }
            }, [
              _c("svg", { staticClass: "icon icon-sm" }, [
                _c("use", { attrs: { href: "#icon-close" } })
              ])
            ])
          ])
        ]);
      }), 0)
    ], 1);
  };
  var __vue_staticRenderFns__3 = [];
  __vue_render__3._withStripped = true;
  var __vue_inject_styles__3 = function(inject) {
    if (!inject)
      return;
    inject("data-v-20a70f2e_0", { source: "\n.icon-drag[data-v-20a70f2e] {\n	cursor: grab;\n}\n.input-column-label[data-v-20a70f2e] {\n	border: 1px solid transparent;\n	border-radius: var(--border-radius);\n	font-size: var(--text-md);\n}\n.input-column-label[data-v-20a70f2e]:focus {\n	border-color: var(--border-color);\n	outline: none;\n	background-color: var(--control-bg);\n}\n.input-column-label[data-v-20a70f2e]::placeholder {\n	font-style: italic;\n	font-weight: normal;\n}\n", map: { "version": 3, "sources": ["frappe/public/js/print_format_builder/ConfigureColumns.vue"], "names": [], "mappings": ";AA6FA;CACA,YAAA;AACA;AACA;CACA,6BAAA;CACA,mCAAA;CACA,yBAAA;AACA;AACA;CACA,iCAAA;CACA,aAAA;CACA,mCAAA;AACA;AACA;CACA,kBAAA;CACA,mBAAA;AACA", "file": "ConfigureColumns.vue", "sourcesContent": [`<template>
	<div>
		<p class="mb-3 text-muted">
			{{ help_message }}
		</p>
		<div class="row font-weight-bold">
			<div class="col-8">
				{{ __("Column") }}
			</div>
			<div class="col-4">
				{{ __("Width") }}
				({{ __("Total:") }} {{ total_width }})
			</div>
		</div>
		<draggable
			:list="df.table_columns"
			:animation="200"
			:group="df.fieldname"
			handle=".icon-drag"
		>
			<div
				class="mt-2 row align-center column-row"
				v-for="column in df.table_columns"
			>
				<div class="col-8">
					<div class="column-label d-flex align-center">
						<div class="px-2 icon-drag ml-n2">
							<svg class="icon icon-xs">
								<use href="#icon-drag"></use>
							</svg>
						</div>
						<div class="mt-1 ml-1">
							<input
								class="input-column-label"
								:class="{ 'text-danger': column.invalid_width }"
								type="text"
								v-model="column.label"
							/>
						</div>
					</div>
				</div>
				<div class="col-4 d-flex align-items-center">
					<input
						type="number"
						class="text-right form-control"
						:class="{ 'text-danger is-invalid': column.invalid_width }"
						v-model.number="column.width"
						min="0"
						max="100"
						step="5"
					/>
					<button
						class="ml-2 btn btn-xs btn-icon"
						@click="remove_column(column)"
					>
						<svg class="icon icon-sm">
							<use href="#icon-close"></use>
						</svg>
					</button>
				</div>
			</div>
		</draggable>
	</div>
</template>
<script>
import draggable from "vuedraggable";
export default {
	name: "ConfigureColumns",
	props: ["df"],
	components: {
		draggable
	},
	methods: {
		remove_column(column) {
			this.$set(
				this.df,
				"table_columns",
				this.df.table_columns.filter(_column => _column !== column)
			);
		}
	},
	computed: {
		help_message() {
			// prettier-ignore
			return __("Drag columns to set order. Column width is set in percentage. The total width should not be more than 100. Columns marked in red will be removed.");
		},
		total_width() {
			return this.df.table_columns.reduce((total, tf) => total + tf.width, 0);
		}
	}
};
<\/script>
<style scoped>
.icon-drag {
	cursor: grab;
}
.input-column-label {
	border: 1px solid transparent;
	border-radius: var(--border-radius);
	font-size: var(--text-md);
}
.input-column-label:focus {
	border-color: var(--border-color);
	outline: none;
	background-color: var(--control-bg);
}
.input-column-label::placeholder {
	font-style: italic;
	font-weight: normal;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__3 = "data-v-20a70f2e";
  var __vue_module_identifier__3 = void 0;
  var __vue_is_functional_template__3 = false;
  function __vue_normalize__3(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "frappe/public/js/print_format_builder/ConfigureColumns.vue";
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
  function __vue_create_injector__3() {
    const styles = __vue_create_injector__3.styles || (__vue_create_injector__3.styles = {});
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
  var __vue_component__3 = /* @__PURE__ */ __vue_normalize__3({ render: __vue_render__3, staticRenderFns: __vue_staticRenderFns__3 }, __vue_inject_styles__3, __vue_script__3, __vue_scope_id__3, __vue_is_functional_template__3, __vue_module_identifier__3, false, __vue_create_injector__3, void 0, void 0);
  var ConfigureColumns_default = __vue_component__3;

  // frappe/public/js/print_format_builder/Field.vue
  var __vue_script__4 = {
    name: "Field",
    mixins: [storeMixin],
    props: ["df"],
    components: {
      draggable: import_vuedraggable2.default
    },
    data() {
      return {
        editing: false
      };
    },
    watch: {
      editing(value) {
        if (value) {
          this.$nextTick(() => this.$refs["label-input"].focus());
        }
      },
      "df.table_columns": {
        deep: true,
        handler() {
          this.validate_table_columns();
        }
      }
    },
    methods: {
      edit_html() {
        let d = new frappe.ui.Dialog({
          title: __("Edit HTML"),
          fields: [
            {
              label: __("HTML"),
              fieldname: "html",
              fieldtype: "Code",
              options: "HTML"
            }
          ],
          primary_action: ({ html }) => {
            html = frappe.dom.remove_script_and_style(html);
            this.$set(this.df, "html", html);
            d.hide();
          }
        });
        d.set_value("html", this.df.html);
        d.show();
      },
      configure_columns() {
        let dialog = new frappe.ui.Dialog({
          title: __("Configure columns for {0}", [this.df.label]),
          fields: [
            {
              fieldtype: "HTML",
              fieldname: "columns_area"
            },
            {
              label: "",
              fieldtype: "Autocomplete",
              placeholder: __("Add Column"),
              fieldname: "add_column",
              options: this.get_all_columns(),
              onchange: () => {
                let fieldname = dialog.get_value("add_column");
                if (fieldname) {
                  let column = this.get_column_to_add(fieldname);
                  if (column) {
                    this.df.table_columns.push(column);
                    this.$set(this.df, "table_columns", this.df.table_columns);
                    dialog.set_value("add_column", "");
                  }
                }
              }
            }
          ],
          on_page_show: () => {
            new Vue({
              el: dialog.get_field("columns_area").$wrapper.get(0),
              render: (h) => h(ConfigureColumns_default, {
                props: {
                  df: this.df
                }
              })
            });
          },
          on_hide: () => {
            this.$set(this.df, "table_columns", this.df.table_columns.filter((col) => !col.invalid_width));
          }
        });
        dialog.show();
      },
      get_all_columns() {
        let meta = frappe.get_meta(this.df.options);
        let more_columns = [
          {
            label: __("Sr No."),
            value: "idx"
          }
        ];
        return more_columns.concat(meta.fields.map((tf) => {
          if (frappe.model.no_value_type.includes(tf.fieldtype)) {
            return;
          }
          return {
            label: tf.label,
            value: tf.fieldname
          };
        }).filter(Boolean));
      },
      get_column_to_add(fieldname) {
        let standard_columns = {
          idx: {
            label: __("Sr No."),
            fieldtype: "Data",
            fieldname: "idx",
            width: 10
          }
        };
        if (fieldname in standard_columns) {
          return standard_columns[fieldname];
        }
        return __spreadProps(__spreadValues({}, frappe.meta.get_docfield(this.df.options, fieldname)), {
          width: 10
        });
      },
      validate_table_columns() {
        if (this.df.fieldtype != "Table")
          return;
        let columns = this.df.table_columns;
        let total_width = 0;
        for (let column of columns) {
          if (!column.width) {
            column.width = 10;
          }
          total_width += column.width;
          if (total_width > 100) {
            column.invalid_width = true;
          } else {
            column.invalid_width = false;
          }
        }
      }
    }
  };
  var __vue_render__4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", {
      staticClass: "field",
      attrs: { title: _vm.df.fieldname },
      on: {
        click: function($event) {
          _vm.editing = true;
        }
      }
    }, [
      _c("div", { staticClass: "field-controls" }, [
        _c("div", [
          _vm.df.fieldtype == "HTML" && _vm.df.html ? _c("div", {
            staticClass: "custom-html",
            domProps: { innerHTML: _vm._s(_vm.df.html) }
          }) : _vm._e(),
          _vm._v(" "),
          _vm.df.fieldtype == "Field Template" ? _c("div", { staticClass: "custom-html" }, [
            _vm._v("\n				" + _vm._s(_vm.df.label) + "\n			")
          ]) : _vm.editing && _vm.df.fieldtype != "HTML" ? _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.df.label,
                expression: "df.label"
              }
            ],
            ref: "label-input",
            staticClass: "label-input",
            attrs: { type: "text", placeholder: _vm.__("Label") },
            domProps: { value: _vm.df.label },
            on: {
              keydown: function($event) {
                if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
                  return null;
                }
                _vm.editing = false;
              },
              blur: function($event) {
                _vm.editing = false;
              },
              input: function($event) {
                if ($event.target.composing) {
                  return;
                }
                _vm.$set(_vm.df, "label", $event.target.value);
              }
            }
          }) : _vm.df.label ? _c("span", [_vm._v(_vm._s(_vm.df.label))]) : _c("i", { staticClass: "text-muted" }, [
            _vm._v("\n				" + _vm._s(_vm.__("No Label")) + " (" + _vm._s(_vm.df.fieldname) + ")\n			")
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field-actions" }, [
          _vm.df.fieldtype == "HTML" ? _c("button", {
            staticClass: "btn btn-xs btn-icon",
            on: { click: _vm.edit_html }
          }, [
            _c("svg", { staticClass: "icon icon-sm" }, [
              _c("use", { attrs: { href: "#icon-edit" } })
            ])
          ]) : _vm._e(),
          _vm._v(" "),
          _vm.df.fieldtype == "Table" ? _c("button", {
            staticClass: "btn btn-xs btn-default",
            on: { click: _vm.configure_columns }
          }, [_vm._v("\n				Configure columns\n			")]) : _vm._e(),
          _vm._v(" "),
          _c("button", {
            staticClass: "btn btn-xs btn-icon",
            on: {
              click: function($event) {
                return _vm.$set(_vm.df, "remove", true);
              }
            }
          }, [
            _c("svg", { staticClass: "icon icon-sm" }, [
              _c("use", { attrs: { href: "#icon-close" } })
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _vm.df.fieldtype == "Table" ? _c("div", {
        staticClass: "table-controls row no-gutters",
        style: { opacity: 1 }
      }, _vm._l(_vm.df.table_columns, function(tf, i) {
        return _c("div", {
          key: tf.fieldname,
          staticClass: "table-column",
          style: { width: tf.width + "%" }
        }, [
          _c("div", { staticClass: "table-field" }, [
            _vm._v("\n				" + _vm._s(tf.label) + "\n			")
          ])
        ]);
      }), 0) : _vm._e()
    ]);
  };
  var __vue_staticRenderFns__4 = [];
  __vue_render__4._withStripped = true;
  var __vue_inject_styles__4 = function(inject) {
    if (!inject)
      return;
    inject("data-v-09994045_0", { source: "\n.field {\n	text-align: left;\n	width: 100%;\n	background-color: var(--bg-light-gray);\n	border-radius: var(--border-radius);\n	border: 1px dashed var(--gray-400);\n	padding: 0.5rem 0.75rem;\n	font-size: var(--text-sm);\n}\n.field-controls {\n	display: flex;\n	justify-content: space-between;\n	align-items: center;\n}\n.field:not(:first-child) {\n	margin-top: 0.5rem;\n}\n.custom-html {\n	padding-right: var(--padding-xs);\n	word-break: break-all;\n}\n.label-input {\n	background-color: transparent;\n	border: none;\n	padding: 0;\n}\n.label-input:focus {\n	outline: none;\n}\n.field:focus-within {\n	border-style: solid;\n	border-color: var(--gray-600);\n}\n.field-actions {\n	flex: none;\n}\n.field-actions .btn {\n	opacity: 0;\n}\n.field-actions .btn-icon {\n	box-shadow: none;\n}\n.btn-icon {\n	padding: 2px;\n}\n.btn-icon:hover {\n	background-color: white;\n}\n.field:hover .btn {\n	opacity: 1;\n}\n.table-controls {\n	display: flex;\n	margin-top: 1rem;\n}\n.table-column {\n	position: relative;\n}\n.table-field {\n	text-align: left;\n	width: 100%;\n	background-color: white;\n	border-radius: var(--border-radius);\n	border: 1px dashed var(--gray-400);\n	padding: 0.5rem 0.75rem;\n	font-size: var(--text-sm);\n	user-select: none;\n	white-space: nowrap;\n	overflow: hidden;\n}\n.column-resize {\n	position: absolute;\n	right: 0;\n	top: 0;\n	width: 6px;\n	border-radius: 2px;\n	height: 80%;\n	background-color: var(--gray-600);\n	transform: translate(50%, 10%);\n	z-index: 999;\n	cursor: col-resize;\n}\n.column-resize-actions {\n	position: absolute;\n	top: 0;\n	right: 0;\n	height: 100%;\n	display: flex;\n	align-items: center;\n	padding-right: 0.25rem;\n}\n.column-resize-actions .btn-icon {\n	background: white;\n}\n.column-resize-actions .btn-icon:hover {\n	background: var(--bg-light-gray);\n}\n.columns-input {\n	padding: var(--padding-sm);\n}\n", map: { "version": 3, "sources": ["frappe/public/js/print_format_builder/Field.vue"], "names": [], "mappings": ";AAgPA;CACA,gBAAA;CACA,WAAA;CACA,sCAAA;CACA,mCAAA;CACA,kCAAA;CACA,uBAAA;CACA,yBAAA;AACA;AAEA;CACA,aAAA;CACA,8BAAA;CACA,mBAAA;AACA;AAEA;CACA,kBAAA;AACA;AAEA;CACA,gCAAA;CACA,qBAAA;AACA;AAEA;CACA,6BAAA;CACA,YAAA;CACA,UAAA;AACA;AAEA;CACA,aAAA;AACA;AAEA;CACA,mBAAA;CACA,6BAAA;AACA;AAEA;CACA,UAAA;AACA;AAEA;CACA,UAAA;AACA;AAEA;CACA,gBAAA;AACA;AAEA;CACA,YAAA;AACA;AAEA;CACA,uBAAA;AACA;AAEA;CACA,UAAA;AACA;AAEA;CACA,aAAA;CACA,gBAAA;AACA;AAEA;CACA,kBAAA;AACA;AAEA;CACA,gBAAA;CACA,WAAA;CACA,uBAAA;CACA,mCAAA;CACA,kCAAA;CACA,uBAAA;CACA,yBAAA;CACA,iBAAA;CACA,mBAAA;CACA,gBAAA;AACA;AAEA;CACA,kBAAA;CACA,QAAA;CACA,MAAA;CACA,UAAA;CACA,kBAAA;CACA,WAAA;CACA,iCAAA;CACA,8BAAA;CACA,YAAA;CACA,kBAAA;AACA;AAEA;CACA,kBAAA;CACA,MAAA;CACA,QAAA;CACA,YAAA;CACA,aAAA;CACA,mBAAA;CACA,sBAAA;AACA;AAEA;CACA,iBAAA;AACA;AACA;CACA,gCAAA;AACA;AAEA;CACA,0BAAA;AACA", "file": "Field.vue", "sourcesContent": [`<template>
	<div class="field" :title="df.fieldname" @click="editing = true">
		<div class="field-controls">
			<div>
				<div
					class="custom-html"
					v-if="df.fieldtype == 'HTML' && df.html"
					v-html="df.html"
				></div>
				<div
					class="custom-html"
					v-if="df.fieldtype == 'Field Template'"
				>
					{{ df.label }}
				</div>
				<input
					v-else-if="editing && df.fieldtype != 'HTML'"
					ref="label-input"
					class="label-input"
					type="text"
					:placeholder="__('Label')"
					v-model="df.label"
					@keydown.enter="editing = false"
					@blur="editing = false"
				/>
				<span v-else-if="df.label">{{ df.label }}</span>
				<i class="text-muted" v-else>
					{{ __("No Label") }} ({{ df.fieldname }})
				</i>
			</div>
			<div class="field-actions">
				<button
					v-if="df.fieldtype == 'HTML'"
					class="btn btn-xs btn-icon"
					@click="edit_html"
				>
					<svg class="icon icon-sm">
						<use href="#icon-edit"></use>
					</svg>
				</button>
				<button
					v-if="df.fieldtype == 'Table'"
					class="btn btn-xs btn-default"
					@click="configure_columns"
				>
					Configure columns
				</button>
				<button
					class="btn btn-xs btn-icon"
					@click="$set(df, 'remove', true)"
				>
					<svg class="icon icon-sm">
						<use href="#icon-close"></use>
					</svg>
				</button>
			</div>
		</div>
		<div
			v-if="df.fieldtype == 'Table'"
			class="table-controls row no-gutters"
			:style="{ opacity: 1 }"
		>
			<div
				class="table-column"
				:style="{ width: tf.width + '%' }"
				v-for="(tf, i) in df.table_columns"
				:key="tf.fieldname"
			>
				<div class="table-field">
					{{ tf.label }}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import draggable from "vuedraggable";
import ConfigureColumnsVue from "./ConfigureColumns.vue";
import { storeMixin } from "./store";

export default {
	name: "Field",
	mixins: [storeMixin],
	props: ["df"],
	components: {
		draggable
	},
	data() {
		return {
			editing: false
		};
	},
	watch: {
		editing(value) {
			if (value) {
				this.$nextTick(() => this.$refs["label-input"].focus());
			}
		},
		"df.table_columns": {
			deep: true,
			handler() {
				this.validate_table_columns();
			}
		}
	},
	methods: {
		edit_html() {
			let d = new frappe.ui.Dialog({
				title: __("Edit HTML"),
				fields: [
					{
						label: __("HTML"),
						fieldname: "html",
						fieldtype: "Code",
						options: "HTML"
					}
				],
				primary_action: ({ html }) => {
					html = frappe.dom.remove_script_and_style(html);
					this.$set(this.df, "html", html);
					d.hide();
				}
			});
			d.set_value("html", this.df.html);
			d.show();
		},
		configure_columns() {
			let dialog = new frappe.ui.Dialog({
				title: __("Configure columns for {0}", [this.df.label]),
				fields: [
					{
						fieldtype: "HTML",
						fieldname: "columns_area"
					},
					{
						label: "",
						fieldtype: "Autocomplete",
						placeholder: __("Add Column"),
						fieldname: "add_column",
						options: this.get_all_columns(),
						onchange: () => {
							let fieldname = dialog.get_value("add_column");
							if (fieldname) {
								let column = this.get_column_to_add(fieldname);
								if (column) {
									this.df.table_columns.push(column);
									this.$set(
										this.df,
										"table_columns",
										this.df.table_columns
									);
									dialog.set_value("add_column", "");
								}
							}
						}
					}
				],
				on_page_show: () => {
					new Vue({
						el: dialog.get_field("columns_area").$wrapper.get(0),
						render: h =>
							h(ConfigureColumnsVue, {
								props: {
									df: this.df
								}
							})
					});
				},
				on_hide: () => {
					this.$set(
						this.df,
						"table_columns",
						this.df.table_columns.filter(col => !col.invalid_width)
					);
				}
			});
			dialog.show();
		},
		get_all_columns() {
			let meta = frappe.get_meta(this.df.options);
			let more_columns = [
				{
					label: __("Sr No."),
					value: "idx"
				}
			];
			return more_columns.concat(
				meta.fields
					.map(tf => {
						if (frappe.model.no_value_type.includes(tf.fieldtype)) {
							return;
						}
						return {
							label: tf.label,
							value: tf.fieldname
						};
					})
					.filter(Boolean)
			);
		},
		get_column_to_add(fieldname) {
			let standard_columns = {
				idx: {
					label: __("Sr No."),
					fieldtype: "Data",
					fieldname: "idx",
					width: 10
				}
			};

			if (fieldname in standard_columns) {
				return standard_columns[fieldname];
			}

			return {
				...frappe.meta.get_docfield(this.df.options, fieldname),
				width: 10
			};
		},
		validate_table_columns() {
			if (this.df.fieldtype != "Table") return;

			let columns = this.df.table_columns;
			let total_width = 0;
			for (let column of columns) {
				if (!column.width) {
					column.width = 10;
				}
				total_width += column.width;
				if (total_width > 100) {
					column.invalid_width = true;
				} else {
					column.invalid_width = false;
				}
			}
		}
	}
};
<\/script>
<style>
.field {
	text-align: left;
	width: 100%;
	background-color: var(--bg-light-gray);
	border-radius: var(--border-radius);
	border: 1px dashed var(--gray-400);
	padding: 0.5rem 0.75rem;
	font-size: var(--text-sm);
}

.field-controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.field:not(:first-child) {
	margin-top: 0.5rem;
}

.custom-html {
	padding-right: var(--padding-xs);
	word-break: break-all;
}

.label-input {
	background-color: transparent;
	border: none;
	padding: 0;
}

.label-input:focus {
	outline: none;
}

.field:focus-within {
	border-style: solid;
	border-color: var(--gray-600);
}

.field-actions {
	flex: none;
}

.field-actions .btn {
	opacity: 0;
}

.field-actions .btn-icon {
	box-shadow: none;
}

.btn-icon {
	padding: 2px;
}

.btn-icon:hover {
	background-color: white;
}

.field:hover .btn {
	opacity: 1;
}

.table-controls {
	display: flex;
	margin-top: 1rem;
}

.table-column {
	position: relative;
}

.table-field {
	text-align: left;
	width: 100%;
	background-color: white;
	border-radius: var(--border-radius);
	border: 1px dashed var(--gray-400);
	padding: 0.5rem 0.75rem;
	font-size: var(--text-sm);
	user-select: none;
	white-space: nowrap;
	overflow: hidden;
}

.column-resize {
	position: absolute;
	right: 0;
	top: 0;
	width: 6px;
	border-radius: 2px;
	height: 80%;
	background-color: var(--gray-600);
	transform: translate(50%, 10%);
	z-index: 999;
	cursor: col-resize;
}

.column-resize-actions {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	display: flex;
	align-items: center;
	padding-right: 0.25rem;
}

.column-resize-actions .btn-icon {
	background: white;
}
.column-resize-actions .btn-icon:hover {
	background: var(--bg-light-gray);
}

.columns-input {
	padding: var(--padding-sm);
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__4 = void 0;
  var __vue_module_identifier__4 = void 0;
  var __vue_is_functional_template__4 = false;
  function __vue_normalize__4(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "frappe/public/js/print_format_builder/Field.vue";
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
  function __vue_create_injector__4() {
    const styles = __vue_create_injector__4.styles || (__vue_create_injector__4.styles = {});
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
  var __vue_component__4 = /* @__PURE__ */ __vue_normalize__4({ render: __vue_render__4, staticRenderFns: __vue_staticRenderFns__4 }, __vue_inject_styles__4, __vue_script__4, __vue_scope_id__4, __vue_is_functional_template__4, __vue_module_identifier__4, false, __vue_create_injector__4, void 0, void 0);
  var Field_default = __vue_component__4;

  // frappe/public/js/print_format_builder/PrintFormatSection.vue
  var __vue_script__5 = {
    name: "PrintFormatSection",
    mixins: [storeMixin],
    props: ["section"],
    components: {
      draggable: import_vuedraggable3.default,
      Field: Field_default
    },
    methods: {
      add_column() {
        if (this.section.columns.length < 4) {
          this.section.columns.push({
            label: "",
            fields: []
          });
        }
      },
      remove_column() {
        if (this.section.columns.length <= 1)
          return;
        let columns = this.section.columns.slice();
        let last_column_fields = columns.slice(-1)[0].fields.slice();
        let index = columns.length - 1;
        columns = columns.slice(0, index);
        let last_column = columns[index - 1];
        last_column.fields = [...last_column.fields, ...last_column_fields];
        this.$set(this.section, "columns", columns);
      },
      add_page_break() {
        this.$set(this.section, "page_break", true);
      },
      remove_page_break() {
        this.$set(this.section, "page_break", false);
      },
      get_fields(column) {
        return column.fields.filter((df) => !df.remove);
      }
    },
    computed: {
      section_options() {
        return [
          {
            label: __("Add section above"),
            action: () => this.$emit("add_section_above")
          },
          {
            label: __("Add column"),
            action: this.add_column,
            condition: () => this.section.columns.length < 4
          },
          {
            label: __("Remove column"),
            action: this.remove_column,
            condition: () => this.section.columns.length > 1
          },
          {
            label: __("Add page break"),
            action: this.add_page_break,
            condition: () => !this.section.page_break
          },
          {
            label: __("Remove page break"),
            action: this.remove_page_break,
            condition: () => this.section.page_break
          },
          {
            label: __("Remove section"),
            action: () => this.$set(this.section, "remove", true)
          },
          {
            label: __("Field Orientation (Left-Right)"),
            condition: () => !this.section.field_orientation,
            action: () => this.$set(this.section, "field_orientation", "left-right")
          },
          {
            label: __("Field Orientation (Top-Down)"),
            condition: () => this.section.field_orientation == "left-right",
            action: () => this.$set(this.section, "field_orientation", "")
          }
        ].filter((option) => option.condition ? option.condition() : true);
      }
    }
  };
  var __vue_render__5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return !_vm.section.remove ? _c("div", { staticClass: "print-format-section-container" }, [
      _c("div", { staticClass: "print-format-section" }, [
        _c("div", { staticClass: "section-header" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.section.label,
                expression: "section.label"
              }
            ],
            staticClass: "input-section-label w-50",
            attrs: { type: "text", placeholder: _vm.__("Section Title") },
            domProps: { value: _vm.section.label },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return;
                }
                _vm.$set(_vm.section, "label", $event.target.value);
              }
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "d-flex align-items-center" }, [
            _vm.section.field_orientation == "left-right" ? _c("div", {
              staticClass: "mr-2 text-small text-muted d-flex",
              attrs: {
                "title": _vm.__("Render labels to the left and values to the right in this section")
              }
            }, [_vm._v("\n					Label \u2192 Value\n				")]) : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "dropdown" }, [
              _c("button", {
                staticClass: "btn btn-xs btn-section dropdown-button",
                attrs: { "data-toggle": "dropdown" }
              }, [
                _c("svg", { staticClass: "icon icon-sm" }, [
                  _c("use", { attrs: { href: "#icon-dot-horizontal" } })
                ])
              ]),
              _vm._v(" "),
              _c("div", {
                staticClass: "dropdown-menu dropdown-menu-right",
                attrs: { role: "menu" }
              }, _vm._l(_vm.section_options, function(option) {
                return _c("button", {
                  staticClass: "dropdown-item",
                  on: { click: option.action }
                }, [
                  _vm._v("\n							" + _vm._s(option.label) + "\n						")
                ]);
              }), 0)
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row section-columns" }, _vm._l(_vm.section.columns, function(column, i) {
          return _c("div", { key: i, staticClass: "column col" }, [
            _c("draggable", {
              staticClass: "drag-container",
              style: {
                backgroundColor: column.fields.length ? null : "var(--gray-50)"
              },
              attrs: { group: "fields", animation: 150 },
              model: {
                value: column.fields,
                callback: function($$v) {
                  _vm.$set(column, "fields", $$v);
                },
                expression: "column.fields"
              }
            }, _vm._l(_vm.get_fields(column), function(df) {
              return _c("Field", {
                key: df.fieldname,
                attrs: { df }
              });
            }), 1)
          ], 1);
        }), 0)
      ]),
      _vm._v(" "),
      _vm.section.page_break ? _c("div", { staticClass: "my-4 text-center text-muted font-italic" }, [_vm._v("\n		" + _vm._s(_vm.__("Page Break")) + "\n	")]) : _vm._e()
    ]) : _vm._e();
  };
  var __vue_staticRenderFns__5 = [];
  __vue_render__5._withStripped = true;
  var __vue_inject_styles__5 = function(inject) {
    if (!inject)
      return;
    inject("data-v-6f17d522_0", { source: "\n.print-format-section-container[data-v-6f17d522]:not(:last-child) {\n	margin-bottom: 1rem;\n}\n.print-format-section[data-v-6f17d522] {\n	background-color: white;\n	border: 1px solid var(--dark-border-color);\n	border-radius: var(--border-radius);\n	padding: 1rem;\n	cursor: pointer;\n}\n.section-header[data-v-6f17d522] {\n	display: flex;\n	justify-content: space-between;\n	align-items: center;\n	padding-bottom: 0.75rem;\n}\n.input-section-label[data-v-6f17d522] {\n	border: 1px solid transparent;\n	border-radius: var(--border-radius);\n	font-size: var(--text-md);\n	font-weight: 600;\n}\n.input-section-label[data-v-6f17d522]:focus {\n	border-color: var(--border-color);\n	outline: none;\n	background-color: var(--control-bg);\n}\n.input-section-label[data-v-6f17d522]::placeholder {\n	font-style: italic;\n	font-weight: normal;\n}\n.btn-section[data-v-6f17d522] {\n	padding: var(--padding-xs);\n	box-shadow: none;\n}\n.btn-section[data-v-6f17d522]:hover {\n	background-color: var(--bg-light-gray);\n}\n.print-format-section[data-v-6f17d522]:not(:first-child) {\n	margin-top: 1rem;\n}\n.section-columns[data-v-6f17d522] {\n	margin-left: -8px;\n	margin-right: -8px;\n}\n.column[data-v-6f17d522] {\n	padding-left: 8px;\n	padding-right: 8px;\n}\n.drag-container[data-v-6f17d522] {\n	height: 100%;\n	min-height: 2rem;\n	border-radius: var(--border-radius);\n}\n", map: { "version": 3, "sources": ["frappe/public/js/print_format_builder/PrintFormatSection.vue"], "names": [], "mappings": ";AAmLA;CACA,mBAAA;AACA;AAEA;CACA,uBAAA;CACA,0CAAA;CACA,mCAAA;CACA,aAAA;CACA,eAAA;AACA;AAEA;CACA,aAAA;CACA,8BAAA;CACA,mBAAA;CACA,uBAAA;AACA;AAEA;CACA,6BAAA;CACA,mCAAA;CACA,yBAAA;CACA,gBAAA;AACA;AAEA;CACA,iCAAA;CACA,aAAA;CACA,mCAAA;AACA;AAEA;CACA,kBAAA;CACA,mBAAA;AACA;AAEA;CACA,0BAAA;CACA,gBAAA;AACA;AAEA;CACA,sCAAA;AACA;AAEA;CACA,gBAAA;AACA;AAEA;CACA,iBAAA;CACA,kBAAA;AACA;AAEA;CACA,iBAAA;CACA,kBAAA;AACA;AAEA;CACA,YAAA;CACA,gBAAA;CACA,mCAAA;AACA", "file": "PrintFormatSection.vue", "sourcesContent": [`<template>
	<div class="print-format-section-container" v-if="!section.remove">
		<div class="print-format-section">
			<div class="section-header">
				<input
					class="input-section-label w-50"
					type="text"
					:placeholder="__('Section Title')"
					v-model="section.label"
				/>
				<div class="d-flex align-items-center">
					<div
						class="mr-2 text-small text-muted d-flex"
						v-if="section.field_orientation == 'left-right'"
						:title="
							// prettier-ignore
							__('Render labels to the left and values to the right in this section')
						"
					>
						Label \u2192 Value
					</div>
					<div class="dropdown">
						<button
							class="btn btn-xs btn-section dropdown-button"
							data-toggle="dropdown"
						>
							<svg class="icon icon-sm">
								<use href="#icon-dot-horizontal"></use>
							</svg>
						</button>
						<div
							class="dropdown-menu dropdown-menu-right"
							role="menu"
						>
							<button
								v-for="option in section_options"
								class="dropdown-item"
								@click="option.action"
							>
								{{ option.label }}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="row section-columns">
				<div
					class="column col"
					v-for="(column, i) in section.columns"
					:key="i"
				>
					<draggable
						class="drag-container"
						:style="{
							backgroundColor: column.fields.length
								? null
								: 'var(--gray-50)'
						}"
						v-model="column.fields"
						group="fields"
						:animation="150"
					>
						<Field
							v-for="df in get_fields(column)"
							:key="df.fieldname"
							:df="df"
						/>
					</draggable>
				</div>
			</div>
		</div>
		<div
			class="my-4 text-center text-muted font-italic"
			v-if="section.page_break"
		>
			{{ __("Page Break") }}
		</div>
	</div>
</template>

<script>
import draggable from "vuedraggable";
import Field from "./Field.vue";
import { storeMixin } from "./store";

export default {
	name: "PrintFormatSection",
	mixins: [storeMixin],
	props: ["section"],
	components: {
		draggable,
		Field
	},
	methods: {
		add_column() {
			if (this.section.columns.length < 4) {
				this.section.columns.push({
					label: "",
					fields: []
				});
			}
		},
		remove_column() {
			if (this.section.columns.length <= 1) return;

			let columns = this.section.columns.slice();
			let last_column_fields = columns.slice(-1)[0].fields.slice();
			let index = columns.length - 1;
			columns = columns.slice(0, index);
			let last_column = columns[index - 1];
			last_column.fields = [...last_column.fields, ...last_column_fields];

			this.$set(this.section, "columns", columns);
		},
		add_page_break() {
			this.$set(this.section, "page_break", true);
		},
		remove_page_break() {
			this.$set(this.section, "page_break", false);
		},
		get_fields(column) {
			return column.fields.filter(df => !df.remove);
		}
	},
	computed: {
		section_options() {
			return [
				{
					label: __("Add section above"),
					action: () => this.$emit("add_section_above")
				},
				{
					label: __("Add column"),
					action: this.add_column,
					condition: () => this.section.columns.length < 4
				},
				{
					label: __("Remove column"),
					action: this.remove_column,
					condition: () => this.section.columns.length > 1
				},
				{
					label: __("Add page break"),
					action: this.add_page_break,
					condition: () => !this.section.page_break
				},
				{
					label: __("Remove page break"),
					action: this.remove_page_break,
					condition: () => this.section.page_break
				},
				{
					label: __("Remove section"),
					action: () => this.$set(this.section, "remove", true)
				},
				{
					label: __("Field Orientation (Left-Right)"),
					condition: () => !this.section.field_orientation,
					action: () =>
						this.$set(
							this.section,
							"field_orientation",
							"left-right"
						)
				},
				{
					label: __("Field Orientation (Top-Down)"),
					condition: () =>
						this.section.field_orientation == "left-right",
					action: () =>
						this.$set(this.section, "field_orientation", "")
				}
			].filter(option => (option.condition ? option.condition() : true));
		}
	}
};
<\/script>

<style scoped>
.print-format-section-container:not(:last-child) {
	margin-bottom: 1rem;
}

.print-format-section {
	background-color: white;
	border: 1px solid var(--dark-border-color);
	border-radius: var(--border-radius);
	padding: 1rem;
	cursor: pointer;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 0.75rem;
}

.input-section-label {
	border: 1px solid transparent;
	border-radius: var(--border-radius);
	font-size: var(--text-md);
	font-weight: 600;
}

.input-section-label:focus {
	border-color: var(--border-color);
	outline: none;
	background-color: var(--control-bg);
}

.input-section-label::placeholder {
	font-style: italic;
	font-weight: normal;
}

.btn-section {
	padding: var(--padding-xs);
	box-shadow: none;
}

.btn-section:hover {
	background-color: var(--bg-light-gray);
}

.print-format-section:not(:first-child) {
	margin-top: 1rem;
}

.section-columns {
	margin-left: -8px;
	margin-right: -8px;
}

.column {
	padding-left: 8px;
	padding-right: 8px;
}

.drag-container {
	height: 100%;
	min-height: 2rem;
	border-radius: var(--border-radius);
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__5 = "data-v-6f17d522";
  var __vue_module_identifier__5 = void 0;
  var __vue_is_functional_template__5 = false;
  function __vue_normalize__5(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "frappe/public/js/print_format_builder/PrintFormatSection.vue";
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
  function __vue_create_injector__5() {
    const styles = __vue_create_injector__5.styles || (__vue_create_injector__5.styles = {});
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
  var __vue_component__5 = /* @__PURE__ */ __vue_normalize__5({ render: __vue_render__5, staticRenderFns: __vue_staticRenderFns__5 }, __vue_inject_styles__5, __vue_script__5, __vue_scope_id__5, __vue_is_functional_template__5, __vue_module_identifier__5, false, __vue_create_injector__5, void 0, void 0);
  var PrintFormatSection_default = __vue_component__5;

  // frappe/public/js/print_format_builder/PrintFormat.vue
  var __vue_script__6 = {
    name: "PrintFormat",
    mixins: [storeMixin],
    components: {
      draggable: import_vuedraggable4.default,
      PrintFormatSection: PrintFormatSection_default,
      LetterHeadEditor: LetterHeadEditor_default,
      HTMLEditor: HTMLEditor_default
    },
    computed: {
      rootStyles() {
        let {
          margin_top = 0,
          margin_bottom = 0,
          margin_left = 0,
          margin_right = 0
        } = this.print_format;
        return {
          padding: `${margin_top}mm ${margin_right}mm ${margin_bottom}mm ${margin_left}mm`,
          width: "210mm",
          minHeight: "297mm"
        };
      },
      page_number_style() {
        let style = {
          position: "absolute",
          background: "white",
          padding: "4px",
          borderRadius: "var(--border-radius)",
          border: "1px solid var(--border-color)"
        };
        if (this.print_format.page_number.includes("Top")) {
          style.top = this.print_format.margin_top / 2 + "mm";
          style.transform = "translateY(-50%)";
        }
        if (this.print_format.page_number.includes("Left")) {
          style.left = this.print_format.margin_left + "mm";
        }
        if (this.print_format.page_number.includes("Right")) {
          style.right = this.print_format.margin_right + "mm";
        }
        if (this.print_format.page_number.includes("Bottom")) {
          style.bottom = this.print_format.margin_bottom / 2 + "mm";
          style.transform = "translateY(50%)";
        }
        if (this.print_format.page_number.includes("Center")) {
          style.left = "50%";
          style.transform += " translateX(-50%)";
        }
        if (this.print_format.page_number.includes("Hide")) {
          style.display = "none";
        }
        return style;
      }
    },
    methods: {
      add_section_above(section) {
        let sections = [];
        for (let _section of this.layout.sections) {
          if (_section === section) {
            sections.push({
              label: "",
              columns: [
                { label: "", fields: [] },
                { label: "", fields: [] }
              ]
            });
          }
          sections.push(_section);
        }
        this.$set(this.layout, "sections", sections);
      },
      update_letterhead_footer(val) {
        this.letterhead.footer = val;
        this.letterhead._dirty = true;
      }
    }
  };
  var __vue_render__6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "print-format-main", style: _vm.rootStyles }, [
      _c("div", { style: _vm.page_number_style }, [
        _vm._v(_vm._s(_vm.__("1 of 2")))
      ]),
      _vm._v(" "),
      _c("LetterHeadEditor", { attrs: { type: "Header" } }),
      _vm._v(" "),
      _c("HTMLEditor", {
        attrs: {
          value: _vm.layout.header,
          "button-label": _vm.__("Edit Header")
        },
        on: {
          change: function($event) {
            return _vm.$set(_vm.layout, "header", $event);
          }
        }
      }),
      _vm._v(" "),
      _c("draggable", {
        staticClass: "mb-4",
        attrs: {
          group: "sections",
          filter: ".section-columns, .column, .field",
          animation: 200
        },
        model: {
          value: _vm.layout.sections,
          callback: function($$v) {
            _vm.$set(_vm.layout, "sections", $$v);
          },
          expression: "layout.sections"
        }
      }, _vm._l(_vm.layout.sections, function(section, i) {
        return _c("PrintFormatSection", {
          key: i,
          attrs: { section },
          on: {
            add_section_above: function($event) {
              return _vm.add_section_above(section);
            }
          }
        });
      }), 1),
      _vm._v(" "),
      _c("HTMLEditor", {
        attrs: {
          value: _vm.layout.footer,
          "button-label": _vm.__("Edit Footer")
        },
        on: {
          change: function($event) {
            return _vm.$set(_vm.layout, "footer", $event);
          }
        }
      }),
      _vm._v(" "),
      _vm.letterhead ? _c("HTMLEditor", {
        attrs: {
          value: _vm.letterhead.footer,
          "button-label": _vm.__("Edit Letter Head Footer")
        },
        on: { change: _vm.update_letterhead_footer }
      }) : _vm._e()
    ], 1);
  };
  var __vue_staticRenderFns__6 = [];
  __vue_render__6._withStripped = true;
  var __vue_inject_styles__6 = function(inject) {
    if (!inject)
      return;
    inject("data-v-0e94793e_0", { source: "\n.print-format-main[data-v-0e94793e] {\n	position: relative;\n	margin-right: auto;\n	margin-left: auto;\n	background-color: white;\n	box-shadow: var(--shadow-lg);\n	border-radius: var(--border-radius);\n}\n", map: { "version": 3, "sources": ["frappe/public/js/print_format_builder/PrintFormat.vue"], "names": [], "mappings": ";AA+HA;CACA,kBAAA;CACA,kBAAA;CACA,iBAAA;CACA,uBAAA;CACA,4BAAA;CACA,mCAAA;AACA", "file": "PrintFormat.vue", "sourcesContent": [`<template>
	<div class="print-format-main" :style="rootStyles">
		<div :style="page_number_style">{{ __("1 of 2") }}</div>

		<LetterHeadEditor type="Header" />
		<HTMLEditor
			:value="layout.header"
			@change="$set(layout, 'header', $event)"
			:button-label="__('Edit Header')"
		/>
		<draggable
			class="mb-4"
			v-model="layout.sections"
			group="sections"
			filter=".section-columns, .column, .field"
			:animation="200"
		>
			<PrintFormatSection
				v-for="(section, i) in layout.sections"
				:key="i"
				:section="section"
				@add_section_above="add_section_above(section)"
			/>
		</draggable>
		<HTMLEditor
			:value="layout.footer"
			@change="$set(layout, 'footer', $event)"
			:button-label="__('Edit Footer')"
		/>
		<HTMLEditor
			v-if="letterhead"
			:value="letterhead.footer"
			@change="update_letterhead_footer"
			:button-label="__('Edit Letter Head Footer')"
		/>
	</div>
</template>

<script>
import draggable from "vuedraggable";
import HTMLEditor from "./HTMLEditor.vue";
import LetterHeadEditor from "./LetterHeadEditor.vue";
import PrintFormatSection from "./PrintFormatSection.vue";
import { storeMixin } from "./store";

export default {
	name: "PrintFormat",
	mixins: [storeMixin],
	components: {
		draggable,
		PrintFormatSection,
		LetterHeadEditor,
		HTMLEditor
	},
	computed: {
		rootStyles() {
			let {
				margin_top = 0,
				margin_bottom = 0,
				margin_left = 0,
				margin_right = 0
			} = this.print_format;
			return {
				padding: \`\${margin_top}mm \${margin_right}mm \${margin_bottom}mm \${margin_left}mm\`,
				width: "210mm",
				minHeight: "297mm"
			};
		},
		page_number_style() {
			let style = {
				position: "absolute",
				background: "white",
				padding: "4px",
				borderRadius: "var(--border-radius)",
				border: "1px solid var(--border-color)"
			};
			if (this.print_format.page_number.includes("Top")) {
				style.top = this.print_format.margin_top / 2 + "mm";
				style.transform = "translateY(-50%)";
			}
			if (this.print_format.page_number.includes("Left")) {
				style.left = this.print_format.margin_left + "mm";
			}
			if (this.print_format.page_number.includes("Right")) {
				style.right = this.print_format.margin_right + "mm";
			}
			if (this.print_format.page_number.includes("Bottom")) {
				style.bottom = this.print_format.margin_bottom / 2 + "mm";
				style.transform = "translateY(50%)";
			}
			if (this.print_format.page_number.includes("Center")) {
				style.left = "50%";
				style.transform += " translateX(-50%)";
			}
			if (this.print_format.page_number.includes("Hide")) {
				style.display = "none";
			}

			return style;
		}
	},
	methods: {
		add_section_above(section) {
			let sections = [];
			for (let _section of this.layout.sections) {
				if (_section === section) {
					sections.push({
						label: "",
						columns: [
							{ label: "", fields: [] },
							{ label: "", fields: [] }
						]
					});
				}
				sections.push(_section);
			}
			this.$set(this.layout, "sections", sections);
		},
		update_letterhead_footer(val) {
			this.letterhead.footer = val;
			this.letterhead._dirty = true;
		}
	}
};
<\/script>

<style scoped>
.print-format-main {
	position: relative;
	margin-right: auto;
	margin-left: auto;
	background-color: white;
	box-shadow: var(--shadow-lg);
	border-radius: var(--border-radius);
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__6 = "data-v-0e94793e";
  var __vue_module_identifier__6 = void 0;
  var __vue_is_functional_template__6 = false;
  function __vue_normalize__6(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "frappe/public/js/print_format_builder/PrintFormat.vue";
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
  function __vue_create_injector__6() {
    const styles = __vue_create_injector__6.styles || (__vue_create_injector__6.styles = {});
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
  var __vue_component__6 = /* @__PURE__ */ __vue_normalize__6({ render: __vue_render__6, staticRenderFns: __vue_staticRenderFns__6 }, __vue_inject_styles__6, __vue_script__6, __vue_scope_id__6, __vue_is_functional_template__6, __vue_module_identifier__6, false, __vue_create_injector__6, void 0, void 0);
  var PrintFormat_default = __vue_component__6;

  // frappe/public/js/print_format_builder/Preview.vue
  var __vue_script__7 = {
    name: "Preview",
    mixins: [storeMixin],
    data() {
      return {
        type: "PDF",
        docname: null,
        preview_loaded: false
      };
    },
    mounted() {
      this.doc_select = frappe.ui.form.make_control({
        parent: this.$refs["doc-select"],
        df: {
          label: __("Select {0}", [__(this.doctype)]),
          fieldname: "docname",
          fieldtype: "Link",
          options: this.doctype,
          change: () => {
            this.docname = this.doc_select.get_value();
          }
        },
        render_input: true
      });
      this.preview_type = frappe.ui.form.make_control({
        parent: this.$refs["preview-type"],
        df: {
          label: __("Preview type"),
          fieldname: "docname",
          fieldtype: "Select",
          options: ["PDF", "HTML"],
          change: () => {
            this.type = this.preview_type.get_value();
          }
        },
        render_input: true
      });
      this.preview_type.set_value(this.type);
      this.get_default_docname().then((docname) => docname && this.doc_select.set_value(docname));
      this.$store.$on("after_save", () => {
        this.refresh();
      });
    },
    methods: {
      refresh() {
        this.$refs.iframe.contentWindow.location.reload();
      },
      get_default_docname() {
        return frappe.db.get_list(this.doctype, { limit: 1 }).then((doc) => {
          return doc.length > 0 ? doc[0].name : null;
        });
      }
    },
    computed: {
      doctype() {
        return this.print_format.doc_type;
      },
      url() {
        if (!this.docname)
          return null;
        let params = new URLSearchParams();
        params.append("doctype", this.doctype);
        params.append("name", this.docname);
        params.append("print_format", this.print_format.name);
        if (this.$store.letterhead) {
          params.append("letterhead", this.$store.letterhead.name);
        }
        let url = this.type == "PDF" ? `/api/method/frappe.utils.weasyprint.download_pdf` : "/printpreview";
        return `${url}?${params.toString()}`;
      }
    }
  };
  var __vue_render__7 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "h-100" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col" }, [
          _c("div", { ref: "doc-select", staticClass: "preview-control" })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col" }, [
          _c("div", { ref: "preview-type", staticClass: "preview-control" })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col d-flex" }, [
          _vm.url ? _c("a", {
            staticClass: "btn btn-default btn-sm btn-new-tab",
            attrs: { target: "_blank", href: _vm.url }
          }, [
            _vm._v("\n				" + _vm._s(_vm.__("Open in a new tab")) + "\n			")
          ]) : _vm._e(),
          _vm._v(" "),
          _vm.url ? _c("button", {
            staticClass: "ml-3 btn btn-default btn-sm btn-new-tab",
            on: { click: _vm.refresh }
          }, [_vm._v("\n				" + _vm._s(_vm.__("Refresh")) + "\n			")]) : _vm._e()
        ])
      ]),
      _vm._v(" "),
      _vm.url && !_vm.preview_loaded ? _c("div", [_vm._v("Generating preview...")]) : _vm._e(),
      _vm._v(" "),
      _vm.url ? _c("iframe", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.preview_loaded,
            expression: "preview_loaded"
          }
        ],
        ref: "iframe",
        staticClass: "preview-iframe",
        attrs: { src: _vm.url },
        on: {
          load: function($event) {
            _vm.preview_loaded = true;
          }
        }
      }) : _vm._e()
    ]);
  };
  var __vue_staticRenderFns__7 = [];
  __vue_render__7._withStripped = true;
  var __vue_inject_styles__7 = function(inject) {
    if (!inject)
      return;
    inject("data-v-70dca9ee_0", { source: "\n.preview-iframe[data-v-70dca9ee] {\n	width: 100%;\n	height: 96%;\n	border: none;\n	border-radius: var(--border-radius);\n}\n.btn-new-tab[data-v-70dca9ee] {\n	margin-top: auto;\n	margin-bottom: 1.2rem;\n}\n.preview-control[data-v-70dca9ee] :deep(.form-control) {\n	background: var(--control-bg-on-gray);\n}\n", map: { "version": 3, "sources": ["frappe/public/js/print_format_builder/Preview.vue"], "names": [], "mappings": ";AAsHA;CACA,WAAA;CACA,WAAA;CACA,YAAA;CACA,mCAAA;AACA;AACA;CACA,gBAAA;CACA,qBAAA;AACA;AACA;CACA,qCAAA;AACA", "file": "Preview.vue", "sourcesContent": ['<template>\n	<div class="h-100">\n		<div class="row">\n			<div class="col">\n				<div class="preview-control" ref="doc-select"></div>\n			</div>\n			<div class="col">\n				<div class="preview-control" ref="preview-type"></div>\n			</div>\n			<div class="col d-flex">\n				<a\n					v-if="url"\n					class="btn btn-default btn-sm btn-new-tab"\n					target="_blank"\n					:href="url"\n				>\n					{{ __("Open in a new tab") }}\n				</a>\n				<button\n					v-if="url"\n					class="ml-3 btn btn-default btn-sm btn-new-tab"\n					@click="refresh"\n				>\n					{{ __("Refresh") }}\n				</button>\n			</div>\n		</div>\n		<div v-if="url && !preview_loaded">Generating preview...</div>\n		<iframe\n			ref="iframe"\n			:src="url"\n			v-if="url"\n			v-show="preview_loaded"\n			class="preview-iframe"\n			@load="preview_loaded = true"\n		></iframe>\n	</div>\n</template>\n<script>\nimport { storeMixin } from "./store";\nexport default {\n	name: "Preview",\n	mixins: [storeMixin],\n	data() {\n		return {\n			type: "PDF",\n			docname: null,\n			preview_loaded: false\n		};\n	},\n	mounted() {\n		this.doc_select = frappe.ui.form.make_control({\n			parent: this.$refs["doc-select"],\n			df: {\n				label: __("Select {0}", [__(this.doctype)]),\n				fieldname: "docname",\n				fieldtype: "Link",\n				options: this.doctype,\n				change: () => {\n					this.docname = this.doc_select.get_value();\n				}\n			},\n			render_input: true\n		});\n		this.preview_type = frappe.ui.form.make_control({\n			parent: this.$refs["preview-type"],\n			df: {\n				label: __("Preview type"),\n				fieldname: "docname",\n				fieldtype: "Select",\n				options: ["PDF", "HTML"],\n				change: () => {\n					this.type = this.preview_type.get_value();\n				}\n			},\n			render_input: true\n		});\n		this.preview_type.set_value(this.type);\n		this.get_default_docname().then(\n			docname => docname && this.doc_select.set_value(docname)\n		);\n		this.$store.$on("after_save", () => {\n			this.refresh();\n		});\n	},\n	methods: {\n		refresh() {\n			this.$refs.iframe.contentWindow.location.reload();\n		},\n		get_default_docname() {\n			return frappe.db.get_list(this.doctype, { limit: 1 }).then(doc => {\n				return doc.length > 0 ? doc[0].name : null;\n			});\n		}\n	},\n	computed: {\n		doctype() {\n			return this.print_format.doc_type;\n		},\n		url() {\n			if (!this.docname) return null;\n			let params = new URLSearchParams();\n			params.append("doctype", this.doctype);\n			params.append("name", this.docname);\n			params.append("print_format", this.print_format.name);\n			if (this.$store.letterhead) {\n				params.append("letterhead", this.$store.letterhead.name);\n			}\n			let url =\n				this.type == "PDF"\n					? `/api/method/frappe.utils.weasyprint.download_pdf`\n					: "/printpreview";\n			return `${url}?${params.toString()}`;\n		}\n	}\n};\n<\/script>\n<style scoped>\n.preview-iframe {\n	width: 100%;\n	height: 96%;\n	border: none;\n	border-radius: var(--border-radius);\n}\n.btn-new-tab {\n	margin-top: auto;\n	margin-bottom: 1.2rem;\n}\n.preview-control :deep(.form-control) {\n	background: var(--control-bg-on-gray);\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__7 = "data-v-70dca9ee";
  var __vue_module_identifier__7 = void 0;
  var __vue_is_functional_template__7 = false;
  function __vue_normalize__7(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "frappe/public/js/print_format_builder/Preview.vue";
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
  function __vue_create_injector__7() {
    const styles = __vue_create_injector__7.styles || (__vue_create_injector__7.styles = {});
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
  var __vue_component__7 = /* @__PURE__ */ __vue_normalize__7({ render: __vue_render__7, staticRenderFns: __vue_staticRenderFns__7 }, __vue_inject_styles__7, __vue_script__7, __vue_scope_id__7, __vue_is_functional_template__7, __vue_module_identifier__7, false, __vue_create_injector__7, void 0, void 0);
  var Preview_default = __vue_component__7;

  // frappe/public/js/print_format_builder/PrintFormatControls.vue
  var import_vuedraggable5 = __toESM(require_vuedraggable_umd());
  var __vue_script__8 = {
    name: "PrintFormatControls",
    mixins: [storeMixin],
    data() {
      return {
        search_text: "",
        google_fonts: []
      };
    },
    components: {
      draggable: import_vuedraggable5.default
    },
    mounted() {
      let method = "frappe.printing.page.print_format_builder_beta.print_format_builder_beta.get_google_fonts";
      frappe.call(method).then((r) => {
        this.google_fonts = r.message || [];
        if (!this.google_fonts.includes(this.print_format.font)) {
          this.google_fonts.push(this.print_format.font);
        }
      });
    },
    methods: {
      update_margin(fieldname, value) {
        value = parseFloat(value);
        if (value < 0) {
          value = 0;
        }
        this.$store.print_format[fieldname] = value;
      },
      clone_field(df) {
        let cloned = pluck(df, [
          "label",
          "fieldname",
          "fieldtype",
          "options",
          "table_columns",
          "html",
          "field_template"
        ]);
        if (cloned.custom) {
          cloned.fieldname += "_" + frappe.utils.get_random(8);
        }
        return cloned;
      }
    },
    computed: {
      margins() {
        return [
          { label: __("Top"), fieldname: "margin_top" },
          { label: __("Bottom"), fieldname: "margin_bottom" },
          { label: __("Left", null, "alignment"), fieldname: "margin_left" },
          { label: __("Right", null, "alignment"), fieldname: "margin_right" }
        ];
      },
      fields() {
        let fields = this.meta.fields.filter((df) => {
          if (["Section Break", "Column Break"].includes(df.fieldtype)) {
            return false;
          }
          if (this.search_text) {
            if (df.fieldname.includes(this.search_text)) {
              return true;
            }
            if (df.label && df.label.includes(this.search_text)) {
              return true;
            }
            return false;
          } else {
            return true;
          }
        }).map((df) => {
          let out = {
            label: df.label,
            fieldname: df.fieldname,
            fieldtype: df.fieldtype,
            options: df.options
          };
          if (df.fieldtype == "Table") {
            out.table_columns = get_table_columns(df);
          }
          return out;
        });
        return [
          {
            label: __("Custom HTML"),
            fieldname: "custom_html",
            fieldtype: "HTML",
            html: "",
            custom: 1
          },
          {
            label: __("ID (name)"),
            fieldname: "name",
            fieldtype: "Data"
          },
          {
            label: __("Spacer"),
            fieldname: "spacer",
            fieldtype: "Spacer",
            custom: 1
          },
          {
            label: __("Divider"),
            fieldname: "divider",
            fieldtype: "Divider",
            custom: 1
          },
          ...this.print_templates,
          ...fields
        ];
      },
      print_templates() {
        let templates = this.print_format.__onload.print_templates || {};
        let out = [];
        for (let template of templates) {
          let df;
          if (template.field) {
            df = frappe.meta.get_docfield(this.meta.name, template.field);
          } else {
            df = {
              label: template.name,
              fieldname: frappe.scrub(template.name)
            };
          }
          out.push({
            label: `${__(df.label)} (${__("Field Template")})`,
            fieldname: df.fieldname + "_template",
            fieldtype: "Field Template",
            field_template: template.name
          });
        }
        return out;
      },
      page_number_positions() {
        return [
          { label: __("Hide"), value: "Hide" },
          { label: __("Top Left"), value: "Top Left" },
          { label: __("Top Center"), value: "Top Center" },
          { label: __("Top Right"), value: "Top Right" },
          { label: __("Bottom Left"), value: "Bottom Left" },
          { label: __("Bottom Center"), value: "Bottom Center" },
          { label: __("Bottom Right"), value: "Bottom Right" }
        ];
      }
    }
  };
  var __vue_render__8 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "layout-side-section" }, [
      _c("div", { staticClass: "form-sidebar" }, [
        _c("div", { staticClass: "sidebar-menu" }, [
          _c("div", { staticClass: "sidebar-label" }, [
            _vm._v(_vm._s(_vm.__("Page Margins")))
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "margin-controls" }, _vm._l(_vm.margins, function(df) {
            return _c("div", { key: df.fieldname, staticClass: "form-group" }, [
              _c("div", { staticClass: "clearfix" }, [
                _c("label", { staticClass: "control-label" }, [
                  _vm._v("\n							" + _vm._s(df.label) + "\n						")
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "control-input-wrapper" }, [
                _c("div", { staticClass: "control-input" }, [
                  _c("input", {
                    staticClass: "form-control form-control-sm",
                    attrs: { type: "number", min: "0" },
                    domProps: { value: _vm.print_format[df.fieldname] },
                    on: {
                      change: function(e) {
                        return _vm.update_margin(df.fieldname, e.target.value);
                      }
                    }
                  })
                ])
              ])
            ]);
          }), 0)
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "sidebar-menu" }, [
          _c("div", { staticClass: "sidebar-label" }, [
            _vm._v(_vm._s(_vm.__("Google Font")))
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("div", { staticClass: "control-input-wrapper" }, [
              _c("div", { staticClass: "control-input" }, [
                _c("select", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.print_format.font,
                      expression: "print_format.font"
                    }
                  ],
                  staticClass: "form-control form-control-sm",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
                        return o.selected;
                      }).map(function(o) {
                        var val = "_value" in o ? o._value : o.value;
                        return val;
                      });
                      _vm.$set(_vm.print_format, "font", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                    }
                  }
                }, _vm._l(_vm.google_fonts, function(font) {
                  return _c("option", { domProps: { value: font } }, [
                    _vm._v("\n								" + _vm._s(font) + "\n							")
                  ]);
                }), 0)
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "sidebar-menu" }, [
          _c("div", { staticClass: "sidebar-label" }, [
            _vm._v(_vm._s(_vm.__("Font Size")))
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("div", { staticClass: "control-input-wrapper" }, [
              _c("div", { staticClass: "control-input" }, [
                _c("input", {
                  staticClass: "form-control form-control-sm",
                  attrs: { type: "number", placeholder: "12, 13, 14" },
                  domProps: { value: _vm.print_format.font_size },
                  on: {
                    change: function(e) {
                      return _vm.print_format.font_size = parseFloat(e.target.value);
                    }
                  }
                })
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "sidebar-menu" }, [
          _c("div", { staticClass: "sidebar-label" }, [
            _vm._v(_vm._s(_vm.__("Page Number")))
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("div", { staticClass: "control-input-wrapper" }, [
              _c("div", { staticClass: "control-input" }, [
                _c("select", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.print_format.page_number,
                      expression: "print_format.page_number"
                    }
                  ],
                  staticClass: "form-control form-control-sm",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
                        return o.selected;
                      }).map(function(o) {
                        var val = "_value" in o ? o._value : o.value;
                        return val;
                      });
                      _vm.$set(_vm.print_format, "page_number", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                    }
                  }
                }, _vm._l(_vm.page_number_positions, function(position) {
                  return _c("option", { domProps: { value: position.value } }, [
                    _vm._v("\n								" + _vm._s(position.label) + "\n							")
                  ]);
                }), 0)
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "sidebar-menu" }, [
          _c("div", { staticClass: "sidebar-label" }, [
            _vm._v(_vm._s(_vm.__("Fields")))
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.search_text,
                expression: "search_text"
              }
            ],
            staticClass: "mb-2 form-control form-control-sm",
            attrs: { type: "text", placeholder: _vm.__("Search fields") },
            domProps: { value: _vm.search_text },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return;
                }
                _vm.search_text = $event.target.value;
              }
            }
          }),
          _vm._v(" "),
          _c("draggable", {
            staticClass: "fields-container",
            attrs: {
              list: _vm.fields,
              group: { name: "fields", pull: "clone", put: false },
              sort: false,
              clone: _vm.clone_field
            }
          }, _vm._l(_vm.fields, function(df) {
            return _c("div", {
              key: df.fieldname,
              staticClass: "field",
              attrs: { title: df.fieldname }
            }, [_vm._v("\n					" + _vm._s(df.label) + "\n				")]);
          }), 0)
        ], 1)
      ])
    ]);
  };
  var __vue_staticRenderFns__8 = [];
  __vue_render__8._withStripped = true;
  var __vue_inject_styles__8 = function(inject) {
    if (!inject)
      return;
    inject("data-v-ebae9a98_0", { source: '\n.margin-controls[data-v-ebae9a98] {\n	display: flex;\n}\n.form-control[data-v-ebae9a98] {\n	background: var(--control-bg-on-gray);\n}\n.margin-controls > .form-group + .form-group[data-v-ebae9a98] {\n	margin-left: 0.5rem;\n}\n.margin-controls > .form-group[data-v-ebae9a98] {\n	margin-bottom: 0;\n}\n.fields-container[data-v-ebae9a98] {\n	max-height: calc(100vh - 34rem);\n	overflow-y: auto;\n}\n.field[data-v-ebae9a98] {\n	display: flex;\n	justify-content: space-between;\n	align-items: center;\n	width: 100%;\n	background-color: var(--bg-light-gray);\n	border-radius: var(--border-radius);\n	border: 1px dashed var(--gray-400);\n	padding: 0.5rem 0.75rem;\n	font-size: var(--text-sm);\n	cursor: pointer;\n}\n.field[data-v-ebae9a98]:not(:first-child) {\n	margin-top: 0.5rem;\n}\n.sidebar-menu[data-v-ebae9a98]:last-child {\n	margin-bottom: 0;\n}\n.control-font[data-v-ebae9a98] :deep(.frappe-control[data-fieldname="font"] label) {\n	display: none;\n}\n', map: { "version": 3, "sources": ["frappe/public/js/print_format_builder/PrintFormatControls.vue"], "names": [], "mappings": ";AAkSA;CACA,aAAA;AACA;AAEA;CACA,qCAAA;AACA;AAEA;CACA,mBAAA;AACA;AAEA;CACA,gBAAA;AACA;AAEA;CACA,+BAAA;CACA,gBAAA;AACA;AAEA;CACA,aAAA;CACA,8BAAA;CACA,mBAAA;CACA,WAAA;CACA,sCAAA;CACA,mCAAA;CACA,kCAAA;CACA,uBAAA;CACA,yBAAA;CACA,eAAA;AACA;AAEA;CACA,kBAAA;AACA;AAEA;CACA,gBAAA;AACA;AAEA;CACA,aAAA;AACA", "file": "PrintFormatControls.vue", "sourcesContent": [`<template>
	<div class="layout-side-section">
		<div class="form-sidebar">
			<div class="sidebar-menu">
				<div class="sidebar-label">{{ __("Page Margins") }}</div>
				<div class="margin-controls">
					<div
						class="form-group"
						v-for="df in margins"
						:key="df.fieldname"
					>
						<div class="clearfix">
							<label class="control-label">
								{{ df.label }}
							</label>
						</div>
						<div class="control-input-wrapper">
							<div class="control-input">
								<input
									type="number"
									class="form-control form-control-sm"
									:value="print_format[df.fieldname]"
									min="0"
									@change="
										e =>
											update_margin(
												df.fieldname,
												e.target.value
											)
									"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="sidebar-menu">
				<div class="sidebar-label">{{ __("Google Font") }}</div>
				<div class="form-group">
					<div class="control-input-wrapper">
						<div class="control-input">
							<select
								class="form-control form-control-sm"
								v-model="print_format.font"
							>
								<option
									v-for="font in google_fonts"
									:value="font"
								>
									{{ font }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="sidebar-menu">
				<div class="sidebar-label">{{ __("Font Size") }}</div>
				<div class="form-group">
					<div class="control-input-wrapper">
						<div class="control-input">
							<input
								type="number"
								class="form-control form-control-sm"
								placeholder="12, 13, 14"
								:value="print_format.font_size"
								@change="
									e =>
										(print_format.font_size = parseFloat(
											e.target.value
										))
								"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="sidebar-menu">
				<div class="sidebar-label">{{ __("Page Number") }}</div>
				<div class="form-group">
					<div class="control-input-wrapper">
						<div class="control-input">
							<select
								class="form-control form-control-sm"
								v-model="print_format.page_number"
							>
								<option
									v-for="position in page_number_positions"
									:value="position.value"
								>
									{{ position.label }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="sidebar-menu">
				<div class="sidebar-label">{{ __("Fields") }}</div>
				<input
					class="mb-2 form-control form-control-sm"
					type="text"
					:placeholder="__('Search fields')"
					v-model="search_text"
				/>
				<draggable
					class="fields-container"
					:list="fields"
					:group="{ name: 'fields', pull: 'clone', put: false }"
					:sort="false"
					:clone="clone_field"
				>
					<div
						class="field"
						v-for="df in fields"
						:key="df.fieldname"
						:title="df.fieldname"
					>
						{{ df.label }}
					</div>
				</draggable>
			</div>
		</div>
	</div>
</template>

<script>
import draggable from "vuedraggable";
import { get_table_columns, pluck } from "./utils";
import { storeMixin } from "./store";

export default {
	name: "PrintFormatControls",
	mixins: [storeMixin],
	data() {
		return {
			search_text: "",
			google_fonts: []
		};
	},
	components: {
		draggable
	},
	mounted() {
		let method =
			"frappe.printing.page.print_format_builder_beta.print_format_builder_beta.get_google_fonts";
		frappe.call(method).then(r => {
			this.google_fonts = r.message || [];
			if (!this.google_fonts.includes(this.print_format.font)) {
				this.google_fonts.push(this.print_format.font);
			}
		});
	},
	methods: {
		update_margin(fieldname, value) {
			value = parseFloat(value);
			if (value < 0) {
				value = 0;
			}
			this.$store.print_format[fieldname] = value;
		},
		clone_field(df) {
			let cloned = pluck(df, [
				"label",
				"fieldname",
				"fieldtype",
				"options",
				"table_columns",
				"html",
				"field_template"
			]);
			if (cloned.custom) {
				// generate unique fieldnames for custom blocks
				cloned.fieldname += "_" + frappe.utils.get_random(8);
			}
			return cloned;
		}
	},
	computed: {
		margins() {
			return [
				{ label: __("Top"), fieldname: "margin_top" },
				{ label: __("Bottom"), fieldname: "margin_bottom" },
				{ label: __("Left", null, 'alignment'), fieldname: "margin_left" },
				{ label: __("Right", null, 'alignment'), fieldname: "margin_right" }
			];
		},
		fields() {
			let fields = this.meta.fields
				.filter(df => {
					if (
						["Section Break", "Column Break"].includes(df.fieldtype)
					) {
						return false;
					}
					if (this.search_text) {
						if (df.fieldname.includes(this.search_text)) {
							return true;
						}
						if (df.label && df.label.includes(this.search_text)) {
							return true;
						}
						return false;
					} else {
						return true;
					}
				})
				.map(df => {
					let out = {
						label: df.label,
						fieldname: df.fieldname,
						fieldtype: df.fieldtype,
						options: df.options
					};
					if (df.fieldtype == "Table") {
						out.table_columns = get_table_columns(df);
					}
					return out;
				});

			return [
				{
					label: __("Custom HTML"),
					fieldname: "custom_html",
					fieldtype: "HTML",
					html: "",
					custom: 1
				},
				{
					label: __("ID (name)"),
					fieldname: "name",
					fieldtype: "Data"
				},
				{
					label: __("Spacer"),
					fieldname: "spacer",
					fieldtype: "Spacer",
					custom: 1
				},
				{
					label: __("Divider"),
					fieldname: "divider",
					fieldtype: "Divider",
					custom: 1
				},
				...this.print_templates,
				...fields
			];
		},
		print_templates() {
			let templates = this.print_format.__onload.print_templates || {};
			let out = [];
			for (let template of templates) {
				let df;
				if (template.field) {
					df = frappe.meta.get_docfield(
						this.meta.name,
						template.field
					);
				} else {
					df = {
						label: template.name,
						fieldname: frappe.scrub(template.name)
					};
				}
				out.push({
					label: \`\${__(df.label)} (\${__("Field Template")})\`,
					fieldname: df.fieldname + "_template",
					fieldtype: "Field Template",
					field_template: template.name
				});
			}
			return out;
		},
		page_number_positions() {
			return [
				{ label: __("Hide"), value: "Hide" },
				{ label: __("Top Left"), value: "Top Left" },
				{ label: __("Top Center"), value: "Top Center" },
				{ label: __("Top Right"), value: "Top Right" },
				{ label: __("Bottom Left"), value: "Bottom Left" },
				{ label: __("Bottom Center"), value: "Bottom Center" },
				{ label: __("Bottom Right"), value: "Bottom Right" }
			];
		}
	}
};
<\/script>

<style scoped>
.margin-controls {
	display: flex;
}

.form-control {
	background: var(--control-bg-on-gray);
}

.margin-controls > .form-group + .form-group {
	margin-left: 0.5rem;
}

.margin-controls > .form-group {
	margin-bottom: 0;
}

.fields-container {
	max-height: calc(100vh - 34rem);
	overflow-y: auto;
}

.field {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: var(--bg-light-gray);
	border-radius: var(--border-radius);
	border: 1px dashed var(--gray-400);
	padding: 0.5rem 0.75rem;
	font-size: var(--text-sm);
	cursor: pointer;
}

.field:not(:first-child) {
	margin-top: 0.5rem;
}

.sidebar-menu:last-child {
	margin-bottom: 0;
}

.control-font :deep(.frappe-control[data-fieldname="font"] label) {
	display: none;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__8 = "data-v-ebae9a98";
  var __vue_module_identifier__8 = void 0;
  var __vue_is_functional_template__8 = false;
  function __vue_normalize__8(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "frappe/public/js/print_format_builder/PrintFormatControls.vue";
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
  function __vue_create_injector__8() {
    const styles = __vue_create_injector__8.styles || (__vue_create_injector__8.styles = {});
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
  var __vue_component__8 = /* @__PURE__ */ __vue_normalize__8({ render: __vue_render__8, staticRenderFns: __vue_staticRenderFns__8 }, __vue_inject_styles__8, __vue_script__8, __vue_scope_id__8, __vue_is_functional_template__8, __vue_module_identifier__8, false, __vue_create_injector__8, void 0, void 0);
  var PrintFormatControls_default = __vue_component__8;

  // frappe/public/js/print_format_builder/PrintFormatBuilder.vue
  var __vue_script__9 = {
    name: "PrintFormatBuilder",
    props: ["print_format_name"],
    components: {
      PrintFormat: PrintFormat_default,
      PrintFormatControls: PrintFormatControls_default,
      Preview: Preview_default
    },
    data() {
      return {
        show_preview: false
      };
    },
    provide() {
      return {
        $store: this.$store
      };
    },
    mounted() {
      this.$store.fetch().then(() => {
        if (!this.$store.layout) {
          this.$store.layout = this.$store.get_default_layout();
          this.$store.save_changes();
        }
      });
    },
    methods: {
      toggle_preview() {
        this.show_preview = !this.show_preview;
      }
    },
    computed: {
      $store() {
        return getStore(this.print_format_name);
      },
      shouldRender() {
        return Boolean(this.$store.print_format && this.$store.meta && this.$store.layout);
      }
    }
  };
  var __vue_render__9 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.shouldRender ? _c("div", { staticClass: "layout-main-section row" }, [
      _c("div", { staticClass: "col-3" }, [_c("PrintFormatControls")], 1),
      _vm._v(" "),
      _c("div", { staticClass: "print-format-container col-9" }, [
        _c("keep-alive", [_vm.show_preview ? _c("Preview") : _c("PrintFormat")], 1)
      ], 1)
    ]) : _vm._e();
  };
  var __vue_staticRenderFns__9 = [];
  __vue_render__9._withStripped = true;
  var __vue_inject_styles__9 = function(inject) {
    if (!inject)
      return;
    inject("data-v-17fb0e8b_0", { source: "\n.print-format-container[data-v-17fb0e8b] {\n	height: calc(100vh - 140px);\n	overflow-y: auto;\n	padding-top: 0.5rem;\n	padding-bottom: 4rem;\n}\n", map: { "version": 3, "sources": ["frappe/public/js/print_format_builder/PrintFormatBuilder.vue"], "names": [], "mappings": ";AAmEA;CACA,2BAAA;CACA,gBAAA;CACA,mBAAA;CACA,oBAAA;AACA", "file": "PrintFormatBuilder.vue", "sourcesContent": ['<template>\n	<div class="layout-main-section row" v-if="shouldRender">\n		<div class="col-3">\n			<PrintFormatControls />\n		</div>\n		<div class="print-format-container col-9">\n			<keep-alive>\n				<Preview v-if="show_preview" />\n				<PrintFormat v-else />\n			</keep-alive>\n		</div>\n	</div>\n</template>\n\n<script>\nimport PrintFormat from "./PrintFormat.vue";\nimport Preview from "./Preview.vue";\nimport PrintFormatControls from "./PrintFormatControls.vue";\nimport { getStore } from "./store";\n\nexport default {\n	name: "PrintFormatBuilder",\n	props: ["print_format_name"],\n	components: {\n		PrintFormat,\n		PrintFormatControls,\n		Preview\n	},\n	data() {\n		return {\n			show_preview: false\n		};\n	},\n	provide() {\n		return {\n			$store: this.$store\n		};\n	},\n	mounted() {\n		this.$store.fetch().then(() => {\n			if (!this.$store.layout) {\n				this.$store.layout = this.$store.get_default_layout();\n				this.$store.save_changes();\n			}\n		});\n	},\n	methods: {\n		toggle_preview() {\n			this.show_preview = !this.show_preview;\n		}\n	},\n	computed: {\n		$store() {\n			return getStore(this.print_format_name);\n		},\n		shouldRender() {\n			return Boolean(\n				this.$store.print_format &&\n					this.$store.meta &&\n					this.$store.layout\n			);\n		}\n	}\n};\n<\/script>\n\n<style scoped>\n.print-format-container {\n	height: calc(100vh - 140px);\n	overflow-y: auto;\n	padding-top: 0.5rem;\n	padding-bottom: 4rem;\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__9 = "data-v-17fb0e8b";
  var __vue_module_identifier__9 = void 0;
  var __vue_is_functional_template__9 = false;
  function __vue_normalize__9(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "frappe/public/js/print_format_builder/PrintFormatBuilder.vue";
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
  function __vue_create_injector__9() {
    const styles = __vue_create_injector__9.styles || (__vue_create_injector__9.styles = {});
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
  var __vue_component__9 = /* @__PURE__ */ __vue_normalize__9({ render: __vue_render__9, staticRenderFns: __vue_staticRenderFns__9 }, __vue_inject_styles__9, __vue_script__9, __vue_scope_id__9, __vue_is_functional_template__9, __vue_module_identifier__9, false, __vue_create_injector__9, void 0, void 0);
  var PrintFormatBuilder_default = __vue_component__9;

  // frappe/public/js/print_format_builder/print_format_builder.bundle.js
  var PrintFormatBuilder = class {
    constructor({ wrapper, page, print_format }) {
      this.$wrapper = $(wrapper);
      this.page = page;
      this.print_format = print_format;
      this.page.clear_actions();
      this.page.clear_icons();
      this.page.clear_custom_actions();
      this.page.set_title(__("Editing {0}", [this.print_format]));
      this.page.set_primary_action(__("Save"), () => {
        this.$component.$store.save_changes();
      });
      let $toggle_preview_btn = this.page.add_button(__("Show Preview"), () => {
        this.$component.toggle_preview();
      });
      let $reset_changes_btn = this.page.add_button(__("Reset Changes"), () => this.$component.$store.reset_changes());
      this.page.add_menu_item(__("Edit Print Format"), () => {
        frappe.set_route("Form", "Print Format", this.print_format);
      });
      this.page.add_menu_item(__("Change Print Format"), () => {
        frappe.set_route("print-format-builder-beta");
      });
      let $vm = new Vue({
        el: this.$wrapper.get(0),
        render: (h) => h(PrintFormatBuilder_default, {
          props: {
            print_format_name: print_format
          }
        })
      });
      this.$component = $vm.$children[0];
      let store = getStore(print_format);
      store.$watch("dirty", (value) => {
        if (value) {
          this.page.set_indicator("Not Saved", "orange");
          $toggle_preview_btn.hide();
          $reset_changes_btn.show();
        } else {
          this.page.clear_indicator();
          $toggle_preview_btn.show();
          $reset_changes_btn.hide();
        }
      });
      this.$component.$watch("show_preview", (value) => {
        $toggle_preview_btn.text(value ? __("Hide Preview") : __("Show Preview"));
      });
    }
  };
  frappe.provide("frappe.ui");
  frappe.ui.PrintFormatBuilder = PrintFormatBuilder;
  var print_format_builder_bundle_default = PrintFormatBuilder;
})();
/**!
 * Sortable 1.10.2
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
//# sourceMappingURL=print_format_builder.bundle.NFXMOFMP.js.map
