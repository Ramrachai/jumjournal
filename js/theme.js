/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) : typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) : (global = global || self, factory(global.bootstrap = {}, global.jQuery));
})(this, function (exports, $) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
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

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */


  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.3.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype; // Public

    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $(element).closest("." + ClassName.ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);
      $(element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$1 = 'button';
  var VERSION$1 = '4.3.1';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  var ClassName$1 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector$1 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1)
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
    } // Getters


    var _proto = Button.prototype; // Public

    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = this._element.querySelector(Selector$1.INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

              if (activeElement) {
                $(activeElement).removeClass(ClassName$1.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }

            input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName$1.ACTIVE);
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY$1, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!$(button).hasClass(ClassName$1.BUTTON)) {
      button = $(button).closest(Selector$1.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector$1.BUTTON)[0];
    $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Button._jQueryInterface;
  $.fn[NAME$1].Constructor = Button;

  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$2 = 'carousel';
  var VERSION$2 = '4.3.1';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event$2 = {
    SLIDE: "slide" + EVENT_KEY$2,
    SLID: "slid" + EVENT_KEY$2,
    KEYDOWN: "keydown" + EVENT_KEY$2,
    MOUSEENTER: "mouseenter" + EVENT_KEY$2,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
    TOUCHSTART: "touchstart" + EVENT_KEY$2,
    TOUCHMOVE: "touchmove" + EVENT_KEY$2,
    TOUCHEND: "touchend" + EVENT_KEY$2,
    POINTERDOWN: "pointerdown" + EVENT_KEY$2,
    POINTERUP: "pointerup" + EVENT_KEY$2,
    DRAG_START: "dragstart" + EVENT_KEY$2,
    LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
  };
  var ClassName$2 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var Selector$2 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype; // Public

    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(Selector$2.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event$2.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$2);
      $.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event$2.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event$2.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event$2.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $(this._element).on(Event$2.POINTERDOWN, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(ClassName$2.POINTER_EVENT);
      } else {
        $(this._element).on(Event$2.TOUCHSTART, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.TOUCHMOVE, function (event) {
          return move(event);
        });
        $(this._element).on(Event$2.TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;

        default:
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

      var slideEvent = $.Event(Event$2.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $(this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
        $(indicators).removeClass(ClassName$2.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName$2.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$2.LEFT;
        orderClassName = ClassName$2.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName$2.RIGHT;
        orderClassName = ClassName$2.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event$2.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($(this._element).hasClass(ClassName$2.SLIDE)) {
        $(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
          $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $(_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $(activeElement).removeClass(ClassName$2.ACTIVE);
        $(nextElement).addClass(ClassName$2.ACTIVE);
        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$2);

        var _config = _objectSpread({}, Default, $(this).data());

        if (typeof config === 'object') {
          _config = _objectSpread({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
        return;
      }

      var config = _objectSpread({}, $(target).data(), $(this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(Event$2.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $(carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2] = Carousel._jQueryInterface;
  $.fn[NAME$2].Constructor = Carousel;

  $.fn[NAME$2].noConflict = function () {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$3 = 'collapse';
  var VERSION$3 = '4.3.1';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event$3 = {
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  var ClassName$3 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector$3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype; // Public

    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName$3.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(ClassName$3.COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event$3.SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event$3.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(ClassName$3.SHOW)) {
              $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $(element).hasClass(ClassName$3.SHOW);

      if (triggerArray.length) {
        $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$3);

        var _config = _objectSpread({}, Default$1, $this.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;

  $.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };
  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.14.7
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */


  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  var timeoutDuration = 0;

  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      timeoutDuration = 1;
      break;
    }
  }

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }

      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;
  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */

  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */

  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }
  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */


  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    } // NOTE: 1 DOM access here


    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }
  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */


  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }

    return element.parentNode || element.host;
  }
  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */


  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;

      case '#document':
        return element.body;
    } // Firefox want us to check `-x` and `-y` variations as well


    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */

  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }

    if (version === 10) {
      return isIE10;
    }

    return isIE11 || isIE10;
  }
  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */


  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

    var offsetParent = element.offsetParent || null; // Skip hidden elements which don't have an offsetParent

    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    } // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...


    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }

    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }
  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */


  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }
  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */


  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    } // Here we make sure to give as "start" the element that comes first in the DOM


    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1; // Get common ancestor container

    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    } // one of the nodes is inside shadowDOM, find which one


    var element1root = getRoot(element1);

    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }
  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */


  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }
  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */


  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }
  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */


  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
    return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);
    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var defineProperty = function (obj, key, value) {
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
  };

  var _extends = Object.assign || function (target) {
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
  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */


  function getClientRect(offsets) {
    return _extends({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }
  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */


  function getBoundingClientRect(element) {
    var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11

    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    }; // subtract scrollbar size from sizes

    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.right - result.left;
    var height = sizes.height || element.clientHeight || result.bottom - result.top;
    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons

    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');
      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);
    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }

    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.

    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop, 10);
      var marginLeft = parseFloat(styles.marginLeft, 10);
      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);
    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };
    return getClientRect(offset);
  }
  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */


  function isFixed(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }

    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }

    var parentNode = getParentNode(element);

    if (!parentNode) {
      return false;
    }

    return isFixed(parentNode);
  }
  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */


  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }

    var el = element.parentElement;

    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }

    return el || document.documentElement;
  }
  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */


  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false; // NOTE: 1 DOM access here

    var boundaries = {
      top: 0,
      left: 0
    };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference); // Handle viewport case

    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;

      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));

        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition); // In case of HTML, we need a different computation

      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    } // Add paddings


    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;
    return width * height;
  }
  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };
    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });
    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });
    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
    var variation = placement.split('-')[1];
    return computedPlacement + (variation ? '-' + variation : '');
  }
  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */


  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }
  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */


  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }
  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */


  function getOppositePlacement(placement) {
    var hash = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }
  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */


  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0]; // Get popper node sizes

    var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    }; // depending by the popper placement we have to compute its offsets slightly differently

    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';
    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }
  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */


  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    } // use `filter` to obtain the same behavior of `find`


    return arr.filter(check)[0];
  }
  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */


  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    } // use `find` + `indexOf` if `findIndex` isn't supported


    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }
  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */


  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }

      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);
        data = fn(data, modifier);
      }
    });
    return data;
  }
  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */


  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    }; // compute reference element offsets

    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed); // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value

    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding); // store the computed placement inside `originalPlacement`

    data.originalPlacement = data.placement;
    data.positionFixed = this.options.positionFixed; // compute the popper offsets

    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'; // run the modifiers

    data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback

    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }
  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */


  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }
  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */


  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;

      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }

    return null;
  }
  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */


  function destroy() {
    this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners(); // remove the popper if user explicity asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it

    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }

    return this;
  }
  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */


  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, {
      passive: true
    });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }

    scrollParents.push(target);
  }
  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */


  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, {
      passive: true
    }); // Scroll event listener on scroll parents

    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;
    return state;
  }
  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */


  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }
  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */


  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    }); // Reset state

    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }
  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */


  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }
  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */


  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }
  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */


  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = ''; // add unit if the value is numeric and is one of the following

      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }

      element.style[prop] = styles[prop] + unit;
    });
  }
  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */


  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];

      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */


  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element

    setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }
  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */


  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed); // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value

    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
    popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations

    setStyles(popper, {
      position: options.positionFixed ? 'fixed' : 'absolute'
    });
    return options;
  }
  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */


  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);
    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;
    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */

  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;

    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }

    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

    var styles = {
      position: popper.position
    };
    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed

    var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.

    var left = void 0,
        top = void 0;

    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }

    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }

    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    } // Attributes


    var attributes = {
      'x-placement': data.placement
    }; // Update `data` attributes, styles and arrowStyles

    data.attributes = _extends({}, attributes, data.attributes);
    data.styles = _extends({}, styles, data.styles);
    data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
    return data;
  }
  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */


  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });
    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';

      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }

    return isRequired;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function arrow(data, options) {
    var _data$offsets$arrow; // arrow depends on keepTogether in order to work


    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var isVertical = ['left', 'right'].indexOf(placement) !== -1;
    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len]; //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //
    // top/left side

    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    } // bottom/right side


    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }

    data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available

    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
    return data;
  }
  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */


  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }

    return variation;
  }
  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */


  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']; // Get rid of `auto` `auto-start` and `auto-end`

  var validPlacements = placements.slice(3);
  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */

  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */

  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';
    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;

      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;

      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;

      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);
      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom; // flip the variation if required

      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future

        data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }

    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }
  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */


  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2]; // If it's not a number it's an operator, I guess

    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;

      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;

        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;

      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }

      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }
  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */


  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one

    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    }); // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space

    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    } // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.


    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments]; // Convert the values with units to absolute pixels to allow our computations

    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, []) // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    }); // Loop trough the offsets arrays and execute the operations

    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */


  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var basePlacement = placement.split('-')[0];
    var offsets = void 0;

    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken

    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    } // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself


    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification

    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];
    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';
    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed); // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed

    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;
    options.boundaries = boundaries;
    var order = options.priority;
    var popper = data.offsets.popper;
    var check = {
      primary: function primary(placement) {
        var value = popper[placement];

        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }

        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];

        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }

        return defineProperty({}, mainSide, value);
      }
    };
    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends({}, popper, check[side](placement));
    });
    data.offsets.popper = popper;
    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;
      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';
      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };
      data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);
    return data;
  }
  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */


  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: offset,

      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: preventOverflow,

      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],

      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,

      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: arrow,

      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: flip,

      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',

      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,

      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport'
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,

      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,

      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: computeStyle,

      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,

      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',

      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: applyStyle,

      /** @prop {Function} */
      onLoad: applyStyleOnLoad,

      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };
  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */

  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };
  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */
  // Utils
  // Methods

  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      }; // make update() debounced, so that it only runs at most once-per-tick


      this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

      this.options = _extends({}, Popper.Defaults, options); // init state

      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      }; // get reference and popper elements (allow jQuery wrappers)

      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

      this.options.modifiers = {};
      Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      }); // Refactoring modifiers' list (Object => Array)

      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends({
          name: name
        }, _this.options.modifiers[name]);
      }) // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      }); // fire the first update to position the popper in the right place

      this.update();
      var eventsEnabled = this.options.eventsEnabled;

      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    } // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }
      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */

      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();
  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.3.1';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event$4 = {
    HIDE: "hide" + EVENT_KEY$4,
    HIDDEN: "hidden" + EVENT_KEY$4,
    SHOW: "show" + EVENT_KEY$4,
    SHOWN: "shown" + EVENT_KEY$4,
    CLICK: "click" + EVENT_KEY$4,
    CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
  };
  var ClassName$4 = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var Selector$4 = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype; // Public

    _proto.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);

      var isActive = $(this._menu).hasClass(ClassName$4.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);
      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $(parent).addClass(ClassName$4.POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
        $(document.body).children().on('mouseover', null, $.noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.show = function show() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $.Event(Event$4.HIDE, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$4);
      $(this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $(this._element).on(Event$4.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, this.constructor.Default, $(this._element).data(), config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(Selector$4.MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element.parentNode);
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
        placement = AttachmentMap.TOP;

        if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          } // Disable Popper.js if we have a static display

        }
      };

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return popperConfig;
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $(toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$(parent).hasClass(ClassName$4.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');
        $(dropdownMenu).removeClass(ClassName$4.SHOW);
        $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $(parent).hasClass(ClassName$4.SHOW);

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS));

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$4] = Dropdown._jQueryInterface;
  $.fn[NAME$4].Constructor = Dropdown;

  $.fn[NAME$4].noConflict = function () {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$5 = 'modal';
  var VERSION$5 = '4.3.1';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event$5 = {
    HIDE: "hide" + EVENT_KEY$5,
    HIDDEN: "hidden" + EVENT_KEY$5,
    SHOW: "show" + EVENT_KEY$5,
    SHOWN: "shown" + EVENT_KEY$5,
    FOCUSIN: "focusin" + EVENT_KEY$5,
    RESIZE: "resize" + EVENT_KEY$5,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
  };
  var ClassName$5 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$5 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(Selector$5.DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype; // Public

    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($(this._element).hasClass(ClassName$5.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event$5.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $.Event(Event$5.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(Event$5.FOCUSIN);
      $(this._element).removeClass(ClassName$5.SHOW);
      $(this._element).off(Event$5.CLICK_DISMISS);
      $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      $(document).off(Event$5.FOCUSIN);
      $.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$3, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE)) {
        this._dialog.querySelector(Selector$5.MODAL_BODY).scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName$5.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event$5.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        $(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
      .on(Event$5.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event$5.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $(window).on(Event$5.RESIZE, function (event) {
          return _this6.handleUpdate(event);
        });
      } else {
        $(window).off(Event$5.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName$5.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        $(_this7._element).trigger(Event$5.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$5.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName$5.SHOW);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName$5.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($(this._element).hasClass(ClassName$5.FADE)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this9 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

        $(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $(document.body).addClass(ClassName$5.OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
      $(fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
      $(elements).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$5);

        var _config = _objectSpread({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event$5.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event$5.HIDDEN, function () {
        if ($(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$5] = Modal._jQueryInterface;
  $.fn[NAME$5].Constructor = Modal;

  $.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

  };
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i, len);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.3.1';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object'
  };
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event$6 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var ClassName$6 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$6 = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      /**
       * Check for Popper dependency
       * Popper - https://popper.js.org
       */
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype; // Public

    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $.removeData(this.element, this.constructor.DATA_KEY);
      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper !== null) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName$6.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, {
          placement: attachment,
          modifiers: {
            offset: this._getOffset(),
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Selector$6.ARROW
            },
            preventOverflow: {
              boundariesElement: this.config.boundary
            }
          },
          onCreate: function onCreate(data) {
            if (data.originalPlacement !== data.placement) {
              _this._handlePopperPlacementChange(data);
            }
          },
          onUpdate: function onUpdate(data) {
            return _this._handlePopperPlacementChange(data);
          }
        });
        $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if ($(this.tip).hasClass(ClassName$6.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if ($(this.tip).hasClass(ClassName$6.FADE)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
      $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getOffset = function _getOffset() {
      var _this3 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $(this.config.container);
      }

      return $(document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap$1[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this4 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
            return _this4.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
          $(_this4.element).on(eventIn, _this4.config.selector, function (event) {
            return _this4._enter(event);
          }).on(eventOut, _this4.config.selector, function (event) {
            return _this4._leave(event);
          });
        }
      });
      $(this.element).closest('.modal').on('hide.bs.modal', function () {
        if (_this4.element) {
          _this4.hide();
        }
      });

      if (this.config.selector) {
        this.config = _objectSpread({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $(this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      var popperInstance = popperData.instance;
      this.tip = popperInstance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $(tip).removeClass(ClassName$6.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$6;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$6] = Tooltip._jQueryInterface;
  $.fn[NAME$6].Constructor = Tooltip;

  $.fn[NAME$6].noConflict = function () {
    $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$7 = 'popover';
  var VERSION$7 = '4.3.1';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _objectSpread({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _objectSpread({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName$7 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$7 = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event$7 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype; // Overrides

    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(Selector$7.CONTENT), content);
      $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$7;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$7] = Popover._jQueryInterface;
  $.fn[NAME$7].Constructor = Popover;

  $.fn[NAME$7].noConflict = function () {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.3.1';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event$8 = {
    ACTIVATE: "activate" + EVENT_KEY$8,
    SCROLL: "scroll" + EVENT_KEY$8,
    LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
  };
  var ClassName$8 = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };
  var Selector$8 = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ScrollSpy =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $(this._scrollElement).on(Event$8.SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype; // Public

    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$8);
      $(this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$6, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $(config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      var offsetLength = this._offsets.length;

      for (var i = offsetLength; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
        $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
        $link.addClass(ClassName$8.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
      }

      $(this._scrollElement).trigger(Event$8.ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(ClassName$8.ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(ClassName$8.ACTIVE);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(window).on(Event$8.LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8] = ScrollSpy._jQueryInterface;
  $.fn[NAME$8].Constructor = ScrollSpy;

  $.fn[NAME$8].noConflict = function () {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$9 = 'tab';
  var VERSION$9 = '4.3.1';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
  var Event$9 = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
  };
  var ClassName$9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype; // Public

    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event$9.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $.Event(Event$9.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event$9.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $.Event(Event$9.SHOWN, {
          relatedTarget: previous
        });
        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $(active).removeClass(ClassName$9.ACTIVE);
        var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName$9.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(ClassName$9.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(ClassName$9.FADE)) {
        element.classList.add(ClassName$9.SHOW);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
        var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
          $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$9] = Tab._jQueryInterface;
  $.fn[NAME$9].Constructor = Tab;

  $.fn[NAME$9].noConflict = function () {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME$a = 'toast';
  var VERSION$a = '4.3.1';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
  var Event$a = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
    HIDE: "hide" + EVENT_KEY$a,
    HIDDEN: "hidden" + EVENT_KEY$a,
    SHOW: "show" + EVENT_KEY$a,
    SHOWN: "shown" + EVENT_KEY$a
  };
  var ClassName$a = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector$a = {
    DATA_DISMISS: '[data-dismiss="toast"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype; // Public

    _proto.show = function show() {
      var _this = this;

      $(this._element).trigger(Event$a.SHOW);

      if (this._config.animation) {
        this._element.classList.add(ClassName$a.FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(ClassName$a.SHOWING);

        _this._element.classList.add(ClassName$a.SHOW);

        $(_this._element).trigger(Event$a.SHOWN);

        if (_this._config.autohide) {
          _this.hide();
        }
      };

      this._element.classList.remove(ClassName$a.HIDE);

      this._element.classList.add(ClassName$a.SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide(withoutTimeout) {
      var _this2 = this;

      if (!this._element.classList.contains(ClassName$a.SHOW)) {
        return;
      }

      $(this._element).trigger(Event$a.HIDE);

      if (withoutTimeout) {
        this._close();
      } else {
        this._timeout = setTimeout(function () {
          _this2._close();
        }, this._config.delay);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      this._timeout = null;

      if (this._element.classList.contains(ClassName$a.SHOW)) {
        this._element.classList.remove(ClassName$a.SHOW);
      }

      $(this._element).off(Event$a.CLICK_DISMISS);
      $.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$7, $(this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this3 = this;

      $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
        return _this3.hide(true);
      });
    };

    _proto._close = function _close() {
      var _this4 = this;

      var complete = function complete() {
        _this4._element.classList.add(ClassName$a.HIDE);

        $(_this4._element).trigger(Event$a.HIDDEN);
      };

      this._element.classList.remove(ClassName$a.SHOW);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$a] = Toast._jQueryInterface;
  $.fn[NAME$a].Constructor = Toast;

  $.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  (function () {
    if (typeof $ === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })();

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
      isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
      isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', function () {
      var id = location.hash.substring(1),
          element;

      if (!/^[A-z0-9_-]+$/.test(id)) {
        return;
      }

      element = document.getElementById(id);

      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }

        element.focus();
      }
    }, false);
  }
})();
/**!
 * MixItUp v3.3.1
 * A high-performance, dependency-free library for animated filtering, sorting and more
 * Build 94e0fbf6-cd0b-4987-b3c0-14b59b67b8a0
 *
 * @copyright Copyright 2014-2018 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://www.kunkalabs.com/mixitup/
 *
 * @license   Commercial use requires a commercial license.
 *            https://www.kunkalabs.com/mixitup/licenses/
 *
 *            Non-commercial use permitted under same terms as CC BY-NC 3.0 license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */
!function (t) {
  "use strict";

  var e = null,
      n = null;
  !function () {
    var e = ["webkit", "moz", "o", "ms"],
        n = t.document.createElement("div"),
        a = -1;

    for (a = 0; a < e.length && !t.requestAnimationFrame; a++) t.requestAnimationFrame = t[e[a] + "RequestAnimationFrame"];

    "undefined" == typeof n.nextElementSibling && Object.defineProperty(t.Element.prototype, "nextElementSibling", {
      get: function () {
        for (var t = this.nextSibling; t;) {
          if (1 === t.nodeType) return t;
          t = t.nextSibling;
        }

        return null;
      }
    }), function (t) {
      t.matches = t.matches || t.machesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector || function (t) {
        return Array.prototype.indexOf.call(this.parentElement.querySelectorAll(t), this) > -1;
      };
    }(t.Element.prototype), Object.keys || (Object.keys = function () {
      var t = Object.prototype.hasOwnProperty,
          e = !1,
          n = [],
          a = -1;
      return e = !{
        toString: null
      }.propertyIsEnumerable("toString"), n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], a = n.length, function (i) {
        var o = [],
            r = "",
            s = -1;
        if ("object" != typeof i && ("function" != typeof i || null === i)) throw new TypeError("Object.keys called on non-object");

        for (r in i) t.call(i, r) && o.push(r);

        if (e) for (s = 0; s < a; s++) t.call(i, n[s]) && o.push(n[s]);
        return o;
      };
    }()), Array.isArray || (Array.isArray = function (t) {
      return "[object Array]" === Object.prototype.toString.call(t);
    }), "function" != typeof Object.create && (Object.create = function (t) {
      var e = function () {};

      return function (n, a) {
        if (n !== Object(n) && null !== n) throw TypeError("Argument must be an object, or null");
        e.prototype = n || {};
        var i = new e();
        return e.prototype = null, a !== t && Object.defineProperties(i, a), null === n && (i.__proto__ = null), i;
      };
    }()), String.prototype.trim || (String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (t) {
      var e, n, a, i;
      if (null === this) throw new TypeError();
      if (a = Object(this), i = a.length >>> 0, 0 === i) return -1;
      if (e = 0, arguments.length > 1 && (e = Number(arguments[1]), e !== e ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -(1 / 0) && (e = (e > 0 || -1) * Math.floor(Math.abs(e)))), e >= i) return -1;

      for (n = e >= 0 ? e : Math.max(i - Math.abs(e), 0); n < i; n++) if (n in a && a[n] === t) return n;

      return -1;
    }), Function.prototype.bind || (Function.prototype.bind = function (t) {
      var e, n, a, i;
      if ("function" != typeof this) throw new TypeError();
      return e = Array.prototype.slice.call(arguments, 1), n = this, a = function () {}, i = function () {
        return n.apply(this instanceof a ? this : t, e.concat(Array.prototype.slice.call(arguments)));
      }, this.prototype && (a.prototype = this.prototype), i.prototype = new a(), i;
    }), t.Element.prototype.dispatchEvent || (t.Element.prototype.dispatchEvent = function (t) {
      try {
        return this.fireEvent("on" + t.type, t);
      } catch (e) {}
    });
  }(), e = function (a, i, o) {
    var r = null,
        s = !1,
        l = null,
        c = null,
        u = null,
        f = null,
        h = [],
        d = "",
        m = [],
        g = -1;
    if (u = o || t.document, (s = arguments[3]) && (s = "boolean" == typeof s), "string" == typeof a) m = u.querySelectorAll(a);else if (a && "object" == typeof a && n.isElement(a, u)) m = [a];else {
      if (!a || "object" != typeof a || !a.length) throw new Error(e.messages.errorFactoryInvalidContainer());
      m = a;
    }
    if (m.length < 1) throw new Error(e.messages.errorFactoryContainerNotFound());

    for (g = 0; (r = m[g]) && (!(g > 0) || s); g++) r.id ? d = r.id : (d = "MixItUp" + n.randomHex(), r.id = d), e.instances[d] instanceof e.Mixer ? (l = e.instances[d], (!i || i && i.debug && i.debug.showWarnings !== !1) && console.warn(e.messages.warningFactoryPreexistingInstance())) : (l = new e.Mixer(), l.attach(r, u, d, i), e.instances[d] = l), c = new e.Facade(l), i && i.debug && i.debug.enable ? h.push(l) : h.push(c);

    return f = s ? new e.Collection(h) : h[0];
  }, e.use = function (t) {
    e.Base.prototype.callActions.call(e, "beforeUse", arguments), "function" == typeof t && "mixitup-extension" === t.TYPE ? "undefined" == typeof e.extensions[t.NAME] && (t(e), e.extensions[t.NAME] = t) : t.fn && t.fn.jquery && (e.libraries.$ = t), e.Base.prototype.callActions.call(e, "afterUse", arguments);
  }, e.instances = {}, e.extensions = {}, e.libraries = {}, n = {
    hasClass: function (t, e) {
      return !!t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"));
    },
    addClass: function (t, e) {
      this.hasClass(t, e) || (t.className += t.className ? " " + e : e);
    },
    removeClass: function (t, e) {
      if (this.hasClass(t, e)) {
        var n = new RegExp("(\\s|^)" + e + "(\\s|$)");
        t.className = t.className.replace(n, " ").trim();
      }
    },
    extend: function (t, e, n, a) {
      var i = [],
          o = "",
          r = -1;
      n = n || !1, a = a || !1;

      try {
        if (Array.isArray(e)) for (r = 0; r < e.length; r++) i.push(r);else e && (i = Object.keys(e));

        for (r = 0; r < i.length; r++) o = i[r], !n || "object" != typeof e[o] || this.isElement(e[o]) ? t[o] = e[o] : Array.isArray(e[o]) ? (t[o] || (t[o] = []), this.extend(t[o], e[o], n, a)) : (t[o] || (t[o] = {}), this.extend(t[o], e[o], n, a));
      } catch (s) {
        if (!a) throw s;
        this.handleExtendError(s, t);
      }

      return t;
    },
    handleExtendError: function (t, n) {
      var a = /property "?(\w*)"?[,:] object/i,
          i = null,
          o = "",
          r = "",
          s = "",
          l = "",
          c = "",
          u = -1,
          f = -1;

      if (t instanceof TypeError && (i = a.exec(t.message))) {
        o = i[1];

        for (c in n) {
          for (f = 0; f < o.length && o.charAt(f) === c.charAt(f);) f++;

          f > u && (u = f, l = c);
        }

        throw u > 1 && (s = e.messages.errorConfigInvalidPropertySuggestion({
          probableMatch: l
        })), r = e.messages.errorConfigInvalidProperty({
          erroneous: o,
          suggestion: s
        }), new TypeError(r);
      }

      throw t;
    },
    template: function (t) {
      for (var e = /\${([\w]*)}/g, n = {}, a = null; a = e.exec(t);) n[a[1]] = new RegExp("\\${" + a[1] + "}", "g");

      return function (e) {
        var a = "",
            i = t;
        e = e || {};

        for (a in n) i = i.replace(n[a], "undefined" != typeof e[a] ? e[a] : "");

        return i;
      };
    },
    on: function (e, n, a, i) {
      e && (e.addEventListener ? e.addEventListener(n, a, i) : e.attachEvent && (e["e" + n + a] = a, e[n + a] = function () {
        e["e" + n + a](t.event);
      }, e.attachEvent("on" + n, e[n + a])));
    },
    off: function (t, e, n) {
      t && (t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent && (t.detachEvent("on" + e, t[e + n]), t[e + n] = null));
    },
    getCustomEvent: function (e, n, a) {
      var i = null;
      return a = a || t.document, "function" == typeof t.CustomEvent ? i = new t.CustomEvent(e, {
        detail: n,
        bubbles: !0,
        cancelable: !0
      }) : "function" == typeof a.createEvent ? (i = a.createEvent("CustomEvent"), i.initCustomEvent(e, !0, !0, n)) : (i = a.createEventObject(), i.type = e, i.returnValue = !1, i.cancelBubble = !1, i.detail = n), i;
    },
    getOriginalEvent: function (t) {
      return t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t;
    },
    index: function (t, e) {
      for (var n = 0; null !== (t = t.previousElementSibling);) e && !t.matches(e) || ++n;

      return n;
    },
    camelCase: function (t) {
      return t.toLowerCase().replace(/([_-][a-z])/g, function (t) {
        return t.toUpperCase().replace(/[_-]/, "");
      });
    },
    pascalCase: function (t) {
      return (t = this.camelCase(t)).charAt(0).toUpperCase() + t.slice(1);
    },
    dashCase: function (t) {
      return t.replace(/([A-Z])/g, "-$1").replace(/^-/, "").toLowerCase();
    },
    isElement: function (e, n) {
      return n = n || t.document, !!(t.HTMLElement && e instanceof t.HTMLElement) || !!(n.defaultView && n.defaultView.HTMLElement && e instanceof n.defaultView.HTMLElement) || null !== e && 1 === e.nodeType && "string" == typeof e.nodeName;
    },
    createElement: function (e, n) {
      var a = null,
          i = null;

      for (n = n || t.document, a = n.createDocumentFragment(), i = n.createElement("div"), i.innerHTML = e.trim(); i.firstChild;) a.appendChild(i.firstChild);

      return a;
    },
    removeWhitespace: function (t) {
      for (var e; t && "#text" === t.nodeName;) e = t, t = t.previousSibling, e.parentElement && e.parentElement.removeChild(e);
    },
    isEqualArray: function (t, e) {
      var n = t.length;
      if (n !== e.length) return !1;

      for (; n--;) if (t[n] !== e[n]) return !1;

      return !0;
    },
    deepEquals: function (t, e) {
      var n;

      if ("object" == typeof t && t && "object" == typeof e && e) {
        if (Object.keys(t).length !== Object.keys(e).length) return !1;

        for (n in t) if (!e.hasOwnProperty(n) || !this.deepEquals(t[n], e[n])) return !1;
      } else if (t !== e) return !1;

      return !0;
    },
    arrayShuffle: function (t) {
      for (var e = t.slice(), n = e.length, a = n, i = -1, o = []; a--;) i = ~~(Math.random() * n), o = e[a], e[a] = e[i], e[i] = o;

      return e;
    },
    arrayFromList: function (t) {
      var e, n;

      try {
        return Array.prototype.slice.call(t);
      } catch (a) {
        for (e = [], n = 0; n < t.length; n++) e.push(t[n]);

        return e;
      }
    },
    debounce: function (t, e, n) {
      var a;
      return function () {
        var i = this,
            o = arguments,
            r = n && !a,
            s = null;
        s = function () {
          a = null, n || t.apply(i, o);
        }, clearTimeout(a), a = setTimeout(s, e), r && t.apply(i, o);
      };
    },
    position: function (t) {
      for (var e = 0, n = 0, a = t; t;) e -= t.scrollLeft, n -= t.scrollTop, t === a && (e += t.offsetLeft, n += t.offsetTop, a = t.offsetParent), t = t.parentElement;

      return {
        x: e,
        y: n
      };
    },
    getHypotenuse: function (t, e) {
      var n = t.x - e.x,
          a = t.y - e.y;
      return n = n < 0 ? n * -1 : n, a = a < 0 ? a * -1 : a, Math.sqrt(Math.pow(n, 2) + Math.pow(a, 2));
    },
    getIntersectionRatio: function (t, e) {
      var n = t.width * t.height,
          a = -1,
          i = -1,
          o = -1,
          r = -1;
      return a = Math.max(0, Math.min(t.left + t.width, e.left + e.width) - Math.max(t.left, e.left)), i = Math.max(0, Math.min(t.top + t.height, e.top + e.height) - Math.max(t.top, e.top)), o = i * a, r = o / n;
    },
    closestParent: function (e, n, a, i) {
      var o = e.parentNode;
      if (i = i || t.document, a && e.matches(n)) return e;

      for (; o && o != i.body;) {
        if (o.matches && o.matches(n)) return o;
        if (!o.parentNode) return null;
        o = o.parentNode;
      }

      return null;
    },
    children: function (e, n, a) {
      var i = [],
          o = "";
      return a = a || t.doc, e && (e.id || (o = "Temp" + this.randomHexKey(), e.id = o), i = a.querySelectorAll("#" + e.id + " > " + n), o && e.removeAttribute("id")), i;
    },
    clean: function (t) {
      var e = [],
          n = -1;

      for (n = 0; n < t.length; n++) "" !== t[n] && e.push(t[n]);

      return e;
    },
    defer: function (n) {
      var a = null,
          i = null,
          o = null;
      return i = new this.Deferred(), e.features.has.promises ? i.promise = new Promise(function (t, e) {
        i.resolve = t, i.reject = e;
      }) : (o = t.jQuery || n.$) && "function" == typeof o.Deferred ? (a = o.Deferred(), i.promise = a.promise(), i.resolve = a.resolve, i.reject = a.reject) : t.console && console.warn(e.messages.warningNoPromiseImplementation()), i;
    },
    all: function (n, a) {
      var i = null;
      return e.features.has.promises ? Promise.all(n) : (i = t.jQuery || a.$) && "function" == typeof i.when ? i.when.apply(i, n).done(function () {
        return arguments;
      }) : (t.console && console.warn(e.messages.warningNoPromiseImplementation()), []);
    },
    getPrefix: function (t, e, a) {
      var i = -1,
          o = "";
      if (n.dashCase(e) in t.style) return "";

      for (i = 0; o = a[i]; i++) if (o + e in t.style) return o.toLowerCase();

      return "unsupported";
    },
    randomHex: function () {
      return ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6).toUpperCase();
    },
    getDocumentState: function (e) {
      return e = "object" == typeof e.body ? e : t.document, {
        scrollTop: t.pageYOffset,
        scrollLeft: t.pageXOffset,
        docHeight: e.documentElement.scrollHeight,
        docWidth: e.documentElement.scrollWidth,
        viewportHeight: e.documentElement.clientHeight,
        viewportWidth: e.documentElement.clientWidth
      };
    },
    bind: function (t, e) {
      return function () {
        return e.apply(t, arguments);
      };
    },
    isVisible: function (e) {
      var n = null;
      return !!e.offsetParent || (n = t.getComputedStyle(e), "fixed" === n.position && "hidden" !== n.visibility && "0" !== n.opacity);
    },
    seal: function (t) {
      "function" == typeof Object.seal && Object.seal(t);
    },
    freeze: function (t) {
      "function" == typeof Object.freeze && Object.freeze(t);
    },
    compareVersions: function (t, e) {
      var n = t.split("."),
          a = e.split("."),
          i = -1,
          o = -1,
          r = -1;

      for (r = 0; r < n.length; r++) {
        if (i = parseInt(n[r].replace(/[^\d.]/g, "")), o = parseInt(a[r].replace(/[^\d.]/g, "") || 0), o < i) return !1;
        if (o > i) return !0;
      }

      return !0;
    },
    Deferred: function () {
      this.promise = null, this.resolve = null, this.reject = null, this.id = n.randomHex();
    },
    isEmptyObject: function (t) {
      var e = "";
      if ("function" == typeof Object.keys) return 0 === Object.keys(t).length;

      for (e in t) if (t.hasOwnProperty(e)) return !1;

      return !0;
    },
    getClassname: function (t, e, n) {
      var a = "";
      return a += t.block, a.length && (a += t.delineatorElement), a += t["element" + this.pascalCase(e)], n ? (a.length && (a += t.delineatorModifier), a += n) : a;
    },
    getProperty: function (t, e) {
      var n = e.split("."),
          a = null,
          i = "",
          o = 0;
      if (!e) return t;

      for (a = function (t) {
        return t ? t[i] : null;
      }; o < n.length;) i = n[o], t = a(t), o++;

      return "undefined" != typeof t ? t : null;
    }
  }, e.h = n, e.Base = function () {}, e.Base.prototype = {
    constructor: e.Base,
    callActions: function (t, e) {
      var a = this,
          i = a.constructor.actions[t],
          o = "";
      if (i && !n.isEmptyObject(i)) for (o in i) i[o].apply(a, e);
    },
    callFilters: function (t, e, a) {
      var i = this,
          o = i.constructor.filters[t],
          r = e,
          s = "";
      if (!o || n.isEmptyObject(o)) return r;
      a = a || [];

      for (s in o) a = n.arrayFromList(a), a.unshift(r), r = o[s].apply(i, a);

      return r;
    }
  }, e.BaseStatic = function () {
    this.actions = {}, this.filters = {}, this.extend = function (t) {
      n.extend(this.prototype, t);
    }, this.registerAction = function (t, e, n) {
      (this.actions[t] = this.actions[t] || {})[e] = n;
    }, this.registerFilter = function (t, e, n) {
      (this.filters[t] = this.filters[t] || {})[e] = n;
    };
  }, e.Features = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.boxSizingPrefix = "", this.transformPrefix = "", this.transitionPrefix = "", this.boxSizingPrefix = "", this.transformProp = "", this.transformRule = "", this.transitionProp = "", this.perspectiveProp = "", this.perspectiveOriginProp = "", this.has = new e.Has(), this.canary = null, this.BOX_SIZING_PROP = "boxSizing", this.TRANSITION_PROP = "transition", this.TRANSFORM_PROP = "transform", this.PERSPECTIVE_PROP = "perspective", this.PERSPECTIVE_ORIGIN_PROP = "perspectiveOrigin", this.VENDORS = ["Webkit", "moz", "O", "ms"], this.TWEENABLE = ["opacity", "width", "height", "marginRight", "marginBottom", "x", "y", "scale", "translateX", "translateY", "translateZ", "rotateX", "rotateY", "rotateZ"], this.callActions("afterConstruct");
  }, e.BaseStatic.call(e.Features), e.Features.prototype = Object.create(e.Base.prototype), n.extend(e.Features.prototype, {
    constructor: e.Features,
    init: function () {
      var t = this;
      t.callActions("beforeInit", arguments), t.canary = document.createElement("div"), t.setPrefixes(), t.runTests(), t.callActions("beforeInit", arguments);
    },
    runTests: function () {
      var e = this;
      e.callActions("beforeRunTests", arguments), e.has.promises = "function" == typeof t.Promise, e.has.transitions = "unsupported" !== e.transitionPrefix, e.callActions("afterRunTests", arguments), n.freeze(e.has);
    },
    setPrefixes: function () {
      var t = this;
      t.callActions("beforeSetPrefixes", arguments), t.transitionPrefix = n.getPrefix(t.canary, "Transition", t.VENDORS), t.transformPrefix = n.getPrefix(t.canary, "Transform", t.VENDORS), t.boxSizingPrefix = n.getPrefix(t.canary, "BoxSizing", t.VENDORS), t.boxSizingProp = t.boxSizingPrefix ? t.boxSizingPrefix + n.pascalCase(t.BOX_SIZING_PROP) : t.BOX_SIZING_PROP, t.transitionProp = t.transitionPrefix ? t.transitionPrefix + n.pascalCase(t.TRANSITION_PROP) : t.TRANSITION_PROP, t.transformProp = t.transformPrefix ? t.transformPrefix + n.pascalCase(t.TRANSFORM_PROP) : t.TRANSFORM_PROP, t.transformRule = t.transformPrefix ? "-" + t.transformPrefix + "-" + t.TRANSFORM_PROP : t.TRANSFORM_PROP, t.perspectiveProp = t.transformPrefix ? t.transformPrefix + n.pascalCase(t.PERSPECTIVE_PROP) : t.PERSPECTIVE_PROP, t.perspectiveOriginProp = t.transformPrefix ? t.transformPrefix + n.pascalCase(t.PERSPECTIVE_ORIGIN_PROP) : t.PERSPECTIVE_ORIGIN_PROP, t.callActions("afterSetPrefixes", arguments);
    }
  }), e.Has = function () {
    this.transitions = !1, this.promises = !1, n.seal(this);
  }, e.features = new e.Features(), e.features.init(), e.ConfigAnimation = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.enable = !0, this.effects = "fade scale", this.effectsIn = "", this.effectsOut = "", this.duration = 600, this.easing = "ease", this.applyPerspective = !0, this.perspectiveDistance = "3000px", this.perspectiveOrigin = "50% 50%", this.queue = !0, this.queueLimit = 3, this.animateResizeContainer = !0, this.animateResizeTargets = !1, this.staggerSequence = null, this.reverseOut = !1, this.nudge = !0, this.clampHeight = !0, this.clampWidth = !0, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.ConfigAnimation), e.ConfigAnimation.prototype = Object.create(e.Base.prototype), e.ConfigAnimation.prototype.constructor = e.ConfigAnimation, e.ConfigBehavior = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.liveSort = !1, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.ConfigBehavior), e.ConfigBehavior.prototype = Object.create(e.Base.prototype), e.ConfigBehavior.prototype.constructor = e.ConfigBehavior, e.ConfigCallbacks = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.onMixStart = null, this.onMixBusy = null, this.onMixEnd = null, this.onMixFail = null, this.onMixClick = null, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.ConfigCallbacks), e.ConfigCallbacks.prototype = Object.create(e.Base.prototype), e.ConfigCallbacks.prototype.constructor = e.ConfigCallbacks, e.ConfigControls = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.enable = !0, this.live = !1, this.scope = "global", this.toggleLogic = "or", this.toggleDefault = "all", this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.ConfigControls), e.ConfigControls.prototype = Object.create(e.Base.prototype), e.ConfigControls.prototype.constructor = e.ConfigControls, e.ConfigClassNames = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.block = "mixitup", this.elementContainer = "container", this.elementFilter = "control", this.elementSort = "control", this.elementMultimix = "control", this.elementToggle = "control", this.modifierActive = "active", this.modifierDisabled = "disabled", this.modifierFailed = "failed", this.delineatorElement = "-", this.delineatorModifier = "-", this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.ConfigClassNames), e.ConfigClassNames.prototype = Object.create(e.Base.prototype), e.ConfigClassNames.prototype.constructor = e.ConfigClassNames, e.ConfigData = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.uidKey = "", this.dirtyCheck = !1, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.ConfigData), e.ConfigData.prototype = Object.create(e.Base.prototype), e.ConfigData.prototype.constructor = e.ConfigData, e.ConfigDebug = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.enable = !1, this.showWarnings = !0, this.fauxAsync = !1, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.ConfigDebug), e.ConfigDebug.prototype = Object.create(e.Base.prototype), e.ConfigDebug.prototype.constructor = e.ConfigDebug, e.ConfigLayout = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.allowNestedTargets = !0, this.containerClassName = "", this.siblingBefore = null, this.siblingAfter = null, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.ConfigLayout), e.ConfigLayout.prototype = Object.create(e.Base.prototype), e.ConfigLayout.prototype.constructor = e.ConfigLayout, e.ConfigLoad = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.filter = "all", this.sort = "default:asc", this.dataset = null, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.ConfigLoad), e.ConfigLoad.prototype = Object.create(e.Base.prototype), e.ConfigLoad.prototype.constructor = e.ConfigLoad, e.ConfigSelectors = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.target = ".mix", this.control = "", this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.ConfigSelectors), e.ConfigSelectors.prototype = Object.create(e.Base.prototype), e.ConfigSelectors.prototype.constructor = e.ConfigSelectors, e.ConfigRender = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.target = null, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.ConfigRender), e.ConfigRender.prototype = Object.create(e.Base.prototype), e.ConfigRender.prototype.constructor = e.ConfigRender, e.ConfigTemplates = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.ConfigTemplates), e.ConfigTemplates.prototype = Object.create(e.Base.prototype), e.ConfigTemplates.prototype.constructor = e.ConfigTemplates, e.Config = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.animation = new e.ConfigAnimation(), this.behavior = new e.ConfigBehavior(), this.callbacks = new e.ConfigCallbacks(), this.controls = new e.ConfigControls(), this.classNames = new e.ConfigClassNames(), this.data = new e.ConfigData(), this.debug = new e.ConfigDebug(), this.layout = new e.ConfigLayout(), this.load = new e.ConfigLoad(), this.selectors = new e.ConfigSelectors(), this.render = new e.ConfigRender(), this.templates = new e.ConfigTemplates(), this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.Config), e.Config.prototype = Object.create(e.Base.prototype), e.Config.prototype.constructor = e.Config, e.MixerDom = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.document = null, this.body = null, this.container = null, this.parent = null, this.targets = [], this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.MixerDom), e.MixerDom.prototype = Object.create(e.Base.prototype), e.MixerDom.prototype.constructor = e.MixerDom, e.UiClassNames = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.base = "", this.active = "", this.disabled = "", this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.UiClassNames), e.UiClassNames.prototype = Object.create(e.Base.prototype), e.UiClassNames.prototype.constructor = e.UiClassNames, e.CommandDataset = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.dataset = null, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.CommandDataset), e.CommandDataset.prototype = Object.create(e.Base.prototype), e.CommandDataset.prototype.constructor = e.CommandDataset, e.CommandMultimix = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.filter = null, this.sort = null, this.insert = null, this.remove = null, this.changeLayout = null, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.CommandMultimix), e.CommandMultimix.prototype = Object.create(e.Base.prototype), e.CommandMultimix.prototype.constructor = e.CommandMultimix, e.CommandFilter = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.selector = "", this.collection = null, this.action = "show", this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.CommandFilter), e.CommandFilter.prototype = Object.create(e.Base.prototype), e.CommandFilter.prototype.constructor = e.CommandFilter, e.CommandSort = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.sortString = "", this.attribute = "", this.order = "asc", this.collection = null, this.next = null, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.CommandSort), e.CommandSort.prototype = Object.create(e.Base.prototype), e.CommandSort.prototype.constructor = e.CommandSort, e.CommandInsert = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.index = 0, this.collection = [], this.position = "before", this.sibling = null, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.CommandInsert), e.CommandInsert.prototype = Object.create(e.Base.prototype), e.CommandInsert.prototype.constructor = e.CommandInsert, e.CommandRemove = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.targets = [], this.collection = [], this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.CommandRemove), e.CommandRemove.prototype = Object.create(e.Base.prototype), e.CommandRemove.prototype.constructor = e.CommandRemove, e.CommandChangeLayout = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.containerClassName = "", this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.CommandChangeLayout), e.CommandChangeLayout.prototype = Object.create(e.Base.prototype), e.CommandChangeLayout.prototype.constructor = e.CommandChangeLayout, e.ControlDefinition = function (t, a, i, o) {
    e.Base.call(this), this.callActions("beforeConstruct"), this.type = t, this.selector = a, this.live = i || !1, this.parent = o || "", this.callActions("afterConstruct"), n.freeze(this), n.seal(this);
  }, e.BaseStatic.call(e.ControlDefinition), e.ControlDefinition.prototype = Object.create(e.Base.prototype), e.ControlDefinition.prototype.constructor = e.ControlDefinition, e.controlDefinitions = [], e.controlDefinitions.push(new e.ControlDefinition("multimix", "[data-filter][data-sort]")), e.controlDefinitions.push(new e.ControlDefinition("filter", "[data-filter]")), e.controlDefinitions.push(new e.ControlDefinition("sort", "[data-sort]")), e.controlDefinitions.push(new e.ControlDefinition("toggle", "[data-toggle]")), e.Control = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.el = null, this.selector = "", this.bound = [], this.pending = -1, this.type = "", this.status = "inactive", this.filter = "", this.sort = "", this.canDisable = !1, this.handler = null, this.classNames = new e.UiClassNames(), this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.Control), e.Control.prototype = Object.create(e.Base.prototype), n.extend(e.Control.prototype, {
    constructor: e.Control,
    init: function (t, n, a) {
      var i = this;
      if (this.callActions("beforeInit", arguments), i.el = t, i.type = n, i.selector = a, i.selector) i.status = "live";else switch (i.canDisable = "boolean" == typeof i.el.disable, i.type) {
        case "filter":
          i.filter = i.el.getAttribute("data-filter");
          break;

        case "toggle":
          i.filter = i.el.getAttribute("data-toggle");
          break;

        case "sort":
          i.sort = i.el.getAttribute("data-sort");
          break;

        case "multimix":
          i.filter = i.el.getAttribute("data-filter"), i.sort = i.el.getAttribute("data-sort");
      }
      i.bindClick(), e.controls.push(i), this.callActions("afterInit", arguments);
    },
    isBound: function (t) {
      var e = this,
          n = !1;
      return this.callActions("beforeIsBound", arguments), n = e.bound.indexOf(t) > -1, e.callFilters("afterIsBound", n, arguments);
    },
    addBinding: function (t) {
      var e = this;
      this.callActions("beforeAddBinding", arguments), e.isBound() || e.bound.push(t), this.callActions("afterAddBinding", arguments);
    },
    removeBinding: function (t) {
      var n = this,
          a = -1;
      this.callActions("beforeRemoveBinding", arguments), (a = n.bound.indexOf(t)) > -1 && n.bound.splice(a, 1), n.bound.length < 1 && (n.unbindClick(), a = e.controls.indexOf(n), e.controls.splice(a, 1), "active" === n.status && n.renderStatus(n.el, "inactive")), this.callActions("afterRemoveBinding", arguments);
    },
    bindClick: function () {
      var t = this;
      this.callActions("beforeBindClick", arguments), t.handler = function (e) {
        t.handleClick(e);
      }, n.on(t.el, "click", t.handler), this.callActions("afterBindClick", arguments);
    },
    unbindClick: function () {
      var t = this;
      this.callActions("beforeUnbindClick", arguments), n.off(t.el, "click", t.handler), t.handler = null, this.callActions("afterUnbindClick", arguments);
    },
    handleClick: function (t) {
      var a = this,
          i = null,
          o = null,
          r = !1,
          s = void 0,
          l = {},
          c = null,
          u = [],
          f = -1;
      if (this.callActions("beforeHandleClick", arguments), this.pending = 0, o = a.bound[0], i = a.selector ? n.closestParent(t.target, o.config.selectors.control + a.selector, !0, o.dom.document) : a.el, !i) return void a.callActions("afterHandleClick", arguments);

      switch (a.type) {
        case "filter":
          l.filter = a.filter || i.getAttribute("data-filter");
          break;

        case "sort":
          l.sort = a.sort || i.getAttribute("data-sort");
          break;

        case "multimix":
          l.filter = a.filter || i.getAttribute("data-filter"), l.sort = a.sort || i.getAttribute("data-sort");
          break;

        case "toggle":
          l.filter = a.filter || i.getAttribute("data-toggle"), r = "live" === a.status ? n.hasClass(i, a.classNames.active) : "active" === a.status;
      }

      for (f = 0; f < a.bound.length; f++) c = new e.CommandMultimix(), n.extend(c, l), u.push(c);

      for (u = a.callFilters("commandsHandleClick", u, arguments), a.pending = a.bound.length, f = 0; o = a.bound[f]; f++) l = u[f], l && (o.lastClicked || (o.lastClicked = i), e.events.fire("mixClick", o.dom.container, {
        state: o.state,
        instance: o,
        originalEvent: t,
        control: o.lastClicked
      }, o.dom.document), "function" == typeof o.config.callbacks.onMixClick && (s = o.config.callbacks.onMixClick.call(o.lastClicked, o.state, t, o), s === !1) || ("toggle" === a.type ? r ? o.toggleOff(l.filter) : o.toggleOn(l.filter) : o.multimix(l)));

      this.callActions("afterHandleClick", arguments);
    },
    update: function (t, n) {
      var a = this,
          i = new e.CommandMultimix();
      a.callActions("beforeUpdate", arguments), a.pending--, a.pending = Math.max(0, a.pending), a.pending > 0 || ("live" === a.status ? a.updateLive(t, n) : (i.sort = a.sort, i.filter = a.filter, a.callFilters("actionsUpdate", i, arguments), a.parseStatusChange(a.el, t, i, n)), a.callActions("afterUpdate", arguments));
    },
    updateLive: function (t, n) {
      var a = this,
          i = null,
          o = null,
          r = null,
          s = -1;

      if (a.callActions("beforeUpdateLive", arguments), a.el) {
        for (i = a.el.querySelectorAll(a.selector), s = 0; r = i[s]; s++) {
          switch (o = new e.CommandMultimix(), a.type) {
            case "filter":
              o.filter = r.getAttribute("data-filter");
              break;

            case "sort":
              o.sort = r.getAttribute("data-sort");
              break;

            case "multimix":
              o.filter = r.getAttribute("data-filter"), o.sort = r.getAttribute("data-sort");
              break;

            case "toggle":
              o.filter = r.getAttribute("data-toggle");
          }

          o = a.callFilters("actionsUpdateLive", o, arguments), a.parseStatusChange(r, t, o, n);
        }

        a.callActions("afterUpdateLive", arguments);
      }
    },
    parseStatusChange: function (t, e, n, a) {
      var i = this,
          o = "",
          r = "",
          s = -1;

      switch (i.callActions("beforeParseStatusChange", arguments), i.type) {
        case "filter":
          e.filter === n.filter ? i.renderStatus(t, "active") : i.renderStatus(t, "inactive");
          break;

        case "multimix":
          e.sort === n.sort && e.filter === n.filter ? i.renderStatus(t, "active") : i.renderStatus(t, "inactive");
          break;

        case "sort":
          e.sort.match(/:asc/g) && (o = e.sort.replace(/:asc/g, "")), e.sort === n.sort || o === n.sort ? i.renderStatus(t, "active") : i.renderStatus(t, "inactive");
          break;

        case "toggle":
          for (a.length < 1 && i.renderStatus(t, "inactive"), e.filter === n.filter && i.renderStatus(t, "active"), s = 0; s < a.length; s++) {
            if (r = a[s], r === n.filter) {
              i.renderStatus(t, "active");
              break;
            }

            i.renderStatus(t, "inactive");
          }

      }

      i.callActions("afterParseStatusChange", arguments);
    },
    renderStatus: function (t, e) {
      var a = this;

      switch (a.callActions("beforeRenderStatus", arguments), e) {
        case "active":
          n.addClass(t, a.classNames.active), n.removeClass(t, a.classNames.disabled), a.canDisable && (a.el.disabled = !1);
          break;

        case "inactive":
          n.removeClass(t, a.classNames.active), n.removeClass(t, a.classNames.disabled), a.canDisable && (a.el.disabled = !1);
          break;

        case "disabled":
          a.canDisable && (a.el.disabled = !0), n.addClass(t, a.classNames.disabled), n.removeClass(t, a.classNames.active);
      }

      "live" !== a.status && (a.status = e), a.callActions("afterRenderStatus", arguments);
    }
  }), e.controls = [], e.StyleData = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.x = 0, this.y = 0, this.top = 0, this.right = 0, this.bottom = 0, this.left = 0, this.width = 0, this.height = 0, this.marginRight = 0, this.marginBottom = 0, this.opacity = 0, this.scale = new e.TransformData(), this.translateX = new e.TransformData(), this.translateY = new e.TransformData(), this.translateZ = new e.TransformData(), this.rotateX = new e.TransformData(), this.rotateY = new e.TransformData(), this.rotateZ = new e.TransformData(), this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.StyleData), e.StyleData.prototype = Object.create(e.Base.prototype), e.StyleData.prototype.constructor = e.StyleData, e.TransformData = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.value = 0, this.unit = "", this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.TransformData), e.TransformData.prototype = Object.create(e.Base.prototype), e.TransformData.prototype.constructor = e.TransformData, e.TransformDefaults = function () {
    e.StyleData.apply(this), this.callActions("beforeConstruct"), this.scale.value = .01, this.scale.unit = "", this.translateX.value = 20, this.translateX.unit = "px", this.translateY.value = 20, this.translateY.unit = "px", this.translateZ.value = 20, this.translateZ.unit = "px", this.rotateX.value = 90, this.rotateX.unit = "deg", this.rotateY.value = 90, this.rotateY.unit = "deg", this.rotateX.value = 90, this.rotateX.unit = "deg", this.rotateZ.value = 180, this.rotateZ.unit = "deg", this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.TransformDefaults), e.TransformDefaults.prototype = Object.create(e.StyleData.prototype), e.TransformDefaults.prototype.constructor = e.TransformDefaults, e.transformDefaults = new e.TransformDefaults(), e.EventDetail = function () {
    this.state = null, this.futureState = null, this.instance = null, this.originalEvent = null;
  }, e.Events = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.mixStart = null, this.mixBusy = null, this.mixEnd = null, this.mixFail = null, this.mixClick = null, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.Events), e.Events.prototype = Object.create(e.Base.prototype), e.Events.prototype.constructor = e.Events, e.Events.prototype.fire = function (t, a, i, o) {
    var r = this,
        s = null,
        l = new e.EventDetail();
    if (r.callActions("beforeFire", arguments), "undefined" == typeof r[t]) throw new Error('Event type "' + t + '" not found.');
    l.state = new e.State(), n.extend(l.state, i.state), i.futureState && (l.futureState = new e.State(), n.extend(l.futureState, i.futureState)), l.instance = i.instance, i.originalEvent && (l.originalEvent = i.originalEvent), s = n.getCustomEvent(t, l, o), r.callFilters("eventFire", s, arguments), a.dispatchEvent(s);
  }, e.events = new e.Events(), e.QueueItem = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.args = [], this.instruction = null, this.triggerElement = null, this.deferred = null, this.isToggling = !1, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.QueueItem), e.QueueItem.prototype = Object.create(e.Base.prototype), e.QueueItem.prototype.constructor = e.QueueItem, e.Mixer = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.config = new e.Config(), this.id = "", this.isBusy = !1, this.isToggling = !1, this.incPadding = !0, this.controls = [], this.targets = [], this.origOrder = [], this.cache = {}, this.toggleArray = [], this.targetsMoved = 0, this.targetsImmovable = 0, this.targetsBound = 0, this.targetsDone = 0, this.staggerDuration = 0, this.effectsIn = null, this.effectsOut = null, this.transformIn = [], this.transformOut = [], this.queue = [], this.state = null, this.lastOperation = null, this.lastClicked = null, this.userCallback = null, this.userDeferred = null, this.dom = new e.MixerDom(), this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.Mixer), e.Mixer.prototype = Object.create(e.Base.prototype), n.extend(e.Mixer.prototype, {
    constructor: e.Mixer,
    attach: function (a, i, o, r) {
      var s = this,
          l = null,
          c = -1;

      for (s.callActions("beforeAttach", arguments), s.id = o, r && n.extend(s.config, r, !0, !0), s.sanitizeConfig(), s.cacheDom(a, i), s.config.layout.containerClassName && n.addClass(s.dom.container, s.config.layout.containerClassName), e.features.has.transitions || (s.config.animation.enable = !1), "undefined" == typeof t.console && (s.config.debug.showWarnings = !1), s.config.data.uidKey && (s.config.controls.enable = !1), s.indexTargets(), s.state = s.getInitialState(), c = 0; l = s.lastOperation.toHide[c]; c++) l.hide();

      s.config.controls.enable && (s.initControls(), s.buildToggleArray(null, s.state), s.updateControls({
        filter: s.state.activeFilter,
        sort: s.state.activeSort
      })), s.parseEffects(), s.callActions("afterAttach", arguments);
    },
    sanitizeConfig: function () {
      var t = this;
      t.callActions("beforeSanitizeConfig", arguments), t.config.controls.scope = t.config.controls.scope.toLowerCase().trim(), t.config.controls.toggleLogic = t.config.controls.toggleLogic.toLowerCase().trim(), t.config.controls.toggleDefault = t.config.controls.toggleDefault.toLowerCase().trim(), t.config.animation.effects = t.config.animation.effects.trim(), t.callActions("afterSanitizeConfig", arguments);
    },
    getInitialState: function () {
      var t = this,
          n = new e.State(),
          a = new e.Operation();

      if (t.callActions("beforeGetInitialState", arguments), n.activeContainerClassName = t.config.layout.containerClassName, t.config.load.dataset) {
        if (!t.config.data.uidKey || "string" != typeof t.config.data.uidKey) throw new TypeError(e.messages.errorConfigDataUidKeyNotSet());
        a.startDataset = a.newDataset = n.activeDataset = t.config.load.dataset.slice(), a.startContainerClassName = a.newContainerClassName = n.activeContainerClassName, a.show = t.targets.slice(), n = t.callFilters("stateGetInitialState", n, arguments);
      } else n.activeFilter = t.parseFilterArgs([t.config.load.filter]).command, n.activeSort = t.parseSortArgs([t.config.load.sort]).command, n.totalTargets = t.targets.length, n = t.callFilters("stateGetInitialState", n, arguments), n.activeSort.collection || n.activeSort.attribute || "random" === n.activeSort.order || "desc" === n.activeSort.order ? (a.newSort = n.activeSort, t.sortOperation(a), t.printSort(!1, a), t.targets = a.newOrder) : a.startOrder = a.newOrder = t.targets, a.startFilter = a.newFilter = n.activeFilter, a.startSort = a.newSort = n.activeSort, a.startContainerClassName = a.newContainerClassName = n.activeContainerClassName, "all" === a.newFilter.selector ? a.newFilter.selector = t.config.selectors.target : "none" === a.newFilter.selector && (a.newFilter.selector = "");

      return a = t.callFilters("operationGetInitialState", a, [n]), t.lastOperation = a, a.newFilter && t.filterOperation(a), n = t.buildState(a);
    },
    cacheDom: function (t, e) {
      var n = this;
      n.callActions("beforeCacheDom", arguments), n.dom.document = e, n.dom.body = n.dom.document.querySelector("body"), n.dom.container = t, n.dom.parent = t, n.callActions("afterCacheDom", arguments);
    },
    indexTargets: function () {
      var t = this,
          a = null,
          i = null,
          o = null,
          r = -1;
      if (t.callActions("beforeIndexTargets", arguments), t.dom.targets = t.config.layout.allowNestedTargets ? t.dom.container.querySelectorAll(t.config.selectors.target) : n.children(t.dom.container, t.config.selectors.target, t.dom.document), t.dom.targets = n.arrayFromList(t.dom.targets), t.targets = [], (o = t.config.load.dataset) && o.length !== t.dom.targets.length) throw new Error(e.messages.errorDatasetPrerenderedMismatch());

      if (t.dom.targets.length) {
        for (r = 0; i = t.dom.targets[r]; r++) a = new e.Target(), a.init(i, t, o ? o[r] : void 0), a.isInDom = !0, t.targets.push(a);

        t.dom.parent = t.dom.targets[0].parentElement === t.dom.container ? t.dom.container : t.dom.targets[0].parentElement;
      }

      t.origOrder = t.targets, t.callActions("afterIndexTargets", arguments);
    },
    initControls: function () {
      var t = this,
          n = "",
          a = null,
          i = null,
          o = null,
          r = null,
          s = null,
          l = -1,
          c = -1;

      switch (t.callActions("beforeInitControls", arguments), t.config.controls.scope) {
        case "local":
          o = t.dom.container;
          break;

        case "global":
          o = t.dom.document;
          break;

        default:
          throw new Error(e.messages.errorConfigInvalidControlsScope());
      }

      for (l = 0; n = e.controlDefinitions[l]; l++) if (t.config.controls.live || n.live) {
        if (n.parent) {
          if (r = t.dom[n.parent], !r || r.length < 0) continue;
          "number" != typeof r.length && (r = [r]);
        } else r = [o];

        for (c = 0; i = r[c]; c++) s = t.getControl(i, n.type, n.selector), t.controls.push(s);
      } else for (a = o.querySelectorAll(t.config.selectors.control + n.selector), c = 0; i = a[c]; c++) s = t.getControl(i, n.type, ""), s && t.controls.push(s);

      t.callActions("afterInitControls", arguments);
    },
    getControl: function (t, a, i) {
      var o = this,
          r = null,
          s = -1;
      if (o.callActions("beforeGetControl", arguments), !i) for (s = 0; r = e.controls[s]; s++) {
        if (r.el === t && r.isBound(o)) return o.callFilters("controlGetControl", null, arguments);
        if (r.el === t && r.type === a && r.selector === i) return r.addBinding(o), o.callFilters("controlGetControl", r, arguments);
      }
      return r = new e.Control(), r.init(t, a, i), r.classNames.base = n.getClassname(o.config.classNames, a), r.classNames.active = n.getClassname(o.config.classNames, a, o.config.classNames.modifierActive), r.classNames.disabled = n.getClassname(o.config.classNames, a, o.config.classNames.modifierDisabled), r.addBinding(o), o.callFilters("controlGetControl", r, arguments);
    },
    getToggleSelector: function () {
      var t = this,
          e = "or" === t.config.controls.toggleLogic ? ", " : "",
          a = "";
      return t.callActions("beforeGetToggleSelector", arguments), t.toggleArray = n.clean(t.toggleArray), a = t.toggleArray.join(e), "" === a && (a = t.config.controls.toggleDefault), t.callFilters("selectorGetToggleSelector", a, arguments);
    },
    buildToggleArray: function (t, e) {
      var a = this,
          i = "";
      if (a.callActions("beforeBuildToggleArray", arguments), t && t.filter) i = t.filter.selector.replace(/\s/g, "");else {
        if (!e) return;
        i = e.activeFilter.selector.replace(/\s/g, "");
      }
      i !== a.config.selectors.target && "all" !== i || (i = ""), "or" === a.config.controls.toggleLogic ? a.toggleArray = i.split(",") : a.toggleArray = a.splitCompoundSelector(i), a.toggleArray = n.clean(a.toggleArray), a.callActions("afterBuildToggleArray", arguments);
    },
    splitCompoundSelector: function (t) {
      var e = t.split(/([\.\[])/g),
          n = [],
          a = "",
          i = -1;

      for ("" === e[0] && e.shift(), i = 0; i < e.length; i++) i % 2 === 0 && (a = ""), a += e[i], i % 2 !== 0 && n.push(a);

      return n;
    },
    updateControls: function (t) {
      var a = this,
          i = null,
          o = new e.CommandMultimix(),
          r = -1;

      for (a.callActions("beforeUpdateControls", arguments), t.filter ? o.filter = t.filter.selector : o.filter = a.state.activeFilter.selector, t.sort ? o.sort = a.buildSortString(t.sort) : o.sort = a.buildSortString(a.state.activeSort), o.filter === a.config.selectors.target && (o.filter = "all"), "" === o.filter && (o.filter = "none"), n.freeze(o), r = 0; i = a.controls[r]; r++) i.update(o, a.toggleArray);

      a.callActions("afterUpdateControls", arguments);
    },
    buildSortString: function (t) {
      var e = this,
          n = "";
      return n += t.sortString, t.next && (n += " " + e.buildSortString(t.next)), n;
    },
    insertTargets: function (t, a) {
      var i = this,
          o = null,
          r = -1,
          s = null,
          l = null,
          c = null,
          u = -1;

      if (i.callActions("beforeInsertTargets", arguments), "undefined" == typeof t.index && (t.index = 0), o = i.getNextSibling(t.index, t.sibling, t.position), s = i.dom.document.createDocumentFragment(), r = o ? n.index(o, i.config.selectors.target) : i.targets.length, t.collection) {
        for (u = 0; c = t.collection[u]; u++) {
          if (i.dom.targets.indexOf(c) > -1) throw new Error(e.messages.errorInsertPreexistingElement());
          c.style.display = "none", s.appendChild(c), s.appendChild(i.dom.document.createTextNode(" ")), n.isElement(c, i.dom.document) && c.matches(i.config.selectors.target) && (l = new e.Target(), l.init(c, i), l.isInDom = !0, i.targets.splice(r, 0, l), r++);
        }

        i.dom.parent.insertBefore(s, o);
      }

      a.startOrder = i.origOrder = i.targets, i.callActions("afterInsertTargets", arguments);
    },
    getNextSibling: function (t, e, n) {
      var a = this,
          i = null;
      return t = Math.max(t, 0), e && "before" === n ? i = e : e && "after" === n ? i = e.nextElementSibling || null : a.targets.length > 0 && "undefined" != typeof t ? i = t < a.targets.length || !a.targets.length ? a.targets[t].dom.el : a.targets[a.targets.length - 1].dom.el.nextElementSibling : 0 === a.targets.length && a.dom.parent.children.length > 0 && (a.config.layout.siblingAfter ? i = a.config.layout.siblingAfter : a.config.layout.siblingBefore ? i = a.config.layout.siblingBefore.nextElementSibling : a.dom.parent.children[0]), a.callFilters("elementGetNextSibling", i, arguments);
    },
    filterOperation: function (t) {
      var e = this,
          n = !1,
          a = -1,
          i = "",
          o = null,
          r = -1;

      for (e.callActions("beforeFilterOperation", arguments), i = t.newFilter.action, r = 0; o = t.newOrder[r]; r++) n = t.newFilter.collection ? t.newFilter.collection.indexOf(o.dom.el) > -1 : "" !== t.newFilter.selector && o.dom.el.matches(t.newFilter.selector), e.evaluateHideShow(n, o, i, t);

      if (t.toRemove.length) for (r = 0; o = t.show[r]; r++) t.toRemove.indexOf(o) > -1 && (t.show.splice(r, 1), (a = t.toShow.indexOf(o)) > -1 && t.toShow.splice(a, 1), t.toHide.push(o), t.hide.push(o), r--);
      t.matching = t.show.slice(), 0 === t.show.length && "" !== t.newFilter.selector && 0 !== e.targets.length && (t.hasFailed = !0), e.callActions("afterFilterOperation", arguments);
    },
    evaluateHideShow: function (t, e, n, a) {
      var i = this,
          o = !1,
          r = Array.prototype.slice.call(arguments, 1);
      o = i.callFilters("testResultEvaluateHideShow", t, r), i.callActions("beforeEvaluateHideShow", arguments), o === !0 && "show" === n || o === !1 && "hide" === n ? (a.show.push(e), !e.isShown && a.toShow.push(e)) : (a.hide.push(e), e.isShown && a.toHide.push(e)), i.callActions("afterEvaluateHideShow", arguments);
    },
    sortOperation: function (t) {
      var a = this,
          i = [],
          o = null,
          r = null,
          s = -1;

      if (a.callActions("beforeSortOperation", arguments), t.startOrder = a.targets, t.newSort.collection) {
        for (i = [], s = 0; r = t.newSort.collection[s]; s++) {
          if (a.dom.targets.indexOf(r) < 0) throw new Error(e.messages.errorSortNonExistentElement());
          o = new e.Target(), o.init(r, a), o.isInDom = !0, i.push(o);
        }

        t.newOrder = i;
      } else "random" === t.newSort.order ? t.newOrder = n.arrayShuffle(t.startOrder) : "" === t.newSort.attribute ? (t.newOrder = a.origOrder.slice(), "desc" === t.newSort.order && t.newOrder.reverse()) : (t.newOrder = t.startOrder.slice(), t.newOrder.sort(function (e, n) {
        return a.compare(e, n, t.newSort);
      }));

      n.isEqualArray(t.newOrder, t.startOrder) && (t.willSort = !1), a.callActions("afterSortOperation", arguments);
    },
    compare: function (t, e, n) {
      var a = this,
          i = n.order,
          o = a.getAttributeValue(t, n.attribute),
          r = a.getAttributeValue(e, n.attribute);
      return isNaN(1 * o) || isNaN(1 * r) ? (o = o.toLowerCase(), r = r.toLowerCase()) : (o = 1 * o, r = 1 * r), o < r ? "asc" === i ? -1 : 1 : o > r ? "asc" === i ? 1 : -1 : o === r && n.next ? a.compare(t, e, n.next) : 0;
    },
    getAttributeValue: function (t, n) {
      var a = this,
          i = "";
      return i = t.dom.el.getAttribute("data-" + n), null === i && a.config.debug.showWarnings && console.warn(e.messages.warningInconsistentSortingAttributes({
        attribute: "data-" + n
      })), a.callFilters("valueGetAttributeValue", i || 0, arguments);
    },
    printSort: function (e, a) {
      var i = this,
          o = e ? a.newOrder : a.startOrder,
          r = e ? a.startOrder : a.newOrder,
          s = o.length ? o[o.length - 1].dom.el.nextElementSibling : null,
          l = t.document.createDocumentFragment(),
          c = null,
          u = null,
          f = null,
          h = -1;

      for (i.callActions("beforePrintSort", arguments), h = 0; u = o[h]; h++) f = u.dom.el, "absolute" !== f.style.position && (n.removeWhitespace(f.previousSibling), f.parentElement.removeChild(f));

      for (c = s ? s.previousSibling : i.dom.parent.lastChild, c && "#text" === c.nodeName && n.removeWhitespace(c), h = 0; u = r[h]; h++) f = u.dom.el, n.isElement(l.lastChild) && l.appendChild(t.document.createTextNode(" ")), l.appendChild(f);

      i.dom.parent.firstChild && i.dom.parent.firstChild !== s && l.insertBefore(t.document.createTextNode(" "), l.childNodes[0]), s ? (l.appendChild(t.document.createTextNode(" ")), i.dom.parent.insertBefore(l, s)) : i.dom.parent.appendChild(l), i.callActions("afterPrintSort", arguments);
    },
    parseSortString: function (t, a) {
      var i = this,
          o = t.split(" "),
          r = a,
          s = [],
          l = -1;

      for (l = 0; l < o.length; l++) {
        switch (s = o[l].split(":"), r.sortString = o[l], r.attribute = n.dashCase(s[0]), r.order = s[1] || "asc", r.attribute) {
          case "default":
            r.attribute = "";
            break;

          case "random":
            r.attribute = "", r.order = "random";
        }

        if (!r.attribute || "random" === r.order) break;
        l < o.length - 1 && (r.next = new e.CommandSort(), n.freeze(r), r = r.next);
      }

      return i.callFilters("commandsParseSort", a, arguments);
    },
    parseEffects: function () {
      var t = this,
          n = "",
          a = t.config.animation.effectsIn || t.config.animation.effects,
          i = t.config.animation.effectsOut || t.config.animation.effects;
      t.callActions("beforeParseEffects", arguments), t.effectsIn = new e.StyleData(), t.effectsOut = new e.StyleData(), t.transformIn = [], t.transformOut = [], t.effectsIn.opacity = t.effectsOut.opacity = 1, t.parseEffect("fade", a, t.effectsIn, t.transformIn), t.parseEffect("fade", i, t.effectsOut, t.transformOut, !0);

      for (n in e.transformDefaults) e.transformDefaults[n] instanceof e.TransformData && (t.parseEffect(n, a, t.effectsIn, t.transformIn), t.parseEffect(n, i, t.effectsOut, t.transformOut, !0));

      t.parseEffect("stagger", a, t.effectsIn, t.transformIn), t.parseEffect("stagger", i, t.effectsOut, t.transformOut, !0), t.callActions("afterParseEffects", arguments);
    },
    parseEffect: function (t, n, a, i, o) {
      var r = this,
          s = /\(([^)]+)\)/,
          l = -1,
          c = "",
          u = [],
          f = "",
          h = ["%", "px", "em", "rem", "vh", "vw", "deg"],
          d = "",
          m = -1;
      if (r.callActions("beforeParseEffect", arguments), "string" != typeof n) throw new TypeError(e.messages.errorConfigInvalidAnimationEffects());
      if (n.indexOf(t) < 0) return void ("stagger" === t && (r.staggerDuration = 0));

      switch (l = n.indexOf(t + "("), l > -1 && (c = n.substring(l), u = s.exec(c), f = u[1]), t) {
        case "fade":
          a.opacity = f ? parseFloat(f) : 0;
          break;

        case "stagger":
          r.staggerDuration = f ? parseFloat(f) : 100;
          break;

        default:
          if (o && r.config.animation.reverseOut && "scale" !== t ? a[t].value = (f ? parseFloat(f) : e.transformDefaults[t].value) * -1 : a[t].value = f ? parseFloat(f) : e.transformDefaults[t].value, f) {
            for (m = 0; d = h[m]; m++) if (f.indexOf(d) > -1) {
              a[t].unit = d;
              break;
            }
          } else a[t].unit = e.transformDefaults[t].unit;

          i.push(t + "(" + a[t].value + a[t].unit + ")");
      }

      r.callActions("afterParseEffect", arguments);
    },
    buildState: function (t) {
      var n = this,
          a = new e.State(),
          i = null,
          o = -1;

      for (n.callActions("beforeBuildState", arguments), o = 0; i = n.targets[o]; o++) (!t.toRemove.length || t.toRemove.indexOf(i) < 0) && a.targets.push(i.dom.el);

      for (o = 0; i = t.matching[o]; o++) a.matching.push(i.dom.el);

      for (o = 0; i = t.show[o]; o++) a.show.push(i.dom.el);

      for (o = 0; i = t.hide[o]; o++) (!t.toRemove.length || t.toRemove.indexOf(i) < 0) && a.hide.push(i.dom.el);

      return a.id = n.id, a.container = n.dom.container, a.activeFilter = t.newFilter, a.activeSort = t.newSort, a.activeDataset = t.newDataset, a.activeContainerClassName = t.newContainerClassName, a.hasFailed = t.hasFailed, a.totalTargets = n.targets.length, a.totalShow = t.show.length, a.totalHide = t.hide.length, a.totalMatching = t.matching.length, a.triggerElement = t.triggerElement, n.callFilters("stateBuildState", a, arguments);
    },
    goMix: function (a, i) {
      var o = this,
          r = null;
      return o.callActions("beforeGoMix", arguments), o.config.animation.duration && o.config.animation.effects && n.isVisible(o.dom.container) || (a = !1), i.toShow.length || i.toHide.length || i.willSort || i.willChangeLayout || (a = !1), i.startState.show.length || i.show.length || (a = !1), e.events.fire("mixStart", o.dom.container, {
        state: i.startState,
        futureState: i.newState,
        instance: o
      }, o.dom.document), "function" == typeof o.config.callbacks.onMixStart && o.config.callbacks.onMixStart.call(o.dom.container, i.startState, i.newState, o), n.removeClass(o.dom.container, n.getClassname(o.config.classNames, "container", o.config.classNames.modifierFailed)), r = o.userDeferred ? o.userDeferred : o.userDeferred = n.defer(e.libraries), o.isBusy = !0, a && e.features.has.transitions ? (t.pageYOffset !== i.docState.scrollTop && t.scrollTo(i.docState.scrollLeft, i.docState.scrollTop), o.config.animation.applyPerspective && (o.dom.parent.style[e.features.perspectiveProp] = o.config.animation.perspectiveDistance, o.dom.parent.style[e.features.perspectiveOriginProp] = o.config.animation.perspectiveOrigin), o.config.animation.animateResizeContainer && i.startHeight !== i.newHeight && i.viewportDeltaY !== i.startHeight - i.newHeight && (o.dom.parent.style.height = i.startHeight + "px"), o.config.animation.animateResizeContainer && i.startWidth !== i.newWidth && i.viewportDeltaX !== i.startWidth - i.newWidth && (o.dom.parent.style.width = i.startWidth + "px"), i.startHeight === i.newHeight && (o.dom.parent.style.height = i.startHeight + "px"), i.startWidth === i.newWidth && (o.dom.parent.style.width = i.startWidth + "px"), i.startHeight === i.newHeight && i.startWidth === i.newWidth && (o.dom.parent.style.overflow = "hidden"), requestAnimationFrame(function () {
        o.moveTargets(i);
      }), o.callFilters("promiseGoMix", r.promise, arguments)) : (o.config.debug.fauxAsync ? setTimeout(function () {
        o.cleanUp(i);
      }, o.config.animation.duration) : o.cleanUp(i), o.callFilters("promiseGoMix", r.promise, arguments));
    },
    getStartMixData: function (n) {
      var a = this,
          i = t.getComputedStyle(a.dom.parent),
          o = a.dom.parent.getBoundingClientRect(),
          r = null,
          s = {},
          l = -1,
          c = i[e.features.boxSizingProp];

      for (a.incPadding = "border-box" === c, a.callActions("beforeGetStartMixData", arguments), l = 0; r = n.show[l]; l++) s = r.getPosData(), n.showPosData[l] = {
        startPosData: s
      };

      for (l = 0; r = n.toHide[l]; l++) s = r.getPosData(), n.toHidePosData[l] = {
        startPosData: s
      };

      n.startX = o.left, n.startY = o.top, n.startHeight = a.incPadding ? o.height : o.height - parseFloat(i.paddingTop) - parseFloat(i.paddingBottom) - parseFloat(i.borderTop) - parseFloat(i.borderBottom), n.startWidth = a.incPadding ? o.width : o.width - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight) - parseFloat(i.borderLeft) - parseFloat(i.borderRight), a.callActions("afterGetStartMixData", arguments);
    },
    setInter: function (t) {
      var e = this,
          a = null,
          i = -1;

      for (e.callActions("beforeSetInter", arguments), e.config.animation.clampHeight && (e.dom.parent.style.height = t.startHeight + "px", e.dom.parent.style.overflow = "hidden"), e.config.animation.clampWidth && (e.dom.parent.style.width = t.startWidth + "px", e.dom.parent.style.overflow = "hidden"), i = 0; a = t.toShow[i]; i++) a.show();

      t.willChangeLayout && (n.removeClass(e.dom.container, t.startContainerClassName), n.addClass(e.dom.container, t.newContainerClassName)), e.callActions("afterSetInter", arguments);
    },
    getInterMixData: function (t) {
      var e = this,
          n = null,
          a = -1;

      for (e.callActions("beforeGetInterMixData", arguments), a = 0; n = t.show[a]; a++) t.showPosData[a].interPosData = n.getPosData();

      for (a = 0; n = t.toHide[a]; a++) t.toHidePosData[a].interPosData = n.getPosData();

      e.callActions("afterGetInterMixData", arguments);
    },
    setFinal: function (t) {
      var e = this,
          n = null,
          a = -1;

      for (e.callActions("beforeSetFinal", arguments), t.willSort && e.printSort(!1, t), a = 0; n = t.toHide[a]; a++) n.hide();

      e.callActions("afterSetFinal", arguments);
    },
    getFinalMixData: function (e) {
      var a = this,
          i = null,
          o = null,
          r = null,
          s = -1;

      for (a.callActions("beforeGetFinalMixData", arguments), s = 0; r = e.show[s]; s++) e.showPosData[s].finalPosData = r.getPosData();

      for (s = 0; r = e.toHide[s]; s++) e.toHidePosData[s].finalPosData = r.getPosData();

      for ((a.config.animation.clampHeight || a.config.animation.clampWidth) && (a.dom.parent.style.height = a.dom.parent.style.width = a.dom.parent.style.overflow = ""), a.incPadding || (i = t.getComputedStyle(a.dom.parent)), o = a.dom.parent.getBoundingClientRect(), e.newX = o.left, e.newY = o.top, e.newHeight = a.incPadding ? o.height : o.height - parseFloat(i.paddingTop) - parseFloat(i.paddingBottom) - parseFloat(i.borderTop) - parseFloat(i.borderBottom), e.newWidth = a.incPadding ? o.width : o.width - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight) - parseFloat(i.borderLeft) - parseFloat(i.borderRight), e.viewportDeltaX = e.docState.viewportWidth - this.dom.document.documentElement.clientWidth, e.viewportDeltaY = e.docState.viewportHeight - this.dom.document.documentElement.clientHeight, e.willSort && a.printSort(!0, e), s = 0; r = e.toShow[s]; s++) r.hide();

      for (s = 0; r = e.toHide[s]; s++) r.show();

      e.willChangeLayout && (n.removeClass(a.dom.container, e.newContainerClassName), n.addClass(a.dom.container, a.config.layout.containerClassName)), a.callActions("afterGetFinalMixData", arguments);
    },
    getTweenData: function (t) {
      var n = this,
          a = null,
          i = null,
          o = Object.getOwnPropertyNames(n.effectsIn),
          r = "",
          s = null,
          l = -1,
          c = -1,
          u = -1,
          f = -1;

      for (n.callActions("beforeGetTweenData", arguments), u = 0; a = t.show[u]; u++) for (i = t.showPosData[u], i.posIn = new e.StyleData(), i.posOut = new e.StyleData(), i.tweenData = new e.StyleData(), a.isShown ? (i.posIn.x = i.startPosData.x - i.interPosData.x, i.posIn.y = i.startPosData.y - i.interPosData.y) : i.posIn.x = i.posIn.y = 0, i.posOut.x = i.finalPosData.x - i.interPosData.x, i.posOut.y = i.finalPosData.y - i.interPosData.y, i.posIn.opacity = a.isShown ? 1 : n.effectsIn.opacity, i.posOut.opacity = 1, i.tweenData.opacity = i.posOut.opacity - i.posIn.opacity, a.isShown || n.config.animation.nudge || (i.posIn.x = i.posOut.x, i.posIn.y = i.posOut.y), i.tweenData.x = i.posOut.x - i.posIn.x, i.tweenData.y = i.posOut.y - i.posIn.y, n.config.animation.animateResizeTargets && (i.posIn.width = i.startPosData.width, i.posIn.height = i.startPosData.height, l = (i.startPosData.width || i.finalPosData.width) - i.interPosData.width, i.posIn.marginRight = i.startPosData.marginRight - l, c = (i.startPosData.height || i.finalPosData.height) - i.interPosData.height, i.posIn.marginBottom = i.startPosData.marginBottom - c, i.posOut.width = i.finalPosData.width, i.posOut.height = i.finalPosData.height, l = (i.finalPosData.width || i.startPosData.width) - i.interPosData.width, i.posOut.marginRight = i.finalPosData.marginRight - l, c = (i.finalPosData.height || i.startPosData.height) - i.interPosData.height, i.posOut.marginBottom = i.finalPosData.marginBottom - c, i.tweenData.width = i.posOut.width - i.posIn.width, i.tweenData.height = i.posOut.height - i.posIn.height, i.tweenData.marginRight = i.posOut.marginRight - i.posIn.marginRight, i.tweenData.marginBottom = i.posOut.marginBottom - i.posIn.marginBottom), f = 0; r = o[f]; f++) s = n.effectsIn[r], s instanceof e.TransformData && s.value && (i.posIn[r].value = s.value, i.posOut[r].value = 0, i.tweenData[r].value = i.posOut[r].value - i.posIn[r].value, i.posIn[r].unit = i.posOut[r].unit = i.tweenData[r].unit = s.unit);

      for (u = 0; a = t.toHide[u]; u++) for (i = t.toHidePosData[u], i.posIn = new e.StyleData(), i.posOut = new e.StyleData(), i.tweenData = new e.StyleData(), i.posIn.x = a.isShown ? i.startPosData.x - i.interPosData.x : 0, i.posIn.y = a.isShown ? i.startPosData.y - i.interPosData.y : 0, i.posOut.x = n.config.animation.nudge ? 0 : i.posIn.x, i.posOut.y = n.config.animation.nudge ? 0 : i.posIn.y, i.tweenData.x = i.posOut.x - i.posIn.x, i.tweenData.y = i.posOut.y - i.posIn.y, n.config.animation.animateResizeTargets && (i.posIn.width = i.startPosData.width, i.posIn.height = i.startPosData.height, l = i.startPosData.width - i.interPosData.width, i.posIn.marginRight = i.startPosData.marginRight - l, c = i.startPosData.height - i.interPosData.height, i.posIn.marginBottom = i.startPosData.marginBottom - c), i.posIn.opacity = 1, i.posOut.opacity = n.effectsOut.opacity, i.tweenData.opacity = i.posOut.opacity - i.posIn.opacity, f = 0; r = o[f]; f++) s = n.effectsOut[r], s instanceof e.TransformData && s.value && (i.posIn[r].value = 0, i.posOut[r].value = s.value, i.tweenData[r].value = i.posOut[r].value - i.posIn[r].value, i.posIn[r].unit = i.posOut[r].unit = i.tweenData[r].unit = s.unit);

      n.callActions("afterGetTweenData", arguments);
    },
    moveTargets: function (t) {
      var a = this,
          i = null,
          o = null,
          r = null,
          s = "",
          l = !1,
          c = -1,
          u = -1,
          f = a.checkProgress.bind(a);

      for (a.callActions("beforeMoveTargets", arguments), u = 0; i = t.show[u]; u++) o = new e.IMoveData(), r = t.showPosData[u], s = i.isShown ? "none" : "show", l = a.willTransition(s, t.hasEffect, r.posIn, r.posOut), l && c++, i.show(), o.posIn = r.posIn, o.posOut = r.posOut, o.statusChange = s, o.staggerIndex = c, o.operation = t, o.callback = l ? f : null, i.move(o);

      for (u = 0; i = t.toHide[u]; u++) r = t.toHidePosData[u], o = new e.IMoveData(), s = "hide", l = a.willTransition(s, r.posIn, r.posOut), o.posIn = r.posIn, o.posOut = r.posOut, o.statusChange = s, o.staggerIndex = u, o.operation = t, o.callback = l ? f : null, i.move(o);

      a.config.animation.animateResizeContainer && (a.dom.parent.style[e.features.transitionProp] = "height " + a.config.animation.duration + "ms ease, width " + a.config.animation.duration + "ms ease ", requestAnimationFrame(function () {
        t.startHeight !== t.newHeight && t.viewportDeltaY !== t.startHeight - t.newHeight && (a.dom.parent.style.height = t.newHeight + "px"), t.startWidth !== t.newWidth && t.viewportDeltaX !== t.startWidth - t.newWidth && (a.dom.parent.style.width = t.newWidth + "px");
      })), t.willChangeLayout && (n.removeClass(a.dom.container, a.config.layout.ContainerClassName), n.addClass(a.dom.container, t.newContainerClassName)), a.callActions("afterMoveTargets", arguments);
    },
    hasEffect: function () {
      var t = this,
          e = ["scale", "translateX", "translateY", "translateZ", "rotateX", "rotateY", "rotateZ"],
          n = "",
          a = null,
          i = !1,
          o = -1,
          r = -1;
      if (1 !== t.effectsIn.opacity) return t.callFilters("resultHasEffect", !0, arguments);

      for (r = 0; n = e[r]; r++) if (a = t.effectsIn[n], o = "undefined" !== a.value ? a.value : a, 0 !== o) {
        i = !0;
        break;
      }

      return t.callFilters("resultHasEffect", i, arguments);
    },
    willTransition: function (t, e, a, i) {
      var o = this,
          r = !1;
      return r = !!n.isVisible(o.dom.container) && (!!("none" !== t && e || a.x !== i.x || a.y !== i.y) || !!o.config.animation.animateResizeTargets && (a.width !== i.width || a.height !== i.height || a.marginRight !== i.marginRight || a.marginTop !== i.marginTop)), o.callFilters("resultWillTransition", r, arguments);
    },
    checkProgress: function (t) {
      var e = this;
      e.targetsDone++, e.targetsBound === e.targetsDone && e.cleanUp(t);
    },
    cleanUp: function (t) {
      var a = this,
          i = null,
          o = null,
          r = null,
          s = null,
          l = -1;

      for (a.callActions("beforeCleanUp", arguments), a.targetsMoved = a.targetsImmovable = a.targetsBound = a.targetsDone = 0, l = 0; i = t.show[l]; l++) i.cleanUp(), i.show();

      for (l = 0; i = t.toHide[l]; l++) i.cleanUp(), i.hide();

      if (t.willSort && a.printSort(!1, t), a.dom.parent.style[e.features.transitionProp] = a.dom.parent.style.height = a.dom.parent.style.width = a.dom.parent.style.overflow = a.dom.parent.style[e.features.perspectiveProp] = a.dom.parent.style[e.features.perspectiveOriginProp] = "", t.willChangeLayout && (n.removeClass(a.dom.container, t.startContainerClassName), n.addClass(a.dom.container, t.newContainerClassName)), t.toRemove.length) {
        for (l = 0; i = a.targets[l]; l++) t.toRemove.indexOf(i) > -1 && ((o = i.dom.el.previousSibling) && "#text" === o.nodeName && (r = i.dom.el.nextSibling) && "#text" === r.nodeName && n.removeWhitespace(o), t.willSort || a.dom.parent.removeChild(i.dom.el), a.targets.splice(l, 1), i.isInDom = !1, l--);

        a.origOrder = a.targets;
      }

      t.willSort && (a.targets = t.newOrder), a.state = t.newState, a.lastOperation = t, a.dom.targets = a.state.targets, e.events.fire("mixEnd", a.dom.container, {
        state: a.state,
        instance: a
      }, a.dom.document), "function" == typeof a.config.callbacks.onMixEnd && a.config.callbacks.onMixEnd.call(a.dom.container, a.state, a), t.hasFailed && (e.events.fire("mixFail", a.dom.container, {
        state: a.state,
        instance: a
      }, a.dom.document), "function" == typeof a.config.callbacks.onMixFail && a.config.callbacks.onMixFail.call(a.dom.container, a.state, a), n.addClass(a.dom.container, n.getClassname(a.config.classNames, "container", a.config.classNames.modifierFailed))), "function" == typeof a.userCallback && a.userCallback.call(a.dom.container, a.state, a), "function" == typeof a.userDeferred.resolve && a.userDeferred.resolve(a.state), a.userCallback = null, a.userDeferred = null, a.lastClicked = null, a.isToggling = !1, a.isBusy = !1, a.queue.length && (a.callActions("beforeReadQueueCleanUp", arguments), s = a.queue.shift(), a.userDeferred = s.deferred, a.isToggling = s.isToggling, a.lastClicked = s.triggerElement, s.instruction.command instanceof e.CommandMultimix ? a.multimix.apply(a, s.args) : a.dataset.apply(a, s.args)), a.callActions("afterCleanUp", arguments);
    },
    parseMultimixArgs: function (t) {
      var a = this,
          i = new e.UserInstruction(),
          o = null,
          r = -1;

      for (i.animate = a.config.animation.enable, i.command = new e.CommandMultimix(), r = 0; r < t.length; r++) o = t[r], null !== o && ("object" == typeof o ? n.extend(i.command, o) : "boolean" == typeof o ? i.animate = o : "function" == typeof o && (i.callback = o));

      return !i.command.insert || i.command.insert instanceof e.CommandInsert || (i.command.insert = a.parseInsertArgs([i.command.insert]).command), !i.command.remove || i.command.remove instanceof e.CommandRemove || (i.command.remove = a.parseRemoveArgs([i.command.remove]).command), !i.command.filter || i.command.filter instanceof e.CommandFilter || (i.command.filter = a.parseFilterArgs([i.command.filter]).command), !i.command.sort || i.command.sort instanceof e.CommandSort || (i.command.sort = a.parseSortArgs([i.command.sort]).command), !i.command.changeLayout || i.command.changeLayout instanceof e.CommandChangeLayout || (i.command.changeLayout = a.parseChangeLayoutArgs([i.command.changeLayout]).command), i = a.callFilters("instructionParseMultimixArgs", i, arguments), n.freeze(i), i;
    },
    parseFilterArgs: function (t) {
      var a = this,
          i = new e.UserInstruction(),
          o = null,
          r = -1;

      for (i.animate = a.config.animation.enable, i.command = new e.CommandFilter(), r = 0; r < t.length; r++) o = t[r], "string" == typeof o ? i.command.selector = o : null === o ? i.command.collection = [] : "object" == typeof o && n.isElement(o, a.dom.document) ? i.command.collection = [o] : "object" == typeof o && "undefined" != typeof o.length ? i.command.collection = n.arrayFromList(o) : "object" == typeof o ? n.extend(i.command, o) : "boolean" == typeof o ? i.animate = o : "function" == typeof o && (i.callback = o);

      if (i.command.selector && i.command.collection) throw new Error(e.messages.errorFilterInvalidArguments());
      return i = a.callFilters("instructionParseFilterArgs", i, arguments), n.freeze(i), i;
    },
    parseSortArgs: function (t) {
      var a = this,
          i = new e.UserInstruction(),
          o = null,
          r = "",
          s = -1;

      for (i.animate = a.config.animation.enable, i.command = new e.CommandSort(), s = 0; s < t.length; s++) if (o = t[s], null !== o) switch (typeof o) {
        case "string":
          r = o;
          break;

        case "object":
          o.length && (i.command.collection = n.arrayFromList(o));
          break;

        case "boolean":
          i.animate = o;
          break;

        case "function":
          i.callback = o;
      }

      return r && (i.command = a.parseSortString(r, i.command)), i = a.callFilters("instructionParseSortArgs", i, arguments), n.freeze(i), i;
    },
    parseInsertArgs: function (t) {
      var a = this,
          i = new e.UserInstruction(),
          o = null,
          r = -1;

      for (i.animate = a.config.animation.enable, i.command = new e.CommandInsert(), r = 0; r < t.length; r++) o = t[r], null !== o && ("number" == typeof o ? i.command.index = o : "string" == typeof o && ["before", "after"].indexOf(o) > -1 ? i.command.position = o : "string" == typeof o ? i.command.collection = n.arrayFromList(n.createElement(o).childNodes) : "object" == typeof o && n.isElement(o, a.dom.document) ? i.command.collection.length ? i.command.sibling = o : i.command.collection = [o] : "object" == typeof o && o.length ? i.command.collection.length ? i.command.sibling = o[0] : i.command.collection = o : "object" == typeof o && o.childNodes && o.childNodes.length ? i.command.collection.length ? i.command.sibling = o.childNodes[0] : i.command.collection = n.arrayFromList(o.childNodes) : "object" == typeof o ? n.extend(i.command, o) : "boolean" == typeof o ? i.animate = o : "function" == typeof o && (i.callback = o));

      if (i.command.index && i.command.sibling) throw new Error(e.messages.errorInsertInvalidArguments());
      return !i.command.collection.length && a.config.debug.showWarnings && console.warn(e.messages.warningInsertNoElements()), i = a.callFilters("instructionParseInsertArgs", i, arguments), n.freeze(i), i;
    },
    parseRemoveArgs: function (t) {
      var a = this,
          i = new e.UserInstruction(),
          o = null,
          r = null,
          s = -1;

      for (i.animate = a.config.animation.enable, i.command = new e.CommandRemove(), s = 0; s < t.length; s++) if (r = t[s], null !== r) switch (typeof r) {
        case "number":
          a.targets[r] && (i.command.targets[0] = a.targets[r]);
          break;

        case "string":
          i.command.collection = n.arrayFromList(a.dom.parent.querySelectorAll(r));
          break;

        case "object":
          r && r.length ? i.command.collection = r : n.isElement(r, a.dom.document) ? i.command.collection = [r] : n.extend(i.command, r);
          break;

        case "boolean":
          i.animate = r;
          break;

        case "function":
          i.callback = r;
      }

      if (i.command.collection.length) for (s = 0; o = a.targets[s]; s++) i.command.collection.indexOf(o.dom.el) > -1 && i.command.targets.push(o);
      return !i.command.targets.length && a.config.debug.showWarnings && console.warn(e.messages.warningRemoveNoElements()), n.freeze(i), i;
    },
    parseDatasetArgs: function (t) {
      var a = this,
          i = new e.UserInstruction(),
          o = null,
          r = -1;

      for (i.animate = a.config.animation.enable, i.command = new e.CommandDataset(), r = 0; r < t.length; r++) if (o = t[r], null !== o) switch (typeof o) {
        case "object":
          Array.isArray(o) || "number" == typeof o.length ? i.command.dataset = o : n.extend(i.command, o);
          break;

        case "boolean":
          i.animate = o;
          break;

        case "function":
          i.callback = o;
      }

      return n.freeze(i), i;
    },
    parseChangeLayoutArgs: function (t) {
      var a = this,
          i = new e.UserInstruction(),
          o = null,
          r = -1;

      for (i.animate = a.config.animation.enable, i.command = new e.CommandChangeLayout(), r = 0; r < t.length; r++) if (o = t[r], null !== o) switch (typeof o) {
        case "string":
          i.command.containerClassName = o;
          break;

        case "object":
          n.extend(i.command, o);
          break;

        case "boolean":
          i.animate = o;
          break;

        case "function":
          i.callback = o;
      }

      return n.freeze(i), i;
    },
    queueMix: function (t) {
      var a = this,
          i = null,
          o = "";
      return a.callActions("beforeQueueMix", arguments), i = n.defer(e.libraries), a.config.animation.queue && a.queue.length < a.config.animation.queueLimit ? (t.deferred = i, a.queue.push(t), a.config.controls.enable && (a.isToggling ? (a.buildToggleArray(t.instruction.command), o = a.getToggleSelector(), a.updateControls({
        filter: {
          selector: o
        }
      })) : a.updateControls(t.instruction.command))) : (a.config.debug.showWarnings && console.warn(e.messages.warningMultimixInstanceQueueFull()), i.resolve(a.state), e.events.fire("mixBusy", a.dom.container, {
        state: a.state,
        instance: a
      }, a.dom.document), "function" == typeof a.config.callbacks.onMixBusy && a.config.callbacks.onMixBusy.call(a.dom.container, a.state, a)), a.callFilters("promiseQueueMix", i.promise, arguments);
    },
    getDataOperation: function (t) {
      var a = this,
          i = new e.Operation(),
          o = [];
      if (i = a.callFilters("operationUnmappedGetDataOperation", i, arguments), a.dom.targets.length && !(o = a.state.activeDataset || []).length) throw new Error(e.messages.errorDatasetNotSet());
      return i.id = n.randomHex(), i.startState = a.state, i.startDataset = o, i.newDataset = t.slice(), a.diffDatasets(i), i.startOrder = a.targets, i.newOrder = i.show, a.config.animation.enable && (a.getStartMixData(i), a.setInter(i), i.docState = n.getDocumentState(a.dom.document), a.getInterMixData(i), a.setFinal(i), a.getFinalMixData(i), a.parseEffects(), i.hasEffect = a.hasEffect(), a.getTweenData(i)), a.targets = i.show.slice(), i.newState = a.buildState(i), Array.prototype.push.apply(a.targets, i.toRemove), i = a.callFilters("operationMappedGetDataOperation", i, arguments);
    },
    diffDatasets: function (t) {
      var a = this,
          i = [],
          o = [],
          r = [],
          s = null,
          l = null,
          c = null,
          u = null,
          f = null,
          h = {},
          d = "",
          m = -1;

      for (a.callActions("beforeDiffDatasets", arguments), m = 0; s = t.newDataset[m]; m++) {
        if ("undefined" == typeof (d = s[a.config.data.uidKey]) || d.toString().length < 1) throw new TypeError(e.messages.errorDatasetInvalidUidKey({
          uidKey: a.config.data.uidKey
        }));
        if (h[d]) throw new Error(e.messages.errorDatasetDuplicateUid({
          uid: d
        }));
        h[d] = !0, (l = a.cache[d]) instanceof e.Target ? (a.config.data.dirtyCheck && !n.deepEquals(s, l.data) && (c = l.render(s), l.data = s, c !== l.dom.el && (l.isInDom && (l.unbindEvents(), a.dom.parent.replaceChild(c, l.dom.el)), l.isShown || (c.style.display = "none"), l.dom.el = c, l.isInDom && l.bindEvents())), c = l.dom.el) : (l = new e.Target(), l.init(null, a, s), l.hide()), l.isInDom ? (f = l.dom.el.nextElementSibling, o.push(d), u && (u.lastElementChild && u.appendChild(a.dom.document.createTextNode(" ")), a.insertDatasetFrag(u, l.dom.el, r), u = null)) : (u || (u = a.dom.document.createDocumentFragment()), u.lastElementChild && u.appendChild(a.dom.document.createTextNode(" ")), u.appendChild(l.dom.el), l.isInDom = !0, l.unbindEvents(), l.bindEvents(), l.hide(), t.toShow.push(l), r.push(l)), t.show.push(l);
      }

      for (u && (f = f || a.config.layout.siblingAfter, f && u.appendChild(a.dom.document.createTextNode(" ")), a.insertDatasetFrag(u, f, r)), m = 0; s = t.startDataset[m]; m++) d = s[a.config.data.uidKey], l = a.cache[d], t.show.indexOf(l) < 0 ? (t.hide.push(l), t.toHide.push(l), t.toRemove.push(l)) : i.push(d);

      n.isEqualArray(i, o) || (t.willSort = !0), a.callActions("afterDiffDatasets", arguments);
    },
    insertDatasetFrag: function (t, e, a) {
      var i = this,
          o = e ? n.arrayFromList(i.dom.parent.children).indexOf(e) : i.targets.length;

      for (i.dom.parent.insertBefore(t, e); a.length;) i.targets.splice(o, 0, a.shift()), o++;
    },
    willSort: function (t, e) {
      var n = this,
          a = !1;
      return a = !!(n.config.behavior.liveSort || "random" === t.order || t.attribute !== e.attribute || t.order !== e.order || t.collection !== e.collection || null === t.next && e.next || t.next && null === e.next) || !(!t.next || !e.next) && n.willSort(t.next, e.next), n.callFilters("resultWillSort", a, arguments);
    },
    show: function () {
      var t = this;
      return t.filter("all");
    },
    hide: function () {
      var t = this;
      return t.filter("none");
    },
    isMixing: function () {
      var t = this;
      return t.isBusy;
    },
    filter: function () {
      var t = this,
          e = t.parseFilterArgs(arguments);
      return t.multimix({
        filter: e.command
      }, e.animate, e.callback);
    },
    toggleOn: function () {
      var t = this,
          e = t.parseFilterArgs(arguments),
          n = e.command.selector,
          a = "";
      return t.isToggling = !0, t.toggleArray.indexOf(n) < 0 && t.toggleArray.push(n), a = t.getToggleSelector(), t.multimix({
        filter: a
      }, e.animate, e.callback);
    },
    toggleOff: function () {
      var t = this,
          e = t.parseFilterArgs(arguments),
          n = e.command.selector,
          a = t.toggleArray.indexOf(n),
          i = "";
      return t.isToggling = !0, a > -1 && t.toggleArray.splice(a, 1), i = t.getToggleSelector(), t.multimix({
        filter: i
      }, e.animate, e.callback);
    },
    sort: function () {
      var t = this,
          e = t.parseSortArgs(arguments);
      return t.multimix({
        sort: e.command
      }, e.animate, e.callback);
    },
    changeLayout: function () {
      var t = this,
          e = t.parseChangeLayoutArgs(arguments);
      return t.multimix({
        changeLayout: e.command
      }, e.animate, e.callback);
    },
    dataset: function () {
      var t = this,
          n = t.parseDatasetArgs(arguments),
          a = null,
          i = null,
          o = !1;
      return t.callActions("beforeDataset", arguments), t.isBusy ? (i = new e.QueueItem(), i.args = arguments, i.instruction = n, t.queueMix(i)) : (n.callback && (t.userCallback = n.callback), o = n.animate ^ t.config.animation.enable ? n.animate : t.config.animation.enable, a = t.getDataOperation(n.command.dataset), t.goMix(o, a));
    },
    multimix: function () {
      var t = this,
          n = null,
          a = !1,
          i = null,
          o = t.parseMultimixArgs(arguments);
      return t.callActions("beforeMultimix", arguments), t.isBusy ? (i = new e.QueueItem(), i.args = arguments, i.instruction = o, i.triggerElement = t.lastClicked, i.isToggling = t.isToggling, t.queueMix(i)) : (n = t.getOperation(o.command), t.config.controls.enable && (o.command.filter && !t.isToggling && (t.toggleArray.length = 0, t.buildToggleArray(n.command)), t.queue.length < 1 && t.updateControls(n.command)), o.callback && (t.userCallback = o.callback), a = o.animate ^ t.config.animation.enable ? o.animate : t.config.animation.enable, t.callFilters("operationMultimix", n, arguments), t.goMix(a, n));
    },
    getOperation: function (t) {
      var a = this,
          i = t.sort,
          o = t.filter,
          r = t.changeLayout,
          s = t.remove,
          l = t.insert,
          c = new e.Operation();
      return c = a.callFilters("operationUnmappedGetOperation", c, arguments), c.id = n.randomHex(), c.command = t, c.startState = a.state, c.triggerElement = a.lastClicked, a.isBusy ? (a.config.debug.showWarnings && console.warn(e.messages.warningGetOperationInstanceBusy()), null) : (l && a.insertTargets(l, c), s && (c.toRemove = s.targets), c.startSort = c.newSort = c.startState.activeSort, c.startOrder = c.newOrder = a.targets, i && (c.startSort = c.startState.activeSort, c.newSort = i, c.willSort = a.willSort(i, c.startState.activeSort), c.willSort && a.sortOperation(c)), c.startFilter = c.startState.activeFilter, o ? c.newFilter = o : c.newFilter = n.extend(new e.CommandFilter(), c.startFilter), "all" === c.newFilter.selector ? c.newFilter.selector = a.config.selectors.target : "none" === c.newFilter.selector && (c.newFilter.selector = ""), a.filterOperation(c), c.startContainerClassName = c.startState.activeContainerClassName, r ? (c.newContainerClassName = r.containerClassName, c.newContainerClassName !== c.startContainerClassName && (c.willChangeLayout = !0)) : c.newContainerClassName = c.startContainerClassName, a.config.animation.enable && (a.getStartMixData(c), a.setInter(c), c.docState = n.getDocumentState(a.dom.document), a.getInterMixData(c), a.setFinal(c), a.getFinalMixData(c), a.parseEffects(), c.hasEffect = a.hasEffect(), a.getTweenData(c)), c.willSort && (a.targets = c.newOrder), c.newState = a.buildState(c), a.callFilters("operationMappedGetOperation", c, arguments));
    },
    tween: function (t, e) {
      var n = null,
          a = null,
          i = -1,
          o = -1;

      for (e = Math.min(e, 1), e = Math.max(e, 0), o = 0; n = t.show[o]; o++) a = t.showPosData[o], n.applyTween(a, e);

      for (o = 0; n = t.hide[o]; o++) n.isShown && n.hide(), (i = t.toHide.indexOf(n)) > -1 && (a = t.toHidePosData[i], n.isShown || n.show(), n.applyTween(a, e));
    },
    insert: function () {
      var t = this,
          e = t.parseInsertArgs(arguments);
      return t.multimix({
        insert: e.command
      }, e.animate, e.callback);
    },
    insertBefore: function () {
      var t = this,
          e = t.parseInsertArgs(arguments);
      return t.insert(e.command.collection, "before", e.command.sibling, e.animate, e.callback);
    },
    insertAfter: function () {
      var t = this,
          e = t.parseInsertArgs(arguments);
      return t.insert(e.command.collection, "after", e.command.sibling, e.animate, e.callback);
    },
    prepend: function () {
      var t = this,
          e = t.parseInsertArgs(arguments);
      return t.insert(0, e.command.collection, e.animate, e.callback);
    },
    append: function () {
      var t = this,
          e = t.parseInsertArgs(arguments);
      return t.insert(t.state.totalTargets, e.command.collection, e.animate, e.callback);
    },
    remove: function () {
      var t = this,
          e = t.parseRemoveArgs(arguments);
      return t.multimix({
        remove: e.command
      }, e.animate, e.callback);
    },
    getConfig: function (t) {
      var e = this,
          a = null;
      return a = t ? n.getProperty(e.config, t) : e.config, e.callFilters("valueGetConfig", a, arguments);
    },
    configure: function (t) {
      var e = this;
      e.callActions("beforeConfigure", arguments), n.extend(e.config, t, !0, !0), e.callActions("afterConfigure", arguments);
    },
    getState: function () {
      var t = this,
          a = null;
      return a = new e.State(), n.extend(a, t.state), n.freeze(a), t.callFilters("stateGetState", a, arguments);
    },
    forceRefresh: function () {
      var t = this;
      t.indexTargets();
    },
    forceRender: function () {
      var t = this,
          e = null,
          n = null,
          a = "";

      for (a in t.cache) e = t.cache[a], n = e.render(e.data), n !== e.dom.el && (e.isInDom && (e.unbindEvents(), t.dom.parent.replaceChild(n, e.dom.el)), e.isShown || (n.style.display = "none"), e.dom.el = n, e.isInDom && e.bindEvents());

      t.state = t.buildState(t.lastOperation);
    },
    destroy: function (t) {
      var n = this,
          a = null,
          i = null,
          o = 0;

      for (n.callActions("beforeDestroy", arguments), o = 0; a = n.controls[o]; o++) a.removeBinding(n);

      for (o = 0; i = n.targets[o]; o++) t && i.show(), i.unbindEvents();

      n.dom.container.id.match(/^MixItUp/) && n.dom.container.removeAttribute("id"), delete e.instances[n.id], n.callActions("afterDestroy", arguments);
    }
  }), e.IMoveData = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.posIn = null, this.posOut = null, this.operation = null, this.callback = null, this.statusChange = "", this.duration = -1, this.staggerIndex = -1, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.IMoveData), e.IMoveData.prototype = Object.create(e.Base.prototype), e.IMoveData.prototype.constructor = e.IMoveData, e.TargetDom = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.el = null, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.TargetDom), e.TargetDom.prototype = Object.create(e.Base.prototype), e.TargetDom.prototype.constructor = e.TargetDom, e.Target = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.id = "", this.sortString = "", this.mixer = null, this.callback = null, this.isShown = !1, this.isBound = !1, this.isExcluded = !1, this.isInDom = !1, this.handler = null, this.operation = null, this.data = null, this.dom = new e.TargetDom(), this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.Target), e.Target.prototype = Object.create(e.Base.prototype), n.extend(e.Target.prototype, {
    constructor: e.Target,
    init: function (t, n, a) {
      var i = this,
          o = "";

      if (i.callActions("beforeInit", arguments), i.mixer = n, t || (t = i.render(a)), i.cacheDom(t), i.bindEvents(), "none" !== i.dom.el.style.display && (i.isShown = !0), a && n.config.data.uidKey) {
        if ("undefined" == typeof (o = a[n.config.data.uidKey]) || o.toString().length < 1) throw new TypeError(e.messages.errorDatasetInvalidUidKey({
          uidKey: n.config.data.uidKey
        }));
        i.id = o, i.data = a, n.cache[o] = i;
      }

      i.callActions("afterInit", arguments);
    },
    render: function (t) {
      var a = this,
          i = null,
          o = null,
          r = null,
          s = "";
      if (a.callActions("beforeRender", arguments), i = a.callFilters("renderRender", a.mixer.config.render.target, arguments), "function" != typeof i) throw new TypeError(e.messages.errorDatasetRendererNotSet());
      return s = i(t), s && "object" == typeof s && n.isElement(s) ? o = s : "string" == typeof s && (r = document.createElement("div"), r.innerHTML = s, o = r.firstElementChild), a.callFilters("elRender", o, arguments);
    },
    cacheDom: function (t) {
      var e = this;
      e.callActions("beforeCacheDom", arguments), e.dom.el = t, e.callActions("afterCacheDom", arguments);
    },
    getSortString: function (t) {
      var e = this,
          n = e.dom.el.getAttribute("data-" + t) || "";
      e.callActions("beforeGetSortString", arguments), n = isNaN(1 * n) ? n.toLowerCase() : 1 * n, e.sortString = n, e.callActions("afterGetSortString", arguments);
    },
    show: function () {
      var t = this;
      t.callActions("beforeShow", arguments), t.isShown || (t.dom.el.style.display = "", t.isShown = !0), t.callActions("afterShow", arguments);
    },
    hide: function () {
      var t = this;
      t.callActions("beforeHide", arguments), t.isShown && (t.dom.el.style.display = "none", t.isShown = !1), t.callActions("afterHide", arguments);
    },
    move: function (t) {
      var e = this;
      e.callActions("beforeMove", arguments), e.isExcluded || e.mixer.targetsMoved++, e.applyStylesIn(t), requestAnimationFrame(function () {
        e.applyStylesOut(t);
      }), e.callActions("afterMove", arguments);
    },
    applyTween: function (t, n) {
      var a = this,
          i = "",
          o = null,
          r = t.posIn,
          s = [],
          l = new e.StyleData(),
          c = -1;

      for (a.callActions("beforeApplyTween", arguments), l.x = r.x, l.y = r.y, 0 === n ? a.hide() : a.isShown || a.show(), c = 0; i = e.features.TWEENABLE[c]; c++) if (o = t.tweenData[i], "x" === i) {
        if (!o) continue;
        l.x = r.x + o * n;
      } else if ("y" === i) {
        if (!o) continue;
        l.y = r.y + o * n;
      } else if (o instanceof e.TransformData) {
        if (!o.value) continue;
        l[i].value = r[i].value + o.value * n, l[i].unit = o.unit, s.push(i + "(" + l[i].value + o.unit + ")");
      } else {
        if (!o) continue;
        l[i] = r[i] + o * n, a.dom.el.style[i] = l[i];
      }

      (l.x || l.y) && s.unshift("translate(" + l.x + "px, " + l.y + "px)"), s.length && (a.dom.el.style[e.features.transformProp] = s.join(" ")), a.callActions("afterApplyTween", arguments);
    },
    applyStylesIn: function (t) {
      var n = this,
          a = t.posIn,
          i = 1 !== n.mixer.effectsIn.opacity,
          o = [];
      n.callActions("beforeApplyStylesIn", arguments), o.push("translate(" + a.x + "px, " + a.y + "px)"), n.mixer.config.animation.animateResizeTargets && ("show" !== t.statusChange && (n.dom.el.style.width = a.width + "px", n.dom.el.style.height = a.height + "px"), n.dom.el.style.marginRight = a.marginRight + "px", n.dom.el.style.marginBottom = a.marginBottom + "px"), i && (n.dom.el.style.opacity = a.opacity), "show" === t.statusChange && (o = o.concat(n.mixer.transformIn)), n.dom.el.style[e.features.transformProp] = o.join(" "), n.callActions("afterApplyStylesIn", arguments);
    },
    applyStylesOut: function (t) {
      var n = this,
          a = [],
          i = [],
          o = n.mixer.config.animation.animateResizeTargets,
          r = "undefined" != typeof n.mixer.effectsIn.opacity;
      if (n.callActions("beforeApplyStylesOut", arguments), a.push(n.writeTransitionRule(e.features.transformRule, t.staggerIndex)), "none" !== t.statusChange && a.push(n.writeTransitionRule("opacity", t.staggerIndex, t.duration)), o && (a.push(n.writeTransitionRule("width", t.staggerIndex, t.duration)), a.push(n.writeTransitionRule("height", t.staggerIndex, t.duration)), a.push(n.writeTransitionRule("margin", t.staggerIndex, t.duration))), !t.callback) return n.mixer.targetsImmovable++, void (n.mixer.targetsMoved === n.mixer.targetsImmovable && n.mixer.cleanUp(t.operation));

      switch (n.operation = t.operation, n.callback = t.callback, !n.isExcluded && n.mixer.targetsBound++, n.isBound = !0, n.applyTransition(a), o && t.posOut.width > 0 && t.posOut.height > 0 && (n.dom.el.style.width = t.posOut.width + "px", n.dom.el.style.height = t.posOut.height + "px", n.dom.el.style.marginRight = t.posOut.marginRight + "px", n.dom.el.style.marginBottom = t.posOut.marginBottom + "px"), n.mixer.config.animation.nudge || "hide" !== t.statusChange || i.push("translate(" + t.posOut.x + "px, " + t.posOut.y + "px)"), t.statusChange) {
        case "hide":
          r && (n.dom.el.style.opacity = n.mixer.effectsOut.opacity), i = i.concat(n.mixer.transformOut);
          break;

        case "show":
          r && (n.dom.el.style.opacity = 1);
      }

      (n.mixer.config.animation.nudge || !n.mixer.config.animation.nudge && "hide" !== t.statusChange) && i.push("translate(" + t.posOut.x + "px, " + t.posOut.y + "px)"), n.dom.el.style[e.features.transformProp] = i.join(" "), n.callActions("afterApplyStylesOut", arguments);
    },
    writeTransitionRule: function (t, e, n) {
      var a = this,
          i = a.getDelay(e),
          o = "";
      return o = t + " " + (n > 0 ? n : a.mixer.config.animation.duration) + "ms " + i + "ms " + ("opacity" === t ? "linear" : a.mixer.config.animation.easing), a.callFilters("ruleWriteTransitionRule", o, arguments);
    },
    getDelay: function (t) {
      var e = this,
          n = -1;
      return "function" == typeof e.mixer.config.animation.staggerSequence && (t = e.mixer.config.animation.staggerSequence.call(e, t, e.state)), n = e.mixer.staggerDuration ? t * e.mixer.staggerDuration : 0, e.callFilters("delayGetDelay", n, arguments);
    },
    applyTransition: function (t) {
      var n = this,
          a = t.join(", ");
      n.callActions("beforeApplyTransition", arguments), n.dom.el.style[e.features.transitionProp] = a, n.callActions("afterApplyTransition", arguments);
    },
    handleTransitionEnd: function (t) {
      var e = this,
          n = t.propertyName,
          a = e.mixer.config.animation.animateResizeTargets;
      e.callActions("beforeHandleTransitionEnd", arguments), e.isBound && t.target.matches(e.mixer.config.selectors.target) && (n.indexOf("transform") > -1 || n.indexOf("opacity") > -1 || a && n.indexOf("height") > -1 || a && n.indexOf("width") > -1 || a && n.indexOf("margin") > -1) && (e.callback.call(e, e.operation), e.isBound = !1, e.callback = null, e.operation = null), e.callActions("afterHandleTransitionEnd", arguments);
    },
    eventBus: function (t) {
      var e = this;

      switch (e.callActions("beforeEventBus", arguments), t.type) {
        case "webkitTransitionEnd":
        case "transitionend":
          e.handleTransitionEnd(t);
      }

      e.callActions("afterEventBus", arguments);
    },
    unbindEvents: function () {
      var t = this;
      t.callActions("beforeUnbindEvents", arguments), n.off(t.dom.el, "webkitTransitionEnd", t.handler), n.off(t.dom.el, "transitionend", t.handler), t.callActions("afterUnbindEvents", arguments);
    },
    bindEvents: function () {
      var t = this,
          a = "";
      t.callActions("beforeBindEvents", arguments), a = "webkit" === e.features.transitionPrefix ? "webkitTransitionEnd" : "transitionend", t.handler = function (e) {
        return t.eventBus(e);
      }, n.on(t.dom.el, a, t.handler), t.callActions("afterBindEvents", arguments);
    },
    getPosData: function (n) {
      var a = this,
          i = {},
          o = null,
          r = new e.StyleData();
      return a.callActions("beforeGetPosData", arguments), r.x = a.dom.el.offsetLeft, r.y = a.dom.el.offsetTop, (a.mixer.config.animation.animateResizeTargets || n) && (o = a.dom.el.getBoundingClientRect(), r.top = o.top, r.right = o.right, r.bottom = o.bottom, r.left = o.left, r.width = o.width, r.height = o.height), a.mixer.config.animation.animateResizeTargets && (i = t.getComputedStyle(a.dom.el), r.marginBottom = parseFloat(i.marginBottom), r.marginRight = parseFloat(i.marginRight)), a.callFilters("posDataGetPosData", r, arguments);
    },
    cleanUp: function () {
      var t = this;
      t.callActions("beforeCleanUp", arguments), t.dom.el.style[e.features.transformProp] = "", t.dom.el.style[e.features.transitionProp] = "", t.dom.el.style.opacity = "", t.mixer.config.animation.animateResizeTargets && (t.dom.el.style.width = "", t.dom.el.style.height = "", t.dom.el.style.marginRight = "", t.dom.el.style.marginBottom = ""), t.callActions("afterCleanUp", arguments);
    }
  }), e.Collection = function (t) {
    var e = null,
        a = -1;

    for (this.callActions("beforeConstruct"), a = 0; e = t[a]; a++) this[a] = e;

    this.length = t.length, this.callActions("afterConstruct"), n.freeze(this);
  }, e.BaseStatic.call(e.Collection), e.Collection.prototype = Object.create(e.Base.prototype), n.extend(e.Collection.prototype, {
    constructor: e.Collection,
    mixitup: function (t) {
      var a = this,
          i = null,
          o = Array.prototype.slice.call(arguments),
          r = [],
          s = -1;

      for (this.callActions("beforeMixitup"), o.shift(), s = 0; i = a[s]; s++) r.push(i[t].apply(i, o));

      return a.callFilters("promiseMixitup", n.all(r, e.libraries), arguments);
    }
  }), e.Operation = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.id = "", this.args = [], this.command = null, this.showPosData = [], this.toHidePosData = [], this.startState = null, this.newState = null, this.docState = null, this.willSort = !1, this.willChangeLayout = !1, this.hasEffect = !1, this.hasFailed = !1, this.triggerElement = null, this.show = [], this.hide = [], this.matching = [], this.toShow = [], this.toHide = [], this.toMove = [], this.toRemove = [], this.startOrder = [], this.newOrder = [], this.startSort = null, this.newSort = null, this.startFilter = null, this.newFilter = null, this.startDataset = null, this.newDataset = null, this.viewportDeltaX = 0, this.viewportDeltaY = 0, this.startX = 0, this.startY = 0, this.startHeight = 0, this.startWidth = 0, this.newX = 0, this.newY = 0, this.newHeight = 0, this.newWidth = 0, this.startContainerClassName = "", this.startDisplay = "", this.newContainerClassName = "", this.newDisplay = "", this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.Operation), e.Operation.prototype = Object.create(e.Base.prototype), e.Operation.prototype.constructor = e.Operation, e.State = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.id = "", this.activeFilter = null, this.activeSort = null, this.activeContainerClassName = "", this.container = null, this.targets = [], this.hide = [], this.show = [], this.matching = [], this.totalTargets = -1, this.totalShow = -1, this.totalHide = -1, this.totalMatching = -1, this.hasFailed = !1, this.triggerElement = null, this.activeDataset = null, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.State), e.State.prototype = Object.create(e.Base.prototype), e.State.prototype.constructor = e.State, e.UserInstruction = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.command = {}, this.animate = !1, this.callback = null, this.callActions("afterConstruct"), n.seal(this);
  }, e.BaseStatic.call(e.UserInstruction), e.UserInstruction.prototype = Object.create(e.Base.prototype), e.UserInstruction.prototype.constructor = e.UserInstruction, e.Messages = function () {
    e.Base.call(this), this.callActions("beforeConstruct"), this.ERROR_FACTORY_INVALID_CONTAINER = "[MixItUp] An invalid selector or element reference was passed to the mixitup factory function", this.ERROR_FACTORY_CONTAINER_NOT_FOUND = "[MixItUp] The provided selector yielded no container element", this.ERROR_CONFIG_INVALID_ANIMATION_EFFECTS = "[MixItUp] Invalid value for `animation.effects`", this.ERROR_CONFIG_INVALID_CONTROLS_SCOPE = "[MixItUp] Invalid value for `controls.scope`", this.ERROR_CONFIG_INVALID_PROPERTY = '[MixitUp] Invalid configuration object property "${erroneous}"${suggestion}', this.ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION = '. Did you mean "${probableMatch}"?', this.ERROR_CONFIG_DATA_UID_KEY_NOT_SET = "[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`", this.ERROR_DATASET_INVALID_UID_KEY = '[MixItUp] The specified UID key "${uidKey}" is not present on one or more dataset items', this.ERROR_DATASET_DUPLICATE_UID = '[MixItUp] The UID "${uid}" was found on two or more dataset items. UIDs must be unique.', this.ERROR_INSERT_INVALID_ARGUMENTS = "[MixItUp] Please provider either an index or a sibling and position to insert, not both", this.ERROR_INSERT_PREEXISTING_ELEMENT = "[MixItUp] An element to be inserted already exists in the container", this.ERROR_FILTER_INVALID_ARGUMENTS = "[MixItUp] Please provide either a selector or collection `.filter()`, not both", this.ERROR_DATASET_NOT_SET = "[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`", this.ERROR_DATASET_PRERENDERED_MISMATCH = "[MixItUp] `load.dataset` does not match pre-rendered targets", this.ERROR_DATASET_RENDERER_NOT_SET = "[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`", this.ERROR_SORT_NON_EXISTENT_ELEMENT = "[MixItUp] An element to be sorted does not already exist in the container", this.WARNING_FACTORY_PREEXISTING_INSTANCE = "[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored. If you wish to perform additional methods on this instance, please create a reference.", this.WARNING_INSERT_NO_ELEMENTS = "[MixItUp] WARNING: No valid elements were passed to `.insert()`", this.WARNING_REMOVE_NO_ELEMENTS = "[MixItUp] WARNING: No valid elements were passed to `.remove()`", this.WARNING_MULTIMIX_INSTANCE_QUEUE_FULL = "[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the queue is full or queuing is disabled.", this.WARNING_GET_OPERATION_INSTANCE_BUSY = "[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy.", this.WARNING_NO_PROMISE_IMPLEMENTATION = "[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install an ES6 Promise polyfill.", this.WARNING_INCONSISTENT_SORTING_ATTRIBUTES = '[MixItUp] WARNING: The requested sorting data attribute "${attribute}" was not present on one or more target elements which may product unexpected sort output', this.callActions("afterConstruct"), this.compileTemplates(), n.seal(this);
  }, e.BaseStatic.call(e.Messages), e.Messages.prototype = Object.create(e.Base.prototype), e.Messages.prototype.constructor = e.Messages, e.Messages.prototype.compileTemplates = function () {
    var t = "",
        e = "";

    for (t in this) "string" == typeof (e = this[t]) && (this[n.camelCase(t)] = n.template(e));
  }, e.messages = new e.Messages(), e.Facade = function (t) {
    e.Base.call(this), this.callActions("beforeConstruct", arguments), this.configure = t.configure.bind(t), this.show = t.show.bind(t), this.hide = t.hide.bind(t), this.filter = t.filter.bind(t), this.toggleOn = t.toggleOn.bind(t), this.toggleOff = t.toggleOff.bind(t), this.sort = t.sort.bind(t), this.changeLayout = t.changeLayout.bind(t), this.multimix = t.multimix.bind(t), this.dataset = t.dataset.bind(t), this.tween = t.tween.bind(t), this.insert = t.insert.bind(t), this.insertBefore = t.insertBefore.bind(t), this.insertAfter = t.insertAfter.bind(t), this.prepend = t.prepend.bind(t), this.append = t.append.bind(t), this.remove = t.remove.bind(t), this.destroy = t.destroy.bind(t), this.forceRefresh = t.forceRefresh.bind(t), this.forceRender = t.forceRender.bind(t), this.isMixing = t.isMixing.bind(t), this.getOperation = t.getOperation.bind(t), this.getConfig = t.getConfig.bind(t), this.getState = t.getState.bind(t), this.callActions("afterConstruct", arguments), n.freeze(this), n.seal(this);
  }, e.BaseStatic.call(e.Facade), e.Facade.prototype = Object.create(e.Base.prototype), e.Facade.prototype.constructor = e.Facade, "object" == typeof exports && "object" == typeof module ? module.exports = e : "function" == typeof define && define.amd ? define(function () {
    return e;
  }) : "undefined" != typeof t.mixitup && "function" == typeof t.mixitup || (t.mixitup = e), e.BaseStatic.call(e.constructor), e.NAME = "mixitup", e.CORE_VERSION = "3.3.1";
}(window);
/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function (a, b, c, d) {
  function e(b, c) {
    this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: {
        start: null,
        current: null
      },
      direction: null
    }, this._states = {
      current: {},
      tags: {
        initializing: ["busy"],
        animating: ["busy"],
        dragging: ["interacting"]
      }
    }, a.each(["onResize", "onThrottledResize"], a.proxy(function (b, c) {
      this._handlers[c] = a.proxy(this[c], this);
    }, this)), a.each(e.Plugins, a.proxy(function (a, b) {
      this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
    }, this)), a.each(e.Workers, a.proxy(function (b, c) {
      this._pipe.push({
        filter: c.filter,
        run: a.proxy(c.run, this)
      });
    }, this)), this.setup(), this.initialize();
  }

  e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    checkVisibility: !0,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    slideTransition: "",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab"
  }, e.Width = {
    Default: "default",
    Inner: "inner",
    Outer: "outer"
  }, e.Type = {
    Event: "event",
    State: "state"
  }, e.Plugins = {}, e.Workers = [{
    filter: ["width", "settings"],
    run: function () {
      this._width = this.$element.width();
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (a) {
      a.current = this._items && this._items[this.relative(this._current)];
    }
  }, {
    filter: ["items", "settings"],
    run: function () {
      this.$stage.children(".cloned").remove();
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (a) {
      var b = this.settings.margin || "",
          c = !this.settings.autoWidth,
          d = this.settings.rtl,
          e = {
        width: "auto",
        "margin-left": d ? b : "",
        "margin-right": d ? "" : b
      };
      !c && this.$stage.children().css(e), a.css = e;
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (a) {
      var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
          c = null,
          d = this._items.length,
          e = !this.settings.autoWidth,
          f = [];

      for (a.items = {
        merge: !1,
        width: b
      }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();

      this._widths = f;
    }
  }, {
    filter: ["items", "settings"],
    run: function () {
      var b = [],
          c = this._items,
          d = this.settings,
          e = Math.max(2 * d.items, 4),
          f = 2 * Math.ceil(c.length / 2),
          g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
          h = "",
          i = "";

      for (g /= 2; g > 0;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i, g -= 1;

      this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage);
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function () {
      for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);

      this._coordinates = f;
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function () {
      var a = this.settings.stagePadding,
          b = this._coordinates,
          c = {
        width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
        "padding-left": a || "",
        "padding-right": a || ""
      };
      this.$stage.css(c);
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (a) {
      var b = this._coordinates.length,
          c = !this.settings.autoWidth,
          d = this.$stage.children();
      if (c && a.items.merge) for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);else c && (a.css.width = a.items.width, d.css(a.css));
    }
  }, {
    filter: ["items"],
    run: function () {
      this._coordinates.length < 1 && this.$stage.removeAttr("style");
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (a) {
      a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current);
    }
  }, {
    filter: ["position"],
    run: function () {
      this.animate(this.coordinates(this._current));
    }
  }, {
    filter: ["width", "position", "items", "settings"],
    run: function () {
      var a,
          b,
          c,
          d,
          e = this.settings.rtl ? 1 : -1,
          f = 2 * this.settings.stagePadding,
          g = this.coordinates(this.current()) + f,
          h = g + this.width() * e,
          i = [];

      for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);

      this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center");
    }
  }], e.prototype.initializeStage = function () {
    this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ">", {
      class: this.settings.stageClass
    }).wrap(a("<div/>", {
      class: this.settings.stageOuterClass
    })), this.$element.append(this.$stage.parent()));
  }, e.prototype.initializeItems = function () {
    var b = this.$element.find(".owl-item");
    if (b.length) return this._items = b.get().map(function (b) {
      return a(b);
    }), this._mergers = this._items.map(function () {
      return 1;
    }), void this.refresh();
    this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);
  }, e.prototype.initialize = function () {
    if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
      var a, b, c;
      a = this.$element.find("img"), b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, c = this.$element.children(b).width(), a.length && c <= 0 && this.preloadAutoWidthImages(a);
    }

    this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized");
  }, e.prototype.isVisible = function () {
    return !this.settings.checkVisibility || this.$element.is(":visible");
  }, e.prototype.setup = function () {
    var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
    c ? (a.each(c, function (a) {
      a <= b && a > d && (d = Number(a));
    }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
      property: {
        name: "settings",
        value: e
      }
    }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
      property: {
        name: "settings",
        value: this.settings
      }
    });
  }, e.prototype.optionsLogic = function () {
    this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1);
  }, e.prototype.prepare = function (b) {
    var c = this.trigger("prepare", {
      content: b
    });
    return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
      content: c.data
    }), c.data;
  }, e.prototype.update = function () {
    for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
      return this[a];
    }, this._invalidated), e = {}; b < c;) (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;

    this._invalidated = {}, !this.is("valid") && this.enter("valid");
  }, e.prototype.width = function (a) {
    switch (a = a || e.Width.Default) {
      case e.Width.Inner:
      case e.Width.Outer:
        return this._width;

      default:
        return this._width - 2 * this.settings.stagePadding + this.settings.margin;
    }
  }, e.prototype.refresh = function () {
    this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed");
  }, e.prototype.onThrottledResize = function () {
    b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
  }, e.prototype.onResize = function () {
    return !!this._items.length && this._width !== this.$element.width() && !!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")));
  }, e.prototype.registerEventHandlers = function () {
    a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
      return !1;
    })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)));
  }, e.prototype.onDragStart = function (b) {
    var d = null;
    3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
      x: d[16 === d.length ? 12 : 4],
      y: d[16 === d.length ? 13 : 5]
    }) : (d = this.$stage.position(), d = {
      x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
      y: d.top
    }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = new Date().getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function (b) {
      var d = this.difference(this._drag.pointer, this.pointer(b));
      a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"));
    }, this)));
  }, e.prototype.onDragMove = function (a) {
    var b = null,
        c = null,
        d = null,
        e = this.difference(this._drag.pointer, this.pointer(a)),
        f = this.difference(this._drag.stage.start, e);
    this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x));
  }, e.prototype.onDragEnd = function (b) {
    var d = this.difference(this._drag.pointer, this.pointer(b)),
        e = this._drag.stage.current,
        f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
    a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
      return !1;
    })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
  }, e.prototype.closest = function (b, c) {
    var e = -1,
        f = 30,
        g = this.width(),
        h = this.coordinates();
    return this.settings.freeDrag || a.each(h, a.proxy(function (a, i) {
      return "left" === c && b > i - f && b < i + f ? e = a : "right" === c && b > i - g - f && b < i - g + f ? e = a + 1 : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a), -1 === e;
    }, this)), this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? e = b = this.minimum() : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())), e;
  }, e.prototype.animate = function (b) {
    var c = this.speed() > 0;
    this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
      transform: "translate3d(" + b + "px,0px,0px)",
      transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
    }) : c ? this.$stage.animate({
      left: b + "px"
    }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
      left: b + "px"
    });
  }, e.prototype.is = function (a) {
    return this._states.current[a] && this._states.current[a] > 0;
  }, e.prototype.current = function (a) {
    if (a === d) return this._current;
    if (0 === this._items.length) return d;

    if (a = this.normalize(a), this._current !== a) {
      var b = this.trigger("change", {
        property: {
          name: "position",
          value: a
        }
      });
      b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
        property: {
          name: "position",
          value: this._current
        }
      });
    }

    return this._current;
  }, e.prototype.invalidate = function (b) {
    return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function (a, b) {
      return b;
    });
  }, e.prototype.reset = function (a) {
    (a = this.normalize(a)) !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]));
  }, e.prototype.normalize = function (a, b) {
    var c = this._items.length,
        e = b ? 0 : this._clones.length;
    return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a;
  }, e.prototype.relative = function (a) {
    return a -= this._clones.length / 2, this.normalize(a, !0);
  }, e.prototype.maximum = function (a) {
    var b,
        c,
        d,
        e = this.settings,
        f = this._coordinates.length;
    if (e.loop) f = this._clones.length / 2 + this._items.length - 1;else if (e.autoWidth || e.merge) {
      if (b = this._items.length) for (c = this._items[--b].width(), d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d););
      f = b + 1;
    } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
    return a && (f -= this._clones.length / 2), Math.max(f, 0);
  }, e.prototype.minimum = function (a) {
    return a ? 0 : this._clones.length / 2;
  }, e.prototype.items = function (a) {
    return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a]);
  }, e.prototype.mergers = function (a) {
    return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a]);
  }, e.prototype.clones = function (b) {
    var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function (a) {
      return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2;
    };

    return b === d ? a.map(this._clones, function (a, b) {
      return f(b);
    }) : a.map(this._clones, function (a, c) {
      return a === b ? f(c) : null;
    });
  }, e.prototype.speed = function (a) {
    return a !== d && (this._speed = a), this._speed;
  }, e.prototype.coordinates = function (b) {
    var c,
        e = 1,
        f = b - 1;
    return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
      return this.coordinates(b);
    }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c));
  }, e.prototype.duration = function (a, b, c) {
    return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed);
  }, e.prototype.to = function (a, b) {
    var c = this.current(),
        d = null,
        e = a - this.relative(c),
        f = (e > 0) - (e < 0),
        g = this._items.length,
        h = this.minimum(),
        i = this.maximum();
    this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, (d = ((a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.isVisible() && this.update();
  }, e.prototype.next = function (a) {
    a = a || !1, this.to(this.relative(this.current()) + 1, a);
  }, e.prototype.prev = function (a) {
    a = a || !1, this.to(this.relative(this.current()) - 1, a);
  }, e.prototype.onTransitionEnd = function (a) {
    if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
    this.leave("animating"), this.trigger("translated");
  }, e.prototype.viewport = function () {
    var d;
    return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d;
  }, e.prototype.replace = function (b) {
    this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
      return 1 === this.nodeType;
    }).each(a.proxy(function (a, b) {
      b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
    }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items");
  }, e.prototype.add = function (b, c) {
    var e = this.relative(this._current);
    c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
      content: b,
      position: c
    }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
      content: b,
      position: c
    });
  }, e.prototype.remove = function (a) {
    (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
      content: this._items[a],
      position: a
    }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
      content: null,
      position: a
    }));
  }, e.prototype.preloadAutoWidthImages = function (b) {
    b.each(a.proxy(function (b, c) {
      this.enter("pre-loading"), c = a(c), a(new Image()).one("load", a.proxy(function (a) {
        c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh();
      }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"));
    }, this));
  }, e.prototype.destroy = function () {
    this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));

    for (var d in this._plugins) this._plugins[d].destroy();

    this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel");
  }, e.prototype.op = function (a, b, c) {
    var d = this.settings.rtl;

    switch (b) {
      case "<":
        return d ? a > c : a < c;

      case ">":
        return d ? a < c : a > c;

      case ">=":
        return d ? a <= c : a >= c;

      case "<=":
        return d ? a >= c : a <= c;
    }
  }, e.prototype.on = function (a, b, c, d) {
    a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c);
  }, e.prototype.off = function (a, b, c, d) {
    a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c);
  }, e.prototype.trigger = function (b, c, d, f, g) {
    var h = {
      item: {
        count: this._items.length,
        index: this.current()
      }
    },
        i = a.camelCase(a.grep(["on", b, d], function (a) {
      return a;
    }).join("-").toLowerCase()),
        j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
      relatedTarget: this
    }, h, c));
    return this._supress[b] || (a.each(this._plugins, function (a, b) {
      b.onTrigger && b.onTrigger(j);
    }), this.register({
      type: e.Type.Event,
      name: b
    }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j;
  }, e.prototype.enter = function (b) {
    a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
      this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++;
    }, this));
  }, e.prototype.leave = function (b) {
    a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
      this._states.current[b]--;
    }, this));
  }, e.prototype.register = function (b) {
    if (b.type === e.Type.Event) {
      if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
        var c = a.event.special[b.name]._default;
        a.event.special[b.name]._default = function (a) {
          return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments);
        }, a.event.special[b.name].owl = !0;
      }
    } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function (c, d) {
      return a.inArray(c, this._states.tags[b.name]) === d;
    }, this)));
  }, e.prototype.suppress = function (b) {
    a.each(b, a.proxy(function (a, b) {
      this._supress[b] = !0;
    }, this));
  }, e.prototype.release = function (b) {
    a.each(b, a.proxy(function (a, b) {
      delete this._supress[b];
    }, this));
  }, e.prototype.pointer = function (a) {
    var c = {
      x: null,
      y: null
    };
    return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c;
  }, e.prototype.isNumeric = function (a) {
    return !isNaN(parseFloat(a));
  }, e.prototype.difference = function (a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y
    };
  }, a.fn.owlCarousel = function (b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var d = a(this),
          f = d.data("owl.carousel");
      f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (b, c) {
        f.register({
          type: e.Type.Event,
          name: c
        }), f.$element.on(c + ".owl.carousel.core", a.proxy(function (a) {
          a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]));
        }, f));
      })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
    });
  }, a.fn.owlCarousel.Constructor = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function (b) {
    this._core = b, this._interval = null, this._visible = null, this._handlers = {
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoRefresh && this.watch();
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers);
  };

  e.Defaults = {
    autoRefresh: !0,
    autoRefreshInterval: 500
  }, e.prototype.watch = function () {
    this._interval || (this._visible = this._core.isVisible(), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval));
  }, e.prototype.refresh = function () {
    this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
  }, e.prototype.destroy = function () {
    var a, c;
    b.clearInterval(this._interval);

    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);

    for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function (b) {
    this._core = b, this._loaded = [], this._handlers = {
      "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (b) {
        if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
          var c = this._core.settings,
              e = c.center && Math.ceil(c.items / 2) || c.items,
              f = c.center && -1 * e || 0,
              g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f,
              h = this._core.clones().length,
              i = a.proxy(function (a, b) {
            this.load(b);
          }, this);

          for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager, c.loop && (g -= c.lazyLoadEager, e++)); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++;
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers);
  };

  e.Defaults = {
    lazyLoad: !1,
    lazyLoadEager: 0
  }, e.prototype.load = function (c) {
    var d = this._core.$stage.children().eq(c),
        e = d && d.find(".owl-lazy");

    !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
      var e,
          f = a(d),
          g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
      this._core.trigger("load", {
        element: f,
        url: g
      }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
        f.css("opacity", 1), this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy");
      }, this)).attr("src", g) : f.is("source") ? f.one("load.owl.lazy", a.proxy(function () {
        this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy");
      }, this)).attr("srcset", g) : (e = new Image(), e.onload = a.proxy(function () {
        f.css({
          "background-image": 'url("' + g + '")',
          opacity: "1"
        }), this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy");
      }, this), e.src = g);
    }, this)), this._loaded.push(d.get(0)));
  }, e.prototype.destroy = function () {
    var a, b;

    for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);

    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function (c) {
    this._core = c, this._previousHeight = null, this._handlers = {
      "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoHeight && this.update();
      }, this),
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update();
      }, this),
      "loaded.owl.lazy": a.proxy(function (a) {
        a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
    var d = this;
    a(b).on("load", function () {
      d._core.settings.autoHeight && d.update();
    }), a(b).resize(function () {
      d._core.settings.autoHeight && (null != d._intervalId && clearTimeout(d._intervalId), d._intervalId = setTimeout(function () {
        d.update();
      }, 250));
    });
  };

  e.Defaults = {
    autoHeight: !1,
    autoHeightClass: "owl-height"
  }, e.prototype.update = function () {
    var b = this._core._current,
        c = b + this._core.settings.items,
        d = this._core.settings.lazyLoad,
        e = this._core.$stage.children().toArray().slice(b, c),
        f = [],
        g = 0;

    a.each(e, function (b, c) {
      f.push(a(c).height());
    }), g = Math.max.apply(null, f), g <= 1 && d && this._previousHeight && (g = this._previousHeight), this._previousHeight = g, this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass);
  }, e.prototype.destroy = function () {
    var a, b;

    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);

    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function (b) {
    this._core = b, this._videos = {}, this._playing = null, this._handlers = {
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.register({
          type: "state",
          name: "playing",
          tags: ["interacting"]
        });
      }, this),
      "resize.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault();
      }, this),
      "refreshed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
      }, this),
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && "position" === a.property.name && this._playing && this.stop();
      }, this),
      "prepared.owl.carousel": a.proxy(function (b) {
        if (b.namespace) {
          var c = a(b.content).find(".owl-video");
          c.length && (c.css("display", "none"), this.fetch(c, a(b.content)));
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
      this.play(a);
    }, this));
  };

  e.Defaults = {
    video: !1,
    videoHeight: !1,
    videoWidth: !1
  }, e.prototype.fetch = function (a, b) {
    var c = function () {
      return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube";
    }(),
        d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
        e = a.attr("data-width") || this._core.settings.videoWidth,
        f = a.attr("data-height") || this._core.settings.videoHeight,
        g = a.attr("href");

    if (!g) throw new Error("Missing video URL.");
    if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";else if (d[3].indexOf("vimeo") > -1) c = "vimeo";else {
      if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
      c = "vzaar";
    }
    d = d[6], this._videos[g] = {
      type: c,
      id: d,
      width: e,
      height: f
    }, b.attr("data-video", g), this.thumbnail(a, this._videos[g]);
  }, e.prototype.thumbnail = function (b, c) {
    var d,
        e,
        f,
        g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;" : "",
        h = b.find("img"),
        i = "src",
        j = "",
        k = this._core.settings,
        l = function (c) {
      e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? a("<div/>", {
        class: "owl-video-tn " + j,
        srcType: c
      }) : a("<div/>", {
        class: "owl-video-tn",
        style: "opacity:1;background-image:url(" + c + ")"
      }), b.after(d), b.after(e);
    };

    if (b.wrap(a("<div/>", {
      class: "owl-video-wrapper",
      style: g
    })), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
    "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
      type: "GET",
      url: "//vimeo.com/api/v2/video/" + c.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function (a) {
        f = a[0].thumbnail_large, l(f);
      }
    }) : "vzaar" === c.type && a.ajax({
      type: "GET",
      url: "//vzaar.com/api/videos/" + c.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function (a) {
        f = a.framegrab_url, l(f);
      }
    });
  }, e.prototype.stop = function () {
    this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video");
  }, e.prototype.play = function (b) {
    var c,
        d = a(b.target),
        e = d.closest("." + this._core.settings.itemClass),
        f = this._videos[e.attr("data-video")],
        g = f.width || "100%",
        h = f.height || this._core.$stage.height();

    this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'), c.attr("height", h), c.attr("width", g), "youtube" === f.type ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id) : "vimeo" === f.type ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1") : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"), a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"));
  }, e.prototype.isInFullScreen = function () {
    var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
    return b && a(b).parent().hasClass("owl-video-frame");
  }, e.prototype.destroy = function () {
    var a, b;

    this._core.$element.off("click.owl.video");

    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);

    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.Video = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function (b) {
    this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
      "change.owl.carousel": a.proxy(function (a) {
        a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value);
      }, this),
      "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
        a.namespace && (this.swapping = "translated" == a.type);
      }, this),
      "translate.owl.carousel": a.proxy(function (a) {
        a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
      }, this)
    }, this.core.$element.on(this.handlers);
  };

  e.Defaults = {
    animateOut: !1,
    animateIn: !1
  }, e.prototype.swap = function () {
    if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
      this.core.speed(0);
      var b,
          c = a.proxy(this.clear, this),
          d = this.core.$stage.children().eq(this.previous),
          e = this.core.$stage.children().eq(this.next),
          f = this.core.settings.animateIn,
          g = this.core.settings.animateOut;
      this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
        left: b + "px"
      }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f));
    }
  }, e.prototype.clear = function (b) {
    a(b.target).css({
      left: ""
    }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd();
  }, e.prototype.destroy = function () {
    var a, b;

    for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);

    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.Animate = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function (b) {
    this._core = b, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._paused && (this._time = 0);
      }, this),
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoplay && this.play();
      }, this),
      "play.owl.autoplay": a.proxy(function (a, b, c) {
        a.namespace && this.play(b, c);
      }, this),
      "stop.owl.autoplay": a.proxy(function (a) {
        a.namespace && this.stop();
      }, this),
      "mouseover.owl.autoplay": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
      }, this),
      "mouseleave.owl.autoplay": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
      }, this),
      "touchstart.owl.core": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
      }, this),
      "touchend.owl.core": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this.play();
      }, this)
    }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options);
  };

  e.Defaults = {
    autoplay: !1,
    autoplayTimeout: 5e3,
    autoplayHoverPause: !1,
    autoplaySpeed: !1
  }, e.prototype._next = function (d) {
    this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed);
  }, e.prototype.read = function () {
    return new Date().getTime() - this._time;
  }, e.prototype.play = function (c, d) {
    var e;
    this._core.is("rotating") || this._core.enter("rotating"), c = c || this._core.settings.autoplayTimeout, e = Math.min(this._time % (this._timeout || c), c), this._paused ? (this._time = this.read(), this._paused = !1) : b.clearTimeout(this._call), this._time += this.read() % c - e, this._timeout = c, this._call = b.setTimeout(a.proxy(this._next, this, d), c - e);
  }, e.prototype.stop = function () {
    this._core.is("rotating") && (this._time = 0, this._paused = !0, b.clearTimeout(this._call), this._core.leave("rotating"));
  }, e.prototype.pause = function () {
    this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, b.clearTimeout(this._call));
  }, e.prototype.destroy = function () {
    var a, b;
    this.stop();

    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);

    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  "use strict";

  var e = function (b) {
    this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
    }, this._handlers = {
      "prepared.owl.carousel": a.proxy(function (b) {
        b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
      }, this),
      "added.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop());
      }, this),
      "remove.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1);
      }, this),
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && "position" == a.property.name && this.draw();
      }, this),
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"));
      }, this),
      "refreshed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers);
  };

  e.Defaults = {
    nav: !1,
    navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
    navSpeed: !1,
    navElement: 'button type="button" role="presentation"',
    navContainer: !1,
    navContainerClass: "owl-nav",
    navClass: ["owl-prev", "owl-next"],
    slideBy: 1,
    dotClass: "owl-dot",
    dotsClass: "owl-dots",
    dots: !0,
    dotsEach: !1,
    dotsData: !1,
    dotsSpeed: !1,
    dotsContainer: !1
  }, e.prototype.initialize = function () {
    var b,
        c = this._core.settings;
    this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function (a) {
      this.prev(c.navSpeed);
    }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function (a) {
      this.next(c.navSpeed);
    }, this)), c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", a.proxy(function (b) {
      var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
      b.preventDefault(), this.to(d, c.dotsSpeed);
    }, this));

    for (b in this._overrides) this._core[b] = a.proxy(this[b], this);
  }, e.prototype.destroy = function () {
    var a, b, c, d, e;
    e = this._core.settings;

    for (a in this._handlers) this.$element.off(a, this._handlers[a]);

    for (b in this._controls) "$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();

    for (d in this.overides) this._core[d] = this._overrides[d];

    for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null);
  }, e.prototype.update = function () {
    var a,
        b,
        c,
        d = this._core.clones().length / 2,
        e = d + this._core.items().length,
        f = this._core.maximum(!0),
        g = this._core.settings,
        h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;

    if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy) for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
      if (b >= h || 0 === b) {
        if (this._pages.push({
          start: Math.min(f, a - d),
          end: a - d + h - 1
        }), Math.min(f, a - d) === f) break;
        b = 0, ++c;
      }

      b += this._core.mergers(this._core.relative(a));
    }
  }, e.prototype.draw = function () {
    var b,
        c = this._core.settings,
        d = this._core.items().length <= c.items,
        e = this._core.relative(this._core.current()),
        f = c.loop || c.rewind;

    this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"));
  }, e.prototype.onTrigger = function (b) {
    var c = this._core.settings;
    b.page = {
      index: a.inArray(this.current(), this._pages),
      count: this._pages.length,
      size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
    };
  }, e.prototype.current = function () {
    var b = this._core.relative(this._core.current());

    return a.grep(this._pages, a.proxy(function (a, c) {
      return a.start <= b && a.end >= b;
    }, this)).pop();
  }, e.prototype.getPosition = function (b) {
    var c,
        d,
        e = this._core.settings;
    return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c;
  }, e.prototype.next = function (b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
  }, e.prototype.prev = function (b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
  }, e.prototype.to = function (b, c, d) {
    var e;
    !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c);
  }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  "use strict";

  var e = function (c) {
    this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
      "initialized.owl.carousel": a.proxy(function (c) {
        c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation");
      }, this),
      "prepared.owl.carousel": a.proxy(function (b) {
        if (b.namespace) {
          var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
          if (!c) return;
          this._hashes[c] = b.content;
        }
      }, this),
      "changed.owl.carousel": a.proxy(function (c) {
        if (c.namespace && "position" === c.property.name) {
          var d = this._core.items(this._core.relative(this._core.current())),
              e = a.map(this._hashes, function (a, b) {
            return a === d ? b : null;
          }).join();

          if (!e || b.location.hash.slice(1) === e) return;
          b.location.hash = e;
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function (a) {
      var c = b.location.hash.substring(1),
          e = this._core.$stage.children(),
          f = this._hashes[c] && e.index(this._hashes[c]);

      f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0);
    }, this));
  };

  e.Defaults = {
    URLhashListener: !1
  }, e.prototype.destroy = function () {
    var c, d;
    a(b).off("hashchange.owl.navigation");

    for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);

    for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null);
  }, a.fn.owlCarousel.Constructor.Plugins.Hash = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  function e(b, c) {
    var e = !1,
        f = b.charAt(0).toUpperCase() + b.slice(1);
    return a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
      if (g[b] !== d) return e = !c || b, !1;
    }), e;
  }

  function f(a) {
    return e(a, !0);
  }

  var g = a("<support>").get(0).style,
      h = "Webkit Moz O ms".split(" "),
      i = {
    transition: {
      end: {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        transition: "transitionend"
      }
    },
    animation: {
      end: {
        WebkitAnimation: "webkitAnimationEnd",
        MozAnimation: "animationend",
        OAnimation: "oAnimationEnd",
        animation: "animationend"
      }
    }
  },
      j = {
    csstransforms: function () {
      return !!e("transform");
    },
    csstransforms3d: function () {
      return !!e("perspective");
    },
    csstransitions: function () {
      return !!e("transition");
    },
    cssanimations: function () {
      return !!e("animation");
    }
  };
  j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d());
}(window.Zepto || window.jQuery, window, document);
/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!function (e, t) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t();
}("undefined" != typeof window ? window : this, function () {
  function e() {}

  var t = e.prototype;
  return t.on = function (e, t) {
    if (e && t) {
      var i = this._events = this._events || {},
          n = i[e] = i[e] || [];
      return n.indexOf(t) == -1 && n.push(t), this;
    }
  }, t.once = function (e, t) {
    if (e && t) {
      this.on(e, t);
      var i = this._onceEvents = this._onceEvents || {},
          n = i[e] = i[e] || {};
      return n[t] = !0, this;
    }
  }, t.off = function (e, t) {
    var i = this._events && this._events[e];

    if (i && i.length) {
      var n = i.indexOf(t);
      return n != -1 && i.splice(n, 1), this;
    }
  }, t.emitEvent = function (e, t) {
    var i = this._events && this._events[e];

    if (i && i.length) {
      i = i.slice(0), t = t || [];

      for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
        var r = i[o],
            s = n && n[r];
        s && (this.off(e, r), delete n[r]), r.apply(this, t);
      }

      return this;
    }
  }, t.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, e;
}), function (e, t) {
  "use strict";

  "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
    return t(e, i);
  }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter);
}("undefined" != typeof window ? window : this, function (e, t) {
  function i(e, t) {
    for (var i in t) e[i] = t[i];

    return e;
  }

  function n(e) {
    if (Array.isArray(e)) return e;
    var t = "object" == typeof e && "number" == typeof e.length;
    return t ? d.call(e) : [e];
  }

  function o(e, t, r) {
    if (!(this instanceof o)) return new o(e, t, r);
    var s = e;
    return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred()), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e));
  }

  function r(e) {
    this.img = e;
  }

  function s(e, t) {
    this.url = e, this.element = t, this.img = new Image();
  }

  var h = e.jQuery,
      a = e.console,
      d = Array.prototype.slice;
  o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
    this.images = [], this.elements.forEach(this.addElementImages, this);
  }, o.prototype.addElementImages = function (e) {
    "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
    var t = e.nodeType;

    if (t && u[t]) {
      for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
        var o = i[n];
        this.addImage(o);
      }

      if ("string" == typeof this.options.background) {
        var r = e.querySelectorAll(this.options.background);

        for (n = 0; n < r.length; n++) {
          var s = r[n];
          this.addElementBackgroundImages(s);
        }
      }
    }
  };
  var u = {
    1: !0,
    9: !0,
    11: !0
  };
  return o.prototype.addElementBackgroundImages = function (e) {
    var t = getComputedStyle(e);
    if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
      var o = n && n[2];
      o && this.addBackground(o, e), n = i.exec(t.backgroundImage);
    }
  }, o.prototype.addImage = function (e) {
    var t = new r(e);
    this.images.push(t);
  }, o.prototype.addBackground = function (e, t) {
    var i = new s(e, t);
    this.images.push(i);
  }, o.prototype.check = function () {
    function e(e, i, n) {
      setTimeout(function () {
        t.progress(e, i, n);
      });
    }

    var t = this;
    return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) {
      t.once("progress", e), t.check();
    }) : void this.complete();
  }, o.prototype.progress = function (e, t, i) {
    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t);
  }, o.prototype.complete = function () {
    var e = this.hasAnyBroken ? "fail" : "done";

    if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
      var t = this.hasAnyBroken ? "reject" : "resolve";
      this.jqDeferred[t](this);
    }
  }, r.prototype = Object.create(t.prototype), r.prototype.check = function () {
    var e = this.getIsImageComplete();
    return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image(), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src));
  }, r.prototype.getIsImageComplete = function () {
    return this.img.complete && this.img.naturalWidth;
  }, r.prototype.confirm = function (e, t) {
    this.isLoaded = e, this.emitEvent("progress", [this, this.img, t]);
  }, r.prototype.handleEvent = function (e) {
    var t = "on" + e.type;
    this[t] && this[t](e);
  }, r.prototype.onload = function () {
    this.confirm(!0, "onload"), this.unbindEvents();
  }, r.prototype.onerror = function () {
    this.confirm(!1, "onerror"), this.unbindEvents();
  }, r.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
    var e = this.getIsImageComplete();
    e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
  }, s.prototype.unbindEvents = function () {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, s.prototype.confirm = function (e, t) {
    this.isLoaded = e, this.emitEvent("progress", [this, this.element, t]);
  }, o.makeJQueryPlugin = function (t) {
    t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function (e, t) {
      var i = new o(this, e, t);
      return i.jqDeferred.promise(h(this));
    });
  }, o.makeJQueryPlugin(), o;
});
/*!
 * Infinite Scroll PACKAGED v3.0.6
 * Automatically add next page
 *
 * Licensed GPLv3 for open source use
 * or Infinite Scroll Commercial License for commercial use
 *
 * https://infinite-scroll.com
 * Copyright 2018 Metafizzy
 */
