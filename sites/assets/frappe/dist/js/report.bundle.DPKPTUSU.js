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
      var Set2 = _getNative(_root, "Set");
      var _Set = Set2;
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
      var DataTable3 = class {
        constructor(wrapper, options) {
          DataTable3.instances++;
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
      DataTable3.instances = 0;
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
      DataTable3.__version__ = packageJson.version;
      module.exports = DataTable3;
    }
  });

  // frappe/public/js/frappe/views/reports/report_factory.js
  frappe.views.ReportFactory = class ReportFactory extends frappe.views.Factory {
    make(route) {
      const _route = ["List", route[1], "Report"];
      if (route[2]) {
        _route.push(route[2]);
      }
      frappe.set_route(_route);
    }
  };

  // frappe/public/js/frappe/views/reports/report_view.js
  var import_frappe_datatable = __toESM(require_frappe_datatable_cjs());
  window.DataTable = import_frappe_datatable.default;
  frappe.provide("frappe.views");
  frappe.views.ReportView = class ReportView extends frappe.views.ListView {
    get view_name() {
      return "Report";
    }
    render_header() {
    }
    setup_defaults() {
      super.setup_defaults();
      this.page_title = __("Report:") + " " + this.page_title;
      this.view = "Report";
      const route = frappe.get_route();
      if (route.length === 4) {
        this.report_name = route[3];
      }
      if (this.report_name) {
        return this.get_report_doc().then((doc) => {
          this.report_doc = doc;
          this.report_doc.json = JSON.parse(this.report_doc.json);
          this.filters = this.report_doc.json.filters;
          this.order_by = this.report_doc.json.order_by;
          this.add_totals_row = this.report_doc.json.add_totals_row;
          this.page_title = __(this.report_name);
          this.page_length = this.report_doc.json.page_length || 20;
          this.order_by = this.report_doc.json.order_by || "modified desc";
          this.chart_args = this.report_doc.json.chart_args;
        });
      } else {
        this.add_totals_row = this.view_user_settings.add_totals_row || 0;
        this.chart_args = this.view_user_settings.chart_args;
      }
      return this.get_list_view_settings();
    }
    setup_view() {
      this.setup_columns();
      super.setup_new_doc_event();
      this.setup_events();
      this.page.main.addClass("report-view");
    }
    setup_events() {
      var _a;
      if ((_a = this.list_view_settings) == null ? void 0 : _a.disable_auto_refresh) {
        return;
      }
      frappe.socketio.doctype_subscribe(this.doctype);
      frappe.realtime.on("list_update", (data) => this.on_update(data));
    }
    setup_page() {
      this.menu_items = this.report_menu_items();
      super.setup_page();
    }
    toggle_side_bar() {
      super.toggle_side_bar();
      this.render(true);
    }
    setup_result_area() {
      super.setup_result_area();
      this.setup_charts_area();
      this.$datatable_wrapper = $('<div class="datatable-wrapper">');
      this.$result.append(this.$datatable_wrapper);
    }
    setup_charts_area() {
      this.$charts_wrapper = $(`<div class="charts-wrapper hidden">
			<div class="text-right"><button class="btn btn-default btn-xs btn-chart-configure"
				style="margin-right: 15px; margin-top: 15px">Configure</button></div>
			<div class="charts-inner-wrapper"></div>
		</div>`);
      this.$result.append(this.$charts_wrapper);
      this.$charts_wrapper.find(".btn-chart-configure").on("click", () => {
        this.setup_charts();
      });
    }
    setup_paging_area() {
      super.setup_paging_area();
      const message = __("For comparison, use >5, <10 or =324. For ranges, use 5:10 (for values between 5 & 10).");
      this.$paging_area.find(".level-left").append(`<span class="comparison-message text-muted">${message}</span>`);
    }
    setup_sort_selector() {
      this.sort_selector = new frappe.ui.SortSelector({
        parent: this.filter_area.$filter_list_wrapper,
        doctype: this.doctype,
        args: this.order_by,
        onchange: this.on_sort_change.bind(this)
      });
      this.group_by_control = new frappe.ui.GroupBy(this);
      if (this.report_doc && this.report_doc.json.group_by) {
        this.group_by_control.apply_settings(this.report_doc.json.group_by);
      }
      if (this.view_user_settings && this.view_user_settings.group_by) {
        this.group_by_control.apply_settings(this.view_user_settings.group_by);
      }
    }
    get_args() {
      const args = super.get_args();
      delete args.group_by;
      this.group_by_control.set_args(args);
      return args;
    }
    before_refresh() {
      if (this.report_doc) {
        return Promise.resolve();
      }
      return super.before_refresh();
    }
    after_render() {
      if (!this.report_doc) {
        this.save_report_settings();
      } else if (!$.isEmptyObject(this.report_doc.json)) {
        this.set_dirty_state_for_custom_report();
      }
      if (!this.group_by) {
        this.init_chart();
      }
    }
    set_dirty_state_for_custom_report() {
      let current_settings = {
        filters: this.filter_area.get(),
        fields: this.fields,
        order_by: this.sort_selector.get_sql_string(),
        add_totals_row: this.add_totals_row,
        page_length: this.page_length,
        column_widths: this.get_column_widths(),
        group_by: this.group_by_control.get_settings(),
        chart_args: this.get_chart_settings()
      };
      let report_settings = {
        filters: this.report_doc.json.filters,
        fields: this.report_doc.json.fields,
        order_by: this.report_doc.json.order_by,
        add_totals_row: this.report_doc.json.add_totals_row,
        page_length: this.report_doc.json.page_length,
        column_widths: this.report_doc.json.column_widths,
        group_by: this.report_doc.json.group_by,
        chart_args: this.report_doc.json.chart_args
      };
      if (!frappe.utils.deep_equal(current_settings, report_settings)) {
        this.page.set_indicator(__("Not Saved"), "orange");
      } else {
        this.page.clear_indicator();
      }
    }
    save_report_settings() {
      frappe.model.user_settings.save(this.doctype, "last_view", this.view_name);
      if (!this.report_name) {
        this.save_view_user_settings({
          fields: this.fields,
          filters: this.filter_area.get(),
          order_by: this.sort_selector.get_sql_string(),
          group_by: this.group_by_control.get_settings(),
          chart_args: this.get_chart_settings(),
          add_totals_row: this.add_totals_row
        });
      }
    }
    prepare_data(r) {
      let data = r.message || {};
      data = frappe.utils.dict(data.keys, data.values);
      if (this.start === 0) {
        this.data = data;
      } else {
        this.data = this.data.concat(data);
      }
    }
    render(force) {
      if (this.data.length === 0)
        return;
      this.render_count();
      this.setup_columns();
      if (this.group_by) {
        this.$charts_wrapper.addClass("hidden");
      } else if (this.chart) {
        this.refresh_charts();
      }
      if (this.datatable && !force) {
        this.datatable.refresh(this.get_data(this.data), this.columns);
        return;
      }
      this.setup_datatable(this.data);
    }
    render_count() {
      var _a;
      if ((_a = this.list_view_settings) == null ? void 0 : _a.disable_count) {
        return;
      }
      let $list_count = this.$paging_area.find(".list-count");
      if (!$list_count.length) {
        $list_count = $("<span>").addClass("text-muted list-count").prependTo(this.$paging_area.find(".level-right"));
      }
      this.get_count_str().then((str) => {
        $list_count.text(str);
      });
    }
    on_update(data) {
      if (this.doctype === data.doctype && data.name) {
        const flash_row = data.user !== frappe.session.user;
        if (this.data.find((d) => d.name === data.name)) {
          frappe.db.get_doc(data.doctype, data.name).then((doc) => this.update_row(doc, flash_row));
        } else {
          this.refresh();
        }
      }
    }
    update_row(doc, flash_row) {
      const to_refresh = [];
      this.data = this.data.map((d, i) => {
        if (d.name === doc.name) {
          for (let fieldname in d) {
            if (fieldname.includes(":")) {
              const [cdt, _field] = fieldname.split(":");
              const cdt_row = Object.keys(doc).filter((key) => Array.isArray(doc[key]) && doc[key].length && doc[key][0].doctype === cdt).map((key) => doc[key]).map((a) => a[0]).filter((cdoc) => cdoc.name === d[cdt + ":name"])[0];
              if (cdt_row) {
                d[fieldname] = cdt_row[_field];
              }
            } else {
              d[fieldname] = doc[fieldname];
            }
          }
          to_refresh.push([d, i]);
        }
        return d;
      });
      const _flash_row = (rowIndex) => {
        if (!flash_row)
          return;
        const $row = this.$result.find(`.dt-row[data-row-index="${rowIndex}"]`);
        $row.addClass("row-update");
        setTimeout(() => $row.removeClass("row-update"), 500);
      };
      to_refresh.forEach(([data, rowIndex]) => {
        const new_row = this.build_row(data);
        this.datatable.refreshRow(new_row, rowIndex);
        _flash_row(rowIndex);
      });
    }
    setup_datatable(values) {
      this.$datatable_wrapper.empty();
      this.datatable = new import_frappe_datatable.default(this.$datatable_wrapper[0], {
        columns: this.columns,
        data: this.get_data(values),
        getEditor: this.get_editing_object.bind(this),
        language: frappe.boot.lang,
        translations: frappe.utils.datatable.get_translations(),
        checkboxColumn: true,
        inlineFilters: true,
        cellHeight: 35,
        direction: frappe.utils.is_rtl() ? "rtl" : "ltr",
        events: {
          onRemoveColumn: (column) => {
            this.remove_column_from_datatable(column);
          },
          onSwitchColumn: (column1, column2) => {
            this.switch_column(column1, column2);
          },
          onCheckRow: () => {
            const checked_items = this.get_checked_items();
            this.toggle_actions_menu_button(checked_items.length > 0);
          }
        },
        hooks: {
          columnTotal: frappe.utils.report_column_total
        },
        headerDropdown: [
          {
            label: __("Add Column"),
            action: (datatabe_col) => {
              let columns_in_picker = [];
              const columns = this.get_columns_for_picker();
              columns_in_picker = columns[this.doctype].filter((df) => !this.is_column_added(df)).map((df) => ({
                label: __(df.label),
                value: df.fieldname
              }));
              delete columns[this.doctype];
              for (let cdt in columns) {
                columns[cdt].filter((df) => !this.is_column_added(df)).map((df) => ({
                  label: __(df.label) + ` (${cdt})`,
                  value: df.fieldname + "," + cdt
                })).forEach((df) => columns_in_picker.push(df));
              }
              const d = new frappe.ui.Dialog({
                title: __("Add Column"),
                fields: [
                  {
                    label: __("Select Column"),
                    fieldname: "column",
                    fieldtype: "Autocomplete",
                    options: columns_in_picker
                  },
                  {
                    label: __("Insert Column Before {0}", [
                      __(datatabe_col.docfield.label).bold()
                    ]),
                    fieldname: "insert_before",
                    fieldtype: "Check"
                  }
                ],
                primary_action: ({ column, insert_before }) => {
                  if (!columns_in_picker.map((col) => col.value).includes(column)) {
                    frappe.show_alert({
                      message: __("Invalid column"),
                      indicator: "orange"
                    });
                    d.hide();
                    return;
                  }
                  let doctype = this.doctype;
                  if (column.includes(",")) {
                    [column, doctype] = column.split(",");
                  }
                  let index = datatabe_col.colIndex;
                  if (insert_before) {
                    index = index - 1;
                  }
                  this.add_column_to_datatable(column, doctype, index);
                  d.hide();
                }
              });
              d.show();
            }
          }
        ]
      });
    }
    toggle_charts() {
      if (!this.chart) {
        this.setup_charts();
        return;
      }
      if (this.$charts_wrapper.hasClass("hidden")) {
        this.$charts_wrapper.removeClass("hidden");
        this.refresh_charts();
      } else {
        this.$charts_wrapper.addClass("hidden");
        this.save_view_user_settings({ chart_args: null });
        this.chart_args = null;
      }
    }
    init_chart() {
      if (!this.chart) {
        if (this.chart_args) {
          this.build_chart_args(this.chart_args.x_axis, this.chart_args.y_axes, this.chart_args.chart_type);
          this.make_chart();
        }
      }
    }
    setup_charts() {
      let x_fields = [], y_fields = [];
      for (let col of this.columns) {
        x_fields.push({
          label: col.content,
          fieldname: col.id,
          value: col.id
        });
        if (col.docfield && frappe.model.numeric_fieldtypes.includes(col.docfield.fieldtype)) {
          y_fields.push({
            label: col.content,
            fieldname: col.id,
            value: col.id
          });
        }
      }
      const defaults = this.chart_args || {};
      const dialog = new frappe.ui.Dialog({
        title: __("Configure Chart"),
        fields: [
          {
            label: __("X Axis Field"),
            fieldtype: "Select",
            fieldname: "x_axis",
            options: x_fields,
            default: defaults.x_axis
          },
          {
            label: __("Y Axis Fields"),
            fieldtype: "MultiSelect",
            fieldname: "y_axes",
            options: y_fields,
            description: __("Showing only Numeric fields from Report"),
            default: defaults.y_axes ? defaults.y_axes.join(", ") : null
          },
          {
            label: __("Chart Type"),
            fieldtype: "Select",
            options: ["Bar", "Line", "Pie", "Percentage", "Donut"],
            fieldname: "chart_type",
            default: defaults.chart_type ? frappe.utils.to_title_case(defaults.chart_type) : "Bar"
          }
        ],
        primary_action: (data) => {
          data.y_axes = data.y_axes.split(",").map((d) => d.trim()).filter(Boolean);
          this.build_chart_args(data.x_axis, data.y_axes, data.chart_type);
          this.make_chart();
          dialog.hide();
        }
      });
      dialog.show();
    }
    build_chart_args(x_axis, y_axes, chart_type) {
      let datasets = y_axes.map((y_axis) => ({
        name: this.columns_map[y_axis].content,
        values: this.data.map((d) => d[y_axis])
      }));
      this.chart_args = {
        chart_type: chart_type.toLowerCase(),
        x_axis,
        y_axes,
        labels: this.data.map((d) => d[x_axis]),
        datasets
      };
      this.save_view_user_settings({ chart_args: this.get_chart_settings() });
    }
    get_chart_settings() {
      if (this.chart_args) {
        return {
          chart_type: this.chart_args.chart_type,
          x_axis: this.chart_args.x_axis,
          y_axes: this.chart_args.y_axes
        };
      }
    }
    make_chart() {
      const args = this.chart_args;
      let data = {
        labels: args.labels,
        datasets: args.datasets
      };
      this.last_chart_type = args.chart_type;
      const get_df = (field) => this.columns_map[field].docfield;
      this.$charts_wrapper.removeClass("hidden");
      this.chart = new frappe.Chart(this.$charts_wrapper.find(".charts-inner-wrapper")[0], {
        title: __("{0} Chart", [this.doctype]),
        data,
        type: args.chart_type,
        truncateLegends: 1,
        colors: ["#70E078", "light-blue", "orange", "red"],
        axisOptions: {
          shortenYAxisNumbers: 1,
          numberFormatter: frappe.utils.format_chart_axis_number
        },
        tooltipOptions: {
          formatTooltipY: (value) => {
            return frappe.format(value, get_df(this.chart_args.y_axes[0]), {
              always_show_decimals: true,
              inline: true
            });
          }
        }
      });
    }
    refresh_charts() {
      if (!this.chart || !this.chart_args)
        return;
      this.$charts_wrapper.removeClass("hidden");
      const { x_axis, y_axes, chart_type } = this.chart_args;
      this.build_chart_args(x_axis, y_axes, chart_type);
      this.chart.update(this.chart_args);
    }
    get_editing_object(colIndex, rowIndex, value, parent) {
      const control = this.render_editing_input(colIndex, value, parent);
      if (!control)
        return false;
      control.df.change = () => control.set_focus();
      return {
        initValue: (value2) => {
          return control.set_value(value2);
        },
        setValue: (value2) => {
          const cell = this.datatable.getCell(colIndex, rowIndex);
          let fieldname = this.datatable.getColumn(colIndex).docfield.fieldname;
          let docname = cell.name;
          let doctype = cell.doctype;
          control.set_value(value2);
          return this.set_control_value(doctype, docname, fieldname, value2).then((updated_doc) => {
            const _data = this.data.filter((b) => b.name === updated_doc.name).find((a) => doctype != updated_doc.doctype && a[doctype + ":name"] == docname || doctype == updated_doc.doctype);
            for (let field in _data) {
              if (field.includes(":")) {
                const [cdt, _field] = field.split(":");
                const cdt_row = Object.keys(updated_doc).filter((key) => Array.isArray(updated_doc[key]) && updated_doc[key].length && updated_doc[key][0].doctype === cdt).map((key) => updated_doc[key])[0].filter((cdoc) => cdoc.name === _data[cdt + ":name"])[0];
                if (cdt_row) {
                  _data[field] = cdt_row[_field];
                }
              } else {
                _data[field] = updated_doc[field];
              }
            }
          }).then(() => this.refresh_charts());
        },
        getValue: () => {
          return control.get_value();
        }
      };
    }
    set_control_value(doctype, docname, fieldname, value) {
      this.last_updated_doc = docname;
      return new Promise((resolve, reject) => {
        frappe.db.set_value(doctype, docname, { [fieldname]: value }).then((r) => {
          if (r.message) {
            resolve(r.message);
          } else {
            reject();
          }
        }).fail(reject);
      });
    }
    render_editing_input(colIndex, value, parent) {
      const col = this.datatable.getColumn(colIndex);
      let control = null;
      if (col.docfield.fieldtype === "Text Editor") {
        const d = new frappe.ui.Dialog({
          title: __("Edit {0}", [col.docfield.label]),
          fields: [col.docfield],
          primary_action: () => {
            this.datatable.cellmanager.deactivateEditing();
            d.hide();
          },
          on_hide: () => {
            this.datatable.cellmanager.deactivateEditing(false);
          }
        });
        d.show();
        control = d.fields_dict[col.docfield.fieldname];
      } else {
        control = frappe.ui.form.make_control({
          df: col.docfield,
          parent,
          render_input: true
        });
        control.set_value(value);
        control.toggle_label(false);
        control.toggle_description(false);
      }
      return control;
    }
    is_editable(df, data) {
      if (df && frappe.model.can_write(this.doctype) && (data.docstatus !== 1 || df.allow_on_submit) && data.docstatus !== 2 && !df.read_only && !df.is_virtual && !df.hidden && frappe.model.is_non_std_field(df.fieldname))
        return true;
      return false;
    }
    get_data(values) {
      return this.build_rows(values);
    }
    set_fields() {
      ["name", "docstatus"].map((f) => this._add_field(f));
      if (this.report_name && this.report_doc.json.fields) {
        let fields = this.report_doc.json.fields.slice();
        fields.forEach((f) => this._add_field(f[0], f[1]));
        return;
      } else if (this.view_user_settings.fields) {
        let fields = this.view_user_settings.fields;
        fields.forEach((f) => this._add_field(f[0], f[1]));
        return;
      }
      this.set_default_fields();
    }
    set_default_fields() {
      this.fields = this.fields || [];
      const add_field = (f) => this._add_field(f);
      [this.meta.title_field, this.meta.image_field].map(add_field);
      const fields = this.meta.fields.filter((df) => {
        return (df.in_list_view || df.in_standard_filter) && frappe.perm.has_perm(this.doctype, df.permlevel, "read") && frappe.model.is_value_type(df.fieldtype) && !df.report_hide;
      });
      fields.map(add_field);
      fields.filter((df) => df.fieldtype === "Currency" && df.options).map((df) => {
        if (df.options.includes(":")) {
          add_field(df.options.split(":")[1]);
        } else {
          add_field(df.options);
        }
      });
      (this.settings.add_fields || []).map(add_field);
    }
    build_fields() {
      super.build_fields();
    }
    reorder_fields() {
      let table_fields = this.columns.map((df) => [df.field, df.docfield.parent]);
      let fields_already_in_table = table_fields.filter((df) => {
        return this.fields.find((field) => {
          return df[0] == field[0] && df[1] == field[1];
        });
      });
      let fields_to_add = this.fields.filter((df) => {
        return !table_fields.find((field) => {
          return df[0] == field[0] && df[1] == field[1];
        });
      });
      this.fields = [...fields_already_in_table, ...fields_to_add];
    }
    get_fields() {
      let fields = this.fields.map((f) => {
        let column_name = frappe.model.get_full_column_name(f[0], f[1]);
        if (f[1] !== this.doctype) {
          column_name = column_name + ` as '${f[1]}:${f[0]}'`;
        }
        return column_name;
      });
      const cdt_name_fields = this.get_unique_cdt_in_view().map((cdt) => frappe.model.get_full_column_name("name", cdt) + ` as '${cdt}:name'`);
      fields = fields.concat(cdt_name_fields);
      return fields;
    }
    get_unique_cdt_in_view() {
      return this.fields.filter((f) => f[1] !== this.doctype).map((f) => f[1]).uniqBy((d) => d);
    }
    add_column_to_datatable(fieldname, doctype, col_index) {
      const field = [fieldname, doctype];
      this.fields.splice(col_index, 0, field);
      this.add_currency_column(fieldname, doctype, col_index);
      this.build_fields();
      this.setup_columns();
      if (this.datatable)
        this.datatable.destroy();
      this.datatable = null;
      this.refresh();
    }
    add_currency_column(fieldname, doctype, col_index) {
      const df = frappe.meta.get_docfield(doctype, fieldname);
      if (df && df.fieldtype === "Currency" && df.options && !df.options.includes(":") && frappe.meta.has_field(doctype, df.options)) {
        const field = [df.options, doctype];
        if (col_index === void 0) {
          this.fields.push(field);
        } else {
          this.fields.splice(col_index, 0, field);
        }
        const field_label = frappe.meta.get_label(doctype, field[0]);
        frappe.show_alert(__("Also adding the dependent currency field {0}", [__(field_label).bold()]));
      }
    }
    add_status_dependency_column(col, doctype) {
      if (col && !this.fields.find((f) => f[0] === col)) {
        const field = [col, doctype];
        this.fields.push(field);
        this.refresh();
        const field_label = frappe.meta.get_label(doctype, field[0]);
        frappe.show_alert(__("Also adding the status dependency field {0}", [__(field_label).bold()]));
      }
    }
    remove_column_from_datatable(column) {
      const index = this.fields.findIndex((f) => column.field === f[0]);
      if (index === -1)
        return;
      const field = this.fields[index];
      if (field[0] === "name") {
        this.refresh();
        frappe.throw(__("Cannot remove ID field"));
      }
      this.fields.splice(index, 1);
      this.build_fields();
      this.setup_columns();
      this.refresh();
    }
    switch_column(col1, col2) {
      const index1 = this.fields.findIndex((f) => col1.field === f[0]);
      const index2 = this.fields.findIndex((f) => col2.field === f[0]);
      const _fields = this.fields.slice();
      let temp = _fields[index1];
      _fields[index1] = _fields[index2];
      _fields[index2] = temp;
      this.fields = _fields;
      this.build_fields();
      this.setup_columns();
      this.refresh();
    }
    get_columns_for_picker() {
      let out = {};
      const standard_fields_filter = (df) => !in_list(frappe.model.no_value_type, df.fieldtype);
      let doctype_fields = frappe.meta.get_docfields(this.doctype).filter(standard_fields_filter);
      let std_fields = frappe.model.std_fields.filter((df) => df.fieldname !== "docstatus");
      let has_status_values = false;
      if (this.data) {
        has_status_values = frappe.get_indicator(this.data[0], this.doctype);
      }
      if (!frappe.meta.has_field(this.doctype, "status") && has_status_values) {
        doctype_fields = [
          {
            label: __("Status"),
            fieldname: "docstatus",
            fieldtype: "Data"
          }
        ].concat(doctype_fields);
      }
      doctype_fields = [
        {
          label: __("ID", null, "Label of name column in report"),
          fieldname: "name",
          fieldtype: "Data",
          reqd: 1
        }
      ].concat(doctype_fields, std_fields);
      out[this.doctype] = doctype_fields;
      const table_fields = frappe.meta.get_table_fields(this.doctype);
      table_fields.forEach((df) => {
        const cdt = df.options;
        const child_table_fields = frappe.meta.get_docfields(cdt).filter(standard_fields_filter);
        out[cdt] = child_table_fields;
        out[cdt].push({
          label: __("Index"),
          fieldname: "idx",
          fieldtype: "Int",
          parent: cdt
        });
      });
      return out;
    }
    get_dialog_fields() {
      const dialog_fields = [];
      const columns = this.get_columns_for_picker();
      dialog_fields.push({
        label: __(this.doctype),
        fieldname: this.doctype,
        fieldtype: "MultiCheck",
        columns: 2,
        options: columns[this.doctype].filter((df) => {
          return !df.hidden && df.fieldname !== "name";
        }).map((df) => ({
          label: __(df.label),
          value: df.fieldname,
          checked: this.fields.find((f) => f[0] === df.fieldname && f[1] === this.doctype)
        }))
      });
      delete columns[this.doctype];
      const table_fields = frappe.meta.get_table_fields(this.doctype).filter((df) => !df.hidden);
      table_fields.forEach((df) => {
        const cdt = df.options;
        dialog_fields.push({
          label: __(df.label) + ` (${__(cdt)})`,
          fieldname: df.options,
          fieldtype: "MultiCheck",
          columns: 2,
          options: columns[cdt].filter((df2) => {
            return !df2.hidden;
          }).map((df2) => ({
            label: __(df2.label),
            value: df2.fieldname,
            checked: this.fields.find((f) => f[0] === df2.fieldname && f[1] === cdt)
          }))
        });
      });
      return dialog_fields;
    }
    is_column_added(df) {
      return Boolean(this.fields.find((f) => f[0] === df.fieldname && df.parent === f[1]));
    }
    setup_columns() {
      let column_widths = null;
      if (this.columns) {
        column_widths = this.get_column_widths();
      }
      this.columns = [];
      this.columns_map = {};
      for (let f of this.fields) {
        let column;
        if (f[0] !== "docstatus") {
          column = this.build_column(f);
        } else {
          if (!this.fields.includes(["status", this.doctype]) && !frappe.meta.has_field(this.doctype, "status")) {
            column = this.build_column(["docstatus", this.doctype]);
          }
        }
        if (column) {
          if (column_widths) {
            column.width = column_widths[column.id] || column.width || 120;
          }
          this.columns.push(column);
          this.columns_map[column.id] = column;
        }
      }
    }
    build_column(c) {
      let [fieldname, doctype] = c;
      let docfield = frappe.meta.docfield_map[doctype || this.doctype][fieldname];
      if (fieldname === "_aggregate_column") {
        docfield = this.group_by_control.get_group_by_docfield();
      }
      if (fieldname === "idx" && doctype !== this.doctype) {
        docfield = {
          label: "Index",
          fieldtype: "Int",
          parent: doctype
        };
      }
      if (!docfield) {
        docfield = frappe.model.get_std_field(fieldname, true);
        if (docfield) {
          if (!docfield.label) {
            docfield.label = toTitle(fieldname);
            if (docfield.label.includes("_")) {
              docfield.label = docfield.label.replace("_", " ");
            }
          }
          docfield.parent = this.doctype;
          if (fieldname == "name") {
            docfield.options = this.doctype;
          }
          if (fieldname == "docstatus" && !frappe.meta.has_field(this.doctype, "status")) {
            docfield.label = "Status";
            docfield.fieldtype = "Data";
            docfield.name = "status";
          }
        }
      }
      if (!docfield || docfield.report_hide)
        return;
      let title = __(docfield.label);
      if (doctype !== this.doctype) {
        title += ` (${__(doctype)})`;
      }
      const editable = frappe.model.is_non_std_field(fieldname) && !docfield.read_only && !docfield.is_virtual;
      const align = (() => {
        const is_numeric = frappe.model.is_numeric_field(docfield);
        if (is_numeric) {
          return "right";
        }
        return docfield.fieldtype === "Date" ? "right" : "left";
      })();
      let id = fieldname;
      if (doctype !== this.doctype && fieldname !== "_aggregate_column") {
        id = `${doctype}:${fieldname}`;
      }
      let width = (docfield ? cint(docfield.width) : null) || null;
      if (this.report_doc) {
        let saved_column_widths = this.report_doc.json.column_widths || {};
        width = saved_column_widths[id] || width;
      }
      let compareFn = null;
      if (docfield.fieldtype === "Date") {
        compareFn = (cell, keyword) => {
          if (!cell.content)
            return null;
          if (keyword.length !== "YYYY-MM-DD".length)
            return null;
          const keywordValue = frappe.datetime.user_to_obj(keyword);
          const cellValue = frappe.datetime.str_to_obj(cell.content);
          return [+cellValue, +keywordValue];
        };
      }
      return {
        id,
        field: fieldname,
        name: title,
        content: title,
        docfield,
        width,
        editable,
        align,
        compareValue: compareFn,
        format: (value, row, column, data) => {
          let doc = null;
          if (Array.isArray(row)) {
            doc = row.reduce((acc, curr) => {
              if (!curr.column.docfield)
                return acc;
              acc[curr.column.docfield.fieldname] = curr.content;
              return acc;
            }, {});
          } else {
            doc = row;
          }
          return frappe.format(value, column.docfield, { always_show_decimals: true }, doc);
        }
      };
    }
    build_rows(data) {
      const out = data.map((d) => this.build_row(d));
      if (this.add_totals_row) {
        const totals = this.get_columns_totals(data);
        const totals_row = this.columns.map((col, i) => {
          return {
            name: __("Totals Row"),
            content: totals[col.id],
            format: (value) => {
              let formatted_value = frappe.format(value, col.docfield, {
                always_show_decimals: true
              }, data[0]);
              if (i === 0) {
                return this.format_total_cell(formatted_value, col);
              }
              return formatted_value;
            }
          };
        });
        out.push(totals_row);
      }
      return out;
    }
    format_total_cell(formatted_value, df) {
      let cell_value = __("Totals").bold();
      if (frappe.model.is_numeric_field(df.docfield)) {
        cell_value = `<span class="flex justify-between">
				${cell_value} ${$(formatted_value).text()}
			</span>`;
      }
      return cell_value;
    }
    build_row(d) {
      return this.columns.map((col) => {
        var _a;
        if (col.docfield.parent !== this.doctype) {
          const cdt_field = (f) => `${col.docfield.parent}:${f}`;
          const name = d[cdt_field("name")];
          return {
            name,
            doctype: col.docfield.parent,
            content: d[cdt_field(col.field)] || d[col.field],
            editable: Boolean(name && this.is_editable(col.docfield, d)),
            format: (value) => {
              return frappe.format(value, col.docfield, { always_show_decimals: true }, d);
            }
          };
        }
        if (col.field === "docstatus" && !frappe.meta.has_field(this.doctype, "status")) {
          let status = frappe.get_indicator(d, this.doctype);
          if (status) {
            let dependent_col = (_a = status[2]) == null ? void 0 : _a.split(",")[0];
            this.add_status_dependency_column(dependent_col, this.doctype);
            return {
              name: d.name,
              doctype: col.docfield.parent,
              content: status[0],
              editable: false
            };
          } else {
            this.remove_column_from_datatable(col);
          }
        } else if (col.field in d) {
          const value = d[col.field];
          return {
            name: d.name,
            doctype: col.docfield.parent,
            content: value,
            editable: this.is_editable(col.docfield, d)
          };
        }
        return {
          content: ""
        };
      });
    }
    get_checked_items(only_docnames) {
      const indexes = this.datatable.rowmanager.getCheckedRows();
      const items = indexes.map((i) => this.data[i]).filter((i) => i != void 0);
      if (only_docnames) {
        return items.map((d) => d.name);
      }
      return items;
    }
    save_report(save_type) {
      const _save_report = (name) => {
        const report_settings = {
          filters: this.filter_area.get(),
          fields: this.fields,
          order_by: this.sort_selector.get_sql_string(),
          add_totals_row: this.add_totals_row,
          page_length: this.page_length,
          column_widths: this.get_column_widths(),
          group_by: this.group_by_control.get_settings(),
          chart_args: this.get_chart_settings()
        };
        return frappe.call({
          method: "frappe.desk.reportview.save_report",
          args: {
            name,
            doctype: this.doctype,
            report_settings: JSON.stringify(report_settings)
          },
          callback: (r) => {
            if (r.exc) {
              frappe.msgprint(__("Report was not saved (there were errors)"));
              return;
            }
            if (r.message != this.report_name) {
              frappe.boot.user.all_reports[r.message] = {
                ref_doctype: this.doctype,
                report_type: "Report Builder",
                title: r.message
              };
              frappe.set_route("List", this.doctype, "Report", r.message);
              return;
            }
            this.report_doc.json = report_settings;
            this.set_dirty_state_for_custom_report();
          }
        });
      };
      if (this.report_name && save_type == "save") {
        _save_report(this.report_name);
      } else {
        frappe.prompt({ fieldname: "name", label: __("New Report name"), reqd: 1, fieldtype: "Data" }, (data) => {
          _save_report(data.name);
        }, __("Save As"));
      }
    }
    delete_report() {
      return frappe.call({
        method: "frappe.desk.reportview.delete_report",
        args: { name: this.report_name },
        callback(response) {
          if (response.exc)
            return;
          window.history.back();
        }
      });
    }
    get_column_widths() {
      if (this.datatable) {
        return this.datatable.datamanager.getColumns(true).reduce((acc, curr) => {
          acc[curr.id] = parseInt(curr.width);
          return acc;
        }, {});
      }
      return {};
    }
    get_report_doc() {
      return new Promise((resolve) => {
        frappe.model.with_doc("Report", this.report_name, () => {
          resolve(frappe.get_doc("Report", this.report_name));
        });
      });
    }
    get_filters_html_for_print() {
      const filters = this.filter_area.get();
      return filters.map((f) => {
        const [doctype, fieldname, condition, value] = f;
        if (condition !== "=")
          return "";
        const label = frappe.meta.get_label(doctype, fieldname);
        const docfield = frappe.meta.get_docfield(doctype, fieldname);
        return `<h6>${__(label)}: ${frappe.format(value, docfield)}</h6>`;
      }).join("");
    }
    get_columns_totals(data) {
      if (!this.add_totals_row) {
        return [];
      }
      const row_totals = {};
      this.columns.forEach((col, i) => {
        const totals = data.reduce((totals2, d) => {
          if (col.id in d && frappe.model.is_numeric_field(col.docfield)) {
            totals2 += flt(d[col.id]);
            return totals2;
          }
        }, 0);
        row_totals[col.id] = totals;
      });
      return row_totals;
    }
    report_menu_items() {
      let items = [
        {
          label: __("Show Totals"),
          action: () => {
            this.add_totals_row = !this.add_totals_row;
            this.save_view_user_settings({
              add_totals_row: this.add_totals_row
            });
            this.datatable.refresh(this.get_data(this.data));
          }
        },
        {
          label: __("Print"),
          action: () => {
            const rows_in_order = this.datatable.datamanager.rowViewOrder.map((index) => {
              if (this.datatable.bodyRenderer.visibleRowIndices.includes(index)) {
                return this.data[index];
              }
            }).filter(Boolean);
            if (this.add_totals_row) {
              const total_data = this.get_columns_totals(this.data);
              total_data["name"] = __("Totals").bold();
              rows_in_order.push(total_data);
            }
            frappe.ui.get_print_settings(false, (print_settings) => {
              var title = this.report_name || __(this.doctype);
              frappe.render_grid({
                title,
                subtitle: this.get_filters_html_for_print(),
                print_settings,
                columns: this.columns,
                data: rows_in_order,
                can_use_smaller_font: 1
              });
            });
          }
        },
        {
          label: __("Toggle Chart"),
          action: () => this.toggle_charts()
        },
        {
          label: __("Toggle Sidebar"),
          action: () => this.toggle_side_bar(),
          shortcut: "Ctrl+K"
        },
        {
          label: __("Pick Columns"),
          action: () => {
            const d = new frappe.ui.Dialog({
              title: __("Pick Columns"),
              fields: this.get_dialog_fields(),
              primary_action: (values) => {
                let fields = values[this.doctype].map((f) => [f, this.doctype]);
                delete values[this.doctype];
                for (let cdt in values) {
                  fields = fields.concat(values[cdt].map((f) => [f, cdt]));
                }
                this.fields = [["name", this.doctype], ...fields];
                this.fields.map((f) => this.add_currency_column(f[0], f[1]));
                this.reorder_fields();
                this.build_fields();
                this.setup_columns();
                this.datatable.destroy();
                this.datatable = null;
                this.refresh();
                d.hide();
              }
            });
            d.$body.prepend(`
						<div class="columns-search">
							<input type="text" placeholder="${__("Search")}" data-element="search" class="form-control input-xs">
						</div>
					`);
            frappe.utils.setup_search(d.$body, ".unit-checkbox", ".label-area");
            d.show();
          }
        }
      ];
      if (frappe.model.can_export(this.doctype)) {
        items.push({
          label: __("Export"),
          action: () => {
            const args = this.get_args();
            const selected_items = this.get_checked_items(true);
            let fields = [
              {
                fieldtype: "Select",
                label: __("Select File Type"),
                fieldname: "file_format_type",
                options: ["Excel", "CSV"],
                default: "Excel"
              }
            ];
            if (this.total_count > this.count_without_children || args.page_length) {
              fields.push({
                fieldtype: "Check",
                fieldname: "export_all_rows",
                label: __("Export All {0} rows?", [(this.total_count + "").bold()])
              });
            }
            const d = new frappe.ui.Dialog({
              title: __("Export Report: {0}", [__(this.doctype)]),
              fields,
              primary_action_label: __("Download"),
              primary_action: (data) => {
                args.cmd = "frappe.desk.reportview.export_query";
                args.file_format_type = data.file_format_type;
                args.title = this.report_name || this.doctype;
                if (this.add_totals_row) {
                  args.add_totals_row = 1;
                }
                if (selected_items.length > 0) {
                  args.selected_items = selected_items;
                }
                if (!data.export_all_rows) {
                  args.start = 0;
                  args.page_length = this.data.length;
                } else {
                  delete args.start;
                  delete args.page_length;
                }
                open_url_post(frappe.request.url, args);
                d.hide();
              }
            });
            d.show();
          }
        });
      }
      items.push({
        label: __("Setup Auto Email"),
        action: () => {
          if (this.report_name) {
            frappe.set_route("List", "Auto Email Report", { report: this.report_name });
          } else {
            frappe.msgprint(__("Please save the report first"));
          }
        }
      });
      const can_edit_or_delete = (action) => {
        const method = action == "delete" ? "can_delete" : "can_write";
        return this.report_doc && this.report_doc.is_standard !== "Yes" && (frappe.model[method]("Report") || this.report_doc.owner === frappe.session.user);
      };
      if (can_edit_or_delete()) {
        items.push({
          label: __("Save"),
          action: () => this.save_report("save")
        });
      }
      items.push({
        label: __("Save As"),
        action: () => this.save_report("save_as")
      });
      if (can_edit_or_delete("delete")) {
        items.push({
          label: __("Delete"),
          action: () => frappe.confirm("Are you sure you want to delete this report?", () => this.delete_report()),
          shortcut: "Shift+Ctrl+D"
        });
      }
      if (this.report_name && frappe.model.can_set_user_permissions("Report")) {
        items.push({
          label: __("User Permissions"),
          action: () => {
            const args = {
              doctype: "Report",
              name: this.report_name
            };
            frappe.set_route("List", "User Permission", args);
          }
        });
      }
      if (frappe.user.has_role("System Manager")) {
        if (this.get_view_settings) {
          items.push(this.get_view_settings());
        }
      }
      return items.map((i) => Object.assign(i, { standard: true }));
    }
  };

  // frappe/public/js/frappe/views/reports/query_report.js
  var import_frappe_datatable2 = __toESM(require_frappe_datatable_cjs());
  frappe.provide("frappe.widget.utils");
  frappe.provide("frappe.views");
  frappe.provide("frappe.query_reports");
  frappe.standard_pages["query-report"] = function() {
    var wrapper = frappe.container.add_page("query-report");
    frappe.ui.make_app_page({
      parent: wrapper,
      title: __("Query Report"),
      single_column: true
    });
    frappe.query_report = new frappe.views.QueryReport({
      parent: wrapper
    });
    $(wrapper).bind("show", function() {
      frappe.query_report.show();
    });
  };
  frappe.views.QueryReport = class QueryReport extends frappe.views.BaseList {
    show() {
      this.init().then(() => this.load());
    }
    init() {
      if (this.init_promise) {
        return this.init_promise;
      }
      let tasks = [
        this.setup_defaults,
        this.setup_page,
        this.setup_report_wrapper,
        this.setup_events
      ].map((fn) => fn.bind(this));
      this.init_promise = frappe.run_serially(tasks);
      return this.init_promise;
    }
    setup_defaults() {
      this.route = frappe.get_route();
      this.page_name = frappe.get_route_str();
      this.primary_action = null;
      this.refresh = frappe.utils.throttle(this.refresh, 300);
      this.menu_items = [];
    }
    update_url_with_filters() {
      if (frappe.get_route_str() == this.page_name) {
        window.history.replaceState(null, null, this.get_url_with_filters());
      }
    }
    get_url_with_filters() {
      const query_params = Object.entries(this.get_filter_values()).map(([field, value], _idx) => {
        if (Array.isArray(value)) {
          if (!value.length)
            return "";
          value = JSON.stringify(value);
        }
        return `${field}=${encodeURIComponent(value)}`;
      }).filter(Boolean).join("&");
      let full_url = window.location.href.replace(window.location.search, "");
      if (query_params) {
        full_url += "?" + query_params;
      }
      return full_url;
    }
    set_default_secondary_action() {
      this.refresh_button && this.refresh_button.remove();
      this.refresh_button = this.page.add_action_icon("refresh", () => {
        this.setup_progress_bar();
        this.refresh();
      });
    }
    get_no_result_message() {
      return `<div class="msg-box no-border">
			<div>
				<img src="/assets/frappe/images/ui-states/list-empty-state.svg" alt="Generic Empty State" class="null-state">
			</div>
			<p>${__("Nothing to show")}</p>
		</div>`;
    }
    setup_events() {
      frappe.realtime.on("report_generated", (data) => {
        this.toggle_primary_button_disabled(false);
        if (data.report_name) {
          this.prepared_report_action = "Rebuild";
          if (data.name == this.prepared_report_doc_name) {
            this.refresh();
          } else {
            let alert_message = `Report ${this.report_name} generated.
						<a href="#query-report/${this.report_name}/?prepared_report_name=${data.name}">View</a>`;
            frappe.show_alert({ message: alert_message, indicator: "orange" });
          }
        }
      });
      this.page.wrapper.on("click", "[data-action]", (e) => {
        let action_name = $(e.currentTarget).data("action");
        let action = this[action_name];
        if (action.call) {
          action.call(this, e);
        }
      });
    }
    load() {
      if (frappe.get_route().length < 2) {
        this.toggle_nothing_to_show(true);
        return;
      }
      let route_options = {};
      route_options = Object.assign(route_options, frappe.route_options);
      if (this.report_name !== frappe.get_route()[1]) {
        this.load_report(route_options);
      } else if (frappe.has_route_options()) {
        this.refresh_report(route_options);
      } else {
      }
    }
    load_report(route_options) {
      this.page.clear_inner_toolbar();
      this.route = frappe.get_route();
      this.page_name = frappe.get_route_str();
      this.report_name = this.route[1];
      this.page_title = __(this.report_name);
      this.show_save = false;
      this.menu_items = this.get_menu_items();
      this.datatable = null;
      this.prepared_report_action = "New";
      frappe.run_serially([
        () => this.get_report_doc(),
        () => this.get_report_settings(),
        () => this.setup_progress_bar(),
        () => this.setup_page_head(),
        () => this.refresh_report(route_options),
        () => this.add_chart_buttons_to_toolbar(true),
        () => this.add_card_button_to_toolbar(true)
      ]);
    }
    add_card_button_to_toolbar() {
      this.page.add_inner_button(__("Create Card"), () => {
        this.add_card_to_dashboard();
      });
    }
    add_chart_buttons_to_toolbar(show) {
      if (show) {
        this.create_chart_button && this.create_chart_button.remove();
        this.create_chart_button = this.page.add_button(__("Set Chart"), () => {
          this.open_create_chart_dialog();
        });
        if (this.chart_fields || this.chart_options) {
          this.add_to_dashboard_button && this.add_to_dashboard_button.remove();
          this.add_to_dashboard_button = this.page.add_button(__("Add Chart to Dashboard"), () => {
            this.add_chart_to_dashboard();
          });
        }
      } else {
        this.create_chart_button && this.create_chart_button.remove();
        this.add_to_dashboard_button && this.add_to_dashboard_button.remove();
      }
    }
    add_card_to_dashboard() {
      let field_options = frappe.report_utils.get_field_options_from_report(this.columns, this.raw_data);
      const dashboard_field = frappe.dashboard_utils.get_dashboard_link_field();
      const set_standard = frappe.boot.developer_mode;
      const dialog = new frappe.ui.Dialog({
        title: __("Create Card"),
        fields: [
          {
            fieldname: "report_field",
            label: __("Field"),
            fieldtype: "Select",
            options: field_options.numeric_fields
          },
          {
            fieldname: "cb_1",
            fieldtype: "Column Break"
          },
          {
            fieldname: "report_function",
            label: __("Function"),
            options: ["Sum", "Average", "Minimum", "Maximum"],
            fieldtype: "Select"
          },
          {
            fieldname: "sb_1",
            label: __("Add to Dashboard"),
            fieldtype: "Section Break"
          },
          dashboard_field,
          {
            fieldname: "cb_2",
            fieldtype: "Column Break"
          },
          {
            fieldname: "label",
            label: __("Card Label"),
            fieldtype: "Data"
          }
        ],
        primary_action_label: __("Add"),
        primary_action: (values) => {
          if (!values.label) {
            values.label = `${values.report_function} of ${toTitle(values.report_field)}`;
          }
          this.create_number_card(values, values.dashboard, values.label, set_standard);
          dialog.hide();
        }
      });
      dialog.show();
    }
    add_chart_to_dashboard() {
      if (this.chart_fields || this.chart_options) {
        const dashboard_field = frappe.dashboard_utils.get_dashboard_link_field();
        const set_standard = frappe.boot.developer_mode;
        const dialog = new frappe.ui.Dialog({
          title: __("Create Chart"),
          fields: [
            {
              fieldname: "dashboard_chart_name",
              label: "Chart Name",
              fieldtype: "Data"
            },
            dashboard_field
          ],
          primary_action_label: __("Add"),
          primary_action: (values) => {
            this.create_dashboard_chart(this.chart_fields || this.chart_options, values.dashboard, values.dashboard_chart_name, set_standard);
            dialog.hide();
          }
        });
        dialog.show();
      } else {
        frappe.msgprint(__("Please Set Chart"));
      }
    }
    create_number_card(values, dashboard_name, card_name, set_standard) {
      let args = {
        dashboard: dashboard_name || null,
        type: "Report",
        report_name: this.report_name,
        filters_json: JSON.stringify(this.get_filter_values()),
        set_standard
      };
      Object.assign(args, values);
      this.add_to_dashboard("frappe.desk.doctype.number_card.number_card.create_report_number_card", args, dashboard_name, card_name, "Number Card");
    }
    create_dashboard_chart(chart_args, dashboard_name, chart_name, set_standard) {
      let args = {
        dashboard: dashboard_name || null,
        chart_type: "Report",
        report_name: this.report_name,
        type: chart_args.chart_type || frappe.model.unscrub(chart_args.type),
        color: chart_args.color,
        filters_json: JSON.stringify(this.get_filter_values()),
        custom_options: {},
        set_standard
      };
      for (let key in chart_args) {
        if (key != "data") {
          args["custom_options"][key] = chart_args[key];
        }
      }
      if (this.chart_fields) {
        let x_field_title = toTitle(chart_args.x_field);
        let y_field_title = toTitle(chart_args.y_fields[0]);
        chart_name = chart_name || `${this.report_name}: ${x_field_title} vs ${y_field_title}`;
        Object.assign(args, {
          chart_name,
          x_field: chart_args.x_field,
          y_axis: chart_args.y_axis_fields.map((f) => {
            return { y_field: f.y_field, color: f.color };
          }),
          use_report_chart: 0
        });
      } else {
        chart_name = chart_name || this.report_name;
        Object.assign(args, {
          chart_name,
          use_report_chart: 1
        });
      }
      this.add_to_dashboard("frappe.desk.doctype.dashboard_chart.dashboard_chart.create_report_chart", args, dashboard_name, chart_name, "Dashboard Chart");
    }
    add_to_dashboard(method, args, dashboard_name, name, doctype) {
      frappe.xcall(method, { args }).then(() => {
        let message;
        if (dashboard_name) {
          let dashboard_route_html = `<a href="#dashboard-view/${dashboard_name}">${dashboard_name}</a>`;
          message = __("New {0} {1} added to Dashboard {2}", [
            __(doctype),
            name,
            dashboard_route_html
          ]);
        } else {
          message = __("New {0} {1} created", [__(doctype), name]);
        }
        frappe.msgprint(message, __("New {0} Created", [__(doctype)]));
      });
    }
    refresh_report(route_options) {
      this.toggle_message(true);
      this.toggle_report(false);
      return frappe.run_serially([
        () => this.setup_filters(),
        () => this.set_route_filters(route_options),
        () => this.page.clear_custom_actions(),
        () => this.report_settings.onload && this.report_settings.onload(this),
        () => this.refresh()
      ]);
    }
    get_report_doc() {
      return frappe.model.with_doc("Report", this.report_name).then((doc) => {
        this.report_doc = doc;
      }).then(() => frappe.model.with_doctype(this.report_doc.ref_doctype));
    }
    get_report_settings() {
      return new Promise((resolve, reject) => {
        if (frappe.query_reports[this.report_name]) {
          this.report_settings = frappe.query_reports[this.report_name];
          resolve();
        } else {
          frappe.xcall("frappe.desk.query_report.get_script", {
            report_name: this.report_name
          }).then((settings) => {
            frappe.dom.eval(settings.script || "");
            frappe.after_ajax(() => {
              this.report_settings = this.get_local_report_settings();
              this.report_settings.html_format = settings.html_format;
              this.report_settings.execution_time = settings.execution_time || 0;
              frappe.query_reports[this.report_name] = this.report_settings;
              if (this.report_doc.filters && !this.report_settings.filters) {
                this.report_settings.filters = this.report_doc.filters;
              }
              resolve();
            });
          }).catch(reject);
        }
      });
    }
    get_local_report_settings() {
      let report_script_name = this.report_doc.report_type === "Custom Report" ? this.report_doc.reference_report : this.report_name;
      return frappe.query_reports[report_script_name] || {};
    }
    setup_progress_bar() {
      let seconds_elapsed = 0;
      const execution_time = this.report_settings.execution_time || 0;
      if (execution_time < 5)
        return;
      this.interval = setInterval(function() {
        seconds_elapsed += 1;
        frappe.show_progress(__("Preparing Report"), seconds_elapsed, execution_time);
      }, 1e3);
    }
    refresh_filters_dependency() {
      this.filters.forEach((filter) => {
        filter.guardian_has_value = true;
        if (filter.df.depends_on) {
          filter.guardian_has_value = this.evaluate_depends_on_value(filter.df.depends_on, filter.df.label);
          if (filter.guardian_has_value) {
            if (filter.df.hidden_due_to_dependency) {
              filter.df.hidden_due_to_dependency = false;
              this.toggle_filter_display(filter.df.fieldname, false);
            }
          } else {
            if (!filter.df.hidden_due_to_dependency) {
              filter.df.hidden_due_to_dependency = true;
              this.toggle_filter_display(filter.df.fieldname, true);
              filter.set_value(filter.df.default || null);
            }
          }
        }
      });
    }
    evaluate_depends_on_value(expression, filter_label) {
      let out = null;
      let doc = this.get_filter_values();
      if (doc) {
        if (typeof expression === "boolean") {
          out = expression;
        } else if (expression.substr(0, 5) == "eval:") {
          try {
            out = frappe.utils.eval(expression.substr(5), { doc });
          } catch (e) {
            frappe.throw(__('Invalid "depends_on" expression set in filter {0}', [filter_label]));
          }
        } else {
          var value = doc[expression];
          if ($.isArray(value)) {
            out = !!value.length;
          } else {
            out = !!value;
          }
        }
      }
      return out;
    }
    setup_filters() {
      this.clear_filters();
      const { filters = [] } = this.report_settings;
      let filter_area = this.page.page_form;
      this.filters = filters.map((df) => {
        if (df.fieldtype === "Break")
          return;
        let f = this.page.add_field(df, filter_area);
        if (df.default) {
          f.set_input(df.default);
        }
        if (df.get_query)
          f.get_query = df.get_query;
        if (df.on_change)
          f.on_change = df.on_change;
        df.onchange = () => {
          this.refresh_filters_dependency();
          let current_filters = this.get_filter_values();
          if (this.previous_filters && JSON.stringify(this.previous_filters) === JSON.stringify(current_filters)) {
            return;
          }
          this.previous_filters = current_filters;
          setTimeout(() => this.previous_filters = null, 1e4);
          if (f.on_change) {
            f.on_change(this);
          } else {
            if (this.prepared_report) {
              this.reset_report_view();
            } else if (!this._no_refresh) {
              this.refresh(true);
            }
          }
        };
        f = Object.assign(f, df);
        return f;
      }).filter(Boolean);
      this.refresh_filters_dependency();
      if (this.filters.length === 0) {
        this.page.hide_form();
      } else {
        this.page.show_form();
      }
    }
    set_filters(filters) {
      this.filters.map((f) => {
        f.set_input(filters[f.fieldname]);
      });
    }
    set_route_filters(route_options) {
      if (!route_options)
        route_options = frappe.route_options;
      if (route_options) {
        const fields = Object.keys(route_options);
        const filters_to_set = this.filters.filter((f) => fields.includes(f.df.fieldname));
        const promises = filters_to_set.map((f) => {
          return () => {
            let value = route_options[f.df.fieldname];
            if (typeof value === "string" && value[0] === "[") {
              value = JSON.parse(value);
            }
            f.set_value(value);
          };
        });
        promises.push(() => {
          frappe.route_options = null;
        });
        return frappe.run_serially(promises);
      }
    }
    clear_filters() {
      this.page.clear_fields();
    }
    refresh(have_filters_changed) {
      this.toggle_message(true);
      this.toggle_report(false);
      let filters = this.get_filter_values(true);
      let are_default_filters = this.filters.map((filter) => {
        return !have_filters_changed && (filter.default === filter.value || !filter.default && !filter.value);
      }).every((res) => res === true);
      this.show_loading_screen();
      if (this.last_ajax) {
        this.last_ajax.abort();
      }
      const query_params = this.get_query_params();
      if (query_params.prepared_report_name) {
        filters.prepared_report_name = query_params.prepared_report_name;
      }
      return new Promise((resolve) => {
        this.last_ajax = frappe.call({
          method: "frappe.desk.query_report.run",
          type: "GET",
          args: {
            report_name: this.report_name,
            filters,
            is_tree: this.report_settings.tree,
            parent_field: this.report_settings.parent_field,
            are_default_filters
          },
          callback: resolve,
          always: () => this.page.btn_secondary.prop("disabled", false)
        });
      }).then((r) => {
        let data = r.message;
        this.hide_status();
        clearInterval(this.interval);
        this.execution_time = data.execution_time || 0.1;
        if (data.custom_filters) {
          this.set_filters(data.custom_filters);
          this.previous_filters = data.custom_filters;
        }
        if (data.prepared_report) {
          this.prepared_report = true;
          this.prepared_report_document = data.doc;
          if (query_params.prepared_report_name) {
            this.prepared_report_action = "Edit";
            const filters_from_report = JSON.parse(data.doc.filters);
            Object.values(this.filters).forEach(function(field) {
              if (filters_from_report[field.fieldname]) {
                field.set_input(filters_from_report[field.fieldname]);
              }
              if (field.input) {
                field.input.disabled = true;
              }
            });
          }
          this.add_prepared_report_buttons(data.doc);
        }
        if (data.report_summary) {
          this.$summary.empty();
          this.render_summary(data.report_summary);
        }
        if (data.message && !data.prepared_report)
          this.show_status(data.message);
        this.toggle_message(false);
        if (data.result && data.result.length) {
          this.prepare_report_data(data);
          this.chart_options = this.get_chart_options(data);
          this.$chart.empty();
          if (this.chart_options) {
            this.render_chart(this.chart_options);
          } else {
            this.$chart.empty();
            if (this.chart_fields) {
              this.chart_options = frappe.report_utils.make_chart_options(this.columns, this.raw_data, this.chart_fields);
              this.chart_options && this.render_chart(this.chart_options);
            }
          }
          this.render_datatable();
          this.add_chart_buttons_to_toolbar(true);
          this.add_card_button_to_toolbar();
          this.$report.show();
        } else {
          this.data = [];
          this.toggle_nothing_to_show(true);
          this.add_chart_buttons_to_toolbar(false);
        }
        this.show_footer_message();
        frappe.hide_progress();
      }).finally(() => {
        this.hide_loading_screen();
        this.update_url_with_filters();
      });
    }
    render_summary(data) {
      data.forEach((summary) => {
        frappe.utils.build_summary_item(summary).appendTo(this.$summary);
      });
      this.$summary.show();
    }
    get_query_params() {
      const query_string = frappe.utils.get_query_string(frappe.get_route_str());
      const query_params = frappe.utils.get_query_params(query_string);
      return query_params;
    }
    add_prepared_report_buttons(doc) {
      if (doc) {
        this.page.add_inner_button(__("Download Report"), function() {
          window.open(frappe.urllib.get_full_url("/api/method/frappe.core.doctype.prepared_report.prepared_report.download_attachment?dn=" + encodeURIComponent(doc.name)));
        });
        const part1 = __("This report was generated {0}.", [
          frappe.datetime.comment_when(doc.report_end_time)
        ]);
        const part2 = __("To get the updated report, click on {0}.", [__("Rebuild")]);
        const part3 = __("See all past reports.");
        this.show_status(`
				<div class="indicator orange">
					<span>
						${part1}
						${part2}
						<a href="/app/List/Prepared%20Report?report_name=${this.report_name}"> ${part3}</a>
					</span>
				</div>
			`);
      }
      this.primary_action_map = {
        New: {
          label: __("Generate New Report"),
          click: () => {
            this.show_warning_or_generate_report();
          }
        },
        Edit: {
          label: __("Edit"),
          click: () => {
            frappe.set_route(frappe.get_route());
          }
        },
        Rebuild: {
          label: __("Rebuild"),
          click: () => {
            this.show_warning_or_generate_report();
          }
        }
      };
      let primary_action = this.primary_action_map[this.prepared_report_action];
      if (!this.primary_button || this.primary_button.text() !== primary_action.label) {
        this.primary_button = this.page.set_primary_action(primary_action.label, primary_action.click);
      }
    }
    toggle_primary_button_disabled(disable) {
      this.primary_button.prop("disabled", disable);
    }
    show_warning_or_generate_report() {
      frappe.xcall("frappe.core.doctype.prepared_report.prepared_report.get_reports_in_queued_state", {
        filters: this.get_filter_values(),
        report_name: this.report_name
      }).then((reports) => {
        this.queued_prepared_reports = reports;
        if (reports.length) {
          const message = this.get_queued_prepared_reports_warning_message(reports);
          this.prepared_report_dialog = frappe.warn(__("Reports already in Queue"), message, () => this.generate_background_report(), __("Proceed Anyway"), true);
          this.prepared_report_dialog.footer.prepend(`
					<button type="button" class="btn btn-sm btn-default pull-left" data-action="delete_old_queued_reports">
						${__("Delete and Generate New")}
					</button>`);
          frappe.utils.bind_actions_with_object(this.prepared_report_dialog.wrapper, this);
        } else {
          this.generate_background_report();
        }
      });
    }
    get_queued_prepared_reports_warning_message(reports) {
      const route = `/app/List/Prepared Report/List?status=Queued&report_name=${this.report_name}`;
      const report_link_html = reports.length == 1 ? `<a class="underline" href="${route}">${__("1 Report")}</a>` : `<a class="underline" href="${route}">${__("{0} Reports", [
        reports.length
      ])}</a>`;
      const no_of_reports_html = reports.length == 1 ? `${__("There is {0} with the same filters already in the queue:", [
        report_link_html
      ])}` : `${__("There are {0} with the same filters already in the queue:", [
        report_link_html
      ])}`;
      let warning_message = `
			<p>
				${__("Are you sure you want to generate a new report?")}
				${no_of_reports_html}
			</p>`;
      let get_item_html = (item) => `<a class="underline" href="/app/prepared-report/${item.name}">${item.name}</a>`;
      warning_message += reports.map(get_item_html).join(", ");
      return warning_message;
    }
    delete_old_queued_reports() {
      this.prepared_report_dialog.hide();
      frappe.xcall("frappe.core.doctype.prepared_report.prepared_report.delete_prepared_reports", {
        reports: this.queued_prepared_reports
      }).then(() => this.generate_background_report());
    }
    generate_background_report() {
      this.toggle_primary_button_disabled(true);
      let mandatory = this.filters.filter((f) => f.df.reqd);
      let missing_mandatory = mandatory.filter((f) => !f.get_value());
      if (!missing_mandatory.length) {
        let filters = this.get_filter_values(true);
        return new Promise((resolve) => frappe.call({
          method: "frappe.desk.query_report.background_enqueue_run",
          args: {
            report_name: this.report_name,
            filters
          },
          callback: resolve
        })).then((r) => {
          const data = r.message;
          this.prepared_report_doc_name = data.name;
          let alert_message = `<a href='/app/prepared-report/${data.name}'>` + __("Report initiated, click to view status") + `</a>`;
          frappe.show_alert({ message: alert_message, indicator: "orange" }, 10);
          this.toggle_nothing_to_show(true);
        });
      }
    }
    prepare_report_data(data) {
      this.raw_data = data;
      this.columns = this.prepare_columns(data.columns);
      this.custom_columns = [];
      this.data = this.prepare_data(data.result);
      this.linked_doctypes = this.get_linked_doctypes();
      this.tree_report = this.data.some((d) => "indent" in d);
    }
    render_datatable() {
      let data = this.data;
      let columns = this.columns.filter((col) => !col.hidden);
      if (this.raw_data.add_total_row && !this.report_settings.tree) {
        data = data.slice();
        data.splice(-1, 1);
      }
      this.$report.show();
      if (this.datatable && this.datatable.options && this.datatable.options.showTotalRow === this.raw_data.add_total_row) {
        this.datatable.options.treeView = this.tree_report;
        this.datatable.refresh(data, columns);
      } else {
        let datatable_options = {
          columns,
          data,
          inlineFilters: true,
          language: frappe.boot.lang,
          translations: frappe.utils.datatable.get_translations(),
          treeView: this.tree_report,
          layout: "fixed",
          cellHeight: 33,
          showTotalRow: this.raw_data.add_total_row && !this.report_settings.tree,
          direction: frappe.utils.is_rtl() ? "rtl" : "ltr",
          hooks: {
            columnTotal: frappe.utils.report_column_total
          }
        };
        if (this.report_settings.get_datatable_options) {
          datatable_options = this.report_settings.get_datatable_options(datatable_options);
        }
        this.datatable = new import_frappe_datatable2.default(this.$report[0], datatable_options);
      }
      if (typeof this.report_settings.initial_depth == "number") {
        this.datatable.rowmanager.setTreeDepth(this.report_settings.initial_depth);
      }
      if (this.report_settings.after_datatable_render) {
        this.report_settings.after_datatable_render(this.datatable);
      }
    }
    show_loading_screen() {
      const loading_state = `<div class="msg-box no-border">
			<div>
				<img src="/assets/frappe/images/ui-states/list-empty-state.svg" alt="Generic Empty State" class="null-state">
			</div>
			<p>${__("Loading")}...</p>
		</div>`;
      this.$loading.find("div").html(loading_state);
      this.$report.hide();
      this.$loading.show();
    }
    hide_loading_screen() {
      this.$loading.hide();
    }
    get_chart_options(data) {
      let options = this.report_settings.get_chart_data ? this.report_settings.get_chart_data(data.columns, data.result) : data.chart ? data.chart : void 0;
      if (!(options && options.data && options.data.labels && options.data.labels.length > 0))
        return;
      if (options.fieldtype) {
        options.tooltipOptions = {
          formatTooltipY: (d) => frappe.format(d, {
            fieldtype: options.fieldtype,
            options: options.options
          })
        };
      }
      options.axisOptions = {
        shortenYAxisNumbers: 1,
        numberFormatter: frappe.utils.format_chart_axis_number
      };
      options.height = 280;
      return options;
    }
    render_chart(options) {
      this.$chart.empty();
      this.$chart.show();
      this.chart = new frappe.Chart(this.$chart[0], options);
    }
    open_create_chart_dialog() {
      const me = this;
      let field_options = frappe.report_utils.get_field_options_from_report(this.columns, this.raw_data);
      function set_chart_values(values) {
        values.y_fields = [];
        values.colors = [];
        if (values.y_axis_fields) {
          values.y_axis_fields.map((f) => {
            values.y_fields.push(f.y_field);
            values.colors.push(f.color);
          });
        }
        values.y_fields = values.y_fields.map((d) => d.trim()).filter(Boolean);
        return values;
      }
      function preview_chart() {
        const wrapper = $(dialog.fields_dict["chart_preview"].wrapper);
        let values = dialog.get_values(true);
        values = set_chart_values(values);
        if (values.x_field && values.y_fields.length) {
          let options = frappe.report_utils.make_chart_options(me.columns, me.raw_data, values);
          me.chart_fields = values;
          wrapper.empty();
          new frappe.Chart(wrapper[0], options);
          wrapper.find(".chart-container .title, .chart-container .sub-title").hide();
          wrapper.show();
          dialog.fields_dict["create_dashoard_chart"].df.hidden = 0;
          dialog.refresh();
        } else {
          wrapper[0].innerHTML = `<div class="flex justify-center align-center text-muted" style="height: 120px; display: flex;">
					<div>${__("Please select X and Y fields")}</div>
				</div>`;
        }
      }
      const dialog = new frappe.ui.Dialog({
        title: __("Create Chart"),
        fields: [
          {
            fieldname: "x_field",
            label: "X Field",
            fieldtype: "Select",
            default: me.chart_fields ? me.chart_fields.x_field : null,
            options: field_options.non_numeric_fields
          },
          {
            fieldname: "cb_1",
            fieldtype: "Column Break"
          },
          {
            fieldname: "chart_type",
            label: "Type of Chart",
            fieldtype: "Select",
            options: ["Bar", "Line", "Percentage", "Pie", "Donut"],
            default: me.chart_fields ? me.chart_fields.chart_type : "Bar"
          },
          {
            fieldname: "sb_1",
            fieldtype: "Section Break",
            label: "Y Axis"
          },
          {
            fieldname: "y_axis_fields",
            fieldtype: "Table",
            fields: [
              {
                fieldtype: "Select",
                fieldname: "y_field",
                name: "y_field",
                label: __("Y Field"),
                options: field_options.numeric_fields,
                in_list_view: 1
              },
              {
                fieldtype: "Color",
                fieldname: "color",
                name: "color",
                label: __("Color"),
                in_list_view: 1
              }
            ]
          },
          {
            fieldname: "preview_chart_button",
            fieldtype: "Button",
            label: "Preview Chart",
            click: preview_chart
          },
          {
            fieldname: "sb_2",
            fieldtype: "Section Break",
            label: "Chart Preview"
          },
          {
            fieldname: "chart_preview",
            label: "Chart Preview",
            fieldtype: "HTML"
          },
          {
            fieldname: "create_dashoard_chart",
            label: "Add Chart to Dashboard",
            fieldtype: "Button",
            hidden: 1,
            click: () => {
              dialog.hide();
              this.add_chart_to_dashboard();
            }
          }
        ],
        primary_action_label: __("Create"),
        primary_action: (values) => {
          values = set_chart_values(values);
          let options = frappe.report_utils.make_chart_options(this.columns, this.raw_data, values);
          me.chart_fields = values;
          let x_field_label = field_options.numeric_fields.filter((field) => field.value == values.y_fields[0])[0].label;
          let y_field_label = field_options.non_numeric_fields.filter((field) => field.value == values.x_field)[0].label;
          options.title = __("{0}: {1} vs {2}", [
            this.report_name,
            x_field_label,
            y_field_label
          ]);
          this.render_chart(options);
          this.add_chart_buttons_to_toolbar(true);
          dialog.hide();
        }
      });
      dialog.show();
      setTimeout(preview_chart, 500);
    }
    prepare_columns(columns) {
      return columns.map((column) => {
        column = frappe.report_utils.prepare_field_from_column(column);
        const format_cell = (value, row, column2, data) => {
          if (column2.isHeader && !data && this.data) {
            let index = 1;
            if (this.report_settings.get_datatable_options) {
              let datatable = this.report_settings.get_datatable_options({});
              if (datatable && datatable.checkboxColumn)
                index = 2;
            }
            if (column2.colIndex === index && !value) {
              value = "Total";
              column2 = { fieldtype: "Data" };
            } else if (in_list(["Currency", "Float"], column2.fieldtype)) {
              data = this.data[0];
            }
          }
          return frappe.format(value, column2, { for_print: false, always_show_decimals: true }, data);
        };
        let compareFn = null;
        if (column.fieldtype === "Date") {
          compareFn = (cell, keyword) => {
            if (!cell.content)
              return null;
            if (keyword.length !== "YYYY-MM-DD".length)
              return null;
            const keywordValue = frappe.datetime.user_to_obj(keyword);
            const cellValue = frappe.datetime.str_to_obj(cell.content);
            return [+cellValue, +keywordValue];
          };
        }
        return Object.assign(column, {
          id: column.fieldname,
          name: __(column.label, null, `Column of report '${this.report_name}'`),
          width: parseInt(column.width) || null,
          editable: false,
          compareValue: compareFn,
          format: (value, row, column2, data) => {
            if (this.report_settings.formatter) {
              return this.report_settings.formatter(value, row, column2, data, format_cell);
            }
            return format_cell(value, row, column2, data);
          }
        });
      });
    }
    prepare_data(data) {
      return data.map((row) => {
        let row_obj = {};
        if (Array.isArray(row)) {
          this.columns.forEach((column, i) => {
            row_obj[column.id] = row[i];
          });
          return row_obj;
        }
        return row;
      });
    }
    get_visible_columns() {
      const visible_column_ids = this.datatable.datamanager.getColumns(true).map((col) => col.id);
      return visible_column_ids.map((id) => this.columns.find((col) => col.id === id)).filter(Boolean);
    }
    get_filter_values(raise) {
      const mandatory = this.filters.filter((f) => f.df.reqd || f.df.mandatory);
      const missing_mandatory = mandatory.filter((f) => !f.get_value());
      if (raise && missing_mandatory.length > 0) {
        let message = __("Please set filters");
        this.hide_loading_screen();
        this.toggle_message(raise, message);
        throw "Filter missing";
      }
      raise && this.toggle_message(false);
      const filters = this.filters.filter((f) => f.get_value()).map((f) => {
        var v = f.get_value();
        if (f.df.hidden)
          v = f.value;
        if (v === "%")
          v = null;
        if (f.df.wildcard_filter) {
          v = `%${v}%`;
        }
        return {
          [f.df.fieldname]: v
        };
      }).reduce((acc, f) => {
        Object.assign(acc, f);
        return acc;
      }, {});
      return filters;
    }
    get_filter(fieldname) {
      const field = (this.filters || []).find((f) => f.df.fieldname === fieldname);
      if (!field) {
        console.warn(`[Query Report] Invalid filter: ${fieldname}`);
      }
      return field;
    }
    get_filter_value(fieldname) {
      const field = this.get_filter(fieldname);
      return field ? field.get_value() : null;
    }
    set_filter_value(fieldname, value) {
      let field_value_map = {};
      if (typeof fieldname === "string") {
        field_value_map[fieldname] = value;
      } else {
        field_value_map = fieldname;
      }
      this._no_refresh = true;
      Object.keys(field_value_map).forEach((fieldname2, i, arr) => {
        const value2 = field_value_map[fieldname2];
        if (i === arr.length - 1) {
          this._no_refresh = false;
        }
        this.get_filter(fieldname2).set_value(value2);
      });
    }
    set_breadcrumbs() {
      if (!this.report_doc || !this.report_doc.ref_doctype)
        return;
      const ref_doctype = frappe.get_meta(this.report_doc.ref_doctype);
      frappe.breadcrumbs.add(ref_doctype.module);
    }
    make_access_log(method, file_format) {
      frappe.call("frappe.core.doctype.access_log.access_log.make_access_log", {
        doctype: this.doctype || "",
        report_name: this.report_name,
        filters: this.get_filter_values(),
        file_type: file_format,
        method
      });
    }
    print_report(print_settings) {
      const custom_format = this.report_settings.html_format || null;
      const filters_html = this.get_filters_html_for_print();
      const landscape = print_settings.orientation == "Landscape";
      this.make_access_log("Print", "PDF");
      frappe.render_grid({
        template: print_settings.columns ? "print_grid" : custom_format,
        title: __(this.report_name),
        subtitle: filters_html,
        print_settings,
        landscape,
        filters: this.get_filter_values(),
        data: this.get_data_for_print(),
        columns: this.get_columns_for_print(print_settings, custom_format),
        original_data: this.data,
        report: this,
        can_use_smaller_font: this.report_doc.is_standard === "Yes" && custom_format ? 0 : 1
      });
    }
    pdf_report(print_settings) {
      const base_url = frappe.urllib.get_base_url();
      const print_css = frappe.boot.print_css;
      const landscape = print_settings.orientation == "Landscape";
      const custom_format = this.report_settings.html_format || null;
      const columns = this.get_columns_for_print(print_settings, custom_format);
      const data = this.get_data_for_print();
      const applied_filters = this.get_filter_values();
      const filters_html = this.get_filters_html_for_print();
      const template = print_settings.columns || !custom_format ? "print_grid" : custom_format;
      const content = frappe.render_template(template, {
        title: __(this.report_name),
        subtitle: filters_html,
        filters: applied_filters,
        data,
        original_data: this.data,
        columns,
        report: this
      });
      const html = frappe.render_template("print_template", {
        title: __(this.report_name),
        content,
        base_url,
        print_css,
        print_settings,
        landscape,
        columns,
        lang: frappe.boot.lang,
        layout_direction: frappe.utils.is_rtl() ? "rtl" : "ltr",
        can_use_smaller_font: this.report_doc.is_standard === "Yes" && custom_format ? 0 : 1
      });
      let filter_values = [], name_len = 0;
      for (var key of Object.keys(applied_filters)) {
        name_len = name_len + applied_filters[key].toString().length;
        if (name_len > 200)
          break;
        filter_values.push(applied_filters[key]);
      }
      print_settings.report_name = `${__(this.report_name)}_${filter_values.join("_")}.pdf`;
      frappe.render_pdf(html, print_settings);
    }
    get_filters_html_for_print() {
      const applied_filters = this.get_filter_values();
      return Object.keys(applied_filters).map((fieldname) => {
        const docfield = frappe.query_report.get_filter(fieldname).df;
        const value = applied_filters[fieldname];
        return `<h6>${__(docfield.label)}: ${frappe.format(value, docfield)}</h6>`;
      }).join("");
    }
    export_report() {
      if (this.export_dialog) {
        this.export_dialog.clear();
        this.export_dialog.show();
        return;
      }
      let export_dialog_fields = [
        {
          label: __("Select File Format"),
          fieldname: "file_format",
          fieldtype: "Select",
          options: ["Excel", "CSV"],
          default: "Excel",
          reqd: 1
        }
      ];
      if (this.tree_report) {
        export_dialog_fields.push({
          label: __("Include indentation"),
          fieldname: "include_indentation",
          fieldtype: "Check"
        });
      }
      this.export_dialog = frappe.prompt(export_dialog_fields, ({ file_format, include_indentation }) => {
        this.make_access_log("Export", file_format);
        if (file_format === "CSV") {
          const column_row = this.columns.reduce((acc, col) => {
            if (!col.hidden) {
              acc.push(__(col.label));
            }
            return acc;
          }, []);
          const data = this.get_data_for_csv(include_indentation);
          const out = [column_row].concat(data);
          frappe.tools.downloadify(out, null, this.report_name);
        } else {
          let filters = this.get_filter_values(true);
          if (frappe.urllib.get_dict("prepared_report_name")) {
            filters = Object.assign(frappe.urllib.get_dict("prepared_report_name"), filters);
          }
          const visible_idx = this.datatable.bodyRenderer.visibleRowIndices;
          if (visible_idx.length + 1 === this.data.length) {
            visible_idx.push(visible_idx.length);
          }
          const args = {
            cmd: "frappe.desk.query_report.export_query",
            report_name: this.report_name,
            custom_columns: this.custom_columns.length ? this.custom_columns : [],
            file_format_type: file_format,
            filters,
            visible_idx,
            include_indentation
          };
          open_url_post(frappe.request.url, args);
        }
      }, __("Export Report: {0}", [this.report_name]), __("Download"));
    }
    get_data_for_csv(include_indentation) {
      const rows = this.datatable.bodyRenderer.visibleRows;
      if (this.raw_data.add_total_row) {
        rows.push(this.datatable.bodyRenderer.getTotalRow());
      }
      return rows.map((row) => {
        const standard_column_count = this.datatable.datamanager.getStandardColumnCount();
        return row.slice(standard_column_count).map((cell, i) => {
          if (cell.column.fieldtype === "Duration") {
            cell.content = frappe.utils.get_formatted_duration(cell.content);
          }
          if (include_indentation && i === 0) {
            cell.content = "   ".repeat(row.meta.indent) + (cell.content || "");
          }
          return cell.content || "";
        });
      });
    }
    get_data_for_print() {
      if (!this.data.length) {
        return [];
      }
      const rows = this.datatable.datamanager.rowViewOrder.map((index) => {
        if (this.datatable.bodyRenderer.visibleRowIndices.includes(index)) {
          return this.data[index];
        }
      }).filter(Boolean);
      if (this.raw_data.add_total_row) {
        let totalRow = this.datatable.bodyRenderer.getTotalRow().reduce((row, cell) => {
          row[cell.column.id] = cell.content;
          row.is_total_row = true;
          return row;
        }, {});
        rows.push(totalRow);
      }
      return rows;
    }
    get_columns_for_print(print_settings, custom_format) {
      let columns = [];
      if (print_settings && print_settings.columns) {
        columns = this.get_visible_columns().filter((column) => print_settings.columns.includes(column.fieldname));
      } else {
        columns = custom_format ? this.columns : this.get_visible_columns();
      }
      return columns;
    }
    get_menu_items() {
      let items = [
        {
          label: __("Refresh"),
          action: () => this.refresh(),
          class: "visible-xs"
        },
        {
          label: __("Edit"),
          action: () => frappe.set_route("Form", "Report", this.report_name),
          condition: () => frappe.user.is_report_manager(),
          standard: true
        },
        {
          label: __("Print"),
          action: () => {
            let dialog = frappe.ui.get_print_settings(false, (print_settings) => this.print_report(print_settings), this.report_doc.letter_head, this.get_visible_columns());
            this.add_portrait_warning(dialog);
          },
          condition: () => frappe.model.can_print(this.report_doc.ref_doctype),
          standard: true
        },
        {
          label: __("PDF"),
          action: () => {
            let dialog = frappe.ui.get_print_settings(false, (print_settings) => this.pdf_report(print_settings), this.report_doc.letter_head, this.get_visible_columns());
            this.add_portrait_warning(dialog);
          },
          condition: () => frappe.model.can_print(this.report_doc.ref_doctype),
          standard: true
        },
        {
          label: __("Export"),
          action: () => this.export_report(),
          condition: () => frappe.model.can_export(this.report_doc.ref_doctype),
          standard: true
        },
        {
          label: __("Setup Auto Email"),
          action: () => frappe.set_route("List", "Auto Email Report", { report: this.report_name }),
          standard: true
        },
        {
          label: __("Add Column"),
          action: () => {
            let d = new frappe.ui.Dialog({
              title: __("Add Column"),
              fields: [
                {
                  fieldtype: "Select",
                  fieldname: "doctype",
                  label: __("From Document Type"),
                  options: this.linked_doctypes.map((df) => ({
                    label: df.doctype,
                    value: df.doctype
                  })),
                  change: () => {
                    let doctype = d.get_value("doctype");
                    frappe.model.with_doctype(doctype, () => {
                      let options = frappe.meta.get_docfields(doctype).filter(frappe.model.is_value_type).map((df) => ({
                        label: df.label,
                        value: df.fieldname
                      }));
                      d.set_df_property("field", "options", options.sort(function(a, b) {
                        if (a.label < b.label) {
                          return -1;
                        }
                        if (a.label > b.label) {
                          return 1;
                        }
                        return 0;
                      }));
                    });
                  }
                },
                {
                  fieldtype: "Select",
                  label: __("Field"),
                  fieldname: "field",
                  options: []
                },
                {
                  fieldtype: "Select",
                  label: __("Insert After"),
                  fieldname: "insert_after",
                  options: this.columns.map((df) => df.label)
                }
              ],
              primary_action: (values) => {
                const custom_columns = [];
                let df = frappe.meta.get_docfield(values.doctype, values.field);
                const insert_after_index = this.columns.findIndex((column) => column.label === values.insert_after);
                custom_columns.push({
                  fieldname: df.fieldname,
                  fieldtype: df.fieldtype,
                  label: df.label,
                  insert_after_index,
                  link_field: this.doctype_field_map[values.doctype],
                  doctype: values.doctype,
                  options: df.options,
                  width: 100
                });
                this.custom_columns = this.custom_columns.concat(custom_columns);
                frappe.call({
                  method: "frappe.desk.query_report.get_data_for_custom_field",
                  args: {
                    field: values.field,
                    doctype: values.doctype
                  },
                  callback: (r) => {
                    const custom_data = r.message;
                    const link_field = this.doctype_field_map[values.doctype];
                    this.add_custom_column(custom_columns, custom_data, link_field, values.field, insert_after_index);
                    d.hide();
                  }
                });
                this.set_menu_items();
              }
            });
            d.show();
          },
          standard: true
        },
        {
          label: __("User Permissions"),
          action: () => frappe.set_route("List", "User Permission", {
            doctype: "Report",
            name: this.report_name
          }),
          condition: () => frappe.model.can_set_user_permissions("Report"),
          standard: true
        }
      ];
      if (frappe.user.is_report_manager()) {
        items.push({
          label: __("Save"),
          action: () => {
            let d = new frappe.ui.Dialog({
              title: __("Save Report"),
              fields: [
                {
                  fieldtype: "Data",
                  fieldname: "report_name",
                  label: __("Report Name"),
                  default: this.report_doc.is_standard == "No" ? this.report_name : "",
                  reqd: true
                }
              ],
              primary_action: (values) => {
                frappe.call({
                  method: "frappe.desk.query_report.save_report",
                  args: {
                    reference_report: this.report_name,
                    report_name: values.report_name,
                    columns: this.get_visible_columns(),
                    filters: this.get_filter_values()
                  },
                  callback: function(r) {
                    this.show_save = false;
                    d.hide();
                    frappe.set_route("query-report", r.message);
                  }
                });
              }
            });
            d.show();
          },
          standard: true
        });
      }
      return items;
    }
    add_portrait_warning(dialog) {
      if (this.columns.length > 10) {
        dialog.set_df_property("orientation", "change", () => {
          let value = dialog.get_value("orientation");
          let description = value === "Portrait" ? __("Report with more than 10 columns looks better in Landscape mode.") : "";
          dialog.set_df_property("orientation", "description", description);
        });
      }
    }
    add_custom_column(custom_column, custom_data, link_field, column_field, insert_after_index) {
      const column = this.prepare_columns(custom_column);
      this.columns.splice(insert_after_index + 1, 0, column[0]);
      this.data.forEach((row) => {
        row[column_field] = custom_data[row[link_field]];
      });
      this.render_datatable();
    }
    get_linked_doctypes() {
      let doctypes = [];
      let dynamic_links = [];
      let dynamic_doctypes = /* @__PURE__ */ new Set();
      this.doctype_field_map = {};
      this.columns.forEach((df) => {
        if (df.fieldtype == "Link" && df.options && df.options != "Currency") {
          doctypes.push({
            doctype: df.options,
            fieldname: df.fieldname
          });
        } else if (df.fieldtype == "Dynamic Link" && df.options) {
          dynamic_links.push({
            link_name: df.options,
            fieldname: df.fieldname
          });
        }
      });
      this.data.forEach((row) => {
        dynamic_links.forEach((field) => {
          if (row[field.link_name]) {
            dynamic_doctypes.add(row[field.link_name] + ":" + field.fieldname);
          }
        });
      });
      doctypes = doctypes.concat(Array.from(dynamic_doctypes).map((d) => {
        const doc_field_pair = d.split(":");
        return {
          doctype: doc_field_pair[0],
          fieldname: doc_field_pair[1]
        };
      }));
      doctypes.forEach((doc) => {
        this.doctype_field_map[doc.doctype] = doc.fieldname;
      });
      return doctypes;
    }
    setup_report_wrapper() {
      if (this.$report)
        return;
      $(".page-head-content").removeClass("border-bottom");
      let page_form = this.page.main.find(".page-form");
      this.$status = $(`<div class="form-message text-muted small"></div>`).hide().insertAfter(page_form);
      this.$summary = $(`<div class="report-summary"></div>`).hide().appendTo(this.page.main);
      this.$chart = $('<div class="chart-wrapper">').hide().appendTo(this.page.main);
      this.$loading = $(this.message_div("")).hide().appendTo(this.page.main);
      this.$report = $('<div class="report-wrapper">').appendTo(this.page.main);
      this.$message = $(this.message_div("")).hide().appendTo(this.page.main);
    }
    show_status(status_message) {
      this.$status.html(status_message).show();
    }
    hide_status() {
      this.$status.hide();
    }
    show_footer_message() {
      this.$report_footer && this.$report_footer.remove();
      this.$report_footer = $(`<div class="report-footer text-muted"></div>`).appendTo(this.page.main);
      if (this.tree_report) {
        this.$tree_footer = $(`<div class="tree-footer col-md-6">
				<button class="btn btn-xs btn-default" data-action="expand_all_rows">
					${__("Expand All")}</button>
				<button class="btn btn-xs btn-default" data-action="collapse_all_rows">
					${__("Collapse All")}</button>
			</div>`);
        $(this.$report_footer).append(this.$tree_footer);
        this.$tree_footer.find("[data-action=collapse_all_rows]").show();
        this.$tree_footer.find("[data-action=expand_all_rows]").hide();
      }
      const message = __("For comparison, use >5, <10 or =324. For ranges, use 5:10 (for values between 5 & 10).");
      const execution_time_msg = __("Execution Time: {0} sec", [this.execution_time || 0.1]);
      this.$report_footer.append(`<div class="col-md-12">
			<span">${message}</span><span class="pull-right">${execution_time_msg}</span>
		</div>`);
    }
    expand_all_rows() {
      this.$tree_footer.find("[data-action=expand_all_rows]").hide();
      this.datatable.rowmanager.expandAllNodes();
      this.$tree_footer.find("[data-action=collapse_all_rows]").show();
    }
    collapse_all_rows() {
      this.$tree_footer.find("[data-action=collapse_all_rows]").hide();
      this.datatable.rowmanager.collapseAllNodes();
      this.$tree_footer.find("[data-action=expand_all_rows]").show();
    }
    message_div(message) {
      return `<div class='flex justify-center align-center text-muted' style='height: 50vh;'>
			<div>${message}</div>
		</div>`;
    }
    reset_report_view() {
      this.hide_status();
      this.toggle_nothing_to_show(true);
      this.refresh();
    }
    toggle_nothing_to_show(flag) {
      let message = this.prepared_report && !this.prepared_report_document ? __("This is a background report. Please set the appropriate filters and then generate a new one.") : this.get_no_result_message();
      this.toggle_message(flag, message);
      if (flag && this.prepared_report) {
        this.prepared_report_action = "New";
        if (!this.primary_button.is(":visible")) {
          this.add_prepared_report_buttons();
        }
      }
    }
    toggle_message(flag, message) {
      if (flag) {
        this.$message.find("div").html(message);
        this.$message.show();
      } else {
        this.$message.hide();
      }
    }
    toggle_filter_display(fieldname, flag) {
      this.$page.find(`div[data-fieldname=${fieldname}]`).toggleClass("hide-control", flag);
    }
    toggle_report(flag) {
      this.$report.toggle(flag);
      this.$chart.toggle(flag);
      this.$summary.toggle(flag);
    }
    get_checked_items(only_docnames) {
      const indexes = this.datatable.rowmanager.getCheckedRows();
      return indexes.reduce((items, i) => {
        if (i === void 0)
          return items;
        const item = this.data[i];
        items.push(only_docnames ? item.name : item);
        return items;
      }, []);
    }
    get get_values() {
      return this.get_filter_values;
    }
  };
  Object.defineProperty(frappe, "query_report_filters_by_name", {
    get() {
      console.warn("[Query Report] frappe.query_report_filters_by_name is deprecated. Please use the new api: frappe.query_report.get_filter_value(fieldname) and frappe.query_report.set_filter_value(fieldname, value)");
      return null;
    }
  });

  // frappe-html:/home/adminuser/frappe-bench/apps/frappe/frappe/public/js/frappe/views/reports/print_grid.html
  frappe.templates["print_grid"] = `<!-- title -->
{% if title %}
<h2>{{ __(title) }}</h2>
<hr>
{% endif %}
{% if subtitle %}
{{ subtitle }}
<hr>
{% endif %}
<table class="table table-bordered">
	<!-- heading -->
	<thead>
		<tr>
		<th> # </th>
		{% for col in columns %}
			{% if col.name && col._id !== "_check" %}
			<th
				{% if col.minWidth %}
					style="min-width: {{ col.minWidth }}px"
				{% endif %}
				{% if col.docfield && frappe.model.is_numeric_field(col.docfield) %}
					class="text-right"
				{% endif %}
			>
				{{ __(col.name) }}</th>
			{% endif %}
		{% endfor %}
		</tr>
	</thead>
	<!-- body -->
	<tbody>
		{% for row in data %}
			<tr style="height: 30px">
			<td {% if row.bold == 1 %} style="font-weight: bold" {% endif %}>
				<span> {{ row._index + 1 }} </span>
			</td>
			{% for col in columns %}
				{% if col.name && col._id !== "_check" %}
					{% var value = col.fieldname ? row[col.fieldname] : row[col.id] %}
					{% var longest_word = cstr(value).split(' ').reduce((longest, word) => word.length > longest.length ? word : longest, ''); %}
					<td {% if row.bold == 1 %} style="font-weight: bold" {% endif %} {% if longest_word.length > 45 %} class="overflow-wrap-anywhere" {% endif %}>
						<span {% if col._index == 0 %} style="padding-left: {%= cint(row.indent) * 2 %}em" {% endif %}>
							{% format_data = row.is_total_row && ["Currency", "Float"].includes(col.fieldtype) ? data[0] : row %}
							{% if (row.is_total_row && col._index == 0) { %}
								{{ __("Total") }}
							{% } else { %}
								{{
									col.formatter
										? col.formatter(row._index, col._index, value, col, format_data, true)
										: col.format
											? col.format(value, row, col, format_data)
											: col.docfield
												? frappe.format(value, col.docfield)
												: value
								}}
							{% } %}
						</span>
					</td>
				{% endif %}
			{% endfor %}
			</tr>
		{% endfor %}
	</tbody>
</table>
`;

  // frappe-html:/home/adminuser/frappe-bench/apps/frappe/frappe/public/js/frappe/views/reports/print_tree.html
  frappe.templates["print_tree"] = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="">
		<title>{{ title }}</title>
		<link href="{{ base_url }}/assets/frappe/css/bootstrap.css" rel="stylesheet">
		<link type="text/css" rel="stylesheet"
			href="{{ base_url }}/assets/frappe/css/fonts/fontawesome/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="{{ base_url }}/assets/frappe/css/tree.css">
		<link rel="stylesheet" type="text/css" href="{{ base_url }}{{ print_format_css_path }}">
		<style>
			{{ print_css }}
		</style>
		<style>
			.tree.opened::before,
			.tree-node.opened::before,
			.tree:last-child::after,
			.tree-node:last-child::after {
				z-index: 1;
				border-left: 1px solid #d1d8dd;
				background: none;
			}
			.tree a,
			.tree-link {
				text-decoration: none;
				cursor: default;
			}
			.tree.opened > .tree-children > .tree-node > .tree-link::before,
			.tree-node.opened > .tree-children > .tree-node > .tree-link::before {
				border-top: 1px solid #d1d8dd;
				z-index: 1;
				background: none;
			}
			i.fa.fa-fw.fa-folder {
				z-index: 2;
				position: relative;
			}
			.tree:last-child::after, .tree-node:last-child::after {
				display: none;
			}
			.tree-node-toolbar {
				display: none;
			}
			i.octicon.octicon-primitive-dot.text-extra-muted {
				width: 7px;
				height: 7px;
				border-radius: 50%;
				background: #d1d8dd;
				display: inline-block;
				position: relative;
				z-index: 2;
			}

			@media (max-width: 767px) {
				ul.tree-children {
					padding-left: 20px;
				}
			}
		</style>
  	</head>
	<body>
		<svg id="frappe-symbols" aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" class="d-block" xmlns="http://www.w3.org/2000/svg">
			<symbol viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" id="icon-primitive-dot">
				<path d="M9.5 6a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"></path>
			</symbol>

			<symbol viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" id="icon-folder-open">
				<path d="M8.024 6.5H3a.5.5 0 0 0-.5.5v8a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V9.5A.5.5 0 0 0 17 9h-6.783a.5.5 0 0 1-.417-.224L8.441 6.724a.5.5 0 0 0-.417-.224z" stroke="var(--icon-stroke)" stroke-miterlimit="10" stroke-linecap="square"></path>
				<path d="M3.88 4.5v-1a.5.5 0 0 1 .5-.5h11.24a.5.5 0 0 1 .5.5V7" stroke="var(--icon-stroke)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
			</symbol>

			<symbol viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" id="icon-folder-normal">
				<path d="M2.5 4v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V6.5a1 1 0 0 0-1-1h-6.283a.5.5 0 0 1-.417-.224L8.441 3.224A.5.5 0 0 0 8.024 3H3.5a1 1 0 0 0-1 1z" stroke="var(--icon-stroke)" stroke-miterlimit="10" stroke-linecap="square"></path>
			</symbol>
		</svg>
		<div class="print-format-gutter">
			{% if print_settings.repeat_header_footer %}
				<div id="footer-html" class="visible-pdf">
					{% if print_settings.letter_head && print_settings.letter_head.footer %}
						<div class="letter-head-footer">
							{{ print_settings.letter_head.footer }}
						</div>
					{% endif %}
					<p class="text-center small page-number visible-pdf">
						{{ __("Page {0} of {1}", [\`<span class="page"></span>\`, \`<span class="topage"></span>\`]) }}
					</p>
				</div>
			{% endif %}

			<div class="print-format {% if landscape %} landscape {% endif %}">
				{% if print_settings.letter_head %}
				<div {% if print_settings.repeat_header_footer %} id="header-html" class="hidden-pdf" {% endif %}>
					<div class="letter-head">{{ print_settings.letter_head.header }}</div>
				</div>
					{% endif %}
					<div class="tree opened">
						{{ tree }}
					</div>
			</div>
		</div>
	</body>
</html>
`;

  // frappe-html:/home/adminuser/frappe-bench/apps/frappe/frappe/public/js/frappe/ui/group_by/group_by.html
  frappe.templates["group_by"] = `<div class="group-by-box">
	<div class="visible-xs flex justify-flex-end">
		<span class="remove-group-by">
			{{ __("Remove") }}
		</span>
	</div>
	<div class="list_groupby row">
		<div class="col-sm-8 form-group">
			<select class="group-by form-control input-xs">
				<option value="" disabled selected>{{ __("Select Group By...") }}</option>
				{% for (var parent_doctype in group_by_conditions) { %}
					{% for (var val in group_by_conditions[parent_doctype]) { %}
						{% if (parent_doctype !== doctype) { %}
						<option
							data-doctype="{{parent_doctype}}"
							value="{{group_by_conditions[parent_doctype][val].fieldname}}"
						>
							{{ __(group_by_conditions[parent_doctype][val].label) }}
							({{ __(parent_doctype) }})
						</option>
						{% } else { %}
						<option
							data-doctype="{{parent_doctype}}"
							value="{{group_by_conditions[parent_doctype][val].fieldname}}"
						>
							{{ __(group_by_conditions[parent_doctype][val].label) }}
						</option>
						{% } %}
					{% } %}
				{% } %}
			</select>
		</div>
		<div class="col-sm-3 form-group">
			<select class="aggregate-function form-control input-xs">
				{% for condition in aggregate_function_conditions %}
				<option value="{{condition.name}}">{{ __(condition.label) }}</option>
				{% endfor %}
			</select>
		</div>
		<div class="col-sm-4 col-xs-12" style="display: none">
			<select class="aggregate-on form-control input-xs">
				<option value="" disabled selected>{{ __("Select Field...") }}</option>
			</select>
		</div>
		<div class="groupby-actions pull-left col-sm-1 hidden-xs">
			<span class="remove-group-by">
				<svg class="icon icon-sm">
					<use href="#icon-close"></use>
				</svg>
			</span>
		</div>
	</div>
</div>
`;

  // frappe/public/js/frappe/ui/group_by/group_by.js
  frappe.provide("frappe.views");
  frappe.ui.GroupBy = class {
    constructor(report_view) {
      this.report_view = report_view;
      this.page = report_view.page;
      this.doctype = report_view.doctype;
      this.make();
    }
    make() {
      this.make_group_by_button();
      this.init_group_by_popover();
      this.set_popover_events();
    }
    init_group_by_popover() {
      const sql_aggregate_functions = [
        { name: "count", label: __("Count") },
        { name: "sum", label: __("Sum") },
        { name: "avg", label: __("Average") }
      ];
      const group_by_template = $(frappe.render_template("group_by", {
        doctype: this.doctype,
        group_by_conditions: this.get_group_by_fields(),
        aggregate_function_conditions: sql_aggregate_functions
      }));
      this.group_by_button.popover({
        content: group_by_template,
        template: `
				<div class="group-by-popover popover">
					<div class="arrow"></div>
					<div class="popover-body popover-content">
					</div>
				</div>
			`,
        html: true,
        trigger: "manual",
        container: "body",
        placement: "bottom",
        offset: "-100px, 0"
      });
    }
    set_popover_events() {
      $(document.body).on("click", (e) => {
        if (this.wrapper && this.wrapper.is(":visible")) {
          if ($(e.target).parents(".group-by-popover").length === 0 && $(e.target).parents(".group-by-box").length === 0 && $(e.target).parents(".group-by-button").length === 0 && !$(e.target).is(this.group_by_button)) {
            this.wrapper && this.group_by_button.popover("hide");
          }
        }
      });
      this.group_by_button.on("click", () => {
        this.group_by_button.popover("toggle");
      });
      this.group_by_button.on("shown.bs.popover", () => {
        if (!this.wrapper) {
          this.wrapper = $(".group-by-popover");
          this.setup_group_by_area();
        }
      });
      this.group_by_button.on("hidden.bs.popover", () => {
        this.update_group_by_button();
      });
      frappe.router.on("change", () => {
        this.group_by_button.popover("hide");
      });
    }
    setup_group_by_area() {
      this.aggregate_on_html = ``;
      this.group_by_select = this.wrapper.find("select.group-by");
      this.group_by_field && this.group_by_select.val(this.group_by_field);
      this.aggregate_function_select = this.wrapper.find("select.aggregate-function");
      this.aggregate_on_select = this.wrapper.find("select.aggregate-on");
      this.remove_group_by_button = this.wrapper.find(".remove-group-by");
      if (this.aggregate_function) {
        this.aggregate_function_select.val(this.aggregate_function);
      } else {
        this.aggregate_function_select.val("count");
        this.aggregate_function = "count";
      }
      this.toggle_aggregate_on_field();
      this.aggregate_on && this.aggregate_on_select.val(this.aggregate_on_field);
      this.set_group_by_events();
    }
    set_group_by_events() {
      this.group_by_select.on("change", () => {
        this.group_by_field = this.group_by_select.val();
        this.group_by_doctype = this.group_by_select.find(":selected").attr("data-doctype");
        this.apply_group_by_and_refresh();
      });
      this.aggregate_function_select.on("change", () => {
        this.toggle_aggregate_on_field();
        this.aggregate_function = this.aggregate_function_select.val();
        this.apply_group_by_and_refresh();
      });
      this.aggregate_on_select.on("change", () => {
        this.aggregate_on_field = this.aggregate_on_select.val();
        this.aggregate_on_doctype = this.aggregate_on_select.find(":selected").attr("data-doctype");
        this.apply_group_by_and_refresh();
      });
      this.remove_group_by_button.on("click", () => {
        if (this.group_by) {
          this.remove_group_by();
          this.toggle_aggregate_on_field_display(false);
        }
      });
    }
    toggle_aggregate_on_field() {
      let fn = this.aggregate_function_select.val();
      if (fn === "sum" || fn === "avg") {
        if (!this.aggregate_on_html.length) {
          this.aggregate_on_html = `<option value="" disabled selected>
						${__("Select Field...")}
					</option>`;
          for (let doctype in this.all_fields) {
            const doctype_fields = this.all_fields[doctype];
            doctype_fields.forEach((field) => {
              if (frappe.model.is_numeric_field(field.fieldtype)) {
                let option_text = doctype == this.doctype ? field.label : `${field.label} (${__(doctype)})`;
                this.aggregate_on_html += `<option data-doctype="${doctype}"
								value="${field.fieldname}">${__(option_text)}</option>`;
              }
            });
          }
        }
        this.aggregate_on_select.html(this.aggregate_on_html);
        this.toggle_aggregate_on_field_display(true);
      } else {
        this.toggle_aggregate_on_field_display(false);
      }
    }
    toggle_aggregate_on_field_display(show) {
      this.group_by_select.parent().toggleClass("col-sm-5", show);
      this.group_by_select.parent().toggleClass("col-sm-8", !show);
      this.aggregate_function_select.parent().toggleClass("col-sm-2", show);
      this.aggregate_function_select.parent().toggleClass("col-sm-3", !show);
      this.aggregate_on_select.parent().toggle(show);
    }
    get_settings() {
      if (this.group_by) {
        return {
          group_by: this.group_by,
          aggregate_function: this.aggregate_function,
          aggregate_on: this.aggregate_on
        };
      } else {
        return null;
      }
    }
    apply_settings(settings) {
      let get_fieldname = (name) => name.split(".")[1].replace(/`/g, "");
      let get_doctype = (name) => name.split(".")[0].replace(/`/g, "").replace("tab", "");
      if (!settings.group_by.startsWith("`tab")) {
        settings.group_by = "`tab" + this.doctype + "`.`" + settings.group_by + "`";
      }
      if (settings.aggregate_on && !settings.aggregate_on.startsWith("`tab")) {
        const aggregate_on_doctype = this.get_aggregate_on_doctype(settings);
        settings.aggregate_on = "`tab" + aggregate_on_doctype + "`.`" + settings.aggregate_on + "`";
      }
      this.group_by_field = get_fieldname(settings.group_by);
      this.group_by_doctype = get_doctype(settings.group_by);
      this.aggregate_function = settings.aggregate_function;
      if (settings.aggregate_on) {
        this.aggregate_on_field = get_fieldname(settings.aggregate_on);
        this.aggregate_on_doctype = get_doctype(settings.aggregate_on);
      }
      this.apply_group_by();
      this.update_group_by_button();
    }
    get_aggregate_on_doctype(settings) {
      for (let doctype of Object.keys(this.all_fields)) {
        const dt_fields = this.all_fields[doctype];
        if (dt_fields.find((field) => field.fieldname == settings.aggregate_on)) {
          return doctype;
        }
      }
    }
    make_group_by_button() {
      this.page.wrapper.find(".sort-selector").before($(`<div class="group-by-selector">
				<button class="btn btn-default btn-sm group-by-button ellipsis">
					<span class="group-by-icon">
						${frappe.utils.icon("group-by")}
					</span>
					<span class="button-label hidden-xs">
						${__("Add Group")}
					</span>
				</button>
			</div>`));
      this.group_by_button = this.page.wrapper.find(".group-by-button");
    }
    apply_group_by() {
      this.group_by = "`tab" + this.group_by_doctype + "`.`" + this.group_by_field + "`";
      if (this.aggregate_function === "count") {
        this.aggregate_on_field = null;
        this.aggregate_on_doctype = null;
      } else {
        this.aggregate_on = "`tab" + this.aggregate_on_doctype + "`.`" + this.aggregate_on_field + "`";
      }
      if (!this.group_by || !this.aggregate_function || !this.aggregate_on_field && this.aggregate_function !== "count") {
        return false;
      }
      return true;
    }
    apply_group_by_and_refresh() {
      if (this.apply_group_by()) {
        this.report_view.refresh();
      }
    }
    set_args(args) {
      if (this.aggregate_function && this.group_by) {
        this.report_view.group_by = this.group_by;
        this.report_view.sort_by = "_aggregate_column";
        this.report_view.sort_order = "desc";
        if (!this.report_view.fields.map((f) => f[0]).includes("_aggregate_column")) {
          this.original_fields = this.report_view.fields.map((f) => f);
        }
        this.report_view.fields = [[this.group_by_field, this.group_by_doctype]];
        args.fields = this.report_view.get_fields();
        this.report_view.fields.push([
          "_aggregate_column",
          this.aggregate_on_doctype || this.doctype
        ]);
        this.report_view.setup_columns();
        Object.assign(args, {
          with_comment_count: false,
          aggregate_on_field: this.aggregate_on_field || "name",
          aggregate_on_doctype: this.aggregate_on_doctype || this.doctype,
          aggregate_function: this.aggregate_function || "count",
          group_by: this.report_view.group_by || null,
          order_by: "_aggregate_column desc"
        });
      }
    }
    get_group_by_docfield() {
      let docfield = {};
      if (this.aggregate_function === "count") {
        docfield = {
          fieldtype: "Int",
          label: __("Count"),
          parent: this.doctype,
          width: 200
        };
      } else {
        docfield = Object.assign({}, frappe.meta.docfield_map[this.aggregate_on_doctype][this.aggregate_on_field]);
        if (this.aggregate_function === "sum") {
          docfield.label = __("Sum of {0}", [docfield.label]);
        } else {
          docfield.label = __("Average of {0}", [docfield.label]);
        }
      }
      docfield.fieldname = "_aggregate_column";
      return docfield;
    }
    remove_group_by() {
      this.order_by = "";
      this.group_by = null;
      this.group_by_field = null;
      this.report_view.group_by = null;
      this.aggregate_function = "count";
      this.aggregate_on = null;
      this.aggregate_on_field = null;
      this.group_by_select.val("");
      this.aggregate_function_select.val("count");
      this.aggregate_on_select.empty().val("");
      this.aggregate_on_select.parent().hide();
      if (this.original_fields) {
        this.report_view.fields = this.original_fields;
      } else {
        this.report_view.set_default_fields();
      }
      this.report_view.setup_columns();
      this.original_fields = null;
      this.report_view.refresh();
    }
    get_group_by_fields() {
      this.group_by_fields = {};
      this.all_fields = {};
      const fields = this.report_view.meta.fields.filter((f) => ["Select", "Link", "Data", "Int", "Check"].includes(f.fieldtype));
      const tag_field = { fieldname: "_user_tags", fieldtype: "Data", label: __("Tags") };
      this.group_by_fields[this.doctype] = fields.concat(tag_field);
      this.all_fields[this.doctype] = this.report_view.meta.fields;
      const standard_fields_filter = (df) => !in_list(frappe.model.no_value_type, df.fieldtype) && !df.report_hide;
      const table_fields = frappe.meta.get_table_fields(this.doctype).filter((df) => !df.hidden);
      table_fields.forEach((df) => {
        const cdt = df.options;
        const child_table_fields = frappe.meta.get_docfields(cdt).filter(standard_fields_filter);
        this.group_by_fields[cdt] = child_table_fields;
        this.all_fields[cdt] = child_table_fields;
      });
      return this.group_by_fields;
    }
    update_group_by_button() {
      const group_by_applied = Boolean(this.group_by_field);
      const button_label = group_by_applied ? __("Group By {0}", [this.get_group_by_field_label()]) : __("Add Group");
      this.group_by_button.toggleClass("btn-default", !group_by_applied).toggleClass("btn-primary-light", group_by_applied);
      this.group_by_button.find(".group-by-icon").toggleClass("active", group_by_applied);
      this.group_by_button.find(".button-label").html(button_label);
      this.group_by_button.attr("title", button_label);
    }
    get_group_by_field_label() {
      return this.group_by_fields[this.group_by_doctype].find((field) => field.fieldname == this.group_by_field).label;
    }
  };

  // frappe/public/js/frappe/views/reports/report_utils.js
  frappe.provide("frappe.report_utils");
  frappe.report_utils = {
    make_chart_options: function(columns, raw_data, { y_fields, x_field, chart_type, colors, height }) {
      const type = chart_type.toLowerCase();
      let rows = raw_data.result.filter((value) => Object.keys(value).length);
      let labels = get_column_values(x_field);
      let datasets = y_fields.map((y_field) => ({
        name: frappe.model.unscrub(y_field),
        values: get_column_values(y_field).map((d) => Number(d))
      }));
      if (raw_data.add_total_row) {
        labels = labels.slice(0, -1);
        datasets.forEach((dataset) => {
          dataset.values = dataset.values.slice(0, -1);
        });
      }
      return {
        data: {
          labels: labels.length ? labels : null,
          datasets
        },
        truncateLegends: 1,
        type,
        height: height ? height : 280,
        colors,
        axisOptions: {
          shortenYAxisNumbers: 1,
          xAxisMode: "tick",
          numberFormatter: frappe.utils.format_chart_axis_number
        }
      };
      function get_column_values(column_name) {
        if (Array.isArray(rows[0])) {
          let column_index = columns.findIndex((column) => column.fieldname == column_name);
          return rows.map((row) => row[column_index]);
        } else {
          return rows.map((row) => row[column_name]);
        }
      }
    },
    get_field_options_from_report: function(columns, data) {
      const rows = data.result.filter((value) => Object.keys(value).length);
      const first_row = Array.isArray(rows[0]) ? rows[0] : columns.map((col) => rows[0][col.fieldname]);
      const indices = first_row.reduce((accumulator, current_value, current_index) => {
        if (Number.isFinite(current_value)) {
          accumulator.push(current_index);
        }
        return accumulator;
      }, []);
      function get_options(fields) {
        return fields.map((field) => {
          if (field.fieldname) {
            return { label: field.label, value: field.fieldname };
          } else {
            field = frappe.report_utils.prepare_field_from_column(field);
            return { label: field.label, value: field.fieldname };
          }
        });
      }
      const numeric_fields = columns.filter((col, i) => indices.includes(i));
      const non_numeric_fields = columns.filter((col, i) => !indices.includes(i));
      let numeric_field_options = get_options(numeric_fields);
      let non_numeric_field_options = get_options(non_numeric_fields);
      return {
        numeric_fields: numeric_field_options,
        non_numeric_fields: non_numeric_field_options
      };
    },
    prepare_field_from_column: function(column) {
      if (typeof column === "string") {
        if (column.includes(":")) {
          let [label, fieldtype, width] = column.split(":");
          let options;
          if (fieldtype.includes("/")) {
            [fieldtype, options] = fieldtype.split("/");
          }
          column = {
            label,
            fieldname: label,
            fieldtype,
            width,
            options
          };
        } else {
          column = {
            label: column,
            fieldname: column,
            fieldtype: "Data"
          };
        }
      }
      return column;
    },
    get_report_filters: function(report_name) {
      if (frappe.query_reports[report_name]) {
        let filters = frappe.query_reports[report_name].filters;
        return Promise.resolve(filters);
      }
      return frappe.xcall("frappe.desk.query_report.get_script", {
        report_name
      }).then((r) => {
        frappe.dom.eval(r.script || "");
        return frappe.after_ajax(() => {
          return frappe.query_reports[report_name] && frappe.query_reports[report_name].filters;
        });
      });
    },
    get_filter_values(filters) {
      let filter_values = filters.map((f) => {
        var v = f.default;
        return {
          [f.fieldname]: v
        };
      }).reduce((acc, f) => {
        Object.assign(acc, f);
        return acc;
      }, {});
      return filter_values;
    },
    get_result_of_fn(fn, values) {
      const get_result = {
        Minimum: (values2) => values2.reduce((min, val) => Math.min(min, val), values2[0]),
        Maximum: (values2) => values2.reduce((min, val) => Math.max(min, val), values2[0]),
        Average: (values2) => values2.reduce((a, b) => a + b, 0) / values2.length,
        Sum: (values2) => values2.reduce((a, b) => a + b, 0)
      };
      return get_result[fn](values);
    }
  };
})();
/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
//# sourceMappingURL=report.bundle.DPKPTUSU.js.map
