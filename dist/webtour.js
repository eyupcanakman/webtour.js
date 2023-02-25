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
          popover.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
          });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VidG91ci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlRvdXIgeyAgICBcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKCEhdGhpcy5jb25zdHJ1Y3Rvci5pbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuaW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmluc3RhbmNlID0gdGhpcztcblxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICBhbmltYXRlOiB0cnVlLFxuICAgICAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICAgICAgb2Zmc2V0OiAyMCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogMyxcbiAgICAgICAgICAgIGFsbG93Q2xvc2U6IHRydWUsXG4gICAgICAgICAgICBoaWdobGlnaHQ6IHRydWUsXG4gICAgICAgICAgICBoaWdobGlnaHRPZmZzZXQ6IDUsXG4gICAgICAgICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiAnMzAwcHgnLFxuICAgICAgICAgICAgekluZGV4OiAxMDA1MCxcbiAgICAgICAgICAgIHJlbW92ZUFycm93OiBmYWxzZSxcbiAgICAgICAgICAgIG9uTmV4dDogKCkgPT4gbnVsbCxcbiAgICAgICAgICAgIG9uUHJldmlvdXM6ICgpID0+IG51bGwsXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYWJlbHMgPSB7XG4gICAgICAgICAgICBuZXh0OiAnTmV4dCAmIzg1OTQ7JyxcbiAgICAgICAgICAgIHByZXY6ICcmIzg1OTI7IEJhY2snLFxuICAgICAgICAgICAgZG9uZTogJ0RvbmUnLFxuICAgICAgICAgICAgY2xvc2U6ICdDbG9zZScsXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0ZXBzID0gW107XG4gICAgICAgIHRoaXMuc3RlcEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vZWxlbWVudHNcbiAgICAgICAgdGhpcy53aW5kb3cgPSB3aW5kb3c7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcblxuICAgICAgICAvL2V2ZW50c1xuICAgICAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSA9IHRoaXMub25SZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbktleVVwID0gdGhpcy5vbktleVVwLmJpbmQodGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJpbmQoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGJpbmQoKSB7XG4gICAgICAgIGlmICghKCdvbnRvdWNoc3RhcnQnIGluIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2ssIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uQ2xpY2ssIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLm9uS2V5VXAsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnd3QtYnRuLW5leHQnKSkge1xuICAgICAgICAgICAgdGhpcy5vbk5leHQoKTtcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnd3QtYnRuLWJhY2snKSkge1xuICAgICAgICAgICAgdGhpcy5vblByZXZpb3VzKCk7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd3dC1vdmVybGF5JykpIHtcbiAgICAgICAgICAgIC8vaWYgYWxsb3dDbG9zZSA9IHRydWUgY2xvc2Ugd2hlbiBiYWNrZHJvcCBpcyBjbGlja1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd0Nsb3NlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleVVwKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcgfHwgIXRoaXMub3B0aW9ucy5rZXlib2FyZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3ICYmIHRoaXMub3B0aW9ucy5hbGxvd0Nsb3NlKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcmlnaHQga2V5IGZvciBuZXh0XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOSkge1xuICAgICAgICAgICAgdGhpcy5vbk5leHQoKTtcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgICAgICAgICAvL2xlZnQga2V5IGZvciBiYWNrXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3ICkge1xuICAgICAgICAgICAgdGhpcy5vblByZXZpb3VzKCk7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL3BhZ2UgaXMgcmVzaXplIHVwZGF0ZSBwb3BvdmVyXG4gICAgb25SZXNpemUoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0pO1xuICAgIH1cblxuICAgIC8vc2V0IHdlYiB0b3VyIHN0ZXBzXG4gICAgc2V0U3RlcHMoc3RlcHMpIHtcbiAgICAgICAgdGhpcy5zdGVwcyA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RlcHMgPSBzdGVwcztcbiAgICB9XG5cblxuICAgIGdldFN0ZXBzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGVwcztcbiAgICB9XG5cbiAgICBoaWdobGlnaHQoZWxlbWVudCwgc3RlcCA9IG51bGwpe1xuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xuICAgICAgICBpZiAoZWxlbWVudCl7XG4gICAgICAgICAgICBpZiAoc3RlcCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RlcHMgPSBzdGVwO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlT3ZlcmxheShlbGVtZW50LCBzdGVwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxuXG4gICAgLy9zdGFydCB0aGUgd2ViIHRvdXJcbiAgICBzdGFydChzdGFydEluZGV4ID0gMCkge1xuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RlcEluZGV4ID0gc3RhcnRJbmRleDtcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0pO1xuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvL3Nob3cgbG9hZGVyIHByb2dyZXNzXG4gICAgc2hvd0xvYWRlcigpIHtcbiAgICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnd0LXBvcG92ZXInKTtcbiAgICAgICAgY29uc3QgbG9hZGVyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbG9hZGVyLmNsYXNzTGlzdC5hZGQoJ3d0LWxvYWRlcicpO1xuICAgICAgICBsb2FkZXIuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCArIDEwO1xuICAgICAgICBwb3BvdmVyLnByZXBlbmQobG9hZGVyKTtcbiAgICB9XG5cbiAgICBtb3ZlTmV4dCgpIHtcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICB9XG5cbiAgICBtb3ZlUHJldmlvdXMoKSB7XG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgIH1cblxuICAgIG9uTmV4dCgpe1xuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xuICAgICAgICAvL2V4ZWN1dGUgb25OZXh0IGZ1bmN0aW9uKClcbiAgICAgICAgaWYgKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdICYmIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uTmV4dCkgdGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0ub25OZXh0KCk7XG4gICAgfVxuXG4gICAgb25QcmV2aW91cygpe1xuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xuICAgICAgICAvL2V4ZWN1dGUgb25CYWNrIGZ1bmN0aW9uKClcbiAgICAgICAgaWYgKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdICYmIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uUHJldmlvdXMpIHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdLm9uUHJldmlvdXMoKTtcbiAgICB9XG5cbiAgICAvKipnbyB0byBuZXh0IHN0ZXAgKi9cbiAgICBuZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuc3RlcEluZGV4Kys7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcblxuICAgICAgICBpZiAodGhpcy5zdGVwcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5zdGVwSW5kZXggPj0gdGhpcy5zdGVwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zdGVwc1t0aGlzLnN0ZXBJbmRleF0pO1xuICAgIH1cblxuICAgIHByZXZpb3VzKCkge1xuICAgICAgICBpZiAodGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuc3RlcEluZGV4LS07XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcblxuICAgICAgICBpZiAodGhpcy5zdGVwcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5zdGVwSW5kZXggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc3RlcHNbdGhpcy5zdGVwSW5kZXhdKTtcbiAgICB9XG5cbiAgICAvL2FkZCB0aGUgcG9wb3ZlciB0byBkb2N1bWVudFxuICAgIHJlbmRlcihzdGVwKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gc3RlcC5lbGVtZW50ID8gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0ZXAuZWxlbWVudCkgOiBudWxsO1xuXG4gICAgICAgIC8vY2hlY2sgaWYgZWxlbWVudCBpcyBwcmVzZW50IGlmIG5vdCBtYWtlIGl0IGZsb2F0aW5nXG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gIWVsZW1lbnQuc3R5bGUucG9zaXRpb24gPyAncmVsYXRpdmUnIDogZWxlbWVudC5zdHlsZS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IHN0ZXBfaGlnaGxpZ2h0ID0gIXN0ZXAuaGlnaGxpZ2h0ID8gdHJ1ZSA6IHN0ZXAuaGlnaGxpZ2h0OyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vaGlnaGxpZ2h0IGlzIHNldCB0byB0cnVlXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhpZ2hsaWdodCAmJiBzdGVwX2hpZ2hsaWdodCApIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnd3QtaGlnaGxpZ2h0JywgJ3RydWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vcG9wb3ZlclxuICAgICAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgICAgICAgIFxuICAgICAgICBwb3BvdmVyLmNsYXNzTGlzdC5hZGQoJ3d0LXBvcG92ZXInKTtcbiAgICAgICAgcG9wb3Zlci5zdHlsZS5ib3JkZXJSYWRpdXMgPSB0aGlzLm9wdGlvbnMuYm9yZGVyUmFkaXVzICsgJ3B4JztcbiAgICAgICAgcG9wb3Zlci5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4ICsgMTA7XG4gICAgICAgIGlmIChzdGVwLnBsYWNlbWVudCkgcG9wb3Zlci5jbGFzc0xpc3QuYWRkKHN0ZXAucGxhY2VtZW50KTsgLy9hZGQgdXNlciBkZWZpbmUgcGxhY2VtZW50IHRvIGNsYXNzIGZvciBwb3NpdGlvbiBpbiBjc3NcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLndpZHRoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy53aWR0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gdGhpcy5vcHRpb25zLndpZHRoO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMud2lkdGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS53aWR0aCA9IHRoaXMub3B0aW9ucy53aWR0aCArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RlcC53aWR0aCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGVwLndpZHRoID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUud2lkdGggPSBzdGVwLndpZHRoO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLndpZHRoID4gMCkge1xuICAgICAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUud2lkdGggPSBzdGVwLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vcG9wb3ZlciBpbm5lciBjb250YWluZXJcbiAgICAgICAgY29uc3QgcG9wb3ZlcklubmVyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcG9wb3ZlcklubmVyLmNsYXNzTGlzdC5hZGQoJ3d0LXBvcG92ZXItaW5uZXInKTtcbiAgICAgICBcbiAgICAgICAgLy90aXRsZVxuICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3d0LXRpdGxlJyk7XG4gICAgICAgIGlmIChzdGVwLnRpdGxlKSBwb3BvdmVySW5uZXIuYXBwZW5kKHRpdGxlKTtcbiAgICAgICAgaWYgKHN0ZXAudGl0bGUpIHRpdGxlLmlubmVyVGV4dCA9IHN0ZXAudGl0bGU7XG5cbiAgICAgICAgLy9jb250ZW50XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ3d0LWNvbnRlbnQnKTtcbiAgICAgICAgcG9wb3ZlcklubmVyLmFwcGVuZChjb250ZW50KTtcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAoc3RlcC5jb250ZW50ID8gc3RlcC5jb250ZW50IDogJycpO1xuICAgICAgICBcbiAgICAgICAgLy9idXR0b25zXG4gICAgICAgIGNvbnN0IHNob3dCdG5zID0gKHN0ZXAuc2hvd0J0bnMgPT0gbnVsbCB8fCBzdGVwLnNob3dCdG5zID09ICd1bmRlZmluZWQnKSA/IHRydWUgOiBCb29sZWFuKHN0ZXAuc2hvd0J0bnMpO1xuXG4gICAgICAgIGlmIChzaG93QnRucyl7XG4gICAgICAgICAgICBjb25zdCBidG5OZXh0ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGNvbnN0IGJ0bkJhY2sgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgICAgICAgICBidG5OZXh0LmNsYXNzTGlzdC5hZGQoJ3d0LWJ0bnMnLCAnd3QtYnRuLW5leHQnKTtcbiAgICAgICAgICAgIGJ0bkJhY2suY2xhc3NMaXN0LmFkZCgnd3QtYnRucycsICd3dC1idG4tYmFjaycpO1xuXG4gICAgICAgICAgICBidG5OZXh0LmlubmVySFRNTCA9IChzdGVwLmJ0bk5leHQgJiYgc3RlcC5idG5OZXh0LnRleHQgPyBzdGVwLmJ0bk5leHQudGV4dCA6ICh0aGlzLnN0ZXBJbmRleCA9PSB0aGlzLnN0ZXBzLmxlbmd0aCAtIDEgPyB0aGlzLmxhYmVscy5kb25lIDogdGhpcy5sYWJlbHMubmV4dCkpO1xuICAgICAgICAgICAgYnRuQmFjay5pbm5lckhUTUwgPSAoc3RlcC5idG5CYWNrICYmIHN0ZXAuYnRuQmFjay50ZXh0ID8gc3RlcC5idG5CYWNrLnRleHQgOiAodGhpcy5zdGVwSW5kZXggPT0gMCA/IHRoaXMubGFiZWxzLmNsb3NlIDogdGhpcy5sYWJlbHMucHJldikpO1xuXG4gICAgICAgICAgICAvL2FkZCBzdHlsZXNcbiAgICAgICAgICAgIGJ0bk5leHQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gKHN0ZXAuYnRuTmV4dCAmJiBzdGVwLmJ0bk5leHQuYmFja2dyb3VuZENvbG9yID8gc3RlcC5idG5OZXh0LmJhY2tncm91bmRDb2xvciA6ICcjN2NkMWY5Jyk7XG4gICAgICAgICAgICBidG5OZXh0LnN0eWxlLmNvbG9yID0gKHN0ZXAuYnRuTmV4dCAmJiBzdGVwLmJ0bk5leHQudGV4dENvbG9yID8gc3RlcC5idG5OZXh0LnRleHRDb2xvciA6ICcjZmZmJyk7XG5cbiAgICAgICAgICAgIGJ0bkJhY2suc3R5bGUuYmFja2dyb3VuZENvbG9yID0gKHN0ZXAuYnRuQmFjayAmJiBzdGVwLmJ0bkJhY2suYmFja2dyb3VuZENvbG9yID8gc3RlcC5idG5CYWNrLmJhY2tncm91bmRDb2xvciA6ICcjZWZlZmVmOycpO1xuICAgICAgICAgICAgYnRuQmFjay5zdHlsZS5jb2xvciA9IChzdGVwLmJ0bkJhY2sgJiYgc3RlcC5idG5CYWNrLnRleHRDb2xvciA/IHN0ZXAuYnRuQmFjay50ZXh0Q29sb3IgOiAnIzU1NScpO1xuICAgICAgICAgICAgcG9wb3ZlcklubmVyLmFwcGVuZChidG5OZXh0KTtcbiAgICAgICAgICAgIHBvcG92ZXJJbm5lci5hcHBlbmQoYnRuQmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3BvcG92ZXIgYXJyb3dcbiAgICAgICAgY29uc3QgYXJyb3cgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcnJvdy5jbGFzc0xpc3QuYWRkKCd3dC1hcnJvdycpO1xuICAgICAgICBhcnJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wcGVyLWFycm93JywgJ3RydWUnKTtcbiAgICAgICAgcG9wb3Zlci5hcHBlbmQoYXJyb3cpO1xuXG4gICAgICAgIC8vcG9wb3ZlciBpbm5lciBjb250YWluZXJcbiAgICAgICAgcG9wb3Zlci5hcHBlbmQocG9wb3ZlcklubmVyKTtcblxuICAgICAgICAvL2FwcGVuZCBwb3BvdmVyIHRvIGJvZHlcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcG92ZXIpO1xuXG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uUG9wb3ZlcihlbGVtZW50LCBwb3BvdmVyLCBhcnJvdywgc3RlcCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhpZ2hsaWdodCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVPdmVybGF5KGVsZW1lbnQsIHN0ZXApO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAqIE5vIGVsZW1lbnQgaXMgZGVmaW5lXG4gICAgICAgICogTWFrZSBwb3BvdmVyIGZsb2F0aW5nIChwb3NpdGlvbiBjZW50ZXIpXG4gICAgICAgICovXG4gICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHBvcG92ZXIuY2xhc3NMaXN0LmFkZCgnd3Qtc2xpZGVzJyk7XG4gICAgICAgICAgICBwb3BvdmVyLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwiY2VudGVyXCIsIGlubGluZTogXCJjZW50ZXJcIn0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhpZ2hsaWdodCl7XG4gICAgICAgICAgICAgICAgdmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicpO1xuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRpb25zLnpJbmRleCAtIDEwO1xuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUudG9wID0gMDtcbiAgICAgICAgICAgICAgICBvdmVybGF5LnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUucmlnaHQgPSAwO1xuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuYm90dG9tID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBhcnJvdy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vYWRkIG9wdGlvbiB0byByZW1vdmUgYXJyb3cgYmVjYXVzZSBwb3BwZXIgYXJyb3dzIGFyZSBub3QgcG9zaXRpb25pbmcgd2VsbFxuICAgICAgICAvL1RPRE86IGZpeCBwb3BwZXIgYXJyb3dcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVBcnJvdyl7XG4gICAgICAgICAgICBhcnJvdy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy9yZW1vdmUgcG9wb3ZlclxuICAgIGNsZWFyKCkge1xuICAgICAgICB2YXIgcG9wdXAgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53dC1wb3BvdmVyJyk7XG4gICAgICAgIHZhciBsb2FkZXIgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53dC1sb2FkZXInKTtcblxuICAgICAgICBpZiAocG9wdXApIHBvcHVwLnJlbW92ZSgpO1xuICAgICAgICBpZiAobG9hZGVyKSBsb2FkZXIucmVtb3ZlKCk7XG5cbiAgICAgICAgdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3Qtb3ZlcmxheScpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqW3d0LWhpZ2hsaWdodF0nKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnd3QtaGlnaGxpZ2h0Jyk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0V2luZG93T2Zmc2V0KCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gKHRoaXMud2luZG93LmlubmVySGVpZ2h0IC0gdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gKHRoaXMud2luZG93LmlubmVyV2lkdGggLSB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRPZmZzZXQoIGVsICkge1xuICAgICAgICB2YXIgX3ggPSAwO1xuICAgICAgICB2YXIgX3kgPSAwO1xuICAgICAgICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHdoaWxlKCBlbCAmJiAhaXNOYU4oIGVsLm9mZnNldExlZnQgKSAmJiAhaXNOYU4oIGVsLm9mZnNldFRvcCApICkge1xuICAgICAgICAgICAgX3ggKz0gZWwub2Zmc2V0TGVmdCAtIGVsLnNjcm9sbExlZnQ7XG4gICAgICAgICAgICBfeSArPSBlbC5vZmZzZXRUb3AgLSBlbC5zY3JvbGxUb3A7XG4gICAgICAgICAgICBlbCA9IGVsLm9mZnNldFBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgX3kgPSBwYXJzZUludChyZWN0LnkpID4gcGFyc2VJbnQoX3kpID8gcmVjdC55IDogX3k7XG4gICAgICAgIF94ID0gcGFyc2VJbnQocmVjdC54KSA+IHBhcnNlSW50KF94KSA/IHJlY3QueCA6IF94O1xuICAgICAgIFxuICAgICAgICByZXR1cm4geyB0b3A6ICBfeSAsIGxlZnQ6IF94IH07XG4gICAgfVxuXG4gICAgLy9nZXQgY3NzIHRyYW5zZm9ybSBwcm9wZXJ0eSB0byBmaXhlZCBpc3N1ZXMgd2l0aCB0cmFuc2Zvcm0gZWxlbWVudHNcbiAgICBnZXRUcmFuc2xhdGVYWShlbGVtZW50KSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXG4gICAgICAgIGNvbnN0IG1hdHJpeCA9IG5ldyBET01NYXRyaXhSZWFkT25seShzdHlsZS50cmFuc2Zvcm0pXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZVg6ICBNYXRoLmFicyhlbGVtZW50Lm9mZnNldFdpZHRoICogKG1hdHJpeC5tNDEgLyAxMDApKSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVk6ICBNYXRoLmFicyhlbGVtZW50Lm9mZnNldEhlaWdodCAqIChtYXRyaXgubTQyIC8gMTAwKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vZ2V0IGNzcyB0cmFuc2Zvcm0gcHJvcGVydHkgdG8gZml4ZWQgaXNzdWVzIHdpdGggdHJhbnNmb3JtIGVsZW1lbnRzXG4gICAgZ2V0VHJhbnNsYXRlM0QoZWxlbWVudCl7XG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCctd2Via2l0LXRyYW5zZm9ybScpO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX0uKykpKD86LCAoLXswLDF9LispKVxcKSkvKTtcblxuICAgICAgICBsZXQgeCwgeSwgejtcbiAgICAgICAgaWYgKCFyZXN1bHRzKSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4geyBYOiAwLCBZOiAwLCBaOiAwIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdHNbMV0gPT0gJzNkJykge1xuICAgICAgICAgICAgW3gsIHksIHpdID0gcmVzdWx0cy5zbGljZSgyLCA1KTtcbiAgICAgICAgICAgIHJldHVybiB7IFg6IHgsIFk6IHksIFo6IHogfTsgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdHMucHVzaCgwKTtcbiAgICAgICAgW3gsIHksIHpdID0gcmVzdWx0cy5zbGljZSg1LCA4KTtcbiAgICAgICAgcmV0dXJuIHsgWDogeCwgWTogeSwgWjogeiB9OyAgICAgIFxuICAgIH1cblxuICAgIGdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogKHRoaXMuZ2V0T2Zmc2V0KGVsZW1lbnQpLnRvcCArIHRoaXMuZ2V0VHJhbnNsYXRlM0QoZWxlbWVudCkuWSkgLSAoZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPyB0aGlzLmdldFRyYW5zbGF0ZVhZKGVsZW1lbnQpLnRyYW5zbGF0ZVkgOiAwKSxcbiAgICAgICAgICAgIGxlZnQ6ICh0aGlzLmdldE9mZnNldChlbGVtZW50KS5sZWZ0ICsgdGhpcy5nZXRUcmFuc2xhdGUzRChlbGVtZW50KS5YKSAtKCBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA/IHRoaXMuZ2V0VHJhbnNsYXRlWFkoZWxlbWVudCkudHJhbnNsYXRlWCA6IDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL3Bvc2l0aW9uIHBvcG92ZXJcbiAgICBwb3NpdGlvblBvcG92ZXIoZWxlbWVudCwgcG9wb3ZlciwgYXJyb3csIHN0ZXApIHtcbiAgICAgICAgdmFyIHBsYWNlbWVudCA9IHN0ZXAucGxhY2VtZW50IHx8ICdhdXRvJztcbiAgICAgICAgdmFyIHN0cmF0ZWd5ID0gc3RlcC5zdHJhdGVneSB8fCAnYWJzb2x1dGUnO1xuXG4gICAgICAgIHBvcG92ZXIuc3R5bGUucG9zaXRpb24gPSBzdHJhdGVneTtcbiAgICAgICAgYXJyb3cuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgICAgIC8vZWxlbWVudCB0b3AgJiBsZWZ0XG4gICAgICAgIHZhciBlbF90b3AsIGVsX2xlZnQ7XG4gICAgICAgIGVsX3RvcCA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpLnRvcDsgXG4gICAgICAgIGVsX2xlZnQgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS5sZWZ0OyBcbiAgICBcbiAgICAgICAgLy9pZiBwbGFjZW1lbnQgaXMgbm90IGRlZmluZWQgb3IgYXV0byB0aGVuIGNhbGN1bGF0ZSBsb2NhdGlvblxuICAgICAgICBpZiAocGxhY2VtZW50ID09ICdhdXRvJyB8fCBwbGFjZW1lbnQgPT0gJ2F1dG8tc3RhcnQnIHx8IHBsYWNlbWVudCA9PSAnYXV0by1lbmQnKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJvdyA9IHBsYWNlbWVudC5yZXBsYWNlKCdhdXRvJywgJycpLnRyaW0oKTtcbiAgICAgICAgICAgIHZhciBuZXdfYXJyb3cgPSAnJztcblxuICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlblxuICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIHRvcFxuICAgICAgICAgICAgaWYgKGVsX3RvcCArIChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpID4gdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSAxMDApIHtcbiAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xuICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gc2VjdGlvbiAxLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBzdGFydCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIGlmIChlbF9sZWZ0IDwgKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX2xlZnQgPiAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAtICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC8gMykpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctZW5kJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ3RvcCcgKyBuZXdfYXJyb3c7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZWxlbWVudCBpcyBwb3NpdGlvbiB0byB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgc2NyZWVuXG4gICAgICAgICAgICAvL3Bvc2l0aW9uIHBvcG92ZXIgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGlmICgoZWxfbGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggKyBwb3BvdmVyLm9mZnNldFdpZHRoKSA+IHRoaXMud2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xuICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gc2VjdGlvbiAxLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBzdGFydCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIGlmIChlbF90b3AgPCAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLyAzKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX3RvcCA+ICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAvIDMpKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ2xlZnQnICsgbmV3X2Fycm93O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2VsZW1lbnQgaXMgcG9zaXRpb24gdG8gdGhlIGxlZnQgc2lkZSBvZiB0aGUgc2NyZWVuXG4gICAgICAgICAgICAvL3Bvc2l0aW9uIHBvcG92ZXIgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICBpZiAoZWxfbGVmdCA8IHBvcG92ZXIub2Zmc2V0V2lkdGggJiYgKGVsZW1lbnQub2Zmc2V0V2lkdGggKyBwb3BvdmVyLm9mZnNldFdpZHRoKSA8IHRoaXMud2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAvL2RpdmlkZSB0aGUgc2NyZWVuIGludG8gMyBzZWN0aW9uc1xuICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gc2VjdGlvbiAxLzMgb2YgdGhlIHNjcmVlbiB0aGVuIGFycm93IGlzIGluIHRoZSBzdGFydCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIGlmIChlbF90b3AgPCAodGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLyAzKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVmdCBpcyB3aXRoaW4gdGhhdCBzZWN0aW9uIDMvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIGVuZCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsX3RvcCA+ICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAvIDMpKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdfYXJyb3cgPSBhcnJvdy5sZW5ndGggPiAwID8gYXJyb3cgOiAnLXN0YXJ0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGxhY2VtZW50ID0gJ3JpZ2h0JyArIG5ld19hcnJvdztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9lbGVtZW50IGlzIHBvc2l0aW9uIHRvIHRoZSB0b3Agb2YgdGhlIHNjcmVlblxuICAgICAgICAgICAgLy9wb3NpdGlvbiBwb3BvdmVyIHRvIGJvdHRvbVxuICAgICAgICAgICAgaWYgKGVsX3RvcCA8IChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpIHx8IGVsX3RvcCA8IDEwMCkge1xuICAgICAgICAgICAgICAgIC8vZGl2aWRlIHRoZSBzY3JlZW4gaW50byAzIHNlY3Rpb25zXG4gICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiBzZWN0aW9uIDEvMyBvZiB0aGUgc2NyZWVuIHRoZW4gYXJyb3cgaXMgaW4gdGhlIHN0YXJ0IHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGVsX2xlZnQgPCAodGhpcy53aW5kb3cuaW5uZXJXaWR0aCAvIDMpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld19hcnJvdyA9IGFycm93Lmxlbmd0aCA+IDAgPyBhcnJvdyA6ICctc3RhcnQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9pZiBsZWZ0IGlzIHdpdGhpbiB0aGF0IHNlY3Rpb24gMy8zIG9mIHRoZSBzY3JlZW4gdGhlbiBhcnJvdyBpcyBpbiB0aGUgZW5kIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZWxfbGVmdCA+ICh0aGlzLndpbmRvdy5pbm5lcldpZHRoIC0gKHRoaXMud2luZG93LmlubmVyV2lkdGggLyAzKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3X2Fycm93ID0gYXJyb3cubGVuZ3RoID4gMCA/IGFycm93IDogJy1lbmQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPSAnYm90dG9tJyArIG5ld19hcnJvdztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9hZGQgdG8gY2xhc3MgZm9yIGNzc1xuICAgICAgICAgICAgcG9wb3Zlci5jbGFzc0xpc3QuYWRkKHBsYWNlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3RvcFxuICAgICAgICBpZiAocGxhY2VtZW50ID09ICd0b3AnKSB7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgLSAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoKGVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKSAtIChwb3BvdmVyLm9mZnNldFdpZHRoIC8gMikpKSArICdweCc7XG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICd0b3Atc3RhcnQnKSB7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgLSAocG9wb3Zlci5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gZWxfbGVmdCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAndG9wLWVuZCcpIHtcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCAtIChwb3BvdmVyLm9mZnNldEhlaWdodCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCkgLSBwb3BvdmVyLm9mZnNldFdpZHRoKSArICdweCc7XG4gICAgICAgIH1cblxuICAgICAgICAgICAgLy9ib3R0b21cbiAgICAgICAgZWxzZSBpZiAocGxhY2VtZW50ID09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgJ3B4JztcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKGVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKSAtIHBvcG92ZXIub2Zmc2V0V2lkdGggLyAyKSArICdweCc7XG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdib3R0b20tc3RhcnQnKSB7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgJ3B4JztcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCkgKyAncHgnO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnYm90dG9tLWVuZCcpIHtcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5vZmZzZXQgKyAncHgnO1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKChlbF9sZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQpIC0gcG9wb3Zlci5vZmZzZXRXaWR0aCkgKyAncHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vbGVmdFxuICAgICAgICBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wICsgKE1hdGguYWJzKHBvcG92ZXIub2Zmc2V0SGVpZ2h0IC0gZWxlbWVudC5vZmZzZXRIZWlnaHQpIC8gMikpICsgJ3B4JztcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0ICsgKGVsZW1lbnQub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAncmlnaHQtc3RhcnQnKSB7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IGVsX3RvcCAtIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyAoZWxlbWVudC5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09ICdyaWdodC1lbmQnKSB7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLnRvcCA9ICgoZWxfdG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpIC0gcG9wb3Zlci5vZmZzZXRIZWlnaHQpICsgdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCArIChlbGVtZW50Lm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcmlnaHRcbiAgICAgICAgZWxzZSBpZiAocGxhY2VtZW50ID09ICdsZWZ0Jykge1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoZWxfdG9wICsgKE1hdGguYWJzKHBvcG92ZXIub2Zmc2V0SGVpZ2h0IC0gZWxlbWVudC5vZmZzZXRIZWlnaHQpIC8gMikpICsgJ3B4JztcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUubGVmdCA9IChlbF9sZWZ0IC0gKHBvcG92ZXIub2Zmc2V0V2lkdGggKyB0aGlzLm9wdGlvbnMub2Zmc2V0KSkgKyAncHgnO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PSAnbGVmdC1zdGFydCcpIHtcbiAgICAgICAgICAgIHBvcG92ZXIuc3R5bGUudG9wID0gZWxfdG9wIC0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldCArICdweCc7XG4gICAgICAgICAgICBwb3BvdmVyLnN0eWxlLmxlZnQgPSAoZWxfbGVmdCAtIChwb3BvdmVyLm9mZnNldFdpZHRoICsgdGhpcy5vcHRpb25zLm9mZnNldCkpICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT0gJ2xlZnQtZW5kJykge1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS50b3AgPSAoKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KSAtIHBvcG92ZXIub2Zmc2V0SGVpZ2h0KSArIHRoaXMub3B0aW9ucy5oaWdobGlnaHRPZmZzZXQgKyAncHgnO1xuICAgICAgICAgICAgcG9wb3Zlci5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSAocG9wb3Zlci5vZmZzZXRXaWR0aCArIHRoaXMub3B0aW9ucy5vZmZzZXQpKSArICdweCc7XG4gICAgICAgIH1cblxuICAgICAgICAvL2lmIHBvc2l0aW9uIGlzIGZpeGVkIHNjcm9sbCB0byB0b3BcbiAgICAgICAgaWYgKHN0cmF0ZWd5ID09PSAnZml4ZWQnKXtcbiAgICAgICAgICAgIHRoaXMud2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHBvcG92ZXIuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiBcInNtb290aFwiLCBibG9jazogXCJjZW50ZXJcIiwgaW5saW5lOiBcIm5lYXJlc3RcIn0pO1xuICAgICAgICB9ICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgY3JlYXRlT3ZlcmxheShlbGVtZW50LCBzdGVwID0gbnVsbCl7XG4gICAgICAgIHZhciBzdHJhdGVneSA9IChzdGVwICYmIHN0ZXAuc3RyYXRlZ3kpID8gc3RlcC5zdHJhdGVneSA6ICdhYnNvbHV0ZSc7XG5cbiAgICAgICAgdmFyIG92ZXJsYXkxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG92ZXJsYXkxLmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicsICdvdmVybGF5MScpO1xuICAgICAgICBvdmVybGF5MS5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XG5cbiAgICAgICAgdmFyIG92ZXJsYXkyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG92ZXJsYXkyLmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicsICdvdmVybGF5MicpO1xuICAgICAgICBvdmVybGF5Mi5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XG5cbiAgICAgICAgdmFyIG92ZXJsYXkzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG92ZXJsYXkzLmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicsICdvdmVybGF5MycpO1xuICAgICAgICBvdmVybGF5My5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XG5cbiAgICAgICAgdmFyIG92ZXJsYXk0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG92ZXJsYXk0LmNsYXNzTGlzdC5hZGQoJ3d0LW92ZXJsYXknLCAnb3BlbicsICdvdmVybGF5NCcpO1xuICAgICAgICBvdmVybGF5NC5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4IC0gMTA7XG4gICAgXG4gICAgICAgIC8vYXBwZW5kIHRvIGJvZHlcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkxKTtcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkyKTtcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkzKTtcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXk0KTtcblxuICAgICAgICAvL2VsZW1lbnQgdG9wICYgbGVmdFxuICAgICAgICB2YXIgZWxfdG9wLCBlbF9sZWZ0O1xuICAgICAgICBlbF90b3AgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KS50b3A7IFxuICAgICAgICBlbF9sZWZ0ID0gdGhpcy5nZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCkubGVmdDtcbiAgICAgICAgXG4gICAgICAgIHZhciBoaWdobGlnaHRfb2Zmc2V0ID0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodE9mZnNldDtcblxuICAgICAgICAvL292ZXJsYXlzIHRvcC1sZWZ0XG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLnBvc2l0aW9uID0gc3RyYXRlZ3k7XG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLnRvcCA9IDA7XG4gICAgICAgIG92ZXJsYXkxLnN0eWxlLndpZHRoID0gIGVsX2xlZnQgLSBoaWdobGlnaHRfb2Zmc2V0ICsgJ3B4JztcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUuaGVpZ2h0ID0gIChlbF90b3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCArIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcbiAgICAgICAgb3ZlcmxheTEuc3R5bGUubGVmdCA9IDA7XG5cbiAgICAgICAgLy9vdmVybGF5cyB0b3AtcmlnaHRcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUucG9zaXRpb24gPSBzdHJhdGVneTtcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUudG9wID0gMDtcbiAgICAgICAgb3ZlcmxheTIuc3R5bGUucmlnaHQgPSAwO1xuICAgICAgICBvdmVybGF5Mi5zdHlsZS5oZWlnaHQgPSAoZWxfdG9wIC0gaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xuICAgICAgICBvdmVybGF5Mi5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgLSBoaWdobGlnaHRfb2Zmc2V0KSArICdweCc7XG5cbiAgICAgICAgLy9vdmVybGF5cyBib3R0b20tcmlnaHRcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUucG9zaXRpb24gPSBzdHJhdGVneTtcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUudG9wID0gKGVsX3RvcCAtIGhpZ2hsaWdodF9vZmZzZXQpICsgJ3B4JztcbiAgICAgICAgb3ZlcmxheTMuc3R5bGUucmlnaHQgPSAwO1xuICAgICAgICBvdmVybGF5My5zdHlsZS5ib3R0b20gPSAwIC0gKHRoaXMuZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSB0aGlzLndpbmRvdy5pbm5lckhlaWdodCkgKyAncHgnO1xuICAgICAgICBvdmVybGF5My5zdHlsZS5sZWZ0ID0gKGVsX2xlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoICsgaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xuXG4gICAgICAgIC8vb3ZlcmxheXMgYm90dG9tLWxlZnRcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUucG9zaXRpb24gPSBzdHJhdGVneTtcbiAgICAgICAgb3ZlcmxheTQuc3R5bGUudG9wID0gKGVsX3RvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgaGlnaGxpZ2h0X29mZnNldCkgKyAncHgnO1xuICAgICAgICBvdmVybGF5NC5zdHlsZS53aWR0aCA9ICAgZWxfbGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggKyBoaWdobGlnaHRfb2Zmc2V0ICArICdweCc7XG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLmJvdHRvbSA9IDAgLSAodGhpcy5kb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIHRoaXMud2luZG93LmlubmVySGVpZ2h0KSArICdweCc7XG4gICAgICAgIG92ZXJsYXk0LnN0eWxlLmxlZnQgPSAwO1xuICAgIH1cblxufVxuIl0sIm5hbWVzIjpbIldlYlRvdXIiLCJvcHRpb25zIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiX2NsYXNzQ2FsbENoZWNrIiwiY29uc3RydWN0b3IiLCJpbnN0YW5jZSIsIl9vYmplY3RTcHJlYWQiLCJhbmltYXRlIiwib3BhY2l0eSIsIm9mZnNldCIsImJvcmRlclJhZGl1cyIsImFsbG93Q2xvc2UiLCJoaWdobGlnaHQiLCJoaWdobGlnaHRPZmZzZXQiLCJrZXlib2FyZCIsIndpZHRoIiwiekluZGV4IiwicmVtb3ZlQXJyb3ciLCJvbk5leHQiLCJvblByZXZpb3VzIiwibGFiZWxzIiwibmV4dCIsInByZXYiLCJkb25lIiwiY2xvc2UiLCJzdGVwcyIsInN0ZXBJbmRleCIsImlzUnVubmluZyIsImlzUGF1c2VkIiwid2luZG93IiwiZG9jdW1lbnQiLCJvbkNsaWNrIiwiYmluZCIsIm9uUmVzaXplIiwib25LZXlVcCIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiZG9jdW1lbnRFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInByZXZpb3VzIiwic3RvcCIsImV2ZW50Iiwia2V5Q29kZSIsImNsZWFyIiwicmVuZGVyIiwic2V0U3RlcHMiLCJnZXRTdGVwcyIsImVsZW1lbnQiLCJfdGhpcyIsInN0ZXAiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlT3ZlcmxheSIsInN0YXJ0Iiwic3RhcnRJbmRleCIsInNob3dMb2FkZXIiLCJwb3BvdmVyIiwibG9hZGVyIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsInN0eWxlIiwicHJlcGVuZCIsIm1vdmVOZXh0IiwibW92ZVByZXZpb3VzIiwicG9zaXRpb24iLCJzdGVwX2hpZ2hsaWdodCIsInNldEF0dHJpYnV0ZSIsInBsYWNlbWVudCIsInBvcG92ZXJJbm5lciIsInRpdGxlIiwiYXBwZW5kIiwiaW5uZXJUZXh0IiwiY29udGVudCIsImlubmVySFRNTCIsInNob3dCdG5zIiwiQm9vbGVhbiIsImJ0bk5leHQiLCJidG5CYWNrIiwidGV4dCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwidGV4dENvbG9yIiwiYXJyb3ciLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJwb3NpdGlvblBvcG92ZXIiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJpbmxpbmUiLCJvdmVybGF5IiwidG9wIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwicmVtb3ZlIiwicG9wdXAiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInJlbW92ZUF0dHJpYnV0ZSIsImdldFdpbmRvd09mZnNldCIsImhlaWdodCIsImlubmVySGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiaW5uZXJXaWR0aCIsImNsaWVudFdpZHRoIiwiZ2V0T2Zmc2V0IiwiZWwiLCJfeCIsIl95IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImlzTmFOIiwib2Zmc2V0TGVmdCIsIm9mZnNldFRvcCIsInNjcm9sbExlZnQiLCJzY3JvbGxUb3AiLCJvZmZzZXRQYXJlbnQiLCJwYXJzZUludCIsInkiLCJ4IiwiZ2V0VHJhbnNsYXRlWFkiLCJnZXRDb21wdXRlZFN0eWxlIiwibWF0cml4IiwiRE9NTWF0cml4UmVhZE9ubHkiLCJ0cmFuc2Zvcm0iLCJ0cmFuc2xhdGVYIiwiTWF0aCIsImFicyIsIm9mZnNldFdpZHRoIiwibTQxIiwidHJhbnNsYXRlWSIsIm9mZnNldEhlaWdodCIsIm00MiIsImdldFRyYW5zbGF0ZTNEIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInJlc3VsdHMiLCJtYXRjaCIsInoiLCJYIiwiWSIsIloiLCJfcmVzdWx0cyRzbGljZSIsInNsaWNlIiwiX3Jlc3VsdHMkc2xpY2UyIiwiX3NsaWNlZFRvQXJyYXkiLCJwdXNoIiwiX3Jlc3VsdHMkc2xpY2UzIiwiX3Jlc3VsdHMkc2xpY2U0IiwiZ2V0RWxlbWVudFBvc2l0aW9uIiwic3RyYXRlZ3kiLCJlbF90b3AiLCJlbF9sZWZ0IiwicmVwbGFjZSIsInRyaW0iLCJuZXdfYXJyb3ciLCJzY3JvbGxUbyIsIm92ZXJsYXkxIiwib3ZlcmxheTIiLCJvdmVybGF5MyIsIm92ZXJsYXk0IiwiaGlnaGxpZ2h0X29mZnNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7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