!function (t, e) {
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
    return e(t, i);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery);
}(window, function (t, e) {
  "use strict";

  function i(i, r, l) {
    function a(t, e, n) {
      var o,
          r = "$()." + i + '("' + e + '")';
      return t.each(function (t, a) {
        var h = l.data(a, i);
        if (!h) return void s(i + " not initialized. Cannot call methods, i.e. " + r);
        var c = h[e];
        if (!c || "_" == e.charAt(0)) return void s(r + " is not a valid method");
        var u = c.apply(h, n);
        o = void 0 === o ? u : o;
      }), void 0 !== o ? o : t;
    }

    function h(t, e) {
      t.each(function (t, n) {
        var o = l.data(n, i);
        o ? (o.option(e), o._init()) : (o = new r(n, e), l.data(n, i, o));
      });
    }

    l = l || e || t.jQuery, l && (r.prototype.option || (r.prototype.option = function (t) {
      l.isPlainObject(t) && (this.options = l.extend(!0, this.options, t));
    }), l.fn[i] = function (t) {
      if ("string" == typeof t) {
        var e = o.call(arguments, 1);
        return a(this, t, e);
      }

      return h(this, t), this;
    }, n(l));
  }

  function n(t) {
    !t || t && t.bridget || (t.bridget = i);
  }

  var o = Array.prototype.slice,
      r = t.console,
      s = "undefined" == typeof r ? function () {} : function (t) {
    r.error(t);
  };
  return n(e || t.jQuery), i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : this, function () {
  function t() {}

  var e = t.prototype;
  return e.on = function (t, e) {
    if (t && e) {
      var i = this._events = this._events || {},
          n = i[t] = i[t] || [];
      return n.indexOf(e) == -1 && n.push(e), this;
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {},
          n = i[t] = i[t] || {};
      return n[e] = !0, this;
    }
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];

    if (i && i.length) {
      var n = i.indexOf(e);
      return n != -1 && i.splice(n, 1), this;
    }
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];

    if (i && i.length) {
      i = i.slice(0), e = e || [];

      for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
        var r = i[o],
            s = n && n[r];
        s && (this.off(t, r), delete n[r]), r.apply(this, e);
      }

      return this;
    }
  }, e.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, t;
}), function (t, e) {
  "use strict";

  "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e();
}(window, function () {
  "use strict";

  var t = function () {
    var t = window.Element.prototype;
    if (t.matches) return "matches";
    if (t.matchesSelector) return "matchesSelector";

    for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
      var n = e[i],
          o = n + "MatchesSelector";
      if (t[o]) return o;
    }
  }();

  return function (e, i) {
    return e[t](i);
  };
}), function (t, e) {
  "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
    return e(t, i);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector);
}(window, function (t, e) {
  var i = {};
  i.extend = function (t, e) {
    for (var i in e) t[i] = e[i];

    return t;
  }, i.modulo = function (t, e) {
    return (t % e + e) % e;
  };
  var n = Array.prototype.slice;
  i.makeArray = function (t) {
    if (Array.isArray(t)) return t;
    if (null === t || void 0 === t) return [];
    var e = "object" == typeof t && "number" == typeof t.length;
    return e ? n.call(t) : [t];
  }, i.removeFrom = function (t, e) {
    var i = t.indexOf(e);
    i != -1 && t.splice(i, 1);
  }, i.getParent = function (t, i) {
    for (; t.parentNode && t != document.body;) if (t = t.parentNode, e(t, i)) return t;
  }, i.getQueryElement = function (t) {
    return "string" == typeof t ? document.querySelector(t) : t;
  }, i.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, i.filterFindElements = function (t, n) {
    t = i.makeArray(t);
    var o = [];
    return t.forEach(function (t) {
      if (t instanceof HTMLElement) {
        if (!n) return void o.push(t);
        e(t, n) && o.push(t);

        for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r]);
      }
    }), o;
  }, i.debounceMethod = function (t, e, i) {
    i = i || 100;
    var n = t.prototype[e],
        o = e + "Timeout";

    t.prototype[e] = function () {
      var t = this[o];
      clearTimeout(t);
      var e = arguments,
          r = this;
      this[o] = setTimeout(function () {
        n.apply(r, e), delete r[o];
      }, i);
    };
  }, i.docReady = function (t) {
    var e = document.readyState;
    "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
  }, i.toDashed = function (t) {
    return t.replace(/(.)([A-Z])/g, function (t, e, i) {
      return e + "-" + i;
    }).toLowerCase();
  };
  var o = t.console;
  return i.htmlInit = function (e, n) {
    i.docReady(function () {
      var r = i.toDashed(n),
          s = "data-" + r,
          l = document.querySelectorAll("[" + s + "]"),
          a = document.querySelectorAll(".js-" + r),
          h = i.makeArray(l).concat(i.makeArray(a)),
          c = s + "-options",
          u = t.jQuery;
      h.forEach(function (t) {
        var i,
            r = t.getAttribute(s) || t.getAttribute(c);

        try {
          i = r && JSON.parse(r);
        } catch (l) {
          return void (o && o.error("Error parsing " + s + " on " + t.className + ": " + l));
        }

        var a = new e(t, i);
        u && u.data(t, n, a);
      });
    });
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("infinite-scroll/js/core", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils"], function (i, n) {
    return e(t, i, n);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("fizzy-ui-utils")) : t.InfiniteScroll = e(t, t.EvEmitter, t.fizzyUIUtils);
}(window, function (t, e, i) {
  function n(t, e) {
    var s = i.getQueryElement(t);
    if (!s) return void console.error("Bad element for InfiniteScroll: " + (s || t));

    if (t = s, t.infiniteScrollGUID) {
      var l = r[t.infiniteScrollGUID];
      return l.option(e), l;
    }

    this.element = t, this.options = i.extend({}, n.defaults), this.option(e), o && (this.$element = o(this.element)), this.create();
  }

  var o = t.jQuery,
      r = {};
  n.defaults = {}, n.create = {}, n.destroy = {};
  var s = n.prototype;
  i.extend(s, e.prototype);
  var l = 0;
  s.create = function () {
    var t = this.guid = ++l;
    this.element.infiniteScrollGUID = t, r[t] = this, this.pageIndex = 1, this.loadCount = 0, this.updateGetPath();
    var e = this.getPath && this.getPath();
    if (!e) return void console.error("Disabling InfiniteScroll");
    this.updateGetAbsolutePath(), this.log("initialized", [this.element.className]), this.callOnInit();

    for (var i in n.create) n.create[i].call(this);
  }, s.option = function (t) {
    i.extend(this.options, t);
  }, s.callOnInit = function () {
    var t = this.options.onInit;
    t && t.call(this, this);
  }, s.dispatchEvent = function (t, e, i) {
    this.log(t, i);
    var n = e ? [e].concat(i) : i;

    if (this.emitEvent(t, n), o && this.$element) {
      t += ".infiniteScroll";
      var r = t;

      if (e) {
        var s = o.Event(e);
        s.type = t, r = s;
      }

      this.$element.trigger(r, i);
    }
  };
  var a = {
    initialized: function (t) {
      return "on " + t;
    },
    request: function (t) {
      return "URL: " + t;
    },
    load: function (t, e) {
      return (t.title || "") + ". URL: " + e;
    },
    error: function (t, e) {
      return t + ". URL: " + e;
    },
    append: function (t, e, i) {
      return i.length + " items. URL: " + e;
    },
    last: function (t, e) {
      return "URL: " + e;
    },
    history: function (t, e) {
      return "URL: " + e;
    },
    pageIndex: function (t, e) {
      return "current page determined to be: " + t + " from " + e;
    }
  };
  s.log = function (t, e) {
    if (this.options.debug) {
      var i = "[InfiniteScroll] " + t,
          n = a[t];
      n && (i += ". " + n.apply(this, e)), console.log(i);
    }
  }, s.updateMeasurements = function () {
    this.windowHeight = t.innerHeight;
    var e = this.element.getBoundingClientRect();
    this.top = e.top + t.pageYOffset;
  }, s.updateScroller = function () {
    var e = this.options.elementScroll;
    if (!e) return void (this.scroller = t);
    if (this.scroller = e === !0 ? this.element : i.getQueryElement(e), !this.scroller) throw "Unable to find elementScroll: " + e;
  }, s.updateGetPath = function () {
    var t = this.options.path;
    if (!t) return void console.error("InfiniteScroll path option required. Set as: " + t);
    var e = typeof t;
    if ("function" == e) return void (this.getPath = t);
    var i = "string" == e && t.match("{{#}}");
    return i ? void this.updateGetPathTemplate(t) : void this.updateGetPathSelector(t);
  }, s.updateGetPathTemplate = function (t) {
    this.getPath = function () {
      var e = this.pageIndex + 1;
      return t.replace("{{#}}", e);
    }.bind(this);

    var e = t.replace(/(\\\?|\?)/, "\\?").replace("{{#}}", "(\\d\\d?\\d?)"),
        i = new RegExp(e),
        n = location.href.match(i);
    n && (this.pageIndex = parseInt(n[1], 10), this.log("pageIndex", [this.pageIndex, "template string"]));
  };
  var h = [/^(.*?\/?page\/?)(\d\d?\d?)(.*?$)/, /^(.*?\/?\?page=)(\d\d?\d?)(.*?$)/, /(.*?)(\d\d?\d?)(?!.*\d)(.*?$)/];
  return s.updateGetPathSelector = function (t) {
    var e = document.querySelector(t);
    if (!e) return void console.error("Bad InfiniteScroll path option. Next link not found: " + t);

    for (var i, n, o = e.getAttribute("href"), r = 0; o && r < h.length; r++) {
      n = h[r];
      var s = o.match(n);

      if (s) {
        i = s.slice(1);
        break;
      }
    }

    return i ? (this.isPathSelector = !0, this.getPath = function () {
      var t = this.pageIndex + 1;
      return i[0] + t + i[2];
    }.bind(this), this.pageIndex = parseInt(i[1], 10) - 1, void this.log("pageIndex", [this.pageIndex, "next link"])) : void console.error("InfiniteScroll unable to parse next link href: " + o);
  }, s.updateGetAbsolutePath = function () {
    var t = this.getPath(),
        e = t.match(/^http/) || t.match(/^\//);
    if (e) return void (this.getAbsolutePath = this.getPath);
    var i = location.pathname,
        n = t.match(/^\?/);
    if (n) return void (this.getAbsolutePath = function () {
      return i + this.getPath();
    });
    var o = i.substring(0, i.lastIndexOf("/"));

    this.getAbsolutePath = function () {
      return o + "/" + this.getPath();
    };
  }, n.create.hideNav = function () {
    var t = i.getQueryElement(this.options.hideNav);
    t && (t.style.display = "none", this.nav = t);
  }, n.destroy.hideNav = function () {
    this.nav && (this.nav.style.display = "");
  }, s.destroy = function () {
    this.allOff();

    for (var t in n.destroy) n.destroy[t].call(this);

    delete this.element.infiniteScrollGUID, delete r[this.guid], o && this.$element && o.removeData(this.element, "infiniteScroll");
  }, n.throttle = function (t, e) {
    e = e || 200;
    var i, n;
    return function () {
      var o = +new Date(),
          r = arguments,
          s = function () {
        i = o, t.apply(this, r);
      }.bind(this);

      i && o < i + e ? (clearTimeout(n), n = setTimeout(s, e)) : s();
    };
  }, n.data = function (t) {
    t = i.getQueryElement(t);
    var e = t && t.infiniteScrollGUID;
    return e && r[e];
  }, n.setJQuery = function (t) {
    o = t;
  }, i.htmlInit(n, "infinite-scroll"), s._init = function () {}, o && o.bridget && o.bridget("infiniteScroll", n), n;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("infinite-scroll/js/page-load", ["./core"], function (i) {
    return e(t, i);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./core")) : e(t, t.InfiniteScroll);
}(window, function (t, e) {
  function i(t) {
    for (var e = document.createDocumentFragment(), i = 0; t && i < t.length; i++) e.appendChild(t[i]);

    return e;
  }

  function n(t) {
    for (var e = t.querySelectorAll("script"), i = 0; i < e.length; i++) {
      var n = e[i],
          r = document.createElement("script");
      o(n, r), r.innerHTML = n.innerHTML, n.parentNode.replaceChild(r, n);
    }
  }

  function o(t, e) {
    for (var i = t.attributes, n = 0; n < i.length; n++) {
      var o = i[n];
      e.setAttribute(o.name, o.value);
    }
  }

  function r(t, e, i, n, o) {
    var r = new XMLHttpRequest();
    r.open("GET", t, !0), r.responseType = e || "", r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), r.onload = function () {
      if (200 == r.status) i(r.response);else if (204 == r.status) o(r.response);else {
        var t = new Error(r.statusText);
        n(t);
      }
    }, r.onerror = function () {
      var e = new Error("Network error requesting " + t);
      n(e);
    }, r.send();
  }

  var s = e.prototype;
  return e.defaults.loadOnScroll = !0, e.defaults.checkLastPage = !0, e.defaults.responseType = "document", e.create.pageLoad = function () {
    this.canLoad = !0, this.on("scrollThreshold", this.onScrollThresholdLoad), this.on("load", this.checkLastPage), this.options.outlayer && this.on("append", this.onAppendOutlayer);
  }, s.onScrollThresholdLoad = function () {
    this.options.loadOnScroll && this.loadNextPage();
  }, s.loadNextPage = function () {
    if (!this.isLoading && this.canLoad) {
      var t = this.getAbsolutePath();
      this.isLoading = !0;

      var e = function (e) {
        this.onPageLoad(e, t);
      }.bind(this),
          i = function (e) {
        this.onPageError(e, t);
      }.bind(this),
          n = function (e) {
        this.lastPageReached(e, t);
      }.bind(this);

      r(t, this.options.responseType, e, i, n), this.dispatchEvent("request", null, [t]);
    }
  }, s.onPageLoad = function (t, e) {
    return this.options.append || (this.isLoading = !1), this.pageIndex++, this.loadCount++, this.dispatchEvent("load", null, [t, e]), this.appendNextPage(t, e), t;
  }, s.appendNextPage = function (t, e) {
    var n = this.options.append,
        o = "document" == this.options.responseType;

    if (o && n) {
      var r = t.querySelectorAll(n),
          s = i(r),
          l = function () {
        this.appendItems(r, s), this.isLoading = !1, this.dispatchEvent("append", null, [t, e, r]);
      }.bind(this);

      this.options.outlayer ? this.appendOutlayerItems(s, l) : l();
    }
  }, s.appendItems = function (t, e) {
    t && t.length && (e = e || i(t), n(e), this.element.appendChild(e));
  }, s.appendOutlayerItems = function (i, n) {
    var o = e.imagesLoaded || t.imagesLoaded;
    return o ? void o(i, n) : (console.error("[InfiniteScroll] imagesLoaded required for outlayer option"), void (this.isLoading = !1));
  }, s.onAppendOutlayer = function (t, e, i) {
    this.options.outlayer.appended(i);
  }, s.checkLastPage = function (t, e) {
    var i = this.options.checkLastPage;

    if (i) {
      var n = this.options.path;

      if ("function" == typeof n) {
        var o = this.getPath();
        if (!o) return void this.lastPageReached(t, e);
      }

      var r;

      if ("string" == typeof i ? r = i : this.isPathSelector && (r = n), r && t.querySelector) {
        var s = t.querySelector(r);
        s || this.lastPageReached(t, e);
      }
    }
  }, s.lastPageReached = function (t, e) {
    this.canLoad = !1, this.dispatchEvent("last", null, [t, e]);
  }, s.onPageError = function (t, e) {
    return this.isLoading = !1, this.canLoad = !1, this.dispatchEvent("error", null, [t, e]), t;
  }, e.create.prefill = function () {
    if (this.options.prefill) {
      var t = this.options.append;
      if (!t) return void console.error("append option required for prefill. Set as :" + t);
      this.updateMeasurements(), this.updateScroller(), this.isPrefilling = !0, this.on("append", this.prefill), this.once("error", this.stopPrefill), this.once("last", this.stopPrefill), this.prefill();
    }
  }, s.prefill = function () {
    var t = this.getPrefillDistance();
    this.isPrefilling = t >= 0, this.isPrefilling ? (this.log("prefill"), this.loadNextPage()) : this.stopPrefill();
  }, s.getPrefillDistance = function () {
    return this.options.elementScroll ? this.scroller.clientHeight - this.scroller.scrollHeight : this.windowHeight - this.element.clientHeight;
  }, s.stopPrefill = function () {
    this.log("stopPrefill"), this.off("append", this.prefill);
  }, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("infinite-scroll/js/scroll-watch", ["./core", "fizzy-ui-utils/utils"], function (i, n) {
    return e(t, i, n);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./core"), require("fizzy-ui-utils")) : e(t, t.InfiniteScroll, t.fizzyUIUtils);
}(window, function (t, e, i) {
  var n = e.prototype;
  return e.defaults.scrollThreshold = 400, e.create.scrollWatch = function () {
    this.pageScrollHandler = this.onPageScroll.bind(this), this.resizeHandler = this.onResize.bind(this);
    var t = this.options.scrollThreshold,
        e = t || 0 === t;
    e && this.enableScrollWatch();
  }, e.destroy.scrollWatch = function () {
    this.disableScrollWatch();
  }, n.enableScrollWatch = function () {
    this.isScrollWatching || (this.isScrollWatching = !0, this.updateMeasurements(), this.updateScroller(), this.on("last", this.disableScrollWatch), this.bindScrollWatchEvents(!0));
  }, n.disableScrollWatch = function () {
    this.isScrollWatching && (this.bindScrollWatchEvents(!1), delete this.isScrollWatching);
  }, n.bindScrollWatchEvents = function (e) {
    var i = e ? "addEventListener" : "removeEventListener";
    this.scroller[i]("scroll", this.pageScrollHandler), t[i]("resize", this.resizeHandler);
  }, n.onPageScroll = e.throttle(function () {
    var t = this.getBottomDistance();
    t <= this.options.scrollThreshold && this.dispatchEvent("scrollThreshold");
  }), n.getBottomDistance = function () {
    return this.options.elementScroll ? this.getElementBottomDistance() : this.getWindowBottomDistance();
  }, n.getWindowBottomDistance = function () {
    var e = this.top + this.element.clientHeight,
        i = t.pageYOffset + this.windowHeight;
    return e - i;
  }, n.getElementBottomDistance = function () {
    var t = this.scroller.scrollHeight,
        e = this.scroller.scrollTop + this.scroller.clientHeight;
    return t - e;
  }, n.onResize = function () {
    this.updateMeasurements();
  }, i.debounceMethod(e, "onResize", 150), e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("infinite-scroll/js/history", ["./core", "fizzy-ui-utils/utils"], function (i, n) {
    return e(t, i, n);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./core"), require("fizzy-ui-utils")) : e(t, t.InfiniteScroll, t.fizzyUIUtils);
}(window, function (t, e, i) {
  var n = e.prototype;
  e.defaults.history = "replace";
  var o = document.createElement("a");
  return e.create.history = function () {
    if (this.options.history) {
      o.href = this.getAbsolutePath();
      var t = o.origin || o.protocol + "//" + o.host,
          e = t == location.origin;
      return e ? void (this.options.append ? this.createHistoryAppend() : this.createHistoryPageLoad()) : void console.error("[InfiniteScroll] cannot set history with different origin: " + o.origin + " on " + location.origin + " . History behavior disabled.");
    }
  }, n.createHistoryAppend = function () {
    this.updateMeasurements(), this.updateScroller(), this.scrollPages = [{
      top: 0,
      path: location.href,
      title: document.title
    }], this.scrollPageIndex = 0, this.scrollHistoryHandler = this.onScrollHistory.bind(this), this.unloadHandler = this.onUnload.bind(this), this.scroller.addEventListener("scroll", this.scrollHistoryHandler), this.on("append", this.onAppendHistory), this.bindHistoryAppendEvents(!0);
  }, n.bindHistoryAppendEvents = function (e) {
    var i = e ? "addEventListener" : "removeEventListener";
    this.scroller[i]("scroll", this.scrollHistoryHandler), t[i]("unload", this.unloadHandler);
  }, n.createHistoryPageLoad = function () {
    this.on("load", this.onPageLoadHistory);
  }, e.destroy.history = n.destroyHistory = function () {
    var t = this.options.history && this.options.append;
    t && this.bindHistoryAppendEvents(!1);
  }, n.onAppendHistory = function (t, e, i) {
    if (i && i.length) {
      var n = i[0],
          r = this.getElementScrollY(n);
      o.href = e, this.scrollPages.push({
        top: r,
        path: o.href,
        title: t.title
      });
    }
  }, n.getElementScrollY = function (t) {
    return this.options.elementScroll ? this.getElementElementScrollY(t) : this.getElementWindowScrollY(t);
  }, n.getElementWindowScrollY = function (e) {
    var i = e.getBoundingClientRect();
    return i.top + t.pageYOffset;
  }, n.getElementElementScrollY = function (t) {
    return t.offsetTop - this.top;
  }, n.onScrollHistory = function () {
    for (var t, e, i = this.getScrollViewY(), n = 0; n < this.scrollPages.length; n++) {
      var o = this.scrollPages[n];
      if (o.top >= i) break;
      t = n, e = o;
    }

    t != this.scrollPageIndex && (this.scrollPageIndex = t, this.setHistory(e.title, e.path));
  }, i.debounceMethod(e, "onScrollHistory", 150), n.getScrollViewY = function () {
    return this.options.elementScroll ? this.scroller.scrollTop + this.scroller.clientHeight / 2 : t.pageYOffset + this.windowHeight / 2;
  }, n.setHistory = function (t, e) {
    var i = this.options.history,
        n = i && history[i + "State"];
    n && (history[i + "State"](null, t, e), this.options.historyTitle && (document.title = t), this.dispatchEvent("history", null, [t, e]));
  }, n.onUnload = function () {
    var e = this.scrollPageIndex;

    if (0 !== e) {
      var i = this.scrollPages[e],
          n = t.pageYOffset - i.top + this.top;
      this.destroyHistory(), scrollTo(0, n);
    }
  }, n.onPageLoadHistory = function (t, e) {
    this.setHistory(t.title, e);
  }, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("infinite-scroll/js/button", ["./core", "fizzy-ui-utils/utils"], function (i, n) {
    return e(t, i, n);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./core"), require("fizzy-ui-utils")) : e(t, t.InfiniteScroll, t.fizzyUIUtils);
}(window, function (t, e, i) {
  function n(t, e) {
    this.element = t, this.infScroll = e, this.clickHandler = this.onClick.bind(this), this.element.addEventListener("click", this.clickHandler), e.on("request", this.disable.bind(this)), e.on("load", this.enable.bind(this)), e.on("error", this.hide.bind(this)), e.on("last", this.hide.bind(this));
  }

  return e.create.button = function () {
    var t = i.getQueryElement(this.options.button);
    if (t) return void (this.button = new n(t, this));
  }, e.destroy.button = function () {
    this.button && this.button.destroy();
  }, n.prototype.onClick = function (t) {
    t.preventDefault(), this.infScroll.loadNextPage();
  }, n.prototype.enable = function () {
    this.element.removeAttribute("disabled");
  }, n.prototype.disable = function () {
    this.element.disabled = "disabled";
  }, n.prototype.hide = function () {
    this.element.style.display = "none";
  }, n.prototype.destroy = function () {
    this.element.removeEventListener("click", this.clickHandler);
  }, e.Button = n, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("infinite-scroll/js/status", ["./core", "fizzy-ui-utils/utils"], function (i, n) {
    return e(t, i, n);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./core"), require("fizzy-ui-utils")) : e(t, t.InfiniteScroll, t.fizzyUIUtils);
}(window, function (t, e, i) {
  function n(t) {
    r(t, "none");
  }

  function o(t) {
    r(t, "block");
  }

  function r(t, e) {
    t && (t.style.display = e);
  }

  var s = e.prototype;
  return e.create.status = function () {
    var t = i.getQueryElement(this.options.status);
    t && (this.statusElement = t, this.statusEventElements = {
      request: t.querySelector(".infinite-scroll-request"),
      error: t.querySelector(".infinite-scroll-error"),
      last: t.querySelector(".infinite-scroll-last")
    }, this.on("request", this.showRequestStatus), this.on("error", this.showErrorStatus), this.on("last", this.showLastStatus), this.bindHideStatus("on"));
  }, s.bindHideStatus = function (t) {
    var e = this.options.append ? "append" : "load";
    this[t](e, this.hideAllStatus);
  }, s.showRequestStatus = function () {
    this.showStatus("request");
  }, s.showErrorStatus = function () {
    this.showStatus("error");
  }, s.showLastStatus = function () {
    this.showStatus("last"), this.bindHideStatus("off");
  }, s.showStatus = function (t) {
    o(this.statusElement), this.hideStatusEventElements();
    var e = this.statusEventElements[t];
    o(e);
  }, s.hideAllStatus = function () {
    n(this.statusElement), this.hideStatusEventElements();
  }, s.hideStatusEventElements = function () {
    for (var t in this.statusEventElements) {
      var e = this.statusEventElements[t];
      n(e);
    }
  }, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define(["infinite-scroll/js/core", "infinite-scroll/js/page-load", "infinite-scroll/js/scroll-watch", "infinite-scroll/js/history", "infinite-scroll/js/button", "infinite-scroll/js/status"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./core"), require("./page-load"), require("./scroll-watch"), require("./history"), require("./button"), require("./status")));
}(window, function (t) {
  return t;
}), function (t, e) {
  "use strict";

  "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function (i) {
    return e(t, i);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter);
}("undefined" != typeof window ? window : this, function (t, e) {
  function i(t, e) {
    for (var i in e) t[i] = e[i];

    return t;
  }

  function n(t) {
    if (Array.isArray(t)) return t;
    var e = "object" == typeof t && "number" == typeof t.length;
    return e ? h.call(t) : [t];
  }

  function o(t, e, r) {
    if (!(this instanceof o)) return new o(t, e, r);
    var s = t;
    return "string" == typeof t && (s = document.querySelectorAll(t)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), l && (this.jqDeferred = new l.Deferred()), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || t));
  }

  function r(t) {
    this.img = t;
  }

  function s(t, e) {
    this.url = t, this.element = e, this.img = new Image();
  }

  var l = t.jQuery,
      a = t.console,
      h = Array.prototype.slice;
  o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
    this.images = [], this.elements.forEach(this.addElementImages, this);
  }, o.prototype.addElementImages = function (t) {
    "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
    var e = t.nodeType;

    if (e && c[e]) {
      for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
        var o = i[n];
        this.addImage(o);
      }

      if ("string" == typeof this.options.background) {
        var r = t.querySelectorAll(this.options.background);

        for (n = 0; n < r.length; n++) {
          var s = r[n];
          this.addElementBackgroundImages(s);
        }
      }
    }
  };
  var c = {
    1: !0,
    9: !0,
    11: !0
  };
  return o.prototype.addElementBackgroundImages = function (t) {
    var e = getComputedStyle(t);
    if (e) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
      var o = n && n[2];
      o && this.addBackground(o, t), n = i.exec(e.backgroundImage);
    }
  }, o.prototype.addImage = function (t) {
    var e = new r(t);
    this.images.push(e);
  }, o.prototype.addBackground = function (t, e) {
    var i = new s(t, e);
    this.images.push(i);
  }, o.prototype.check = function () {
    function t(t, i, n) {
      setTimeout(function () {
        e.progress(t, i, n);
      });
    }

    var e = this;
    return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (e) {
      e.once("progress", t), e.check();
    }) : void this.complete();
  }, o.prototype.progress = function (t, e, i) {
    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e);
  }, o.prototype.complete = function () {
    var t = this.hasAnyBroken ? "fail" : "done";

    if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
      var e = this.hasAnyBroken ? "reject" : "resolve";
      this.jqDeferred[e](this);
    }
  }, r.prototype = Object.create(e.prototype), r.prototype.check = function () {
    var t = this.getIsImageComplete();
    return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image(), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src));
  }, r.prototype.getIsImageComplete = function () {
    return this.img.complete && this.img.naturalWidth;
  }, r.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.img, e]);
  }, r.prototype.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, r.prototype.onload = function () {
    this.confirm(!0, "onload"), this.unbindEvents();
  }, r.prototype.onerror = function () {
    this.confirm(!1, "onerror"), this.unbindEvents();
  }, r.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
    var t = this.getIsImageComplete();
    t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
  }, s.prototype.unbindEvents = function () {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, s.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.element, e]);
  }, o.makeJQueryPlugin = function (e) {
    e = e || t.jQuery, e && (l = e, l.fn.imagesLoaded = function (t, e) {
      var i = new o(this, t, e);
      return i.jqDeferred.promise(l(this));
    });
  }, o.makeJQueryPlugin(), o;
});
/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto);
}(function (a) {
  var b,
      c,
      d,
      e,
      f,
      g,
      h = "Close",
      i = "BeforeClose",
      j = "AfterClose",
      k = "BeforeAppend",
      l = "MarkupParse",
      m = "Open",
      n = "Change",
      o = "mfp",
      p = "." + o,
      q = "mfp-ready",
      r = "mfp-removing",
      s = "mfp-prevent-close",
      t = function () {},
      u = !!window.jQuery,
      v = a(window),
      w = function (a, c) {
    b.ev.on(o + a + p, c);
  },
      x = function (b, c, d, e) {
    var f = document.createElement("div");
    return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f;
  },
      y = function (c, d) {
    b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
  },
      z = function (c) {
    return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn;
  },
      A = function () {
    a.magnificPopup.instance || (b = new t(), b.init(), a.magnificPopup.instance = b);
  },
      B = function () {
    var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
    if (void 0 !== a.transition) return !0;

    for (; b.length;) if (b.pop() + "Transition" in a) return !0;

    return !1;
  };

  t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {};
    },
    open: function (c) {
      var e;

      if (c.isObj === !1) {
        b.items = c.items.toArray(), b.index = 0;
        var g,
            h = c.items;

        for (e = 0; e < h.length; e++) if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
          b.index = e;
          break;
        }
      } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;

      if (b.isOpen) return void b.updateItemHTML();
      b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function () {
        b.close();
      }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function (a) {
        b._checkIfClose(a.target) && b.close();
      }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;

      for (e = 0; e < i.length; e++) {
        var j = i[e];
        j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b);
      }

      y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function (a, b, c, d) {
        c.close_replaceWith = z(d.type);
      }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
        overflow: b.st.overflowY,
        overflowX: "hidden",
        overflowY: b.st.overflowY
      }) : b.wrap.css({
        top: v.scrollTop(),
        position: "absolute"
      }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
        height: d.height(),
        position: "absolute"
      }), b.st.enableEscapeKey && d.on("keyup" + p, function (a) {
        27 === a.keyCode && b.close();
      }), v.on("resize" + p, function () {
        b.updateSize();
      }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
      var k = b.wH = v.height(),
          n = {};

      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();

        o && (n.marginRight = o);
      }

      b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
      var r = b.st.mainClass;
      return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function () {
        b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn);
      }, 16), b.isOpen = !0, b.updateSize(k), y(m), c;
    },
    close: function () {
      b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function () {
        b._close();
      }, b.st.removalDelay)) : b._close());
    },
    _close: function () {
      y(h);
      var c = r + " " + q + " ";

      if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
        var e = {
          marginRight: ""
        };
        b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e);
      }

      d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j);
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
            d = window.innerHeight * c;
        b.wrap.css("height", d), b.wH = d;
      } else b.wH = a || v.height();

      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
      var d = c.type;

      if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0;
      }

      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
      b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange");
    },
    appendContent: function (a, c) {
      b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content);
    },
    parseEl: function (c) {
      var d,
          e = b.items[c];

      if (e.tagName ? e = {
        el: a(e)
      } : (d = e.type, e = {
        data: e,
        src: e.src
      }), e.el) {
        for (var f = b.types, g = 0; g < f.length; g++) if (e.el.hasClass("mfp-" + f[g])) {
          d = f[g];
          break;
        }

        e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"));
      }

      return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c];
    },
    addGroup: function (a, c) {
      var d = function (d) {
        d.mfpEl = this, b._openClick(d, a, c);
      };

      c || (c = {});
      var e = "click.magnificPopup";
      c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)));
    },
    _openClick: function (c, d, e) {
      var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;

      if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
        var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
        if (g) if (a.isFunction(g)) {
          if (!g.call(b)) return !0;
        } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e);
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
        var e = {
          status: a,
          text: d
        };
        y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function (a) {
          a.stopImmediatePropagation();
        }), b.container.addClass("mfp-s-" + a), c = a;
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
            e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;

        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;

        return !1;
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height());
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1);
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function (c, d) {
        if (void 0 === d || d === !1) return !0;

        if (e = c.split("_"), e.length > 1) {
          var f = b.find(p + "-" + e[0]);

          if (f.length > 0) {
            var g = e[1];
            "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d);
          }
        } else b.find(p + "-" + c).html(d);
      });
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a);
      }

      return b.scrollbarSize;
    }
  }, a.magnificPopup = {
    instance: null,
    proto: t.prototype,
    modules: [],
    open: function (b, c) {
      return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b);
    },
    close: function () {
      return a.magnificPopup.instance && a.magnificPopup.instance.close();
    },
    registerModule: function (b, c) {
      c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b);
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
      tClose: "Close (Esc)",
      tLoading: "Loading...",
      autoFocusLast: !0
    }
  }, a.fn.magnificPopup = function (c) {
    A();
    var d = a(this);
    if ("string" == typeof c) {
      if ("open" === c) {
        var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
        f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
          mfpEl: e
        }, d, f);
      } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
    } else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
    return d;
  };

  var C,
      D,
      E,
      F = "inline",
      G = function () {
    E && (D.after(E.addClass(C)).detach(), E = null);
  };

  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found"
    },
    proto: {
      initInline: function () {
        b.types.push(F), w(h + "." + F, function () {
          G();
        });
      },
      getInline: function (c, d) {
        if (G(), c.src) {
          var e = b.st.inline,
              f = a(c.src);

          if (f.length) {
            var g = f[0].parentNode;
            g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), f = a("<div>");

          return c.inlineElement = f, f;
        }

        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      }
    }
  });

  var H,
      I = "ajax",
      J = function () {
    H && a(document.body).removeClass(H);
  },
      K = function () {
    J(), b.req && b.req.abort();
  };

  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },
    proto: {
      initAjax: function () {
        b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K);
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend({
          url: c.src,
          success: function (d, e, f) {
            var g = {
              data: d,
              xhr: f
            };
            y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function () {
              b.wrap.addClass(q);
            }, 16), b.updateStatus("ready"), y("AjaxContentAdded");
          },
          error: function () {
            J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src));
          }
        }, b.st.ajax.settings);
        return b.req = a.ajax(d), "";
      }
    }
  });

  var L,
      M = function (c) {
    if (c.data && void 0 !== c.data.title) return c.data.title;
    var d = b.st.image.titleSrc;

    if (d) {
      if (a.isFunction(d)) return d.call(b, c);
      if (c.el) return c.el.attr(d) || "";
    }

    return "";
  };

  a.magnificPopup.registerModule("image", {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
            d = ".image";
        b.types.push("image"), w(m + d, function () {
          "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor);
        }), w(h + d, function () {
          c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p);
        }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function () {
        var a = b.currItem;

        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function (a) {
        a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1));
      },
      findImageSize: function (a) {
        var c = 0,
            d = a.img[0],
            e = function (f) {
          L && clearInterval(L), L = setInterval(function () {
            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void (3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)));
          }, f);
        };

        e(1);
      },
      getImage: function (c, d) {
        var e = 0,
            f = function () {
          c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()));
        },
            g = function () {
          c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0);
        },
            h = b.st.image,
            i = d.find(".mfp-img");

        if (i.length) {
          var j = document.createElement("img");
          j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1);
        }

        return b._parseMarkup(d, {
          title: M(c),
          img_replaceWith: c.img
        }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d);
      }
    }
  });

  var N,
      O = function () {
    return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N;
  };

  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (a) {
        return a.is("img") ? a : a.find("img");
      }
    },
    proto: {
      initZoom: function () {
        var a,
            c = b.st.zoom,
            d = ".zoom";

        if (c.enabled && b.supportsTransition) {
          var e,
              f,
              g = c.duration,
              j = function (a) {
            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
              position: "fixed",
              zIndex: 9999,
              left: 0,
              top: 0,
              "-webkit-backface-visibility": "hidden"
            },
                f = "transition";
            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b;
          },
              k = function () {
            b.content.css("visibility", "visible");
          };

          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
              f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function () {
                f.css(b._getOffset(!0)), e = setTimeout(function () {
                  k(), setTimeout(function () {
                    f.remove(), a = f = null, y("ZoomAnimationEnded");
                  }, 16);
                }, g);
              }, 16);
            }
          }), w(i + d, function () {
            if (b._allowZoom()) {
              if (clearTimeout(e), b.st.removalDelay = g, !a) {
                if (a = b._getItemToZoom(), !a) return;
                f = j(a);
              }

              f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function () {
                f.css(b._getOffset());
              }, 16);
            }
          }), w(h + d, function () {
            b._allowZoom() && (k(), f && f.remove(), a = null);
          });
        }
      },
      _allowZoom: function () {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
            f = parseInt(d.css("padding-top"), 10),
            g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
        };
        return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h;
      }
    }
  });

  var P = "iframe",
      Q = "//about:blank",
      R = function (a) {
    if (b.currTemplate[P]) {
      var c = b.currTemplate[P].find("iframe");
      c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"));
    }
  };

  a.magnificPopup.registerModule(P, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1"
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1"
        },
        gmaps: {
          index: "//maps.google.",
          src: "%id%&output=embed"
        }
      }
    },
    proto: {
      initIframe: function () {
        b.types.push(P), w("BeforeChange", function (a, b, c) {
          b !== c && (b === P ? R() : c === P && R(!0));
        }), w(h + "." + P, function () {
          R();
        });
      },
      getIframe: function (c, d) {
        var e = c.src,
            f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0;
        });
        var g = {};
        return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d;
      }
    }
  });

  var S = function (a) {
    var c = b.items.length;
    return a > c - 1 ? a - c : 0 > a ? c + a : a;
  },
      T = function (a, b, c) {
    return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
  };

  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
            e = ".mfp-gallery";
        return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function () {
          c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function () {
            return b.items.length > 1 ? (b.next(), !1) : void 0;
          }), d.on("keydown" + e, function (a) {
            37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
          });
        }), w("UpdateStatus" + e, function (a, c) {
          c.text && (c.text = T(c.text, b.currItem.index, b.items.length));
        }), w(l + e, function (a, d, e, f) {
          var g = b.items.length;
          e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
        }), w("BuildControls" + e, function () {
          if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
            var d = c.arrowMarkup,
                e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
            e.click(function () {
              b.prev();
            }), f.click(function () {
              b.next();
            }), b.container.append(e.add(f));
          }
        }), w(n + e, function () {
          b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function () {
            b.preloadNearbyImages(), b._preloadTimeout = null;
          }, 16);
        }), void w(h + e, function () {
          d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null;
        })) : !1;
      },
      next: function () {
        b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML();
      },
      prev: function () {
        b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML();
      },
      goTo: function (a) {
        b.direction = a >= b.index, b.index = a, b.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a,
            c = b.st.gallery.preload,
            d = Math.min(c[0], b.items.length),
            e = Math.min(c[1], b.items.length);

        for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);

        for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a);
      },
      _preloadItem: function (c) {
        if (c = S(c), !b.items[c].preloaded) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function () {
            d.hasSize = !0;
          }).on("error.mfploader", function () {
            d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d);
          }).attr("src", d.src)), d.preloaded = !0;
        }
      }
    }
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
              c = a.ratio;
          c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function (a, b) {
            b.img.css({
              "max-width": b.img[0].naturalWidth / c,
              width: "100%"
            });
          }), w("ElementParse." + U, function (b, d) {
            d.src = a.replaceSrc(d, c);
          }));
        }
      }
    }
  }), A();
});
/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
!function (t, e) {
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
    return e(t, i);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery);
}(window, function (t, e) {
  "use strict";

  function i(i, r, a) {
    function h(t, e, n) {
      var o,
          r = "$()." + i + '("' + e + '")';
      return t.each(function (t, h) {
        var u = a.data(h, i);
        if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r);
        var d = u[e];
        if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method");
        var l = d.apply(u, n);
        o = void 0 === o ? l : o;
      }), void 0 !== o ? o : t;
    }

    function u(t, e) {
      t.each(function (t, n) {
        var o = a.data(n, i);
        o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o));
      });
    }

    a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function (t) {
      a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
    }), a.fn[i] = function (t) {
      if ("string" == typeof t) {
        var e = o.call(arguments, 1);
        return h(this, t, e);
      }

      return u(this, t), this;
    }, n(a));
  }

  function n(t) {
    !t || t && t.bridget || (t.bridget = i);
  }

  var o = Array.prototype.slice,
      r = t.console,
      s = "undefined" == typeof r ? function () {} : function (t) {
    r.error(t);
  };
  return n(e || t.jQuery), i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : this, function () {
  function t() {}

  var e = t.prototype;
  return e.on = function (t, e) {
    if (t && e) {
      var i = this._events = this._events || {},
          n = i[t] = i[t] || [];
      return -1 == n.indexOf(e) && n.push(e), this;
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {},
          n = i[t] = i[t] || {};
      return n[e] = !0, this;
    }
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];

    if (i && i.length) {
      var n = i.indexOf(e);
      return -1 != n && i.splice(n, 1), this;
    }
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];

    if (i && i.length) {
      i = i.slice(0), e = e || [];

      for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
        var r = i[o],
            s = n && n[r];
        s && (this.off(t, r), delete n[r]), r.apply(this, e);
      }

      return this;
    }
  }, e.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, t;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e();
}(window, function () {
  "use strict";

  function t(t) {
    var e = parseFloat(t),
        i = -1 == t.indexOf("%") && !isNaN(e);
    return i && e;
  }

  function e() {}

  function i() {
    for (var t = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    }, e = 0; u > e; e++) {
      var i = h[e];
      t[i] = 0;
    }

    return t;
  }

  function n(t) {
    var e = getComputedStyle(t);
    return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e;
  }

  function o() {
    if (!d) {
      d = !0;
      var e = document.createElement("div");
      e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
      var i = document.body || document.documentElement;
      i.appendChild(e);
      var o = n(e);
      s = 200 == Math.round(t(o.width)), r.isBoxSizeOuter = s, i.removeChild(e);
    }
  }

  function r(e) {
    if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
      var r = n(e);
      if ("none" == r.display) return i();
      var a = {};
      a.width = e.offsetWidth, a.height = e.offsetHeight;

      for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) {
        var c = h[l],
            f = r[c],
            m = parseFloat(f);
        a[c] = isNaN(m) ? 0 : m;
      }

      var p = a.paddingLeft + a.paddingRight,
          g = a.paddingTop + a.paddingBottom,
          y = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          z = a.borderTopWidth + a.borderBottomWidth,
          E = d && s,
          b = t(r.width);

      b !== !1 && (a.width = b + (E ? 0 : p + _));
      var x = t(r.height);
      return x !== !1 && (a.height = x + (E ? 0 : g + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (g + z), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a;
    }
  }

  var s,
      a = "undefined" == typeof console ? e : function (t) {
    console.error(t);
  },
      h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
      u = h.length,
      d = !1;
  return r;
}), function (t, e) {
  "use strict";

  "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e();
}(window, function () {
  "use strict";

  var t = function () {
    var t = window.Element.prototype;
    if (t.matches) return "matches";
    if (t.matchesSelector) return "matchesSelector";

    for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
      var n = e[i],
          o = n + "MatchesSelector";
      if (t[o]) return o;
    }
  }();

  return function (e, i) {
    return e[t](i);
  };
}), function (t, e) {
  "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
    return e(t, i);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector);
}(window, function (t, e) {
  var i = {};
  i.extend = function (t, e) {
    for (var i in e) t[i] = e[i];

    return t;
  }, i.modulo = function (t, e) {
    return (t % e + e) % e;
  };
  var n = Array.prototype.slice;
  i.makeArray = function (t) {
    if (Array.isArray(t)) return t;
    if (null === t || void 0 === t) return [];
    var e = "object" == typeof t && "number" == typeof t.length;
    return e ? n.call(t) : [t];
  }, i.removeFrom = function (t, e) {
    var i = t.indexOf(e);
    -1 != i && t.splice(i, 1);
  }, i.getParent = function (t, i) {
    for (; t.parentNode && t != document.body;) if (t = t.parentNode, e(t, i)) return t;
  }, i.getQueryElement = function (t) {
    return "string" == typeof t ? document.querySelector(t) : t;
  }, i.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, i.filterFindElements = function (t, n) {
    t = i.makeArray(t);
    var o = [];
    return t.forEach(function (t) {
      if (t instanceof HTMLElement) {
        if (!n) return void o.push(t);
        e(t, n) && o.push(t);

        for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r]);
      }
    }), o;
  }, i.debounceMethod = function (t, e, i) {
    i = i || 100;
    var n = t.prototype[e],
        o = e + "Timeout";

    t.prototype[e] = function () {
      var t = this[o];
      clearTimeout(t);
      var e = arguments,
          r = this;
      this[o] = setTimeout(function () {
        n.apply(r, e), delete r[o];
      }, i);
    };
  }, i.docReady = function (t) {
    var e = document.readyState;
    "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
  }, i.toDashed = function (t) {
    return t.replace(/(.)([A-Z])/g, function (t, e, i) {
      return e + "-" + i;
    }).toLowerCase();
  };
  var o = t.console;
  return i.htmlInit = function (e, n) {
    i.docReady(function () {
      var r = i.toDashed(n),
          s = "data-" + r,
          a = document.querySelectorAll("[" + s + "]"),
          h = document.querySelectorAll(".js-" + r),
          u = i.makeArray(a).concat(i.makeArray(h)),
          d = s + "-options",
          l = t.jQuery;
      u.forEach(function (t) {
        var i,
            r = t.getAttribute(s) || t.getAttribute(d);

        try {
          i = r && JSON.parse(r);
        } catch (a) {
          return void (o && o.error("Error parsing " + s + " on " + t.className + ": " + a));
        }

        var h = new e(t, i);
        l && l.data(t, n, h);
      });
    });
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize));
}(window, function (t, e) {
  "use strict";

  function i(t) {
    for (var e in t) return !1;

    return e = null, !0;
  }

  function n(t, e) {
    t && (this.element = t, this.layout = e, this.position = {
      x: 0,
      y: 0
    }, this._create());
  }

  function o(t) {
    return t.replace(/([A-Z])/g, function (t) {
      return "-" + t.toLowerCase();
    });
  }

  var r = document.documentElement.style,
      s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
      h = {
    WebkitTransition: "webkitTransitionEnd",
    transition: "transitionend"
  }[s],
      u = {
    transform: a,
    transition: s,
    transitionDuration: s + "Duration",
    transitionProperty: s + "Property",
    transitionDelay: s + "Delay"
  },
      d = n.prototype = Object.create(t.prototype);
  d.constructor = n, d._create = function () {
    this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
    }, this.css({
      position: "absolute"
    });
  }, d.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, d.getSize = function () {
    this.size = e(this.element);
  }, d.css = function (t) {
    var e = this.element.style;

    for (var i in t) {
      var n = u[i] || i;
      e[n] = t[i];
    }
  }, d.getPosition = function () {
    var t = getComputedStyle(this.element),
        e = this.layout._getOption("originLeft"),
        i = this.layout._getOption("originTop"),
        n = t[e ? "left" : "right"],
        o = t[i ? "top" : "bottom"],
        r = parseFloat(n),
        s = parseFloat(o),
        a = this.layout.size;

    -1 != n.indexOf("%") && (r = r / 100 * a.width), -1 != o.indexOf("%") && (s = s / 100 * a.height), r = isNaN(r) ? 0 : r, s = isNaN(s) ? 0 : s, r -= e ? a.paddingLeft : a.paddingRight, s -= i ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = s;
  }, d.layoutPosition = function () {
    var t = this.layout.size,
        e = {},
        i = this.layout._getOption("originLeft"),
        n = this.layout._getOption("originTop"),
        o = i ? "paddingLeft" : "paddingRight",
        r = i ? "left" : "right",
        s = i ? "right" : "left",
        a = this.position.x + t[o];

    e[r] = this.getXValue(a), e[s] = "";
    var h = n ? "paddingTop" : "paddingBottom",
        u = n ? "top" : "bottom",
        d = n ? "bottom" : "top",
        l = this.position.y + t[h];
    e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this]);
  }, d.getXValue = function (t) {
    var e = this.layout._getOption("horizontal");

    return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px";
  }, d.getYValue = function (t) {
    var e = this.layout._getOption("horizontal");

    return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px";
  }, d._transitionTo = function (t, e) {
    this.getPosition();
    var i = this.position.x,
        n = this.position.y,
        o = t == this.position.x && e == this.position.y;
    if (this.setPosition(t, e), o && !this.isTransitioning) return void this.layoutPosition();
    var r = t - i,
        s = e - n,
        a = {};
    a.transform = this.getTranslate(r, s), this.transition({
      to: a,
      onTransitionEnd: {
        transform: this.layoutPosition
      },
      isCleaning: !0
    });
  }, d.getTranslate = function (t, e) {
    var i = this.layout._getOption("originLeft"),
        n = this.layout._getOption("originTop");

    return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)";
  }, d.goTo = function (t, e) {
    this.setPosition(t, e), this.layoutPosition();
  }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) {
    this.position.x = parseFloat(t), this.position.y = parseFloat(e);
  }, d._nonTransition = function (t) {
    this.css(t.to), t.isCleaning && this._removeStyles(t.to);

    for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
  }, d.transition = function (t) {
    if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
    var e = this._transn;

    for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];

    for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);

    if (t.from) {
      this.css(t.from);
      var n = this.element.offsetHeight;
      n = null;
    }

    this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0;
  };
  var l = "opacity," + o(a);
  d.enableTransition = function () {
    if (!this.isTransitioning) {
      var t = this.layout.options.transitionDuration;
      t = "number" == typeof t ? t + "ms" : t, this.css({
        transitionProperty: l,
        transitionDuration: t,
        transitionDelay: this.staggerDelay || 0
      }), this.element.addEventListener(h, this, !1);
    }
  }, d.onwebkitTransitionEnd = function (t) {
    this.ontransitionend(t);
  }, d.onotransitionend = function (t) {
    this.ontransitionend(t);
  };
  var c = {
    "-webkit-transform": "transform"
  };
  d.ontransitionend = function (t) {
    if (t.target === this.element) {
      var e = this._transn,
          n = c[t.propertyName] || t.propertyName;

      if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
        var o = e.onEnd[n];
        o.call(this), delete e.onEnd[n];
      }

      this.emitEvent("transitionEnd", [this]);
    }
  }, d.disableTransition = function () {
    this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1;
  }, d._removeStyles = function (t) {
    var e = {};

    for (var i in t) e[i] = "";

    this.css(e);
  };
  var f = {
    transitionProperty: "",
    transitionDuration: "",
    transitionDelay: ""
  };
  return d.removeTransitionStyles = function () {
    this.css(f);
  }, d.stagger = function (t) {
    t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms";
  }, d.removeElem = function () {
    this.element.parentNode.removeChild(this.element), this.css({
      display: ""
    }), this.emitEvent("remove", [this]);
  }, d.remove = function () {
    return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
      this.removeElem();
    }), void this.hide()) : void this.removeElem();
  }, d.reveal = function () {
    delete this.isHidden, this.css({
      display: ""
    });
    var t = this.layout.options,
        e = {},
        i = this.getHideRevealTransitionEndProperty("visibleStyle");
    e[i] = this.onRevealTransitionEnd, this.transition({
      from: t.hiddenStyle,
      to: t.visibleStyle,
      isCleaning: !0,
      onTransitionEnd: e
    });
  }, d.onRevealTransitionEnd = function () {
    this.isHidden || this.emitEvent("reveal");
  }, d.getHideRevealTransitionEndProperty = function (t) {
    var e = this.layout.options[t];
    if (e.opacity) return "opacity";

    for (var i in e) return i;
  }, d.hide = function () {
    this.isHidden = !0, this.css({
      display: ""
    });
    var t = this.layout.options,
        e = {},
        i = this.getHideRevealTransitionEndProperty("hiddenStyle");
    e[i] = this.onHideTransitionEnd, this.transition({
      from: t.visibleStyle,
      to: t.hiddenStyle,
      isCleaning: !0,
      onTransitionEnd: e
    });
  }, d.onHideTransitionEnd = function () {
    this.isHidden && (this.css({
      display: "none"
    }), this.emitEvent("hide"));
  }, d.destroy = function () {
    this.css({
      position: "",
      left: "",
      right: "",
      top: "",
      bottom: "",
      transition: "",
      transform: ""
    });
  }, n;
}), function (t, e) {
  "use strict";

  "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, r) {
    return e(t, i, n, o, r);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item);
}(window, function (t, e, i, n, o) {
  "use strict";

  function r(t, e) {
    var i = n.getQueryElement(t);
    if (!i) return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
    this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
    var o = ++l;
    this.element.outlayerGUID = o, c[o] = this, this._create();

    var r = this._getOption("initLayout");

    r && this.layout();
  }

  function s(t) {
    function e() {
      t.apply(this, arguments);
    }

    return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e;
  }

  function a(t) {
    if ("number" == typeof t) return t;
    var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        n = e && e[2];
    if (!i.length) return 0;
    i = parseFloat(i);
    var o = m[n] || 1;
    return i * o;
  }

  var h = t.console,
      u = t.jQuery,
      d = function () {},
      l = 0,
      c = {};

  r.namespace = "outlayer", r.Item = o, r.defaults = {
    containerStyle: {
      position: "relative"
    },
    initLayout: !0,
    originLeft: !0,
    originTop: !0,
    resize: !0,
    resizeContainer: !0,
    transitionDuration: "0.4s",
    hiddenStyle: {
      opacity: 0,
      transform: "scale(0.001)"
    },
    visibleStyle: {
      opacity: 1,
      transform: "scale(1)"
    }
  };
  var f = r.prototype;
  n.extend(f, e.prototype), f.option = function (t) {
    n.extend(this.options, t);
  }, f._getOption = function (t) {
    var e = this.constructor.compatOptions[t];
    return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
  }, r.compatOptions = {
    initLayout: "isInitLayout",
    horizontal: "isHorizontal",
    layoutInstant: "isLayoutInstant",
    originLeft: "isOriginLeft",
    originTop: "isOriginTop",
    resize: "isResizeBound",
    resizeContainer: "isResizingContainer"
  }, f._create = function () {
    this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);

    var t = this._getOption("resize");

    t && this.bindResize();
  }, f.reloadItems = function () {
    this.items = this._itemize(this.element.children);
  }, f._itemize = function (t) {
    for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
      var r = e[o],
          s = new i(r, this);
      n.push(s);
    }

    return n;
  }, f._filterFindItemElements = function (t) {
    return n.filterFindElements(t, this.options.itemSelector);
  }, f.getItemElements = function () {
    return this.items.map(function (t) {
      return t.element;
    });
  }, f.layout = function () {
    this._resetLayout(), this._manageStamps();

    var t = this._getOption("layoutInstant"),
        e = void 0 !== t ? t : !this._isLayoutInited;

    this.layoutItems(this.items, e), this._isLayoutInited = !0;
  }, f._init = f.layout, f._resetLayout = function () {
    this.getSize();
  }, f.getSize = function () {
    this.size = i(this.element);
  }, f._getMeasurement = function (t, e) {
    var n,
        o = this.options[t];
    o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0;
  }, f.layoutItems = function (t, e) {
    t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout();
  }, f._getItemsForLayout = function (t) {
    return t.filter(function (t) {
      return !t.isIgnored;
    });
  }, f._layoutItems = function (t, e) {
    if (this._emitCompleteOnItems("layout", t), t && t.length) {
      var i = [];
      t.forEach(function (t) {
        var n = this._getItemLayoutPosition(t);

        n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n);
      }, this), this._processLayoutQueue(i);
    }
  }, f._getItemLayoutPosition = function () {
    return {
      x: 0,
      y: 0
    };
  }, f._processLayoutQueue = function (t) {
    this.updateStagger(), t.forEach(function (t, e) {
      this._positionItem(t.item, t.x, t.y, t.isInstant, e);
    }, this);
  }, f.updateStagger = function () {
    var t = this.options.stagger;
    return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger);
  }, f._positionItem = function (t, e, i, n, o) {
    n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
  }, f._postLayout = function () {
    this.resizeContainer();
  }, f.resizeContainer = function () {
    var t = this._getOption("resizeContainer");

    if (t) {
      var e = this._getContainerSize();

      e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
    }
  }, f._getContainerSize = d, f._setContainerMeasure = function (t, e) {
    if (void 0 !== t) {
      var i = this.size;
      i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px";
    }
  }, f._emitCompleteOnItems = function (t, e) {
    function i() {
      o.dispatchEvent(t + "Complete", null, [e]);
    }

    function n() {
      s++, s == r && i();
    }

    var o = this,
        r = e.length;
    if (!e || !r) return void i();
    var s = 0;
    e.forEach(function (e) {
      e.once(t, n);
    });
  }, f.dispatchEvent = function (t, e, i) {
    var n = e ? [e].concat(i) : i;
    if (this.emitEvent(t, n), u) if (this.$element = this.$element || u(this.element), e) {
      var o = u.Event(e);
      o.type = t, this.$element.trigger(o, i);
    } else this.$element.trigger(t, i);
  }, f.ignore = function (t) {
    var e = this.getItem(t);
    e && (e.isIgnored = !0);
  }, f.unignore = function (t) {
    var e = this.getItem(t);
    e && delete e.isIgnored;
  }, f.stamp = function (t) {
    t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this));
  }, f.unstamp = function (t) {
    t = this._find(t), t && t.forEach(function (t) {
      n.removeFrom(this.stamps, t), this.unignore(t);
    }, this);
  }, f._find = function (t) {
    return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0;
  }, f._manageStamps = function () {
    this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
  }, f._getBoundingRect = function () {
    var t = this.element.getBoundingClientRect(),
        e = this.size;
    this._boundingRect = {
      left: t.left + e.paddingLeft + e.borderLeftWidth,
      top: t.top + e.paddingTop + e.borderTopWidth,
      right: t.right - (e.paddingRight + e.borderRightWidth),
      bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
    };
  }, f._manageStamp = d, f._getElementOffset = function (t) {
    var e = t.getBoundingClientRect(),
        n = this._boundingRect,
        o = i(t),
        r = {
      left: e.left - n.left - o.marginLeft,
      top: e.top - n.top - o.marginTop,
      right: n.right - e.right - o.marginRight,
      bottom: n.bottom - e.bottom - o.marginBottom
    };
    return r;
  }, f.handleEvent = n.handleEvent, f.bindResize = function () {
    t.addEventListener("resize", this), this.isResizeBound = !0;
  }, f.unbindResize = function () {
    t.removeEventListener("resize", this), this.isResizeBound = !1;
  }, f.onresize = function () {
    this.resize();
  }, n.debounceMethod(r, "onresize", 100), f.resize = function () {
    this.isResizeBound && this.needsResizeLayout() && this.layout();
  }, f.needsResizeLayout = function () {
    var t = i(this.element),
        e = this.size && t;
    return e && t.innerWidth !== this.size.innerWidth;
  }, f.addItems = function (t) {
    var e = this._itemize(t);

    return e.length && (this.items = this.items.concat(e)), e;
  }, f.appended = function (t) {
    var e = this.addItems(t);
    e.length && (this.layoutItems(e, !0), this.reveal(e));
  }, f.prepended = function (t) {
    var e = this._itemize(t);

    if (e.length) {
      var i = this.items.slice(0);
      this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i);
    }
  }, f.reveal = function (t) {
    if (this._emitCompleteOnItems("reveal", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function (t, i) {
        t.stagger(i * e), t.reveal();
      });
    }
  }, f.hide = function (t) {
    if (this._emitCompleteOnItems("hide", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function (t, i) {
        t.stagger(i * e), t.hide();
      });
    }
  }, f.revealItemElements = function (t) {
    var e = this.getItems(t);
    this.reveal(e);
  }, f.hideItemElements = function (t) {
    var e = this.getItems(t);
    this.hide(e);
  }, f.getItem = function (t) {
    for (var e = 0; e < this.items.length; e++) {
      var i = this.items[e];
      if (i.element == t) return i;
    }
  }, f.getItems = function (t) {
    t = n.makeArray(t);
    var e = [];
    return t.forEach(function (t) {
      var i = this.getItem(t);
      i && e.push(i);
    }, this), e;
  }, f.remove = function (t) {
    var e = this.getItems(t);
    this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
      t.remove(), n.removeFrom(this.items, t);
    }, this);
  }, f.destroy = function () {
    var t = this.element.style;
    t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
      t.destroy();
    }), this.unbindResize();
    var e = this.element.outlayerGUID;
    delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace);
  }, r.data = function (t) {
    t = n.getQueryElement(t);
    var e = t && t.outlayerGUID;
    return e && c[e];
  }, r.create = function (t, e) {
    var i = s(r);
    return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i;
  };
  var m = {
    ms: 1,
    s: 1e3
  };
  return r.Item = o, r;
}), function (t, e) {
  "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize);
}(window, function (t, e) {
  var i = t.create("masonry");
  i.compatOptions.fitWidth = "isFitWidth";
  var n = i.prototype;
  return n._resetLayout = function () {
    this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];

    for (var t = 0; t < this.cols; t++) this.colYs.push(0);

    this.maxY = 0, this.horizontalColIndex = 0;
  }, n.measureColumns = function () {
    if (this.getContainerWidth(), !this.columnWidth) {
      var t = this.items[0],
          i = t && t.element;
      this.columnWidth = i && e(i).outerWidth || this.containerWidth;
    }

    var n = this.columnWidth += this.gutter,
        o = this.containerWidth + this.gutter,
        r = o / n,
        s = n - o % n,
        a = s && 1 > s ? "round" : "floor";
    r = Math[a](r), this.cols = Math.max(r, 1);
  }, n.getContainerWidth = function () {
    var t = this._getOption("fitWidth"),
        i = t ? this.element.parentNode : this.element,
        n = e(i);

    this.containerWidth = n && n.innerWidth;
  }, n._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = t.size.outerWidth % this.columnWidth,
        i = e && 1 > e ? "round" : "ceil",
        n = Math[i](t.size.outerWidth / this.columnWidth);
    n = Math.min(n, this.cols);

    for (var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", r = this[o](n, t), s = {
      x: this.columnWidth * r.col,
      y: r.y
    }, a = r.y + t.size.outerHeight, h = n + r.col, u = r.col; h > u; u++) this.colYs[u] = a;

    return s;
  }, n._getTopColPosition = function (t) {
    var e = this._getTopColGroup(t),
        i = Math.min.apply(Math, e);

    return {
      col: e.indexOf(i),
      y: i
    };
  }, n._getTopColGroup = function (t) {
    if (2 > t) return this.colYs;

    for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) e[n] = this._getColGroupY(n, t);

    return e;
  }, n._getColGroupY = function (t, e) {
    if (2 > e) return this.colYs[t];
    var i = this.colYs.slice(t, t + e);
    return Math.max.apply(Math, i);
  }, n._getHorizontalColPosition = function (t, e) {
    var i = this.horizontalColIndex % this.cols,
        n = t > 1 && i + t > this.cols;
    i = n ? 0 : i;
    var o = e.size.outerWidth && e.size.outerHeight;
    return this.horizontalColIndex = o ? i + t : this.horizontalColIndex, {
      col: i,
      y: this._getColGroupY(i, t)
    };
  }, n._manageStamp = function (t) {
    var i = e(t),
        n = this._getElementOffset(t),
        o = this._getOption("originLeft"),
        r = o ? n.left : n.right,
        s = r + i.outerWidth,
        a = Math.floor(r / this.columnWidth);

    a = Math.max(0, a);
    var h = Math.floor(s / this.columnWidth);
    h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);

    for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l]);
  }, n._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);
    var t = {
      height: this.maxY
    };
    return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t;
  }, n._getContainerFitWidth = function () {
    for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;

    return (this.cols - t) * this.columnWidth - this.gutter;
  }, n.needsResizeLayout = function () {
    var t = this.containerWidth;
    return this.getContainerWidth(), t != this.containerWidth;
  }, i;
});
jQuery(document).ready(function ($) {
  // Main menu show/hide
  $(".site-div-nav").on("click", "#div-nav-control", function () {
    $(".site-div-nav").toggleClass("active");
  }); // fav-icon animation for index.html page

  $('a[href*="#target"]').click(function () {
    var elemToGo = $(this).attr("href");
    var speed = 750;
    $("html,body").animate({
      scrollTop: $(elemToGo).offset().top
    }, speed);
    return false;
  }); // Support center btn

  $("#support-center i").on("click", function () {
    $("#support-center").toggleClass("active");
  }); // Mobile menu: Left: start

  $("#div-nav").clone().appendTo("#mobile-div-nav");
  $("#mobile-div-nav #div-nav").removeClass("div-nav");
  $("#mobile-div-nav #div-nav").addClass("mobile-nav primary-nav");
  $('<span class="plus-sign"> + </span>').insertAfter("#mobile-div-nav #div-nav .menu-item-has-children > a"); // plus sign click

  $(".mobile-nav span").click(function () {
    $(".mobile-nav .sub-menu").slideUp();
    $(this).html("+");

    if (!$(this).next().is(":visible")) {
      $(this).next().slideDown();
      $(this).html("+");
      $(this).html("-");
    }
  }); // Mobile menu: Left: end
  // Toggle user nav start
  // $("#user-nav li").click(function() {
  //   $(this)
  //     .children()
  //     .toggleClass("show-sub-menu");
  // });
  // Hide menu on clicking anywhere

  const $menu = $("#user-nav li ul");
  $(document).mouseup(e => {
    if (!$menu.is(e.target) && // if the target of the click isn't the container...
    $menu.has(e.target).length === 0) {
      // ... nor a descendant of the container
      $menu.removeClass("show-sub-menu");
    }
  });
  $("#user-nav li").click(function () {
    $(this).children().toggleClass("show-sub-menu");
  }); // if ($("#user-nav li ul").hasClass("show-sub-menu") & $(document).click()) {
  //   alert("Has Sub menu class and clicked ");
  // } else if ($("#user-nav li ul").not("show-sub-menu") & $(document).click()) {
  //   alert("Sorry, do not have sub menu class  ");
  // }
  // toogle user nav finish
  // Show hide left mobile menu

  $("#mbmenuleftxp i").click(function () {
    $("#mbl-side-bar-left").css({
      left: "0"
    });
  });
  $("#mbmenuleftclose").click(function () {
    $("#mbl-side-bar-left").css({
      left: "-250px"
    });
  }); // if click outside of sidebar then the side will disapear

  $(document).mouseup(function (e) {
    var container = $("#mbl-side-bar-left");
    var container2 = $("#mbl-side-bar-right");
    var container_sub_menu1 = $("#sub-menu1");
    var container_sub_menu2 = $("#sub-menu2");
    var container_sub_menu3 = $("#sub-menu3"); // left bar
    // if the target of the click isn't the container nor a descendant of the container

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.css({
        left: "-250px"
      });
    } // right bar


    if (!container2.is(e.target) && container2.has(e.target).length === 0) {
      container2.css({
        right: "-300px"
      });
    } // for sub-menu hide if click outside of it
    // if (!container_sub_menu1.is(e.target) && container_sub_menu1.has(e.target).length === 0)
    // {
    //   container_sub_menu1.css({"display":"none"});
    //   container_sub_menu1.parent().css({"opacity":"0.54"});
    // }
    // if (!container_sub_menu2.is(e.target) && container_sub_menu2.has(e.target).length === 0)
    // {
    //   container_sub_menu2.css({"display":"none"});
    //   container_sub_menu2.parent().css({"opacity":"0.54"});
    // }
    // if (!container_sub_menu3.is(e.target) && container_sub_menu3.has(e.target).length === 0)
    // {
    //   container_sub_menu3.css({"display":"none"});
    //   container_sub_menu3.parent().css({"opacity":"0.54"});
    // }

  }); // show hide mobile navigation

  $("#mbmenurightxp i").click(function () {
    $("#mbl-side-bar-right").css({
      right: "0"
    });
  }); // submit-page icon hide-show

  var ico = document.getElementsByClassName("info-icon");
  var j;

  for (j = 0; j < ico.length; j++) {
    ico[j].addEventListener("click", function () {
      var infoContent = this.nextElementSibling;
      infoContent.classList.toggle("active");
    });
  } // Masonry at Photo Gallery
  // var $grid = $('.grid').imagesLoaded( function() {
  //   $grid.masonry({
  //     itemSelector: '.grid-item',
  //     columnWidth: '.grid-sizer',
  //     percentPosition: true,
  //   });
  // });
  // Infinite scroll
  // init Masonry


  var $grid = $(".grid").masonry({
    itemSelector: "none",
    // select none at first
    columnWidth: ".grid-sizer",
    gutter: ".grid-gutter-sizer",
    percentPosition: true,
    stagger: 10,
    // nicer reveal transition
    visibleStyle: {
      transform: "translateY(0)",
      opacity: 1
    },
    hiddenStyle: {
      transform: "translateY(100px)",
      opacity: 0
    }
  }); // get Masonry instance

  var msnry = $grid.data("masonry"); // initial items reveal

  $grid.imagesLoaded(function () {
    $grid.removeClass("are-images-unloaded");
    $grid.masonry("option", {
      itemSelector: ".grid-item"
    });
    var $items = $grid.find(".grid-item");
    $grid.masonry("appended", $items);
  }); // init Infinte Scroll

  $grid.infiniteScroll({
    // use function to set custom URLs
    path: "page{{#}}.html",
    append: ".grid-item",
    outlayer: msnry,
    status: ".page-load-status",
    button: ".view-more-button"
  });
  var $viewMoreButton = $(".view-more-button"); // get Infinite Scroll instance

  var infScroll = $grid.data("infiniteScroll");
  $grid.on("load.infiniteScroll", onPageLoad);

  function onPageLoad() {
    if (infScroll.loadCount == 1) {
      // after 2nd page loaded
      // disable loading on scroll
      $grid.infiniteScroll("option", {
        loadOnScroll: false
      }); // show button

      $viewMoreButton.show(); // remove event listener

      $grid.off("load.infiniteScroll", onPageLoad);
    }
  } // slider : blog


  $(".post-slider-container").owlCarousel({
    items: 1,
    margin: 0,
    nav: false,
    dots: false
  }); // Book categories

  $(".book-section").owlCarousel({
    margin: 0,
    nav: true,
    responsive: {
      0: {
        items: 2
      },
      576: {
        items: 3
      },
      768: {
        items: 4
      },
      991: {
        items: 6
      },
      1400: {
        items: 8
      }
    }
  }); // responsive

  function checkPosition() {
    if (window.matchMedia("(max-width: 767px)").matches) {
      //...
      alert("Mobile warning");
    } else {//...
    }
  } // checkPosition();


  $(".mobile-search-icon").click(function () {
    $(".site-search").toggleClass("toggle-search-form");
  });
});