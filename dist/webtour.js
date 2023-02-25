var WebTour = (function () {
  'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var WebTour = function () {
    function WebTour() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, WebTour);
      if (!!this.constructor.instance) {
        return this.constructor.instance;
      }
      this.constructor.instance = this;
      this.options = _objectSpread2({
        animate: true,
        opacity: 0.5,
        offset: 20,
        borderRadius: 3,
        allowClose: true,
        highlight: true,
        highlightOffset: 5,
        keyboard: true,
        width: '300px',
        zIndex: 10050,
        removeArrow: false,
        autoScroll: true,
        onNext: function onNext() {
          return null;
        },
        onPrevious: function onPrevious() {
          return null;
        }
      }, options);
      this.labels = {
        next: 'Next &#8594;',
        prev: '&#8592; Back',
        done: 'Done',
        close: 'Close'
      };
      this.steps = [];
      this.stepIndex = 0;
      this.isRunning = false;
      this.isPaused = false;
      this.window = window;
      this.document = document;
      this.onClick = this.onClick.bind(this);
      this.onResize = this.onResize.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
      this.bind();
      return this;
    }
    _createClass(WebTour, [{
      key: "bind",
      value: function bind() {
        if (!('ontouchstart' in this.document.documentElement)) {
          this.window.addEventListener('click', this.onClick, false);
        } else {
          this.window.addEventListener('touchstart', this.onClick, false);
        }
        this.window.addEventListener('resize', this.onResize, false);
        this.window.addEventListener('keyup', this.onKeyUp, false);
      }
    }, {
      key: "onClick",
      value: function onClick(e) {
        e.stopPropagation();
        if (e.target.classList.contains('wt-btn-next')) {
          this.onNext();
          this.next();
        }
        if (e.target.classList.contains('wt-btn-back')) {
          this.onPrevious();
          this.previous();
        }
        if (e.target.classList.contains('wt-overlay')) {
          if (this.options.allowClose) {
            this.stop();
          }
        }
      }
    }, {
      key: "onKeyUp",
      value: function onKeyUp(event) {
        if (!this.isRunning || !this.options.keyboard) {
          return;
        }
        if (event.keyCode === 27 && this.options.allowClose) {
          this.stop();
          return;
        }
        if (event.keyCode === 39) {
          this.onNext();
          this.next();
        } else if (event.keyCode === 37) {
          this.onPrevious();
          this.previous();
        }
      }
    }, {
      key: "onResize",
      value: function onResize() {
        if (!this.isRunning) {
          return;
        }
        this.clear();
        this.render(this.steps[this.stepIndex]);
      }
    }, {
      key: "setSteps",
      value: function setSteps(steps) {
        this.steps = null;
        this.steps = steps;
      }
    }, {
      key: "getSteps",
      value: function getSteps() {
        return this.steps;
      }
    }, {
      key: "highlight",
      value: function highlight(element) {
        var _this = this;
        var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return function (element) {
          _this.isRunning = true;
          var element = _this.document.querySelector(element);
          if (element) {
            if (step) {
              _this.steps = null;
              _this.stepIndex = 0;
              _this.steps = step;
              _this.render(_this.steps[_this.stepIndex]);
            } else {
              _this.createOverlay(element, step);
            }
          }
        }(element);
      }
    }, {
      key: "start",
      value: function start() {
        var startIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.isRunning = true;
        this.stepIndex = startIndex;
        this.render(this.steps[this.stepIndex]);
      }
    }, {
      key: "stop",
      value: function stop() {
        this.clear();
        this.isRunning = false;
      }
    }, {
      key: "showLoader",
      value: function showLoader() {
        var popover = this.document.querySelector('.wt-popover');
        var loader = this.document.createElement('div');
        loader.classList.add('wt-loader');
        loader.style.zIndex = this.options.zIndex + 10;
        popover.prepend(loader);
      }
    }, {
      key: "moveNext",
      value: function moveNext() {
        this.isPaused = false;
        this.next();
      }
    }, {
      key: "movePrevious",
      value: function movePrevious() {
        this.isPaused = false;
        this.previous();
      }
    }, {
      key: "onNext",
      value: function onNext() {
        if (this.isPaused) return;
        if (this.steps[this.stepIndex] && this.steps[this.stepIndex].onNext) this.steps[this.stepIndex].onNext();
      }
    }, {
      key: "onPrevious",
      value: function onPrevious() {
        if (this.isPaused) return;
        if (this.steps[this.stepIndex] && this.steps[this.stepIndex].onPrevious) this.steps[this.stepIndex].onPrevious();
      }
    }, {
      key: "next",
      value: function next() {
        if (this.isPaused) return;
        this.stepIndex++;
        this.clear();
        if (this.steps.length === 0) return false;
        if (this.stepIndex >= this.steps.length) {
          this.stop();
          return;
        }
        this.render(this.steps[this.stepIndex]);
      }
    }, {
      key: "previous",
      value: function previous() {
        if (this.isPaused) return;
        this.stepIndex--;
        this.clear();
        if (this.steps.length === 0) return false;
        if (this.stepIndex < 0) {
          this.stop();
          return;
        }
        this.render(this.steps[this.stepIndex]);
      }
    }, {
      key: "render",
      value: function render(step) {
        var element = step.element ? this.document.querySelector(step.element) : null;
        if (element) {
          element.style.position = !element.style.position ? 'relative' : element.style.position;
          var step_highlight = !step.highlight ? true : step.highlight;
          if (this.options.highlight && step_highlight) {
            element.setAttribute('wt-highlight', 'true');
          }
        }
        var popover = this.document.createElement('div');
        popover.classList.add('wt-popover');
        popover.style.borderRadius = this.options.borderRadius + 'px';
        popover.style.zIndex = this.options.zIndex + 10;
        if (step.placement) popover.classList.add(step.placement);
        if (this.options.width) {
          if (typeof this.options.width === 'string') {
            popover.style.width = this.options.width;
          } else if (this.options.width > 0) {
            popover.style.width = this.options.width + 'px';
          }
        }
        if (step.width) {
          if (typeof step.width === 'string') {
            popover.style.width = step.width;
          } else if (step.width > 0) {
            popover.style.width = step.width + 'px';
          }
        }
        var popoverInner = this.document.createElement('div');
        popoverInner.classList.add('wt-popover-inner');
        var title = this.document.createElement('div');
        title.classList.add('wt-title');
        if (step.title) popoverInner.append(title);
        if (step.title) title.innerText = step.title;
        var content = this.document.createElement('div');
        content.classList.add('wt-content');
        popoverInner.append(content);
        content.innerHTML = step.content ? step.content : '';
        var showBtns = step.showBtns == null || step.showBtns == 'undefined' ? true : Boolean(step.showBtns);
        if (showBtns) {
          var btnNext = this.document.createElement('button');
          var btnBack = this.document.createElement('button');
          btnNext.classList.add('wt-btns', 'wt-btn-next');
          btnBack.classList.add('wt-btns', 'wt-btn-back');
          btnNext.innerHTML = step.btnNext && step.btnNext.text ? step.btnNext.text : this.stepIndex == this.steps.length - 1 ? this.labels.done : this.labels.next;
          btnBack.innerHTML = step.btnBack && step.btnBack.text ? step.btnBack.text : this.stepIndex == 0 ? this.labels.close : this.labels.prev;
          btnNext.style.backgroundColor = step.btnNext && step.btnNext.backgroundColor ? step.btnNext.backgroundColor : '#7cd1f9';
          btnNext.style.color = step.btnNext && step.btnNext.textColor ? step.btnNext.textColor : '#fff';
          btnBack.style.backgroundColor = step.btnBack && step.btnBack.backgroundColor ? step.btnBack.backgroundColor : '#efefef;';
          btnBack.style.color = step.btnBack && step.btnBack.textColor ? step.btnBack.textColor : '#555';
          popoverInner.append(btnNext);
          popoverInner.append(btnBack);
        }
        var arrow = this.document.createElement('div');
        arrow.classList.add('wt-arrow');
        arrow.setAttribute('data-popper-arrow', 'true');
        popover.append(arrow);
        popover.append(popoverInner);
        this.document.body.appendChild(popover);
        if (element) {
          this.positionPopover(element, popover, arrow, step);
          if (this.options.highlight) {
            this.createOverlay(element, step);
          }
        } else {
          popover.classList.add('wt-slides');
          if (this.options.autoScroll) {
            popover.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center"
            });
          }
          if (this.options.highlight) {
            var overlay = document.createElement('div');
            overlay.classList.add('wt-overlay', 'open');
            overlay.style.zIndex = this.options.zIndex - 10;
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.right = 0;
            overlay.style.bottom = 0;
            this.document.body.appendChild(overlay);
          }
          arrow.remove();
        }
        if (this.options.removeArrow) {
          arrow.remove();
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        var popup = this.document.querySelector('.wt-popover');
        var loader = this.document.querySelector('.wt-loader');
        if (popup) popup.remove();
        if (loader) loader.remove();
        this.document.querySelectorAll('.wt-overlay').forEach(function (element) {
          element.remove();
        });
        this.document.querySelectorAll('*[wt-highlight]').forEach(function (element) {
          element.removeAttribute('wt-highlight');
        });
      }
    }, {
      key: "getWindowOffset",
      value: function getWindowOffset() {
        return {
          height: this.window.innerHeight - (this.window.innerHeight - this.document.documentElement.clientHeight),
          width: this.window.innerWidth - (this.window.innerWidth - this.document.documentElement.clientWidth)
        };
      }
    }, {
      key: "getOffset",
      value: function getOffset(el) {
        var _x = 0;
        var _y = 0;
        var rect = el.getBoundingClientRect();
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
        }
        _y = parseInt(rect.y) > parseInt(_y) ? rect.y : _y;
        _x = parseInt(rect.x) > parseInt(_x) ? rect.x : _x;
        return {
          top: _y,
          left: _x
        };
      }
    }, {
      key: "getTranslateXY",
      value: function getTranslateXY(element) {
        var style = window.getComputedStyle(element);
        var matrix = new DOMMatrixReadOnly(style.transform);
        return {
          translateX: Math.abs(element.offsetWidth * (matrix.m41 / 100)),
          translateY: Math.abs(element.offsetHeight * (matrix.m42 / 100))
        };
      }
    }, {
      key: "getTranslate3D",
      value: function getTranslate3D(element) {
        var transform = window.getComputedStyle(element, null).getPropertyValue('-webkit-transform');
        var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}.+))(?:, (-{0,1}.+))\))/);
        var x, y, z;
        if (!results) {
          return {
            X: 0,
            Y: 0,
            Z: 0
          };
        }
        if (results[1] == '3d') {
          var _results$slice = results.slice(2, 5);
          var _results$slice2 = _slicedToArray(_results$slice, 3);
          x = _results$slice2[0];
          y = _results$slice2[1];
          z = _results$slice2[2];
          return {
            X: x,
            Y: y,
            Z: z
          };
        }
        results.push(0);
        var _results$slice3 = results.slice(5, 8);
        var _results$slice4 = _slicedToArray(_results$slice3, 3);
        x = _results$slice4[0];
        y = _results$slice4[1];
        z = _results$slice4[2];
        return {
          X: x,
          Y: y,
          Z: z
        };
      }
    }, {
      key: "getElementPosition",
      value: function getElementPosition(element) {
        return {
          top: this.getOffset(element).top + this.getTranslate3D(element).Y - (element.style.transform ? this.getTranslateXY(element).translateY : 0),
          left: this.getOffset(element).left + this.getTranslate3D(element).X - (element.style.transform ? this.getTranslateXY(element).translateX : 0)
        };
      }
    }, {
      key: "positionPopover",
      value: function positionPopover(element, popover, arrow, step) {
        var placement = step.placement || 'auto';
        var strategy = step.strategy || 'absolute';
        popover.style.position = strategy;
        arrow.style.position = 'absolute';
        var el_top, el_left;
        el_top = this.getElementPosition(element).top;
        el_left = this.getElementPosition(element).left;
        if (placement == 'auto' || placement == 'auto-start' || placement == 'auto-end') {
          var _arrow = placement.replace('auto', '').trim();
          var new_arrow = '';
          if (el_top + (popover.offsetHeight + this.options.offset) > this.window.innerHeight - 100) {
            if (el_left < this.window.innerWidth / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            } else if (el_left > this.window.innerWidth - this.window.innerWidth / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-end';
            }
            placement = 'top' + new_arrow;
          }
          if (el_left + element.offsetWidth + popover.offsetWidth > this.window.innerWidth) {
            if (el_top < this.window.innerHeight / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            } else if (el_top > this.window.innerHeight - this.window.innerHeight / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            }
            placement = 'left' + new_arrow;
          }
          if (el_left < popover.offsetWidth && element.offsetWidth + popover.offsetWidth < this.window.innerWidth) {
            if (el_top < this.window.innerHeight / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            } else if (el_top > this.window.innerHeight - this.window.innerHeight / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            }
            placement = 'right' + new_arrow;
          }
          if (el_top < popover.offsetHeight + this.options.offset || el_top < 100) {
            if (el_left < this.window.innerWidth / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-start';
            } else if (el_left > this.window.innerWidth - this.window.innerWidth / 3) {
              new_arrow = _arrow.length > 0 ? _arrow : '-end';
            }
            placement = 'bottom' + new_arrow;
          }
          popover.classList.add(placement);
        }
        if (placement == 'top') {
          popover.style.top = el_top - (popover.offsetHeight + this.options.offset) + 'px';
          popover.style.left = el_left + (element.offsetWidth / 2 - popover.offsetWidth / 2) + 'px';
        } else if (placement == 'top-start') {
          popover.style.top = el_top - (popover.offsetHeight + this.options.offset) + 'px';
          popover.style.left = el_left - this.options.highlightOffset + 'px';
        } else if (placement == 'top-end') {
          popover.style.top = el_top - (popover.offsetHeight + this.options.offset) + 'px';
          popover.style.left = el_left + element.offsetWidth + this.options.highlightOffset - popover.offsetWidth + 'px';
        } else if (placement == 'bottom') {
          popover.style.top = el_top + element.offsetHeight + this.options.offset + 'px';
          popover.style.left = el_left + element.offsetWidth / 2 - popover.offsetWidth / 2 + 'px';
        } else if (placement == 'bottom-start') {
          popover.style.top = el_top + element.offsetHeight + this.options.offset + 'px';
          popover.style.left = el_left - this.options.highlightOffset + 'px';
        } else if (placement == 'bottom-end') {
          popover.style.top = el_top + element.offsetHeight + this.options.offset + 'px';
          popover.style.left = el_left + element.offsetWidth + this.options.highlightOffset - popover.offsetWidth + 'px';
        } else if (placement == 'right') {
          popover.style.top = el_top + Math.abs(popover.offsetHeight - element.offsetHeight) / 2 + 'px';
          popover.style.left = el_left + (element.offsetWidth + this.options.offset) + 'px';
        } else if (placement == 'right-start') {
          popover.style.top = el_top - this.options.highlightOffset + 'px';
          popover.style.left = el_left + (element.offsetWidth + this.options.offset) + 'px';
        } else if (placement == 'right-end') {
          popover.style.top = el_top + element.offsetHeight - popover.offsetHeight + this.options.highlightOffset + 'px';
          popover.style.left = el_left + (element.offsetWidth + this.options.offset) + 'px';
        } else if (placement == 'left') {
          popover.style.top = el_top + Math.abs(popover.offsetHeight - element.offsetHeight) / 2 + 'px';
          popover.style.left = el_left - (popover.offsetWidth + this.options.offset) + 'px';
        } else if (placement == 'left-start') {
          popover.style.top = el_top - this.options.highlightOffset + 'px';
          popover.style.left = el_left - (popover.offsetWidth + this.options.offset) + 'px';
        } else if (placement == 'left-end') {
          popover.style.top = el_top + element.offsetHeight - popover.offsetHeight + this.options.highlightOffset + 'px';
          popover.style.left = el_left - (popover.offsetWidth + this.options.offset) + 'px';
        }
        if (this.options.autoScroll) {
          if (strategy === 'fixed') {
            this.window.scrollTo(0, 0);
          } else {
            popover.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest"
            });
          }
        }
      }
    }, {
      key: "createOverlay",
      value: function createOverlay(element) {
        var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var strategy = step && step.strategy ? step.strategy : 'absolute';
        var overlay1 = document.createElement('div');
        overlay1.classList.add('wt-overlay', 'open', 'overlay1');
        overlay1.style.zIndex = this.options.zIndex - 10;
        var overlay2 = document.createElement('div');
        overlay2.classList.add('wt-overlay', 'open', 'overlay2');
        overlay2.style.zIndex = this.options.zIndex - 10;
        var overlay3 = document.createElement('div');
        overlay3.classList.add('wt-overlay', 'open', 'overlay3');
        overlay3.style.zIndex = this.options.zIndex - 10;
        var overlay4 = document.createElement('div');
        overlay4.classList.add('wt-overlay', 'open', 'overlay4');
        overlay4.style.zIndex = this.options.zIndex - 10;
        this.document.body.appendChild(overlay1);
        this.document.body.appendChild(overlay2);
        this.document.body.appendChild(overlay3);
        this.document.body.appendChild(overlay4);
        var el_top, el_left;
        el_top = this.getElementPosition(element).top;
        el_left = this.getElementPosition(element).left;
        var highlight_offset = this.options.highlightOffset;
        overlay1.style.position = strategy;
        overlay1.style.top = 0;
        overlay1.style.width = el_left - highlight_offset + 'px';
        overlay1.style.height = el_top + element.offsetHeight + highlight_offset + 'px';
        overlay1.style.left = 0;
        overlay2.style.position = strategy;
        overlay2.style.top = 0;
        overlay2.style.right = 0;
        overlay2.style.height = el_top - highlight_offset + 'px';
        overlay2.style.left = el_left - highlight_offset + 'px';
        overlay3.style.position = strategy;
        overlay3.style.top = el_top - highlight_offset + 'px';
        overlay3.style.right = 0;
        overlay3.style.bottom = 0 - (this.document.body.offsetHeight - this.window.innerHeight) + 'px';
        overlay3.style.left = el_left + element.offsetWidth + highlight_offset + 'px';
        overlay4.style.position = strategy;
        overlay4.style.top = el_top + element.offsetHeight + highlight_offset + 'px';
        overlay4.style.width = el_left + element.offsetWidth + highlight_offset + 'px';
        overlay4.style.bottom = 0 - (this.document.body.offsetHeight - this.window.innerHeight) + 'px';
        overlay4.style.left = 0;
      }
    }]);
    return WebTour;
  }();

  return WebTour;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VidG91ci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlRvdXIgeyAgICBcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKCEhdGhpcy5jb25zdHJ1Y3Rvci5pbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuaW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmluc3RhbmNlID0gdGhpcztcblxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICBhbmltYXRlOiB0cnVlLFxuICAgICAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICAgICAgb2Zmc2V0OiAyMCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogMyxcbiAgICAgICAgICAgIGFsbG93Q2xvc2U6IHRydWUsXG4gICAgICAgICAgICBoaWdobGlnaHQ6IHRydWUsXG4gICAgICAgICAgICBoaWdobGlnaHRPZmZzZXQ6IDUsXG4gICAgICAgICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiAnMzAwcHgnLFxuICAgICAgICAgICAgekluZGV4OiAxMDA1MCxcbiAgICAgICAgICAgIHJlbW92ZUFycm93OiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9TY3JvbGw6IHRydWUsXG4gICAgICAgICAgICBvbk5leHQ6ICgpID0+IG51bGwsXG4gICAgICAgICAgICBvblByZXZpb3VzOiAoKSA9PiBudWxsLFxuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFiZWxzID0ge1xuICAgICAgICAgICAgbmV4dDogJ05leHQgJiM4NTk0OycsXG4gICAgICAgICAgICBwcmV2OiAnJiM4NTkyOyBCYWNrJyxcbiAgICAgICAgICAgIGRvbmU6ICdEb25lJyxcbiAgICAgICAgICAgIGNsb3NlOiAnQ2xvc2UnLFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGVwcyA9IFtdO1xuICAgICAgICB0aGlzLnN0ZXBJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcblxuICAgICAgICAvL2VsZW1lbnRzXG4gICAgICAgIHRoaXMud2luZG93ID0gd2luZG93O1xuICAgICAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG5cbiAgICAgICAgLy9ldmVudHNcbiAgICAgICAgdGhpcy5vbkNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25SZXNpemUgPSB0aGlzLm9uUmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25LZXlVcCA9IHRoaXMub25LZXlVcC5iaW5kKHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5iaW5kKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBiaW5kKCkge1xuICAgICAgICBpZiAoISgnb250b3VjaHN0YXJ0JyBpbiB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vbkNsaWNrLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplLCBmYWxzZSk7XG4gICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5vbktleVVwLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgb25DbGljayhlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LWJ0bi1uZXh0JykpIHtcbiAgICAgICAgICAgIHRoaXMub25OZXh0KCk7XG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3d0LWJ0bi1iYWNrJykpIHtcbiAgICAgICAgICAgIHRoaXMub25QcmV2aW91cygpO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnd3Qtb3ZlcmxheScpKSB7XG4gICAgICAgICAgICAvL2lmIGFsbG93Q2xvc2UgPSB0cnVlIGNsb3NlIHdoZW4gYmFja2Ryb3AgaXMgY2xpY2tcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dDbG9zZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlVcChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNSdW5uaW5nIHx8ICF0aGlzLm9wdGlvbnMua2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNyAmJiB0aGlzLm9wdGlvbnMuYWxsb3dDbG9zZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL3JpZ2h0IGtleSBmb3IgbmV4dFxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgICAgIHRoaXMub25OZXh0KCk7XG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICAgICAgLy9sZWZ0IGtleSBmb3IgYmFja1xuICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzNyApIHtcbiAgICAgICAgICAgIHRoaXMub25QcmV2aW91cygpO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9wYWdlIGlzIHJlc2l6ZSB1cGRhdGUgcG9wb3ZlclxuICAgIG9uUmVzaXplKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNSdW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcbiAgICB9XG5cbiAgICAvL3NldCB3ZWIgdG91ciBzdGVwc1xuICAgIHNldFN0ZXBzKHN0ZXBzKSB7XG4gICAgICAgIHRoaXMuc3RlcHMgPSBudWxsO1xuICAgICAgICB0aGlzLnN0ZXBzID0gc3RlcHM7XG4gICAgfVxuXG5cbiAgICBnZXRTdGVwcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RlcHM7XG4gICAgfVxuXG4gICAgaGlnaGxpZ2h0KGVsZW1lbnQsIHN0ZXAgPSBudWxsKXtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcbiAgICAgICAgaWYgKGVsZW1lbnQpe1xuICAgICAgICAgICAgaWYgKHN0ZXApe1xuICAgICAgICAgICAgICAgIHRoaXMuc3RlcHMgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RlcEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBzID0gc3RlcDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcih0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU92ZXJsYXkoZWxlbWVudCwgc3RlcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cblxuICAgIC8vc3RhcnQgdGhlIHdlYiB0b3VyXG4gICAgc3RhcnQoc3RhcnRJbmRleCA9IDApIHtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0ZXBJbmRleCA9IHN0YXJ0SW5kZXg7XG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcbiAgICB9XG5cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy9zaG93IGxvYWRlciBwcm9ncmVzc1xuICAgIHNob3dMb2FkZXIoKSB7XG4gICAgICAgIGNvbnN0IHBvcG92ZXIgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53dC1wb3BvdmVyJyk7XG4gICAgICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxvYWRlci5jbGFzc0xpc3QuYWRkKCd3dC1sb2FkZXInKTtcbiAgICAgICAgbG9hZGVyLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggKyAxMDtcbiAgICAgICAgcG9wb3Zlci5wcmVwZW5kKGxvYWRlcik7XG4gICAgfVxuXG4gICAgbW92ZU5leHQoKSB7XG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgbW92ZVByZXZpb3VzKCkge1xuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJldmlvdXMoKTtcbiAgICB9XG5cbiAgICBvbk5leHQoKXtcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHJldHVybjtcbiAgICAgICAgLy9leGVjdXRlIG9uTmV4dCBmdW5jdGlvbigpXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSAmJiB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vbk5leHQpIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uTmV4dCgpO1xuICAgIH1cblxuICAgIG9uUHJldmlvdXMoKXtcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHJldHVybjtcbiAgICAgICAgLy9leGVjdXRlIG9uQmFjayBmdW5jdGlvbigpXG4gICAgICAgIGlmICh0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSAmJiB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vblByZXZpb3VzKSB0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XS5vblByZXZpb3VzKCk7XG4gICAgfVxuXG4gICAgLyoqZ28gdG8gbmV4dCBzdGVwICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHJldHVybjtcblxuICAgICAgICB0aGlzLnN0ZXBJbmRleCsrO1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RlcHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RlcEluZGV4ID49IHRoaXMuc3RlcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcbiAgICB9XG5cbiAgICBwcmV2aW91cygpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHJldHVybjtcblxuICAgICAgICB0aGlzLnN0ZXBJbmRleC0tO1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RlcHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RlcEluZGV4IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlcih0aGlzLnN0ZXBzW3RoaXMuc3RlcEluZGV4XSk7XG4gICAgfVxuXG4gICAgLy9hZGQgdGhlIHBvcG92ZXIgdG8gZG9jdW1lbnRcbiAgICByZW5kZXIoc3RlcCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IHN0ZXAuZWxlbWVudCA/IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGVwLmVsZW1lbnQpIDogbnVsbDtcblxuICAgICAgICAvL2NoZWNrIGlmIGVsZW1lbnQgaXMgcHJlc2VudCBpZiBub3QgbWFrZSBpdCBmbG9hdGluZ1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICFlbGVtZW50LnN0eWxlLnBvc2l0aW9uID8gJ3JlbGF0aXZlJyA6IGVsZW1lbnQuc3R5bGUucG9zaXRpb247XG4gICAgICAgICAgICBjb25zdCBzdGVwX2hpZ2hsaWdodCA9ICFzdGVwLmhpZ2hsaWdodCA/IHRydWUgOiBzdGVwLmhpZ2hsaWdodDsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2hpZ2hsaWdodCBpcyBzZXQgdG8gdHJ1ZVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQgJiYgc3RlcF9oaWdobGlnaHQgKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3d0LWhpZ2hsaWdodCcsICd0cnVlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3BvcG92ZXJcbiAgICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7ICAgICAgICBcbiAgICAgICAgcG9wb3Zlci5jbGFzc0xpc3QuYWRkKCd3dC1wb3BvdmVyJyk7XG4gICAgICAgIHBvcG92ZXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gdGhpcy5vcHRpb25zLmJvcmRlclJhZGl1cyArICdweCc7XG4gICAgICAgIHBvcG92ZXIuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCArIDEwO1xuICAgICAgICBpZiAoc3RlcC5wbGFjZW1lbnQpIHBvcG92ZXIuY2xhc3NMaXN0LmFkZChzdGVwLnBsYWNlbWVudCk7IC8vYWRkIHVzZXIgZGVmaW5lIHBsYWNlbWVudCB0byBjbGFzcyBmb3IgcG9zaXRpb24gaW4gY3NzXG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy53aWR0aCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMud2lkdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHRoaXMub3B0aW9ucy53aWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLndpZHRoID4gMCkge1xuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUud2lkdGggPSB0aGlzLm9wdGlvbnMud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0ZXAud2lkdGgpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RlcC53aWR0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gc3RlcC53aWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC53aWR0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gc3RlcC53aWR0aCArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3BvcG92ZXIgaW5uZXIgY29udGFpbmVyXG4gICAgICAgIGNvbnN0IHBvcG92ZXJJbm5lciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBvcG92ZXJJbm5lci5jbGFzc0xpc3QuYWRkKCd3dC1wb3BvdmVyLWlubmVyJyk7XG4gICAgICAgXG4gICAgICAgIC8vdGl0bGVcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd3dC10aXRsZScpO1xuICAgICAgICBpZiAoc3RlcC50aXRsZSkgcG9wb3ZlcklubmVyLmFwcGVuZCh0aXRsZSk7XG4gICAgICAgIGlmIChzdGVwLnRpdGxlKSB0aXRsZS5pbm5lclRleHQgPSBzdGVwLnRpdGxlO1xuXG4gICAgICAgIC8vY29udGVudFxuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCd3dC1jb250ZW50Jyk7XG4gICAgICAgIHBvcG92ZXJJbm5lci5hcHBlbmQoY29udGVudCk7XG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gKHN0ZXAuY29udGVudCA/IHN0ZXAuY29udGVudCA6ICcnKTtcbiAgICAgICAgXG4gICAgICAgIC8vYnV0dG9uc1xuICAgICAgICBjb25zdCBzaG93QnRucyA9IChzdGVwLnNob3dCdG5zID09IG51bGwgfHwgc3RlcC5zaG93QnRucyA9PSAndW5kZWZpbmVkJykgPyB0cnVlIDogQm9vbGVhbihzdGVwLnNob3dCdG5zKTtcblxuICAgICAgICBpZiAoc2hvd0J0bnMpe1xuICAgICAgICAgICAgY29uc3QgYnRuTmV4dCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBjb25zdCBidG5CYWNrID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblxuICAgICAgICAgICAgYnRuTmV4dC5jbGFzc0xpc3QuYWRkKCd3dC1idG5zJywgJ3d0LWJ0bi1uZXh0Jyk7XG4gICAgICAgICAgICBidG5CYWNrLmNsYXNzTGlzdC5hZGQoJ3d0LWJ0bnMnLCAnd3QtYnRuLWJhY2snKTtcblxuICAgICAgICAgICAgYnRuTmV4dC5pbm5lckhUTUwgPSAoc3RlcC5idG5OZXh0ICYmIHN0ZXAuYnRuTmV4dC50ZXh0ID8gc3RlcC5idG5OZXh0LnRleHQgOiAodGhpcy5zdGVwSW5kZXggPT0gdGhpcy5zdGVwcy5sZW5ndGggLSAxID8gdGhpcy5sYWJlbHMuZG9uZSA6IHRoaXMubGFiZWxzLm5leHQpKTtcbiAgICAgICAgICAgIGJ0bkJhY2suaW5uZXJIVE1MID0gKHN0ZXAuYnRuQmFjayAmJiBzdGVwLmJ0bkJhY2sudGV4dCA/IHN0ZXAuYnRuQmFjay50ZXh0IDogKHRoaXMuc3RlcEluZGV4ID09IDAgPyB0aGlzLmxhYmVscy5jbG9zZSA6IHRoaXMubGFiZWxzLnByZXYpKTtcblxuICAgICAgICAgICAgLy9hZGQgc3R5bGVzXG4gICAgICAgICAgICBidG5OZXh0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IChzdGVwLmJ0bk5leHQgJiYgc3RlcC5idG5OZXh0LmJhY2tncm91bmRDb2xvciA/IHN0ZXAuYnRuTmV4dC5iYWNrZ3JvdW5kQ29sb3IgOiAnIzdjZDFmOScpO1xuICAgICAgICAgICAgYnRuTmV4dC5zdHlsZS5jb2xvciA9IChzdGVwLmJ0bk5leHQgJiYgc3RlcC5idG5OZXh0LnRleHRDb2xvciA/IHN0ZXAuYnRuTmV4dC50ZXh0Q29sb3IgOiAnI2ZmZicpO1xuXG4gICAgICAgICAgICBidG5CYWNrLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IChzdGVwLmJ0bkJhY2sgJiYgc3RlcC5idG5CYWNrLmJhY2tncm91bmRDb2xvciA/IHN0ZXAuYnRuQmFjay5iYWNrZ3JvdW5kQ29sb3IgOiAnI2VmZWZlZjsnKTtcbiAgICAgICAgICAgIGJ0bkJhY2suc3R5bGUuY29sb3IgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay50ZXh0Q29sb3IgPyBzdGVwLmJ0bkJhY2sudGV4dENvbG9yIDogJyM1NTUnKTtcbiAgICAgICAgICAgIHBvcG92ZXJJbm5lci5hcHBlbmQoYnRuTmV4dCk7XG4gICAgICAgICAgICBwb3BvdmVySW5uZXIuYXBwZW5kKGJ0bkJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wb3BvdmVyIGFycm93XG4gICAgICAgIGNvbnN0IGFycm93ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXJyb3cuY2xhc3NMaXN0LmFkZCgnd3QtYXJyb3cnKTtcbiAgICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKCdkYXRhLXBvcHBlci1hcnJvdycsICd0cnVlJyk7XG4gICAgICAgIHBvcG92ZXIuYXBwZW5kKGFycm93KTtcblxuICAgICAgICAvL3BvcG92ZXIgaW5uZXIgY29udGFpbmVyXG4gICAgICAgIHBvcG92ZXIuYXBwZW5kKHBvcG92ZXJJbm5lcik7XG5cbiAgICAgICAgLy9hcHBlbmQgcG9wb3ZlciB0byBib2R5XG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3BvdmVyKTtcblxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblBvcG92ZXIoZWxlbWVudCwgcG9wb3ZlciwgYXJyb3csIHN0ZXApO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpe1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlT3ZlcmxheShlbGVtZW50LCBzdGVwKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgKiBObyBlbGVtZW50IGlzIGRlZmluZVxuICAgICAgICAqIE1ha2UgcG9wb3ZlciBmbG9hdGluZyAocG9zaXRpb24gY2VudGVyKVxuICAgICAgICAqL1xuICAgICAgICBlbHNlIHsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBwb3BvdmVyLmNsYXNzTGlzdC5hZGQoJ3d0LXNsaWRlcycpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcImNlbnRlclwiLCBpbmxpbmU6IFwiY2VudGVyXCJ9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpe1xuICAgICAgICAgICAgICAgIHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nKTtcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXggLSAxMDtcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLnRvcCA9IDA7XG4gICAgICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLmJvdHRvbSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgYXJyb3cucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2FkZCBvcHRpb24gdG8gcmVtb3ZlIGFycm93IGJlY2F1c2UgcG9wcGVyIGFycm93cyBhcmUgbm90IHBvc2l0aW9uaW5nIHdlbGxcbiAgICAgICAgLy9UT0RPOiBmaXggcG9wcGVyIGFycm93XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZlQXJyb3cpe1xuICAgICAgICAgICAgYXJyb3cucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vcmVtb3ZlIHBvcG92ZXJcbiAgICBjbGVhcigpIHtcbiAgICAgICAgdmFyIHBvcHVwID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3QtcG9wb3ZlcicpO1xuICAgICAgICB2YXIgbG9hZGVyID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3QtbG9hZGVyJyk7XG5cbiAgICAgICAgaWYgKHBvcHVwKSBwb3B1cC5yZW1vdmUoKTtcbiAgICAgICAgaWYgKGxvYWRlcikgbG9hZGVyLnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnd0LW92ZXJsYXknKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnKlt3dC1oaWdobGlnaHRdJykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3d0LWhpZ2hsaWdodCcpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldFdpbmRvd09mZnNldCgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCksXG4gICAgICAgICAgICB3aWR0aDogdGhpcy53aW5kb3cuaW5uZXJXaWR0aCAtICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0T2Zmc2V0KCBlbCApIHtcbiAgICAgICAgdmFyIF94ID0gMDtcbiAgICAgICAgdmFyIF95ID0gMDtcbiAgICAgICAgdmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB3aGlsZSggZWwgJiYgIWlzTmFOKCBlbC5vZmZzZXRMZWZ0ICkgJiYgIWlzTmFOKCBlbC5vZmZzZXRUb3AgKSApIHtcbiAgICAgICAgICAgIF94ICs9IGVsLm9mZnNldExlZnQgLSBlbC5zY3JvbGxMZWZ0O1xuICAgICAgICAgICAgX3kgKz0gZWwub2Zmc2V0VG9wIC0gZWwuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIF95ID0gcGFyc2VJbnQocmVjdC55KSA+IHBhcnNlSW50KF95KSA/IHJlY3QueSA6IF95O1xuICAgICAgICBfeCA9IHBhcnNlSW50KHJlY3QueCkgPiBwYXJzZUludChfeCkgPyByZWN0LnggOiBfeDtcbiAgICAgICBcbiAgICAgICAgcmV0dXJuIHsgdG9wOiAgX3kgLCBsZWZ0OiBfeCB9O1xuICAgIH1cblxuICAgIC8vZ2V0IGNzcyB0cmFuc2Zvcm0gcHJvcGVydHkgdG8gZml4ZWQgaXNzdWVzIHdpdGggdHJhbnNmb3JtIGVsZW1lbnRzXG4gICAgZ2V0VHJhbnNsYXRlWFkoZWxlbWVudCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVxuICAgICAgICBjb25zdCBtYXRyaXggPSBuZXcgRE9NTWF0cml4UmVhZE9ubHkoc3R5bGUudHJhbnNmb3JtKVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFuc2xhdGVYOiAgTWF0aC5hYnMoZWxlbWVudC5vZmZzZXRXaWR0aCAqIChtYXRyaXgubTQxIC8gMTAwKSksXG4gICAgICAgICAgICB0cmFuc2xhdGVZOiAgTWF0aC5hYnMoZWxlbWVudC5vZmZzZXRIZWlnaHQgKiAobWF0cml4Lm00MiAvIDEwMCkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2dldCBjc3MgdHJhbnNmb3JtIHByb3BlcnR5IHRvIGZpeGVkIGlzc3VlcyB3aXRoIHRyYW5zZm9ybSBlbGVtZW50c1xuICAgIGdldFRyYW5zbGF0ZTNEKGVsZW1lbnQpe1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnLXdlYmtpdC10cmFuc2Zvcm0nKTtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSB0cmFuc2Zvcm0ubWF0Y2goL21hdHJpeCg/OigzZClcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSksIC17MCwxfVxcZCtcXCl8XFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9LispKSg/OiwgKC17MCwxfS4rKSlcXCkpLyk7XG5cbiAgICAgICAgbGV0IHgsIHksIHo7XG4gICAgICAgIGlmICghcmVzdWx0cykgeyAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHsgWDogMCwgWTogMCwgWjogMCB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHRzWzFdID09ICczZCcpIHtcbiAgICAgICAgICAgIFt4LCB5LCB6XSA9IHJlc3VsdHMuc2xpY2UoMiwgNSk7XG4gICAgICAgICAgICByZXR1cm4geyBYOiB4LCBZOiB5LCBaOiB6IH07ICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRzLnB1c2goMCk7XG4gICAgICAgIFt4LCB5LCB6XSA9IHJlc3VsdHMuc2xpY2UoNSwgOCk7XG4gICAgICAgIHJldHVybiB7IFg6IHgsIFk6IHksIFo6IHogfTsgICAgICBcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6ICh0aGlzLmdldE9mZnNldChlbGVtZW50KS50b3AgKyB0aGlzLmdldFRyYW5zbGF0ZTNEKGVsZW1lbnQpLlkpIC0gKGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID8gdGhpcy5nZXRUcmFuc2xhdGVYWShlbGVtZW50KS50cmFuc2xhdGVZIDogMCksXG4gICAgICAgICAgICBsZWZ0OiAodGhpcy5nZXRPZmZzZXQoZWxlbWVudCkubGVmdCArIHRoaXMuZ2V0VHJhbnNsYXRlM0QoZWxlbWVudCkuWCkgLSggZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPyB0aGlzLmdldFRyYW5zbGF0ZVhZKGVsZW1lbnQpLnRyYW5zbGF0ZVggOiAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9wb3NpdGlvbiBwb3BvdmVyXG4gICAgcG9zaXRpb25Qb3BvdmVyKGVsZW1lbnQsIHBvcG92ZXIsIGFycm93LCBzdGVwKSB7XG4gICAgICAgIHZhciBwbGFjZW1lbnQgPSBzdGVwLnBsYWNlbWVudCB8fCAnYXV0byc7XG4gICAgICAgIHZhciBzdHJhdGVneSA9IHN0ZXAuc3RyYXRlZ3kgfHwgJ2Fic29sdXRlJztcblxuICAgICAgICBwb3BvdmVyLnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XG4gICAgICAgIGFycm93LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuICAgICAgICAvL2VsZW1lbnQgdG9wICYgbGVmdFxuICAgICAgICB2YXIgZWxfdG9wLCBlbF9sZWZ0O1xuICAgICAgICBlbF90b3AgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS50b3A7IFxuICAgICAgICBlbF9sZWZ0ID0gdGhpcy5nZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCkubGVmdDsgXG4gICAgXG4gICAgICAgIC8vaWYgcGxhY2VtZW50IGlzIG5vdCBkZWZpbmVkIG9yIGF1dG8gdGhlbiBjYWxjdWxhdGUgbG9jYXRpb25cbiAgICAgICAgaWYgKHBsYWNlbWVudCA9PSAnYXV0bycgfHwgcGxhY2VtZW50ID09ICdhdXRvLXN0YXJ0JyB8fCBwbGFjZW1lbnQgPT0gJ2F1dG8tZW5kJykge1xuICAgICAgICAgICAgY29uc3QgYXJyb3cgPSBwbGFjZW1lbnQucmVwbGFjZSgnYXV0bycsICcnKS50cmltKCk7XG4gICAgICAgICAgICB2YXIgbmV3X2Fycm93ID0gJyc7XG5cbiAgICAgICAgICAgIC8vZWxlbWVudCBpcyBwb3NpdGlvbiB0byB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW5cbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byB0b3BcbiAgICAgICAgICAgIGlmIChlbF90b3AgKyAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSA+IHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gMTAwKSB7XG4gICAgICAgICAgICAgICAgLy9kaXZpZGUgdGhlIHNjcmVlbiBpbnRvIDMgc2VjdGlvbnNcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBpZiAoZWxfbGVmdCA8ICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC8gMykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlbF9sZWZ0ID4gKHRoaXMud2luZG93LmlubmVyV2lkdGggLSAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAvIDMpKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLWVuZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9ICd0b3AnICsgbmV3X2Fycm93O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHNjcmVlblxuICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICBpZiAoKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgcG9wb3Zlci5vZmZzZXRXaWR0aCkgPiB0aGlzLndpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICAgICAgICAgICAgLy9kaXZpZGUgdGhlIHNjcmVlbiBpbnRvIDMgc2VjdGlvbnNcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBpZiAoZWxfdG9wIDwgKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlbF90b3AgPiAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLyAzKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9ICdsZWZ0JyArIG5ld19hcnJvdztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHNjcmVlblxuICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgaWYgKGVsX2xlZnQgPCBwb3BvdmVyLm9mZnNldFdpZHRoICYmIChlbGVtZW50Lm9mZnNldFdpZHRoICsgcG9wb3Zlci5vZmZzZXRXaWR0aCkgPCB0aGlzLndpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICAgICAgICAgICAgLy9kaXZpZGUgdGhlIHNjcmVlbiBpbnRvIDMgc2VjdGlvbnNcbiAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHNlY3Rpb24gMS8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgc3RhcnQgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBpZiAoZWxfdG9wIDwgKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC8gMykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlZnQgaXMgd2l0aGluIHRoYXQgc2VjdGlvbiAzLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBlbmQgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlbF90b3AgPiAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLyAzKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1zdGFydCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9ICdyaWdodCcgKyBuZXdfYXJyb3c7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZWxlbWVudCBpcyBwb3NpdGlvbiB0byB0aGUgdG9wIG9mIHRoZSBzY3JlZW5cbiAgICAgICAgICAgIC8vcG9zaXRpb24gcG9wb3ZlciB0byBib3R0b21cbiAgICAgICAgICAgIGlmIChlbF90b3AgPCAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSB8fCBlbF90b3AgPCAxMDApIHtcbiAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xuICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gc2VjdGlvbiAxLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBzdGFydCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIGlmIChlbF9sZWZ0IDwgKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX2xlZnQgPiAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAtICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC8gMykpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctZW5kJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ2JvdHRvbScgKyBuZXdfYXJyb3c7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vYWRkIHRvIGNsYXNzIGZvciBjc3NcbiAgICAgICAgICAgIHBvcG92ZXIuY2xhc3NMaXN0LmFkZChwbGFjZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy90b3BcbiAgICAgICAgaWYgKHBsYWNlbWVudCA9PSAndG9wJykge1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wIC0gKHBvcG92ZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKChlbGVtZW50Lm9mZnNldFdpZHRoIC8gMikgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCAvIDIpKSkgKyAncHgnO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAndG9wLXN0YXJ0Jykge1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wIC0gKHBvcG92ZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IGVsX2xlZnQgLSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3RvcC1lbmQnKSB7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgLSAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKChlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpIC0gcG9wb3Zlci5vZmZzZXRXaWR0aCkgKyAncHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vYm90dG9tXG4gICAgICAgIGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnYm90dG9tJykge1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpICsgdGhpcy5vcHRpb25zLm9mZnNldCArICdweCc7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIChlbGVtZW50Lm9mZnNldFdpZHRoIC8gMikgLSBwb3BvdmVyLm9mZnNldFdpZHRoIC8gMikgKyAncHgnO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnYm90dG9tLXN0YXJ0Jykge1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpICsgdGhpcy5vcHRpb25zLm9mZnNldCArICdweCc7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2JvdHRvbS1lbmQnKSB7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgJ3B4JztcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9ICgoZWxfbGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0KSAtIHBvcG92ZXIub2Zmc2V0V2lkdGgpICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2xlZnRcbiAgICAgICAgZWxzZSBpZiAocGxhY2VtZW50ID09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIChNYXRoLmFicyhwb3BvdmVyLm9mZnNldEhlaWdodCAtIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSAvIDIpKSArICdweCc7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIChlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3JpZ2h0LXN0YXJ0Jykge1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSBlbF90b3AgLSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAncmlnaHQtZW5kJykge1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSAtIHBvcG92ZXIub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XG4gICAgICAgIH1cblxuICAgICAgICAvL3JpZ2h0XG4gICAgICAgIGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIChNYXRoLmFicyhwb3BvdmVyLm9mZnNldEhlaWdodCAtIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSAvIDIpKSArICdweCc7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIChwb3BvdmVyLm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2xlZnQtc3RhcnQnKSB7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IGVsX3RvcCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdsZWZ0LWVuZCcpIHtcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgLSBwb3BvdmVyLm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0T2Zmc2V0ICsgJ3B4JztcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gKHBvcG92ZXIub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvU2Nyb2xsKSB7XG4gICAgICAgICAgICAvL2lmIHBvc2l0aW9uIGlzIGZpeGVkIHNjcm9sbCB0byB0b3BcbiAgICAgICAgICAgIGlmIChzdHJhdGVneSA9PT0gJ2ZpeGVkJyl7XG4gICAgICAgICAgICAgICAgdGhpcy53aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwiY2VudGVyXCIsIGlubGluZTogXCJuZWFyZXN0XCJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAgICAgICAgICAgIFxuICAgIH1cblxuICAgIGNyZWF0ZU92ZXJsYXkoZWxlbWVudCwgc3RlcCA9IG51bGwpe1xuICAgICAgICB2YXIgc3RyYXRlZ3kgPSAoc3RlcCAmJiBzdGVwLnN0cmF0ZWd5KSA/IHN0ZXAuc3RyYXRlZ3kgOiAnYWJzb2x1dGUnO1xuXG4gICAgICAgIHZhciBvdmVybGF5MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBvdmVybGF5MS5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTEnKTtcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xuXG4gICAgICAgIHZhciBvdmVybGF5MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBvdmVybGF5Mi5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTInKTtcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xuXG4gICAgICAgIHZhciBvdmVybGF5MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBvdmVybGF5My5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTMnKTtcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xuXG4gICAgICAgIHZhciBvdmVybGF5NCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBvdmVybGF5NC5jbGFzc0xpc3QuYWRkKCd3dC1vdmVybGF5JywgJ29wZW4nLCAnb3ZlcmxheTQnKTtcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xuICAgIFxuICAgICAgICAvL2FwcGVuZCB0byBib2R5XG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5MSk7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5Mik7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5Myk7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5NCk7XG5cbiAgICAgICAgLy9lbGVtZW50IHRvcCAmIGxlZnRcbiAgICAgICAgdmFyIGVsX3RvcCwgZWxfbGVmdDtcbiAgICAgICAgZWxfdG9wID0gdGhpcy5nZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCkudG9wOyBcbiAgICAgICAgZWxfbGVmdCA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpLmxlZnQ7XG4gICAgICAgIFxuICAgICAgICB2YXIgaGlnaGxpZ2h0X29mZnNldCA9IHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQ7XG5cbiAgICAgICAgLy9vdmVybGF5cyB0b3AtbGVmdFxuICAgICAgICBvdmVybGF5MS5zdHlsZS5wb3NpdGlvbiA9IHN0cmF0ZWd5O1xuICAgICAgICBvdmVybGF5MS5zdHlsZS50b3AgPSAwO1xuICAgICAgICBvdmVybGF5MS5zdHlsZS53aWR0aCA9ICBlbF9sZWZ0IC0gaGlnaGxpZ2h0X29mZnNldCArICdweCc7XG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLmhlaWdodCA9ICAoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgKyBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLmxlZnQgPSAwO1xuXG4gICAgICAgIC8vb3ZlcmxheXMgdG9wLXJpZ2h0XG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLnRvcCA9IDA7XG4gICAgICAgIG92ZXJsYXkyLnN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUuaGVpZ2h0ID0gKGVsX3RvcCAtIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xuXG4gICAgICAgIC8vb3ZlcmxheXMgYm90dG9tLXJpZ2h0XG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLnRvcCA9IChlbF90b3AgLSBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XG4gICAgICAgIG92ZXJsYXkzLnN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUuYm90dG9tID0gMCAtICh0aGlzLmRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC0gdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQpICsgJ3B4JztcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcblxuICAgICAgICAvL292ZXJsYXlzIGJvdHRvbS1sZWZ0XG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCArIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUud2lkdGggPSAgIGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgaGlnaGxpZ2h0X29mZnNldCAgKyAncHgnO1xuICAgICAgICBvdmVybGF5NC5zdHlsZS5ib3R0b20gPSAwIC0gKHRoaXMuZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSB0aGlzLndpbmRvdy5pbm5lckhlaWdodCkgKyAncHgnO1xuICAgICAgICBvdmVybGF5NC5zdHlsZS5sZWZ0ID0gMDtcbiAgICB9XG5cbn1cbiJdLCJuYW1lcyI6WyJXZWJUb3VyIiwib3B0aW9ucyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9jbGFzc0NhbGxDaGVjayIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJfb2JqZWN0U3ByZWFkIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJvZmZzZXQiLCJib3JkZXJSYWRpdXMiLCJhbGxvd0Nsb3NlIiwiaGlnaGxpZ2h0IiwiaGlnaGxpZ2h0T2Zmc2V0Iiwia2V5Ym9hcmQiLCJ3aWR0aCIsInpJbmRleCIsInJlbW92ZUFycm93IiwiYXV0b1Njcm9sbCIsIm9uTmV4dCIsIm9uUHJldmlvdXMiLCJsYWJlbHMiLCJuZXh0IiwicHJldiIsImRvbmUiLCJjbG9zZSIsInN0ZXBzIiwic3RlcEluZGV4IiwiaXNSdW5uaW5nIiwiaXNQYXVzZWQiLCJ3aW5kb3ciLCJkb2N1bWVudCIsIm9uQ2xpY2siLCJiaW5kIiwib25SZXNpemUiLCJvbktleVVwIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJkb2N1bWVudEVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicHJldmlvdXMiLCJzdG9wIiwiZXZlbnQiLCJrZXlDb2RlIiwiY2xlYXIiLCJyZW5kZXIiLCJzZXRTdGVwcyIsImdldFN0ZXBzIiwiZWxlbWVudCIsIl90aGlzIiwic3RlcCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVPdmVybGF5Iiwic3RhcnQiLCJzdGFydEluZGV4Iiwic2hvd0xvYWRlciIsInBvcG92ZXIiLCJsb2FkZXIiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwic3R5bGUiLCJwcmVwZW5kIiwibW92ZU5leHQiLCJtb3ZlUHJldmlvdXMiLCJwb3NpdGlvbiIsInN0ZXBfaGlnaGxpZ2h0Iiwic2V0QXR0cmlidXRlIiwicGxhY2VtZW50IiwicG9wb3ZlcklubmVyIiwidGl0bGUiLCJhcHBlbmQiLCJpbm5lclRleHQiLCJjb250ZW50IiwiaW5uZXJIVE1MIiwic2hvd0J0bnMiLCJCb29sZWFuIiwiYnRuTmV4dCIsImJ0bkJhY2siLCJ0ZXh0IiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJ0ZXh0Q29sb3IiLCJhcnJvdyIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInBvc2l0aW9uUG9wb3ZlciIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJibG9jayIsImlubGluZSIsIm92ZXJsYXkiLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJyZW1vdmUiLCJwb3B1cCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwicmVtb3ZlQXR0cmlidXRlIiwiZ2V0V2luZG93T2Zmc2V0IiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpbm5lcldpZHRoIiwiY2xpZW50V2lkdGgiLCJnZXRPZmZzZXQiLCJlbCIsIl94IiwiX3kiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaXNOYU4iLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0VG9wIiwic2Nyb2xsTGVmdCIsInNjcm9sbFRvcCIsIm9mZnNldFBhcmVudCIsInBhcnNlSW50IiwieSIsIngiLCJnZXRUcmFuc2xhdGVYWSIsImdldENvbXB1dGVkU3R5bGUiLCJtYXRyaXgiLCJET01NYXRyaXhSZWFkT25seSIsInRyYW5zZm9ybSIsInRyYW5zbGF0ZVgiLCJNYXRoIiwiYWJzIiwib2Zmc2V0V2lkdGgiLCJtNDEiLCJ0cmFuc2xhdGVZIiwib2Zmc2V0SGVpZ2h0IiwibTQyIiwiZ2V0VHJhbnNsYXRlM0QiLCJnZXRQcm9wZXJ0eVZhbHVlIiwicmVzdWx0cyIsIm1hdGNoIiwieiIsIlgiLCJZIiwiWiIsIl9yZXN1bHRzJHNsaWNlIiwic2xpY2UiLCJfcmVzdWx0cyRzbGljZTIiLCJfc2xpY2VkVG9BcnJheSIsInB1c2giLCJfcmVzdWx0cyRzbGljZTMiLCJfcmVzdWx0cyRzbGljZTQiLCJnZXRFbGVtZW50UG9zaXRpb24iLCJzdHJhdGVneSIsImVsX3RvcCIsImVsX2xlZnQiLCJyZXBsYWNlIiwidHJpbSIsIm5ld19hcnJvdyIsInNjcm9sbFRvIiwib3ZlcmxheTEiLCJvdmVybGF5MiIsIm92ZXJsYXkzIiwib3ZlcmxheTQiLCJoaWdobGlnaHRfb2Zmc2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BQXFCQSxPQUFPLEdBQUEsWUFBQTtFQUN4QixFQUFBLFNBQUFBLFVBQTBCO0VBQUEsSUFBQSxJQUFkQyxPQUFPLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxHQUFBLENBQUEsSUFBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBRSxTQUFBLEdBQUFGLFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBRyxFQUFFLENBQUE7RUFBQUcsSUFBQUEsZUFBQSxPQUFBTCxPQUFBLENBQUEsQ0FBQTtFQUNwQixJQUFBLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQ00sV0FBVyxDQUFDQyxRQUFRLEVBQUU7RUFDN0IsTUFBQSxPQUFPLElBQUksQ0FBQ0QsV0FBVyxDQUFDQyxRQUFRLENBQUE7RUFDcEMsS0FBQTtFQUVBLElBQUEsSUFBSSxDQUFDRCxXQUFXLENBQUNDLFFBQVEsR0FBRyxJQUFJLENBQUE7TUFFaEMsSUFBSSxDQUFDTixPQUFPLEdBQUFPLGNBQUEsQ0FBQTtFQUNSQyxNQUFBQSxPQUFPLEVBQUUsSUFBSTtFQUNiQyxNQUFBQSxPQUFPLEVBQUUsR0FBRztFQUNaQyxNQUFBQSxNQUFNLEVBQUUsRUFBRTtFQUNWQyxNQUFBQSxZQUFZLEVBQUUsQ0FBQztFQUNmQyxNQUFBQSxVQUFVLEVBQUUsSUFBSTtFQUNoQkMsTUFBQUEsU0FBUyxFQUFFLElBQUk7RUFDZkMsTUFBQUEsZUFBZSxFQUFFLENBQUM7RUFDbEJDLE1BQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2RDLE1BQUFBLEtBQUssRUFBRSxPQUFPO0VBQ2RDLE1BQUFBLE1BQU0sRUFBRSxLQUFLO0VBQ2JDLE1BQUFBLFdBQVcsRUFBRSxLQUFLO0VBQ2xCQyxNQUFBQSxVQUFVLEVBQUUsSUFBSTtRQUNoQkMsTUFBTSxFQUFFLFNBQUFBLE1BQUEsR0FBQTtFQUFBLFFBQUEsT0FBTSxJQUFJLENBQUE7RUFBQSxPQUFBO1FBQ2xCQyxVQUFVLEVBQUUsU0FBQUEsVUFBQSxHQUFBO0VBQUEsUUFBQSxPQUFNLElBQUksQ0FBQTtFQUFBLE9BQUE7RUFBQSxLQUFBLEVBQ25CckIsT0FBTyxDQUNiLENBQUE7TUFFRCxJQUFJLENBQUNzQixNQUFNLEdBQUc7RUFDVkMsTUFBQUEsSUFBSSxFQUFFLGNBQWM7RUFDcEJDLE1BQUFBLElBQUksRUFBRSxjQUFjO0VBQ3BCQyxNQUFBQSxJQUFJLEVBQUUsTUFBTTtFQUNaQyxNQUFBQSxLQUFLLEVBQUUsT0FBQTtPQUNWLENBQUE7TUFFRCxJQUFJLENBQUNDLEtBQUssR0FBRyxFQUFFLENBQUE7TUFDZixJQUFJLENBQUNDLFNBQVMsR0FBRyxDQUFDLENBQUE7TUFDbEIsSUFBSSxDQUFDQyxTQUFTLEdBQUcsS0FBSyxDQUFBO01BQ3RCLElBQUksQ0FBQ0MsUUFBUSxHQUFHLEtBQUssQ0FBQTtNQUdyQixJQUFJLENBQUNDLE1BQU0sR0FBR0EsTUFBTSxDQUFBO01BQ3BCLElBQUksQ0FBQ0MsUUFBUSxHQUFHQSxRQUFRLENBQUE7TUFHeEIsSUFBSSxDQUFDQyxPQUFPLEdBQUcsSUFBSSxDQUFDQSxPQUFPLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtNQUN0QyxJQUFJLENBQUNDLFFBQVEsR0FBRyxJQUFJLENBQUNBLFFBQVEsQ0FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO01BQ3hDLElBQUksQ0FBQ0UsT0FBTyxHQUFHLElBQUksQ0FBQ0EsT0FBTyxDQUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7TUFFdEMsSUFBSSxDQUFDQSxJQUFJLEVBQUUsQ0FBQTtFQUVYLElBQUEsT0FBTyxJQUFJLENBQUE7RUFFZixHQUFBO0VBQUNHLEVBQUFBLFlBQUEsQ0FBQXRDLE9BQUEsRUFBQSxDQUFBO01BQUF1QyxHQUFBLEVBQUEsTUFBQTtNQUFBQyxLQUFBLEVBRUQsU0FBQUwsSUFBQUEsR0FBTztRQUNILElBQUksRUFBRSxjQUFjLElBQUksSUFBSSxDQUFDRixRQUFRLENBQUNRLGVBQWUsQ0FBQyxFQUFFO0VBQ3BELFFBQUEsSUFBSSxDQUFDVCxNQUFNLENBQUNVLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUNSLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtFQUM5RCxPQUFDLE1BQU07RUFDSCxRQUFBLElBQUksQ0FBQ0YsTUFBTSxDQUFDVSxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDUixPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7RUFDbkUsT0FBQTtFQUVBLE1BQUEsSUFBSSxDQUFDRixNQUFNLENBQUNVLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUNOLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtFQUM1RCxNQUFBLElBQUksQ0FBQ0osTUFBTSxDQUFDVSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDTCxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7RUFDOUQsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBRSxHQUFBLEVBQUEsU0FBQTtFQUFBQyxJQUFBQSxLQUFBLEVBRUQsU0FBQU4sT0FBUVMsQ0FBQUEsQ0FBQyxFQUFFO1FBQ1BBLENBQUMsQ0FBQ0MsZUFBZSxFQUFFLENBQUE7UUFDbkIsSUFBSUQsQ0FBQyxDQUFDRSxNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1VBQzVDLElBQUksQ0FBQzFCLE1BQU0sRUFBRSxDQUFBO1VBQ2IsSUFBSSxDQUFDRyxJQUFJLEVBQUUsQ0FBQTtFQUNmLE9BQUE7UUFFQSxJQUFJbUIsQ0FBQyxDQUFDRSxNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1VBQzVDLElBQUksQ0FBQ3pCLFVBQVUsRUFBRSxDQUFBO1VBQ2pCLElBQUksQ0FBQzBCLFFBQVEsRUFBRSxDQUFBO0VBQ25CLE9BQUE7UUFFQSxJQUFJTCxDQUFDLENBQUNFLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7RUFFM0MsUUFBQSxJQUFJLElBQUksQ0FBQzlDLE9BQU8sQ0FBQ1ksVUFBVSxFQUFFO1lBQ3pCLElBQUksQ0FBQ29DLElBQUksRUFBRSxDQUFBO0VBQ2YsU0FBQTtFQUNKLE9BQUE7RUFDSixLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUFWLEdBQUEsRUFBQSxTQUFBO0VBQUFDLElBQUFBLEtBQUEsRUFFRCxTQUFBSCxPQUFRYSxDQUFBQSxLQUFLLEVBQUU7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDcEIsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDN0IsT0FBTyxDQUFDZSxRQUFRLEVBQUU7RUFDM0MsUUFBQSxPQUFBO0VBQ0osT0FBQTtRQUVBLElBQUlrQyxLQUFLLENBQUNDLE9BQU8sS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDbEQsT0FBTyxDQUFDWSxVQUFVLEVBQUU7VUFDakQsSUFBSSxDQUFDb0MsSUFBSSxFQUFFLENBQUE7RUFDWCxRQUFBLE9BQUE7RUFDSixPQUFBO0VBR0EsTUFBQSxJQUFJQyxLQUFLLENBQUNDLE9BQU8sS0FBSyxFQUFFLEVBQUU7VUFDdEIsSUFBSSxDQUFDOUIsTUFBTSxFQUFFLENBQUE7VUFDYixJQUFJLENBQUNHLElBQUksRUFBRSxDQUFBO0VBQ2YsT0FBQyxNQUVJLElBQUkwQixLQUFLLENBQUNDLE9BQU8sS0FBSyxFQUFFLEVBQUc7VUFDNUIsSUFBSSxDQUFDN0IsVUFBVSxFQUFFLENBQUE7VUFDakIsSUFBSSxDQUFDMEIsUUFBUSxFQUFFLENBQUE7RUFDbkIsT0FBQTtFQUNKLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQVQsR0FBQSxFQUFBLFVBQUE7TUFBQUMsS0FBQSxFQUdELFNBQUFKLFFBQUFBLEdBQVc7RUFDUCxNQUFBLElBQUksQ0FBQyxJQUFJLENBQUNOLFNBQVMsRUFBRTtFQUNqQixRQUFBLE9BQUE7RUFDSixPQUFBO1FBRUEsSUFBSSxDQUFDc0IsS0FBSyxFQUFFLENBQUE7UUFDWixJQUFJLENBQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0VBQzNDLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQVUsR0FBQSxFQUFBLFVBQUE7RUFBQUMsSUFBQUEsS0FBQSxFQUdELFNBQUFjLFFBQVMxQixDQUFBQSxLQUFLLEVBQUU7UUFDWixJQUFJLENBQUNBLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDakIsSUFBSSxDQUFDQSxLQUFLLEdBQUdBLEtBQUssQ0FBQTtFQUN0QixLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUFXLEdBQUEsRUFBQSxVQUFBO01BQUFDLEtBQUEsRUFHRCxTQUFBZSxRQUFBQSxHQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMzQixLQUFLLENBQUE7RUFDckIsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBVyxHQUFBLEVBQUEsV0FBQTtNQUFBQyxLQUFBLEVBRUQsU0FBQTFCLFNBQUFBLENBQVUwQyxPQUFPLEVBQUE7RUFBQSxNQUFBLElBQUFDLEtBQUEsR0FBQSxJQUFBLENBQUE7RUFBQSxNQUFBLElBQUVDLElBQUksR0FBQXhELFNBQUEsQ0FBQUMsTUFBQSxHQUFBLENBQUEsSUFBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBRSxTQUFBLEdBQUFGLFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBRyxJQUFJLENBQUE7RUFBQSxNQUFBLE9BQUEsVUFBQXNELE9BQUEsRUFBQztVQUMzQkMsS0FBSSxDQUFDM0IsU0FBUyxHQUFHLElBQUksQ0FBQTtVQUNyQixJQUFJMEIsT0FBTyxHQUFHQyxLQUFJLENBQUN4QixRQUFRLENBQUMwQixhQUFhLENBQUNILE9BQU8sQ0FBQyxDQUFBO0VBQ2xELFFBQUEsSUFBSUEsT0FBTyxFQUFDO0VBQ1IsVUFBQSxJQUFJRSxJQUFJLEVBQUM7Y0FDTEQsS0FBSSxDQUFDN0IsS0FBSyxHQUFHLElBQUksQ0FBQTtjQUNqQjZCLEtBQUksQ0FBQzVCLFNBQVMsR0FBRyxDQUFDLENBQUE7Y0FDbEI0QixLQUFJLENBQUM3QixLQUFLLEdBQUc4QixJQUFJLENBQUE7Y0FDakJELEtBQUksQ0FBQ0osTUFBTSxDQUFDSSxLQUFJLENBQUM3QixLQUFLLENBQUM2QixLQUFJLENBQUM1QixTQUFTLENBQUMsQ0FBQyxDQUFBO0VBQzNDLFdBQUMsTUFBSTtFQUNENEIsWUFBQUEsS0FBSSxDQUFDRyxhQUFhLENBQUNKLE9BQU8sRUFBRUUsSUFBSSxDQUFDLENBQUE7RUFDckMsV0FBQTtFQUNKLFNBQUE7RUFDSixPQUFDLENBQUFGLE9BQUEsQ0FBQSxDQUFBO0VBQUEsS0FBQTtFQUFBLEdBQUEsRUFBQTtNQUFBakIsR0FBQSxFQUFBLE9BQUE7TUFBQUMsS0FBQSxFQUdELFNBQUFxQixLQUFBQSxHQUFzQjtFQUFBLE1BQUEsSUFBaEJDLFVBQVUsR0FBQTVELFNBQUEsQ0FBQUMsTUFBQSxHQUFBLENBQUEsSUFBQUQsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBRSxTQUFBLEdBQUFGLFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBRyxDQUFDLENBQUE7UUFDaEIsSUFBSSxDQUFDNEIsU0FBUyxHQUFHLElBQUksQ0FBQTtRQUNyQixJQUFJLENBQUNELFNBQVMsR0FBR2lDLFVBQVUsQ0FBQTtRQUMzQixJQUFJLENBQUNULE1BQU0sQ0FBQyxJQUFJLENBQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0VBQzNDLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQVUsR0FBQSxFQUFBLE1BQUE7TUFBQUMsS0FBQSxFQUVELFNBQUFTLElBQUFBLEdBQU87UUFDSCxJQUFJLENBQUNHLEtBQUssRUFBRSxDQUFBO1FBQ1osSUFBSSxDQUFDdEIsU0FBUyxHQUFHLEtBQUssQ0FBQTtFQUMxQixLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUFTLEdBQUEsRUFBQSxZQUFBO01BQUFDLEtBQUEsRUFHRCxTQUFBdUIsVUFBQUEsR0FBYTtRQUNULElBQU1DLE9BQU8sR0FBRyxJQUFJLENBQUMvQixRQUFRLENBQUMwQixhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDMUQsSUFBTU0sTUFBTSxHQUFHLElBQUksQ0FBQ2hDLFFBQVEsQ0FBQ2lDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNqREQsTUFBQUEsTUFBTSxDQUFDbkIsU0FBUyxDQUFDcUIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2pDRixNQUFNLENBQUNHLEtBQUssQ0FBQ2xELE1BQU0sR0FBRyxJQUFJLENBQUNqQixPQUFPLENBQUNpQixNQUFNLEdBQUcsRUFBRSxDQUFBO0VBQzlDOEMsTUFBQUEsT0FBTyxDQUFDSyxPQUFPLENBQUNKLE1BQU0sQ0FBQyxDQUFBO0VBQzNCLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQTFCLEdBQUEsRUFBQSxVQUFBO01BQUFDLEtBQUEsRUFFRCxTQUFBOEIsUUFBQUEsR0FBVztRQUNQLElBQUksQ0FBQ3ZDLFFBQVEsR0FBRyxLQUFLLENBQUE7UUFDckIsSUFBSSxDQUFDUCxJQUFJLEVBQUUsQ0FBQTtFQUNmLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQWUsR0FBQSxFQUFBLGNBQUE7TUFBQUMsS0FBQSxFQUVELFNBQUErQixZQUFBQSxHQUFlO1FBQ1gsSUFBSSxDQUFDeEMsUUFBUSxHQUFHLEtBQUssQ0FBQTtRQUNyQixJQUFJLENBQUNpQixRQUFRLEVBQUUsQ0FBQTtFQUNuQixLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUFULEdBQUEsRUFBQSxRQUFBO01BQUFDLEtBQUEsRUFFRCxTQUFBbkIsTUFBQUEsR0FBUTtRQUNKLElBQUksSUFBSSxDQUFDVSxRQUFRLEVBQUUsT0FBQTtFQUVuQixNQUFBLElBQUksSUFBSSxDQUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUNELEtBQUssQ0FBQyxJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDUixNQUFNLEVBQUUsSUFBSSxDQUFDTyxLQUFLLENBQUMsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQ1IsTUFBTSxFQUFFLENBQUE7RUFDNUcsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBa0IsR0FBQSxFQUFBLFlBQUE7TUFBQUMsS0FBQSxFQUVELFNBQUFsQixVQUFBQSxHQUFZO1FBQ1IsSUFBSSxJQUFJLENBQUNTLFFBQVEsRUFBRSxPQUFBO0VBRW5CLE1BQUEsSUFBSSxJQUFJLENBQUNILEtBQUssQ0FBQyxJQUFJLENBQUNDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUNQLFVBQVUsRUFBRSxJQUFJLENBQUNNLEtBQUssQ0FBQyxJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDUCxVQUFVLEVBQUUsQ0FBQTtFQUNwSCxLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUFpQixHQUFBLEVBQUEsTUFBQTtNQUFBQyxLQUFBLEVBR0QsU0FBQWhCLElBQUFBLEdBQU87UUFDSCxJQUFJLElBQUksQ0FBQ08sUUFBUSxFQUFFLE9BQUE7UUFFbkIsSUFBSSxDQUFDRixTQUFTLEVBQUUsQ0FBQTtRQUNoQixJQUFJLENBQUN1QixLQUFLLEVBQUUsQ0FBQTtRQUVaLElBQUksSUFBSSxDQUFDeEIsS0FBSyxDQUFDekIsTUFBTSxLQUFLLENBQUMsRUFBRSxPQUFPLEtBQUssQ0FBQTtRQUV6QyxJQUFJLElBQUksQ0FBQzBCLFNBQVMsSUFBSSxJQUFJLENBQUNELEtBQUssQ0FBQ3pCLE1BQU0sRUFBRTtVQUNyQyxJQUFJLENBQUM4QyxJQUFJLEVBQUUsQ0FBQTtFQUNYLFFBQUEsT0FBQTtFQUNKLE9BQUE7UUFFQSxJQUFJLENBQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0VBQzNDLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQVUsR0FBQSxFQUFBLFVBQUE7TUFBQUMsS0FBQSxFQUVELFNBQUFRLFFBQUFBLEdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQ2pCLFFBQVEsRUFBRSxPQUFBO1FBRW5CLElBQUksQ0FBQ0YsU0FBUyxFQUFFLENBQUE7UUFDaEIsSUFBSSxDQUFDdUIsS0FBSyxFQUFFLENBQUE7UUFFWixJQUFJLElBQUksQ0FBQ3hCLEtBQUssQ0FBQ3pCLE1BQU0sS0FBSyxDQUFDLEVBQUUsT0FBTyxLQUFLLENBQUE7RUFFekMsTUFBQSxJQUFJLElBQUksQ0FBQzBCLFNBQVMsR0FBRyxDQUFDLEVBQUU7VUFDcEIsSUFBSSxDQUFDb0IsSUFBSSxFQUFFLENBQUE7RUFDWCxRQUFBLE9BQUE7RUFDSixPQUFBO1FBRUEsSUFBSSxDQUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDekIsS0FBSyxDQUFDLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUMsQ0FBQTtFQUMzQyxLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUFVLEdBQUEsRUFBQSxRQUFBO0VBQUFDLElBQUFBLEtBQUEsRUFHRCxTQUFBYSxNQUFPSyxDQUFBQSxJQUFJLEVBQUU7RUFDVCxNQUFBLElBQUlGLE9BQU8sR0FBR0UsSUFBSSxDQUFDRixPQUFPLEdBQUcsSUFBSSxDQUFDdkIsUUFBUSxDQUFDMEIsYUFBYSxDQUFDRCxJQUFJLENBQUNGLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQTtFQUc3RSxNQUFBLElBQUlBLE9BQU8sRUFBRTtFQUNUQSxRQUFBQSxPQUFPLENBQUNZLEtBQUssQ0FBQ0ksUUFBUSxHQUFHLENBQUNoQixPQUFPLENBQUNZLEtBQUssQ0FBQ0ksUUFBUSxHQUFHLFVBQVUsR0FBR2hCLE9BQU8sQ0FBQ1ksS0FBSyxDQUFDSSxRQUFRLENBQUE7VUFDdEYsSUFBTUMsY0FBYyxHQUFHLENBQUNmLElBQUksQ0FBQzVDLFNBQVMsR0FBRyxJQUFJLEdBQUc0QyxJQUFJLENBQUM1QyxTQUFTLENBQUE7RUFFOUQsUUFBQSxJQUFJLElBQUksQ0FBQ2IsT0FBTyxDQUFDYSxTQUFTLElBQUkyRCxjQUFjLEVBQUc7RUFDM0NqQixVQUFBQSxPQUFPLENBQUNrQixZQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0VBQ2hELFNBQUE7RUFDSixPQUFBO1FBR0EsSUFBTVYsT0FBTyxHQUFHLElBQUksQ0FBQy9CLFFBQVEsQ0FBQ2lDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNsREYsTUFBQUEsT0FBTyxDQUFDbEIsU0FBUyxDQUFDcUIsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ25DSCxPQUFPLENBQUNJLEtBQUssQ0FBQ3hELFlBQVksR0FBRyxJQUFJLENBQUNYLE9BQU8sQ0FBQ1csWUFBWSxHQUFHLElBQUksQ0FBQTtRQUM3RG9ELE9BQU8sQ0FBQ0ksS0FBSyxDQUFDbEQsTUFBTSxHQUFHLElBQUksQ0FBQ2pCLE9BQU8sQ0FBQ2lCLE1BQU0sR0FBRyxFQUFFLENBQUE7RUFDL0MsTUFBQSxJQUFJd0MsSUFBSSxDQUFDaUIsU0FBUyxFQUFFWCxPQUFPLENBQUNsQixTQUFTLENBQUNxQixHQUFHLENBQUNULElBQUksQ0FBQ2lCLFNBQVMsQ0FBQyxDQUFBO0VBRXpELE1BQUEsSUFBSSxJQUFJLENBQUMxRSxPQUFPLENBQUNnQixLQUFLLEVBQUU7VUFDcEIsSUFBSSxPQUFPLElBQUksQ0FBQ2hCLE9BQU8sQ0FBQ2dCLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDeEMrQyxPQUFPLENBQUNJLEtBQUssQ0FBQ25ELEtBQUssR0FBRyxJQUFJLENBQUNoQixPQUFPLENBQUNnQixLQUFLLENBQUE7V0FDM0MsTUFBTSxJQUFJLElBQUksQ0FBQ2hCLE9BQU8sQ0FBQ2dCLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDL0IrQyxPQUFPLENBQUNJLEtBQUssQ0FBQ25ELEtBQUssR0FBRyxJQUFJLENBQUNoQixPQUFPLENBQUNnQixLQUFLLEdBQUcsSUFBSSxDQUFBO0VBQ25ELFNBQUE7RUFDSixPQUFBO1FBRUEsSUFBSXlDLElBQUksQ0FBQ3pDLEtBQUssRUFBRTtFQUNaLFFBQUEsSUFBSSxPQUFPeUMsSUFBSSxDQUFDekMsS0FBSyxLQUFLLFFBQVEsRUFBRTtFQUNoQytDLFVBQUFBLE9BQU8sQ0FBQ0ksS0FBSyxDQUFDbkQsS0FBSyxHQUFHeUMsSUFBSSxDQUFDekMsS0FBSyxDQUFBO0VBQ3BDLFNBQUMsTUFBTSxJQUFJeUMsSUFBSSxDQUFDekMsS0FBSyxHQUFHLENBQUMsRUFBRTtZQUN2QitDLE9BQU8sQ0FBQ0ksS0FBSyxDQUFDbkQsS0FBSyxHQUFHeUMsSUFBSSxDQUFDekMsS0FBSyxHQUFHLElBQUksQ0FBQTtFQUMzQyxTQUFBO0VBQ0osT0FBQTtRQUdBLElBQU0yRCxZQUFZLEdBQUcsSUFBSSxDQUFDM0MsUUFBUSxDQUFDaUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQ3ZEVSxNQUFBQSxZQUFZLENBQUM5QixTQUFTLENBQUNxQixHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUc5QyxJQUFNVSxLQUFLLEdBQUcsSUFBSSxDQUFDNUMsUUFBUSxDQUFDaUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQ2hEVyxNQUFBQSxLQUFLLENBQUMvQixTQUFTLENBQUNxQixHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDL0IsSUFBSVQsSUFBSSxDQUFDbUIsS0FBSyxFQUFFRCxZQUFZLENBQUNFLE1BQU0sQ0FBQ0QsS0FBSyxDQUFDLENBQUE7UUFDMUMsSUFBSW5CLElBQUksQ0FBQ21CLEtBQUssRUFBRUEsS0FBSyxDQUFDRSxTQUFTLEdBQUdyQixJQUFJLENBQUNtQixLQUFLLENBQUE7UUFHNUMsSUFBTUcsT0FBTyxHQUFHLElBQUksQ0FBQy9DLFFBQVEsQ0FBQ2lDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNsRGMsTUFBQUEsT0FBTyxDQUFDbEMsU0FBUyxDQUFDcUIsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0VBQ25DUyxNQUFBQSxZQUFZLENBQUNFLE1BQU0sQ0FBQ0UsT0FBTyxDQUFDLENBQUE7UUFDNUJBLE9BQU8sQ0FBQ0MsU0FBUyxHQUFJdkIsSUFBSSxDQUFDc0IsT0FBTyxHQUFHdEIsSUFBSSxDQUFDc0IsT0FBTyxHQUFHLEVBQUcsQ0FBQTtRQUd0RCxJQUFNRSxRQUFRLEdBQUl4QixJQUFJLENBQUN3QixRQUFRLElBQUksSUFBSSxJQUFJeEIsSUFBSSxDQUFDd0IsUUFBUSxJQUFJLFdBQVcsR0FBSSxJQUFJLEdBQUdDLE9BQU8sQ0FBQ3pCLElBQUksQ0FBQ3dCLFFBQVEsQ0FBQyxDQUFBO0VBRXhHLE1BQUEsSUFBSUEsUUFBUSxFQUFDO1VBQ1QsSUFBTUUsT0FBTyxHQUFHLElBQUksQ0FBQ25ELFFBQVEsQ0FBQ2lDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtVQUNyRCxJQUFNbUIsT0FBTyxHQUFHLElBQUksQ0FBQ3BELFFBQVEsQ0FBQ2lDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtVQUVyRGtCLE9BQU8sQ0FBQ3RDLFNBQVMsQ0FBQ3FCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUE7VUFDL0NrQixPQUFPLENBQUN2QyxTQUFTLENBQUNxQixHQUFHLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFBO0VBRS9DaUIsUUFBQUEsT0FBTyxDQUFDSCxTQUFTLEdBQUl2QixJQUFJLENBQUMwQixPQUFPLElBQUkxQixJQUFJLENBQUMwQixPQUFPLENBQUNFLElBQUksR0FBRzVCLElBQUksQ0FBQzBCLE9BQU8sQ0FBQ0UsSUFBSSxHQUFJLElBQUksQ0FBQ3pELFNBQVMsSUFBSSxJQUFJLENBQUNELEtBQUssQ0FBQ3pCLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDb0IsTUFBTSxDQUFDRyxJQUFJLEdBQUcsSUFBSSxDQUFDSCxNQUFNLENBQUNDLElBQU0sQ0FBQTtFQUM3SjZELFFBQUFBLE9BQU8sQ0FBQ0osU0FBUyxHQUFJdkIsSUFBSSxDQUFDMkIsT0FBTyxJQUFJM0IsSUFBSSxDQUFDMkIsT0FBTyxDQUFDQyxJQUFJLEdBQUc1QixJQUFJLENBQUMyQixPQUFPLENBQUNDLElBQUksR0FBSSxJQUFJLENBQUN6RCxTQUFTLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQ04sTUFBTSxDQUFDSSxLQUFLLEdBQUcsSUFBSSxDQUFDSixNQUFNLENBQUNFLElBQU0sQ0FBQTtVQUcxSTJELE9BQU8sQ0FBQ2hCLEtBQUssQ0FBQ21CLGVBQWUsR0FBSTdCLElBQUksQ0FBQzBCLE9BQU8sSUFBSTFCLElBQUksQ0FBQzBCLE9BQU8sQ0FBQ0csZUFBZSxHQUFHN0IsSUFBSSxDQUFDMEIsT0FBTyxDQUFDRyxlQUFlLEdBQUcsU0FBVSxDQUFBO1VBQ3pISCxPQUFPLENBQUNoQixLQUFLLENBQUNvQixLQUFLLEdBQUk5QixJQUFJLENBQUMwQixPQUFPLElBQUkxQixJQUFJLENBQUMwQixPQUFPLENBQUNLLFNBQVMsR0FBRy9CLElBQUksQ0FBQzBCLE9BQU8sQ0FBQ0ssU0FBUyxHQUFHLE1BQU8sQ0FBQTtVQUVoR0osT0FBTyxDQUFDakIsS0FBSyxDQUFDbUIsZUFBZSxHQUFJN0IsSUFBSSxDQUFDMkIsT0FBTyxJQUFJM0IsSUFBSSxDQUFDMkIsT0FBTyxDQUFDRSxlQUFlLEdBQUc3QixJQUFJLENBQUMyQixPQUFPLENBQUNFLGVBQWUsR0FBRyxVQUFXLENBQUE7VUFDMUhGLE9BQU8sQ0FBQ2pCLEtBQUssQ0FBQ29CLEtBQUssR0FBSTlCLElBQUksQ0FBQzJCLE9BQU8sSUFBSTNCLElBQUksQ0FBQzJCLE9BQU8sQ0FBQ0ksU0FBUyxHQUFHL0IsSUFBSSxDQUFDMkIsT0FBTyxDQUFDSSxTQUFTLEdBQUcsTUFBTyxDQUFBO0VBQ2hHYixRQUFBQSxZQUFZLENBQUNFLE1BQU0sQ0FBQ00sT0FBTyxDQUFDLENBQUE7RUFDNUJSLFFBQUFBLFlBQVksQ0FBQ0UsTUFBTSxDQUFDTyxPQUFPLENBQUMsQ0FBQTtFQUNoQyxPQUFBO1FBR0EsSUFBTUssS0FBSyxHQUFHLElBQUksQ0FBQ3pELFFBQVEsQ0FBQ2lDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNoRHdCLE1BQUFBLEtBQUssQ0FBQzVDLFNBQVMsQ0FBQ3FCLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtFQUMvQnVCLE1BQUFBLEtBQUssQ0FBQ2hCLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQTtFQUMvQ1YsTUFBQUEsT0FBTyxDQUFDYyxNQUFNLENBQUNZLEtBQUssQ0FBQyxDQUFBO0VBR3JCMUIsTUFBQUEsT0FBTyxDQUFDYyxNQUFNLENBQUNGLFlBQVksQ0FBQyxDQUFBO1FBRzVCLElBQUksQ0FBQzNDLFFBQVEsQ0FBQzBELElBQUksQ0FBQ0MsV0FBVyxDQUFDNUIsT0FBTyxDQUFDLENBQUE7RUFFdkMsTUFBQSxJQUFJUixPQUFPLEVBQUU7VUFDVCxJQUFJLENBQUNxQyxlQUFlLENBQUNyQyxPQUFPLEVBQUVRLE9BQU8sRUFBRTBCLEtBQUssRUFBRWhDLElBQUksQ0FBQyxDQUFBO0VBQ25ELFFBQUEsSUFBSSxJQUFJLENBQUN6RCxPQUFPLENBQUNhLFNBQVMsRUFBQztFQUN2QixVQUFBLElBQUksQ0FBQzhDLGFBQWEsQ0FBQ0osT0FBTyxFQUFFRSxJQUFJLENBQUMsQ0FBQTtFQUNyQyxTQUFBO0VBQ0osT0FBQyxNQUtJO0VBQ0RNLFFBQUFBLE9BQU8sQ0FBQ2xCLFNBQVMsQ0FBQ3FCLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtFQUNsQyxRQUFBLElBQUksSUFBSSxDQUFDbEUsT0FBTyxDQUFDbUIsVUFBVSxFQUFFO1lBQ3pCNEMsT0FBTyxDQUFDOEIsY0FBYyxDQUFDO0VBQUNDLFlBQUFBLFFBQVEsRUFBRSxRQUFRO0VBQUVDLFlBQUFBLEtBQUssRUFBRSxRQUFRO0VBQUVDLFlBQUFBLE1BQU0sRUFBRSxRQUFBO0VBQVEsV0FBQyxDQUFDLENBQUE7RUFDbkYsU0FBQTtFQUVBLFFBQUEsSUFBSSxJQUFJLENBQUNoRyxPQUFPLENBQUNhLFNBQVMsRUFBQztFQUN2QixVQUFBLElBQUlvRixPQUFPLEdBQUdqRSxRQUFRLENBQUNpQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDM0NnQyxPQUFPLENBQUNwRCxTQUFTLENBQUNxQixHQUFHLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQzNDK0IsT0FBTyxDQUFDOUIsS0FBSyxDQUFDbEQsTUFBTSxHQUFHLElBQUksQ0FBQ2pCLE9BQU8sQ0FBQ2lCLE1BQU0sR0FBRyxFQUFFLENBQUE7RUFDL0NnRixVQUFBQSxPQUFPLENBQUM5QixLQUFLLENBQUNJLFFBQVEsR0FBRyxPQUFPLENBQUE7RUFDaEMwQixVQUFBQSxPQUFPLENBQUM5QixLQUFLLENBQUMrQixHQUFHLEdBQUcsQ0FBQyxDQUFBO0VBQ3JCRCxVQUFBQSxPQUFPLENBQUM5QixLQUFLLENBQUNnQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO0VBQ3RCRixVQUFBQSxPQUFPLENBQUM5QixLQUFLLENBQUNpQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO0VBQ3ZCSCxVQUFBQSxPQUFPLENBQUM5QixLQUFLLENBQUNrQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBQ3hCLElBQUksQ0FBQ3JFLFFBQVEsQ0FBQzBELElBQUksQ0FBQ0MsV0FBVyxDQUFDTSxPQUFPLENBQUMsQ0FBQTtFQUMzQyxTQUFBO1VBRUFSLEtBQUssQ0FBQ2EsTUFBTSxFQUFFLENBQUE7RUFDbEIsT0FBQTtFQUlBLE1BQUEsSUFBSSxJQUFJLENBQUN0RyxPQUFPLENBQUNrQixXQUFXLEVBQUM7VUFDekJ1RSxLQUFLLENBQUNhLE1BQU0sRUFBRSxDQUFBO0VBQ2xCLE9BQUE7RUFFSixLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUFoRSxHQUFBLEVBQUEsT0FBQTtNQUFBQyxLQUFBLEVBR0QsU0FBQVksS0FBQUEsR0FBUTtRQUNKLElBQUlvRCxLQUFLLEdBQUcsSUFBSSxDQUFDdkUsUUFBUSxDQUFDMEIsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3RELElBQUlNLE1BQU0sR0FBRyxJQUFJLENBQUNoQyxRQUFRLENBQUMwQixhQUFhLENBQUMsWUFBWSxDQUFDLENBQUE7RUFFdEQsTUFBQSxJQUFJNkMsS0FBSyxFQUFFQSxLQUFLLENBQUNELE1BQU0sRUFBRSxDQUFBO0VBQ3pCLE1BQUEsSUFBSXRDLE1BQU0sRUFBRUEsTUFBTSxDQUFDc0MsTUFBTSxFQUFFLENBQUE7RUFFM0IsTUFBQSxJQUFJLENBQUN0RSxRQUFRLENBQUN3RSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLFVBQUNsRCxPQUFPLEVBQUs7VUFDL0RBLE9BQU8sQ0FBQytDLE1BQU0sRUFBRSxDQUFBO0VBQ3BCLE9BQUMsQ0FBQyxDQUFBO0VBRUYsTUFBQSxJQUFJLENBQUN0RSxRQUFRLENBQUN3RSxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDQyxPQUFPLENBQUMsVUFBQ2xELE9BQU8sRUFBSztFQUNuRUEsUUFBQUEsT0FBTyxDQUFDbUQsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0VBQzNDLE9BQUMsQ0FBQyxDQUFBO0VBQ04sS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBcEUsR0FBQSxFQUFBLGlCQUFBO01BQUFDLEtBQUEsRUFFRCxTQUFBb0UsZUFBQUEsR0FBaUI7UUFDYixPQUFPO1VBQ0hDLE1BQU0sRUFBRSxJQUFJLENBQUM3RSxNQUFNLENBQUM4RSxXQUFXLElBQUksSUFBSSxDQUFDOUUsTUFBTSxDQUFDOEUsV0FBVyxHQUFHLElBQUksQ0FBQzdFLFFBQVEsQ0FBQ1EsZUFBZSxDQUFDc0UsWUFBWSxDQUFDO0VBQ3hHOUYsUUFBQUEsS0FBSyxFQUFFLElBQUksQ0FBQ2UsTUFBTSxDQUFDZ0YsVUFBVSxJQUFJLElBQUksQ0FBQ2hGLE1BQU0sQ0FBQ2dGLFVBQVUsR0FBRyxJQUFJLENBQUMvRSxRQUFRLENBQUNRLGVBQWUsQ0FBQ3dFLFdBQVcsQ0FBQTtTQUN0RyxDQUFBO0VBQ0wsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBMUUsR0FBQSxFQUFBLFdBQUE7RUFBQUMsSUFBQUEsS0FBQSxFQUVELFNBQUEwRSxTQUFXQyxDQUFBQSxFQUFFLEVBQUc7UUFDWixJQUFJQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ1YsSUFBSUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtFQUNWLE1BQUEsSUFBSUMsSUFBSSxHQUFHSCxFQUFFLENBQUNJLHFCQUFxQixFQUFFLENBQUE7RUFFckMsTUFBQSxPQUFPSixFQUFFLElBQUksQ0FBQ0ssS0FBSyxDQUFFTCxFQUFFLENBQUNNLFVBQVUsQ0FBRSxJQUFJLENBQUNELEtBQUssQ0FBRUwsRUFBRSxDQUFDTyxTQUFTLENBQUUsRUFBRztFQUM3RE4sUUFBQUEsRUFBRSxJQUFJRCxFQUFFLENBQUNNLFVBQVUsR0FBR04sRUFBRSxDQUFDUSxVQUFVLENBQUE7RUFDbkNOLFFBQUFBLEVBQUUsSUFBSUYsRUFBRSxDQUFDTyxTQUFTLEdBQUdQLEVBQUUsQ0FBQ1MsU0FBUyxDQUFBO1VBQ2pDVCxFQUFFLEdBQUdBLEVBQUUsQ0FBQ1UsWUFBWSxDQUFBO0VBQ3hCLE9BQUE7RUFFQVIsTUFBQUEsRUFBRSxHQUFHUyxRQUFRLENBQUNSLElBQUksQ0FBQ1MsQ0FBQyxDQUFDLEdBQUdELFFBQVEsQ0FBQ1QsRUFBRSxDQUFDLEdBQUdDLElBQUksQ0FBQ1MsQ0FBQyxHQUFHVixFQUFFLENBQUE7RUFDbERELE1BQUFBLEVBQUUsR0FBR1UsUUFBUSxDQUFDUixJQUFJLENBQUNVLENBQUMsQ0FBQyxHQUFHRixRQUFRLENBQUNWLEVBQUUsQ0FBQyxHQUFHRSxJQUFJLENBQUNVLENBQUMsR0FBR1osRUFBRSxDQUFBO1FBRWxELE9BQU87RUFBRWpCLFFBQUFBLEdBQUcsRUFBR2tCLEVBQUU7RUFBR2pCLFFBQUFBLElBQUksRUFBRWdCLEVBQUFBO1NBQUksQ0FBQTtFQUNsQyxLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUE3RSxHQUFBLEVBQUEsZ0JBQUE7RUFBQUMsSUFBQUEsS0FBQSxFQUdELFNBQUF5RixjQUFlekUsQ0FBQUEsT0FBTyxFQUFFO0VBRXBCLE1BQUEsSUFBTVksS0FBSyxHQUFHcEMsTUFBTSxDQUFDa0csZ0JBQWdCLENBQUMxRSxPQUFPLENBQUMsQ0FBQTtRQUM5QyxJQUFNMkUsTUFBTSxHQUFHLElBQUlDLGlCQUFpQixDQUFDaEUsS0FBSyxDQUFDaUUsU0FBUyxDQUFDLENBQUE7UUFFckQsT0FBTztFQUNIQyxRQUFBQSxVQUFVLEVBQUdDLElBQUksQ0FBQ0MsR0FBRyxDQUFDaEYsT0FBTyxDQUFDaUYsV0FBVyxJQUFJTixNQUFNLENBQUNPLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUMvREMsUUFBQUEsVUFBVSxFQUFHSixJQUFJLENBQUNDLEdBQUcsQ0FBQ2hGLE9BQU8sQ0FBQ29GLFlBQVksSUFBSVQsTUFBTSxDQUFDVSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUE7U0FDbEUsQ0FBQTtFQUNMLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQXRHLEdBQUEsRUFBQSxnQkFBQTtFQUFBQyxJQUFBQSxLQUFBLEVBR0QsU0FBQXNHLGNBQWV0RixDQUFBQSxPQUFPLEVBQUM7RUFDbkIsTUFBQSxJQUFJNkUsU0FBUyxHQUFHckcsTUFBTSxDQUFDa0csZ0JBQWdCLENBQUMxRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUN1RixnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0VBQzVGLE1BQUEsSUFBSUMsT0FBTyxHQUFHWCxTQUFTLENBQUNZLEtBQUssQ0FBQyx5S0FBeUssQ0FBQyxDQUFBO0VBRXhNLE1BQUEsSUFBSWpCLENBQUMsRUFBRUQsQ0FBQyxFQUFFbUIsQ0FBQyxDQUFBO1FBQ1gsSUFBSSxDQUFDRixPQUFPLEVBQUU7VUFDVixPQUFPO0VBQUVHLFVBQUFBLENBQUMsRUFBRSxDQUFDO0VBQUVDLFVBQUFBLENBQUMsRUFBRSxDQUFDO0VBQUVDLFVBQUFBLENBQUMsRUFBRSxDQUFBO1dBQUcsQ0FBQTtFQUMvQixPQUFBO0VBQ0EsTUFBQSxJQUFJTCxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO1VBQUEsSUFBQU0sY0FBQSxHQUNSTixPQUFPLENBQUNPLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBQSxRQUFBLElBQUFDLGVBQUEsR0FBQUMsY0FBQSxDQUFBSCxjQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUE7RUFBOUJ0QixRQUFBQSxDQUFDLEdBQUF3QixlQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7RUFBRXpCLFFBQUFBLENBQUMsR0FBQXlCLGVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtFQUFFTixRQUFBQSxDQUFDLEdBQUFNLGVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtVQUNSLE9BQU87RUFBRUwsVUFBQUEsQ0FBQyxFQUFFbkIsQ0FBQztFQUFFb0IsVUFBQUEsQ0FBQyxFQUFFckIsQ0FBQztFQUFFc0IsVUFBQUEsQ0FBQyxFQUFFSCxDQUFBQTtXQUFHLENBQUE7RUFDL0IsT0FBQTtFQUVBRixNQUFBQSxPQUFPLENBQUNVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUFDLElBQUFDLGVBQUEsR0FDSlgsT0FBTyxDQUFDTyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUEsTUFBQSxJQUFBSyxlQUFBLEdBQUFILGNBQUEsQ0FBQUUsZUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBO0VBQTlCM0IsTUFBQUEsQ0FBQyxHQUFBNEIsZUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUU3QixNQUFBQSxDQUFDLEdBQUE2QixlQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7RUFBRVYsTUFBQUEsQ0FBQyxHQUFBVSxlQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7UUFDUixPQUFPO0VBQUVULFFBQUFBLENBQUMsRUFBRW5CLENBQUM7RUFBRW9CLFFBQUFBLENBQUMsRUFBRXJCLENBQUM7RUFBRXNCLFFBQUFBLENBQUMsRUFBRUgsQ0FBQUE7U0FBRyxDQUFBO0VBQy9CLEtBQUE7RUFBQyxHQUFBLEVBQUE7TUFBQTNHLEdBQUEsRUFBQSxvQkFBQTtFQUFBQyxJQUFBQSxLQUFBLEVBRUQsU0FBQXFILGtCQUFtQnJHLENBQUFBLE9BQU8sRUFBQztRQUN2QixPQUFPO0VBQ0gyQyxRQUFBQSxHQUFHLEVBQUcsSUFBSSxDQUFDZSxTQUFTLENBQUMxRCxPQUFPLENBQUMsQ0FBQzJDLEdBQUcsR0FBRyxJQUFJLENBQUMyQyxjQUFjLENBQUN0RixPQUFPLENBQUMsQ0FBQzRGLENBQUMsSUFBSzVGLE9BQU8sQ0FBQ1ksS0FBSyxDQUFDaUUsU0FBUyxHQUFHLElBQUksQ0FBQ0osY0FBYyxDQUFDekUsT0FBTyxDQUFDLENBQUNtRixVQUFVLEdBQUcsQ0FBQyxDQUFDO0VBQzdJdkMsUUFBQUEsSUFBSSxFQUFHLElBQUksQ0FBQ2MsU0FBUyxDQUFDMUQsT0FBTyxDQUFDLENBQUM0QyxJQUFJLEdBQUcsSUFBSSxDQUFDMEMsY0FBYyxDQUFDdEYsT0FBTyxDQUFDLENBQUMyRixDQUFDLElBQUszRixPQUFPLENBQUNZLEtBQUssQ0FBQ2lFLFNBQVMsR0FBRyxJQUFJLENBQUNKLGNBQWMsQ0FBQ3pFLE9BQU8sQ0FBQyxDQUFDOEUsVUFBVSxHQUFHLENBQUMsQ0FBQTtTQUNqSixDQUFBO0VBQ0wsS0FBQTtFQUFDLEdBQUEsRUFBQTtNQUFBL0YsR0FBQSxFQUFBLGlCQUFBO01BQUFDLEtBQUEsRUFHRCxTQUFBcUQsZUFBQUEsQ0FBZ0JyQyxPQUFPLEVBQUVRLE9BQU8sRUFBRTBCLEtBQUssRUFBRWhDLElBQUksRUFBRTtFQUMzQyxNQUFBLElBQUlpQixTQUFTLEdBQUdqQixJQUFJLENBQUNpQixTQUFTLElBQUksTUFBTSxDQUFBO0VBQ3hDLE1BQUEsSUFBSW1GLFFBQVEsR0FBR3BHLElBQUksQ0FBQ29HLFFBQVEsSUFBSSxVQUFVLENBQUE7RUFFMUM5RixNQUFBQSxPQUFPLENBQUNJLEtBQUssQ0FBQ0ksUUFBUSxHQUFHc0YsUUFBUSxDQUFBO0VBQ2pDcEUsTUFBQUEsS0FBSyxDQUFDdEIsS0FBSyxDQUFDSSxRQUFRLEdBQUcsVUFBVSxDQUFBO1FBR2pDLElBQUl1RixNQUFNLEVBQUVDLE9BQU8sQ0FBQTtRQUNuQkQsTUFBTSxHQUFHLElBQUksQ0FBQ0Ysa0JBQWtCLENBQUNyRyxPQUFPLENBQUMsQ0FBQzJDLEdBQUcsQ0FBQTtRQUM3QzZELE9BQU8sR0FBRyxJQUFJLENBQUNILGtCQUFrQixDQUFDckcsT0FBTyxDQUFDLENBQUM0QyxJQUFJLENBQUE7UUFHL0MsSUFBSXpCLFNBQVMsSUFBSSxNQUFNLElBQUlBLFNBQVMsSUFBSSxZQUFZLElBQUlBLFNBQVMsSUFBSSxVQUFVLEVBQUU7RUFDN0UsUUFBQSxJQUFNZSxNQUFLLEdBQUdmLFNBQVMsQ0FBQ3NGLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUNDLElBQUksRUFBRSxDQUFBO1VBQ2xELElBQUlDLFNBQVMsR0FBRyxFQUFFLENBQUE7VUFJbEIsSUFBSUosTUFBTSxJQUFJL0YsT0FBTyxDQUFDNEUsWUFBWSxHQUFHLElBQUksQ0FBQzNJLE9BQU8sQ0FBQ1UsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDcUIsTUFBTSxDQUFDOEUsV0FBVyxHQUFHLEdBQUcsRUFBRTtZQUd2RixJQUFJa0QsT0FBTyxHQUFJLElBQUksQ0FBQ2hJLE1BQU0sQ0FBQ2dGLFVBQVUsR0FBRyxDQUFFLEVBQUU7Y0FDeENtRCxTQUFTLEdBQUd6RSxNQUFLLENBQUN2RixNQUFNLEdBQUcsQ0FBQyxHQUFHdUYsTUFBSyxHQUFHLFFBQVEsQ0FBQTtFQUNuRCxXQUFDLE1BRUksSUFBSXNFLE9BQU8sR0FBSSxJQUFJLENBQUNoSSxNQUFNLENBQUNnRixVQUFVLEdBQUksSUFBSSxDQUFDaEYsTUFBTSxDQUFDZ0YsVUFBVSxHQUFHLENBQUcsRUFBRTtjQUN4RW1ELFNBQVMsR0FBR3pFLE1BQUssQ0FBQ3ZGLE1BQU0sR0FBRyxDQUFDLEdBQUd1RixNQUFLLEdBQUcsTUFBTSxDQUFBO0VBQ2pELFdBQUE7WUFDQWYsU0FBUyxHQUFHLEtBQUssR0FBR3dGLFNBQVMsQ0FBQTtFQUNqQyxTQUFBO0VBSUEsUUFBQSxJQUFLSCxPQUFPLEdBQUd4RyxPQUFPLENBQUNpRixXQUFXLEdBQUd6RSxPQUFPLENBQUN5RSxXQUFXLEdBQUksSUFBSSxDQUFDekcsTUFBTSxDQUFDZ0YsVUFBVSxFQUFFO1lBR2hGLElBQUkrQyxNQUFNLEdBQUksSUFBSSxDQUFDL0gsTUFBTSxDQUFDOEUsV0FBVyxHQUFHLENBQUUsRUFBRTtjQUN4Q3FELFNBQVMsR0FBR3pFLE1BQUssQ0FBQ3ZGLE1BQU0sR0FBRyxDQUFDLEdBQUd1RixNQUFLLEdBQUcsUUFBUSxDQUFBO0VBQ25ELFdBQUMsTUFFSSxJQUFJcUUsTUFBTSxHQUFJLElBQUksQ0FBQy9ILE1BQU0sQ0FBQzhFLFdBQVcsR0FBSSxJQUFJLENBQUM5RSxNQUFNLENBQUM4RSxXQUFXLEdBQUcsQ0FBRyxFQUFFO2NBQ3pFcUQsU0FBUyxHQUFHekUsTUFBSyxDQUFDdkYsTUFBTSxHQUFHLENBQUMsR0FBR3VGLE1BQUssR0FBRyxRQUFRLENBQUE7RUFDbkQsV0FBQTtZQUNBZixTQUFTLEdBQUcsTUFBTSxHQUFHd0YsU0FBUyxDQUFBO0VBQ2xDLFNBQUE7RUFJQSxRQUFBLElBQUlILE9BQU8sR0FBR2hHLE9BQU8sQ0FBQ3lFLFdBQVcsSUFBS2pGLE9BQU8sQ0FBQ2lGLFdBQVcsR0FBR3pFLE9BQU8sQ0FBQ3lFLFdBQVcsR0FBSSxJQUFJLENBQUN6RyxNQUFNLENBQUNnRixVQUFVLEVBQUU7WUFHdkcsSUFBSStDLE1BQU0sR0FBSSxJQUFJLENBQUMvSCxNQUFNLENBQUM4RSxXQUFXLEdBQUcsQ0FBRSxFQUFFO2NBQ3hDcUQsU0FBUyxHQUFHekUsTUFBSyxDQUFDdkYsTUFBTSxHQUFHLENBQUMsR0FBR3VGLE1BQUssR0FBRyxRQUFRLENBQUE7RUFDbkQsV0FBQyxNQUVJLElBQUlxRSxNQUFNLEdBQUksSUFBSSxDQUFDL0gsTUFBTSxDQUFDOEUsV0FBVyxHQUFJLElBQUksQ0FBQzlFLE1BQU0sQ0FBQzhFLFdBQVcsR0FBRyxDQUFHLEVBQUU7Y0FDekVxRCxTQUFTLEdBQUd6RSxNQUFLLENBQUN2RixNQUFNLEdBQUcsQ0FBQyxHQUFHdUYsTUFBSyxHQUFHLFFBQVEsQ0FBQTtFQUNuRCxXQUFBO1lBQ0FmLFNBQVMsR0FBRyxPQUFPLEdBQUd3RixTQUFTLENBQUE7RUFDbkMsU0FBQTtFQUlBLFFBQUEsSUFBSUosTUFBTSxHQUFJL0YsT0FBTyxDQUFDNEUsWUFBWSxHQUFHLElBQUksQ0FBQzNJLE9BQU8sQ0FBQ1UsTUFBTyxJQUFJb0osTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUd2RSxJQUFJQyxPQUFPLEdBQUksSUFBSSxDQUFDaEksTUFBTSxDQUFDZ0YsVUFBVSxHQUFHLENBQUUsRUFBRTtjQUN4Q21ELFNBQVMsR0FBR3pFLE1BQUssQ0FBQ3ZGLE1BQU0sR0FBRyxDQUFDLEdBQUd1RixNQUFLLEdBQUcsUUFBUSxDQUFBO0VBQ25ELFdBQUMsTUFFSSxJQUFJc0UsT0FBTyxHQUFJLElBQUksQ0FBQ2hJLE1BQU0sQ0FBQ2dGLFVBQVUsR0FBSSxJQUFJLENBQUNoRixNQUFNLENBQUNnRixVQUFVLEdBQUcsQ0FBRyxFQUFFO2NBQ3hFbUQsU0FBUyxHQUFHekUsTUFBSyxDQUFDdkYsTUFBTSxHQUFHLENBQUMsR0FBR3VGLE1BQUssR0FBRyxNQUFNLENBQUE7RUFDakQsV0FBQTtZQUNBZixTQUFTLEdBQUcsUUFBUSxHQUFHd0YsU0FBUyxDQUFBO0VBQ3BDLFNBQUE7RUFHQW5HLFFBQUFBLE9BQU8sQ0FBQ2xCLFNBQVMsQ0FBQ3FCLEdBQUcsQ0FBQ1EsU0FBUyxDQUFDLENBQUE7RUFDcEMsT0FBQTtRQUdBLElBQUlBLFNBQVMsSUFBSSxLQUFLLEVBQUU7RUFDcEJYLFFBQUFBLE9BQU8sQ0FBQ0ksS0FBSyxDQUFDK0IsR0FBRyxHQUFJNEQsTUFBTSxJQUFJL0YsT0FBTyxDQUFDNEUsWUFBWSxHQUFHLElBQUksQ0FBQzNJLE9BQU8sQ0FBQ1UsTUFBTSxDQUFDLEdBQUksSUFBSSxDQUFBO1VBQ2xGcUQsT0FBTyxDQUFDSSxLQUFLLENBQUNnQyxJQUFJLEdBQUk0RCxPQUFPLElBQUt4RyxPQUFPLENBQUNpRixXQUFXLEdBQUcsQ0FBQyxHQUFLekUsT0FBTyxDQUFDeUUsV0FBVyxHQUFHLENBQUUsQ0FBQyxHQUFJLElBQUksQ0FBQTtFQUNuRyxPQUFDLE1BQU0sSUFBSTlELFNBQVMsSUFBSSxXQUFXLEVBQUU7RUFDakNYLFFBQUFBLE9BQU8sQ0FBQ0ksS0FBSyxDQUFDK0IsR0FBRyxHQUFJNEQsTUFBTSxJQUFJL0YsT0FBTyxDQUFDNEUsWUFBWSxHQUFHLElBQUksQ0FBQzNJLE9BQU8sQ0FBQ1UsTUFBTSxDQUFDLEdBQUksSUFBSSxDQUFBO0VBQ2xGcUQsUUFBQUEsT0FBTyxDQUFDSSxLQUFLLENBQUNnQyxJQUFJLEdBQUc0RCxPQUFPLEdBQUcsSUFBSSxDQUFDL0osT0FBTyxDQUFDYyxlQUFlLEdBQUcsSUFBSSxDQUFBO0VBQ3RFLE9BQUMsTUFBTSxJQUFJNEQsU0FBUyxJQUFJLFNBQVMsRUFBRTtFQUMvQlgsUUFBQUEsT0FBTyxDQUFDSSxLQUFLLENBQUMrQixHQUFHLEdBQUk0RCxNQUFNLElBQUkvRixPQUFPLENBQUM0RSxZQUFZLEdBQUcsSUFBSSxDQUFDM0ksT0FBTyxDQUFDVSxNQUFNLENBQUMsR0FBSSxJQUFJLENBQUE7VUFDbEZxRCxPQUFPLENBQUNJLEtBQUssQ0FBQ2dDLElBQUksR0FBSzRELE9BQU8sR0FBR3hHLE9BQU8sQ0FBQ2lGLFdBQVcsR0FBRyxJQUFJLENBQUN4SSxPQUFPLENBQUNjLGVBQWUsR0FBSWlELE9BQU8sQ0FBQ3lFLFdBQVcsR0FBSSxJQUFJLENBQUE7RUFDdEgsT0FBQyxNQUdJLElBQUk5RCxTQUFTLElBQUksUUFBUSxFQUFFO0VBQzVCWCxRQUFBQSxPQUFPLENBQUNJLEtBQUssQ0FBQytCLEdBQUcsR0FBSTRELE1BQU0sR0FBR3ZHLE9BQU8sQ0FBQ29GLFlBQVksR0FBSSxJQUFJLENBQUMzSSxPQUFPLENBQUNVLE1BQU0sR0FBRyxJQUFJLENBQUE7RUFDaEZxRCxRQUFBQSxPQUFPLENBQUNJLEtBQUssQ0FBQ2dDLElBQUksR0FBSTRELE9BQU8sR0FBSXhHLE9BQU8sQ0FBQ2lGLFdBQVcsR0FBRyxDQUFFLEdBQUd6RSxPQUFPLENBQUN5RSxXQUFXLEdBQUcsQ0FBQyxHQUFJLElBQUksQ0FBQTtFQUMvRixPQUFDLE1BQU0sSUFBSTlELFNBQVMsSUFBSSxjQUFjLEVBQUU7RUFDcENYLFFBQUFBLE9BQU8sQ0FBQ0ksS0FBSyxDQUFDK0IsR0FBRyxHQUFJNEQsTUFBTSxHQUFHdkcsT0FBTyxDQUFDb0YsWUFBWSxHQUFJLElBQUksQ0FBQzNJLE9BQU8sQ0FBQ1UsTUFBTSxHQUFHLElBQUksQ0FBQTtFQUNoRnFELFFBQUFBLE9BQU8sQ0FBQ0ksS0FBSyxDQUFDZ0MsSUFBSSxHQUFJNEQsT0FBTyxHQUFHLElBQUksQ0FBQy9KLE9BQU8sQ0FBQ2MsZUFBZSxHQUFJLElBQUksQ0FBQTtFQUN4RSxPQUFDLE1BQU0sSUFBSTRELFNBQVMsSUFBSSxZQUFZLEVBQUU7RUFDbENYLFFBQUFBLE9BQU8sQ0FBQ0ksS0FBSyxDQUFDK0IsR0FBRyxHQUFJNEQsTUFBTSxHQUFHdkcsT0FBTyxDQUFDb0YsWUFBWSxHQUFJLElBQUksQ0FBQzNJLE9BQU8sQ0FBQ1UsTUFBTSxHQUFHLElBQUksQ0FBQTtVQUNoRnFELE9BQU8sQ0FBQ0ksS0FBSyxDQUFDZ0MsSUFBSSxHQUFLNEQsT0FBTyxHQUFHeEcsT0FBTyxDQUFDaUYsV0FBVyxHQUFHLElBQUksQ0FBQ3hJLE9BQU8sQ0FBQ2MsZUFBZSxHQUFJaUQsT0FBTyxDQUFDeUUsV0FBVyxHQUFJLElBQUksQ0FBQTtFQUN0SCxPQUFDLE1BR0ksSUFBSTlELFNBQVMsSUFBSSxPQUFPLEVBQUU7VUFDM0JYLE9BQU8sQ0FBQ0ksS0FBSyxDQUFDK0IsR0FBRyxHQUFJNEQsTUFBTSxHQUFJeEIsSUFBSSxDQUFDQyxHQUFHLENBQUN4RSxPQUFPLENBQUM0RSxZQUFZLEdBQUdwRixPQUFPLENBQUNvRixZQUFZLENBQUMsR0FBRyxDQUFFLEdBQUksSUFBSSxDQUFBO0VBQ2pHNUUsUUFBQUEsT0FBTyxDQUFDSSxLQUFLLENBQUNnQyxJQUFJLEdBQUk0RCxPQUFPLElBQUl4RyxPQUFPLENBQUNpRixXQUFXLEdBQUcsSUFBSSxDQUFDeEksT0FBTyxDQUFDVSxNQUFNLENBQUMsR0FBSSxJQUFJLENBQUE7RUFDdkYsT0FBQyxNQUFNLElBQUlnRSxTQUFTLElBQUksYUFBYSxFQUFFO0VBQ25DWCxRQUFBQSxPQUFPLENBQUNJLEtBQUssQ0FBQytCLEdBQUcsR0FBRzRELE1BQU0sR0FBRyxJQUFJLENBQUM5SixPQUFPLENBQUNjLGVBQWUsR0FBRyxJQUFJLENBQUE7RUFDaEVpRCxRQUFBQSxPQUFPLENBQUNJLEtBQUssQ0FBQ2dDLElBQUksR0FBSTRELE9BQU8sSUFBSXhHLE9BQU8sQ0FBQ2lGLFdBQVcsR0FBRyxJQUFJLENBQUN4SSxPQUFPLENBQUNVLE1BQU0sQ0FBQyxHQUFJLElBQUksQ0FBQTtFQUN2RixPQUFDLE1BQU0sSUFBSWdFLFNBQVMsSUFBSSxXQUFXLEVBQUU7VUFDakNYLE9BQU8sQ0FBQ0ksS0FBSyxDQUFDK0IsR0FBRyxHQUFLNEQsTUFBTSxHQUFHdkcsT0FBTyxDQUFDb0YsWUFBWSxHQUFJNUUsT0FBTyxDQUFDNEUsWUFBWSxHQUFJLElBQUksQ0FBQzNJLE9BQU8sQ0FBQ2MsZUFBZSxHQUFHLElBQUksQ0FBQTtFQUNsSGlELFFBQUFBLE9BQU8sQ0FBQ0ksS0FBSyxDQUFDZ0MsSUFBSSxHQUFJNEQsT0FBTyxJQUFJeEcsT0FBTyxDQUFDaUYsV0FBVyxHQUFHLElBQUksQ0FBQ3hJLE9BQU8sQ0FBQ1UsTUFBTSxDQUFDLEdBQUksSUFBSSxDQUFBO0VBQ3ZGLE9BQUMsTUFHSSxJQUFJZ0UsU0FBUyxJQUFJLE1BQU0sRUFBRTtVQUMxQlgsT0FBTyxDQUFDSSxLQUFLLENBQUMrQixHQUFHLEdBQUk0RCxNQUFNLEdBQUl4QixJQUFJLENBQUNDLEdBQUcsQ0FBQ3hFLE9BQU8sQ0FBQzRFLFlBQVksR0FBR3BGLE9BQU8sQ0FBQ29GLFlBQVksQ0FBQyxHQUFHLENBQUUsR0FBSSxJQUFJLENBQUE7RUFDakc1RSxRQUFBQSxPQUFPLENBQUNJLEtBQUssQ0FBQ2dDLElBQUksR0FBSTRELE9BQU8sSUFBSWhHLE9BQU8sQ0FBQ3lFLFdBQVcsR0FBRyxJQUFJLENBQUN4SSxPQUFPLENBQUNVLE1BQU0sQ0FBQyxHQUFJLElBQUksQ0FBQTtFQUN2RixPQUFDLE1BQU0sSUFBSWdFLFNBQVMsSUFBSSxZQUFZLEVBQUU7RUFDbENYLFFBQUFBLE9BQU8sQ0FBQ0ksS0FBSyxDQUFDK0IsR0FBRyxHQUFHNEQsTUFBTSxHQUFHLElBQUksQ0FBQzlKLE9BQU8sQ0FBQ2MsZUFBZSxHQUFHLElBQUksQ0FBQTtFQUNoRWlELFFBQUFBLE9BQU8sQ0FBQ0ksS0FBSyxDQUFDZ0MsSUFBSSxHQUFJNEQsT0FBTyxJQUFJaEcsT0FBTyxDQUFDeUUsV0FBVyxHQUFHLElBQUksQ0FBQ3hJLE9BQU8sQ0FBQ1UsTUFBTSxDQUFDLEdBQUksSUFBSSxDQUFBO0VBQ3ZGLE9BQUMsTUFBTSxJQUFJZ0UsU0FBUyxJQUFJLFVBQVUsRUFBRTtVQUNoQ1gsT0FBTyxDQUFDSSxLQUFLLENBQUMrQixHQUFHLEdBQUs0RCxNQUFNLEdBQUd2RyxPQUFPLENBQUNvRixZQUFZLEdBQUk1RSxPQUFPLENBQUM0RSxZQUFZLEdBQUksSUFBSSxDQUFDM0ksT0FBTyxDQUFDYyxlQUFlLEdBQUcsSUFBSSxDQUFBO0VBQ2xIaUQsUUFBQUEsT0FBTyxDQUFDSSxLQUFLLENBQUNnQyxJQUFJLEdBQUk0RCxPQUFPLElBQUloRyxPQUFPLENBQUN5RSxXQUFXLEdBQUcsSUFBSSxDQUFDeEksT0FBTyxDQUFDVSxNQUFNLENBQUMsR0FBSSxJQUFJLENBQUE7RUFDdkYsT0FBQTtFQUVBLE1BQUEsSUFBSSxJQUFJLENBQUNWLE9BQU8sQ0FBQ21CLFVBQVUsRUFBRTtVQUV6QixJQUFJMEksUUFBUSxLQUFLLE9BQU8sRUFBQztZQUNyQixJQUFJLENBQUM5SCxNQUFNLENBQUNvSSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQzlCLFNBQUMsTUFBSTtZQUNEcEcsT0FBTyxDQUFDOEIsY0FBYyxDQUFDO0VBQUNDLFlBQUFBLFFBQVEsRUFBRSxRQUFRO0VBQUVDLFlBQUFBLEtBQUssRUFBRSxRQUFRO0VBQUVDLFlBQUFBLE1BQU0sRUFBRSxTQUFBO0VBQVMsV0FBQyxDQUFDLENBQUE7RUFDcEYsU0FBQTtFQUNKLE9BQUE7RUFDSixLQUFBO0VBQUMsR0FBQSxFQUFBO01BQUExRCxHQUFBLEVBQUEsZUFBQTtFQUFBQyxJQUFBQSxLQUFBLEVBRUQsU0FBQW9CLGFBQWNKLENBQUFBLE9BQU8sRUFBYztFQUFBLE1BQUEsSUFBWkUsSUFBSSxHQUFBeEQsU0FBQSxDQUFBQyxNQUFBLEdBQUEsQ0FBQSxJQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUFFLFNBQUEsR0FBQUYsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFHLElBQUksQ0FBQTtFQUM5QixNQUFBLElBQUk0SixRQUFRLEdBQUlwRyxJQUFJLElBQUlBLElBQUksQ0FBQ29HLFFBQVEsR0FBSXBHLElBQUksQ0FBQ29HLFFBQVEsR0FBRyxVQUFVLENBQUE7RUFFbkUsTUFBQSxJQUFJTyxRQUFRLEdBQUdwSSxRQUFRLENBQUNpQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUNtRyxRQUFRLENBQUN2SCxTQUFTLENBQUNxQixHQUFHLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUN4RGtHLFFBQVEsQ0FBQ2pHLEtBQUssQ0FBQ2xELE1BQU0sR0FBRyxJQUFJLENBQUNqQixPQUFPLENBQUNpQixNQUFNLEdBQUcsRUFBRSxDQUFBO0VBRWhELE1BQUEsSUFBSW9KLFFBQVEsR0FBR3JJLFFBQVEsQ0FBQ2lDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM1Q29HLFFBQVEsQ0FBQ3hILFNBQVMsQ0FBQ3FCLEdBQUcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQ3hEbUcsUUFBUSxDQUFDbEcsS0FBSyxDQUFDbEQsTUFBTSxHQUFHLElBQUksQ0FBQ2pCLE9BQU8sQ0FBQ2lCLE1BQU0sR0FBRyxFQUFFLENBQUE7RUFFaEQsTUFBQSxJQUFJcUosUUFBUSxHQUFHdEksUUFBUSxDQUFDaUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzVDcUcsUUFBUSxDQUFDekgsU0FBUyxDQUFDcUIsR0FBRyxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDeERvRyxRQUFRLENBQUNuRyxLQUFLLENBQUNsRCxNQUFNLEdBQUcsSUFBSSxDQUFDakIsT0FBTyxDQUFDaUIsTUFBTSxHQUFHLEVBQUUsQ0FBQTtFQUVoRCxNQUFBLElBQUlzSixRQUFRLEdBQUd2SSxRQUFRLENBQUNpQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUNzRyxRQUFRLENBQUMxSCxTQUFTLENBQUNxQixHQUFHLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUN4RHFHLFFBQVEsQ0FBQ3BHLEtBQUssQ0FBQ2xELE1BQU0sR0FBRyxJQUFJLENBQUNqQixPQUFPLENBQUNpQixNQUFNLEdBQUcsRUFBRSxDQUFBO1FBR2hELElBQUksQ0FBQ2UsUUFBUSxDQUFDMEQsSUFBSSxDQUFDQyxXQUFXLENBQUN5RSxRQUFRLENBQUMsQ0FBQTtRQUN4QyxJQUFJLENBQUNwSSxRQUFRLENBQUMwRCxJQUFJLENBQUNDLFdBQVcsQ0FBQzBFLFFBQVEsQ0FBQyxDQUFBO1FBQ3hDLElBQUksQ0FBQ3JJLFFBQVEsQ0FBQzBELElBQUksQ0FBQ0MsV0FBVyxDQUFDMkUsUUFBUSxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDdEksUUFBUSxDQUFDMEQsSUFBSSxDQUFDQyxXQUFXLENBQUM0RSxRQUFRLENBQUMsQ0FBQTtRQUd4QyxJQUFJVCxNQUFNLEVBQUVDLE9BQU8sQ0FBQTtRQUNuQkQsTUFBTSxHQUFHLElBQUksQ0FBQ0Ysa0JBQWtCLENBQUNyRyxPQUFPLENBQUMsQ0FBQzJDLEdBQUcsQ0FBQTtRQUM3QzZELE9BQU8sR0FBRyxJQUFJLENBQUNILGtCQUFrQixDQUFDckcsT0FBTyxDQUFDLENBQUM0QyxJQUFJLENBQUE7RUFFL0MsTUFBQSxJQUFJcUUsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDeEssT0FBTyxDQUFDYyxlQUFlLENBQUE7RUFHbkRzSixNQUFBQSxRQUFRLENBQUNqRyxLQUFLLENBQUNJLFFBQVEsR0FBR3NGLFFBQVEsQ0FBQTtFQUNsQ08sTUFBQUEsUUFBUSxDQUFDakcsS0FBSyxDQUFDK0IsR0FBRyxHQUFHLENBQUMsQ0FBQTtRQUN0QmtFLFFBQVEsQ0FBQ2pHLEtBQUssQ0FBQ25ELEtBQUssR0FBSStJLE9BQU8sR0FBR1MsZ0JBQWdCLEdBQUcsSUFBSSxDQUFBO0VBQ3pESixNQUFBQSxRQUFRLENBQUNqRyxLQUFLLENBQUN5QyxNQUFNLEdBQUtrRCxNQUFNLEdBQUd2RyxPQUFPLENBQUNvRixZQUFZLEdBQUc2QixnQkFBZ0IsR0FBSSxJQUFJLENBQUE7RUFDbEZKLE1BQUFBLFFBQVEsQ0FBQ2pHLEtBQUssQ0FBQ2dDLElBQUksR0FBRyxDQUFDLENBQUE7RUFHdkJrRSxNQUFBQSxRQUFRLENBQUNsRyxLQUFLLENBQUNJLFFBQVEsR0FBR3NGLFFBQVEsQ0FBQTtFQUNsQ1EsTUFBQUEsUUFBUSxDQUFDbEcsS0FBSyxDQUFDK0IsR0FBRyxHQUFHLENBQUMsQ0FBQTtFQUN0Qm1FLE1BQUFBLFFBQVEsQ0FBQ2xHLEtBQUssQ0FBQ2lDLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDeEJpRSxRQUFRLENBQUNsRyxLQUFLLENBQUN5QyxNQUFNLEdBQUlrRCxNQUFNLEdBQUdVLGdCQUFnQixHQUFJLElBQUksQ0FBQTtRQUMxREgsUUFBUSxDQUFDbEcsS0FBSyxDQUFDZ0MsSUFBSSxHQUFJNEQsT0FBTyxHQUFHUyxnQkFBZ0IsR0FBSSxJQUFJLENBQUE7RUFHekRGLE1BQUFBLFFBQVEsQ0FBQ25HLEtBQUssQ0FBQ0ksUUFBUSxHQUFHc0YsUUFBUSxDQUFBO1FBQ2xDUyxRQUFRLENBQUNuRyxLQUFLLENBQUMrQixHQUFHLEdBQUk0RCxNQUFNLEdBQUdVLGdCQUFnQixHQUFJLElBQUksQ0FBQTtFQUN2REYsTUFBQUEsUUFBUSxDQUFDbkcsS0FBSyxDQUFDaUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUN4QmtFLFFBQVEsQ0FBQ25HLEtBQUssQ0FBQ2tDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDckUsUUFBUSxDQUFDMEQsSUFBSSxDQUFDaUQsWUFBWSxHQUFHLElBQUksQ0FBQzVHLE1BQU0sQ0FBQzhFLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQTtFQUM5RnlELE1BQUFBLFFBQVEsQ0FBQ25HLEtBQUssQ0FBQ2dDLElBQUksR0FBSTRELE9BQU8sR0FBR3hHLE9BQU8sQ0FBQ2lGLFdBQVcsR0FBR2dDLGdCQUFnQixHQUFJLElBQUksQ0FBQTtFQUcvRUQsTUFBQUEsUUFBUSxDQUFDcEcsS0FBSyxDQUFDSSxRQUFRLEdBQUdzRixRQUFRLENBQUE7RUFDbENVLE1BQUFBLFFBQVEsQ0FBQ3BHLEtBQUssQ0FBQytCLEdBQUcsR0FBSTRELE1BQU0sR0FBR3ZHLE9BQU8sQ0FBQ29GLFlBQVksR0FBRzZCLGdCQUFnQixHQUFJLElBQUksQ0FBQTtFQUM5RUQsTUFBQUEsUUFBUSxDQUFDcEcsS0FBSyxDQUFDbkQsS0FBSyxHQUFLK0ksT0FBTyxHQUFHeEcsT0FBTyxDQUFDaUYsV0FBVyxHQUFHZ0MsZ0JBQWdCLEdBQUksSUFBSSxDQUFBO1FBQ2pGRCxRQUFRLENBQUNwRyxLQUFLLENBQUNrQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQ3JFLFFBQVEsQ0FBQzBELElBQUksQ0FBQ2lELFlBQVksR0FBRyxJQUFJLENBQUM1RyxNQUFNLENBQUM4RSxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUE7RUFDOUYwRCxNQUFBQSxRQUFRLENBQUNwRyxLQUFLLENBQUNnQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO0VBQzNCLEtBQUE7RUFBQyxHQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUEsRUFBQSxPQUFBcEcsT0FBQSxDQUFBO0VBQUEsQ0FBQTs7Ozs7Ozs7In0=
