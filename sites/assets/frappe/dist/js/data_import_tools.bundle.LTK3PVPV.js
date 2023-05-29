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

  // node_modules/frappe-datatable/node_modules/sortablejs/Sortable.js
  var require_Sortable = __commonJS({
    "node_modules/frappe-datatable/node_modules/sortablejs/Sortable.js"(exports, module) {
      (function sortableModule(factory) {
        "use strict";
        if (typeof define === "function" && define.amd) {
          define(factory);
        } else if (typeof module != "undefined" && typeof module.exports != "undefined") {
          module.exports = factory();
        } else {
          window["Sortable"] = factory();
        }
      })(function sortableFactory() {
        "use strict";
        if (typeof window === "undefined" || !window.document) {
          return function sortableError() {
            throw new Error("Sortable.js requires a window with a document");
          };
        }
        var dragEl, parentEl, ghostEl, cloneEl, rootEl, nextEl, lastDownEl, scrollEl, scrollParentEl, scrollCustomFn, oldIndex, newIndex, activeGroup, putSortable, autoScrolls = [], scrolling = false, awaitingDragStarted = false, ignoreNextClick = false, sortables = [], pointerElemChangedInterval, lastPointerElemX, lastPointerElemY, tapEvt, touchEvt, moved, lastTarget, lastDirection, pastFirstInvertThresh = false, isCircumstantialInvert = false, lastMode, targetMoveDistance, forRepaintDummy, realDragElRect, R_SPACE = /\s+/g, expando = "Sortable" + new Date().getTime(), win = window, document2 = win.document, parseInt2 = win.parseInt, setTimeout2 = win.setTimeout, $2 = win.jQuery || win.Zepto, Polymer = win.Polymer, captureMode = {
          capture: false,
          passive: false
        }, IE11OrLess = !!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie|iemobile)/i), Edge = !!navigator.userAgent.match(/Edge/i), CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = "draggable" in document2.createElement("div"), supportCssPointerEvents = function() {
          if (IE11OrLess) {
            return false;
          }
          var el = document2.createElement("x");
          el.style.cssText = "pointer-events:auto";
          return el.style.pointerEvents === "auto";
        }(), _silent = false, _alignedSilent = false, abs = Math.abs, min = Math.min, savedInputChecked = [], _detectDirection = function(el, options) {
          var elCSS = _css(el), elWidth = parseInt2(elCSS.width), child1 = _getChild(el, 0, options), child2 = _getChild(el, 1, options), firstChildCSS = child1 && _css(child1), secondChildCSS = child2 && _css(child2), firstChildWidth = firstChildCSS && parseInt2(firstChildCSS.marginLeft) + parseInt2(firstChildCSS.marginRight) + _getRect(child1).width, secondChildWidth = secondChildCSS && parseInt2(secondChildCSS.marginLeft) + parseInt2(secondChildCSS.marginRight) + _getRect(child2).width;
          if (elCSS.display === "flex") {
            return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
          }
          if (child1 && firstChildCSS.float !== "none") {
            var touchingSideChild2 = firstChildCSS.float === "left" ? "left" : "right";
            return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
          }
          return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
        }, _detectNearestEmptySortable = function(x, y) {
          for (var i = 0; i < sortables.length; i++) {
            if (sortables[i].children.length)
              continue;
            var rect = _getRect(sortables[i]), threshold = sortables[i][expando].options.emptyInsertThreshold, insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
            if (insideHorizontally && insideVertically) {
              return sortables[i];
            }
          }
        }, _isClientInRowColumn = function(x, y, el, axis, options) {
          var targetRect = _getRect(el), targetS1Opp = axis === "vertical" ? targetRect.left : targetRect.top, targetS2Opp = axis === "vertical" ? targetRect.right : targetRect.bottom, mouseOnOppAxis = axis === "vertical" ? x : y;
          return targetS1Opp < mouseOnOppAxis && mouseOnOppAxis < targetS2Opp;
        }, _isElInRowColumn = function(el1, el2, axis) {
          var el1Rect = el1 === dragEl && realDragElRect || _getRect(el1), el2Rect = el2 === dragEl && realDragElRect || _getRect(el2), el1S1Opp = axis === "vertical" ? el1Rect.left : el1Rect.top, el1S2Opp = axis === "vertical" ? el1Rect.right : el1Rect.bottom, el1OppLength = axis === "vertical" ? el1Rect.width : el1Rect.height, el2S1Opp = axis === "vertical" ? el2Rect.left : el2Rect.top, el2S2Opp = axis === "vertical" ? el2Rect.right : el2Rect.bottom, el2OppLength = axis === "vertical" ? el2Rect.width : el2Rect.height;
          return el1S1Opp === el2S1Opp || el1S2Opp === el2S2Opp || el1S1Opp + el1OppLength / 2 === el2S1Opp + el2OppLength / 2;
        }, _getParentAutoScrollElement = function(el, includeSelf) {
          if (!el || !el.getBoundingClientRect)
            return win;
          var elem = el;
          var gotSelf = false;
          do {
            if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
              var elemCSS = _css(elem);
              if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
                if (!elem || !elem.getBoundingClientRect || elem === document2.body)
                  return win;
                if (gotSelf || includeSelf)
                  return elem;
                gotSelf = true;
              }
            }
          } while (elem = elem.parentNode);
          return win;
        }, _autoScroll = _throttle(function(evt, options, rootEl2, isFallback) {
          if (options.scroll) {
            var _this = rootEl2 ? rootEl2[expando] : window, sens = options.scrollSensitivity, speed = options.scrollSpeed, x = evt.clientX, y = evt.clientY, winWidth = window.innerWidth, winHeight = window.innerHeight, scrollThisInstance = false;
            if (scrollParentEl !== rootEl2) {
              _clearAutoScrolls();
              scrollEl = options.scroll;
              scrollCustomFn = options.scrollFn;
              if (scrollEl === true) {
                scrollEl = _getParentAutoScrollElement(rootEl2, true);
                scrollParentEl = scrollEl;
              }
            }
            var layersOut = 0;
            var currentParent = scrollEl;
            do {
              var el = currentParent, rect = _getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, scrollWidth, scrollHeight, css, vx, vy, canScrollX, canScrollY, scrollPosX, scrollPosY;
              if (el !== win) {
                scrollWidth = el.scrollWidth;
                scrollHeight = el.scrollHeight;
                css = _css(el);
                canScrollX = width < scrollWidth && (css.overflowX === "auto" || css.overflowX === "scroll");
                canScrollY = height < scrollHeight && (css.overflowY === "auto" || css.overflowY === "scroll");
                scrollPosX = el.scrollLeft;
                scrollPosY = el.scrollTop;
              } else {
                scrollWidth = document2.documentElement.scrollWidth;
                scrollHeight = document2.documentElement.scrollHeight;
                css = _css(document2.documentElement);
                canScrollX = width < scrollWidth && (css.overflowX === "auto" || css.overflowX === "scroll" || css.overflowX === "visible");
                canScrollY = height < scrollHeight && (css.overflowY === "auto" || css.overflowY === "scroll" || css.overflowY === "visible");
                scrollPosX = document2.documentElement.scrollLeft;
                scrollPosY = document2.documentElement.scrollTop;
              }
              vx = canScrollX && (abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (abs(left - x) <= sens && !!scrollPosX);
              vy = canScrollY && (abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (abs(top - y) <= sens && !!scrollPosY);
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
                if (el && (vx != 0 || vy != 0)) {
                  scrollThisInstance = true;
                  autoScrolls[layersOut].pid = setInterval(function() {
                    if (isFallback && this.layer === 0) {
                      Sortable.active._emulateDragOver(true);
                    }
                    var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
                    var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
                    if (typeof scrollCustomFn === "function") {
                      if (scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt, touchEvt, autoScrolls[this.layer].el) !== "continue") {
                        return;
                      }
                    }
                    if (autoScrolls[this.layer].el === win) {
                      win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
                    } else {
                      autoScrolls[this.layer].el.scrollTop += scrollOffsetY;
                      autoScrolls[this.layer].el.scrollLeft += scrollOffsetX;
                    }
                  }.bind({ layer: layersOut }), 24);
                }
              }
              layersOut++;
            } while (options.bubbleScroll && currentParent !== win && (currentParent = _getParentAutoScrollElement(currentParent, false)));
            scrolling = scrollThisInstance;
          }
        }, 30), _clearAutoScrolls = function() {
          autoScrolls.forEach(function(autoScroll) {
            clearInterval(autoScroll.pid);
          });
          autoScrolls = [];
        }, _prepareGroup = function(options) {
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
          if (!originalGroup || typeof originalGroup != "object") {
            originalGroup = { name: originalGroup };
          }
          group.name = originalGroup.name;
          group.checkPull = toFn(originalGroup.pull, true);
          group.checkPut = toFn(originalGroup.put);
          group.revertClone = originalGroup.revertClone;
          options.group = group;
        }, _checkAlignment = function(evt) {
          if (!dragEl || !dragEl.parentNode)
            return;
          dragEl.parentNode[expando] && dragEl.parentNode[expando]._computeIsAligned(evt);
        }, _isTrueParentSortable = function(el, target) {
          var trueParent = target;
          while (!trueParent[expando]) {
            trueParent = trueParent.parentNode;
          }
          return el === trueParent;
        }, _artificalBubble = function(sortable, originalEvt, method) {
          var nextParent = sortable.parentNode;
          while (nextParent && !nextParent[expando]) {
            nextParent = nextParent.parentNode;
          }
          if (nextParent) {
            nextParent[expando][method](_extend(originalEvt, {
              artificialBubble: true
            }));
          }
        }, _hideGhostForTarget = function() {
          if (!supportCssPointerEvents && ghostEl) {
            _css(ghostEl, "display", "none");
          }
        }, _unhideGhostForTarget = function() {
          if (!supportCssPointerEvents && ghostEl) {
            _css(ghostEl, "display", "");
          }
        };
        document2.addEventListener("click", function(evt) {
          if (ignoreNextClick) {
            evt.preventDefault();
            evt.stopPropagation && evt.stopPropagation();
            evt.stopImmediatePropagation && evt.stopImmediatePropagation();
            ignoreNextClick = false;
            return false;
          }
        }, true);
        var nearestEmptyInsertDetectEvent = function(evt) {
          evt = evt.touches ? evt.touches[0] : evt;
          if (dragEl) {
            var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
            if (nearest) {
              nearest[expando]._onDragOver({
                clientX: evt.clientX,
                clientY: evt.clientY,
                target: nearest,
                rootEl: nearest
              });
            }
          }
        };
        _on(document2, "dragover", nearestEmptyInsertDetectEvent);
        _on(document2, "mousemove", nearestEmptyInsertDetectEvent);
        _on(document2, "touchmove", nearestEmptyInsertDetectEvent);
        function Sortable(el, options) {
          if (!(el && el.nodeType && el.nodeType === 1)) {
            throw "Sortable: `el` must be HTMLElement, not " + {}.toString.call(el);
          }
          this.el = el;
          this.options = options = _extend({}, options);
          el[expando] = this;
          var defaults = {
            group: null,
            sort: true,
            disabled: false,
            store: null,
            handle: null,
            scroll: true,
            scrollSensitivity: 30,
            scrollSpeed: 10,
            bubbleScroll: true,
            draggable: /[uo]l/i.test(el.nodeName) ? ">li" : ">*",
            swapThreshold: 1,
            invertSwap: false,
            invertedSwapThreshold: null,
            removeCloneOnHide: true,
            direction: function() {
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
            setData: function(dataTransfer, dragEl2) {
              dataTransfer.setData("Text", dragEl2.textContent);
            },
            dropBubble: false,
            dragoverBubble: false,
            dataIdAttr: "data-id",
            delay: 0,
            touchStartThreshold: parseInt2(window.devicePixelRatio, 10) || 1,
            forceFallback: false,
            fallbackClass: "sortable-fallback",
            fallbackOnBody: false,
            fallbackTolerance: 0,
            fallbackOffset: { x: 0, y: 0 },
            supportPointer: Sortable.supportPointer !== false && ("PointerEvent" in window || window.navigator && "msPointerEnabled" in window.navigator),
            emptyInsertThreshold: 5
          };
          for (var name in defaults) {
            !(name in options) && (options[name] = defaults[name]);
          }
          _prepareGroup(options);
          for (var fn in this) {
            if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
              this[fn] = this[fn].bind(this);
            }
          }
          this.nativeDraggable = options.forceFallback ? false : supportDraggable;
          if (options.supportPointer) {
            _on(el, "pointerdown", this._onTapStart);
          } else {
            _on(el, "mousedown", this._onTapStart);
            _on(el, "touchstart", this._onTapStart);
          }
          if (this.nativeDraggable) {
            _on(el, "dragover", this);
            _on(el, "dragenter", this);
          }
          sortables.push(this.el);
          options.store && options.store.get && this.sort(options.store.get(this) || []);
        }
        Sortable.prototype = {
          constructor: Sortable,
          _computeIsAligned: function(evt) {
            var target;
            if (ghostEl && !supportCssPointerEvents) {
              _hideGhostForTarget();
              target = document2.elementFromPoint(evt.clientX, evt.clientY);
              _unhideGhostForTarget();
            } else {
              target = evt.target;
            }
            target = _closest(target, this.options.draggable, this.el, false);
            if (_alignedSilent)
              return;
            if (!dragEl || dragEl.parentNode !== this.el)
              return;
            var children = this.el.children;
            for (var i = 0; i < children.length; i++) {
              if (_closest(children[i], this.options.draggable, this.el, false) && children[i] !== target) {
                children[i].sortableMouseAligned = _isClientInRowColumn(evt.clientX, evt.clientY, children[i], this._getDirection(evt, null), this.options);
              }
            }
            if (!_closest(target, this.options.draggable, this.el, true)) {
              lastTarget = null;
            }
            _alignedSilent = true;
            setTimeout2(function() {
              _alignedSilent = false;
            }, 30);
          },
          _getDirection: function(evt, target) {
            return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
          },
          _onTapStart: function(evt) {
            if (!evt.cancelable)
              return;
            var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0], target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter, startIndex;
            _saveInputCheckedState(el);
            if (IE11OrLess && !evt.artificialBubble && !_isTrueParentSortable(el, target)) {
              return;
            }
            if (dragEl) {
              return;
            }
            if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
              return;
            }
            if (originalTarget.isContentEditable) {
              return;
            }
            target = _closest(target, options.draggable, el, false);
            if (!target) {
              if (IE11OrLess) {
                _artificalBubble(el, evt, "_onTapStart");
              }
              return;
            }
            if (lastDownEl === target) {
              return;
            }
            startIndex = _index(target, options.draggable);
            if (typeof filter === "function") {
              if (filter.call(this, evt, target, this)) {
                _dispatchEvent(_this, originalTarget, "filter", target, el, el, startIndex);
                preventOnFilter && evt.cancelable && evt.preventDefault();
                return;
              }
            } else if (filter) {
              filter = filter.split(",").some(function(criteria) {
                criteria = _closest(originalTarget, criteria.trim(), el, false);
                if (criteria) {
                  _dispatchEvent(_this, criteria, "filter", target, el, el, startIndex);
                  return true;
                }
              });
              if (filter) {
                preventOnFilter && evt.cancelable && evt.preventDefault();
                return;
              }
            }
            if (options.handle && !_closest(originalTarget, options.handle, el, false)) {
              return;
            }
            this._prepareDragStart(evt, touch, target, startIndex);
          },
          _handleAutoScroll: function(evt, fallback) {
            if (!dragEl || !this.options.scroll)
              return;
            var x = evt.clientX, y = evt.clientY, elem = document2.elementFromPoint(x, y), _this = this;
            if (fallback || Edge || IE11OrLess) {
              _autoScroll(evt, _this.options, elem, fallback);
              var ogElemScroller = _getParentAutoScrollElement(elem, true);
              if (scrolling && (!pointerElemChangedInterval || x !== lastPointerElemX || y !== lastPointerElemY)) {
                pointerElemChangedInterval && clearInterval(pointerElemChangedInterval);
                pointerElemChangedInterval = setInterval(function() {
                  if (!dragEl)
                    return;
                  var newElem = _getParentAutoScrollElement(document2.elementFromPoint(x, y), true);
                  if (newElem !== ogElemScroller) {
                    ogElemScroller = newElem;
                    _clearAutoScrolls();
                    _autoScroll(evt, _this.options, ogElemScroller, fallback);
                  }
                }, 10);
                lastPointerElemX = x;
                lastPointerElemY = y;
              }
            } else {
              if (!_this.options.bubbleScroll || _getParentAutoScrollElement(elem, true) === window) {
                _clearAutoScrolls();
                return;
              }
              _autoScroll(evt, _this.options, _getParentAutoScrollElement(elem, false), false);
            }
          },
          _prepareDragStart: function(evt, touch, target, startIndex) {
            var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
            if (target && !dragEl && target.parentNode === el) {
              rootEl = el;
              dragEl = target;
              parentEl = dragEl.parentNode;
              nextEl = dragEl.nextSibling;
              lastDownEl = target;
              activeGroup = options.group;
              oldIndex = startIndex;
              tapEvt = {
                target: dragEl,
                clientX: (touch || evt).clientX,
                clientY: (touch || evt).clientY
              };
              this._lastX = (touch || evt).clientX;
              this._lastY = (touch || evt).clientY;
              dragEl.style["will-change"] = "all";
              dragEl.style.transition = "";
              dragEl.style.transform = "";
              dragStartFn = function() {
                _this._disableDelayedDrag();
                dragEl.draggable = _this.nativeDraggable;
                _this._triggerDragStart(evt, touch);
                _dispatchEvent(_this, rootEl, "choose", dragEl, rootEl, rootEl, oldIndex);
                _toggleClass(dragEl, options.chosenClass, true);
              };
              options.ignore.split(",").forEach(function(criteria) {
                _find(dragEl, criteria.trim(), _disableDraggable);
              });
              if (options.supportPointer) {
                _on(ownerDocument, "pointerup", _this._onDrop);
              } else {
                _on(ownerDocument, "mouseup", _this._onDrop);
                _on(ownerDocument, "touchend", _this._onDrop);
                _on(ownerDocument, "touchcancel", _this._onDrop);
              }
              if (options.delay) {
                _on(ownerDocument, "mouseup", _this._disableDelayedDrag);
                _on(ownerDocument, "touchend", _this._disableDelayedDrag);
                _on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
                _on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
                _on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
                options.supportPointer && _on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
                _this._dragStartTimer = setTimeout2(dragStartFn, options.delay);
              } else {
                dragStartFn();
              }
            }
          },
          _delayedDragTouchMoveHandler: function(e) {
            var touch = e.touches ? e.touches[0] : e;
            if (min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) >= this.options.touchStartThreshold) {
              this._disableDelayedDrag();
            }
          },
          _disableDelayedDrag: function() {
            var ownerDocument = this.el.ownerDocument;
            clearTimeout(this._dragStartTimer);
            _off(ownerDocument, "mouseup", this._disableDelayedDrag);
            _off(ownerDocument, "touchend", this._disableDelayedDrag);
            _off(ownerDocument, "touchcancel", this._disableDelayedDrag);
            _off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
            _off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
            _off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
          },
          _triggerDragStart: function(evt, touch) {
            touch = touch || (evt.pointerType == "touch" ? evt : null);
            if (!this.nativeDraggable || touch) {
              if (this.options.supportPointer) {
                _on(document2, "pointermove", this._onTouchMove);
              } else if (touch) {
                _on(document2, "touchmove", this._onTouchMove);
              } else {
                _on(document2, "mousemove", this._onTouchMove);
              }
            } else {
              _on(dragEl, "dragend", this);
              _on(rootEl, "dragstart", this._onDragStart);
            }
            try {
              if (document2.selection) {
                _nextTick(function() {
                  document2.selection.empty();
                });
              } else {
                window.getSelection().removeAllRanges();
              }
            } catch (err) {
            }
          },
          _dragStarted: function(fallback) {
            awaitingDragStarted = false;
            if (rootEl && dragEl) {
              if (this.nativeDraggable) {
                _on(document2, "dragover", this._handleAutoScroll);
                _on(document2, "dragover", _checkAlignment);
              }
              var options = this.options;
              !fallback && _toggleClass(dragEl, options.dragClass, false);
              _toggleClass(dragEl, options.ghostClass, true);
              _css(dragEl, "transform", "");
              Sortable.active = this;
              fallback && this._appendGhost();
              _dispatchEvent(this, rootEl, "start", dragEl, rootEl, rootEl, oldIndex);
            } else {
              this._nulling();
            }
          },
          _emulateDragOver: function(bypassLastTouchCheck) {
            if (touchEvt) {
              if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY && !bypassLastTouchCheck) {
                return;
              }
              this._lastX = touchEvt.clientX;
              this._lastY = touchEvt.clientY;
              _hideGhostForTarget();
              var target = document2.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
              var parent = target;
              while (target && target.shadowRoot) {
                target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
                parent = target;
              }
              if (parent) {
                do {
                  if (parent[expando]) {
                    var inserted;
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
              dragEl.parentNode[expando]._computeIsAligned(touchEvt);
              _unhideGhostForTarget();
            }
          },
          _onTouchMove: function(evt) {
            if (tapEvt) {
              var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, matrix = ghostEl && _matrix(ghostEl), scaleX = ghostEl && matrix && matrix.a, scaleY = ghostEl && matrix && matrix.d, dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX ? scaleX : 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY ? scaleY : 1), translate3d = evt.touches ? "translate3d(" + dx + "px," + dy + "px,0)" : "translate(" + dx + "px," + dy + "px)";
              if (!Sortable.active && !awaitingDragStarted) {
                if (fallbackTolerance && min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance) {
                  return;
                }
                this._onDragStart(evt, true);
              }
              this._handleAutoScroll(touch, true);
              moved = true;
              touchEvt = touch;
              _css(ghostEl, "webkitTransform", translate3d);
              _css(ghostEl, "mozTransform", translate3d);
              _css(ghostEl, "msTransform", translate3d);
              _css(ghostEl, "transform", translate3d);
              evt.cancelable && evt.preventDefault();
            }
          },
          _appendGhost: function() {
            if (!ghostEl) {
              var rect = _getRect(dragEl, this.options.fallbackOnBody ? document2.body : rootEl, true), css = _css(dragEl), options = this.options;
              ghostEl = dragEl.cloneNode(true);
              _toggleClass(ghostEl, options.ghostClass, false);
              _toggleClass(ghostEl, options.fallbackClass, true);
              _toggleClass(ghostEl, options.dragClass, true);
              _css(ghostEl, "box-sizing", "border-box");
              _css(ghostEl, "margin", 0);
              _css(ghostEl, "top", rect.top);
              _css(ghostEl, "left", rect.left);
              _css(ghostEl, "width", rect.width);
              _css(ghostEl, "height", rect.height);
              _css(ghostEl, "opacity", "0.8");
              _css(ghostEl, "position", "fixed");
              _css(ghostEl, "zIndex", "100000");
              _css(ghostEl, "pointerEvents", "none");
              options.fallbackOnBody && document2.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);
            }
          },
          _onDragStart: function(evt, fallback) {
            var _this = this;
            var dataTransfer = evt.dataTransfer;
            var options = _this.options;
            cloneEl = _clone(dragEl);
            cloneEl.draggable = false;
            cloneEl.style["will-change"] = "";
            this._hideClone();
            _toggleClass(cloneEl, _this.options.chosenClass, false);
            _this._cloneId = _nextTick(function() {
              if (!_this.options.removeCloneOnHide) {
                rootEl.insertBefore(cloneEl, dragEl);
              }
              _dispatchEvent(_this, rootEl, "clone", dragEl);
            });
            !fallback && _toggleClass(dragEl, options.dragClass, true);
            if (fallback) {
              ignoreNextClick = true;
              _this._loopId = setInterval(_this._emulateDragOver, 50);
            } else {
              _off(document2, "mouseup", _this._onDrop);
              _off(document2, "touchend", _this._onDrop);
              _off(document2, "touchcancel", _this._onDrop);
              if (dataTransfer) {
                dataTransfer.effectAllowed = "move";
                options.setData && options.setData.call(_this, dataTransfer, dragEl);
              }
              _on(document2, "drop", _this);
              _css(dragEl, "transform", "translateZ(0)");
            }
            awaitingDragStarted = true;
            _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback));
            _on(document2, "selectstart", _this);
          },
          _onDragOver: function(evt) {
            var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, _this = this;
            if (_silent)
              return;
            if (IE11OrLess && !evt.rootEl && !evt.artificialBubble && !_isTrueParentSortable(el, target)) {
              return;
            }
            function completed() {
              if (activeSortable) {
                _toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
                _toggleClass(dragEl, options.ghostClass, true);
              }
              if (putSortable !== _this && _this !== Sortable.active) {
                putSortable = _this;
              } else if (_this === Sortable.active) {
                putSortable = null;
              }
              if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
                lastTarget = null;
              }
              if (!options.dragoverBubble && !evt.rootEl && target !== document2) {
                _this._handleAutoScroll(evt);
                dragEl.parentNode[expando]._computeIsAligned(evt);
              }
              !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
              return true;
            }
            function changed() {
              _dispatchEvent(_this, rootEl, "change", target, el, rootEl, oldIndex, _index(dragEl, options.draggable), evt);
            }
            if (evt.preventDefault !== void 0) {
              evt.cancelable && evt.preventDefault();
            }
            moved = true;
            target = _closest(target, options.draggable, el, true);
            if (!!_closest(evt.target, null, dragEl, true) || target.animated) {
              return completed();
            }
            if (target !== dragEl) {
              ignoreNextClick = false;
            }
            if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
              var axis = this._getDirection(evt, target);
              dragRect = _getRect(dragEl);
              if (revert) {
                this._hideClone();
                parentEl = rootEl;
                if (nextEl) {
                  rootEl.insertBefore(dragEl, nextEl);
                } else {
                  rootEl.appendChild(dragEl);
                }
                return completed();
              }
              if (el.children.length === 0 || el.children[0] === ghostEl || _ghostIsLast(evt, axis, el) && !dragEl.animated) {
                if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
                  target = _lastChild(el);
                }
                if (target) {
                  targetRect = _getRect(target);
                }
                if (isOwner) {
                  activeSortable._hideClone();
                } else {
                  activeSortable._showClone(this);
                }
                if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
                  el.appendChild(dragEl);
                  parentEl = el;
                  realDragElRect = null;
                  changed();
                  this._animate(dragRect, dragEl);
                  target && this._animate(targetRect, target);
                  return completed();
                }
              } else if (target && target !== dragEl && target.parentNode === el) {
                var direction = 0, targetBeforeFirstSwap, aligned = target.sortableMouseAligned, differentLevel = dragEl.parentNode !== el, scrolledPastTop = _isScrolledPast(target, axis === "vertical" ? "top" : "left");
                if (lastTarget !== target) {
                  lastMode = null;
                  targetBeforeFirstSwap = _getRect(target)[axis === "vertical" ? "top" : "left"];
                  pastFirstInvertThresh = false;
                }
                if (_isElInRowColumn(dragEl, target, axis) && aligned || differentLevel || scrolledPastTop || options.invertSwap || lastMode === "insert" || lastMode === "swap") {
                  if (lastMode !== "swap") {
                    isCircumstantialInvert = options.invertSwap || differentLevel || scrolling || scrolledPastTop;
                  }
                  direction = _getSwapDirection(evt, target, axis, options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
                  lastMode = "swap";
                } else {
                  direction = _getInsertDirection(target, options);
                  lastMode = "insert";
                }
                if (direction === 0)
                  return completed();
                realDragElRect = null;
                lastTarget = target;
                lastDirection = direction;
                targetRect = _getRect(target);
                var nextSibling = target.nextElementSibling, after = false;
                after = direction === 1;
                var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
                if (moveVector !== false) {
                  if (moveVector === 1 || moveVector === -1) {
                    after = moveVector === 1;
                  }
                  _silent = true;
                  setTimeout2(_unsilent, 30);
                  if (isOwner) {
                    activeSortable._hideClone();
                  } else {
                    activeSortable._showClone(this);
                  }
                  if (after && !nextSibling) {
                    el.appendChild(dragEl);
                  } else {
                    target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
                  }
                  parentEl = dragEl.parentNode;
                  if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
                    targetMoveDistance = abs(targetBeforeFirstSwap - _getRect(target)[axis === "vertical" ? "top" : "left"]);
                  }
                  changed();
                  !differentLevel && this._animate(targetRect, target);
                  this._animate(dragRect, dragEl);
                  return completed();
                }
              }
              if (el.contains(dragEl)) {
                return completed();
              }
            }
            if (IE11OrLess && !evt.rootEl) {
              _artificalBubble(el, evt, "_onDragOver");
            }
            return false;
          },
          _animate: function(prevRect, target) {
            var ms = this.options.animation;
            if (ms) {
              var currentRect = _getRect(target);
              if (target === dragEl) {
                realDragElRect = currentRect;
              }
              if (prevRect.nodeType === 1) {
                prevRect = _getRect(prevRect);
              }
              if (prevRect.left + prevRect.width / 2 !== currentRect.left + currentRect.width / 2 || prevRect.top + prevRect.height / 2 !== currentRect.top + currentRect.height / 2) {
                var matrix = _matrix(this.el), scaleX = matrix && matrix.a, scaleY = matrix && matrix.d;
                _css(target, "transition", "none");
                _css(target, "transform", "translate3d(" + (prevRect.left - currentRect.left) / (scaleX ? scaleX : 1) + "px," + (prevRect.top - currentRect.top) / (scaleY ? scaleY : 1) + "px,0)");
                forRepaintDummy = target.offsetWidth;
                _css(target, "transition", "transform " + ms + "ms" + (this.options.easing ? " " + this.options.easing : ""));
                _css(target, "transform", "translate3d(0,0,0)");
              }
              typeof target.animated === "number" && clearTimeout(target.animated);
              target.animated = setTimeout2(function() {
                _css(target, "transition", "");
                _css(target, "transform", "");
                target.animated = false;
              }, ms);
            }
          },
          _offUpEvents: function() {
            var ownerDocument = this.el.ownerDocument;
            _off(document2, "touchmove", this._onTouchMove);
            _off(document2, "pointermove", this._onTouchMove);
            _off(ownerDocument, "mouseup", this._onDrop);
            _off(ownerDocument, "touchend", this._onDrop);
            _off(ownerDocument, "pointerup", this._onDrop);
            _off(ownerDocument, "touchcancel", this._onDrop);
            _off(document2, "selectstart", this);
          },
          _onDrop: function(evt) {
            var el = this.el, options = this.options;
            awaitingDragStarted = false;
            scrolling = false;
            isCircumstantialInvert = false;
            pastFirstInvertThresh = false;
            clearInterval(this._loopId);
            clearInterval(pointerElemChangedInterval);
            _clearAutoScrolls();
            _cancelThrottle();
            clearTimeout(this._dragStartTimer);
            _cancelNextTick(this._cloneId);
            _cancelNextTick(this._dragStartId);
            _off(document2, "mousemove", this._onTouchMove);
            if (this.nativeDraggable) {
              _off(document2, "drop", this);
              _off(el, "dragstart", this._onDragStart);
              _off(document2, "dragover", this._handleAutoScroll);
              _off(document2, "dragover", _checkAlignment);
            }
            this._offUpEvents();
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
                  _off(dragEl, "dragend", this);
                }
                _disableDraggable(dragEl);
                dragEl.style["will-change"] = "";
                _toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
                _toggleClass(dragEl, this.options.chosenClass, false);
                _dispatchEvent(this, rootEl, "unchoose", dragEl, parentEl, rootEl, oldIndex, null, evt);
                if (rootEl !== parentEl) {
                  newIndex = _index(dragEl, options.draggable);
                  if (newIndex >= 0) {
                    _dispatchEvent(null, parentEl, "add", dragEl, parentEl, rootEl, oldIndex, newIndex, evt);
                    _dispatchEvent(this, rootEl, "remove", dragEl, parentEl, rootEl, oldIndex, newIndex, evt);
                    _dispatchEvent(null, parentEl, "sort", dragEl, parentEl, rootEl, oldIndex, newIndex, evt);
                    _dispatchEvent(this, rootEl, "sort", dragEl, parentEl, rootEl, oldIndex, newIndex, evt);
                  }
                  putSortable && putSortable.save();
                } else {
                  if (dragEl.nextSibling !== nextEl) {
                    newIndex = _index(dragEl, options.draggable);
                    if (newIndex >= 0) {
                      _dispatchEvent(this, rootEl, "update", dragEl, parentEl, rootEl, oldIndex, newIndex, evt);
                      _dispatchEvent(this, rootEl, "sort", dragEl, parentEl, rootEl, oldIndex, newIndex, evt);
                    }
                  }
                }
                if (Sortable.active) {
                  if (newIndex == null || newIndex === -1) {
                    newIndex = oldIndex;
                  }
                  _dispatchEvent(this, rootEl, "end", dragEl, parentEl, rootEl, oldIndex, newIndex, evt);
                  this.save();
                }
              }
            }
            this._nulling();
          },
          _nulling: function() {
            rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = scrollEl = scrollParentEl = autoScrolls.length = pointerElemChangedInterval = lastPointerElemX = lastPointerElemY = tapEvt = touchEvt = moved = newIndex = oldIndex = lastTarget = lastDirection = forRepaintDummy = realDragElRect = putSortable = activeGroup = Sortable.active = null;
            savedInputChecked.forEach(function(el) {
              el.checked = true;
            });
            savedInputChecked.length = 0;
          },
          handleEvent: function(evt) {
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
          toArray: function() {
            var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
            for (; i < n; i++) {
              el = children[i];
              if (_closest(el, options.draggable, this.el, false)) {
                order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
              }
            }
            return order;
          },
          sort: function(order) {
            var items = {}, rootEl2 = this.el;
            this.toArray().forEach(function(id, i) {
              var el = rootEl2.children[i];
              if (_closest(el, this.options.draggable, rootEl2, false)) {
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
          save: function() {
            var store = this.options.store;
            store && store.set && store.set(this);
          },
          closest: function(el, selector) {
            return _closest(el, selector || this.options.draggable, this.el, false);
          },
          option: function(name, value) {
            var options = this.options;
            if (value === void 0) {
              return options[name];
            } else {
              options[name] = value;
              if (name === "group") {
                _prepareGroup(options);
              }
            }
          },
          destroy: function() {
            var el = this.el;
            el[expando] = null;
            _off(el, "mousedown", this._onTapStart);
            _off(el, "touchstart", this._onTapStart);
            _off(el, "pointerdown", this._onTapStart);
            if (this.nativeDraggable) {
              _off(el, "dragover", this);
              _off(el, "dragenter", this);
            }
            Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
              el2.removeAttribute("draggable");
            });
            this._onDrop();
            sortables.splice(sortables.indexOf(this.el), 1);
            this.el = el = null;
          },
          _hideClone: function() {
            if (!cloneEl.cloneHidden) {
              _css(cloneEl, "display", "none");
              cloneEl.cloneHidden = true;
              if (cloneEl.parentNode && this.options.removeCloneOnHide) {
                cloneEl.parentNode.removeChild(cloneEl);
              }
            }
          },
          _showClone: function(putSortable2) {
            if (putSortable2.lastPutMode !== "clone") {
              this._hideClone();
              return;
            }
            if (cloneEl.cloneHidden) {
              if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
                rootEl.insertBefore(cloneEl, dragEl);
              } else if (nextEl) {
                rootEl.insertBefore(cloneEl, nextEl);
              } else {
                rootEl.appendChild(cloneEl);
              }
              if (this.options.group.revertClone) {
                this._animate(dragEl, cloneEl);
              }
              _css(cloneEl, "display", "");
              cloneEl.cloneHidden = false;
            }
          }
        };
        function _closest(el, selector, ctx, includeCTX) {
          if (el) {
            ctx = ctx || document2;
            do {
              if (selector != null && (selector[0] === ">" && el.parentNode === ctx && _matches(el, selector.substring(1)) || _matches(el, selector)) || includeCTX && el === ctx) {
                return el;
              }
              if (el === ctx)
                break;
            } while (el = _getParentOrHost(el));
          }
          return null;
        }
        function _getParentOrHost(el) {
          return el.host && el !== document2 && el.host.nodeType ? el.host : el.parentNode;
        }
        function _globalDragOver(evt) {
          if (evt.dataTransfer) {
            evt.dataTransfer.dropEffect = "move";
          }
          evt.cancelable && evt.preventDefault();
        }
        function _on(el, event, fn) {
          el.addEventListener(event, fn, captureMode);
        }
        function _off(el, event, fn) {
          el.removeEventListener(event, fn, captureMode);
        }
        function _toggleClass(el, name, state) {
          if (el && name) {
            if (el.classList) {
              el.classList[state ? "add" : "remove"](name);
            } else {
              var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
              el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
            }
          }
        }
        function _css(el, prop, val) {
          var style = el && el.style;
          if (style) {
            if (val === void 0) {
              if (document2.defaultView && document2.defaultView.getComputedStyle) {
                val = document2.defaultView.getComputedStyle(el, "");
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
        function _matrix(el) {
          var appliedTransforms = "";
          do {
            var transform = _css(el, "transform");
            if (transform && transform !== "none") {
              appliedTransforms = transform + " " + appliedTransforms;
            }
          } while (el = el.parentNode);
          if (window.DOMMatrix) {
            return new DOMMatrix(appliedTransforms);
          } else if (window.WebKitCSSMatrix) {
            return new WebKitCSSMatrix(appliedTransforms);
          } else if (window.CSSMatrix) {
            return new CSSMatrix(appliedTransforms);
          }
        }
        function _find(ctx, tagName, iterator) {
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
        function _dispatchEvent(sortable, rootEl2, name, targetEl, toEl, fromEl, startIndex, newIndex2, originalEvt) {
          sortable = sortable || rootEl2[expando];
          var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
          if (window.CustomEvent && !IE11OrLess && !Edge) {
            evt = new CustomEvent(name, {
              bubbles: true,
              cancelable: true
            });
          } else {
            evt = document2.createEvent("Event");
            evt.initEvent(name, true, true);
          }
          evt.to = toEl || rootEl2;
          evt.from = fromEl || rootEl2;
          evt.item = targetEl || rootEl2;
          evt.clone = cloneEl;
          evt.oldIndex = startIndex;
          evt.newIndex = newIndex2;
          evt.originalEvent = originalEvt;
          if (rootEl2) {
            rootEl2.dispatchEvent(evt);
          }
          if (options[onName]) {
            options[onName].call(sortable, evt);
          }
        }
        function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
          var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
          if (window.CustomEvent && !IE11OrLess && !Edge) {
            evt = new CustomEvent("move", {
              bubbles: true,
              cancelable: true
            });
          } else {
            evt = document2.createEvent("Event");
            evt.initEvent("move", true, true);
          }
          evt.to = toEl;
          evt.from = fromEl;
          evt.dragged = dragEl2;
          evt.draggedRect = dragRect;
          evt.related = targetEl || toEl;
          evt.relatedRect = targetRect || _getRect(toEl);
          evt.willInsertAfter = willInsertAfter;
          evt.originalEvent = originalEvt;
          fromEl.dispatchEvent(evt);
          if (onMoveFn) {
            retVal = onMoveFn.call(sortable, evt, originalEvt);
          }
          return retVal;
        }
        function _disableDraggable(el) {
          el.draggable = false;
        }
        function _unsilent() {
          _silent = false;
        }
        function _getChild(el, childNum, options) {
          var currentChild = 0, i = 0, children = el.children;
          while (i < children.length) {
            if (children[i].style.display !== "none" && children[i] !== ghostEl && children[i] !== dragEl && _closest(children[i], options.draggable, el, false)) {
              if (currentChild === childNum) {
                return children[i];
              }
              currentChild++;
            }
            i++;
          }
          return null;
        }
        function _lastChild(el) {
          var last = el.lastElementChild;
          while (last === ghostEl || last.style.display === "none") {
            last = last.previousElementSibling;
            if (!last)
              break;
          }
          return last || null;
        }
        function _ghostIsLast(evt, axis, el) {
          var elRect = _getRect(_lastChild(el)), mouseOnAxis = axis === "vertical" ? evt.clientY : evt.clientX, mouseOnOppAxis = axis === "vertical" ? evt.clientX : evt.clientY, targetS2 = axis === "vertical" ? elRect.bottom : elRect.right, targetS1Opp = axis === "vertical" ? elRect.left : elRect.top, targetS2Opp = axis === "vertical" ? elRect.right : elRect.bottom, spacer = 10;
          return axis === "vertical" ? mouseOnOppAxis > targetS2Opp + spacer || mouseOnOppAxis <= targetS2Opp && mouseOnAxis > targetS2 && mouseOnOppAxis >= targetS1Opp : mouseOnAxis > targetS2 && mouseOnOppAxis > targetS1Opp || mouseOnAxis <= targetS2 && mouseOnOppAxis > targetS2Opp + spacer;
        }
        function _getSwapDirection(evt, target, axis, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
          var targetRect = _getRect(target), mouseOnAxis = axis === "vertical" ? evt.clientY : evt.clientX, targetLength = axis === "vertical" ? targetRect.height : targetRect.width, targetS1 = axis === "vertical" ? targetRect.top : targetRect.left, targetS2 = axis === "vertical" ? targetRect.bottom : targetRect.right, dragRect = _getRect(dragEl), invert = false;
          if (!invertSwap) {
            if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
              if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
                pastFirstInvertThresh = true;
              }
              if (!pastFirstInvertThresh) {
                var dragS1 = axis === "vertical" ? dragRect.top : dragRect.left, dragS2 = axis === "vertical" ? dragRect.bottom : dragRect.right;
                if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
                  return lastDirection * -1;
                }
              } else {
                invert = true;
              }
            } else {
              if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
                return mouseOnAxis > targetS1 + targetLength / 2 ? -1 : 1;
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
        function _getInsertDirection(target, options) {
          var dragElIndex = _index(dragEl, options.draggable), targetIndex = _index(target, options.draggable);
          if (dragElIndex < targetIndex) {
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
        function _index(el, selector) {
          var index = 0;
          if (!el || !el.parentNode) {
            return -1;
          }
          while (el && (el = el.previousElementSibling)) {
            if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== cloneEl) {
              index++;
            }
          }
          return index;
        }
        function _matches(el, selector) {
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
        var _throttleTimeout;
        function _throttle(callback, ms) {
          return function() {
            if (!_throttleTimeout) {
              var args = arguments, _this = this;
              _throttleTimeout = setTimeout2(function() {
                if (args.length === 1) {
                  callback.call(_this, args[0]);
                } else {
                  callback.apply(_this, args);
                }
                _throttleTimeout = void 0;
              }, ms);
            }
          };
        }
        function _cancelThrottle() {
          clearTimeout(_throttleTimeout);
          _throttleTimeout = void 0;
        }
        function _extend(dst, src) {
          if (dst && src) {
            for (var key in src) {
              if (src.hasOwnProperty(key)) {
                dst[key] = src[key];
              }
            }
          }
          return dst;
        }
        function _clone(el) {
          if (Polymer && Polymer.dom) {
            return Polymer.dom(el).cloneNode(true);
          } else if ($2) {
            return $2(el).clone(true)[0];
          } else {
            return el.cloneNode(true);
          }
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
          return setTimeout2(fn, 0);
        }
        function _cancelNextTick(id) {
          return clearTimeout(id);
        }
        function _getRect(el, container, adjustForTransform) {
          if (!el.getBoundingClientRect && el !== win)
            return;
          var elRect, top, left, bottom, right, height, width;
          if (el !== win) {
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
          if (adjustForTransform && el !== win) {
            container = container || el.parentNode;
            if (!IE11OrLess) {
              do {
                if (container && container.getBoundingClientRect && _css(container, "transform") !== "none") {
                  var containerRect = container.getBoundingClientRect();
                  top -= containerRect.top + parseInt2(_css(container, "border-top-width"));
                  left -= containerRect.left + parseInt2(_css(container, "border-left-width"));
                  bottom = top + elRect.height;
                  right = left + elRect.width;
                  break;
                }
              } while (container = container.parentNode);
            }
            var matrix = _matrix(el), scaleX = matrix && matrix.a, scaleY = matrix && matrix.d;
            if (matrix) {
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
        function _isScrolledPast(el, side) {
          var parent = _getParentAutoScrollElement(parent, true), elSide = _getRect(el)[side];
          while (parent) {
            var parentSide = _getRect(parent)[side], visible;
            if (side === "top" || side === "left") {
              visible = elSide >= parentSide;
            } else {
              visible = elSide <= parentSide;
            }
            if (!visible)
              return true;
            if (parent === win)
              break;
            parent = _getParentAutoScrollElement(parent, false);
          }
          return false;
        }
        _on(document2, "touchmove", function(evt) {
          if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
            evt.preventDefault();
          }
        });
        Sortable.utils = {
          on: _on,
          off: _off,
          css: _css,
          find: _find,
          is: function(el, selector) {
            return !!_closest(el, selector, el, false);
          },
          extend: _extend,
          throttle: _throttle,
          closest: _closest,
          toggleClass: _toggleClass,
          clone: _clone,
          index: _index,
          nextTick: _nextTick,
          cancelNextTick: _cancelNextTick,
          detectDirection: _detectDirection,
          getChild: _getChild
        };
        Sortable.create = function(el, options) {
          return new Sortable(el, options);
        };
        Sortable.version = "1.8.3";
        return Sortable;
      });
    }
  });

  // node_modules/frappe-datatable/dist/frappe-datatable.cjs.js
  var require_frappe_datatable_cjs = __commonJS({
    "node_modules/frappe-datatable/dist/frappe-datatable.cjs.js"(exports, module) {
      "use strict";
      function _interopDefault(ex) {
        return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
      }
      var Sortable = _interopDefault(require_Sortable());
      function $2(expr, con) {
        return typeof expr === "string" ? (con || document).querySelector(expr) : expr || null;
      }
      $2.each = (expr, con) => {
        return typeof expr === "string" ? Array.from((con || document).querySelectorAll(expr)) : expr || null;
      };
      $2.create = (tag, o) => {
        let element = document.createElement(tag);
        for (let i in o) {
          let val = o[i];
          if (i === "inside") {
            $2(val).appendChild(element);
          } else if (i === "around") {
            let ref = $2(val);
            ref.parentNode.insertBefore(element, ref);
            element.appendChild(ref);
          } else if (i === "styles") {
            if (typeof val === "object") {
              Object.keys(val).map((prop) => {
                element.style[prop] = val[prop];
              });
            }
          } else if (i in element) {
            element[i] = val;
          } else {
            element.setAttribute(i, val);
          }
        }
        return element;
      };
      $2.on = (element, event, selector, callback) => {
        if (!callback) {
          callback = selector;
          $2.bind(element, event, callback);
        } else {
          $2.delegate(element, event, selector, callback);
        }
      };
      $2.off = (element, event, handler) => {
        element.removeEventListener(event, handler);
      };
      $2.bind = (element, event, callback) => {
        event.split(/\s+/).forEach(function(event2) {
          element.addEventListener(event2, callback);
        });
      };
      $2.delegate = (element, event, selector, callback) => {
        element.addEventListener(event, function(e) {
          const delegatedTarget = e.target.closest(selector);
          if (delegatedTarget) {
            e.delegatedTarget = delegatedTarget;
            callback.call(this, e, delegatedTarget);
          }
        });
      };
      $2.unbind = (element, o) => {
        if (element) {
          for (let event in o) {
            let callback = o[event];
            event.split(/\s+/).forEach(function(event2) {
              element.removeEventListener(event2, callback);
            });
          }
        }
      };
      $2.fire = (target, type, properties) => {
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent(type, true, true);
        for (let j in properties) {
          evt[j] = properties[j];
        }
        return target.dispatchEvent(evt);
      };
      $2.data = (element, attrs) => {
        if (!attrs) {
          return element.dataset;
        }
        for (const attr in attrs) {
          element.dataset[attr] = attrs[attr];
        }
      };
      $2.style = (elements, styleMap) => {
        if (typeof styleMap === "string") {
          return $2.getStyle(elements, styleMap);
        }
        if (!Array.isArray(elements)) {
          elements = [elements];
        }
        elements.map((element) => {
          for (const prop in styleMap) {
            element.style[prop] = styleMap[prop];
          }
        });
      };
      $2.removeStyle = (elements, styleProps) => {
        if (!Array.isArray(elements)) {
          elements = [elements];
        }
        if (!Array.isArray(styleProps)) {
          styleProps = [styleProps];
        }
        elements.map((element) => {
          for (const prop of styleProps) {
            element.style[prop] = "";
          }
        });
      };
      $2.getStyle = (element, prop) => {
        if (!prop) {
          return getComputedStyle(element);
        }
        let val = getComputedStyle(element)[prop];
        if (["width", "height"].includes(prop)) {
          val = parseFloat(val);
        }
        return val;
      };
      $2.closest = (selector, element) => {
        if (!element)
          return null;
        if (element.matches(selector)) {
          return element;
        }
        return $2.closest(selector, element.parentNode);
      };
      $2.inViewport = (el, parentEl) => {
        const {
          top,
          left,
          bottom,
          right
        } = el.getBoundingClientRect();
        const {
          top: pTop,
          left: pLeft,
          bottom: pBottom,
          right: pRight
        } = parentEl.getBoundingClientRect();
        return top >= pTop && left >= pLeft && bottom <= pBottom && right <= pRight;
      };
      $2.scrollTop = function scrollTop(element, pixels) {
        requestAnimationFrame(() => {
          element.scrollTop = pixels;
        });
      };
      $2.scrollbarSize = function scrollbarSize() {
        if (!$2.scrollBarSizeValue) {
          $2.scrollBarSizeValue = getScrollBarSize();
        }
        return $2.scrollBarSizeValue;
      };
      function getScrollBarSize() {
        const scrollDiv = document.createElement("div");
        $2.style(scrollDiv, {
          width: "100px",
          height: "100px",
          overflow: "scroll",
          position: "absolute",
          top: "-9999px"
        });
        document.body.appendChild(scrollDiv);
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }
      $2.hasVerticalOverflow = function(element) {
        return element.scrollHeight > element.offsetHeight + 10;
      };
      $2.hasHorizontalOverflow = function(element) {
        return element.scrollWidth > element.offsetWidth + 10;
      };
      $2.measureTextWidth = function(text) {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.visibility = "hidden";
        div.style.height = "auto";
        div.style.width = "auto";
        div.style.whiteSpace = "nowrap";
        div.innerText = text;
        document.body.appendChild(div);
        return div.clientWidth + 1;
      };
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      var isObject_1 = isObject;
      var commonjsGlobal = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
      function commonjsRequire() {
        throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs");
      }
      function unwrapExports(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
      }
      function createCommonjsModule(fn, module2) {
        return module2 = { exports: {} }, fn(module2, module2.exports), module2.exports;
      }
      var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
      var _freeGlobal = freeGlobal;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = _freeGlobal || freeSelf || Function("return this")();
      var _root = root;
      var now = function() {
        return _root.Date.now();
      };
      var now_1 = now;
      var Symbol = _root.Symbol;
      var _Symbol = Symbol;
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = _Symbol ? _Symbol.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      var _getRawTag = getRawTag;
      var objectProto$1 = Object.prototype;
      var nativeObjectToString$1 = objectProto$1.toString;
      function objectToString(value) {
        return nativeObjectToString$1.call(value);
      }
      var _objectToString = objectToString;
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
      }
      var _baseGetTag = baseGetTag;
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var isObjectLike_1 = isObjectLike;
      var symbolTag = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike_1(value) && _baseGetTag(value) == symbolTag;
      }
      var isSymbol_1 = isSymbol;
      var NAN = 0 / 0;
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol_1(value)) {
          return NAN;
        }
        if (isObject_1(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject_1(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      var toNumber_1 = toNumber;
      var FUNC_ERROR_TEXT = "Expected a function";
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber_1(wait) || 0;
        if (isObject_1(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now_1();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result : trailingEdge(now_1());
        }
        function debounced() {
          var time = now_1(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      var debounce_1 = debounce;
      var FUNC_ERROR_TEXT$1 = "Expected a function";
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT$1);
        }
        if (isObject_1(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce_1(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      var throttle_1 = throttle;
      var asyncTag = "[object AsyncFunction]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var proxyTag = "[object Proxy]";
      function isFunction(value) {
        if (!isObject_1(value)) {
          return false;
        }
        var tag = _baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      var isFunction_1 = isFunction;
      var coreJsData = _root["__core-js_shared__"];
      var _coreJsData = coreJsData;
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var _isMasked = isMasked;
      var funcProto = Function.prototype;
      var funcToString = funcProto.toString;
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      var _toSource = toSource;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var funcProto$1 = Function.prototype;
      var objectProto$2 = Object.prototype;
      var funcToString$1 = funcProto$1.toString;
      var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
      var reIsNative = RegExp("^" + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      function baseIsNative(value) {
        if (!isObject_1(value) || _isMasked(value)) {
          return false;
        }
        var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
        return pattern.test(_toSource(value));
      }
      var _baseIsNative = baseIsNative;
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      var _getValue = getValue;
      function getNative(object, key) {
        var value = _getValue(object, key);
        return _baseIsNative(value) ? value : void 0;
      }
      var _getNative = getNative;
      var nativeCreate = _getNative(Object, "create");
      var _nativeCreate = nativeCreate;
      function hashClear() {
        this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
        this.size = 0;
      }
      var _hashClear = hashClear;
      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
      var _hashDelete = hashDelete;
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var objectProto$3 = Object.prototype;
      var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
      function hashGet(key) {
        var data = this.__data__;
        if (_nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty$2.call(data, key) ? data[key] : void 0;
      }
      var _hashGet = hashGet;
      var objectProto$4 = Object.prototype;
      var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
      function hashHas(key) {
        var data = this.__data__;
        return _nativeCreate ? data[key] !== void 0 : hasOwnProperty$3.call(data, key);
      }
      var _hashHas = hashHas;
      var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = _nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
        return this;
      }
      var _hashSet = hashSet;
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      Hash.prototype.clear = _hashClear;
      Hash.prototype["delete"] = _hashDelete;
      Hash.prototype.get = _hashGet;
      Hash.prototype.has = _hashHas;
      Hash.prototype.set = _hashSet;
      var _Hash = Hash;
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      var _listCacheClear = listCacheClear;
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var eq_1 = eq;
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq_1(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      var _assocIndexOf = assocIndexOf;
      var arrayProto = Array.prototype;
      var splice = arrayProto.splice;
      function listCacheDelete(key) {
        var data = this.__data__, index = _assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      var _listCacheDelete = listCacheDelete;
      function listCacheGet(key) {
        var data = this.__data__, index = _assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      var _listCacheGet = listCacheGet;
      function listCacheHas(key) {
        return _assocIndexOf(this.__data__, key) > -1;
      }
      var _listCacheHas = listCacheHas;
      function listCacheSet(key, value) {
        var data = this.__data__, index = _assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      var _listCacheSet = listCacheSet;
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      ListCache.prototype.clear = _listCacheClear;
      ListCache.prototype["delete"] = _listCacheDelete;
      ListCache.prototype.get = _listCacheGet;
      ListCache.prototype.has = _listCacheHas;
      ListCache.prototype.set = _listCacheSet;
      var _ListCache = ListCache;
      var Map = _getNative(_root, "Map");
      var _Map = Map;
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new _Hash(),
          "map": new (_Map || _ListCache)(),
          "string": new _Hash()
        };
      }
      var _mapCacheClear = mapCacheClear;
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      var _isKeyable = isKeyable;
      function getMapData(map, key) {
        var data = map.__data__;
        return _isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      var _getMapData = getMapData;
      function mapCacheDelete(key) {
        var result = _getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
      }
      var _mapCacheDelete = mapCacheDelete;
      function mapCacheGet(key) {
        return _getMapData(this, key).get(key);
      }
      var _mapCacheGet = mapCacheGet;
      function mapCacheHas(key) {
        return _getMapData(this, key).has(key);
      }
      var _mapCacheHas = mapCacheHas;
      function mapCacheSet(key, value) {
        var data = _getMapData(this, key), size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
      }
      var _mapCacheSet = mapCacheSet;
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      MapCache.prototype.clear = _mapCacheClear;
      MapCache.prototype["delete"] = _mapCacheDelete;
      MapCache.prototype.get = _mapCacheGet;
      MapCache.prototype.has = _mapCacheHas;
      MapCache.prototype.set = _mapCacheSet;
      var _MapCache = MapCache;
      var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED$2);
        return this;
      }
      var _setCacheAdd = setCacheAdd;
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      var _setCacheHas = setCacheHas;
      function SetCache(values) {
        var index = -1, length = values == null ? 0 : values.length;
        this.__data__ = new _MapCache();
        while (++index < length) {
          this.add(values[index]);
        }
      }
      SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
      SetCache.prototype.has = _setCacheHas;
      var _SetCache = SetCache;
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      var _baseFindIndex = baseFindIndex;
      function baseIsNaN(value) {
        return value !== value;
      }
      var _baseIsNaN = baseIsNaN;
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      var _strictIndexOf = strictIndexOf;
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? _strictIndexOf(array, value, fromIndex) : _baseFindIndex(array, _baseIsNaN, fromIndex);
      }
      var _baseIndexOf = baseIndexOf;
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && _baseIndexOf(array, value, 0) > -1;
      }
      var _arrayIncludes = arrayIncludes;
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      var _arrayIncludesWith = arrayIncludesWith;
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      var _cacheHas = cacheHas;
      var Set = _getNative(_root, "Set");
      var _Set = Set;
      function noop() {
      }
      var noop_1 = noop;
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      var _setToArray = setToArray;
      var INFINITY = 1 / 0;
      var createSet = !(_Set && 1 / _setToArray(new _Set([, -0]))[1] == INFINITY) ? noop_1 : function(values) {
        return new _Set(values);
      };
      var _createSet = createSet;
      var LARGE_ARRAY_SIZE = 200;
      function baseUniq(array, iteratee, comparator) {
        var index = -1, includes = _arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
        if (comparator) {
          isCommon = false;
          includes = _arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set = iteratee ? null : _createSet(array);
          if (set) {
            return _setToArray(set);
          }
          isCommon = false;
          includes = _cacheHas;
          seen = new _SetCache();
        } else {
          seen = iteratee ? [] : result;
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee ? iteratee(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee) {
                seen.push(computed);
              }
              result.push(value);
            } else if (!includes(seen, computed, comparator)) {
              if (seen !== result) {
                seen.push(computed);
              }
              result.push(value);
            }
          }
        return result;
      }
      var _baseUniq = baseUniq;
      function uniq(array) {
        return array && array.length ? _baseUniq(array) : [];
      }
      var uniq_1 = uniq;
      function camelCaseToDash(str) {
        return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
      }
      function makeDataAttributeString(props) {
        const keys = Object.keys(props);
        return keys.map((key) => {
          const _key = camelCaseToDash(key);
          const val = props[key];
          if (val === void 0)
            return "";
          return `data-${_key}="${val}" `;
        }).join("").trim();
      }
      function copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.style.position = "fixed";
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = "2em";
        textArea.style.height = "2em";
        textArea.style.padding = 0;
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.boxShadow = "none";
        textArea.style.background = "transparent";
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
        } catch (err) {
          console.log("Oops, unable to copy");
        }
        document.body.removeChild(textArea);
      }
      function isNumeric(val) {
        return !isNaN(val);
      }
      var throttle$1 = throttle_1;
      var debounce$1 = debounce_1;
      function nextTick(fn, context = null) {
        return (...args) => {
          return new Promise((resolve) => {
            const execute = () => {
              const out = fn.apply(context, args);
              resolve(out);
            };
            setTimeout(execute);
          });
        };
      }
      function linkProperties(target, source, properties) {
        const props = properties.reduce((acc, prop) => {
          acc[prop] = {
            get() {
              return source[prop];
            }
          };
          return acc;
        }, {});
        Object.defineProperties(target, props);
      }
      function isSet(val) {
        return val !== void 0 || val !== null;
      }
      function notSet(val) {
        return !isSet(val);
      }
      function isNumber(val) {
        return !isNaN(val);
      }
      function ensureArray(val) {
        if (!Array.isArray(val)) {
          return [val];
        }
        return val;
      }
      function uniq$1(arr) {
        return uniq_1(arr);
      }
      function numberSortAsc(a, b) {
        return a - b;
      }
      function stripHTML(html) {
        return html.replace(/<[^>]*>/g, "");
      }
      function format(str, args) {
        if (!str)
          return str;
        Object.keys(args).forEach((arg) => {
          let regex = new RegExp(`{(${arg})}`, "g");
          str = str.replace(regex, args[arg]);
        });
        return str;
      }
      var DataManager = class {
        constructor(options) {
          this.options = options;
          this.sortRows = nextTick(this.sortRows, this);
          this.switchColumn = nextTick(this.switchColumn, this);
          this.removeColumn = nextTick(this.removeColumn, this);
          this.options.filterRows = nextTick(this.options.filterRows, this);
        }
        init(data, columns) {
          if (!data) {
            data = this.options.data;
          }
          if (columns) {
            this.options.columns = columns;
          }
          this.data = data;
          this.rowCount = 0;
          this.columns = [];
          this.rows = [];
          this.prepareColumns();
          this.prepareRows();
          this.prepareTreeRows();
          this.prepareRowView();
          this.prepareNumericColumns();
        }
        get currentSort() {
          const col = this.columns.find((col2) => col2.sortOrder !== "none");
          return col || {
            colIndex: -1,
            sortOrder: "none"
          };
        }
        prepareColumns() {
          this.columns = [];
          this.validateColumns();
          this.prepareDefaultColumns();
          this.prepareHeader();
        }
        prepareDefaultColumns() {
          if (this.options.checkboxColumn && !this.hasColumnById("_checkbox")) {
            const cell = {
              id: "_checkbox",
              content: this.getCheckboxHTML(),
              editable: false,
              resizable: false,
              sortable: false,
              focusable: false,
              dropdown: false,
              width: 32
            };
            this.columns.push(cell);
          }
          if (this.options.serialNoColumn && !this.hasColumnById("_rowIndex")) {
            let cell = {
              id: "_rowIndex",
              content: "",
              align: "center",
              editable: false,
              resizable: false,
              focusable: false,
              dropdown: false
            };
            this.columns.push(cell);
          }
        }
        prepareHeader() {
          let columns = this.columns.concat(this.options.columns);
          const baseCell = {
            isHeader: 1,
            editable: true,
            sortable: true,
            resizable: true,
            focusable: true,
            dropdown: true,
            width: null,
            format: (value) => {
              if (value === null || value === void 0) {
                return "";
              }
              return value + "";
            }
          };
          this.columns = columns.map((cell, i) => this.prepareCell(cell, i)).map((col) => Object.assign({}, baseCell, col)).map((col) => {
            col.content = col.content || col.name || "";
            col.id = col.id || col.content;
            return col;
          });
        }
        prepareCell(content, i) {
          const cell = {
            content: "",
            sortOrder: "none",
            colIndex: i,
            column: this.columns[i]
          };
          if (content !== null && typeof content === "object") {
            Object.assign(cell, content);
          } else {
            cell.content = content;
          }
          return cell;
        }
        prepareNumericColumns() {
          const row0 = this.getRow(0);
          if (!row0)
            return;
          this.columns = this.columns.map((column, i) => {
            const cellValue = row0[i].content;
            if (!column.align && isNumeric(cellValue)) {
              column.align = "right";
            }
            return column;
          });
        }
        prepareRows() {
          this.validateData(this.data);
          this.rows = this.data.map((d, i) => {
            const index = this._getNextRowCount();
            let row = [];
            let meta = {
              rowIndex: index
            };
            if (Array.isArray(d)) {
              if (this.options.checkboxColumn) {
                row.push(this.getCheckboxHTML());
              }
              if (this.options.serialNoColumn) {
                row.push(index + 1 + "");
              }
              row = row.concat(d);
              while (row.length < this.columns.length) {
                row.push("");
              }
            } else {
              for (let col of this.columns) {
                if (col.id === "_checkbox") {
                  row.push(this.getCheckboxHTML());
                } else if (col.id === "_rowIndex") {
                  row.push(index + 1 + "");
                } else {
                  row.push(d[col.id]);
                }
              }
              meta.indent = d.indent || 0;
            }
            return this.prepareRow(row, meta);
          });
        }
        prepareTreeRows() {
          this.rows.forEach((row, i) => {
            if (isNumber(row.meta.indent)) {
              const nextRow = this.getRow(i + 1);
              row.meta.isLeaf = !nextRow || notSet(nextRow.meta.indent) || nextRow.meta.indent <= row.meta.indent;
              row.meta.isTreeNodeClose = false;
            }
          });
        }
        prepareRowView() {
          this.rowViewOrder = this.rows.map((row) => row.meta.rowIndex);
        }
        prepareRow(row, meta) {
          const baseRowCell = {
            rowIndex: meta.rowIndex,
            indent: meta.indent
          };
          row = row.map((cell, i) => this.prepareCell(cell, i)).map((cell) => Object.assign({}, baseRowCell, cell));
          row.meta = meta;
          return row;
        }
        validateColumns() {
          const columns = this.options.columns;
          if (!Array.isArray(columns)) {
            throw new DataError("`columns` must be an array");
          }
          columns.forEach((column, i) => {
            if (typeof column !== "string" && typeof column !== "object") {
              throw new DataError(`column "${i}" must be a string or an object`);
            }
          });
        }
        validateData(data) {
          if (Array.isArray(data) && (data.length === 0 || Array.isArray(data[0]) || typeof data[0] === "object")) {
            return true;
          }
          throw new DataError("`data` must be an array of arrays or objects");
        }
        appendRows(rows) {
          this.validateData(rows);
          this.rows.push(...this.prepareRows(rows));
        }
        sortRows(colIndex, sortOrder = "none") {
          colIndex = +colIndex;
          this.getColumns().map((col) => {
            if (col.colIndex === colIndex) {
              col.sortOrder = sortOrder;
            } else {
              col.sortOrder = "none";
            }
          });
          this._sortRows(colIndex, sortOrder);
        }
        _sortRows(colIndex, sortOrder) {
          if (this.currentSort.colIndex === colIndex) {
            if (this.currentSort.sortOrder === "asc" && sortOrder === "desc" || this.currentSort.sortOrder === "desc" && sortOrder === "asc") {
              this.reverseArray(this.rowViewOrder);
              this.currentSort.sortOrder = sortOrder;
              return;
            }
          }
          this.rowViewOrder.sort((a, b) => {
            const aIndex = a;
            const bIndex = b;
            let aContent = this.getCell(colIndex, a).content;
            let bContent = this.getCell(colIndex, b).content;
            aContent = aContent == null ? "" : aContent;
            bContent = bContent == null ? "" : bContent;
            if (sortOrder === "none") {
              return aIndex - bIndex;
            } else if (sortOrder === "asc") {
              if (aContent < bContent)
                return -1;
              if (aContent > bContent)
                return 1;
              if (aContent === bContent)
                return 0;
            } else if (sortOrder === "desc") {
              if (aContent < bContent)
                return 1;
              if (aContent > bContent)
                return -1;
              if (aContent === bContent)
                return 0;
            }
            return 0;
          });
          if (this.hasColumnById("_rowIndex")) {
            const srNoColIndex = this.getColumnIndexById("_rowIndex");
            this.rows.forEach((row, index) => {
              const viewIndex = this.rowViewOrder.indexOf(index);
              const cell = row[srNoColIndex];
              cell.content = viewIndex + 1 + "";
            });
          }
        }
        reverseArray(array) {
          let left = null;
          let right = null;
          let length = array.length;
          for (left = 0, right = length - 1; left < right; left += 1, right -= 1) {
            const temporary = array[left];
            array[left] = array[right];
            array[right] = temporary;
          }
        }
        switchColumn(index1, index2) {
          const temp = this.columns[index1];
          this.columns[index1] = this.columns[index2];
          this.columns[index2] = temp;
          this.columns[index1].colIndex = index1;
          this.columns[index2].colIndex = index2;
          this.rows.forEach((row) => {
            const newCell1 = Object.assign({}, row[index1], {
              colIndex: index2
            });
            const newCell2 = Object.assign({}, row[index2], {
              colIndex: index1
            });
            row[index2] = newCell1;
            row[index1] = newCell2;
          });
        }
        removeColumn(index) {
          index = +index;
          const filter = (cell) => cell.colIndex !== index;
          const map = (cell, i) => Object.assign({}, cell, {
            colIndex: i
          });
          this.columns = this.columns.filter(filter).map(map);
          this.rows.forEach((row) => {
            row.splice(index, 1);
            row.forEach((cell, i) => {
              cell.colIndex = i;
            });
          });
        }
        updateRow(row, rowIndex) {
          if (row.length < this.columns.length) {
            if (this.hasColumnById("_rowIndex")) {
              const val = rowIndex + 1 + "";
              row = [val].concat(row);
            }
            if (this.hasColumnById("_checkbox")) {
              const val = '<input type="checkbox" />';
              row = [val].concat(row);
            }
          }
          const _row = this.prepareRow(row, { rowIndex });
          const index = this.rows.findIndex((row2) => row2[0].rowIndex === rowIndex);
          this.rows[index] = _row;
          return _row;
        }
        updateCell(colIndex, rowIndex, options) {
          let cell;
          if (typeof colIndex === "object") {
            cell = colIndex;
            colIndex = cell.colIndex;
            rowIndex = cell.rowIndex;
            options = cell;
          }
          cell = this.getCell(colIndex, rowIndex);
          for (let key in options) {
            const newVal = options[key];
            if (newVal !== void 0) {
              cell[key] = newVal;
            }
          }
          return cell;
        }
        updateColumn(colIndex, keyValPairs) {
          const column = this.getColumn(colIndex);
          for (let key in keyValPairs) {
            const newVal = keyValPairs[key];
            if (newVal !== void 0) {
              column[key] = newVal;
            }
          }
          return column;
        }
        filterRows(filters) {
          return this.options.filterRows(this.rows, filters).then((result) => {
            if (!result) {
              result = this.getAllRowIndices();
            }
            if (!result.then) {
              result = Promise.resolve(result);
            }
            return result.then((rowsToShow) => {
              this._filteredRows = rowsToShow;
              const rowsToHide = this.getAllRowIndices().filter((index) => !rowsToShow.includes(index));
              return {
                rowsToHide,
                rowsToShow
              };
            });
          });
        }
        getFilteredRowIndices() {
          return this._filteredRows || this.getAllRowIndices();
        }
        getAllRowIndices() {
          return this.rows.map((row) => row.meta.rowIndex);
        }
        getRowCount() {
          return this.rowCount;
        }
        _getNextRowCount() {
          const val = this.rowCount;
          this.rowCount++;
          return val;
        }
        getRows(start, end) {
          return this.rows.slice(start, end);
        }
        getRowsForView(start, end) {
          const rows = this.rowViewOrder.map((i) => this.rows[i]);
          return rows.slice(start, end);
        }
        getColumns(skipStandardColumns) {
          let columns = this.columns;
          if (skipStandardColumns) {
            columns = columns.slice(this.getStandardColumnCount());
          }
          return columns;
        }
        getStandardColumnCount() {
          if (this.options.checkboxColumn && this.options.serialNoColumn) {
            return 2;
          }
          if (this.options.checkboxColumn || this.options.serialNoColumn) {
            return 1;
          }
          return 0;
        }
        getColumnCount(skipStandardColumns) {
          let val = this.columns.length;
          if (skipStandardColumns) {
            val = val - this.getStandardColumnCount();
          }
          return val;
        }
        getColumn(colIndex) {
          colIndex = +colIndex;
          if (colIndex < 0) {
            colIndex = this.columns.length + colIndex;
          }
          return this.columns.find((col) => col.colIndex === colIndex);
        }
        getColumnById(id) {
          return this.columns.find((col) => col.id === id);
        }
        getRow(rowIndex) {
          rowIndex = +rowIndex;
          return this.rows[rowIndex];
        }
        getCell(colIndex, rowIndex) {
          rowIndex = +rowIndex;
          colIndex = +colIndex;
          return this.getRow(rowIndex)[colIndex];
        }
        getChildren(parentRowIndex) {
          parentRowIndex = +parentRowIndex;
          const parentIndent = this.getRow(parentRowIndex).meta.indent;
          const out = [];
          for (let i = parentRowIndex + 1; i < this.rowCount; i++) {
            const row = this.getRow(i);
            if (isNaN(row.meta.indent))
              continue;
            if (row.meta.indent > parentIndent) {
              out.push(i);
            }
            if (row.meta.indent === parentIndent) {
              break;
            }
          }
          return out;
        }
        getImmediateChildren(parentRowIndex) {
          parentRowIndex = +parentRowIndex;
          const parentIndent = this.getRow(parentRowIndex).meta.indent;
          const out = [];
          const childIndent = parentIndent + 1;
          for (let i = parentRowIndex + 1; i < this.rowCount; i++) {
            const row = this.getRow(i);
            if (isNaN(row.meta.indent) || row.meta.indent > childIndent)
              continue;
            if (row.meta.indent === childIndent) {
              out.push(i);
            }
            if (row.meta.indent === parentIndent) {
              break;
            }
          }
          return out;
        }
        get() {
          return {
            columns: this.columns,
            rows: this.rows
          };
        }
        getData(rowIndex) {
          return this.data[rowIndex];
        }
        hasColumn(name2) {
          return Boolean(this.columns.find((col) => col.content === name2));
        }
        hasColumnById(id) {
          return Boolean(this.columns.find((col) => col.id === id));
        }
        getColumnIndex(name2) {
          return this.columns.findIndex((col) => col.content === name2);
        }
        getColumnIndexById(id) {
          return this.columns.findIndex((col) => col.id === id);
        }
        getCheckboxHTML() {
          return '<input type="checkbox" />';
        }
      };
      var DataError = class extends TypeError {
      };
      var icons = {
        chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>',
        chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>'
      };
      var CellManager = class {
        constructor(instance) {
          this.instance = instance;
          linkProperties(this, this.instance, [
            "wrapper",
            "options",
            "style",
            "header",
            "bodyScrollable",
            "columnmanager",
            "rowmanager",
            "datamanager",
            "keyboard"
          ]);
          this.bindEvents();
        }
        bindEvents() {
          this.bindFocusCell();
          this.bindEditCell();
          this.bindKeyboardSelection();
          this.bindCopyCellContents();
          this.bindMouseEvents();
          this.bindTreeEvents();
        }
        bindFocusCell() {
          this.bindKeyboardNav();
        }
        bindEditCell() {
          this.$editingCell = null;
          $2.on(this.bodyScrollable, "dblclick", ".dt-cell", (e, cell) => {
            this.activateEditing(cell);
          });
          this.keyboard.on("enter", () => {
            if (this.$focusedCell && !this.$editingCell) {
              this.activateEditing(this.$focusedCell);
            } else if (this.$editingCell) {
              this.deactivateEditing();
            }
          });
        }
        bindKeyboardNav() {
          const focusLastCell = (direction) => {
            if (!this.$focusedCell || this.$editingCell) {
              return false;
            }
            let $cell = this.$focusedCell;
            const {
              rowIndex,
              colIndex
            } = $2.data($cell);
            if (direction === "left") {
              $cell = this.getLeftMostCell$(rowIndex);
            } else if (direction === "right") {
              $cell = this.getRightMostCell$(rowIndex);
            } else if (direction === "up") {
              $cell = this.getTopMostCell$(colIndex);
            } else if (direction === "down") {
              $cell = this.getBottomMostCell$(colIndex);
            }
            this.focusCell($cell);
            return true;
          };
          ["left", "right", "up", "down", "tab", "shift+tab"].map((direction) => this.keyboard.on(direction, () => this.focusCellInDirection(direction)));
          ["left", "right", "up", "down"].map((direction) => this.keyboard.on(`ctrl+${direction}`, () => focusLastCell(direction)));
          this.keyboard.on("esc", () => {
            this.deactivateEditing(false);
            this.columnmanager.toggleFilter(false);
          });
          if (this.options.inlineFilters) {
            this.keyboard.on("ctrl+f", (e) => {
              const $cell = $2.closest(".dt-cell", e.target);
              const { colIndex } = $2.data($cell);
              this.activateFilter(colIndex);
              return true;
            });
            $2.on(this.header, "focusin", ".dt-filter", () => {
              this.unfocusCell(this.$focusedCell);
            });
          }
        }
        bindKeyboardSelection() {
          const getNextSelectionCursor = (direction) => {
            let $selectionCursor = this.getSelectionCursor();
            if (direction === "left") {
              $selectionCursor = this.getLeftCell$($selectionCursor);
            } else if (direction === "right") {
              $selectionCursor = this.getRightCell$($selectionCursor);
            } else if (direction === "up") {
              $selectionCursor = this.getAboveCell$($selectionCursor);
            } else if (direction === "down") {
              $selectionCursor = this.getBelowCell$($selectionCursor);
            }
            return $selectionCursor;
          };
          ["left", "right", "up", "down"].map((direction) => this.keyboard.on(`shift+${direction}`, () => this.selectArea(getNextSelectionCursor(direction))));
        }
        bindCopyCellContents() {
          this.keyboard.on("ctrl+c", () => {
            const noOfCellsCopied = this.copyCellContents(this.$focusedCell, this.$selectionCursor);
            const message = this.instance.translate("{count} cells copied", {
              count: noOfCellsCopied
            });
            if (noOfCellsCopied) {
              this.instance.showToastMessage(message, 2);
            }
          });
          if (this.options.pasteFromClipboard) {
            this.keyboard.on("ctrl+v", (e) => {
              this.instance.pasteTarget.focus();
              setTimeout(() => {
                const data = this.instance.pasteTarget.value;
                this.instance.pasteTarget.value = "";
                this.pasteContentInCell(data);
              }, 10);
              return false;
            });
          }
        }
        bindMouseEvents() {
          let mouseDown = null;
          $2.on(this.bodyScrollable, "mousedown", ".dt-cell", (e) => {
            mouseDown = true;
            this.focusCell($2(e.delegatedTarget));
          });
          $2.on(this.bodyScrollable, "mouseup", () => {
            mouseDown = false;
          });
          const selectArea = (e) => {
            if (!mouseDown)
              return;
            this.selectArea($2(e.delegatedTarget));
          };
          $2.on(this.bodyScrollable, "mousemove", ".dt-cell", throttle$1(selectArea, 50));
        }
        bindTreeEvents() {
          $2.on(this.bodyScrollable, "click", ".dt-tree-node__toggle", (e, $toggle) => {
            const $cell = $2.closest(".dt-cell", $toggle);
            const { rowIndex } = $2.data($cell);
            if ($cell.classList.contains("dt-cell--tree-close")) {
              this.rowmanager.openSingleNode(rowIndex);
            } else {
              this.rowmanager.closeSingleNode(rowIndex);
            }
          });
        }
        focusCell($cell, {
          skipClearSelection = 0,
          skipDOMFocus = 0,
          skipScrollToCell = 0
        } = {}) {
          if (!$cell)
            return;
          if ($cell === this.$editingCell)
            return;
          const {
            colIndex,
            isHeader
          } = $2.data($cell);
          if (isHeader) {
            return;
          }
          const column = this.columnmanager.getColumn(colIndex);
          if (column.focusable === false) {
            return;
          }
          if (!skipScrollToCell) {
            this.scrollToCell($cell);
          }
          this.deactivateEditing();
          if (!skipClearSelection) {
            this.clearSelection();
          }
          if (this.$focusedCell) {
            this.$focusedCell.classList.remove("dt-cell--focus");
          }
          this.$focusedCell = $cell;
          $cell.classList.add("dt-cell--focus");
          if (!skipDOMFocus) {
            $cell.focus();
          }
          this.highlightRowColumnHeader($cell);
        }
        unfocusCell($cell) {
          if (!$cell)
            return;
          $cell.classList.remove("dt-cell--focus");
          this.$focusedCell = null;
          if (this.lastHeaders) {
            this.lastHeaders.forEach((header) => header && header.classList.remove("dt-cell--highlight"));
          }
        }
        highlightRowColumnHeader($cell) {
          const {
            colIndex,
            rowIndex
          } = $2.data($cell);
          const srNoColIndex = this.datamanager.getColumnIndexById("_rowIndex");
          const colHeaderSelector = `.dt-cell--header-${colIndex}`;
          const rowHeaderSelector = `.dt-cell--${srNoColIndex}-${rowIndex}`;
          if (this.lastHeaders) {
            this.lastHeaders.forEach((header) => header && header.classList.remove("dt-cell--highlight"));
          }
          const colHeader = $2(colHeaderSelector, this.wrapper);
          const rowHeader = $2(rowHeaderSelector, this.wrapper);
          this.lastHeaders = [colHeader, rowHeader];
          this.lastHeaders.forEach((header) => header && header.classList.add("dt-cell--highlight"));
        }
        selectAreaOnClusterChanged() {
          if (!(this.$focusedCell && this.$selectionCursor))
            return;
          const {
            colIndex,
            rowIndex
          } = $2.data(this.$selectionCursor);
          const $cell = this.getCell$(colIndex, rowIndex);
          if (!$cell || $cell === this.$selectionCursor)
            return;
          const fCell = $2.data(this.$focusedCell);
          this.$focusedCell = this.getCell$(fCell.colIndex, fCell.rowIndex);
          this.selectArea($cell);
        }
        focusCellOnClusterChanged() {
          if (!this.$focusedCell)
            return;
          const {
            colIndex,
            rowIndex
          } = $2.data(this.$focusedCell);
          const $cell = this.getCell$(colIndex, rowIndex);
          if (!$cell)
            return;
          this.focusCell($cell, {
            skipClearSelection: 1,
            skipDOMFocus: 1,
            skipScrollToCell: 1
          });
        }
        selectArea($selectionCursor) {
          if (!this.$focusedCell)
            return;
          if (this._selectArea(this.$focusedCell, $selectionCursor)) {
            this.$selectionCursor = $selectionCursor;
          }
        }
        _selectArea($cell1, $cell2) {
          if ($cell1 === $cell2)
            return false;
          const cells = this.getCellsInRange($cell1, $cell2);
          if (!cells)
            return false;
          this.clearSelection();
          this._selectedCells = cells.map((index) => this.getCell$(...index));
          requestAnimationFrame(() => {
            this._selectedCells.map(($cell) => $cell.classList.add("dt-cell--highlight"));
          });
          return true;
        }
        getCellsInRange($cell1, $cell2) {
          let colIndex1, rowIndex1, colIndex2, rowIndex2;
          if (typeof $cell1 === "number") {
            [colIndex1, rowIndex1, colIndex2, rowIndex2] = arguments;
          } else if (typeof $cell1 === "object") {
            if (!($cell1 && $cell2)) {
              return false;
            }
            const cell1 = $2.data($cell1);
            const cell2 = $2.data($cell2);
            colIndex1 = +cell1.colIndex;
            rowIndex1 = +cell1.rowIndex;
            colIndex2 = +cell2.colIndex;
            rowIndex2 = +cell2.rowIndex;
          }
          if (rowIndex1 > rowIndex2) {
            [rowIndex1, rowIndex2] = [rowIndex2, rowIndex1];
          }
          if (colIndex1 > colIndex2) {
            [colIndex1, colIndex2] = [colIndex2, colIndex1];
          }
          if (this.isStandardCell(colIndex1) || this.isStandardCell(colIndex2)) {
            return false;
          }
          const cells = [];
          let colIndex = colIndex1;
          let rowIndex = rowIndex1;
          const rowIndices = [];
          while (rowIndex <= rowIndex2) {
            rowIndices.push(rowIndex);
            rowIndex += 1;
          }
          rowIndices.map((rowIndex3) => {
            while (colIndex <= colIndex2) {
              cells.push([colIndex, rowIndex3]);
              colIndex++;
            }
            colIndex = colIndex1;
          });
          return cells;
        }
        clearSelection() {
          (this._selectedCells || []).forEach(($cell) => $cell.classList.remove("dt-cell--highlight"));
          this._selectedCells = [];
          this.$selectionCursor = null;
        }
        getSelectionCursor() {
          return this.$selectionCursor || this.$focusedCell;
        }
        activateEditing($cell) {
          this.focusCell($cell);
          const {
            rowIndex,
            colIndex
          } = $2.data($cell);
          const col = this.columnmanager.getColumn(colIndex);
          if (col && (col.editable === false || col.focusable === false)) {
            return;
          }
          const cell = this.getCell(colIndex, rowIndex);
          if (cell && cell.editable === false) {
            return;
          }
          if (this.$editingCell) {
            const {
              _rowIndex,
              _colIndex
            } = $2.data(this.$editingCell);
            if (rowIndex === _rowIndex && colIndex === _colIndex) {
              return;
            }
          }
          this.$editingCell = $cell;
          $cell.classList.add("dt-cell--editing");
          const $editCell = $2(".dt-cell__edit", $cell);
          $editCell.innerHTML = "";
          const editor = this.getEditor(colIndex, rowIndex, cell.content, $editCell);
          if (editor) {
            this.currentCellEditor = editor;
            editor.initValue(cell.content, rowIndex, col);
          }
        }
        deactivateEditing(submitValue = true) {
          if (submitValue) {
            this.submitEditing();
          }
          if (this.$focusedCell)
            this.$focusedCell.focus();
          if (!this.$editingCell)
            return;
          this.$editingCell.classList.remove("dt-cell--editing");
          this.$editingCell = null;
        }
        getEditor(colIndex, rowIndex, value, parent) {
          const column = this.datamanager.getColumn(colIndex);
          const row = this.datamanager.getRow(rowIndex);
          const data = this.datamanager.getData(rowIndex);
          let editor = this.options.getEditor ? this.options.getEditor(colIndex, rowIndex, value, parent, column, row, data) : this.getDefaultEditor(parent);
          if (editor === false) {
            return false;
          }
          if (editor === void 0) {
            editor = this.getDefaultEditor(parent);
          }
          return editor;
        }
        getDefaultEditor(parent) {
          const $input = $2.create("input", {
            class: "dt-input",
            type: "text",
            inside: parent
          });
          return {
            initValue(value) {
              $input.focus();
              $input.value = value;
            },
            getValue() {
              return $input.value;
            },
            setValue(value) {
              $input.value = value;
            }
          };
        }
        submitEditing() {
          let promise = Promise.resolve();
          if (!this.$editingCell)
            return promise;
          const $cell = this.$editingCell;
          const {
            rowIndex,
            colIndex
          } = $2.data($cell);
          const col = this.datamanager.getColumn(colIndex);
          if ($cell) {
            const editor = this.currentCellEditor;
            if (editor) {
              let valuePromise = editor.getValue();
              if (!valuePromise.then) {
                valuePromise = Promise.resolve(valuePromise);
              }
              promise = valuePromise.then((value) => {
                const oldValue = this.getCell(colIndex, rowIndex).content;
                if (oldValue === value)
                  return false;
                const done = editor.setValue(value, rowIndex, col);
                this.updateCell(colIndex, rowIndex, value);
                $cell.focus();
                if (done && done.then) {
                  done.catch((e) => {
                    console.log(e);
                    this.updateCell(colIndex, rowIndex, oldValue);
                  });
                }
                return done;
              });
            }
          }
          this.currentCellEditor = null;
          return promise;
        }
        copyCellContents($cell1, $cell2) {
          if (!$cell2 && $cell1) {
            const {
              colIndex,
              rowIndex
            } = $2.data($cell1);
            const cell = this.getCell(colIndex, rowIndex);
            copyTextToClipboard(cell.content);
            return 1;
          }
          const cells = this.getCellsInRange($cell1, $cell2);
          if (!cells)
            return 0;
          const rows = cells.map((index) => this.getCell(...index)).reduce((acc, curr) => {
            const rowIndex = curr.rowIndex;
            acc[rowIndex] = acc[rowIndex] || [];
            acc[rowIndex].push(curr.content);
            return acc;
          }, []);
          const values = rows.map((row) => row.join("	")).join("\n");
          copyTextToClipboard(values);
          return rows.reduce((total, row) => total + row.length, 0);
        }
        pasteContentInCell(data) {
          if (!this.$focusedCell)
            return;
          const matrix = data.split("\n").map((row) => row.split("	")).filter((row) => row.length && row.every((it2) => it2));
          let { colIndex, rowIndex } = $2.data(this.$focusedCell);
          let focusedCell = {
            colIndex: +colIndex,
            rowIndex: +rowIndex
          };
          matrix.forEach((row, i) => {
            let rowIndex2 = i + focusedCell.rowIndex;
            row.forEach((cell, j) => {
              let colIndex2 = j + focusedCell.colIndex;
              this.updateCell(colIndex2, rowIndex2, cell);
            });
          });
        }
        activateFilter(colIndex) {
          this.columnmanager.toggleFilter();
          this.columnmanager.focusFilter(colIndex);
          if (!this.columnmanager.isFilterShown) {
            this.$focusedCell && this.$focusedCell.focus();
          }
        }
        updateCell(colIndex, rowIndex, value) {
          const cell = this.datamanager.updateCell(colIndex, rowIndex, {
            content: value
          });
          this.refreshCell(cell);
        }
        refreshCell(cell) {
          const $cell = $2(this.selector(cell.colIndex, cell.rowIndex), this.bodyScrollable);
          $cell.innerHTML = this.getCellContent(cell);
        }
        toggleTreeButton(rowIndex, flag) {
          const colIndex = this.columnmanager.getFirstColumnIndex();
          const $cell = this.getCell$(colIndex, rowIndex);
          if ($cell) {
            $cell.classList[flag ? "remove" : "add"]("dt-cell--tree-close");
          }
        }
        isStandardCell(colIndex) {
          return colIndex < this.columnmanager.getFirstColumnIndex();
        }
        focusCellInDirection(direction) {
          if (!this.$focusedCell || this.$editingCell && ["left", "right", "up", "down"].includes(direction)) {
            return false;
          } else if (this.$editingCell && ["tab", "shift+tab"].includes(direction)) {
            this.deactivateEditing();
          }
          let $cell = this.$focusedCell;
          if (direction === "left" || direction === "shift+tab") {
            $cell = this.getLeftCell$($cell);
          } else if (direction === "right" || direction === "tab") {
            $cell = this.getRightCell$($cell);
          } else if (direction === "up") {
            $cell = this.getAboveCell$($cell);
          } else if (direction === "down") {
            $cell = this.getBelowCell$($cell);
          }
          if (!$cell) {
            return false;
          }
          const {
            colIndex
          } = $2.data($cell);
          const column = this.columnmanager.getColumn(colIndex);
          if (!column.focusable) {
            let $prevFocusedCell = this.$focusedCell;
            this.unfocusCell($prevFocusedCell);
            this.$focusedCell = $cell;
            let ret = this.focusCellInDirection(direction);
            if (!ret) {
              this.focusCell($prevFocusedCell);
            }
            return ret;
          }
          this.focusCell($cell);
          return true;
        }
        getCell$(colIndex, rowIndex) {
          return $2(this.selector(colIndex, rowIndex), this.bodyScrollable);
        }
        getAboveCell$($cell) {
          const {
            colIndex
          } = $2.data($cell);
          let $aboveRow = $cell.parentElement.previousElementSibling;
          while ($aboveRow && $aboveRow.classList.contains("dt-row--hide")) {
            $aboveRow = $aboveRow.previousElementSibling;
          }
          if (!$aboveRow)
            return $cell;
          return $2(`.dt-cell--col-${colIndex}`, $aboveRow);
        }
        getBelowCell$($cell) {
          const {
            colIndex
          } = $2.data($cell);
          let $belowRow = $cell.parentElement.nextElementSibling;
          while ($belowRow && $belowRow.classList.contains("dt-row--hide")) {
            $belowRow = $belowRow.nextElementSibling;
          }
          if (!$belowRow)
            return $cell;
          return $2(`.dt-cell--col-${colIndex}`, $belowRow);
        }
        getLeftCell$($cell) {
          return $cell.previousElementSibling;
        }
        getRightCell$($cell) {
          return $cell.nextElementSibling;
        }
        getLeftMostCell$(rowIndex) {
          return this.getCell$(this.columnmanager.getFirstColumnIndex(), rowIndex);
        }
        getRightMostCell$(rowIndex) {
          return this.getCell$(this.columnmanager.getLastColumnIndex(), rowIndex);
        }
        getTopMostCell$(colIndex) {
          return this.getCell$(colIndex, this.rowmanager.getFirstRowIndex());
        }
        getBottomMostCell$(colIndex) {
          return this.getCell$(colIndex, this.rowmanager.getLastRowIndex());
        }
        getCell(colIndex, rowIndex) {
          return this.instance.datamanager.getCell(colIndex, rowIndex);
        }
        getRowHeight() {
          return $2.style($2(".dt-row", this.bodyScrollable), "height");
        }
        scrollToCell($cell) {
          if ($2.inViewport($cell, this.bodyScrollable))
            return false;
          const {
            rowIndex
          } = $2.data($cell);
          this.rowmanager.scrollToRow(rowIndex);
          return false;
        }
        getRowCountPerPage() {
          return Math.ceil(this.instance.getViewportHeight() / this.getRowHeight());
        }
        getCellHTML(cell) {
          const {
            rowIndex,
            colIndex,
            isHeader,
            isFilter,
            isTotalRow
          } = cell;
          const dataAttr = makeDataAttributeString({
            rowIndex,
            colIndex,
            isHeader,
            isFilter,
            isTotalRow
          });
          const row = this.datamanager.getRow(rowIndex);
          const isBodyCell = !(isHeader || isFilter || isTotalRow);
          const className = [
            "dt-cell",
            "dt-cell--col-" + colIndex,
            isBodyCell ? `dt-cell--${colIndex}-${rowIndex}` : "",
            isBodyCell ? "dt-cell--row-" + rowIndex : "",
            isHeader ? "dt-cell--header" : "",
            isHeader ? `dt-cell--header-${colIndex}` : "",
            isFilter ? "dt-cell--filter" : "",
            isBodyCell && (row && row.meta.isTreeNodeClose) ? "dt-cell--tree-close" : ""
          ].join(" ");
          return `
            <div class="${className}" ${dataAttr} tabindex="0">
                ${this.getCellContent(cell)}
            </div>
        `;
        }
        getCellContent(cell) {
          const {
            isHeader,
            isFilter,
            colIndex
          } = cell;
          const editable = !isHeader && cell.editable !== false;
          const editCellHTML = editable ? this.getEditCellHTML(colIndex) : "";
          const sortable = isHeader && cell.sortable !== false;
          const sortIndicator = sortable ? `<span class="sort-indicator">
                ${this.options.sortIndicator[cell.sortOrder]}
            </span>` : "";
          const resizable = isHeader && cell.resizable !== false;
          const resizeColumn = resizable ? '<span class="dt-cell__resize-handle"></span>' : "";
          const hasDropdown = isHeader && cell.dropdown !== false;
          const dropdown = hasDropdown ? this.columnmanager.getDropdownHTML() : "";
          const customFormatter = cell.format || cell.column && cell.column.format || null;
          let contentHTML;
          if (isHeader || isFilter || !customFormatter) {
            contentHTML = cell.content;
          } else {
            const row = this.datamanager.getRow(cell.rowIndex);
            const data = this.datamanager.getData(cell.rowIndex);
            contentHTML = customFormatter(cell.content, row, cell.column, data);
          }
          cell.html = contentHTML;
          if (this.options.treeView && !(isHeader || isFilter) && cell.indent !== void 0) {
            const nextRow = this.datamanager.getRow(cell.rowIndex + 1);
            const addToggle = nextRow && nextRow.meta.indent > cell.indent;
            const leftPadding = 20;
            const unit = "px";
            const firstColumnIndex = this.datamanager.getColumnIndexById("_rowIndex") + 1;
            if (firstColumnIndex === cell.colIndex) {
              const padding = (cell.indent || 0) * leftPadding;
              const toggleHTML = addToggle ? `<span class="dt-tree-node__toggle" style="left: ${padding - leftPadding}${unit}">
                        <span class="icon-open">${icons.chevronDown}</span>
                        <span class="icon-close">${icons.chevronRight}</span>
                    </span>` : "";
              contentHTML = `<span class="dt-tree-node" style="padding-left: ${padding}${unit}">
                    ${toggleHTML}
                    <span>${contentHTML}</span>
                </span>`;
            }
          }
          const className = [
            "dt-cell__content",
            isHeader ? `dt-cell__content--header-${colIndex}` : `dt-cell__content--col-${colIndex}`
          ].join(" ");
          return `
            <div class="${className}">
                ${contentHTML}
                ${sortIndicator}
                ${resizeColumn}
                ${dropdown}
            </div>
            ${editCellHTML}
        `;
        }
        getEditCellHTML(colIndex) {
          return `<div class="dt-cell__edit dt-cell__edit--col-${colIndex}"></div>`;
        }
        selector(colIndex, rowIndex) {
          return `.dt-cell--${colIndex}-${rowIndex}`;
        }
      };
      var ColumnManager = class {
        constructor(instance) {
          this.instance = instance;
          linkProperties(this, this.instance, [
            "options",
            "fireEvent",
            "header",
            "datamanager",
            "cellmanager",
            "style",
            "wrapper",
            "rowmanager",
            "bodyScrollable",
            "bodyRenderer"
          ]);
          this.bindEvents();
        }
        renderHeader() {
          this.header.innerHTML = "<div></div>";
          this.refreshHeader();
        }
        refreshHeader() {
          const columns = this.datamanager.getColumns();
          $2("div", this.header).innerHTML = this.getHeaderHTML(columns);
          this.$filterRow = $2(".dt-row-filter", this.header);
          if (this.$filterRow) {
            $2.style(this.$filterRow, { display: "none" });
          }
          this.$columnMap = [];
          this.bindMoveColumn();
        }
        getHeaderHTML(columns) {
          let html = this.rowmanager.getRowHTML(columns, {
            isHeader: 1
          });
          if (this.options.inlineFilters) {
            html += this.rowmanager.getRowHTML(columns, {
              isFilter: 1
            });
          }
          return html;
        }
        bindEvents() {
          this.bindDropdown();
          this.bindResizeColumn();
          this.bindPerfectColumnWidth();
          this.bindFilter();
        }
        bindDropdown() {
          let toggleClass = ".dt-dropdown__toggle";
          let dropdownClass = ".dt-dropdown__list";
          this.instance.dropdownContainer.innerHTML = this.getDropdownListHTML();
          this.$dropdownList = this.instance.dropdownContainer.firstElementChild;
          $2.on(this.header, "click", toggleClass, (e) => {
            this.openDropdown(e);
          });
          const deactivateDropdownOnBodyClick = (e) => {
            const selector = [
              toggleClass,
              toggleClass + " *",
              dropdownClass,
              dropdownClass + " *"
            ].join(",");
            if (e.target.matches(selector))
              return;
            deactivateDropdown();
          };
          $2.on(document.body, "click", deactivateDropdownOnBodyClick);
          document.addEventListener("scroll", deactivateDropdown, true);
          this.instance.on("onDestroy", () => {
            $2.off(document.body, "click", deactivateDropdownOnBodyClick);
            $2.off(document, "scroll", deactivateDropdown);
          });
          $2.on(this.$dropdownList, "click", ".dt-dropdown__list-item", (e, $item) => {
            if (!this._dropdownActiveColIndex)
              return;
            const dropdownItems = this.options.headerDropdown;
            const { index } = $2.data($item);
            const colIndex = this._dropdownActiveColIndex;
            let callback = dropdownItems[index].action;
            callback && callback.call(this.instance, this.getColumn(colIndex));
            this.hideDropdown();
          });
          const _this = this;
          function deactivateDropdown(e) {
            _this.hideDropdown();
          }
          this.hideDropdown();
        }
        openDropdown(e) {
          if (!this._dropdownWidth) {
            $2.style(this.$dropdownList, { display: "" });
            this._dropdownWidth = $2.style(this.$dropdownList, "width");
          }
          $2.style(this.$dropdownList, {
            display: "",
            left: e.clientX - this._dropdownWidth + 4 + "px",
            top: e.clientY + 4 + "px"
          });
          const $cell = $2.closest(".dt-cell", e.target);
          const { colIndex } = $2.data($cell);
          this._dropdownActiveColIndex = colIndex;
        }
        hideDropdown() {
          $2.style(this.$dropdownList, {
            display: "none"
          });
          this._dropdownActiveColIndex = null;
        }
        bindResizeColumn() {
          let isDragging = false;
          let $resizingCell, startWidth, startX;
          $2.on(this.header, "mousedown", ".dt-cell .dt-cell__resize-handle", (e, $handle) => {
            document.body.classList.add("dt-resize");
            const $cell = $handle.parentNode.parentNode;
            $resizingCell = $cell;
            const {
              colIndex
            } = $2.data($resizingCell);
            const col = this.getColumn(colIndex);
            if (col && col.resizable === false) {
              return;
            }
            isDragging = true;
            startWidth = $2.style($2(".dt-cell__content", $resizingCell), "width");
            startX = e.pageX;
          });
          const onMouseup = (e) => {
            document.body.classList.remove("dt-resize");
            if (!$resizingCell)
              return;
            isDragging = false;
            const {
              colIndex
            } = $2.data($resizingCell);
            this.setColumnWidth(colIndex);
            this.style.setBodyStyle();
            $resizingCell = null;
          };
          $2.on(document.body, "mouseup", onMouseup);
          this.instance.on("onDestroy", () => {
            $2.off(document.body, "mouseup", onMouseup);
          });
          const onMouseMove = (e) => {
            if (!isDragging)
              return;
            let delta = e.pageX - startX;
            if (this.options.direction === "rtl") {
              delta = -1 * delta;
            }
            const finalWidth = startWidth + delta;
            const {
              colIndex
            } = $2.data($resizingCell);
            let columnMinWidth = this.options.minimumColumnWidth;
            if (columnMinWidth > finalWidth) {
              return;
            }
            this.datamanager.updateColumn(colIndex, {
              width: finalWidth
            });
            this.setColumnHeaderWidth(colIndex);
          };
          $2.on(document.body, "mousemove", onMouseMove);
          this.instance.on("onDestroy", () => {
            $2.off(document.body, "mousemove", onMouseMove);
          });
        }
        bindPerfectColumnWidth() {
          $2.on(this.header, "dblclick", ".dt-cell .dt-cell__resize-handle", (e, $handle) => {
            const $cell = $handle.parentNode.parentNode;
            const { colIndex } = $2.data($cell);
            let longestCell = this.bodyRenderer.visibleRows.map((d) => d[colIndex]).reduce((acc, curr) => acc.content.length > curr.content.length ? acc : curr);
            let $longestCellHTML = this.cellmanager.getCellHTML(longestCell);
            let $div = document.createElement("div");
            $div.innerHTML = $longestCellHTML;
            let cellText = $div.querySelector(".dt-cell__content").textContent;
            let {
              borderLeftWidth,
              borderRightWidth,
              paddingLeft,
              paddingRight
            } = $2.getStyle(this.bodyScrollable.querySelector(".dt-cell__content"));
            let padding = [borderLeftWidth, borderRightWidth, paddingLeft, paddingRight].map(parseFloat).reduce((sum, val) => sum + val);
            let width = $2.measureTextWidth(cellText) + padding;
            this.datamanager.updateColumn(colIndex, { width });
            this.setColumnHeaderWidth(colIndex);
            this.setColumnWidth(colIndex);
          });
        }
        bindMoveColumn() {
          if (this.options.disableReorderColumn)
            return;
          const $parent = $2(".dt-row", this.header);
          this.sortable = Sortable.create($parent, {
            onEnd: (e) => {
              const {
                oldIndex,
                newIndex
              } = e;
              const $draggedCell = e.item;
              const {
                colIndex
              } = $2.data($draggedCell);
              if (+colIndex === newIndex)
                return;
              this.switchColumn(oldIndex, newIndex);
            },
            preventOnFilter: false,
            filter: ".dt-cell__resize-handle, .dt-dropdown",
            chosenClass: "dt-cell--dragging",
            animation: 150
          });
        }
        sortColumn(colIndex, nextSortOrder) {
          this.instance.freeze();
          this.sortRows(colIndex, nextSortOrder).then(() => {
            this.refreshHeader();
            return this.rowmanager.refreshRows();
          }).then(() => this.instance.unfreeze()).then(() => {
            this.fireEvent("onSortColumn", this.getColumn(colIndex));
          });
        }
        removeColumn(colIndex) {
          const removedCol = this.getColumn(colIndex);
          this.instance.freeze();
          this.datamanager.removeColumn(colIndex).then(() => {
            this.refreshHeader();
            return this.rowmanager.refreshRows();
          }).then(() => this.instance.unfreeze()).then(() => {
            this.fireEvent("onRemoveColumn", removedCol);
          });
        }
        switchColumn(oldIndex, newIndex) {
          this.instance.freeze();
          this.datamanager.switchColumn(oldIndex, newIndex).then(() => {
            this.refreshHeader();
            return this.rowmanager.refreshRows();
          }).then(() => {
            this.setColumnWidth(oldIndex);
            this.setColumnWidth(newIndex);
            this.instance.unfreeze();
          }).then(() => {
            this.fireEvent("onSwitchColumn", this.getColumn(oldIndex), this.getColumn(newIndex));
          });
        }
        toggleFilter(flag) {
          if (!this.options.inlineFilters)
            return;
          let showFilter;
          if (flag === void 0) {
            showFilter = !this.isFilterShown;
          } else {
            showFilter = flag;
          }
          if (showFilter) {
            $2.style(this.$filterRow, { display: "" });
          } else {
            $2.style(this.$filterRow, { display: "none" });
          }
          this.isFilterShown = showFilter;
          this.style.setBodyStyle();
        }
        focusFilter(colIndex) {
          if (!this.isFilterShown)
            return;
          const $filterInput = $2(`.dt-cell--col-${colIndex} .dt-filter`, this.$filterRow);
          $filterInput.focus();
        }
        bindFilter() {
          if (!this.options.inlineFilters)
            return;
          const handler = (e) => {
            this.applyFilter(this.getAppliedFilters());
          };
          $2.on(this.header, "keydown", ".dt-filter", debounce$1(handler, 300));
        }
        applyFilter(filters) {
          this.datamanager.filterRows(filters).then(({
            rowsToShow
          }) => {
            this.rowmanager.showRows(rowsToShow);
          });
        }
        getAppliedFilters() {
          const filters = {};
          $2.each(".dt-filter", this.header).map((input) => {
            const value = input.value;
            if (value) {
              filters[input.dataset.colIndex] = value;
            }
          });
          return filters;
        }
        applyDefaultSortOrder() {
          const columnsToSort = this.getColumns().filter((col) => col.sortOrder !== "none");
          if (columnsToSort.length === 1) {
            const column = columnsToSort[0];
            this.sortColumn(column.colIndex, column.sortOrder);
          }
        }
        sortRows(colIndex, sortOrder) {
          return this.datamanager.sortRows(colIndex, sortOrder);
        }
        getColumn(colIndex) {
          return this.datamanager.getColumn(colIndex);
        }
        getColumns() {
          return this.datamanager.getColumns();
        }
        setColumnWidth(colIndex, width) {
          colIndex = +colIndex;
          let columnWidth = width || this.getColumn(colIndex).width;
          const selector = [
            `.dt-cell__content--col-${colIndex}`,
            `.dt-cell__edit--col-${colIndex}`
          ].join(", ");
          const styles = {
            width: columnWidth + "px"
          };
          this.style.setStyle(selector, styles);
        }
        setColumnHeaderWidth(colIndex) {
          colIndex = +colIndex;
          this.$columnMap = this.$columnMap || [];
          const selector = `.dt-cell__content--header-${colIndex}`;
          const {
            width
          } = this.getColumn(colIndex);
          let $column = this.$columnMap[colIndex];
          if (!$column) {
            $column = this.header.querySelector(selector);
            this.$columnMap[colIndex] = $column;
          }
          $column.style.width = width + "px";
        }
        getColumnMinWidth(colIndex) {
          colIndex = +colIndex;
          return this.getColumn(colIndex).minWidth || 24;
        }
        getFirstColumnIndex() {
          return this.datamanager.getColumnIndexById("_rowIndex") + 1;
        }
        getHeaderCell$(colIndex) {
          return $2(`.dt-cell--header-${colIndex}`, this.header);
        }
        getLastColumnIndex() {
          return this.datamanager.getColumnCount() - 1;
        }
        getDropdownHTML() {
          const { dropdownButton } = this.options;
          return `
            <div class="dt-dropdown">
                <div class="dt-dropdown__toggle">${dropdownButton}</div>
            </div>
      `;
        }
        getDropdownListHTML() {
          const { headerDropdown: dropdownItems } = this.options;
          return `
            <div class="dt-dropdown__list">
            ${dropdownItems.map((d, i) => `
                <div class="dt-dropdown__list-item" data-index="${i}">${d.label}</div>
            `).join("")}
            </div>
        `;
        }
      };
      var RowManager = class {
        constructor(instance) {
          this.instance = instance;
          linkProperties(this, this.instance, [
            "options",
            "fireEvent",
            "wrapper",
            "bodyScrollable",
            "bodyRenderer",
            "style"
          ]);
          this.bindEvents();
          this.refreshRows = nextTick(this.refreshRows, this);
        }
        get datamanager() {
          return this.instance.datamanager;
        }
        get cellmanager() {
          return this.instance.cellmanager;
        }
        bindEvents() {
          this.bindCheckbox();
        }
        bindCheckbox() {
          if (!this.options.checkboxColumn)
            return;
          this.checkMap = [];
          $2.on(this.wrapper, "click", '.dt-cell--col-0 [type="checkbox"]', (e, $checkbox) => {
            const $cell = $checkbox.closest(".dt-cell");
            const {
              rowIndex,
              isHeader
            } = $2.data($cell);
            const checked = $checkbox.checked;
            if (isHeader) {
              this.checkAll(checked);
            } else {
              this.checkRow(rowIndex, checked);
            }
          });
        }
        refreshRows() {
          this.instance.renderBody();
          this.instance.setDimensions();
        }
        refreshRow(row, rowIndex) {
          const _row = this.datamanager.updateRow(row, rowIndex);
          _row.forEach((cell) => {
            this.cellmanager.refreshCell(cell);
          });
        }
        getCheckedRows() {
          if (!this.checkMap) {
            return [];
          }
          let out = [];
          for (let rowIndex in this.checkMap) {
            const checked = this.checkMap[rowIndex];
            if (checked === 1) {
              out.push(rowIndex);
            }
          }
          return out;
        }
        highlightCheckedRows() {
          this.getCheckedRows().map((rowIndex) => this.checkRow(rowIndex, true));
        }
        checkRow(rowIndex, toggle) {
          const value = toggle ? 1 : 0;
          const selector = (rowIndex2) => `.dt-cell--0-${rowIndex2} [type="checkbox"]`;
          this.checkMap[rowIndex] = value;
          $2.each(selector(rowIndex), this.bodyScrollable).map((input) => {
            input.checked = toggle;
          });
          this.highlightRow(rowIndex, toggle);
          this.showCheckStatus();
          this.fireEvent("onCheckRow", this.datamanager.getRow(rowIndex));
        }
        checkAll(toggle) {
          const value = toggle ? 1 : 0;
          if (toggle) {
            this.checkMap = Array.from(Array(this.getTotalRows())).map((c) => value);
          } else {
            this.checkMap = [];
          }
          $2.each('.dt-cell--col-0 [type="checkbox"]', this.bodyScrollable).map((input) => {
            input.checked = toggle;
          });
          this.highlightAll(toggle);
          this.showCheckStatus();
          this.fireEvent("onCheckRow");
        }
        showCheckStatus() {
          if (!this.options.checkedRowStatus)
            return;
          const checkedRows = this.getCheckedRows();
          const count = checkedRows.length;
          if (count > 0) {
            let message = this.instance.translate("{count} rows selected", {
              count
            });
            this.bodyRenderer.showToastMessage(message);
          } else {
            this.bodyRenderer.clearToastMessage();
          }
        }
        highlightRow(rowIndex, toggle = true) {
          const $row = this.getRow$(rowIndex);
          if (!$row)
            return;
          if (!toggle && this.bodyScrollable.classList.contains("dt-scrollable--highlight-all")) {
            $row.classList.add("dt-row--unhighlight");
            return;
          }
          if (toggle && $row.classList.contains("dt-row--unhighlight")) {
            $row.classList.remove("dt-row--unhighlight");
          }
          this._highlightedRows = this._highlightedRows || {};
          if (toggle) {
            $row.classList.add("dt-row--highlight");
            this._highlightedRows[rowIndex] = $row;
          } else {
            $row.classList.remove("dt-row--highlight");
            delete this._highlightedRows[rowIndex];
          }
        }
        highlightAll(toggle = true) {
          if (toggle) {
            this.bodyScrollable.classList.add("dt-scrollable--highlight-all");
          } else {
            this.bodyScrollable.classList.remove("dt-scrollable--highlight-all");
            for (const rowIndex in this._highlightedRows) {
              const $row = this._highlightedRows[rowIndex];
              $row.classList.remove("dt-row--highlight");
            }
            this._highlightedRows = {};
          }
        }
        showRows(rowIndices) {
          rowIndices = ensureArray(rowIndices);
          const rows = rowIndices.map((rowIndex) => this.datamanager.getRow(rowIndex));
          this.bodyRenderer.renderRows(rows);
        }
        showAllRows() {
          const rowIndices = this.datamanager.getAllRowIndices();
          this.showRows(rowIndices);
        }
        getChildrenToShowForNode(rowIndex) {
          const row = this.datamanager.getRow(rowIndex);
          row.meta.isTreeNodeClose = false;
          return this.datamanager.getImmediateChildren(rowIndex);
        }
        openSingleNode(rowIndex) {
          const childrenToShow = this.getChildrenToShowForNode(rowIndex);
          const visibleRowIndices = this.bodyRenderer.visibleRowIndices;
          const rowsToShow = uniq$1([...childrenToShow, ...visibleRowIndices]).sort(numberSortAsc);
          this.showRows(rowsToShow);
        }
        getChildrenToHideForNode(rowIndex) {
          const row = this.datamanager.getRow(rowIndex);
          row.meta.isTreeNodeClose = true;
          const rowsToHide = this.datamanager.getChildren(rowIndex);
          rowsToHide.forEach((rowIndex2) => {
            const row2 = this.datamanager.getRow(rowIndex2);
            if (!row2.meta.isLeaf) {
              row2.meta.isTreeNodeClose = true;
            }
          });
          return rowsToHide;
        }
        closeSingleNode(rowIndex) {
          const rowsToHide = this.getChildrenToHideForNode(rowIndex);
          const visibleRows = this.bodyRenderer.visibleRowIndices;
          const rowsToShow = visibleRows.filter((rowIndex2) => !rowsToHide.includes(rowIndex2)).sort(numberSortAsc);
          this.showRows(rowsToShow);
        }
        expandAllNodes() {
          let rows = this.datamanager.getRows();
          let rootNodes = rows.filter((row) => !row.meta.isLeaf);
          const childrenToShow = rootNodes.map((row) => this.getChildrenToShowForNode(row.meta.rowIndex)).flat();
          const visibleRowIndices = this.bodyRenderer.visibleRowIndices;
          const rowsToShow = uniq$1([...childrenToShow, ...visibleRowIndices]).sort(numberSortAsc);
          this.showRows(rowsToShow);
        }
        collapseAllNodes() {
          let rows = this.datamanager.getRows();
          let rootNodes = rows.filter((row) => row.meta.indent === 0);
          const rowsToHide = rootNodes.map((row) => this.getChildrenToHideForNode(row.meta.rowIndex)).flat();
          const visibleRows = this.bodyRenderer.visibleRowIndices;
          const rowsToShow = visibleRows.filter((rowIndex) => !rowsToHide.includes(rowIndex)).sort(numberSortAsc);
          this.showRows(rowsToShow);
        }
        setTreeDepth(depth) {
          let rows = this.datamanager.getRows();
          const rowsToOpen = rows.filter((row) => row.meta.indent < depth);
          const rowsToClose = rows.filter((row) => row.meta.indent >= depth);
          const rowsToHide = rowsToClose.filter((row) => row.meta.indent > depth);
          rowsToClose.forEach((row) => {
            if (!row.meta.isLeaf) {
              row.meta.isTreeNodeClose = true;
            }
          });
          rowsToOpen.forEach((row) => {
            if (!row.meta.isLeaf) {
              row.meta.isTreeNodeClose = false;
            }
          });
          const rowsToShow = rows.filter((row) => !rowsToHide.includes(row)).map((row) => row.meta.rowIndex).sort(numberSortAsc);
          this.showRows(rowsToShow);
        }
        getRow$(rowIndex) {
          return $2(this.selector(rowIndex), this.bodyScrollable);
        }
        getTotalRows() {
          return this.datamanager.getRowCount();
        }
        getFirstRowIndex() {
          return 0;
        }
        getLastRowIndex() {
          return this.datamanager.getRowCount() - 1;
        }
        scrollToRow(rowIndex) {
          rowIndex = +rowIndex;
          this._lastScrollTo = this._lastScrollTo || 0;
          const $row = this.getRow$(rowIndex);
          if ($2.inViewport($row, this.bodyScrollable))
            return;
          const {
            height
          } = $row.getBoundingClientRect();
          const {
            top,
            bottom
          } = this.bodyScrollable.getBoundingClientRect();
          const rowsInView = Math.floor((bottom - top) / height);
          let offset = 0;
          if (rowIndex > this._lastScrollTo) {
            offset = height * (rowIndex + 1 - rowsInView);
          } else {
            offset = height * (rowIndex + 1 - 1);
          }
          this._lastScrollTo = rowIndex;
          $2.scrollTop(this.bodyScrollable, offset);
        }
        getRowHTML(row, props) {
          const dataAttr = makeDataAttributeString(props);
          let rowIdentifier = props.rowIndex;
          if (props.isFilter) {
            row = row.map((cell) => Object.assign({}, cell, {
              content: this.getFilterInput({
                colIndex: cell.colIndex,
                name: cell.name
              }),
              isFilter: 1,
              isHeader: void 0,
              editable: false
            }));
            rowIdentifier = "filter";
          }
          if (props.isHeader) {
            rowIdentifier = "header";
          }
          return `
            <div class="dt-row dt-row-${rowIdentifier}" ${dataAttr}>
                ${row.map((cell) => this.cellmanager.getCellHTML(cell)).join("")}
            </div>
        `;
        }
        getFilterInput(props) {
          let title = `title="Filter based on ${props.name || "Index"}"`;
          const dataAttr = makeDataAttributeString(props);
          return `<input class="dt-filter dt-input" type="text" ${dataAttr} tabindex="1" 
            ${props.colIndex === 0 ? "disabled" : title} />`;
        }
        selector(rowIndex) {
          return `.dt-row-${rowIndex}`;
        }
      };
      var hyperlist = createCommonjsModule(function(module2, exports2) {
        (function(f) {
          {
            module2.exports = f();
          }
        })(function() {
          return function e(t, n, r) {
            function s(o2, u) {
              if (!n[o2]) {
                if (!t[o2]) {
                  var a = typeof commonjsRequire == "function" && commonjsRequire;
                  if (!u && a)
                    return a(o2, true);
                  if (i)
                    return i(o2, true);
                  var f = new Error("Cannot find module '" + o2 + "'");
                  throw f.code = "MODULE_NOT_FOUND", f;
                }
                var l = n[o2] = { exports: {} };
                t[o2][0].call(l.exports, function(e2) {
                  var n2 = t[o2][1][e2];
                  return s(n2 ? n2 : e2);
                }, l, l.exports, e, t, n, r);
              }
              return n[o2].exports;
            }
            var i = typeof commonjsRequire == "function" && commonjsRequire;
            for (var o = 0; o < r.length; o++)
              s(r[o]);
            return s;
          }({ 1: [function(_dereq_, module3, exports3) {
            Object.defineProperty(exports3, "__esModule", {
              value: true
            });
            var _createClass = function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor)
                    descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                  defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                  defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            var defaultConfig = {
              width: "100%",
              height: "100%"
            };
            var isNumber2 = function isNumber3(input) {
              return Number(input) === Number(input);
            };
            var HyperList2 = function() {
              _createClass(HyperList3, null, [{
                key: "create",
                value: function create(element, userProvidedConfig) {
                  return new HyperList3(element, userProvidedConfig);
                }
              }, {
                key: "mergeStyle",
                value: function mergeStyle(element, style) {
                  for (var i in style) {
                    if (element.style[i] !== style[i]) {
                      element.style[i] = style[i];
                    }
                  }
                }
              }, {
                key: "getMaxBrowserHeight",
                value: function getMaxBrowserHeight() {
                  var wrapper = document.createElement("div");
                  var fixture = document.createElement("div");
                  HyperList3.mergeStyle(wrapper, { position: "absolute", height: "1px", opacity: 0 });
                  HyperList3.mergeStyle(fixture, { height: "1e7px" });
                  wrapper.appendChild(fixture);
                  document.body.appendChild(wrapper);
                  var maxElementHeight = fixture.offsetHeight;
                  document.body.removeChild(wrapper);
                  return maxElementHeight;
                }
              }]);
              function HyperList3(element, userProvidedConfig) {
                var _this = this;
                _classCallCheck(this, HyperList3);
                this._config = {};
                this._lastRepaint = null;
                this._maxElementHeight = HyperList3.getMaxBrowserHeight();
                this.refresh(element, userProvidedConfig);
                var config2 = this._config;
                var render = function render2() {
                  var scrollTop = _this._getScrollPosition();
                  var lastRepaint = _this._lastRepaint;
                  _this._renderAnimationFrame = window.requestAnimationFrame(render2);
                  if (scrollTop === lastRepaint) {
                    return;
                  }
                  if (!lastRepaint || Math.abs(scrollTop - lastRepaint) > _this._averageHeight) {
                    var rendered = _this._renderChunk();
                    _this._lastRepaint = scrollTop;
                    if (rendered !== false && typeof config2.afterRender === "function") {
                      config2.afterRender();
                    }
                  }
                };
                render();
              }
              _createClass(HyperList3, [{
                key: "destroy",
                value: function destroy() {
                  window.cancelAnimationFrame(this._renderAnimationFrame);
                }
              }, {
                key: "refresh",
                value: function refresh(element, userProvidedConfig) {
                  var _this2 = this;
                  Object.assign(this._config, defaultConfig, userProvidedConfig);
                  if (!element || element.nodeType !== 1) {
                    throw new Error("HyperList requires a valid DOM Node container");
                  }
                  this._element = element;
                  var config2 = this._config;
                  var scroller = this._scroller || config2.scroller || document.createElement(config2.scrollerTagName || "tr");
                  if (typeof config2.useFragment !== "boolean") {
                    this._config.useFragment = true;
                  }
                  if (!config2.generate) {
                    throw new Error("Missing required `generate` function");
                  }
                  if (!isNumber2(config2.total)) {
                    throw new Error("Invalid required `total` value, expected number");
                  }
                  if (!Array.isArray(config2.itemHeight) && !isNumber2(config2.itemHeight)) {
                    throw new Error("\n        Invalid required `itemHeight` value, expected number or array\n      ".trim());
                  } else if (isNumber2(config2.itemHeight)) {
                    this._itemHeights = Array(config2.total).fill(config2.itemHeight);
                  } else {
                    this._itemHeights = config2.itemHeight;
                  }
                  Object.keys(defaultConfig).filter(function(prop) {
                    return prop in config2;
                  }).forEach(function(prop) {
                    var value = config2[prop];
                    var isValueNumber = isNumber2(value);
                    var isValuePercent = isValueNumber ? false : value.slice(-1) === "%";
                    if (value && typeof value !== "string" && typeof value !== "number") {
                      var msg = "Invalid optional `" + prop + "`, expected string or number";
                      throw new Error(msg);
                    } else if (isValueNumber) {
                      config2[prop] = value + "px";
                    }
                    if (prop !== "height") {
                      return;
                    }
                    var numberValue = isValueNumber ? value : parseInt(value.replace(/px|%/, ""), 10);
                    if (isValuePercent) {
                      _this2._containerHeight = window.innerHeight * numberValue / 100;
                    } else {
                      _this2._containerHeight = isNumber2(value) ? value : numberValue;
                    }
                  });
                  var elementStyle = {
                    width: "" + config2.width,
                    height: "" + config2.height,
                    overflow: "auto",
                    position: "relative"
                  };
                  HyperList3.mergeStyle(element, elementStyle);
                  var scrollerHeight = config2.itemHeight * config2.total;
                  var maxElementHeight = this._maxElementHeight;
                  if (scrollerHeight > maxElementHeight) {
                    console.warn(["HyperList: The maximum element height", maxElementHeight + "px has", "been exceeded; please reduce your item height."].join(" "));
                  }
                  var scrollerStyle = {
                    opacity: "0",
                    position: "absolute",
                    width: "1px",
                    height: scrollerHeight + "px"
                  };
                  HyperList3.mergeStyle(scroller, scrollerStyle);
                  if (!this._scroller) {
                    element.appendChild(scroller);
                  }
                  this._scroller = scroller;
                  this._scrollHeight = this._computeScrollHeight();
                  this._itemPositions = this._itemPositions || Array(config2.total).fill(0);
                  this._computePositions(0);
                  this._renderChunk(this._lastRepaint !== null);
                  if (typeof config2.afterRender === "function") {
                    config2.afterRender();
                  }
                }
              }, {
                key: "_getRow",
                value: function _getRow(i) {
                  var config2 = this._config;
                  var item = config2.generate(i);
                  var height = item.height;
                  if (height !== void 0 && isNumber2(height)) {
                    item = item.element;
                    if (height !== this._itemHeights) {
                      this._itemHeights[i] = height;
                      this._computePositions(i);
                      this._scrollHeight = this._computeScrollHeight(i);
                    }
                  } else {
                    height = this._itemHeights[i];
                  }
                  if (!item || item.nodeType !== 1) {
                    throw new Error("Generator did not return a DOM Node for index: " + i);
                  }
                  var oldClass = item.getAttribute("class") || "";
                  item.setAttribute("class", oldClass + " " + (config2.rowClassName || "vrow"));
                  var top = this._itemPositions[i];
                  HyperList3.mergeStyle(item, {
                    position: "absolute",
                    top: top + "px"
                  });
                  return item;
                }
              }, {
                key: "_getScrollPosition",
                value: function _getScrollPosition() {
                  var config2 = this._config;
                  if (typeof config2.overrideScrollPosition === "function") {
                    return config2.overrideScrollPosition();
                  }
                  return this._element.scrollTop;
                }
              }, {
                key: "_renderChunk",
                value: function _renderChunk(force) {
                  var config2 = this._config;
                  var element = this._element;
                  var scrollTop = this._getScrollPosition();
                  var total = config2.total;
                  var from = config2.reverse ? this._getReverseFrom(scrollTop) : this._getFrom(scrollTop) - 1;
                  if (from < 0 || from - this._screenItemsLen < 0) {
                    from = 0;
                  }
                  if (!force && this._lastFrom === from) {
                    return false;
                  }
                  this._lastFrom = from;
                  var to = from + this._cachedItemsLen;
                  if (to > total || to + this._cachedItemsLen > total) {
                    to = total;
                  }
                  var fragment = config2.useFragment ? document.createDocumentFragment() : [];
                  var scroller = this._scroller;
                  fragment[config2.useFragment ? "appendChild" : "push"](scroller);
                  for (var i = from; i < to; i++) {
                    var row = this._getRow(i);
                    fragment[config2.useFragment ? "appendChild" : "push"](row);
                  }
                  if (config2.applyPatch) {
                    return config2.applyPatch(element, fragment);
                  }
                  element.innerHTML = "";
                  element.appendChild(fragment);
                }
              }, {
                key: "_computePositions",
                value: function _computePositions() {
                  var from = arguments.length <= 0 || arguments[0] === void 0 ? 1 : arguments[0];
                  var config2 = this._config;
                  var total = config2.total;
                  var reverse = config2.reverse;
                  if (from < 1 && !reverse) {
                    from = 1;
                  }
                  for (var i = from; i < total; i++) {
                    if (reverse) {
                      if (i === 0) {
                        this._itemPositions[0] = this._scrollHeight - this._itemHeights[0];
                      } else {
                        this._itemPositions[i] = this._itemPositions[i - 1] - this._itemHeights[i];
                      }
                    } else {
                      this._itemPositions[i] = this._itemHeights[i - 1] + this._itemPositions[i - 1];
                    }
                  }
                }
              }, {
                key: "_computeScrollHeight",
                value: function _computeScrollHeight() {
                  var _this3 = this;
                  var config2 = this._config;
                  var total = config2.total;
                  var scrollHeight = this._itemHeights.reduce(function(a, b) {
                    return a + b;
                  }, 0);
                  HyperList3.mergeStyle(this._scroller, {
                    opacity: 0,
                    position: "absolute",
                    width: "1px",
                    height: scrollHeight + "px"
                  });
                  var sortedItemHeights = this._itemHeights.slice(0).sort(function(a, b) {
                    return a - b;
                  });
                  var middle = Math.floor(total / 2);
                  var averageHeight = total % 2 === 0 ? (sortedItemHeights[middle] + sortedItemHeights[middle - 1]) / 2 : sortedItemHeights[middle];
                  var containerHeight = this._element.clientHeight ? this._element.clientHeight : this._containerHeight;
                  this._screenItemsLen = Math.ceil(containerHeight / averageHeight);
                  this._containerHeight = containerHeight;
                  this._cachedItemsLen = Math.max(this._cachedItemsLen || 0, this._screenItemsLen * 3);
                  this._averageHeight = averageHeight;
                  if (config2.reverse) {
                    window.requestAnimationFrame(function() {
                      _this3._element.scrollTop = scrollHeight;
                    });
                  }
                  return scrollHeight;
                }
              }, {
                key: "_getFrom",
                value: function _getFrom(scrollTop) {
                  var i = 0;
                  while (this._itemPositions[i] < scrollTop) {
                    i++;
                  }
                  return i;
                }
              }, {
                key: "_getReverseFrom",
                value: function _getReverseFrom(scrollTop) {
                  var i = this._config.total - 1;
                  while (i > 0 && this._itemPositions[i] < scrollTop + this._containerHeight) {
                    i--;
                  }
                  return i;
                }
              }]);
              return HyperList3;
            }();
            exports3.default = HyperList2;
            module3.exports = exports3["default"];
          }, {}] }, {}, [1])(1);
        });
      });
      var HyperList = unwrapExports(hyperlist);
      var BodyRenderer = class {
        constructor(instance) {
          this.instance = instance;
          this.options = instance.options;
          this.datamanager = instance.datamanager;
          this.rowmanager = instance.rowmanager;
          this.cellmanager = instance.cellmanager;
          this.bodyScrollable = instance.bodyScrollable;
          this.footer = this.instance.footer;
          this.log = instance.log;
        }
        renderRows(rows) {
          this.visibleRows = rows;
          this.visibleRowIndices = rows.map((row) => row.meta.rowIndex);
          if (rows.length === 0) {
            this.bodyScrollable.innerHTML = this.getNoDataHTML();
            return;
          }
          const rowViewOrder = this.datamanager.rowViewOrder.map((index) => {
            if (this.visibleRowIndices.includes(index)) {
              return index;
            }
            return null;
          }).filter((index) => index !== null);
          const computedStyle = getComputedStyle(this.bodyScrollable);
          let config2 = {
            width: computedStyle.width,
            height: computedStyle.height,
            itemHeight: this.options.cellHeight,
            total: rows.length,
            generate: (index) => {
              const el = document.createElement("div");
              const rowIndex = rowViewOrder[index];
              const row = this.datamanager.getRow(rowIndex);
              const rowHTML = this.rowmanager.getRowHTML(row, row.meta);
              el.innerHTML = rowHTML;
              return el.children[0];
            },
            afterRender: () => {
              this.restoreState();
            }
          };
          if (!this.hyperlist) {
            this.hyperlist = new HyperList(this.bodyScrollable, config2);
          } else {
            this.hyperlist.refresh(this.bodyScrollable, config2);
          }
          this.renderFooter();
        }
        render() {
          const rows = this.datamanager.getRowsForView();
          this.renderRows(rows);
          this.instance.setDimensions();
        }
        renderFooter() {
          if (!this.options.showTotalRow)
            return;
          const totalRow = this.getTotalRow();
          let html = this.rowmanager.getRowHTML(totalRow, { isTotalRow: 1, rowIndex: "totalRow" });
          this.footer.innerHTML = html;
        }
        getTotalRow() {
          const columns = this.datamanager.getColumns();
          const totalRowTemplate = columns.map((col) => {
            let content = null;
            if (["_rowIndex", "_checkbox"].includes(col.id)) {
              content = "";
            }
            return {
              content,
              isTotalRow: 1,
              colIndex: col.colIndex,
              column: col
            };
          });
          const totalRow = totalRowTemplate.map((cell, i) => {
            if (cell.content === "")
              return cell;
            if (this.options.hooks.columnTotal) {
              const columnValues = this.visibleRows.map((row) => row[i].content);
              const result = this.options.hooks.columnTotal.call(this.instance, columnValues, cell);
              if (result != null) {
                cell.content = result;
                return cell;
              }
            }
            cell.content = this.visibleRows.reduce((acc, prevRow) => {
              const prevCell = prevRow[i];
              if (typeof prevCell.content === "number") {
                if (acc == null)
                  acc = 0;
                return acc + prevCell.content;
              }
              return acc;
            }, cell.content);
            return cell;
          });
          return totalRow;
        }
        restoreState() {
          this.rowmanager.highlightCheckedRows();
          this.cellmanager.selectAreaOnClusterChanged();
          this.cellmanager.focusCellOnClusterChanged();
        }
        showToastMessage(message, hideAfter) {
          this.instance.toastMessage.innerHTML = this.getToastMessageHTML(message);
          if (hideAfter) {
            setTimeout(() => {
              this.clearToastMessage();
            }, hideAfter * 1e3);
          }
        }
        clearToastMessage() {
          this.instance.toastMessage.innerHTML = "";
        }
        getNoDataHTML() {
          return `<div class="dt-scrollable__no-data">${this.options.noDataMessage}</div>`;
        }
        getToastMessageHTML(message) {
          return `<span class="dt-toast__message">${message}</span>`;
        }
      };
      var Style = class {
        constructor(instance) {
          this.instance = instance;
          linkProperties(this, this.instance, [
            "options",
            "datamanager",
            "columnmanager",
            "header",
            "footer",
            "bodyScrollable",
            "datatableWrapper",
            "getColumn",
            "bodyRenderer"
          ]);
          this.scopeClass = "dt-instance-" + instance.constructor.instances;
          instance.datatableWrapper.classList.add(this.scopeClass);
          const styleEl = document.createElement("style");
          instance.wrapper.insertBefore(styleEl, instance.datatableWrapper);
          this.styleEl = styleEl;
          this.bindResizeWindow();
          this.bindScrollHeader();
        }
        get stylesheet() {
          return this.styleEl.sheet;
        }
        bindResizeWindow() {
          this.onWindowResize = this.onWindowResize.bind(this);
          this.onWindowResize = throttle$1(this.onWindowResize, 300);
          if (this.options.layout === "fluid") {
            $2.on(window, "resize", this.onWindowResize);
          }
        }
        bindScrollHeader() {
          this._settingHeaderPosition = false;
          $2.on(this.bodyScrollable, "scroll", (e) => {
            if (this._settingHeaderPosition)
              return;
            this._settingHeaderPosition = true;
            requestAnimationFrame(() => {
              const left = -e.target.scrollLeft;
              $2.style(this.header, {
                transform: `translateX(${left}px)`
              });
              $2.style(this.footer, {
                transform: `translateX(${left}px)`
              });
              this._settingHeaderPosition = false;
            });
          });
        }
        onWindowResize() {
          this.distributeRemainingWidth();
          this.refreshColumnWidth();
          this.setBodyStyle();
        }
        destroy() {
          this.styleEl.remove();
          $2.off(window, "resize", this.onWindowResize);
        }
        setStyle(selector, styleObject) {
          if (selector.includes(",")) {
            selector.split(",").map((s) => s.trim()).forEach((selector2) => {
              this.setStyle(selector2, styleObject);
            });
            return;
          }
          selector = selector.trim();
          if (!selector)
            return;
          this._styleRulesMap = this._styleRulesMap || {};
          const prefixedSelector = this._getPrefixedSelector(selector);
          if (this._styleRulesMap[prefixedSelector]) {
            this.removeStyle(selector);
            styleObject = Object.assign({}, this._styleRulesMap[prefixedSelector], styleObject);
          }
          const styleString = this._getRuleString(styleObject);
          const ruleString = `${prefixedSelector} { ${styleString} }`;
          this._styleRulesMap[prefixedSelector] = styleObject;
          this.stylesheet.insertRule(ruleString);
        }
        removeStyle(selector) {
          if (selector.includes(",")) {
            selector.split(",").map((s) => s.trim()).forEach((selector2) => {
              this.removeStyle(selector2);
            });
            return;
          }
          selector = selector.trim();
          if (!selector)
            return;
          const prefixedSelector = this._getPrefixedSelector(selector);
          const index = Array.from(this.stylesheet.cssRules).findIndex((rule) => rule.selectorText === prefixedSelector);
          if (index === -1)
            return;
          this.stylesheet.deleteRule(index);
        }
        _getPrefixedSelector(selector) {
          return `.${this.scopeClass} ${selector}`;
        }
        _getRuleString(styleObject) {
          return Object.keys(styleObject).map((prop) => {
            let dashed = prop;
            if (!prop.includes("-")) {
              dashed = camelCaseToDash(prop);
            }
            return `${dashed}:${styleObject[prop]};`;
          }).join("");
        }
        setDimensions() {
          this.setCellHeight();
          this.setupMinWidth();
          this.setupNaturalColumnWidth();
          this.setupColumnWidth();
          this.distributeRemainingWidth();
          this.setColumnStyle();
          this.setBodyStyle();
        }
        setCellHeight() {
          this.setStyle(".dt-cell", {
            height: this.options.cellHeight + "px"
          });
        }
        setupMinWidth() {
          $2.each(".dt-cell--header", this.header).map((col) => {
            const { colIndex } = $2.data(col);
            const column = this.getColumn(colIndex);
            if (!column.minWidth) {
              const width = $2.style($2(".dt-cell__content", col), "width");
              column.minWidth = width;
            }
          });
        }
        setupNaturalColumnWidth() {
          if (!$2(".dt-row"))
            return;
          $2.each(".dt-row-header .dt-cell", this.header).map(($headerCell) => {
            const { colIndex } = $2.data($headerCell);
            const column = this.datamanager.getColumn(colIndex);
            let width = $2.style($2(".dt-cell__content", $headerCell), "width");
            if (typeof width === "number" && width >= this.options.minimumColumnWidth) {
              column.naturalWidth = width;
            } else {
              column.naturalWidth = this.options.minimumColumnWidth;
            }
          });
          $2.each(".dt-row-0 .dt-cell", this.bodyScrollable).map(($cell) => {
            const {
              colIndex
            } = $2.data($cell);
            const column = this.datamanager.getColumn(colIndex);
            let naturalWidth = $2.style($2(".dt-cell__content", $cell), "width");
            if (typeof naturalWidth === "number" && naturalWidth >= column.naturalWidth) {
              column.naturalWidth = naturalWidth;
            } else {
              column.naturalWidth = column.naturalWidth;
            }
          });
        }
        setupColumnWidth() {
          if (this.options.layout === "ratio") {
            let totalWidth = $2.style(this.datatableWrapper, "width");
            if (this.options.serialNoColumn) {
              const rowIndexColumn = this.datamanager.getColumnById("_rowIndex");
              totalWidth = totalWidth - rowIndexColumn.width - 1;
            }
            if (this.options.checkboxColumn) {
              const rowIndexColumn = this.datamanager.getColumnById("_checkbox");
              totalWidth = totalWidth - rowIndexColumn.width - 1;
            }
            const totalParts = this.datamanager.getColumns().map((column) => {
              if (column.id === "_rowIndex" || column.id === "_checkbox") {
                return 0;
              }
              if (!column.width) {
                column.width = 1;
              }
              column.ratioWidth = parseInt(column.width, 10);
              return column.ratioWidth;
            }).reduce((a, c) => a + c);
            const onePart = totalWidth / totalParts;
            this.datamanager.getColumns().map((column) => {
              if (column.id === "_rowIndex" || column.id === "_checkbox")
                return;
              column.width = Math.floor(onePart * column.ratioWidth) - 1;
            });
          } else {
            this.datamanager.getColumns().map((column) => {
              if (!column.width) {
                column.width = column.naturalWidth;
              }
              if (column.id === "_rowIndex") {
                column.width = this.getRowIndexColumnWidth();
              }
              if (column.width < this.options.minimumColumnWidth) {
                column.width = this.options.minimumColumnWidth;
              }
            });
          }
        }
        distributeRemainingWidth() {
          if (this.options.layout !== "fluid")
            return;
          const wrapperWidth = $2.style(this.instance.datatableWrapper, "width");
          let firstRow = $2(".dt-row", this.bodyScrollable);
          let firstRowWidth = wrapperWidth;
          if (!firstRow) {
            let headerRow = $2(".dt-row", this.instance.header);
            let cellWidths = Array.from(headerRow.children).map((cell) => cell.offsetWidth);
            firstRowWidth = cellWidths.reduce((sum, a) => sum + a, 0);
          } else {
            firstRowWidth = $2.style(firstRow, "width");
          }
          const resizableColumns = this.datamanager.getColumns().filter((col) => col.resizable);
          const deltaWidth = (wrapperWidth - firstRowWidth) / resizableColumns.length;
          resizableColumns.map((col) => {
            const width = $2.style(this.getColumnHeaderElement(col.colIndex), "width");
            let finalWidth = Math.floor(width + deltaWidth) - 2;
            this.datamanager.updateColumn(col.colIndex, {
              width: finalWidth
            });
          });
        }
        setColumnStyle() {
          this.datamanager.getColumns().map((column) => {
            if (!column.align) {
              column.align = "left";
            }
            if (!["left", "center", "right"].includes(column.align)) {
              column.align = "left";
            }
            this.setStyle(`.dt-cell--col-${column.colIndex}`, {
              "text-align": column.align
            });
            this.columnmanager.setColumnHeaderWidth(column.colIndex);
            this.columnmanager.setColumnWidth(column.colIndex);
          });
        }
        refreshColumnWidth() {
          this.datamanager.getColumns().map((column) => {
            this.columnmanager.setColumnHeaderWidth(column.colIndex);
            this.columnmanager.setColumnWidth(column.colIndex);
          });
        }
        setBodyStyle() {
          const bodyWidth = $2.style(this.datatableWrapper, "width");
          const firstRow = $2(".dt-row", this.bodyScrollable);
          if (!firstRow)
            return;
          const rowWidth = $2.style(firstRow, "width");
          let width = bodyWidth > rowWidth ? rowWidth : bodyWidth;
          $2.style(this.bodyScrollable, {
            width: width + "px"
          });
          $2.removeStyle(this.bodyScrollable, "height");
          let bodyHeight = $2.getStyle(this.bodyScrollable, "height");
          const scrollHeight = (this.bodyRenderer.hyperlist || {})._scrollHeight || Infinity;
          const hasHorizontalOverflow = $2.hasHorizontalOverflow(this.bodyScrollable);
          let height;
          if (scrollHeight < bodyHeight) {
            height = scrollHeight;
            if (hasHorizontalOverflow) {
              height += $2.scrollbarSize();
            }
            $2.style(this.bodyScrollable, {
              height: height + "px"
            });
          }
          const verticalOverflow = this.bodyScrollable.scrollHeight - this.bodyScrollable.offsetHeight;
          if (verticalOverflow < $2.scrollbarSize()) {
            $2.style(this.bodyScrollable, {
              overflowY: "hidden"
            });
          }
          if (this.options.layout === "fluid") {
            $2.style(this.bodyScrollable, {
              overflowX: "hidden"
            });
          }
        }
        getColumnHeaderElement(colIndex) {
          colIndex = +colIndex;
          if (colIndex < 0)
            return null;
          return $2(`.dt-cell--col-${colIndex}`, this.header);
        }
        getRowIndexColumnWidth() {
          const rowCount = this.datamanager.getRowCount();
          const padding = 22;
          return $2.measureTextWidth(rowCount + "") + padding;
        }
      };
      var KEYCODES = {
        13: "enter",
        91: "meta",
        16: "shift",
        17: "ctrl",
        18: "alt",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        9: "tab",
        27: "esc",
        67: "c",
        70: "f",
        86: "v"
      };
      var Keyboard = class {
        constructor(element) {
          this.listeners = {};
          $2.on(element, "keydown", this.handler.bind(this));
        }
        handler(e) {
          let key = KEYCODES[e.keyCode];
          if (e.shiftKey && key !== "shift") {
            key = "shift+" + key;
          }
          if (e.ctrlKey && key !== "ctrl" || e.metaKey && key !== "meta") {
            key = "ctrl+" + key;
          }
          const listeners = this.listeners[key];
          if (listeners && listeners.length > 0) {
            for (let listener of listeners) {
              const preventBubbling = listener(e);
              if (preventBubbling === void 0 || preventBubbling === true) {
                e.preventDefault();
              }
            }
          }
        }
        on(key, listener) {
          const keys = key.split(",").map((k) => k.trim());
          keys.map((key2) => {
            this.listeners[key2] = this.listeners[key2] || [];
            this.listeners[key2].push(listener);
          });
        }
      };
      var en = {
        "Sort Ascending": "Sort Ascending",
        "Sort Descending": "Sort Descending",
        "Reset sorting": "Reset sorting",
        "Remove column": "Remove column",
        "No Data": "No Data",
        "{count} cells copied": { "1": "{count} cell copied", "default": "{count} cells copied" },
        "{count} rows selected": { "1": "{count} row selected", "default": "{count} rows selected" }
      };
      var de = {
        "Sort Ascending": "Aufsteigend sortieren",
        "Sort Descending": "Absteigend sortieren",
        "Reset sorting": "Sortierung zur\xFCcksetzen",
        "Remove column": "Spalte entfernen",
        "No Data": "Keine Daten",
        "{count} cells copied": { "1": "{count} Zelle kopiert", "default": "{count} Zellen kopiert" },
        "{count} rows selected": { "1": "{count} Zeile ausgew\xE4hlt", "default": "{count} Zeilen ausgew\xE4hlt" }
      };
      var fr = {
        "Sort Ascending": "Trier par ordre croissant",
        "Sort Descending": "Trier par ordre d\xE9croissant",
        "Reset sorting": "R\xE9initialiser le tri",
        "Remove column": "Supprimer colonne",
        "No Data": "Pas de donn\xE9es",
        "{count} cells copied": { "1": "{count} cellule copi\xE9e", "default": "{count} cellules copi\xE9es" },
        "{count} rows selected": { "1": "{count} ligne s\xE9lectionn\xE9e", "default": "{count} lignes s\xE9lectionn\xE9es" }
      };
      var it = {
        "Sort Ascending": "Ordinamento ascendente",
        "Sort Descending": "Ordinamento decrescente",
        "Reset sorting": "Azzeramento ordinamento",
        "Remove column": "Rimuovi colonna",
        "No Data": "Nessun dato",
        "{count} cells copied": { "1": "Copiato {count} cella", "default": "{count} celle copiate" },
        "{count} rows selected": { "1": "{count} linea selezionata", "default": "{count} linee selezionate" }
      };
      function getTranslations() {
        return {
          en,
          de,
          fr,
          it
        };
      }
      var TranslationManager = class {
        constructor(language) {
          this.language = language;
          this.translations = getTranslations();
        }
        addTranslations(translations) {
          this.translations = Object.assign(this.translations, translations);
        }
        translate(sourceText, args) {
          let translation = this.translations[this.language] && this.translations[this.language][sourceText] || sourceText;
          if (typeof translation === "object") {
            translation = args && args.count ? this.getPluralizedTranslation(translation, args.count) : sourceText;
          }
          return format(translation, args || {});
        }
        getPluralizedTranslation(translations, count) {
          return translations[count] || translations["default"];
        }
      };
      function filterRows(rows, filters) {
        let filteredRowIndices = [];
        if (Object.keys(filters).length === 0) {
          return rows.map((row) => row.meta.rowIndex);
        }
        for (let colIndex in filters) {
          const keyword = filters[colIndex];
          const filteredRows = filteredRowIndices.length ? filteredRowIndices.map((i) => rows[i]) : rows;
          const cells = filteredRows.map((row) => row[colIndex]);
          let filter = guessFilter(keyword);
          let filterMethod = getFilterMethod(filter);
          if (filterMethod) {
            filteredRowIndices = filterMethod(filter.text, cells);
          } else {
            filteredRowIndices = cells.map((cell) => cell.rowIndex);
          }
        }
        return filteredRowIndices;
      }
      function getFilterMethod(filter) {
        const stringCompareValue = (cell) => String(stripHTML(cell.html || "") || cell.content || "").toLowerCase();
        const numberCompareValue = (cell) => parseFloat(cell.content);
        const getCompareValues = (cell, keyword) => {
          if (cell.column.compareValue) {
            const compareValues = cell.column.compareValue(cell, keyword);
            if (compareValues && Array.isArray(compareValues))
              return compareValues;
          }
          const float = numberCompareValue(cell);
          if (!isNaN(float)) {
            return [float, keyword];
          }
          return [stringCompareValue(cell), keyword];
        };
        let filterMethodMap = {
          contains(keyword, cells) {
            return cells.filter((cell) => {
              const hay = stringCompareValue(cell);
              const needle = (keyword || "").toLowerCase();
              return !needle || hay.includes(needle);
            }).map((cell) => cell.rowIndex);
          },
          greaterThan(keyword, cells) {
            return cells.filter((cell) => {
              const [compareValue, keywordValue] = getCompareValues(cell, keyword);
              return compareValue > keywordValue;
            }).map((cell) => cell.rowIndex);
          },
          lessThan(keyword, cells) {
            return cells.filter((cell) => {
              const [compareValue, keywordValue] = getCompareValues(cell, keyword);
              return compareValue < keywordValue;
            }).map((cell) => cell.rowIndex);
          },
          equals(keyword, cells) {
            return cells.filter((cell) => {
              const value = parseFloat(cell.content);
              return value === keyword;
            }).map((cell) => cell.rowIndex);
          },
          notEquals(keyword, cells) {
            return cells.filter((cell) => {
              const value = parseFloat(cell.content);
              return value !== keyword;
            }).map((cell) => cell.rowIndex);
          },
          range(rangeValues, cells) {
            return cells.filter((cell) => {
              const values1 = getCompareValues(cell, rangeValues[0]);
              const values2 = getCompareValues(cell, rangeValues[1]);
              const value = values1[0];
              return value >= values1[1] && value <= values2[1];
            }).map((cell) => cell.rowIndex);
          },
          containsNumber(keyword, cells) {
            return cells.filter((cell) => {
              let number = parseFloat(keyword, 10);
              let string = keyword;
              let hayNumber = numberCompareValue(cell);
              let hayString = stringCompareValue(cell);
              return number === hayNumber || hayString.includes(string);
            }).map((cell) => cell.rowIndex);
          }
        };
        return filterMethodMap[filter.type];
      }
      function guessFilter(keyword = "") {
        if (keyword.length === 0)
          return {};
        let compareString = keyword;
        if ([">", "<", "="].includes(compareString[0])) {
          compareString = keyword.slice(1);
        } else if (compareString.startsWith("!=")) {
          compareString = keyword.slice(2);
        }
        if (keyword.startsWith(">")) {
          if (compareString) {
            return {
              type: "greaterThan",
              text: compareString.trim()
            };
          }
        }
        if (keyword.startsWith("<")) {
          if (compareString) {
            return {
              type: "lessThan",
              text: compareString.trim()
            };
          }
        }
        if (keyword.startsWith("=")) {
          if (isNumber(compareString)) {
            return {
              type: "equals",
              text: Number(keyword.slice(1).trim())
            };
          }
        }
        if (isNumber(compareString)) {
          return {
            type: "containsNumber",
            text: compareString
          };
        }
        if (keyword.startsWith("!=")) {
          if (isNumber(compareString)) {
            return {
              type: "notEquals",
              text: Number(keyword.slice(2).trim())
            };
          }
        }
        if (keyword.split(":").length === 2) {
          compareString = keyword.split(":");
          return {
            type: "range",
            text: compareString.map((v) => v.trim())
          };
        }
        return {
          type: "contains",
          text: compareString.toLowerCase()
        };
      }
      function getDefaultOptions(instance) {
        return {
          columns: [],
          data: [],
          dropdownButton: icons.chevronDown,
          headerDropdown: [
            {
              label: instance.translate("Sort Ascending"),
              action: function(column) {
                this.sortColumn(column.colIndex, "asc");
              }
            },
            {
              label: instance.translate("Sort Descending"),
              action: function(column) {
                this.sortColumn(column.colIndex, "desc");
              }
            },
            {
              label: instance.translate("Reset sorting"),
              action: function(column) {
                this.sortColumn(column.colIndex, "none");
              }
            },
            {
              label: instance.translate("Remove column"),
              action: function(column) {
                this.removeColumn(column.colIndex);
              }
            }
          ],
          events: {
            onRemoveColumn(column) {
            },
            onSwitchColumn(column1, column2) {
            },
            onSortColumn(column) {
            },
            onCheckRow(row) {
            },
            onDestroy() {
            }
          },
          hooks: {
            columnTotal: null
          },
          sortIndicator: {
            asc: "\u2191",
            desc: "\u2193",
            none: ""
          },
          overrideComponents: {},
          filterRows,
          freezeMessage: "",
          getEditor: null,
          serialNoColumn: true,
          checkboxColumn: false,
          clusterize: true,
          logs: false,
          layout: "fixed",
          noDataMessage: instance.translate("No Data"),
          cellHeight: 40,
          minimumColumnWidth: 30,
          inlineFilters: false,
          treeView: false,
          checkedRowStatus: true,
          dynamicRowHeight: false,
          pasteFromClipboard: false,
          showTotalRow: false,
          direction: "ltr",
          disableReorderColumn: false
        };
      }
      var defaultComponents = {
        DataManager,
        CellManager,
        ColumnManager,
        RowManager,
        BodyRenderer,
        Style,
        Keyboard
      };
      var DataTable2 = class {
        constructor(wrapper, options) {
          DataTable2.instances++;
          if (typeof wrapper === "string") {
            wrapper = document.querySelector(wrapper);
          }
          this.wrapper = wrapper;
          if (!(this.wrapper instanceof HTMLElement)) {
            throw new Error("Invalid argument given for `wrapper`");
          }
          this.initializeTranslations(options);
          this.setDefaultOptions();
          this.buildOptions(options);
          this.prepare();
          this.initializeComponents();
          if (this.options.data) {
            this.refresh();
            this.columnmanager.applyDefaultSortOrder();
          }
        }
        initializeTranslations(options) {
          this.language = options.language || "en";
          this.translationManager = new TranslationManager(this.language);
          if (options.translations) {
            this.translationManager.addTranslations(options.translations);
          }
        }
        setDefaultOptions() {
          this.DEFAULT_OPTIONS = getDefaultOptions(this);
        }
        buildOptions(options) {
          this.options = this.options || {};
          this.options = Object.assign({}, this.DEFAULT_OPTIONS, this.options || {}, options);
          options.headerDropdown = options.headerDropdown || [];
          this.options.headerDropdown = [
            ...this.DEFAULT_OPTIONS.headerDropdown,
            ...options.headerDropdown
          ];
          this.events = Object.assign({}, this.DEFAULT_OPTIONS.events, this.options.events || {}, options.events || {});
          this.fireEvent = this.fireEvent.bind(this);
        }
        prepare() {
          this.prepareDom();
          this.unfreeze();
        }
        initializeComponents() {
          let components = Object.assign({}, defaultComponents, this.options.overrideComponents);
          let {
            Style: Style$$1,
            Keyboard: Keyboard$$1,
            DataManager: DataManager$$1,
            RowManager: RowManager$$1,
            ColumnManager: ColumnManager$$1,
            CellManager: CellManager$$1,
            BodyRenderer: BodyRenderer$$1
          } = components;
          this.style = new Style$$1(this);
          this.keyboard = new Keyboard$$1(this.wrapper);
          this.datamanager = new DataManager$$1(this.options);
          this.rowmanager = new RowManager$$1(this);
          this.columnmanager = new ColumnManager$$1(this);
          this.cellmanager = new CellManager$$1(this);
          this.bodyRenderer = new BodyRenderer$$1(this);
        }
        prepareDom() {
          this.wrapper.innerHTML = `
            <div class="datatable" dir="${this.options.direction}">
                <div class="dt-header"></div>
                <div class="dt-scrollable"></div>
                <div class="dt-footer"></div>
                <div class="dt-freeze">
                    <span class="dt-freeze__message">
                        ${this.options.freezeMessage}
                    </span>
                </div>
                <div class="dt-toast"></div>
                <div class="dt-dropdown-container"></div>
                <textarea class="dt-paste-target"></textarea>
            </div>
        `;
          this.datatableWrapper = $2(".datatable", this.wrapper);
          this.header = $2(".dt-header", this.wrapper);
          this.footer = $2(".dt-footer", this.wrapper);
          this.bodyScrollable = $2(".dt-scrollable", this.wrapper);
          this.freezeContainer = $2(".dt-freeze", this.wrapper);
          this.toastMessage = $2(".dt-toast", this.wrapper);
          this.pasteTarget = $2(".dt-paste-target", this.wrapper);
          this.dropdownContainer = $2(".dt-dropdown-container", this.wrapper);
        }
        refresh(data, columns) {
          this.datamanager.init(data, columns);
          this.render();
          this.setDimensions();
        }
        destroy() {
          this.wrapper.innerHTML = "";
          this.style.destroy();
          this.fireEvent("onDestroy");
        }
        appendRows(rows) {
          this.datamanager.appendRows(rows);
          this.rowmanager.refreshRows();
        }
        refreshRow(row, rowIndex) {
          this.rowmanager.refreshRow(row, rowIndex);
        }
        render() {
          this.renderHeader();
          this.renderBody();
        }
        renderHeader() {
          this.columnmanager.renderHeader();
        }
        renderBody() {
          this.bodyRenderer.render();
        }
        setDimensions() {
          this.style.setDimensions();
        }
        showToastMessage(message, hideAfter) {
          this.bodyRenderer.showToastMessage(message, hideAfter);
        }
        clearToastMessage() {
          this.bodyRenderer.clearToastMessage();
        }
        getColumn(colIndex) {
          return this.datamanager.getColumn(colIndex);
        }
        getColumns() {
          return this.datamanager.getColumns();
        }
        getRows() {
          return this.datamanager.getRows();
        }
        getCell(colIndex, rowIndex) {
          return this.datamanager.getCell(colIndex, rowIndex);
        }
        getColumnHeaderElement(colIndex) {
          return this.columnmanager.getColumnHeaderElement(colIndex);
        }
        getViewportHeight() {
          if (!this.viewportHeight) {
            this.viewportHeight = $2.style(this.bodyScrollable, "height");
          }
          return this.viewportHeight;
        }
        sortColumn(colIndex, sortOrder) {
          this.columnmanager.sortColumn(colIndex, sortOrder);
        }
        removeColumn(colIndex) {
          this.columnmanager.removeColumn(colIndex);
        }
        scrollToLastColumn() {
          this.datatableWrapper.scrollLeft = 9999;
        }
        freeze() {
          $2.style(this.freezeContainer, {
            display: ""
          });
        }
        unfreeze() {
          $2.style(this.freezeContainer, {
            display: "none"
          });
        }
        updateOptions(options) {
          this.buildOptions(options);
        }
        fireEvent(eventName, ...args) {
          const handlers = [
            ...this._internalEventHandlers[eventName] || [],
            this.events[eventName]
          ].filter(Boolean);
          for (let handler of handlers) {
            handler.apply(this, args);
          }
        }
        on(event, handler) {
          this._internalEventHandlers = this._internalEventHandlers || {};
          this._internalEventHandlers[event] = this._internalEventHandlers[event] || [];
          this._internalEventHandlers[event].push(handler);
        }
        log() {
          if (this.options.logs) {
            console.log.apply(console, arguments);
          }
        }
        translate(str, args) {
          return this.translationManager.translate(str, args);
        }
      };
      DataTable2.instances = 0;
      var name = "frappe-datatable";
      var version = "0.0.0-development";
      var description = "A modern datatable library for the web";
      var main = "dist/frappe-datatable.cjs.js";
      var unpkg = "dist/frappe-datatable.min.js";
      var jsdelivr = "dist/frappe-datatable.min.js";
      var scripts = { "start": "yarn run dev", "build": "rollup -c && NODE_ENV=production rollup -c", "dev": "rollup -c -w", "cy:server": "http-server -p 8989", "cy:open": "cypress open", "cy:run": "cypress run", "test": "start-server-and-test cy:server http://localhost:8989 cy:run", "test-local": "start-server-and-test cy:server http://localhost:8989 cy:open", "travis-deploy-once": "travis-deploy-once", "semantic-release": "semantic-release", "lint": "eslint src", "lint-and-build": "yarn lint && yarn build", "commit": "npx git-cz" };
      var files = ["dist", "src"];
      var devDependencies = { "autoprefixer": "^9.0.0", "chai": "3.5.0", "cypress": "^9.2.0", "cz-conventional-changelog": "^2.1.0", "deepmerge": "^2.0.1", "eslint": "^5.0.1", "eslint-config-airbnb": "^16.1.0", "eslint-config-airbnb-base": "^12.1.0", "eslint-plugin-import": "^2.11.0", "http-server": "^0.11.1", "mocha": "3.3.0", "postcss-custom-properties": "^7.0.0", "postcss-nested": "^3.0.0", "rollup": "^0.59.4", "rollup-plugin-commonjs": "^8.3.0", "rollup-plugin-eslint": "^4.0.0", "rollup-plugin-json": "^2.3.0", "rollup-plugin-node-resolve": "^3.0.3", "rollup-plugin-postcss": "^1.2.8", "rollup-plugin-uglify-es": "^0.0.1", "semantic-release": "^17.1.1", "start-server-and-test": "^1.4.1", "travis-deploy-once": "^5.0.1" };
      var repository = { "type": "git", "url": "https://github.com/frappe/datatable.git" };
      var keywords = ["datatable", "data", "grid", "table"];
      var author = "Faris Ansari";
      var license = "MIT";
      var bugs = { "url": "https://github.com/frappe/datatable/issues" };
      var homepage = "https://frappe.io/datatable";
      var dependencies = { "hyperlist": "^1.0.0-beta", "lodash": "^4.17.5", "sortablejs": "^1.7.0" };
      var config = { "commitizen": { "path": "cz-conventional-changelog" } };
      var packageJson = {
        name,
        version,
        description,
        main,
        unpkg,
        jsdelivr,
        scripts,
        files,
        devDependencies,
        repository,
        keywords,
        author,
        license,
        bugs,
        homepage,
        dependencies,
        config
      };
      DataTable2.__version__ = packageJson.version;
      module.exports = DataTable2;
    }
  });

  // frappe/public/js/frappe/data_import/import_preview.js
  var import_frappe_datatable = __toESM(require_frappe_datatable_cjs());

  // frappe/public/js/frappe/data_import/data_exporter.js
  frappe.provide("frappe.data_import");
  frappe.data_import.DataExporter = class DataExporter {
    constructor(doctype, exporting_for) {
      this.doctype = doctype;
      this.exporting_for = exporting_for;
      frappe.model.with_doctype(doctype, () => {
        this.make_dialog();
      });
    }
    make_dialog() {
      this.dialog = new frappe.ui.Dialog({
        title: __("Export Data"),
        fields: [
          {
            fieldtype: "Select",
            fieldname: "file_type",
            label: __("File Type"),
            options: ["Excel", "CSV"],
            default: "CSV"
          },
          {
            fieldtype: "Select",
            fieldname: "export_records",
            label: __("Export Type"),
            options: [
              {
                label: __("All Records"),
                value: "all"
              },
              {
                label: __("Filtered Records"),
                value: "by_filter"
              },
              {
                label: __("5 Records"),
                value: "5_records"
              },
              {
                label: __("Blank Template"),
                value: "blank_template"
              }
            ],
            default: this.exporting_for === "Insert New Records" ? "blank_template" : "all",
            change: () => {
              this.update_record_count_message();
            }
          },
          {
            fieldtype: "HTML",
            fieldname: "filter_area",
            depends_on: (doc) => doc.export_records === "by_filter"
          },
          {
            fieldtype: "Section Break"
          },
          {
            fieldtype: "HTML",
            fieldname: "select_all_buttons"
          },
          {
            label: __(this.doctype),
            fieldname: this.doctype,
            fieldtype: "MultiCheck",
            columns: 2,
            on_change: () => this.update_primary_action(),
            options: this.get_multicheck_options(this.doctype)
          },
          ...frappe.meta.get_table_fields(this.doctype).map((df) => {
            let doctype = df.options;
            let child_fieldname = df.fieldname;
            let label = df.reqd ? __("{0} ({1}) (1 row mandatory)", [__(df.label || df.fieldname), __(doctype)]) : __("{0} ({1})", [__(df.label || df.fieldname), __(doctype)]);
            return {
              label,
              fieldname: child_fieldname,
              fieldtype: "MultiCheck",
              columns: 2,
              on_change: () => this.update_primary_action(),
              options: this.get_multicheck_options(doctype, child_fieldname)
            };
          })
        ],
        primary_action_label: __("Export"),
        primary_action: (values) => this.export_records(values),
        on_page_show: () => this.select_mandatory()
      });
      this.make_filter_area();
      this.make_select_all_buttons();
      this.update_record_count_message();
      this.dialog.show();
    }
    export_records() {
      let method = "/api/method/frappe.core.doctype.data_import.data_import.download_template";
      let multicheck_fields = this.dialog.fields.filter((df) => df.fieldtype === "MultiCheck").map((df) => df.fieldname);
      let values = this.dialog.get_values();
      let doctype_field_map = Object.assign({}, values);
      for (let key in doctype_field_map) {
        if (!multicheck_fields.includes(key)) {
          delete doctype_field_map[key];
        }
      }
      let filters = null;
      if (values.export_records === "by_filter") {
        filters = this.get_filters();
      }
      open_url_post(method, {
        doctype: this.doctype,
        file_type: values.file_type,
        export_records: values.export_records,
        export_fields: doctype_field_map,
        export_filters: filters
      });
    }
    make_filter_area() {
      this.filter_group = new frappe.ui.FilterGroup({
        parent: this.dialog.get_field("filter_area").$wrapper,
        doctype: this.doctype,
        on_change: () => {
          this.update_record_count_message();
        }
      });
    }
    make_select_all_buttons() {
      let for_insert = this.exporting_for === "Insert New Records";
      let section_title = for_insert ? __("Select Fields To Insert") : __("Select Fields To Update");
      let $select_all_buttons = $(`
			<div class="mb-3">
				<h6 class="form-section-heading uppercase">${section_title}</h6>
				<button class="btn btn-default btn-xs" data-action="select_all">
					${__("Select All")}
				</button>
				${for_insert ? `<button class="btn btn-default btn-xs" data-action="select_mandatory">
					${__("Select Mandatory")}
				</button>` : ""}
				<button class="btn btn-default btn-xs" data-action="unselect_all">
					${__("Unselect All")}
				</button>
			</div>
		`);
      frappe.utils.bind_actions_with_object($select_all_buttons, this);
      this.dialog.get_field("select_all_buttons").$wrapper.html($select_all_buttons);
    }
    select_all() {
      this.dialog.$wrapper.find(":checkbox").prop("checked", true).trigger("change");
    }
    select_mandatory() {
      let mandatory_table_fields = frappe.meta.get_table_fields(this.doctype).filter((df) => df.reqd).map((df) => df.fieldname);
      mandatory_table_fields.push(this.doctype);
      let multicheck_fields = this.dialog.fields.filter((df) => df.fieldtype === "MultiCheck").map((df) => df.fieldname).filter((doctype) => mandatory_table_fields.includes(doctype));
      let checkboxes = [].concat(...multicheck_fields.map((fieldname) => {
        let field = this.dialog.get_field(fieldname);
        return field.options.filter((option) => option.danger).map((option) => option.$checkbox.find("input").get(0));
      }));
      this.unselect_all();
      $(checkboxes).prop("checked", true).trigger("change");
    }
    unselect_all() {
      let update_existing_records = this.dialog.get_value("exporting_for") == "Update Existing Records";
      this.dialog.$wrapper.find(`:checkbox${update_existing_records ? ":not([data-unit=name])" : ""}`).prop("checked", false).trigger("change");
    }
    update_record_count_message() {
      let export_records = this.dialog.get_value("export_records");
      let count_method = {
        all: () => frappe.db.count(this.doctype),
        by_filter: () => frappe.db.count(this.doctype, {
          filters: this.get_filters()
        }),
        blank_template: () => Promise.resolve(0),
        "5_records": () => Promise.resolve(5)
      };
      count_method[export_records]().then((value) => {
        let message = "";
        value = parseInt(value, 10);
        if (value === 0) {
          message = __("No records will be exported");
        } else if (value === 1) {
          message = __("1 record will be exported");
        } else {
          message = __("{0} records will be exported", [value]);
        }
        this.dialog.set_df_property("export_records", "description", message);
        this.update_primary_action(value);
      });
    }
    update_primary_action(no_of_records) {
      let $primary_action = this.dialog.get_primary_btn();
      if (no_of_records != null) {
        let label = "";
        if (no_of_records === 0) {
          label = __("Export");
        } else if (no_of_records === 1) {
          label = __("Export 1 record");
        } else {
          label = __("Export {0} records", [no_of_records]);
        }
        $primary_action.html(label);
      } else {
        let parent_fields = this.dialog.get_value(this.doctype);
        $primary_action.prop("disabled", parent_fields.length === 0);
      }
    }
    get_filters() {
      return this.filter_group.get_filters().map((filter) => {
        return filter.slice(0, 4);
      });
    }
    get_multicheck_options(doctype, child_fieldname = null) {
      if (!this.column_map) {
        this.column_map = get_columns_for_picker(this.doctype);
      }
      let autoname_field = null;
      let meta = frappe.get_meta(doctype);
      if (meta.autoname && meta.autoname.startsWith("field:")) {
        let fieldname = meta.autoname.slice("field:".length);
        autoname_field = frappe.meta.get_field(doctype, fieldname);
      }
      let fields = child_fieldname ? this.column_map[child_fieldname] : this.column_map[doctype];
      let is_field_mandatory = (df) => {
        if (df.reqd && this.exporting_for == "Insert New Records") {
          return true;
        }
        if (autoname_field && df.fieldname == autoname_field.fieldname) {
          return true;
        }
        if (df.fieldname === "name") {
          return true;
        }
        return false;
      };
      return fields.filter((df) => {
        if (autoname_field && df.fieldname === "name") {
          return false;
        }
        return true;
      }).map((df) => {
        return {
          label: __(df.label),
          value: df.fieldname,
          danger: is_field_mandatory(df),
          checked: false,
          description: `${df.fieldname} ${df.reqd ? __("(Mandatory)") : ""}`
        };
      });
    }
  };
  function get_columns_for_picker(doctype) {
    let out = {};
    const exportable_fields = (df) => {
      let keep = true;
      if (frappe.model.no_value_type.includes(df.fieldtype)) {
        keep = false;
      }
      if (["lft", "rgt"].includes(df.fieldname)) {
        keep = false;
      }
      return keep;
    };
    let doctype_fields = frappe.meta.get_docfields(doctype).filter(exportable_fields);
    out[doctype] = [
      {
        label: __("ID"),
        fieldname: "name",
        fieldtype: "Data",
        reqd: 1
      }
    ].concat(doctype_fields);
    const table_fields = frappe.meta.get_table_fields(doctype);
    table_fields.forEach((df) => {
      const cdt = df.options;
      const child_table_fields = frappe.meta.get_docfields(cdt).filter(exportable_fields);
      out[df.fieldname] = [
        {
          label: __("ID"),
          fieldname: "name",
          fieldtype: "Data",
          reqd: 1
        }
      ].concat(child_table_fields);
    });
    return out;
  }

  // frappe/public/js/frappe/data_import/import_preview.js
  frappe.provide("frappe.data_import");
  frappe.data_import.ImportPreview = class ImportPreview {
    constructor({ wrapper, doctype, preview_data, frm, import_log, events = {} }) {
      this.wrapper = wrapper;
      this.doctype = doctype;
      this.preview_data = preview_data;
      this.events = events;
      this.import_log = import_log;
      this.frm = frm;
      frappe.model.with_doctype(doctype, () => {
        this.refresh();
      });
    }
    refresh() {
      this.data = this.preview_data.data;
      this.make_wrapper();
      this.prepare_columns();
      this.prepare_data();
      this.render_datatable();
      this.setup_styles();
      this.add_actions();
    }
    make_wrapper() {
      this.wrapper.html(`
			<div>
				<div class="row">
					<div class="col-sm-12">
						<div class="table-actions margin-bottom">
						</div>
						<div class="table-preview border"></div>
						<div class="table-message"></div>
					</div>
				</div>
			</div>
		`);
      frappe.utils.bind_actions_with_object(this.wrapper, this);
      this.$table_preview = this.wrapper.find(".table-preview");
    }
    prepare_columns() {
      this.columns = this.preview_data.columns.map((col, i) => {
        let df = col.df;
        let column_width = 120;
        if (col.header_title === "Sr. No") {
          return {
            id: "srno",
            name: "Sr. No",
            content: "Sr. No",
            editable: false,
            focusable: false,
            align: "left",
            width: 60
          };
        }
        if (col.skip_import) {
          let show_warnings_button = `<button class="btn btn-xs" data-action="show_column_warning" data-col="${i}">
					<i class="octicon octicon-stop"></i></button>`;
          if (!col.df) {
            column_width += 50;
          }
          let column_title2 = `<span class="indicator red">
					${col.header_title || `<i>${__("Untitled Column")}</i>`}
					${!col.df ? show_warnings_button : ""}
				</span>`;
          return {
            id: frappe.utils.get_random(6),
            name: col.header_title || (df ? df.label : "Untitled Column"),
            content: column_title2,
            skip_import: true,
            editable: false,
            focusable: false,
            align: "left",
            width: column_width,
            format: (value) => `<div class="text-muted">${value}</div>`
          };
        }
        let date_format = col.date_format ? col.date_format.replace("%Y", "yyyy").replace("%y", "yy").replace("%m", "mm").replace("%d", "dd").replace("%H", "HH").replace("%M", "mm").replace("%S", "ss").replace("%b", "Mon") : null;
        let column_title = `<span class="indicator green">
				${col.header_title || df.label}
				${date_format ? `(${date_format})` : ""}
			</span>`;
        return {
          id: df.fieldname,
          name: col.header_title,
          content: column_title,
          df,
          editable: false,
          align: "left",
          width: column_width
        };
      });
    }
    prepare_data() {
      this.data = this.data.map((row) => {
        return row.map((cell) => {
          if (cell == null) {
            return "";
          }
          return cell;
        });
      });
    }
    render_datatable() {
      if (this.datatable) {
        this.datatable.destroy();
      }
      this.datatable = new import_frappe_datatable.default(this.$table_preview.get(0), {
        data: this.data,
        columns: this.columns,
        layout: this.columns.length < 10 ? "fluid" : "fixed",
        cellHeight: 35,
        language: frappe.boot.lang,
        translations: frappe.utils.datatable.get_translations(),
        serialNoColumn: false,
        checkboxColumn: false,
        noDataMessage: __("No Data"),
        disableReorderColumn: true
      });
      let { max_rows_exceeded, max_rows_in_preview, total_number_of_rows } = this.preview_data;
      if (max_rows_exceeded) {
        let parts = [max_rows_in_preview, total_number_of_rows];
        this.wrapper.find(".table-message").html(`
				<div class="text-muted margin-top text-medium">
				${__("Showing only first {0} rows out of {1}", parts)}
				</div>
			`);
      }
      if (this.data.length === 0) {
        this.datatable.style.setStyle(".dt-scrollable", {
          height: "auto"
        });
      }
      this.datatable.style.setStyle(".dt-dropdown", {
        display: "none"
      });
    }
    setup_styles() {
      this.datatable.style.setStyle(`svg.import-success`, {
        width: "16px",
        fill: frappe.ui.color.get_color_shade("green", "dark")
      });
      let row_classes = this.datatable.getRows().filter((row) => this.is_row_imported(row)).map((row) => row.meta.rowIndex).map((i) => `.dt-row-${i} .dt-cell`).join(",");
      this.datatable.style.setStyle(row_classes, {
        pointerEvents: "none",
        backgroundColor: frappe.ui.color.get_color_shade("gray", "extra-light"),
        color: frappe.ui.color.get_color_shade("gray", "dark")
      });
    }
    add_actions() {
      let actions = [
        {
          label: __("Map Columns"),
          handler: "show_column_mapper",
          condition: this.frm.doc.status !== "Success"
        },
        {
          label: __("Export Errored Rows"),
          handler: "export_errored_rows",
          condition: this.import_log.filter((log) => !log.success).length > 0
        },
        {
          label: __("Show Warnings"),
          handler: "show_warnings",
          condition: this.preview_data.warnings.length > 0
        }
      ];
      let html = actions.filter((action) => action.condition).map((action) => {
        return `<button class="btn btn-sm btn-default" data-action="${action.handler}">
					${action.label}
				</button>
			`;
      });
      this.wrapper.find(".table-actions").html(html);
    }
    export_errored_rows() {
      this.frm.trigger("export_errored_rows");
    }
    show_warnings() {
      this.frm.scroll_to_field("import_warnings");
    }
    show_column_warning(_, $target) {
      let $warning = this.frm.get_field("import_warnings").$wrapper.find(`[data-col=${$target.data("col")}]`);
      frappe.utils.scroll_to($warning, true, 30);
    }
    show_column_mapper() {
      let column_picker_fields = get_columns_for_picker(this.doctype);
      let changed = [];
      let fields = this.preview_data.columns.map((col, i) => {
        let df = col.df;
        if (col.header_title === "Sr. No")
          return [];
        let fieldname;
        if (!df) {
          fieldname = null;
        } else if (col.map_to_field) {
          fieldname = col.map_to_field;
        } else if (col.is_child_table_field) {
          fieldname = `${col.child_table_df.fieldname}.${df.fieldname}`;
        } else {
          fieldname = df.fieldname;
        }
        return [
          {
            label: "",
            fieldtype: "Data",
            default: col.header_title,
            fieldname: `Column ${i}`,
            read_only: 1
          },
          {
            fieldtype: "Column Break"
          },
          {
            fieldtype: "Autocomplete",
            fieldname: i,
            label: "",
            max_items: Infinity,
            options: [
              {
                label: __("Don't Import"),
                value: "Don't Import"
              }
            ].concat(get_fields_as_options(this.doctype, column_picker_fields)),
            default: fieldname || "Don't Import",
            change() {
              changed.push(i);
            }
          },
          {
            fieldtype: "Section Break"
          }
        ];
      });
      fields = fields.reduce((acc, curr) => [...acc, ...curr]);
      let file_name = (this.frm.doc.import_file || "").split("/").pop();
      let parts = [file_name.bold(), this.doctype.bold()];
      fields = [
        {
          fieldtype: "HTML",
          fieldname: "heading",
          options: `
					<div class="margin-top text-muted">
					${__("Map columns from {0} to fields in {1}", parts)}
					</div>
				`
        },
        {
          fieldtype: "Section Break"
        }
      ].concat(fields);
      let dialog = new frappe.ui.Dialog({
        title: __("Map Columns"),
        fields,
        primary_action: (values) => {
          let changed_map = {};
          changed.map((i) => {
            let header_row_index = i - 1;
            changed_map[header_row_index] = values[i];
          });
          if (changed.length > 0) {
            this.events.remap_column(changed_map);
          }
          dialog.hide();
        }
      });
      dialog.$body.addClass("map-columns");
      dialog.show();
    }
    is_row_imported(row) {
      let serial_no = row[0].content;
      return this.import_log.find((log) => {
        return log.success && JSON.parse(log.row_indexes || "[]").includes(serial_no);
      });
    }
  };
  function get_fields_as_options(doctype, column_map) {
    let keys = [doctype];
    frappe.meta.get_table_fields(doctype).forEach((df) => {
      keys.push(df.fieldname);
    });
    return [].concat(...keys.map((key) => {
      return column_map[key].map((df) => {
        let label = __(df.label);
        let value = df.fieldname;
        if (doctype !== key) {
          let table_field = frappe.meta.get_docfield(doctype, key);
          label = `${__(df.label)} (${__(table_field.label)})`;
          value = `${table_field.fieldname}.${df.fieldname}`;
        }
        return {
          label,
          value,
          description: value
        };
      });
    }));
  }
})();
/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
//# sourceMappingURL=data_import_tools.bundle.LTK3PVPV.js.map
