(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!*************************************!*\
  !*** D:/资料/程序资料/黔诺康/common/amap.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function AMapWX(a) {
  this.key = a.key, this.requestConfig = {
    key: a.key,
    s: "rsx",
    platform: "WXJS",
    appname: a.key,
    sdkversion: "1.2.0",
    logversion: "2.0" };

}
AMapWX.prototype.getWxLocation = function (a, b) {
  wx.getLocation({
    type: "gcj02",
    success: function success(a) {
      var c = a.longitude + "," + a.latitude;
      wx.setStorage({
        key: "userLocation",
        data: c }),
      b(c);
    },
    fail: function fail(c) {
      wx.getStorage({
        key: "userLocation",
        success: function success(a) {
          a.data && b(a.data);
        } }),
      a.fail({
        errCode: "0",
        errMsg: c.errMsg || "" });

    } });

}, AMapWX.prototype.getRegeo = function (a) {
  function c(c) {
    var d = b.requestConfig;
    wx.request({
      url: "https://restapi.amap.com/v3/geocode/regeo",
      data: {
        key: b.key,
        location: c,
        extensions: "all",
        s: d.s,
        platform: d.platform,
        appname: b.key,
        sdkversion: d.sdkversion,
        logversion: d.logversion },

      method: "GET",
      header: {
        "content-type": "application/json" },

      success: function success(b) {
        var d, e, f, g, h, i, j, k, l;
        b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[
        0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.
        pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i =
        parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(
        e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street),
        f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(
        k)), f = f.join(""), l = [{
          iconPath: a.iconPath,
          width: a.iconWidth,
          height: a.iconHeight,
          name: f,
          desc: g,
          longitude: h,
          latitude: i,
          id: 0,
          regeocodeData: d }],
        a.success(l)) : a.fail({
          errCode: b.data.infocode,
          errMsg: b.data.info });

      },
      fail: function fail(b) {
        a.fail({
          errCode: "0",
          errMsg: b.errMsg || "" });

      } });

  }
  var b = this;
  a.location ? c(a.location) : b.getWxLocation(a, function (a) {
    c(a);
  });
}, AMapWX.prototype.getWeather = function (a) {
  function d(d) {
    var e = "base";
    a.type && "forecast" == a.type && (e = "all"), wx.request({
      url: "https://restapi.amap.com/v3/weather/weatherInfo",
      data: {
        key: b.key,
        city: d,
        extensions: e,
        s: c.s,
        platform: c.platform,
        appname: b.key,
        sdkversion: c.sdkversion,
        logversion: c.logversion },

      method: "GET",
      header: {
        "content-type": "application/json" },

      success: function success(b) {
        function c(a) {
          var b = {
            city: {
              text: "城市",
              data: a.city },

            weather: {
              text: "天气",
              data: a.weather },

            temperature: {
              text: "温度",
              data: a.temperature },

            winddirection: {
              text: "风向",
              data: a.winddirection + "风" },

            windpower: {
              text: "风力",
              data: a.windpower + "级" },

            humidity: {
              text: "湿度",
              data: a.humidity + "%" } };


          return b;
        }
        var d, e;
        b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(
        d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({
          forecast: b.data.forecasts[0] }) :
        a.fail({
          errCode: b.data.infocode,
          errMsg: b.data.info });

      },
      fail: function fail(b) {
        a.fail({
          errCode: "0",
          errMsg: b.errMsg || "" });

      } });

  }

  function e(e) {
    wx.request({
      url: "https://restapi.amap.com/v3/geocode/regeo",
      data: {
        key: b.key,
        location: e,
        extensions: "all",
        s: c.s,
        platform: c.platform,
        appname: b.key,
        sdkversion: c.sdkversion,
        logversion: c.logversion },

      method: "GET",
      header: {
        "content-type": "application/json" },

      success: function success(b) {
        var c, e;
        b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode :
        e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({
          errCode: b.data.infocode,
          errMsg: b.data.info });

      },
      fail: function fail(b) {
        a.fail({
          errCode: "0",
          errMsg: b.errMsg || "" });

      } });

  }
  var b = this,
  c = b.requestConfig;
  a.city ? d(a.city) : b.getWxLocation(a, function (a) {
    e(a);
  });
}, AMapWX.prototype.getPoiAround = function (a) {
  function d(d) {
    var e = {
      key: b.key,
      location: d,
      s: c.s,
      platform: c.platform,
      appname: b.key,
      sdkversion: c.sdkversion,
      logversion: c.logversion };

    a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), wx.request({
      url: "https://restapi.amap.com/v3/place/around",
      data: e,
      method: "GET",
      header: {
        "content-type": "application/json" },

      success: function success(b) {
        var c, d, e, f;
        if (b.data.status && "1" == b.data.status) {
          if (b = b.data, b && b.pois) {
            for (c = [], d = 0; d < b.pois.length; d++) {e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({
                latitude: parseFloat(b.pois[d].location.split(",")[1]),
                longitude: parseFloat(b.pois[d].location.split(",")[0]),
                iconPath: e,
                width: 22,
                height: 32,
                id: d,
                name: b.pois[d].name,
                address: b.pois[d].address });}

            f = {
              markers: c,
              poisData: b.pois },
            a.success(f);
          }
        } else a.fail({
          errCode: b.data.infocode,
          errMsg: b.data.info });

      },
      fail: function fail(b) {
        a.fail({
          errCode: "0",
          errMsg: b.errMsg || "" });

      } });

  }
  var b = this,
  c = b.requestConfig;
  a.location ? d(a.location) : b.getWxLocation(a, function (a) {
    d(a);
  });
}, AMapWX.prototype.getStaticmap = function (a) {
  function f(b) {
    c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push(
    "scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths &&
    c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);
    var e = d + c.join("&");
    a.success({
      url: e });

  }
  var e,b = this,
  c = [],
  d = "https://restapi.amap.com/v3/staticmap?";
  c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" +
  e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) :
  b.getWxLocation(a, function (a) {
    f(a);
  });
}, AMapWX.prototype.getInputtips = function (a) {
  var b = this,
  c = b.requestConfig,
  d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion };

  a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type),
  a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), wx.request({
    url: "https://restapi.amap.com/v3/assistant/inputtips",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json" },

    success: function success(b) {
      b && b.data && b.data.tips && a.success({
        tips: b.data.tips });

    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || "" });

    } });

}, AMapWX.prototype.getDrivingRoute = function (a) {
  var b = this,
  c = b.requestConfig,
  d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion };

  a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d[
  "strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] =
  a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), wx.request({
    url: "https://restapi.amap.com/v3/direction/driving",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json" },

    success: function success(b) {
      b && b.data && b.data.route && a.success({
        paths: b.data.route.paths,
        taxi_cost: b.data.route.taxi_cost || "" });

    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || "" });

    } });

}, AMapWX.prototype.getWalkingRoute = function (a) {
  var b = this,
  c = b.requestConfig,
  d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion };

  a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({
    url: "https://restapi.amap.com/v3/direction/walking",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json" },

    success: function success(b) {
      b && b.data && b.data.route && a.success({
        paths: b.data.route.paths });

    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || "" });

    } });

}, AMapWX.prototype.getTransitRoute = function (a) {
  var b = this,
  c = b.requestConfig,
  d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion };

  a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d[
  "strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), wx.request({
    url: "https://restapi.amap.com/v3/direction/transit/integrated",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json" },

    success: function success(b) {
      if (b && b.data && b.data.route) {
        var c = b.data.route;
        a.success({
          distance: c.distance || "",
          taxi_cost: c.taxi_cost || "",
          transits: c.transits });

      }
    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || "" });

    } });

}, AMapWX.prototype.getRidingRoute = function (a) {
  var b = this,
  c = b.requestConfig,
  d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion };

  a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({
    url: "https://restapi.amap.com/v4/direction/bicycling",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json" },

    success: function success(b) {
      b && b.data && b.data.data && a.success({
        paths: b.data.data.paths });

    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || "" });

    } });

}, module.exports.AMapWX = AMapWX;

/***/ }),

/***/ 116:
/*!*********************************************!*\
  !*** D:/资料/程序资料/黔诺康/static/js/uniCharts.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {/*
 * 本插件移植自wxcharts
 *
 * 移植：杨大宝
 * 
 * charts for WeChat small app v1.0
 *
 * https://github.com/xiaolin3303/wx-charts
 * 2016-11-28
 *
 * Designed and built with all the love of Web
 */



function assign(t, e) {
  if (null == t) throw new TypeError("Cannot convert undefined or null to object");
  for (var i = Object(t), a = 1; a < arguments.length; a++) {
    var n = arguments[a];
    if (null != n)
    for (var o in n) {Object.prototype.hasOwnProperty.call(n, o) && (i[o] = n[o]);}
  }
  return i;
}

function findRange(t, e, i) {
  if (isNaN(t)) throw new Error("[uniCharts] unvalid series data!");
  i = i || 10, e = e || "upper";
  for (var a = 1; i < 1;) {i *= 10, a *= 10;}
  for (t = "upper" === e ? Math.ceil(t * a) : Math.floor(t * a); t % i != 0;) {"upper" === e ? t++ : t--;}
  return t / a;
}

function calValidDistance(t, e, i, a) {
  var n = a.width - i.padding - e.xAxisPoints[0],
  o = e.eachSpacing * a.categories.length,
  r = t;
  return t >= 0 ? r = 0 : Math.abs(t) >= o - n && (r = n - o), r;
}

function isInAngleRange(t, e, i) {
  function a(t) {
    for (; t < 0;) {t += 2 * Math.PI;}
    for (; t > 2 * Math.PI;) {t -= 2 * Math.PI;}
    return t;
  }
  return t = a(t), e = a(e), i = a(i), e > i && (i += 2 * Math.PI, t < e && (t += 2 * Math.PI)), t >= e && t <= i;
}

function calRotateTranslate(t, e, i) {
  var a = t,
  n = i - e,
  o = a + (i - n - a) / Math.sqrt(2);
  return o *= -1, {
    transX: o,
    transY: (i - n) * (Math.sqrt(2) - 1) - (i - n - a) / Math.sqrt(2) };

}

function createCurveControlPoints(t, e) {
  function i(t, e) {
    return !(!t[e - 1] || !t[e + 1]) && (t[e].y >= Math.max(t[e - 1].y, t[e + 1].y) || t[e].y <= Math.min(t[e - 1].y, t[e +
    1].y));
  }
  var a = null,
  n = null,
  o = null,
  r = null;
  if (e < 1 ? (a = t[0].x + .2 * (t[1].x - t[0].x), n = t[0].y + .2 * (t[1].y - t[0].y)) : (a = t[e].x + .2 * (t[e + 1].x -
  t[e - 1].x), n = t[e].y + .2 * (t[e + 1].y - t[e - 1].y)), e > t.length - 3) {
    var s = t.length - 1;
    o = t[s].x - .2 * (t[s].x - t[s - 1].x), r = t[s].y - .2 * (t[s].y - t[s - 1].y);
  } else o = t[e + 1].x - .2 * (t[e + 2].x - t[e].x), r = t[e + 1].y - .2 * (t[e + 2].y - t[e].y);
  return i(t, e + 1) && (r = t[e + 1].y), i(t, e) && (n = t[e].y), {
    ctrA: {
      x: a,
      y: n },

    ctrB: {
      x: o,
      y: r } };


}

function convertCoordinateOrigin(t, e, i) {
  return {
    x: i.x + t,
    y: i.y - e };

}

function avoidCollision(t, e) {
  if (e)
  for (; util.isCollision(t, e);) {t.start.x > 0 ? t.start.y-- : t.start.x < 0 ? t.start.y++ : t.start.y > 0 ? t.start.y++ :
    t.start.y--;}
  return t;
}

function fillSeriesColor(t, e) {
  var i = 0;
  return t.map(function (t) {
    return t.color || (t.color = e.colors[i], i = (i + 1) % e.colors.length), t;
  });
}

function getDataRange(t, e) {
  var i = 0,
  a = e - t;
  return i = a >= 1e4 ? 1e3 : a >= 1e3 ? 100 : a >= 100 ? 10 : a >= 10 ? 5 : a >= 1 ? 1 : a >= .1 ? .1 : .01, {
    minRange: findRange(t, "lower", i),
    maxRange: findRange(e, "upper", i) };

}

function measureText(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
  t = String(t);
  var t = t.split(""),
  i = 0;
  return t.forEach(function (t) {
    /[a-zA-Z]/.test(t) ? i += 7 : /[0-9]/.test(t) ? i += 5.5 : /\./.test(t) ? i += 2.7 : /-/.test(t) ? i += 3.25 :
    /[\u4e00-\u9fa5]/.test(t) ? i += 10 : /\(|\)/.test(t) ? i += 3.73 : /\s/.test(t) ? i += 2.5 : /%/.test(t) ? i += 8 :
    i += 10;
  }), i * e / 10;
}

function dataCombine(t) {
  return t.reduce(function (t, e) {
    return (t.data ? t.data : t).concat(e.data);
  }, []);
}

function getSeriesDataItem(t, e) {
  var i = [];
  return t.forEach(function (t) {
    if (null !== t.data[e] && void 0 !== t.data[e]) {
      var a = {};
      a.color = t.color, a.name = t.name, a.data = t.format ? t.format(t.data[e]) : t.data[e], i.push(a);
    }
  }), i;
}

function getMaxTextListLength(t) {
  var e = t.map(function (t) {
    return measureText(t);
  });
  return Math.max.apply(null, e);
}

function getRadarCoordinateSeries(t) {
  for (var e = 2 * Math.PI / t, i = [], a = 0; a < t; a++) {i.push(e * a);}
  return i.map(function (t) {
    return -1 * t + Math.PI / 2;
  });
}

function getToolTipData(t, e, i, a) {
  var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
  o = t.map(function (t) {
    return {
      text: n.format ? n.format(t, a[i]) : t.name + ": " + t.data,
      color: t.color };

  }),
  r = [],
  s = {
    x: 0,
    y: 0 };

  return e.forEach(function (t) {
    void 0 !== t[i] && null !== t[i] && r.push(t[i]);
  }), r.forEach(function (t) {
    s.x = Math.round(t.x), s.y += t.y;
  }), s.y /= r.length, {
    textList: o,
    offset: s };

}

function findCurrentIndex(t, e, i, a) {
  var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
  o = -1;
  return isInExactChartArea(t, i, a) && e.forEach(function (e, i) {
    t.x + n > e && (o = i);
  }), o;
}

function isInExactChartArea(t, e, i) {
  return t.x < e.width - i.padding && t.x > i.padding + i.yAxisWidth + i.yAxisTitleWidth && t.y > i.padding && t.y < e.height -
  i.legendHeight - i.xAxisHeight - i.padding;
}

function findRadarChartCurrentIndex(t, e, i) {
  var a = 2 * Math.PI / i,
  n = -1;
  if (isInExactPieChartArea(t, e.center, e.radius)) {
    var o = function o(t) {
      return t < 0 && (t += 2 * Math.PI), t > 2 * Math.PI && (t -= 2 * Math.PI), t;
    },
    r = Math.atan2(e.center.y - t.y, t.x - e.center.x);
    r *= -1, r < 0 && (r += 2 * Math.PI);
    e.angleList.map(function (t) {
      return t = o(-1 * t);
    }).forEach(function (t, e) {
      var i = o(t - a / 2),
      s = o(t + a / 2);
      s < i && (s += 2 * Math.PI), (r >= i && r <= s || r + 2 * Math.PI >= i && r + 2 * Math.PI <= s) && (n = e);
    });
  }
  return n;
}

function findPieChartCurrentIndex(t, e) {
  var i = -1;
  if (isInExactPieChartArea(t, e.center, e.radius)) {
    var a = Math.atan2(e.center.y - t.y, t.x - e.center.x);
    a = -a;
    for (var n = 0, o = e.series.length; n < o; n++) {
      var r = e.series[n];
      if (isInAngleRange(a, r._start_, r._start_ + 2 * r._proportion_ * Math.PI)) {
        i = n;
        break;
      }
    }
  }
  return i;
}

function isInExactPieChartArea(t, e, i) {
  return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2) <= Math.pow(i, 2);
}

function splitPoints(t) {
  var e = [],
  i = [];
  return t.forEach(function (t, a) {
    null !== t ? i.push(t) : (i.length && e.push(i), i = []);
  }), i.length && e.push(i), e;
}

function calLegendData(t, e, i) {
  if (!1 === e.legend) return {
    legendList: [],
    legendHeight: 0 };

  var a = [],
  n = 0,
  o = [];
  return t.forEach(function (t) {
    var i = 30 + measureText(t.name || "undefined");
    n + i > e.width ? (a.push(o), n = i, o = [t]) : (n += i, o.push(t));
  }), o.length && a.push(o), {
    legendList: a,
    legendHeight: a.length * (i.fontSize + 8) + 5 };

}

function calCategoriesData(t, e, i) {
  var a = {
    angle: 0,
    xAxisHeight: i.xAxisHeight },

  n = getXAxisPoints(t, e, i),
  o = n.eachSpacing,
  r = t.map(function (t) {
    return measureText(t);
  }),
  s = Math.max.apply(this, r);
  return s + 2 * i.xAxisTextPadding > o && (a.angle = 45 * Math.PI / 180, a.xAxisHeight = 2 * i.xAxisTextPadding + s *
  Math.sin(a.angle)), a;
}

function getRadarDataPoints(t, e, i, a, n) {
  var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1,
  r = n.extra.radar || {};
  r.max = r.max || 0;
  var s = Math.max(r.max, Math.max.apply(null, dataCombine(a))),
  l = [];
  return a.forEach(function (a) {
    var n = {};
    n.color = a.color, n.data = [], a.data.forEach(function (a, r) {
      var l = {};
      l.angle = t[r], l.proportion = a / s, l.position = convertCoordinateOrigin(i * l.proportion * o * Math.cos(l.angle),
      i * l.proportion * o * Math.sin(l.angle), e), n.data.push(l);
    }), l.push(n);
  }), l;
}

function getPieDataPoints(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
  i = 0,
  a = 0;
  return t.forEach(function (t) {
    t.data = null === t.data ? 0 : t.data, i += t.data;
  }), t.forEach(function (t) {
    t.data = null === t.data ? 0 : t.data, t._proportion_ = t.data / i * e;
  }), t.forEach(function (t) {
    t._start_ = a, a += 2 * t._proportion_ * Math.PI;
  }), t;
}

function getPieTextMaxLength(t) {
  t = getPieDataPoints(t);
  var e = 0;
  return t.forEach(function (t) {
    var i = t.format ? t.format(+t._proportion_.toFixed(2)) : util.toFixed(100 * t._proportion_) + "%";
    e = Math.max(e, measureText(i));
  }), e;
}

function fixColumeData(t, e, i, a, n, o) {
  return t.map(function (t) {
    return null === t ? null : (t.width = (e - 2 * n.columePadding) / i, o.extra.column && o.extra.column.width && +o.extra.
    column.width > 0 ? t.width = Math.min(t.width, +o.extra.column.width) : t.width = Math.min(t.width, 25), t.x +=
    (a + .5 - i / 2) * t.width, t);
  });
}

function getXAxisPoints(t, e, i) {
  var a = i.yAxisWidth + i.yAxisTitleWidth,
  n = e.width - 2 * i.padding - a,
  o = e.enableScroll ? Math.min(5, t.length) : t.length,
  r = n / o,
  s = [],
  l = i.padding + a,
  h = e.width - i.padding;
  return t.forEach(function (t, e) {
    s.push(l + e * r);
  }), !0 === e.enableScroll ? s.push(l + t.length * r) : s.push(h), {
    xAxisPoints: s,
    startX: l,
    endX: h,
    eachSpacing: r };

}

function getDataPoints(t, e, i, a, n, o, r) {
  var s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 1,
  l = [],
  h = o.height - 2 * r.padding - r.xAxisHeight - r.legendHeight;
  return t.forEach(function (t, c) {
    if (null === t) l.push(null);else
    {
      var d = {};
      d.x = a[c] + Math.round(n / 2);
      var x = h * (t - e) / (i - e);
      x *= s, d.y = o.height - r.xAxisHeight - r.legendHeight - Math.round(x) - r.padding, l.push(d);
    }
  }), l;
}

function getYAxisTextList(t, e, i) {
  var a = dataCombine(t);
  a = a.filter(function (t) {
    return null !== t;
  });
  var n = Math.min.apply(this, a),
  o = Math.max.apply(this, a);
  if ("number" == typeof e.yAxis.min && (n = Math.min(e.yAxis.min, n)), "number" == typeof e.yAxis.max && (o = Math.max(
  e.yAxis.max, o)), n === o) {
    var r = o || 1;
    n -= r, o += r;
  }
  for (var s = getDataRange(n, o), l = s.minRange, h = s.maxRange, c = [], d = (h - l) / i.yAxisSplit, x = 0; x <= i.yAxisSplit; x++) {
    c.push(l + d * x);}
  return c.reverse();
}

function calYAxisData(t, e, i) {
  var a = getYAxisTextList(t, e, i),
  n = i.yAxisWidth,
  o = a.map(function (t) {
    return t = util.toFixed(t, 2), t = e.yAxis.format ? e.yAxis.format(Number(t)) : t, n = Math.max(n, measureText(t) +
    5), t;
  });
  return !0 === e.yAxis.disabled && (n = 0), {
    rangesFormat: o,
    ranges: a,
    yAxisWidth: n };

}

function drawPointShape(t, e, i, a) {
  a.beginPath(), a.setStrokeStyle("#ffffff"), a.setLineWidth(1), a.setFillStyle(e), "diamond" === i ? t.forEach(function (
  t, e) {
    null !== t && (a.moveTo(t.x, t.y - 4.5), a.lineTo(t.x - 4.5, t.y), a.lineTo(t.x, t.y + 4.5), a.lineTo(t.x + 4.5, t.y),
    a.lineTo(t.x, t.y - 4.5));
  }) : "circle" === i ? t.forEach(function (t, e) {
    null !== t && (a.moveTo(t.x + 3.5, t.y), a.arc(t.x, t.y, 4, 0, 2 * Math.PI, !1));
  }) : "rect" === i ? t.forEach(function (t, e) {
    null !== t && (a.moveTo(t.x - 3.5, t.y - 3.5), a.rect(t.x - 3.5, t.y - 3.5, 7, 7));
  }) : "triangle" === i && t.forEach(function (t, e) {
    null !== t && (a.moveTo(t.x, t.y - 4.5), a.lineTo(t.x - 4.5, t.y + 4.5), a.lineTo(t.x + 4.5, t.y + 4.5), a.lineTo(t.
    x, t.y - 4.5));
  }), a.closePath(), a.fill(), a.stroke();
}

function drawRingTitle(t, e, i) {
  var a = t.title.fontSize || e.titleFontSize,
  n = t.subtitle.fontSize || e.subtitleFontSize,
  o = t.title.name || "",
  r = t.subtitle.name || "",
  s = t.title.color || e.titleColor,
  l = t.subtitle.color || e.subtitleColor,
  h = o ? a : 0,
  c = r ? n : 0;
  if (r) {
    var d = measureText(r, n),
    x = (t.width - d) / 2 + (t.subtitle.offsetX || 0),
    f = (t.height - e.legendHeight + n) / 2;
    o && (f -= (h + 5) / 2), i.beginPath(), i.setFontSize(n), i.setFillStyle(l), i.fillText(r, x, f), i.stroke(), i.closePath();
  }
  if (o) {
    var u = measureText(o, a),
    g = (t.width - u) / 2 + (t.title.offsetX || 0),
    p = (t.height - e.legendHeight + a) / 2;
    r && (p += (c + 5) / 2), i.beginPath(), i.setFontSize(a), i.setFillStyle(s), i.fillText(o, g, p), i.stroke(), i.closePath();
  }
}

function drawPointText(t, e, i, a) {
  var n = e.data;
  a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle("#666666"), t.forEach(function (t, i) {
    if (null !== t) {
      var o = e.format ? e.format(n[i]) : n[i];
      a.fillText(o, t.x - measureText(o) / 2, t.y - 2);
    }
  }), a.closePath(), a.stroke();
}

function drawRadarLabel(t, e, i, a, n, o) {
  var r = a.extra.radar || {};
  e += n.radarLabelTextMargin, o.beginPath(), o.setFontSize(n.fontSize), o.setFillStyle(r.labelColor || "#666666"), t.forEach(
  function (t, r) {
    var s = {
      x: e * Math.cos(t),
      y: e * Math.sin(t) },

    l = convertCoordinateOrigin(s.x, s.y, i),
    h = l.x,
    c = l.y;
    util.approximatelyEqual(s.x, 0) ? h -= measureText(a.categories[r] || "") / 2 : s.x < 0 && (h -= measureText(a.categories[
    r] || "")), o.fillText(a.categories[r] || "", h, c + n.fontSize / 2);
  }), o.stroke(), o.closePath();
}

function drawPieText(t, e, i, a, n, o) {
  var r = n + i.pieChartLinePadding,
  s = [],
  l = null;
  t.map(function (t) {
    return {
      arc: 2 * Math.PI - (t._start_ + 2 * Math.PI * t._proportion_ / 2),
      text: t.format ? t.format(+t._proportion_.toFixed(2)) : util.toFixed(100 * t._proportion_) + "%",
      color: t.color };

  }).forEach(function (t) {
    var e = Math.cos(t.arc) * r,
    a = Math.sin(t.arc) * r,
    o = Math.cos(t.arc) * n,
    h = Math.sin(t.arc) * n,
    c = e >= 0 ? e + i.pieChartTextPadding : e - i.pieChartTextPadding,
    d = a,
    x = measureText(t.text),
    f = d;
    l && util.isSameXCoordinateArea(l.start, {
      x: c }) && (
    f = c > 0 ? Math.min(d, l.start.y) : e < 0 ? Math.max(d, l.start.y) : d > 0 ? Math.max(d, l.start.y) : Math.
    min(d, l.start.y)), c < 0 && (c -= x);
    var u = {
      lineStart: {
        x: o,
        y: h },

      lineEnd: {
        x: e,
        y: a },

      start: {
        x: c,
        y: f },

      width: x,
      height: i.fontSize,
      text: t.text,
      color: t.color };

    l = avoidCollision(u, l), s.push(l);
  }), s.forEach(function (t) {
    var e = convertCoordinateOrigin(t.lineStart.x, t.lineStart.y, o),
    n = convertCoordinateOrigin(t.lineEnd.x, t.lineEnd.y, o),
    r = convertCoordinateOrigin(t.start.x, t.start.y, o);
    a.setLineWidth(1), a.setFontSize(i.fontSize), a.beginPath(), a.setStrokeStyle(t.color), a.setFillStyle(t.color), a.moveTo(
    e.x, e.y);
    var s = t.start.x < 0 ? r.x + t.width : r.x,
    l = t.start.x < 0 ? r.x - 5 : r.x + 5;
    a.quadraticCurveTo(n.x, n.y, s, r.y), a.moveTo(e.x, e.y), a.stroke(), a.closePath(), a.beginPath(), a.moveTo(r.x +
    t.width, r.y), a.arc(s, r.y, 2, 0, 2 * Math.PI), a.closePath(), a.fill(), a.beginPath(), a.setFillStyle("#666666"),
    a.fillText(t.text, l, r.y + 3), a.closePath(), a.stroke(), a.closePath();
  });
}

function drawToolTipSplitLine(t, e, i, a) {
  var n = i.padding,
  o = e.height - i.padding - i.xAxisHeight - i.legendHeight;
  a.beginPath(), a.setStrokeStyle("#cccccc"), a.setLineWidth(1), a.moveTo(t, n), a.lineTo(t, o), a.stroke(), a.closePath();
}

function drawToolTip(t, e, i, a, n) {
  var o = !1;
  e = assign({
    x: 0,
    y: 0 },
  e), e.y -= 8;
  var r = t.map(function (t) {
    return measureText(t.text);
  }),
  s = 9 + 4 * a.toolTipPadding + Math.max.apply(null, r),
  l = 2 * a.toolTipPadding + t.length * a.toolTipLineHeight;
  e.x - Math.abs(i._scrollDistance_) + 8 + s > i.width && (o = !0), n.beginPath(), n.setFillStyle(i.tooltip.option.background ||
  a.toolTipBackground), n.setGlobalAlpha(a.toolTipOpacity), o ? (n.moveTo(e.x, e.y + 10), n.lineTo(e.x - 8, e.y + 10 -
  5), n.lineTo(e.x - 8, e.y + 10 + 5), n.moveTo(e.x, e.y + 10), n.fillRect(e.x - s - 8, e.y, s, l)) : (n.moveTo(e.x, e.
  y + 10), n.lineTo(e.x + 8, e.y + 10 - 5), n.lineTo(e.x + 8, e.y + 10 + 5), n.moveTo(e.x, e.y + 10), n.fillRect(e.x +
  8, e.y, s, l)), n.closePath(), n.fill(), n.setGlobalAlpha(1), t.forEach(function (t, i) {
    n.beginPath(), n.setFillStyle(t.color);
    var r = e.x + 8 + 2 * a.toolTipPadding,
    l = e.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * i + a.toolTipPadding;
    o && (r = e.x - s - 8 + 2 * a.toolTipPadding), n.fillRect(r, l, 4, a.fontSize), n.closePath();
  }), n.beginPath(), n.setFontSize(a.fontSize), n.setFillStyle("#ffffff"), t.forEach(function (t, i) {
    var r = e.x + 8 + 2 * a.toolTipPadding + 4 + 5;
    o && (r = e.x - s - 8 + 2 * a.toolTipPadding + 4 + 5);
    var l = e.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * i + a.toolTipPadding;
    n.fillText(t.text, r, l + a.fontSize);
  }), n.stroke(), n.closePath();
}

function drawYAxisTitle(t, e, i, a) {
  var n = i.xAxisHeight + (e.height - i.xAxisHeight - measureText(t)) / 2;
  a.save(), a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle(e.yAxis.titleFontColor || "#333333"), a.translate(0,
  e.height), a.rotate(-90 * Math.PI / 180), a.fillText(t, n, i.padding + .5 * i.fontSize), a.stroke(), a.closePath(),
  a.restore();
}

function drawColumnDataPoints(t, e, i, a) {
  var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
  o = calYAxisData(t, e, i),
  r = o.ranges,
  s = getXAxisPoints(e.categories, e, i),
  l = s.xAxisPoints,
  h = s.eachSpacing,
  c = r.pop(),
  d = r.shift();
  return a.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && a.translate(e._scrollDistance_,
  0), t.forEach(function (o, r) {
    var s = o.data,
    x = getDataPoints(s, c, d, l, h, e, i, n);
    x = fixColumeData(x, h, t.length, r, i, e), a.beginPath(), a.setFillStyle(o.color), x.forEach(function (t, n) {
      if (null !== t) {
        var o = t.x - t.width / 2 + 1,
        r = e.height - t.y - i.padding - i.xAxisHeight - i.legendHeight;
        a.moveTo(o, t.y), a.rect(o, t.y, t.width - 2, r);
      }
    }), a.closePath(), a.fill();
  }), t.forEach(function (o, r) {
    var s = o.data,
    x = getDataPoints(s, c, d, l, h, e, i, n);
    x = fixColumeData(x, h, t.length, r, i, e), !1 !== e.dataLabel && 1 === n && drawPointText(x, o, i, a);
  }), a.restore(), {
    xAxisPoints: l,
    eachSpacing: h };

}

function drawAreaDataPoints(t, e, i, a) {
  var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
  o = calYAxisData(t, e, i),
  r = o.ranges,
  s = getXAxisPoints(e.categories, e, i),
  l = s.xAxisPoints,
  h = s.eachSpacing,
  c = r.pop(),
  d = r.shift(),
  x = e.height - i.padding - i.xAxisHeight - i.legendHeight,
  f = [];
  return a.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && a.translate(e._scrollDistance_,
  0), e.tooltip && e.tooltip.textList && e.tooltip.textList.length && 1 === n && drawToolTipSplitLine(e.tooltip.offset.
  x, e, i, a), t.forEach(function (t, o) {
    var r = t.data,
    s = getDataPoints(r, c, d, l, h, e, i, n);
    if (f.push(s), splitPoints(s).forEach(function (i) {
      if (a.beginPath(), a.setStrokeStyle(t.color), a.setFillStyle(t.color), a.setGlobalAlpha(.6), a.setLineWidth(2),
      i.length > 1) {
        var n = i[0],
        o = i[i.length - 1];
        a.moveTo(n.x, n.y), "curve" === e.extra.lineStyle ? i.forEach(function (t, e) {
          if (e > 0) {
            var n = createCurveControlPoints(i, e - 1);
            a.bezierCurveTo(n.ctrA.x, n.ctrA.y, n.ctrB.x, n.ctrB.y, t.x, t.y);
          }
        }) : i.forEach(function (t, e) {
          e > 0 && a.lineTo(t.x, t.y);
        }), a.lineTo(o.x, x), a.lineTo(n.x, x), a.lineTo(n.x, n.y);
      } else {
        var r = i[0];
        a.moveTo(r.x - h / 2, r.y), a.lineTo(r.x + h / 2, r.y), a.lineTo(r.x + h / 2, x), a.lineTo(r.x - h / 2, x), a.moveTo(
        r.x - h / 2, r.y);
      }
      a.closePath(), a.fill(), a.setGlobalAlpha(1);
    }), !1 !== e.dataPointShape) {
      var u = i.dataPointShape[o % i.dataPointShape.length];
      drawPointShape(s, t.color, u, a);
    }
  }), !1 !== e.dataLabel && 1 === n && t.forEach(function (t, o) {
    drawPointText(getDataPoints(t.data, c, d, l, h, e, i, n), t, i, a);
  }), a.restore(), {
    xAxisPoints: l,
    calPoints: f,
    eachSpacing: h };

}

function drawLineDataPoints(t, e, i, a) {
  var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
  o = calYAxisData(t, e, i),
  r = o.ranges,
  s = getXAxisPoints(e.categories, e, i),
  l = s.xAxisPoints,
  h = s.eachSpacing,
  c = r.pop(),
  d = r.shift(),
  x = [];
  return a.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && a.translate(e._scrollDistance_,
  0), e.tooltip && e.tooltip.textList && e.tooltip.textList.length && 1 === n && drawToolTipSplitLine(e.tooltip.offset.
  x, e, i, a), t.forEach(function (t, o) {
    var r = t.data,
    s = getDataPoints(r, c, d, l, h, e, i, n);
    if (x.push(s), splitPoints(s).forEach(function (i, n) {
      a.beginPath(), a.setStrokeStyle(t.color), a.setLineWidth(2), 1 === i.length ? (a.moveTo(i[0].x, i[0].y), a.arc(i[
      0].x, i[0].y, 1, 0, 2 * Math.PI)) : (a.moveTo(i[0].x, i[0].y), "curve" === e.extra.lineStyle ? i.forEach(
      function (t, e) {
        if (e > 0) {
          var n = createCurveControlPoints(i, e - 1);
          a.bezierCurveTo(n.ctrA.x, n.ctrA.y, n.ctrB.x, n.ctrB.y, t.x, t.y);
        }
      }) : i.forEach(function (t, e) {
        e > 0 && a.lineTo(t.x, t.y);
      }), a.moveTo(i[0].x, i[0].y)), a.closePath(), a.stroke();
    }), !1 !== e.dataPointShape) {
      var f = i.dataPointShape[o % i.dataPointShape.length];
      drawPointShape(s, t.color, f, a);
    }
  }), !1 !== e.dataLabel && 1 === n && t.forEach(function (t, o) {
    drawPointText(getDataPoints(t.data, c, d, l, h, e, i, n), t, i, a);
  }), a.restore(), {
    xAxisPoints: l,
    calPoints: x,
    eachSpacing: h };

}

function drawToolTipBridge(t, e, i, a) {
  i.save(), t._scrollDistance_ && 0 !== t._scrollDistance_ && !0 === t.enableScroll && i.translate(t._scrollDistance_, 0),
  t.tooltip && t.tooltip.textList && t.tooltip.textList.length && 1 === a && drawToolTip(t.tooltip.textList, t.tooltip.offset,
  t, e, i), i.restore();
}

function drawXAxis(t, e, i, a) {
  var n = getXAxisPoints(t, e, i),
  o = n.xAxisPoints,
  r = (n.startX, n.endX, n.eachSpacing),
  s = e.height - i.padding - i.xAxisHeight - i.legendHeight,
  l = s + i.xAxisLineHeight;
  a.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && a.translate(e._scrollDistance_, 0), a.beginPath(), a.setStrokeStyle(
  e.xAxis.gridColor || "#cccccc"), !0 !== e.xAxis.disableGrid && ("calibration" === e.xAxis.type ? o.forEach(function (
  t, e) {
    e > 0 && (a.moveTo(t - r / 2, s), a.lineTo(t - r / 2, s + 4));
  }) : o.forEach(function (t, e) {
    a.moveTo(t, s), a.lineTo(t, l);
  })), a.closePath(), a.stroke();
  var h = e.width - 2 * i.padding - i.yAxisWidth - i.yAxisTitleWidth,
  c = Math.min(t.length, Math.ceil(h / i.fontSize / 1.5)),
  d = Math.ceil(t.length / c);
  t = t.map(function (t, e) {
    return e % d != 0 ? "" : t;
  }), 0 === i._xAxisTextAngle_ ? (a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle(e.xAxis.fontColor ||
  "#666666"), t.forEach(function (t, e) {
    var n = r / 2 - measureText(t) / 2;
    a.fillText(t, o[e] + n, s + i.fontSize + 5);
  }), a.closePath(), a.stroke()) : t.forEach(function (t, n) {
    a.save(), a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle(e.xAxis.fontColor || "#666666");
    var l = measureText(t),
    h = r / 2 - l,
    c = calRotateTranslate(o[n] + r / 2, s + i.fontSize / 2 + 5, e.height),
    d = c.transX,
    x = c.transY;
    a.rotate(-1 * i._xAxisTextAngle_), a.translate(d, x), a.fillText(t, o[n] + h, s + i.fontSize + 5), a.closePath(), a.
    stroke(), a.restore();
  }), a.restore();
}

function drawYAxisGrid(t, e, i) {
  for (var a = t.height - 2 * e.padding - e.xAxisHeight - e.legendHeight, n = Math.floor(a / e.yAxisSplit), o = e.yAxisWidth +
  e.yAxisTitleWidth, r = e.padding + o, s = t.width - e.padding, l = [], h = 0; h < e.yAxisSplit; h++) {l.push(e.padding +
    n * h);}
  l.push(e.padding + n * e.yAxisSplit + 2), i.beginPath(), i.setStrokeStyle(t.yAxis.gridColor || "#cccccc"), i.setLineWidth(
  1), l.forEach(function (t, e) {
    i.moveTo(r, t), i.lineTo(s, t);
  }), i.closePath(), i.stroke();
}

function drawYAxis(t, e, i, a) {
  if (!0 !== e.yAxis.disabled) {
    var n = calYAxisData(t, e, i),
    o = n.rangesFormat,
    r = i.yAxisWidth + i.yAxisTitleWidth,
    s = e.height - 2 * i.padding - i.xAxisHeight - i.legendHeight,
    l = Math.floor(s / i.yAxisSplit),
    h = i.padding + r,
    c = e.width - i.padding,
    d = e.height - i.padding - i.xAxisHeight - i.legendHeight;
    a.setFillStyle(e.background || "#ffffff"), e._scrollDistance_ < 0 && a.fillRect(0, 0, h, d + i.xAxisHeight + 5), a.fillRect(
    c, 0, e.width, d + i.xAxisHeight + 5);
    for (var x = [], f = 0; f <= i.yAxisSplit; f++) {x.push(i.padding + l * f);}
    a.stroke(), a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle(e.yAxis.fontColor || "#666666"), o.forEach(
    function (t, e) {
      var n = x[e] ? x[e] : d;
      a.fillText(t, i.padding + i.yAxisTitleWidth, n + i.fontSize / 2);
    }), a.closePath(), a.stroke(), e.yAxis.title && drawYAxisTitle(e.yAxis.title, e, i, a);
  }
}

function drawLegend(t, e, i, a) {
  if (e.legend) {
    var n = calLegendData(t, e, i),
    o = n.legendList;
    o.forEach(function (t, n) {
      var o = 0;
      t.forEach(function (t) {
        t.name = t.name || "undefined", o += 15 + measureText(t.name) + 15;
      });
      var r = (e.width - o) / 2 + 5,
      s = e.height - i.padding - i.legendHeight + n * (i.fontSize + 8) + 5 + 8;
      a.setFontSize(i.fontSize), t.forEach(function (t) {
        switch (e.type) {
          case "line":
            a.beginPath(), a.setLineWidth(1), a.setStrokeStyle(t.color), a.moveTo(r - 2, s + 5), a.lineTo(r + 17, s + 5),
            a.stroke(), a.closePath(), a.beginPath(), a.setLineWidth(1), a.setStrokeStyle("#ffffff"), a.setFillStyle(t.color),
            a.moveTo(r + 7.5, s + 5), a.arc(r + 7.5, s + 5, 4, 0, 2 * Math.PI), a.fill(), a.stroke(), a.closePath();
            break;
          case "pie":
          case "ring":
            a.beginPath(), a.setFillStyle(t.color), a.moveTo(r + 7.5, s + 5), a.arc(r + 7.5, s + 5, 7, 0, 2 * Math.PI), a.
            closePath(), a.fill();
            break;
          default:
            a.beginPath(), a.setFillStyle(t.color), a.moveTo(r, s), a.rect(r, s, 15, 10), a.closePath(), a.fill();}

        r += 20, a.beginPath(), a.setFillStyle(e.extra.legendTextColor || "#333333"), a.fillText(t.name, r, s + 9), a.closePath(),
        a.stroke(), r += measureText(t.name) + 10;
      });
    });
  }
}

function drawPieDataPoints(t, e, i, a) {
  var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
  o = e.extra.pie || {};
  t = getPieDataPoints(t, n);
  var r = {
    x: e.width / 2,
    y: (e.height - i.legendHeight) / 2 },

  s = Math.min(r.x - i.pieChartLinePadding - i.pieChartTextPadding - i._pieTextMaxLength_, r.y - i.pieChartLinePadding -
  i.pieChartTextPadding);
  if (e.dataLabel ? s -= 10 : s -= 2 * i.padding, t = t.map(function (t) {
    return t._start_ += (o.offsetAngle || 0) * Math.PI / 180, t;
  }), t.forEach(function (t) {
    a.beginPath(), a.setLineWidth(2), a.setStrokeStyle("#ffffff"), a.setFillStyle(t.color), a.moveTo(r.x, r.y), a.arc(r.
    x, r.y, s, t._start_, t._start_ + 2 * t._proportion_ * Math.PI), a.closePath(), a.fill(), !0 !== e.disablePieStroke &&
    a.stroke();
  }), "ring" === e.type) {
    var l = .6 * s;
    "number" == typeof e.extra.ringWidth && e.extra.ringWidth > 0 && (l = Math.max(0, s - e.extra.ringWidth)), a.beginPath(),
    a.setFillStyle(e.background || "#ffffff"), a.moveTo(r.x, r.y), a.arc(r.x, r.y, l, 0, 2 * Math.PI), a.closePath(), a.fill();
  }
  if (!1 !== e.dataLabel && 1 === n) {
    for (var h = !1, c = 0, d = t.length; c < d; c++) {
      if (t[c].data > 0) {
        h = !0;
        break;
      }}h && drawPieText(t, e, i, a, s, r);
  }
  return 1 === n && "ring" === e.type && drawRingTitle(e, i, a), {
    center: r,
    radius: s,
    series: t };

}

function drawRadarDataPoints(t, e, i, a) {
  var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
  o = e.extra.radar || {},
  r = getRadarCoordinateSeries(e.categories.length),
  s = {
    x: e.width / 2,
    y: (e.height - i.legendHeight) / 2 },

  l = Math.min(s.x - (getMaxTextListLength(e.categories) + i.radarLabelTextMargin), s.y - i.radarLabelTextMargin);
  l -= i.padding, a.beginPath(), a.setLineWidth(1), a.setStrokeStyle(o.gridColor || "#cccccc"), r.forEach(function (t) {
    var e = convertCoordinateOrigin(l * Math.cos(t), l * Math.sin(t), s);
    a.moveTo(s.x, s.y), a.lineTo(e.x, e.y);
  }), a.stroke(), a.closePath();
  for (var h = 1; h <= i.radarGridCount; h++) {!function (t) {
      var e = {};
      a.beginPath(), a.setLineWidth(1), a.setStrokeStyle(o.gridColor || "#cccccc"), r.forEach(function (n, o) {
        var r = convertCoordinateOrigin(l / i.radarGridCount * t * Math.cos(n), l / i.radarGridCount * t * Math.sin(n), s);
        0 === o ? (e = r, a.moveTo(r.x, r.y)) : a.lineTo(r.x, r.y);
      }), a.lineTo(e.x, e.y), a.stroke(), a.closePath();
    }(h);}
  return getRadarDataPoints(r, s, l, t, e, n).forEach(function (t, n) {
    if (a.beginPath(), a.setFillStyle(t.color), a.setGlobalAlpha(.6), t.data.forEach(function (t, e) {
      0 === e ? a.moveTo(t.position.x, t.position.y) : a.lineTo(t.position.x, t.position.y);
    }), a.closePath(), a.fill(), a.setGlobalAlpha(1), !1 !== e.dataPointShape) {
      var o = i.dataPointShape[n % i.dataPointShape.length];
      drawPointShape(t.data.map(function (t) {
        return t.position;
      }), t.color, o, a);
    }
  }), drawRadarLabel(r, l, s, e, i, a), {
    center: s,
    radius: l,
    angleList: r };

}

function drawCanvas(t, e) {
  e.draw();
}

function Animation(t) {
  this.isStop = !1, t.duration = void 0 === t.duration ? 1e3 : t.duration, t.timing = t.timing || "linear";
  var e = function () {
    return "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : "undefined" != typeof setTimeout ?
    function (t, e) {
      setTimeout(function () {
        var e = +new Date();
        t(e);
      }, e);
    } : function (t) {
      t(null);
    };
  }(),
  i = null,
  _a = function a(n) {
    if (null === n || !0 === this.isStop) return t.onProcess && t.onProcess(1), void (t.onAnimationFinish && t.onAnimationFinish());
    if (null === i && (i = n), n - i < t.duration) {
      var o = (n - i) / t.duration;
      o = (0, Timing[t.timing])(o), t.onProcess && t.onProcess(o), e(_a, 17);
    } else t.onProcess && t.onProcess(1), t.onAnimationFinish && t.onAnimationFinish();
  };
  _a = _a.bind(this), e(_a, 17);
}

function drawCharts(t, e, i, a) {
  var n = this,
  o = e.series,
  r = e.categories;
  o = fillSeriesColor(o, i);
  var s = calLegendData(o, e, i),
  l = s.legendHeight;
  i.legendHeight = l;
  var h = calYAxisData(o, e, i),
  c = h.yAxisWidth;
  if (i.yAxisWidth = c, r && r.length) {
    var d = calCategoriesData(r, e, i),
    x = d.xAxisHeight,
    f = d.angle;
    i.xAxisHeight = x, i._xAxisTextAngle_ = f;
  }
  "pie" !== t && "ring" !== t || (i._pieTextMaxLength_ = !1 === e.dataLabel ? 0 : getPieTextMaxLength(o));
  var u = e.animation ? 1e3 : 0;
  switch (this.animationInstance && this.animationInstance.stop(), t) {
    case "line":
      this.animationInstance = new Animation({
        timing: "easeIn",
        duration: u,
        onProcess: function onProcess(t) {
          drawYAxisGrid(e, i, a);
          var s = drawLineDataPoints(o, e, i, a, t),
          l = s.xAxisPoints,
          h = s.calPoints,
          c = s.eachSpacing;
          n.chartData.xAxisPoints = l, n.chartData.calPoints = h, n.chartData.eachSpacing = c, drawXAxis(r, e, i, a),
          drawLegend(e.series, e, i, a), drawYAxis(o, e, i, a), drawToolTipBridge(e, i, a, t), drawCanvas(e, a);
        },
        onAnimationFinish: function onAnimationFinish() {
          n.event.trigger("renderComplete");
        } });

      break;
    case "column":
      this.animationInstance = new Animation({
        timing: "easeIn",
        duration: u,
        onProcess: function onProcess(t) {
          drawYAxisGrid(e, i, a);
          var s = drawColumnDataPoints(o, e, i, a, t),
          l = s.xAxisPoints,
          h = s.eachSpacing;
          n.chartData.xAxisPoints = l, n.chartData.eachSpacing = h, drawXAxis(r, e, i, a), drawLegend(e.series, e, i, a),
          drawYAxis(o, e, i, a), drawCanvas(e, a);
        },
        onAnimationFinish: function onAnimationFinish() {
          n.event.trigger("renderComplete");
        } });

      break;
    case "area":
      this.animationInstance = new Animation({
        timing: "easeIn",
        duration: u,
        onProcess: function onProcess(t) {
          drawYAxisGrid(e, i, a);
          var s = drawAreaDataPoints(o, e, i, a, t),
          l = s.xAxisPoints,
          h = s.calPoints,
          c = s.eachSpacing;
          n.chartData.xAxisPoints = l, n.chartData.calPoints = h, n.chartData.eachSpacing = c, drawXAxis(r, e, i, a),
          drawLegend(e.series, e, i, a), drawYAxis(o, e, i, a), drawToolTipBridge(e, i, a, t), drawCanvas(e, a);
        },
        onAnimationFinish: function onAnimationFinish() {
          n.event.trigger("renderComplete");
        } });

      break;
    case "ring":
    case "pie":
      this.animationInstance = new Animation({
        timing: "easeInOut",
        duration: u,
        onProcess: function onProcess(t) {
          n.chartData.pieData = drawPieDataPoints(o, e, i, a, t), drawLegend(e.series, e, i, a), drawCanvas(e, a);
        },
        onAnimationFinish: function onAnimationFinish() {
          n.event.trigger("renderComplete");
        } });

      break;
    case "radar":
      this.animationInstance = new Animation({
        timing: "easeInOut",
        duration: u,
        onProcess: function onProcess(t) {
          n.chartData.radarData = drawRadarDataPoints(o, e, i, a, t), drawLegend(e.series, e, i, a), drawCanvas(e, a);
        },
        onAnimationFinish: function onAnimationFinish() {
          n.event.trigger("renderComplete");
        } });}


}

function Event() {
  this.events = {};
}
var config = {
  yAxisWidth: 15,
  yAxisSplit: 5,
  xAxisHeight: 15,
  xAxisLineHeight: 15,
  legendHeight: 15,
  yAxisTitleWidth: 15,
  padding: 12,
  columePadding: 3,
  fontSize: 10,
  dataPointShape: ["diamond", "circle", "triangle", "rect"],
  colors: ["#7cb5ec", "#f7a35c", "#434348", "#90ed7d", "#f15c80", "#8085e9"],
  pieChartLinePadding: 25,
  pieChartTextPadding: 15,
  xAxisTextPadding: 3,
  titleColor: "#333333",
  titleFontSize: 20,
  subtitleColor: "#999999",
  subtitleFontSize: 15,
  toolTipPadding: 3,
  toolTipBackground: "#000000",
  toolTipOpacity: .7,
  toolTipLineHeight: 14,
  radarGridCount: 3,
  radarLabelTextMargin: 15 },

util = {
  toFixed: function toFixed(t, e) {
    return e = e || 2, this.isFloat(t) && (t = t.toFixed(e)), t;
  },
  isFloat: function isFloat(t) {
    return t % 1 != 0;
  },
  approximatelyEqual: function approximatelyEqual(t, e) {
    return Math.abs(t - e) < 1e-10;
  },
  isSameSign: function isSameSign(t, e) {
    return Math.abs(t) === t && Math.abs(e) === e || Math.abs(t) !== t && Math.abs(e) !== e;
  },
  isSameXCoordinateArea: function isSameXCoordinateArea(t, e) {
    return this.isSameSign(t.x, e.x);
  },
  isCollision: function isCollision(t, e) {
    return t.end = {}, t.end.x = t.start.x + t.width, t.end.y = t.start.y - t.height, e.end = {}, e.end.x = e.start.x +
    e.width, e.end.y = e.start.y - e.height, !(e.start.x > t.end.x || e.end.x < t.start.x || e.end.y > t.start.y || e.start.
    y < t.end.y);
  } },

Timing = {
  easeIn: function easeIn(t) {
    return Math.pow(t, 3);
  },
  easeOut: function easeOut(t) {
    return Math.pow(t - 1, 3) + 1;
  },
  easeInOut: function easeInOut(t) {
    return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2);
  },
  linear: function linear(t) {
    return t;
  } };

Animation.prototype.stop = function () {
  this.isStop = !0;
}, Event.prototype.addEventListener = function (t, e) {
  this.events[t] = this.events[t] || [], this.events[t].push(e);
}, Event.prototype.trigger = function () {
  for (var t = arguments.length, e = Array(t), i = 0; i < t; i++) {e[i] = arguments[i];}
  var a = e[0],
  n = e.slice(1);
  this.events[a] && this.events[a].forEach(function (t) {
    try {
      t.apply(null, n);
    } catch (t) {
      console.error(t);
    }
  });
};
var Charts = function Charts(t) {
  t.title = t.title || {}, t.subtitle = t.subtitle || {}, t.yAxis = t.yAxis || {}, t.xAxis = t.xAxis || {}, t.extra = t.
  extra || {}, t.legend = !1 !== t.legend, t.animation = !1 !== t.animation;
  var e = assign({}, config);
  e.yAxisTitleWidth = !0 !== t.yAxis.disabled && t.yAxis.title ? e.yAxisTitleWidth : 0, e.pieChartLinePadding = !1 ===
  t.dataLabel ? 0 : e.pieChartLinePadding, e.pieChartTextPadding = !1 === t.dataLabel ? 0 : e.pieChartTextPadding,
  this.opts = t, this.config = e, this.context = uni.createCanvasContext(t.canvasId), this.chartData = {}, this.event =
  new Event(), this.scrollOption = {
    currentOffset: 0,
    startTouchX: 0,
    distance: 0 },
  drawCharts.call(this, t.type, t, e, this.context);
};
Charts.prototype.updateData = function () {
  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  this.opts.series = t.series || this.opts.series, this.opts.categories = t.categories || this.opts.categories, this.opts.
  title = assign({}, this.opts.title, t.title || {}), this.opts.subtitle = assign({}, this.opts.subtitle, t.subtitle ||
  {}), drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
}, Charts.prototype.stopAnimation = function () {
  this.animationInstance && this.animationInstance.stop();
}, Charts.prototype.addEventListener = function (t, e) {
  this.event.addEventListener(t, e);
}, Charts.prototype.getCurrentDataIndex = function (t) {
  var e = t.touches && t.touches.length ? t.touches : t.changedTouches;
  if (e && e.length) {
    var i = e[0],
    a = i.x,
    n = i.y;
    return "pie" === this.opts.type || "ring" === this.opts.type ? findPieChartCurrentIndex({
      x: a,
      y: n },
    this.chartData.pieData) : "radar" === this.opts.type ? findRadarChartCurrentIndex({
      x: a,
      y: n },
    this.chartData.radarData, this.opts.categories.length) : findCurrentIndex({
      x: a,
      y: n },
    this.chartData.xAxisPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
  }
  return -1;
}, Charts.prototype.showToolTip = function (t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  if ("line" === this.opts.type || "area" === this.opts.type) {
    var i = this.getCurrentDataIndex(t),
    a = this.scrollOption.currentOffset,
    n = assign({}, this.opts, {
      _scrollDistance_: a,
      animation: !1 });

    if (i > -1) {
      var o = getSeriesDataItem(this.opts.series, i);
      if (0 !== o.length) {
        var r = getToolTipData(o, this.chartData.calPoints, i, this.opts.categories, e),
        s = r.textList,
        l = r.offset;
        n.tooltip = {
          textList: s,
          offset: l,
          option: e };

      }
    }
    drawCharts.call(this, n.type, n, this.config, this.context);
  }
}, Charts.prototype.scrollStart = function (t) {
  t.touches[0] && !0 === this.opts.enableScroll && (this.scrollOption.startTouchX = t.touches[0].x);
}, Charts.prototype.scroll = function (t) {
  if (t.touches[0] && !0 === this.opts.enableScroll) {
    var e = t.touches[0].x - this.scrollOption.startTouchX,
    i = this.scrollOption.currentOffset,
    a = calValidDistance(i + e, this.chartData, this.config, this.opts);
    this.scrollOption.distance = e = a - i;
    var n = assign({}, this.opts, {
      _scrollDistance_: i + e,
      animation: !1 });

    drawCharts.call(this, n.type, n, this.config, this.context);
  }
}, Charts.prototype.scrollEnd = function (t) {
  if (!0 === this.opts.enableScroll) {
    var e = this.scrollOption,
    i = e.currentOffset,
    a = e.distance;
    this.scrollOption.currentOffset = i + a, this.scrollOption.distance = 0;
  }
}, module.exports = Charts;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!****************************************!*\
  !*** D:/资料/程序资料/黔诺康/common/request.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getApi = getApi;exports.upload = upload;exports.sendCode = sendCode;exports.getLocal = getLocal;exports.getAddList = getAddList;exports.getArea = getArea;exports.getAreaId = getAreaId;exports.AmapObj = exports.amap = exports.AppId = exports.ApiServer = void 0;var utils = __webpack_require__(/*! @/common/util.js */ 13);
//export const ApiServer = 'https://www.tcwanrenbang.cn/';
//export const ApiServer = 'http://192.168.2.189:9527/';
// export const ApiServer = 'http://47.93.91.21:8080/';
var ApiServer = 'https://www.ulvdbrv.cn/';
// export const ApiServer = 'http://192.168.0.12:8080/';
exports.ApiServer = ApiServer;var AppId = 'wx50b9df64d4785714';exports.AppId = AppId;
var amap = __webpack_require__(/*! ./amap.js */ 11);exports.amap = amap;
var AmapObj = new amap.AMapWX({
  // key: '514fc08a59aa59c024f149746a778641',
  key: '7ec4b9767a8dbd46e8b03d4949c37237' });


/**
                                               * 接口调用-同步
                                               * @param {Object} url
                                               * @param {Object} param	
                                               * @param {Object} callback
                                               * @param {Object} errback
                                               */exports.AmapObj = AmapObj;
function getApi(uri, param, method, debug, login) {
  return new Promise(function (resolt, retject) {
    var url = ApiServer + '' + uri;
    if (param == undefined || param == '' || typeof param != 'object') {
      param = new Object();
    }
    // 请求地址
    var apiurl = uri.indexOf('http') >= 0 ? uri : url;
    // 打印加密数据
    if (debug === true) {
      console.log(apiurl);
      console.log(JSON.stringify(param));
    }
    var userinfo = uni.getStorageSync('user');
    var methods = method && method != null ? method : "post";
    // console.log(methods);
    // 发起请求
    uni.request({
      url: apiurl,
      data: param,
      method: methods,
      header: {
        'content-type': methods.toString().toLocaleUpperCase() == 'POST' ? 'application/json' : 'application/x-www-form-urlencoded', // 默认值
        'userId': userinfo ? userinfo.userId : '',
        'serviceToken': userinfo ? userinfo.serviceToken : '',
        'lastLoginTime': userinfo ? userinfo.lastLoginTimes : '',
        'login': login },

      dataType: "json",
      success: function success(res) {
        if (uri.indexOf('http') >= 0) {
          if (res.statusCode == 200) {
            resolt(res.data);
            // console.log("打印接口");
          } else {
            retject(res.data);
          }
          return;
        }
        // console.log("打印接口");
        // console.log(JSON.stringify(res))
        if (res.statusCode == 200 && res.data.status == 0) {
          resolt(res.data);
          return;
        }
        if (res.statusCode == 200 && res.data.status != 0) {
          retject(res.data);
        }
        uni.hideLoading();
        console.log(res);
        uni.showToast({
          title: res.data.message,
          icon: 'none' });

      },
      fail: function fail(err) {
        //console.log(err)
        retject(err);
        uni.hideLoading();
        uni.showToast({
          title: "网络连接失败，请检查网络连接！",
          icon: "none",
          duration: 3000 });

      } });

  });
}
/**
   * 文件上传
   * @param {Object} file
   */
function upload(file) {
  return new Promise(function (resolt, retject) {
    utils.showloading();
    uni.uploadFile({
      url: ApiServer + '/api/upload/qiniu', //仅为示例，非真实的接口地址
      filePath: file,
      name: 'file',
      success: function success(uploadFileRes) {
        uni.hideLoading();
        var res = JSON.parse(uploadFileRes.data);
        if (uploadFileRes.statusCode == 200 && res.code == 200) {
          resolt(res.data);return;
        }
        utils.error('文件上传失败！');
      },
      fail: function fail(err) {
        uni.hideLoading();
        utils.error('文件上传失败！');
      } });

  });
}

/**
   * 发送验证码
   * @param {Object} mobile
   */
function sendCode(mobile) {
  return new Promise(function (resolt, retject) {
    getApi('/api/login/getVerifyCode', {
      phone: mobile },
    'get').then(function (res) {
      if (res.code == 200) {
        utils.success('发送成功！');
        resolt(true);
      } else {
        utils.error('发送失败！');
        retject(false);
        return;
      }
    }).catch(function (err) {
      retject(false);
    });
  });
}


/**
   * 获取定位
   */
function getLocal() {
  return new Promise(function (resolt, retject) {
    AmapObj.getRegeo({
      success: function success(data) {
        var info = data[0];
        var locationData = info.regeocodeData.addressComponent ? info.regeocodeData.addressComponent : {};
        locationData.latitude = info.latitude;
        locationData.longitude = info.longitude;
        locationData.area = locationData.district;
        // locationData.address = info.regeocodeData.addressComponent
        locationData.desc = info.desc;
        locationData.detail = locationData.province + '' + locationData.city + '' + locationData.district + '' + locationData.desc;
        // 获取省、市ID
        if (locationData.city) {
          getAreaId(locationData.city).then(function (local) {
            locationData.cityId = local.id;
            locationData.provinceId = local.pid;
            uni.setStorageSync('location', locationData);
            //获取区ID
            if (locationData.district) {
              getAreaId(locationData.district).then(function (area) {
                locationData.areaId = area.id;
                uni.setStorageSync('location', locationData);
                // console.log(locationData)
              });
            }
          });
        }
        resolt(locationData);
      },
      fail: function fail(err) {
        uni.hideLoading();
        uni.showModal({
          title: '提示',
          content: '无法获取定位，请开启定位后重试！',
          confirmText: '重试',
          success: function success(res) {
            if (res.confirm) {
              getLocal();
            }
          } });

      } });

  });
}

/**
   * 获取附近位置
   */
function getAddList() {
  return new Promise(function (resolt, retject) {
    AmapObj.getRegeo({
      success: function success(data) {
        console.log(data);
        resolt(data);
      },
      fail: function fail(err) {
        uni.hideLoading();
        uni.showModal({
          title: '提示',
          content: '无法获取定位，请开启定位后重试！',
          confirmText: '重试',
          success: function success(res) {
            if (res.confirm) {
              getLocal();
            }
          } });

      } });

  });
}

/**
   * 根据经纬度坐标获取地理位置
   * @param {Object} lat
   * @param {Object} lng
   */
function getArea(lat, lng) {
  return new Promise(function (resolt, retject) {
    var jsondata = {
      key: 'fb53a9274cd326bc10206e4e45541afd',
      location: lng + ',' + lat };

    utils.showloading();
    getApi('https://restapi.amap.com/v3/geocode/regeo?parameters', jsondata, 'get').then(function (res) {
      if (res.status == 1) {
        var info = {
          province: res.regeocode.addressComponent.province,
          provinceId: 0,
          city: res.regeocode.addressComponent.city,
          cityId: 0,
          area: res.regeocode.addressComponent.district,
          areaId: 0,
          address: res.regeocode.formatted_address };

        //获取省份ID
        getAreaId(info.province).then(function (prov) {
          console.log(prov);
          info.provinceId = prov.id;
          if (info.provinceId && info.cityId && info.areaId) {
            uni.hideLoading();
            resolt(info);
          }
        }).catch();
        //获取市ID
        getAreaId(info.city).then(function (prov) {
          info.cityId = prov.id;
          if (info.provinceId && info.cityId && info.areaId) {
            uni.hideLoading();
            resolt(info);
          }
        }).catch();
        //获取区ID
        getAreaId(info.area).then(function (prov) {
          info.areaId = prov.id;
          if (info.provinceId && info.cityId && info.areaId) {
            uni.hideLoading();
            resolt(info);
          }
        }).catch();
      } else {
        uni.hideLoading();
        utils.error('地址解析失败，请稍后重试！');
        retject(res);
      }
    }).catch(function (err) {
      console.log(err);
    });
  });
}


/**
   * 根据区域名称获取本级和上级区域ID
   * @param {Object} name
   */
function getAreaId(name) {
  return new Promise(function (resolt, retject) {
    getApi('/api/cms/getAreasByName', {
      name: name },
    'get').then(function (res) {
      if (res.data.length > 0) {
        resolt(res.data[0]);
      } else {
        retject(null);
      }
    }).catch(function (err) {
      retject(null);
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 125:
/*!****************************************!*\
  !*** D:/资料/程序资料/黔诺康/common/uqrcode.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //---------------------------------------------------------------------
// github https://github.com/Sansnn/uQRCode
//---------------------------------------------------------------------

var uQRCode = {};

(function () {
  //---------------------------------------------------------------------
  // QRCode for JavaScript
  //
  // Copyright (c) 2009 Kazuhiko Arase
  //
  // URL: http://www.d-project.com/
  //
  // Licensed under the MIT license:
  //   http://www.opensource.org/licenses/mit-license.php
  //
  // The word "QR Code" is registered trademark of 
  // DENSO WAVE INCORPORATED
  //   http://www.denso-wave.com/qrcode/faqpatent-e.html
  //
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  // QR8bitByte
  //---------------------------------------------------------------------

  function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
  }

  QR8bitByte.prototype = {

    getLength: function getLength(buffer) {
      return this.data.length;
    },

    write: function write(buffer) {
      for (var i = 0; i < this.data.length; i++) {
        // not JIS ...
        buffer.put(this.data.charCodeAt(i), 8);
      }
    } };


  //---------------------------------------------------------------------
  // QRCode
  //---------------------------------------------------------------------

  function QRCode(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = new Array();
  }

  QRCode.prototype = {

    addData: function addData(data) {
      var newData = new QR8bitByte(data);
      this.dataList.push(newData);
      this.dataCache = null;
    },

    isDark: function isDark(row, col) {
      if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
        throw new Error(row + "," + col);
      }
      return this.modules[row][col];
    },

    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },

    make: function make() {
      // Calculate automatically typeNumber if provided is < 1
      if (this.typeNumber < 1) {
        var typeNumber = 1;
        for (typeNumber = 1; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

          var buffer = new QRBitBuffer();
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          for (var i = 0; i < this.dataList.length; i++) {
            var data = this.dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
          }
          if (buffer.getLengthInBits() <= totalDataCount * 8)
          break;
        }
        this.typeNumber = typeNumber;
      }
      this.makeImpl(false, this.getBestMaskPattern());
    },

    makeImpl: function makeImpl(test, maskPattern) {

      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);

      for (var row = 0; row < this.moduleCount; row++) {

        this.modules[row] = new Array(this.moduleCount);

        for (var col = 0; col < this.moduleCount; col++) {
          this.modules[row][col] = null; //(col + row) % 3;
        }
      }

      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);

      if (this.typeNumber >= 7) {
        this.setupTypeNumber(test);
      }

      if (this.dataCache == null) {
        this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
      }

      this.mapData(this.dataCache, maskPattern);
    },

    setupPositionProbePattern: function setupPositionProbePattern(row, col) {

      for (var r = -1; r <= 7; r++) {

        if (row + r <= -1 || this.moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c++) {

          if (col + c <= -1 || this.moduleCount <= col + c) continue;

          if (0 <= r && r <= 6 && (c == 0 || c == 6) ||
          0 <= c && c <= 6 && (r == 0 || r == 6) ||
          2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },

    getBestMaskPattern: function getBestMaskPattern() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i++) {

        this.makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    },

    createMovieClip: function createMovieClip(target_mc, instance_name, depth) {

      var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
      var cs = 1;

      this.make();

      for (var row = 0; row < this.modules.length; row++) {

        var y = row * cs;

        for (var col = 0; col < this.modules[row].length; col++) {

          var x = col * cs;
          var dark = this.modules[row][col];

          if (dark) {
            qr_mc.beginFill(0, 100);
            qr_mc.moveTo(x, y);
            qr_mc.lineTo(x + cs, y);
            qr_mc.lineTo(x + cs, y + cs);
            qr_mc.lineTo(x, y + cs);
            qr_mc.endFill();
          }
        }
      }

      return qr_mc;
    },

    setupTimingPattern: function setupTimingPattern() {

      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
      }

      for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {
          continue;
        }
        this.modules[6][c] = c % 2 == 0;
      }
    },

    setupPositionAdjustPattern: function setupPositionAdjustPattern() {

      var pos = QRUtil.getPatternPosition(this.typeNumber);

      for (var i = 0; i < pos.length; i++) {

        for (var j = 0; j < pos.length; j++) {

          var row = pos[i];
          var col = pos[j];

          if (this.modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r++) {

            for (var c = -2; c <= 2; c++) {

              if (r == -2 || r == 2 || c == -2 || c == 2 ||
              r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },

    setupTypeNumber: function setupTypeNumber(test) {

      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },

    setupTypeInfo: function setupTypeInfo(test, maskPattern) {

      var data = this.errorCorrectLevel << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical		
      for (var i = 0; i < 15; i++) {

        var mod = !test && (bits >> i & 1) == 1;

        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i++) {

        var mod = !test && (bits >> i & 1) == 1;

        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      this.modules[this.moduleCount - 8][8] = !test;

    },

    mapData: function mapData(data, maskPattern) {

      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;

      for (var col = this.moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col--;

        while (true) {

          for (var c = 0; c < 2; c++) {

            if (this.modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }

              var mask = QRUtil.getMask(maskPattern, row, col - c);

              if (mask) {
                dark = !dark;
              }

              this.modules[row][col - c] = dark;
              bitIndex--;

              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }

    } };



  QRCode.PAD0 = 0xEC;
  QRCode.PAD1 = 0x11;

  QRCode.createData = function (typeNumber, errorCorrectLevel, dataList) {

    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

    var buffer = new QRBitBuffer();

    for (var i = 0; i < dataList.length; i++) {
      var data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }

    // calc num max data.
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount;
    }

    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error("code length overflow. (" +
      buffer.getLengthInBits() +
      ">" +
      totalDataCount * 8 +
      ")");
    }

    // end code
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }

    // padding
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }

    // padding
    while (true) {

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD0, 8);

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD1, 8);
    }

    return QRCode.createBytes(buffer, rsBlocks);
  };

  QRCode.createBytes = function (buffer, rsBlocks) {

    var offset = 0;

    var maxDcCount = 0;
    var maxEcCount = 0;

    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);

    for (var r = 0; r < rsBlocks.length; r++) {

      var dcCount = rsBlocks[r].dataCount;
      var ecCount = rsBlocks[r].totalCount - dcCount;

      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);

      dcdata[r] = new Array(dcCount);

      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;

      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }

    }

    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount;
    }

    var data = new Array(totalCodeCount);
    var index = 0;

    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }

    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }

    return data;

  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3 };


  //---------------------------------------------------------------------
  // QRErrorCorrectLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2 };


  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7 };


  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = {

    PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]],


    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,

    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },

    getBCHDigit: function getBCHDigit(data) {

      var digit = 0;

      while (data != 0) {
        digit++;
        data >>>= 1;
      }

      return digit;
    },

    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask: function getMask(maskPattern, i, j) {

      switch (maskPattern) {

        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;

        default:
          throw new Error("bad maskPattern:" + maskPattern);}

    },

    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {

      var a = new QRPolynomial([1], 0);

      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }

      return a;
    },

    getLengthInBits: function getLengthInBits(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 10;
          case QRMode.MODE_ALPHA_NUM:
            return 9;
          case QRMode.MODE_8BIT_BYTE:
            return 8;
          case QRMode.MODE_KANJI:
            return 8;
          default:
            throw new Error("mode:" + mode);}


      } else if (type < 27) {

        // 10 - 26

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + mode);}


      } else if (type < 41) {

        // 27 - 40

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 14;
          case QRMode.MODE_ALPHA_NUM:
            return 13;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + mode);}


      } else {
        throw new Error("type:" + type);
      }
    },

    getLostPoint: function getLostPoint(qrCode) {

      var moduleCount = qrCode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row++) {

        for (var col = 0; col < moduleCount; col++) {

          var sameCount = 0;
          var dark = qrCode.isDark(row, col);

          for (var r = -1; r <= 1; r++) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c++) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrCode.isDark(row + r, col + c)) {
                sameCount++;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += 3 + sameCount - 5;
          }
        }
      }

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row++) {
        for (var col = 0; col < moduleCount - 1; col++) {
          var count = 0;
          if (qrCode.isDark(row, col)) count++;
          if (qrCode.isDark(row + 1, col)) count++;
          if (qrCode.isDark(row, col + 1)) count++;
          if (qrCode.isDark(row + 1, col + 1)) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount - 6; col++) {
          if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row, col + 1) &&
          qrCode.isDark(row, col + 2) &&
          qrCode.isDark(row, col + 3) &&
          qrCode.isDark(row, col + 4) &&
          !qrCode.isDark(row, col + 5) &&
          qrCode.isDark(row, col + 6)) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount - 6; row++) {
          if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row + 1, col) &&
          qrCode.isDark(row + 2, col) &&
          qrCode.isDark(row + 3, col) &&
          qrCode.isDark(row + 4, col) &&
          !qrCode.isDark(row + 5, col) &&
          qrCode.isDark(row + 6, col)) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount; row++) {
          if (qrCode.isDark(row, col)) {
            darkCount++;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    } };




  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = {

    glog: function glog(n) {

      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }

      return QRMath.LOG_TABLE[n];
    },

    gexp: function gexp(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return QRMath.EXP_TABLE[n];
    },

    EXP_TABLE: new Array(256),

    LOG_TABLE: new Array(256) };



  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^
    QRMath.EXP_TABLE[i - 5] ^
    QRMath.EXP_TABLE[i - 6] ^
    QRMath.EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }

  //---------------------------------------------------------------------
  // QRPolynomial
  //---------------------------------------------------------------------

  function QRPolynomial(num, shift) {

    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }

    var offset = 0;

    while (offset < num.length && num[offset] == 0) {
      offset++;
    }

    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }

  QRPolynomial.prototype = {

    get: function get(index) {
      return this.num[index];
    },

    getLength: function getLength() {
      return this.num.length;
    },

    multiply: function multiply(e) {

      var num = new Array(this.getLength() + e.getLength() - 1);

      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }

      return new QRPolynomial(num, 0);
    },

    mod: function mod(e) {

      if (this.getLength() - e.getLength() < 0) {
        return this;
      }

      var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));

      var num = new Array(this.getLength());

      for (var i = 0; i < this.getLength(); i++) {
        num[i] = this.get(i);
      }

      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }

      // recursive call
      return new QRPolynomial(num, 0).mod(e);
    } };


  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }

  QRRSBlock.RS_BLOCK_TABLE = [

  // L
  // M
  // Q
  // H

  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4		
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7		
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10		
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]];


  QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {

    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }

    var length = rsBlock.length / 3;

    var list = new Array();

    for (var i = 0; i < length; i++) {

      var count = rsBlock[i * 3 + 0];
      var totalCount = rsBlock[i * 3 + 1];
      var dataCount = rsBlock[i * 3 + 2];

      for (var j = 0; j < count; j++) {
        list.push(new QRRSBlock(totalCount, dataCount));
      }
    }

    return list;
  };

  QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {

    switch (errorCorrectLevel) {
      case QRErrorCorrectLevel.L:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectLevel.M:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectLevel.Q:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectLevel.H:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return undefined;}

  };

  //---------------------------------------------------------------------
  // QRBitBuffer
  //---------------------------------------------------------------------

  function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
  }

  QRBitBuffer.prototype = {

    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
    },

    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit((num >>> length - i - 1 & 1) == 1);
      }
    },

    getLengthInBits: function getLengthInBits() {
      return this.length;
    },

    putBit: function putBit(bit) {

      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }

      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }

      this.length++;
    } };


  //---------------------------------------------------------------------
  // Support Chinese
  //---------------------------------------------------------------------
  function utf16To8(text) {
    var result = '';
    var c;
    for (var i = 0; i < text.length; i++) {
      c = text.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007F) {
        result += text.charAt(i);
      } else if (c > 0x07FF) {
        result += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
        result += String.fromCharCode(0x80 | c >> 6 & 0x3F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      } else {
        result += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      }
    }
    return result;
  }

  uQRCode = {

    defaults: {
      size: 258,
      margin: 0,
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      fileType: 'png', // 'jpg', 'png'
      correctLevel: 3,
      typeNumber: -1 },


    make: function make(options) {
      var defaultOptions = {
        canvasId: options.canvasId,
        componentInstance: options.componentInstance,
        text: options.text,
        size: this.defaults.size,
        margin: this.defaults.margin,
        backgroundColor: this.defaults.backgroundColor,
        foregroundColor: this.defaults.foregroundColor,
        fileType: this.defaults.fileType,
        correctLevel: this.defaults.correctLevel,
        typeNumber: this.defaults.typeNumber };

      if (options) {
        for (var i in options) {
          defaultOptions[i] = options[i];
        }
      }
      options = defaultOptions;
      if (!options.canvasId) {
        console.error('uQRCode: Please set canvasId!');
        return;
      }

      function createCanvas() {
        var qrcode = new QRCode(options.typeNumber, options.correctLevel);
        qrcode.addData(utf16To8(options.text));
        qrcode.make();

        var ctx = uni.createCanvasContext(options.canvasId, options.componentInstance);
        ctx.setFillStyle(options.backgroundColor);
        ctx.fillRect(0, 0, options.size, options.size);

        var tileW = (options.size - options.margin * 2) / qrcode.getModuleCount();
        var tileH = tileW;

        for (var row = 0; row < qrcode.getModuleCount(); row++) {
          for (var col = 0; col < qrcode.getModuleCount(); col++) {
            var style = qrcode.isDark(row, col) ? options.foregroundColor : options.backgroundColor;
            ctx.setFillStyle(style);
            var x = Math.round(col * tileW) + options.margin;
            var y = Math.round(row * tileH) + options.margin;
            var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
            var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
            ctx.fillRect(x, y, w, h);
          }
        }

        setTimeout(function () {
          ctx.draw(false, function () {
            setTimeout(function () {
              uni.canvasToTempFilePath({
                canvasId: options.canvasId,
                fileType: options.fileType,
                width: options.size,
                height: options.size,
                destWidth: options.size,
                destHeight: options.size,
                success: function success(res) {
                  options.success && options.success(res.tempFilePath);
                },
                fail: function fail(error) {
                  options.fail && options.fail(error);
                },
                complete: function complete(res) {
                  options.complete && options.complete(res);
                } },
              options.componentInstance);
            }, options.text.length + 100);
          });
        }, 150);
      }

      createCanvas();
    } };



})();var _default =

uQRCode;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!*************************************!*\
  !*** D:/资料/程序资料/黔诺康/common/util.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  getRandStr: getRandStr, //生成随机字符串
  md5: md5, //MD5加密
  checkMobile: checkMobile, //检测手机号的合法性
  getDate: getDate, //获取当前日期
  urlToarray: urlCut, //url转对象
  isLogin: isLogin, //登录状态判断
  filteremoji: filteremoji, //微信昵称特殊字符过滤
  clearData: clearData, //清理缓存
  logout: logout, //退出登录，
  upImage: upImage, //图片上传
  parseParam: parseParam,
  alert: alert,
  success: success,
  error: error,
  getUser: getUser,
  navback: navback, //返回上一层
  showloading: showloading,
  openImg: openImg, //图片预览
  hideMobile: hideMobile, //隐藏电话号码
  getNum: getNum, //生成随机整数
  setPage: setPage, //页面设置
  getPage: getPage, //获取页面对象
  clearHtml: clearHtml, //清理html字符
  getToTime: getToTime, //根据指定时间获取剩余时间数量
  isUpdate: isUpdate, //是否需要升级
  downStart: downStart, //缓存图片到本地
  getWeek: getWeek, //获取指定日期的星期
  getTime: getTime, //获取当前时间
  getJiaJian: getJiaJian, //小数的加减,
  formatdate: formatdate, //时间戳格式化
  inputReplace: inputReplace, //输入空格过滤
  replaceStr: replaceStr //字符串替换
};

/**
    * 字符串替换
    * @param str
    * @param rep
    * @param repl
    * @returns {void | string | never}
    */
function replaceStr(str, rep, repl) {
  if (str == undefined || str == null || typeof str == 'boolean' || str == '' || str.toString().length < 1) {
    return '';
  }
  var reg = new RegExp(rep, "g");
  var res = str.replace(reg, repl);
  return res;
}

/**
   * 输入空格过滤
   * @param {String} str 
   **/
function inputReplace(str) {
  if (str == undefined || str == null || typeof str == 'boolean' || str == '' || str.toString().length < 1) {
    return '';
  }
  var newstr = str && str != '' ? str.toString().replace(/\s*/g, "") : '';
  return newstr;
}

/**
   * 比较版本大小，如果新版本nv大于旧版本ov则返回true，否则返回false
   * @param {String} ov
   * @param {String} nv
   * @return {Boolean}
   */
function isUpdate(ov, nv) {
  if (!ov || !nv || ov == "" || nv == "") {
    return false;
  }
  var b = false,
  ova = ov.replace("V", "").replace("v", "").replace(" ", '').split(".", 4),
  nva = nv.replace("V", "").replace("v", "").replace(" ", '').split(".", 4);
  for (var i = 0; i < ova.length && i < nva.length; i++) {
    var so = ova[i],
    no = parseInt(so),
    sn = nva[i],
    nn = parseInt(sn);
    if (nn > no || sn.length > so.length) {
      return true;
    } else if (nn < no) {
      return false;
    }
  }
  if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
    return true;
  } else {
    return false;
  }
}

/**
   * 获取相差时间数据<br>
   * --param starttime 开始时间<br>
   * --param endtime 结束时间
   */
function getToTime(starttime, endtime) {
  var start_date = starttime ? new Date(starttime.replace(/-/g, "/")) : new Date();
  var end_date = new Date(endtime.replace(/-/g, "/"));
  var date = end_date.getTime() - start_date.getTime(); //时间差的毫秒数
  //计算出相差天数
  var days = Math.floor(date / (24 * 3600 * 1000)) < 0 ? 0 : Math.floor(date / (24 * 3600 * 1000));
  //计算出小时数
  var leave1 = date % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000)) < 0 ? 0 : Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000)) < 0 ? 0 : Math.floor(leave2 / (60 * 1000));
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000) < 0 ? 0 : Math.round(leave3 / 1000);
  //两个时间相差数量是否大于1秒钟
  var isnow = true;
  if (days < 1 && hours < 1 && minutes < 1 && seconds < 1) {
    isnow = false;
  }
  return {
    d: days <= 9 ? '0' + days : days,
    h: hours <= 9 ? '0' + hours : hours,
    m: minutes <= 9 ? '0' + minutes : minutes,
    s: seconds <= 9 ? '0' + seconds : seconds,
    gt: isnow };

}

/**
   * 获取页面对象
   */
function getPage(field) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var currentWebview = page.$getAppWebview();
  var obj = currentWebview.getStyle();
  if (field) {
    return obj[field];
  } else {
    return obj;
  }
}

/**
   * 页面设置
   * --param {titleNView:{titleText:'text'}}
   */
function setPage(param) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var currentWebview = page.$getAppWebview();
  // 	currentWebview.setStyle({
  // 		titleNView: {
  // 			titleText: "test",
  // 		},
  // 	});
  currentWebview.setStyle(param);
}

/**
   * 生成随机整数<br>
   * --param minNum<br>
   * --param maxNum
   */
function getNum(minNum, maxNum) {
  var num = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
  if (num < 0) {
    return getNum(minNum, maxNum);
  } else {
    return num;
  }
}

/**
   * 电话号码隐藏<br>
   * -- param 电话号码
   */
function hideMobile(phone) {
  if (phone != undefined && phone.length < 1) {
    return "";
  }
  var mobile = "";
  var phonestr = phone + "";
  if (checkMobile(phonestr)) {
    mobile = phonestr.substr(0, 3) + "****" + phonestr.substr(7, phonestr.length);
  } else {
    mobile = phonestr.substr(0, 4) + "****";
  }
  return mobile;
}

/**
   * 预览图片<br>
   * -- param urls 图片列表<br>
   * -- param id 显示第几张图片
   */
function openImg(urls, id) {
  var index = id != undefined && id >= 0 ? id : 0;
  uni.previewImage({
    urls: urls,
    current: urls[id],
    indicator: 'number' });

}
/**
   * 加载窗口
   */
function showloading(msg, mask) {
  uni.showLoading({
    title: msg ? msg : "加载中...",
    mask: mask == undefined ? true : mask });

}

/**
   * 返回页面<br>
   * param:<br>
   * 		time 延时时间（秒）<br>
   * 		delta 返回页面数<br>
   * return: void;
   */
function navback(time, delta) {
  var timeNum = parseInt(time) > 1000 ? time : parseInt(time) * 1000;
  //延时执行
  if (time != undefined && parseInt(time) > 0) {
    setTimeout(function () {
      uni.navigateBack({
        delta: delta != undefined ? delta : 1 });

    }, timeNum);
    return;
  }
  //立即执行
  uni.navigateBack({
    delta: delta != undefined ? delta : 1 });

}

/**
   * 获取已经登录的用户信息<br>
   * param:<br>
   * 		field 需要返回的字段<br>
   * return:<br>
   * 		String<br> 
   * 		Object
   */
function getUser(field) {
  var User = uni.getStorageSync("user");
  if (User == "" || typeof User != 'object') {
    return 0;
  }
  if (field != undefined) {
    return User[field];
  } else {
    return User;
  }
}

/**
   * 成功提示<br>
   * title 提示信息<br>
   * callback 回调函数<br>
   * 显示时间：1000毫秒
   */
function success(title, callback) {
  uni.showToast({
    icon: "success",
    mask: true,
    title: title,
    duration: 1000,
    success: function success() {
      if (typeof callback == 'function') {
        setTimeout(function () {
          callback();
        }, 1000);
      }
    } });

}

/**
   * 错误提示<br>
   * msg 提示信息<br>
   * callback 回调函数<br>
   * 显示时间：2000毫秒
   */
function error(msg, callback) {
  uni.showToast({
    icon: "none",
    title: msg,
    duration: 2000,
    success: function success() {
      if (typeof callback == 'function') {
        setTimeout(function () {
          callback();
        }, 1000);
      }
    } });

}



/**
   * 提示窗口
   */
function alert(msg, callback) {
  uni.showModal({
    title: "提示",
    content: msg,
    success: function success(re) {
      if (typeof callback == 'function' && re.confirm) {
        callback(re);
        return;
      }
    } });

}

/**
   * 生成随机数<br>
   * len 生成的字符串长度
   */
function getRandStr(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

/**
   * 图片上传
   */
function upImage(num, params, callback) {
  var number = num > 0 ? num : 1;
  var param = params != null && typeof params == 'object' ? params : new Object();
  if (param.id == undefined) {
    param.id = this.getUser("id");
  }
  uni.chooseImage({
    count: number,
    sizeType: ["compressed"],
    success: function success(chooseImageRes) {
      uni.showLoading({
        title: "请稍后....",
        mask: true });

      var tempFilePaths = chooseImageRes.tempFilePaths;
      //console.log(JSON.stringify(tempFilePaths));
      if (tempFilePaths == undefined || tempFilePaths == "") {
        uni.showToast({
          title: "选择的图片无效！",
          icon: "none" });

        return;
      }
      //加密
      param.Number = num;
      param.Time = Date.parse(new Date());
      param.AppId = AppId;
      //过滤空格参数
      for (var i in param) {
        var str = param[i] + "";
        param[i] = str.replace(/\s+/g, '');
      }
      delete param.Token;
      /* var Token = sign(param); */
      var Token = md5(JSON.stringify(param));
      //参数增加和删除
      delete param.AppId;
      param.Token = Token;
      var files = [];
      for (var i = 0; i < tempFilePaths.length; i++) {
        var item = {
          uri: tempFilePaths[i],
          name: "f_" + i };

        files.push(item);
      }
      //上传
      var uploadTask = uni.uploadFile({
        url: ApiServer + "/api/Upload/img_fid",
        filePath: tempFilePaths[0],
        name: 'file',
        /* files: files, */
        formData: param,
        success: function success(uploadFileRes) {
          console.log(uploadFileRes);
          if (uploadFileRes.statusCode != 200) {
            uni.hideLoading();
            uni.showToast({
              title: "文件上传失败！",
              icon: "none" });

            return;
          }
          callback(uploadFileRes.data);
        },
        fail: function fail(e) {
          console.log(JSON.stringify(e));
          uni.hideLoading();
          uni.showToast({
            title: "文件上传失败！",
            icon: "none" });

        } });

    } });

}

/**
   * 判断登录状态
   */
function isLogin(is) {
  var UserInfo = uni.getStorageSync('user');
  if (UserInfo == undefined || UserInfo == '' || UserInfo.userId == undefined || UserInfo.userId < 1) {
    return false;
  } else {
    return true;
  }
}

/**
   * 清理本地缓存
   */
function clearData() {
  if (isLogin()) {
    uni.getStorage({
      key: "UserInfo",
      success: function success(data) {
        uni.clearStorageSync();
        uni.setStorageSync("UserInfo", data.data);
        uni.showToast({
          title: "缓存清理完成!" });

      },
      fail: function fail(e) {
        uni.showToast({
          title: "出现了点小状况~！",
          icon: "none" });

      } });

  } else {
    try {
      uni.clearStorageSync();
      uni.showToast({
        title: "缓存清理完成!" });

    } catch (e) {
      uni.showToast({
        title: "出现了点小状况~！",
        icon: "none" });

    }
  }

}

/**
   * 退出登录
   */
function logout() {
  try {
    uni.removeStorageSync("user");
    return true;
  } catch (e) {
    return false;
  }
}

/**
   * URL转对象
   * 用于提取url中的参数
   */
function urlCut(url) {
  var strlen = url.indexOf("?");
  if (strlen != -1) {
    var urlstr = url.substr(strlen + 1);
  } else {
    var urlstr = url.substr(1);
  }
  //拆分key value
  var arr = urlstr.split('&');
  var obj = new Object();
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i].split('=');
    obj[item[0]] = item[1];
  }
  return obj;
}

/**
   * 获取当前日期 YYYY-MM-DD
   */
function getDate(nowdate) {
  var date = nowdate ? nowdate : new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

/**
   * 获取当前时间 H:i:s
   */
function getTime() {
  var date = new Date();
  var seperator = ":";
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  function getLen(str) {
    if (str.length < 2) {
      return '0' + str;
    } else {
      return str;
    }
  }
  var currtime = getLen(hours) + seperator + getLen(minutes) + seperator + getLen(seconds);
  return currtime;
}

/**
   * 获取当前星期
   */
function getWeek(nowdate) {
  var date = nowdate ? nowdate : new Date();
  var weekday = ["周 日", "周 一", "周 二", "周 三", "周 四", "周 五", "周 六"];
  return weekday[date.getDay()];
}

/**
   * 手机号验证
   */
function checkMobile(mobile) {
  if (mobile == '' || mobile == undefined) {
    return false;
  }
  if (mobile.toString().length != 11) {
    return false;
  }
  if (!/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(mobile)) {
    return false;
  } else {
    return true;
  }
}
/**
   * 清理html字符
   */
function clearHtml(stri) {
  if (stri == undefined || stri == '') {
    return '';
  }
  var str = stri.replace(/<[^>]*>|<\/[^>]*>/gm, "");
  return str;
}
/**
   * 获取通信秘钥
   */
function sign(Obj) {var isMd5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var str = parseParam(Obj).replace(" ", ""); //对象先转成URL参数
  var arr = str.split('&'); //拆分参数
  var param = new Array(); //拆分成数组后存放结果
  var keys = new Array(); //排序规则
  for (var i = 0; i < arr.length; i++) {
    var res = arr[i].split('=');
    //处理多个==情况
    var val = "";
    for (var s = 1; s < res.length; s++) {
      if (res[s] != undefined && res[s] == "") {
        val += "=";
      } else {
        val += res[s];
      }
    }
    param[res[0]] = val;
    keys.push(res[0]);
  }
  //排序
  var res = keys.sort();
  //赋值，重新生成数据
  var newArray = new Array();
  for (var i = 0; i < res.length; i++) {
    newArray[res[i]] = param[res[i]];
  }
  //生成加密字符串
  return isMd5 == true ? md5(parseParam(newArray)) : parseParam(newArray);
}

/**
   * JSON对象生成URL
   */
function parseParam(param, key, encode) {var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  if (param == null) return '';
  var paramStr = '';
  var t = typeof param;
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + param;
    // paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURI(encodeURI(param)) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += parseParam(param[i], k, encode, i);
    }
  }
  if (n == 0) {
    return paramStr.substr(1);
  } else {
    return paramStr;
  }
};


/**
    * MD5加密
    * @param string
    * @returns {string}
    */
function md5(string) {

  var rotateLeft = function rotateLeft(lValue, iShiftBits) {
    return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
  };
  var addUnsigned = function addUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = lX & 0x80000000;
    lY8 = lY & 0x80000000;
    lX4 = lX & 0x40000000;
    lY4 = lY & 0x40000000;
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return lResult ^ 0xC0000000 ^ lX8 ^ lY8;else
      return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    } else {
      return lResult ^ lX8 ^ lY8;
    }
  };
  var F = function F(x, y, z) {
    return x & y | ~x & z;
  };
  var G = function G(x, y, z) {
    return x & z | y & ~z;
  };
  var H = function H(x, y, z) {
    return x ^ y ^ z;
  };
  var I = function I(x, y, z) {
    return y ^ (x | ~z);
  };
  var FF = function FF(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  var GG = function GG(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  var HH = function HH(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  var II = function II(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };
  var convertToWordArray = function convertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWordsTempOne = lMessageLength + 8;
    var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - lNumberOfWordsTempOne % 64) / 64;
    var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - lByteCount % 4) / 4;
      lBytePosition = lByteCount % 4 * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
      lByteCount++;
    }
    lWordCount = (lByteCount - lByteCount % 4) / 4;
    lBytePosition = lByteCount % 4 * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | 0x80 << lBytePosition;
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  };
  var wordToHex = function wordToHex(lValue) {
    var WordToHexValue = "",
    WordToHexValueTemp = "",
    lByte,lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = lValue >>> lCount * 8 & 255;
      WordToHexValueTemp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
    }
    return WordToHexValue;
  };
  var uTF8Encode = function uTF8Encode(string) {
    string = string.replace(/\x0d\x0a/g, "\x0a");
    var output = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        output += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        output += String.fromCharCode(c >> 6 | 192);
        output += String.fromCharCode(c & 63 | 128);
      } else {
        output += String.fromCharCode(c >> 12 | 224);
        output += String.fromCharCode(c >> 6 & 63 | 128);
        output += String.fromCharCode(c & 63 | 128);
      }
    }
    return output;
  };

  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7,
  S12 = 12,
  S13 = 17,
  S14 = 22;
  var S21 = 5,
  S22 = 9,
  S23 = 14,
  S24 = 20;
  var S31 = 4,
  S32 = 11,
  S33 = 16,
  S34 = 23;
  var S41 = 6,
  S42 = 10,
  S43 = 15,
  S44 = 21;
  string = uTF8Encode(string);
  x = convertToWordArray(string);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;
  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }
  var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
  return tempValue.toLowerCase();

}

/**
   * 微信昵称过滤emoji
   */
var filteremoji = function filteremoji(str) {

  //测试表情
  // console.log(escape(str));
  //escape得到%uD83C%u.........格式的编码，可对应成\u...格式

  var regStr =
  /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
  if (regStr.test(str)) {
    return str.replace(regStr, "");
  } else {
    return str;
  }
};

function getDirInfo(path) {

}

/**
   * 创建下载任务
   */
function downStart(downurl, name, ext) {
  //检查是否存在文件后缀名
  var names = ['jpg', 'jpeg', 'png', 'gif'];
  if (names.indexOf(ext) <= 0) {
    var filename = (name + '.png').replace('..', '.');
  } else {
    var filename = (name + '.' + ext).replace('..', '.');
  }
  var dtask = plus.downloader.createDownload(downurl, {
    'filename': '_doc/cachefile/' + filename },
  function (d, status) {
    // 下载完成
    if (status == 200) {
      //删除原来的文件
      console.log('图片缓存完成：' + d.filename);
      plus.storage.setItem(name, d.filename);
    } else {
      console.log("下载失败：" + status + ",文件地址：" + downurl);
    }
  }, function (e) {
    console.log(JSON.stringify(e));
  });
  dtask.start();
}

function getJiaJian(type, num1, num2) {
  var temp1, temp2, a;
  try {
    // 获取temp1小数点后的长度
    temp1 = num1.toString().split(".")[1].length;
  } catch (e) {
    temp1 = 0;
  }
  try {
    // 获取temp2小数点后的长度
    temp2 = num2.toString().split(".")[1].length;
  } catch (e) {
    temp2 = 0;
  }
  // Math.max(temp1, temp2) 为了获取temp1和temp2两个值中较大的一个
  // Math.pow(a,b) 表示 a 的 b 次方
  a = Math.pow(10, Math.max(temp1, temp2));

  // 计算的方式是先将所有的小数乘为整数，待加减运算执行完之后再除去对应的 a 的值，将其变为小数输出
  // 先判断执行的方式是否是加法，不是的话则执行减法运算
  var he = type == "add" ? (num1 * a + num2 * a) / a : (num1 * a - num2 * a) / a;
  return Math.round(he * 100) / 100;
}

/** 
   * 时间戳格式化函数 
   * @param {string} format 格式 
   * @param {int} timestamp 要格式化的时间 默认为当前时间 
   */
function formatdate(number, format) {
  if (!format) {
    format = 'Y/M/D h:m:s';
  }
  if (!number || number == '') {
    return '';
  }
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }

  //数据转化  
  function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }
  return format;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 247:
/*!**********************************************************************!*\
  !*** D:/资料/程序资料/黔诺康/components/simple-address/city-data/province.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "label": "北京市",
  "value": "11" },

{
  "label": "天津市",
  "value": "12" },

{
  "label": "河北省",
  "value": "13" },

{
  "label": "山西省",
  "value": "14" },

{
  "label": "内蒙古自治区",
  "value": "15" },

{
  "label": "辽宁省",
  "value": "21" },

{
  "label": "吉林省",
  "value": "22" },

{
  "label": "黑龙江省",
  "value": "23" },

{
  "label": "上海市",
  "value": "31" },

{
  "label": "江苏省",
  "value": "32" },

{
  "label": "浙江省",
  "value": "33" },

{
  "label": "安徽省",
  "value": "34" },

{
  "label": "福建省",
  "value": "35" },

{
  "label": "江西省",
  "value": "36" },

{
  "label": "山东省",
  "value": "37" },

{
  "label": "河南省",
  "value": "41" },

{
  "label": "湖北省",
  "value": "42" },

{
  "label": "湖南省",
  "value": "43" },

{
  "label": "广东省",
  "value": "44" },

{
  "label": "广西壮族自治区",
  "value": "45" },

{
  "label": "海南省",
  "value": "46" },

{
  "label": "重庆市",
  "value": "50" },

{
  "label": "四川省",
  "value": "51" },

{
  "label": "贵州省",
  "value": "52" },

{
  "label": "云南省",
  "value": "53" },

{
  "label": "西藏自治区",
  "value": "54" },

{
  "label": "陕西省",
  "value": "61" },

{
  "label": "甘肃省",
  "value": "62" },

{
  "label": "青海省",
  "value": "63" },

{
  "label": "宁夏回族自治区",
  "value": "64" },

{
  "label": "新疆维吾尔自治区",
  "value": "65" },

{
  "label": "台湾",
  "value": "66" },

{
  "label": "香港",
  "value": "67" },

{
  "label": "澳门",
  "value": "68" },

{
  "label": "钓鱼岛",
  "value": "69" }];var _default =


provinceData;exports.default = _default;

/***/ }),

/***/ 248:
/*!******************************************************************!*\
  !*** D:/资料/程序资料/黔诺康/components/simple-address/city-data/city.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var cityData = [
[{
  "label": "市辖区",
  "value": "1101" }],

[{
  "label": "市辖区",
  "value": "1201" }],

[{
  "label": "石家庄市",
  "value": "1301" },

{
  "label": "唐山市",
  "value": "1302" },

{
  "label": "秦皇岛市",
  "value": "1303" },

{
  "label": "邯郸市",
  "value": "1304" },

{
  "label": "邢台市",
  "value": "1305" },

{
  "label": "保定市",
  "value": "1306" },

{
  "label": "张家口市",
  "value": "1307" },

{
  "label": "承德市",
  "value": "1308" },

{
  "label": "沧州市",
  "value": "1309" },

{
  "label": "廊坊市",
  "value": "1310" },

{
  "label": "衡水市",
  "value": "1311" }],


[{
  "label": "太原市",
  "value": "1401" },

{
  "label": "大同市",
  "value": "1402" },

{
  "label": "阳泉市",
  "value": "1403" },

{
  "label": "长治市",
  "value": "1404" },

{
  "label": "晋城市",
  "value": "1405" },

{
  "label": "朔州市",
  "value": "1406" },

{
  "label": "晋中市",
  "value": "1407" },

{
  "label": "运城市",
  "value": "1408" },

{
  "label": "忻州市",
  "value": "1409" },

{
  "label": "临汾市",
  "value": "1410" },

{
  "label": "吕梁市",
  "value": "1411" }],


[{
  "label": "呼和浩特市",
  "value": "1501" },

{
  "label": "包头市",
  "value": "1502" },

{
  "label": "乌海市",
  "value": "1503" },

{
  "label": "赤峰市",
  "value": "1504" },

{
  "label": "通辽市",
  "value": "1505" },

{
  "label": "鄂尔多斯市",
  "value": "1506" },

{
  "label": "呼伦贝尔市",
  "value": "1507" },

{
  "label": "巴彦淖尔市",
  "value": "1508" },

{
  "label": "乌兰察布市",
  "value": "1509" },

{
  "label": "兴安盟",
  "value": "1522" },

{
  "label": "锡林郭勒盟",
  "value": "1525" },

{
  "label": "阿拉善盟",
  "value": "1529" }],


[{
  "label": "沈阳市",
  "value": "2101" },

{
  "label": "大连市",
  "value": "2102" },

{
  "label": "鞍山市",
  "value": "2103" },

{
  "label": "抚顺市",
  "value": "2104" },

{
  "label": "本溪市",
  "value": "2105" },

{
  "label": "丹东市",
  "value": "2106" },

{
  "label": "锦州市",
  "value": "2107" },

{
  "label": "营口市",
  "value": "2108" },

{
  "label": "阜新市",
  "value": "2109" },

{
  "label": "辽阳市",
  "value": "2110" },

{
  "label": "盘锦市",
  "value": "2111" },

{
  "label": "铁岭市",
  "value": "2112" },

{
  "label": "朝阳市",
  "value": "2113" },

{
  "label": "葫芦岛市",
  "value": "2114" }],


[{
  "label": "长春市",
  "value": "2201" },

{
  "label": "吉林市",
  "value": "2202" },

{
  "label": "四平市",
  "value": "2203" },

{
  "label": "辽源市",
  "value": "2204" },

{
  "label": "通化市",
  "value": "2205" },

{
  "label": "白山市",
  "value": "2206" },

{
  "label": "松原市",
  "value": "2207" },

{
  "label": "白城市",
  "value": "2208" },

{
  "label": "延边朝鲜族自治州",
  "value": "2224" }],


[{
  "label": "哈尔滨市",
  "value": "2301" },

{
  "label": "齐齐哈尔市",
  "value": "2302" },

{
  "label": "鸡西市",
  "value": "2303" },

{
  "label": "鹤岗市",
  "value": "2304" },

{
  "label": "双鸭山市",
  "value": "2305" },

{
  "label": "大庆市",
  "value": "2306" },

{
  "label": "伊春市",
  "value": "2307" },

{
  "label": "佳木斯市",
  "value": "2308" },

{
  "label": "七台河市",
  "value": "2309" },

{
  "label": "牡丹江市",
  "value": "2310" },

{
  "label": "黑河市",
  "value": "2311" },

{
  "label": "绥化市",
  "value": "2312" },

{
  "label": "大兴安岭地区",
  "value": "2327" }],


[{
  "label": "市辖区",
  "value": "3101" }],

[{
  "label": "南京市",
  "value": "3201" },

{
  "label": "无锡市",
  "value": "3202" },

{
  "label": "徐州市",
  "value": "3203" },

{
  "label": "常州市",
  "value": "3204" },

{
  "label": "苏州市",
  "value": "3205" },

{
  "label": "南通市",
  "value": "3206" },

{
  "label": "连云港市",
  "value": "3207" },

{
  "label": "淮安市",
  "value": "3208" },

{
  "label": "盐城市",
  "value": "3209" },

{
  "label": "扬州市",
  "value": "3210" },

{
  "label": "镇江市",
  "value": "3211" },

{
  "label": "泰州市",
  "value": "3212" },

{
  "label": "宿迁市",
  "value": "3213" }],


[{
  "label": "杭州市",
  "value": "3301" },

{
  "label": "宁波市",
  "value": "3302" },

{
  "label": "温州市",
  "value": "3303" },

{
  "label": "嘉兴市",
  "value": "3304" },

{
  "label": "湖州市",
  "value": "3305" },

{
  "label": "绍兴市",
  "value": "3306" },

{
  "label": "金华市",
  "value": "3307" },

{
  "label": "衢州市",
  "value": "3308" },

{
  "label": "舟山市",
  "value": "3309" },

{
  "label": "台州市",
  "value": "3310" },

{
  "label": "丽水市",
  "value": "3311" }],


[{
  "label": "合肥市",
  "value": "3401" },

{
  "label": "芜湖市",
  "value": "3402" },

{
  "label": "蚌埠市",
  "value": "3403" },

{
  "label": "淮南市",
  "value": "3404" },

{
  "label": "马鞍山市",
  "value": "3405" },

{
  "label": "淮北市",
  "value": "3406" },

{
  "label": "铜陵市",
  "value": "3407" },

{
  "label": "安庆市",
  "value": "3408" },

{
  "label": "黄山市",
  "value": "3410" },

{
  "label": "滁州市",
  "value": "3411" },

{
  "label": "阜阳市",
  "value": "3412" },

{
  "label": "宿州市",
  "value": "3413" },

{
  "label": "六安市",
  "value": "3415" },

{
  "label": "亳州市",
  "value": "3416" },

{
  "label": "池州市",
  "value": "3417" },

{
  "label": "宣城市",
  "value": "3418" }],


[{
  "label": "福州市",
  "value": "3501" },

{
  "label": "厦门市",
  "value": "3502" },

{
  "label": "莆田市",
  "value": "3503" },

{
  "label": "三明市",
  "value": "3504" },

{
  "label": "泉州市",
  "value": "3505" },

{
  "label": "漳州市",
  "value": "3506" },

{
  "label": "南平市",
  "value": "3507" },

{
  "label": "龙岩市",
  "value": "3508" },

{
  "label": "宁德市",
  "value": "3509" }],


[{
  "label": "南昌市",
  "value": "3601" },

{
  "label": "景德镇市",
  "value": "3602" },

{
  "label": "萍乡市",
  "value": "3603" },

{
  "label": "九江市",
  "value": "3604" },

{
  "label": "新余市",
  "value": "3605" },

{
  "label": "鹰潭市",
  "value": "3606" },

{
  "label": "赣州市",
  "value": "3607" },

{
  "label": "吉安市",
  "value": "3608" },

{
  "label": "宜春市",
  "value": "3609" },

{
  "label": "抚州市",
  "value": "3610" },

{
  "label": "上饶市",
  "value": "3611" }],


[{
  "label": "济南市",
  "value": "3701" },

{
  "label": "青岛市",
  "value": "3702" },

{
  "label": "淄博市",
  "value": "3703" },

{
  "label": "枣庄市",
  "value": "3704" },

{
  "label": "东营市",
  "value": "3705" },

{
  "label": "烟台市",
  "value": "3706" },

{
  "label": "潍坊市",
  "value": "3707" },

{
  "label": "济宁市",
  "value": "3708" },

{
  "label": "泰安市",
  "value": "3709" },

{
  "label": "威海市",
  "value": "3710" },

{
  "label": "日照市",
  "value": "3711" },

{
  "label": "莱芜市",
  "value": "3712" },

{
  "label": "临沂市",
  "value": "3713" },

{
  "label": "德州市",
  "value": "3714" },

{
  "label": "聊城市",
  "value": "3715" },

{
  "label": "滨州市",
  "value": "3716" },

{
  "label": "菏泽市",
  "value": "3717" }],


[{
  "label": "郑州市",
  "value": "4101" },

{
  "label": "开封市",
  "value": "4102" },

{
  "label": "洛阳市",
  "value": "4103" },

{
  "label": "平顶山市",
  "value": "4104" },

{
  "label": "安阳市",
  "value": "4105" },

{
  "label": "鹤壁市",
  "value": "4106" },

{
  "label": "新乡市",
  "value": "4107" },

{
  "label": "焦作市",
  "value": "4108" },

{
  "label": "濮阳市",
  "value": "4109" },

{
  "label": "许昌市",
  "value": "4110" },

{
  "label": "漯河市",
  "value": "4111" },

{
  "label": "三门峡市",
  "value": "4112" },

{
  "label": "南阳市",
  "value": "4113" },

{
  "label": "商丘市",
  "value": "4114" },

{
  "label": "信阳市",
  "value": "4115" },

{
  "label": "周口市",
  "value": "4116" },

{
  "label": "驻马店市",
  "value": "4117" },

{
  "label": "省直辖县级行政区划",
  "value": "4190" }],


[{
  "label": "武汉市",
  "value": "4201" },

{
  "label": "黄石市",
  "value": "4202" },

{
  "label": "十堰市",
  "value": "4203" },

{
  "label": "宜昌市",
  "value": "4205" },

{
  "label": "襄阳市",
  "value": "4206" },

{
  "label": "鄂州市",
  "value": "4207" },

{
  "label": "荆门市",
  "value": "4208" },

{
  "label": "孝感市",
  "value": "4209" },

{
  "label": "荆州市",
  "value": "4210" },

{
  "label": "黄冈市",
  "value": "4211" },

{
  "label": "咸宁市",
  "value": "4212" },

{
  "label": "随州市",
  "value": "4213" },

{
  "label": "恩施土家族苗族自治州",
  "value": "4228" },

{
  "label": "省直辖县级行政区划",
  "value": "4290" }],


[{
  "label": "长沙市",
  "value": "4301" },

{
  "label": "株洲市",
  "value": "4302" },

{
  "label": "湘潭市",
  "value": "4303" },

{
  "label": "衡阳市",
  "value": "4304" },

{
  "label": "邵阳市",
  "value": "4305" },

{
  "label": "岳阳市",
  "value": "4306" },

{
  "label": "常德市",
  "value": "4307" },

{
  "label": "张家界市",
  "value": "4308" },

{
  "label": "益阳市",
  "value": "4309" },

{
  "label": "郴州市",
  "value": "4310" },

{
  "label": "永州市",
  "value": "4311" },

{
  "label": "怀化市",
  "value": "4312" },

{
  "label": "娄底市",
  "value": "4313" },

{
  "label": "湘西土家族苗族自治州",
  "value": "4331" }],


[{
  "label": "广州市",
  "value": "4401" },

{
  "label": "韶关市",
  "value": "4402" },

{
  "label": "深圳市",
  "value": "4403" },

{
  "label": "珠海市",
  "value": "4404" },

{
  "label": "汕头市",
  "value": "4405" },

{
  "label": "佛山市",
  "value": "4406" },

{
  "label": "江门市",
  "value": "4407" },

{
  "label": "湛江市",
  "value": "4408" },

{
  "label": "茂名市",
  "value": "4409" },

{
  "label": "肇庆市",
  "value": "4412" },

{
  "label": "惠州市",
  "value": "4413" },

{
  "label": "梅州市",
  "value": "4414" },

{
  "label": "汕尾市",
  "value": "4415" },

{
  "label": "河源市",
  "value": "4416" },

{
  "label": "阳江市",
  "value": "4417" },

{
  "label": "清远市",
  "value": "4418" },

{
  "label": "东莞市",
  "value": "4419" },

{
  "label": "中山市",
  "value": "4420" },

{
  "label": "潮州市",
  "value": "4451" },

{
  "label": "揭阳市",
  "value": "4452" },

{
  "label": "云浮市",
  "value": "4453" }],


[{
  "label": "南宁市",
  "value": "4501" },

{
  "label": "柳州市",
  "value": "4502" },

{
  "label": "桂林市",
  "value": "4503" },

{
  "label": "梧州市",
  "value": "4504" },

{
  "label": "北海市",
  "value": "4505" },

{
  "label": "防城港市",
  "value": "4506" },

{
  "label": "钦州市",
  "value": "4507" },

{
  "label": "贵港市",
  "value": "4508" },

{
  "label": "玉林市",
  "value": "4509" },

{
  "label": "百色市",
  "value": "4510" },

{
  "label": "贺州市",
  "value": "4511" },

{
  "label": "河池市",
  "value": "4512" },

{
  "label": "来宾市",
  "value": "4513" },

{
  "label": "崇左市",
  "value": "4514" }],


[{
  "label": "海口市",
  "value": "4601" },

{
  "label": "三亚市",
  "value": "4602" },

{
  "label": "三沙市",
  "value": "4603" },

{
  "label": "儋州市",
  "value": "4604" },

{
  "label": "省直辖县级行政区划",
  "value": "4690" }],


[{
  "label": "市辖区",
  "value": "5001" },

{
  "label": "县",
  "value": "5002" }],


[{
  "label": "成都市",
  "value": "5101" },

{
  "label": "自贡市",
  "value": "5103" },

{
  "label": "攀枝花市",
  "value": "5104" },

{
  "label": "泸州市",
  "value": "5105" },

{
  "label": "德阳市",
  "value": "5106" },

{
  "label": "绵阳市",
  "value": "5107" },

{
  "label": "广元市",
  "value": "5108" },

{
  "label": "遂宁市",
  "value": "5109" },

{
  "label": "内江市",
  "value": "5110" },

{
  "label": "乐山市",
  "value": "5111" },

{
  "label": "南充市",
  "value": "5113" },

{
  "label": "眉山市",
  "value": "5114" },

{
  "label": "宜宾市",
  "value": "5115" },

{
  "label": "广安市",
  "value": "5116" },

{
  "label": "达州市",
  "value": "5117" },

{
  "label": "雅安市",
  "value": "5118" },

{
  "label": "巴中市",
  "value": "5119" },

{
  "label": "资阳市",
  "value": "5120" },

{
  "label": "阿坝藏族羌族自治州",
  "value": "5132" },

{
  "label": "甘孜藏族自治州",
  "value": "5133" },

{
  "label": "凉山彝族自治州",
  "value": "5134" }],


[{
  "label": "贵阳市",
  "value": "5201" },

{
  "label": "六盘水市",
  "value": "5202" },

{
  "label": "遵义市",
  "value": "5203" },

{
  "label": "安顺市",
  "value": "5204" },

{
  "label": "毕节市",
  "value": "5205" },

{
  "label": "铜仁市",
  "value": "5206" },

{
  "label": "黔西南布依族苗族自治州",
  "value": "5223" },

{
  "label": "黔东南苗族侗族自治州",
  "value": "5226" },

{
  "label": "黔南布依族苗族自治州",
  "value": "5227" }],


[{
  "label": "昆明市",
  "value": "5301" },

{
  "label": "曲靖市",
  "value": "5303" },

{
  "label": "玉溪市",
  "value": "5304" },

{
  "label": "保山市",
  "value": "5305" },

{
  "label": "昭通市",
  "value": "5306" },

{
  "label": "丽江市",
  "value": "5307" },

{
  "label": "普洱市",
  "value": "5308" },

{
  "label": "临沧市",
  "value": "5309" },

{
  "label": "楚雄彝族自治州",
  "value": "5323" },

{
  "label": "红河哈尼族彝族自治州",
  "value": "5325" },

{
  "label": "文山壮族苗族自治州",
  "value": "5326" },

{
  "label": "西双版纳傣族自治州",
  "value": "5328" },

{
  "label": "大理白族自治州",
  "value": "5329" },

{
  "label": "德宏傣族景颇族自治州",
  "value": "5331" },

{
  "label": "怒江傈僳族自治州",
  "value": "5333" },

{
  "label": "迪庆藏族自治州",
  "value": "5334" }],


[{
  "label": "拉萨市",
  "value": "5401" },

{
  "label": "日喀则市",
  "value": "5402" },

{
  "label": "昌都市",
  "value": "5403" },

{
  "label": "林芝市",
  "value": "5404" },

{
  "label": "山南市",
  "value": "5405" },

{
  "label": "那曲地区",
  "value": "5424" },

{
  "label": "阿里地区",
  "value": "5425" }],


[{
  "label": "西安市",
  "value": "6101" },

{
  "label": "铜川市",
  "value": "6102" },

{
  "label": "宝鸡市",
  "value": "6103" },

{
  "label": "咸阳市",
  "value": "6104" },

{
  "label": "渭南市",
  "value": "6105" },

{
  "label": "延安市",
  "value": "6106" },

{
  "label": "汉中市",
  "value": "6107" },

{
  "label": "榆林市",
  "value": "6108" },

{
  "label": "安康市",
  "value": "6109" },

{
  "label": "商洛市",
  "value": "6110" }],


[{
  "label": "兰州市",
  "value": "6201" },

{
  "label": "嘉峪关市",
  "value": "6202" },

{
  "label": "金昌市",
  "value": "6203" },

{
  "label": "白银市",
  "value": "6204" },

{
  "label": "天水市",
  "value": "6205" },

{
  "label": "武威市",
  "value": "6206" },

{
  "label": "张掖市",
  "value": "6207" },

{
  "label": "平凉市",
  "value": "6208" },

{
  "label": "酒泉市",
  "value": "6209" },

{
  "label": "庆阳市",
  "value": "6210" },

{
  "label": "定西市",
  "value": "6211" },

{
  "label": "陇南市",
  "value": "6212" },

{
  "label": "临夏回族自治州",
  "value": "6229" },

{
  "label": "甘南藏族自治州",
  "value": "6230" }],


[{
  "label": "西宁市",
  "value": "6301" },

{
  "label": "海东市",
  "value": "6302" },

{
  "label": "海北藏族自治州",
  "value": "6322" },

{
  "label": "黄南藏族自治州",
  "value": "6323" },

{
  "label": "海南藏族自治州",
  "value": "6325" },

{
  "label": "果洛藏族自治州",
  "value": "6326" },

{
  "label": "玉树藏族自治州",
  "value": "6327" },

{
  "label": "海西蒙古族藏族自治州",
  "value": "6328" }],


[{
  "label": "银川市",
  "value": "6401" },

{
  "label": "石嘴山市",
  "value": "6402" },

{
  "label": "吴忠市",
  "value": "6403" },

{
  "label": "固原市",
  "value": "6404" },

{
  "label": "中卫市",
  "value": "6405" }],


[{
  "label": "乌鲁木齐市",
  "value": "6501" },

{
  "label": "克拉玛依市",
  "value": "6502" },

{
  "label": "吐鲁番市",
  "value": "6504" },

{
  "label": "哈密市",
  "value": "6505" },

{
  "label": "昌吉回族自治州",
  "value": "6523" },

{
  "label": "博尔塔拉蒙古自治州",
  "value": "6527" },

{
  "label": "巴音郭楞蒙古自治州",
  "value": "6528" },

{
  "label": "阿克苏地区",
  "value": "6529" },

{
  "label": "克孜勒苏柯尔克孜自治州",
  "value": "6530" },

{
  "label": "喀什地区",
  "value": "6531" },

{
  "label": "和田地区",
  "value": "6532" },

{
  "label": "伊犁哈萨克自治州",
  "value": "6540" },

{
  "label": "塔城地区",
  "value": "6542" },

{
  "label": "阿勒泰地区",
  "value": "6543" },

{
  "label": "自治区直辖县级行政区划",
  "value": "6590" }],


[{
  "label": "台北",
  "value": "6601" },

{
  "label": "高雄",
  "value": "6602" },

{
  "label": "基隆",
  "value": "6603" },

{
  "label": "台中",
  "value": "6604" },

{
  "label": "台南",
  "value": "6605" },

{
  "label": "新竹",
  "value": "6606" },

{
  "label": "嘉义",
  "value": "6607" },

{
  "label": "宜兰",
  "value": "6608" },

{
  "label": "桃园",
  "value": "6609" },

{
  "label": "苗栗",
  "value": "6610" },

{
  "label": "彰化",
  "value": "6611" },

{
  "label": "南投",
  "value": "6612" },

{
  "label": "云林",
  "value": "6613" },

{
  "label": "屏东",
  "value": "6614" },

{
  "label": "台东",
  "value": "6615" },

{
  "label": "花莲",
  "value": "6616" },

{
  "label": "澎湖",
  "value": "6617" }],


[{
  "label": "香港岛",
  "value": "6701" },

{
  "label": "九龙",
  "value": "6702" },

{
  "label": "新界",
  "value": "6703" }],


[{
  "label": "澳门半岛",
  "value": "6801" },

{
  "label": "氹仔岛",
  "value": "6802" },

{
  "label": "路环岛",
  "value": "6803" },

{
  "label": "路氹城",
  "value": "6804" }],


[{
  "label": "钓鱼岛",
  "value": "6901" }]];var _default =


cityData;exports.default = _default;

/***/ }),

/***/ 249:
/*!******************************************************************!*\
  !*** D:/资料/程序资料/黔诺康/components/simple-address/city-data/area.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var areaData = [
[
[{
  "label": "东城区",
  "value": "110101" },

{
  "label": "西城区",
  "value": "110102" },

{
  "label": "朝阳区",
  "value": "110105" },

{
  "label": "丰台区",
  "value": "110106" },

{
  "label": "石景山区",
  "value": "110107" },

{
  "label": "海淀区",
  "value": "110108" },

{
  "label": "门头沟区",
  "value": "110109" },

{
  "label": "房山区",
  "value": "110111" },

{
  "label": "通州区",
  "value": "110112" },

{
  "label": "顺义区",
  "value": "110113" },

{
  "label": "昌平区",
  "value": "110114" },

{
  "label": "大兴区",
  "value": "110115" },

{
  "label": "怀柔区",
  "value": "110116" },

{
  "label": "平谷区",
  "value": "110117" },

{
  "label": "密云区",
  "value": "110118" },

{
  "label": "延庆区",
  "value": "110119" }]],



[
[{
  "label": "和平区",
  "value": "120101" },

{
  "label": "河东区",
  "value": "120102" },

{
  "label": "河西区",
  "value": "120103" },

{
  "label": "南开区",
  "value": "120104" },

{
  "label": "河北区",
  "value": "120105" },

{
  "label": "红桥区",
  "value": "120106" },

{
  "label": "东丽区",
  "value": "120110" },

{
  "label": "西青区",
  "value": "120111" },

{
  "label": "津南区",
  "value": "120112" },

{
  "label": "北辰区",
  "value": "120113" },

{
  "label": "武清区",
  "value": "120114" },

{
  "label": "宝坻区",
  "value": "120115" },

{
  "label": "滨海新区",
  "value": "120116" },

{
  "label": "宁河区",
  "value": "120117" },

{
  "label": "静海区",
  "value": "120118" },

{
  "label": "蓟州区",
  "value": "120119" }]],



[
[{
  "label": "长安区",
  "value": "130102" },

{
  "label": "桥西区",
  "value": "130104" },

{
  "label": "新华区",
  "value": "130105" },

{
  "label": "井陉矿区",
  "value": "130107" },

{
  "label": "裕华区",
  "value": "130108" },

{
  "label": "藁城区",
  "value": "130109" },

{
  "label": "鹿泉区",
  "value": "130110" },

{
  "label": "栾城区",
  "value": "130111" },

{
  "label": "井陉县",
  "value": "130121" },

{
  "label": "正定县",
  "value": "130123" },

{
  "label": "行唐县",
  "value": "130125" },

{
  "label": "灵寿县",
  "value": "130126" },

{
  "label": "高邑县",
  "value": "130127" },

{
  "label": "深泽县",
  "value": "130128" },

{
  "label": "赞皇县",
  "value": "130129" },

{
  "label": "无极县",
  "value": "130130" },

{
  "label": "平山县",
  "value": "130131" },

{
  "label": "元氏县",
  "value": "130132" },

{
  "label": "赵县",
  "value": "130133" },

{
  "label": "石家庄高新技术产业开发区",
  "value": "130171" },

{
  "label": "石家庄循环化工园区",
  "value": "130172" },

{
  "label": "辛集市",
  "value": "130181" },

{
  "label": "晋州市",
  "value": "130183" },

{
  "label": "新乐市",
  "value": "130184" }],


[{
  "label": "路南区",
  "value": "130202" },

{
  "label": "路北区",
  "value": "130203" },

{
  "label": "古冶区",
  "value": "130204" },

{
  "label": "开平区",
  "value": "130205" },

{
  "label": "丰南区",
  "value": "130207" },

{
  "label": "丰润区",
  "value": "130208" },

{
  "label": "曹妃甸区",
  "value": "130209" },

{
  "label": "滦县",
  "value": "130223" },

{
  "label": "滦南县",
  "value": "130224" },

{
  "label": "乐亭县",
  "value": "130225" },

{
  "label": "迁西县",
  "value": "130227" },

{
  "label": "玉田县",
  "value": "130229" },

{
  "label": "唐山市芦台经济技术开发区",
  "value": "130271" },

{
  "label": "唐山市汉沽管理区",
  "value": "130272" },

{
  "label": "唐山高新技术产业开发区",
  "value": "130273" },

{
  "label": "河北唐山海港经济开发区",
  "value": "130274" },

{
  "label": "遵化市",
  "value": "130281" },

{
  "label": "迁安市",
  "value": "130283" }],


[{
  "label": "海港区",
  "value": "130302" },

{
  "label": "山海关区",
  "value": "130303" },

{
  "label": "北戴河区",
  "value": "130304" },

{
  "label": "抚宁区",
  "value": "130306" },

{
  "label": "青龙满族自治县",
  "value": "130321" },

{
  "label": "昌黎县",
  "value": "130322" },

{
  "label": "卢龙县",
  "value": "130324" },

{
  "label": "秦皇岛市经济技术开发区",
  "value": "130371" },

{
  "label": "北戴河新区",
  "value": "130372" }],


[{
  "label": "邯山区",
  "value": "130402" },

{
  "label": "丛台区",
  "value": "130403" },

{
  "label": "复兴区",
  "value": "130404" },

{
  "label": "峰峰矿区",
  "value": "130406" },

{
  "label": "肥乡区",
  "value": "130407" },

{
  "label": "永年区",
  "value": "130408" },

{
  "label": "临漳县",
  "value": "130423" },

{
  "label": "成安县",
  "value": "130424" },

{
  "label": "大名县",
  "value": "130425" },

{
  "label": "涉县",
  "value": "130426" },

{
  "label": "磁县",
  "value": "130427" },

{
  "label": "邱县",
  "value": "130430" },

{
  "label": "鸡泽县",
  "value": "130431" },

{
  "label": "广平县",
  "value": "130432" },

{
  "label": "馆陶县",
  "value": "130433" },

{
  "label": "魏县",
  "value": "130434" },

{
  "label": "曲周县",
  "value": "130435" },

{
  "label": "邯郸经济技术开发区",
  "value": "130471" },

{
  "label": "邯郸冀南新区",
  "value": "130473" },

{
  "label": "武安市",
  "value": "130481" }],


[{
  "label": "桥东区",
  "value": "130502" },

{
  "label": "桥西区",
  "value": "130503" },

{
  "label": "邢台县",
  "value": "130521" },

{
  "label": "临城县",
  "value": "130522" },

{
  "label": "内丘县",
  "value": "130523" },

{
  "label": "柏乡县",
  "value": "130524" },

{
  "label": "隆尧县",
  "value": "130525" },

{
  "label": "任县",
  "value": "130526" },

{
  "label": "南和县",
  "value": "130527" },

{
  "label": "宁晋县",
  "value": "130528" },

{
  "label": "巨鹿县",
  "value": "130529" },

{
  "label": "新河县",
  "value": "130530" },

{
  "label": "广宗县",
  "value": "130531" },

{
  "label": "平乡县",
  "value": "130532" },

{
  "label": "威县",
  "value": "130533" },

{
  "label": "清河县",
  "value": "130534" },

{
  "label": "临西县",
  "value": "130535" },

{
  "label": "河北邢台经济开发区",
  "value": "130571" },

{
  "label": "南宫市",
  "value": "130581" },

{
  "label": "沙河市",
  "value": "130582" }],


[{
  "label": "竞秀区",
  "value": "130602" },

{
  "label": "莲池区",
  "value": "130606" },

{
  "label": "满城区",
  "value": "130607" },

{
  "label": "清苑区",
  "value": "130608" },

{
  "label": "徐水区",
  "value": "130609" },

{
  "label": "涞水县",
  "value": "130623" },

{
  "label": "阜平县",
  "value": "130624" },

{
  "label": "定兴县",
  "value": "130626" },

{
  "label": "唐县",
  "value": "130627" },

{
  "label": "高阳县",
  "value": "130628" },

{
  "label": "容城县",
  "value": "130629" },

{
  "label": "涞源县",
  "value": "130630" },

{
  "label": "望都县",
  "value": "130631" },

{
  "label": "安新县",
  "value": "130632" },

{
  "label": "易县",
  "value": "130633" },

{
  "label": "曲阳县",
  "value": "130634" },

{
  "label": "蠡县",
  "value": "130635" },

{
  "label": "顺平县",
  "value": "130636" },

{
  "label": "博野县",
  "value": "130637" },

{
  "label": "雄县",
  "value": "130638" },

{
  "label": "保定高新技术产业开发区",
  "value": "130671" },

{
  "label": "保定白沟新城",
  "value": "130672" },

{
  "label": "涿州市",
  "value": "130681" },

{
  "label": "定州市",
  "value": "130682" },

{
  "label": "安国市",
  "value": "130683" },

{
  "label": "高碑店市",
  "value": "130684" }],


[{
  "label": "桥东区",
  "value": "130702" },

{
  "label": "桥西区",
  "value": "130703" },

{
  "label": "宣化区",
  "value": "130705" },

{
  "label": "下花园区",
  "value": "130706" },

{
  "label": "万全区",
  "value": "130708" },

{
  "label": "崇礼区",
  "value": "130709" },

{
  "label": "张北县",
  "value": "130722" },

{
  "label": "康保县",
  "value": "130723" },

{
  "label": "沽源县",
  "value": "130724" },

{
  "label": "尚义县",
  "value": "130725" },

{
  "label": "蔚县",
  "value": "130726" },

{
  "label": "阳原县",
  "value": "130727" },

{
  "label": "怀安县",
  "value": "130728" },

{
  "label": "怀来县",
  "value": "130730" },

{
  "label": "涿鹿县",
  "value": "130731" },

{
  "label": "赤城县",
  "value": "130732" },

{
  "label": "张家口市高新技术产业开发区",
  "value": "130771" },

{
  "label": "张家口市察北管理区",
  "value": "130772" },

{
  "label": "张家口市塞北管理区",
  "value": "130773" }],


[{
  "label": "双桥区",
  "value": "130802" },

{
  "label": "双滦区",
  "value": "130803" },

{
  "label": "鹰手营子矿区",
  "value": "130804" },

{
  "label": "承德县",
  "value": "130821" },

{
  "label": "兴隆县",
  "value": "130822" },

{
  "label": "滦平县",
  "value": "130824" },

{
  "label": "隆化县",
  "value": "130825" },

{
  "label": "丰宁满族自治县",
  "value": "130826" },

{
  "label": "宽城满族自治县",
  "value": "130827" },

{
  "label": "围场满族蒙古族自治县",
  "value": "130828" },

{
  "label": "承德高新技术产业开发区",
  "value": "130871" },

{
  "label": "平泉市",
  "value": "130881" }],


[{
  "label": "新华区",
  "value": "130902" },

{
  "label": "运河区",
  "value": "130903" },

{
  "label": "沧县",
  "value": "130921" },

{
  "label": "青县",
  "value": "130922" },

{
  "label": "东光县",
  "value": "130923" },

{
  "label": "海兴县",
  "value": "130924" },

{
  "label": "盐山县",
  "value": "130925" },

{
  "label": "肃宁县",
  "value": "130926" },

{
  "label": "南皮县",
  "value": "130927" },

{
  "label": "吴桥县",
  "value": "130928" },

{
  "label": "献县",
  "value": "130929" },

{
  "label": "孟村回族自治县",
  "value": "130930" },

{
  "label": "河北沧州经济开发区",
  "value": "130971" },

{
  "label": "沧州高新技术产业开发区",
  "value": "130972" },

{
  "label": "沧州渤海新区",
  "value": "130973" },

{
  "label": "泊头市",
  "value": "130981" },

{
  "label": "任丘市",
  "value": "130982" },

{
  "label": "黄骅市",
  "value": "130983" },

{
  "label": "河间市",
  "value": "130984" }],


[{
  "label": "安次区",
  "value": "131002" },

{
  "label": "广阳区",
  "value": "131003" },

{
  "label": "固安县",
  "value": "131022" },

{
  "label": "永清县",
  "value": "131023" },

{
  "label": "香河县",
  "value": "131024" },

{
  "label": "大城县",
  "value": "131025" },

{
  "label": "文安县",
  "value": "131026" },

{
  "label": "大厂回族自治县",
  "value": "131028" },

{
  "label": "廊坊经济技术开发区",
  "value": "131071" },

{
  "label": "霸州市",
  "value": "131081" },

{
  "label": "三河市",
  "value": "131082" }],


[{
  "label": "桃城区",
  "value": "131102" },

{
  "label": "冀州区",
  "value": "131103" },

{
  "label": "枣强县",
  "value": "131121" },

{
  "label": "武邑县",
  "value": "131122" },

{
  "label": "武强县",
  "value": "131123" },

{
  "label": "饶阳县",
  "value": "131124" },

{
  "label": "安平县",
  "value": "131125" },

{
  "label": "故城县",
  "value": "131126" },

{
  "label": "景县",
  "value": "131127" },

{
  "label": "阜城县",
  "value": "131128" },

{
  "label": "河北衡水经济开发区",
  "value": "131171" },

{
  "label": "衡水滨湖新区",
  "value": "131172" },

{
  "label": "深州市",
  "value": "131182" }]],



[
[{
  "label": "小店区",
  "value": "140105" },

{
  "label": "迎泽区",
  "value": "140106" },

{
  "label": "杏花岭区",
  "value": "140107" },

{
  "label": "尖草坪区",
  "value": "140108" },

{
  "label": "万柏林区",
  "value": "140109" },

{
  "label": "晋源区",
  "value": "140110" },

{
  "label": "清徐县",
  "value": "140121" },

{
  "label": "阳曲县",
  "value": "140122" },

{
  "label": "娄烦县",
  "value": "140123" },

{
  "label": "山西转型综合改革示范区",
  "value": "140171" },

{
  "label": "古交市",
  "value": "140181" }],


[{
  "label": "城区",
  "value": "140202" },

{
  "label": "矿区",
  "value": "140203" },

{
  "label": "南郊区",
  "value": "140211" },

{
  "label": "新荣区",
  "value": "140212" },

{
  "label": "阳高县",
  "value": "140221" },

{
  "label": "天镇县",
  "value": "140222" },

{
  "label": "广灵县",
  "value": "140223" },

{
  "label": "灵丘县",
  "value": "140224" },

{
  "label": "浑源县",
  "value": "140225" },

{
  "label": "左云县",
  "value": "140226" },

{
  "label": "大同县",
  "value": "140227" },

{
  "label": "山西大同经济开发区",
  "value": "140271" }],


[{
  "label": "城区",
  "value": "140302" },

{
  "label": "矿区",
  "value": "140303" },

{
  "label": "郊区",
  "value": "140311" },

{
  "label": "平定县",
  "value": "140321" },

{
  "label": "盂县",
  "value": "140322" },

{
  "label": "山西阳泉经济开发区",
  "value": "140371" }],


[{
  "label": "城区",
  "value": "140402" },

{
  "label": "郊区",
  "value": "140411" },

{
  "label": "长治县",
  "value": "140421" },

{
  "label": "襄垣县",
  "value": "140423" },

{
  "label": "屯留县",
  "value": "140424" },

{
  "label": "平顺县",
  "value": "140425" },

{
  "label": "黎城县",
  "value": "140426" },

{
  "label": "壶关县",
  "value": "140427" },

{
  "label": "长子县",
  "value": "140428" },

{
  "label": "武乡县",
  "value": "140429" },

{
  "label": "沁县",
  "value": "140430" },

{
  "label": "沁源县",
  "value": "140431" },

{
  "label": "山西长治高新技术产业园区",
  "value": "140471" },

{
  "label": "潞城市",
  "value": "140481" }],


[{
  "label": "城区",
  "value": "140502" },

{
  "label": "沁水县",
  "value": "140521" },

{
  "label": "阳城县",
  "value": "140522" },

{
  "label": "陵川县",
  "value": "140524" },

{
  "label": "泽州县",
  "value": "140525" },

{
  "label": "高平市",
  "value": "140581" }],


[{
  "label": "朔城区",
  "value": "140602" },

{
  "label": "平鲁区",
  "value": "140603" },

{
  "label": "山阴县",
  "value": "140621" },

{
  "label": "应县",
  "value": "140622" },

{
  "label": "右玉县",
  "value": "140623" },

{
  "label": "怀仁县",
  "value": "140624" },

{
  "label": "山西朔州经济开发区",
  "value": "140671" }],


[{
  "label": "榆次区",
  "value": "140702" },

{
  "label": "榆社县",
  "value": "140721" },

{
  "label": "左权县",
  "value": "140722" },

{
  "label": "和顺县",
  "value": "140723" },

{
  "label": "昔阳县",
  "value": "140724" },

{
  "label": "寿阳县",
  "value": "140725" },

{
  "label": "太谷县",
  "value": "140726" },

{
  "label": "祁县",
  "value": "140727" },

{
  "label": "平遥县",
  "value": "140728" },

{
  "label": "灵石县",
  "value": "140729" },

{
  "label": "介休市",
  "value": "140781" }],


[{
  "label": "盐湖区",
  "value": "140802" },

{
  "label": "临猗县",
  "value": "140821" },

{
  "label": "万荣县",
  "value": "140822" },

{
  "label": "闻喜县",
  "value": "140823" },

{
  "label": "稷山县",
  "value": "140824" },

{
  "label": "新绛县",
  "value": "140825" },

{
  "label": "绛县",
  "value": "140826" },

{
  "label": "垣曲县",
  "value": "140827" },

{
  "label": "夏县",
  "value": "140828" },

{
  "label": "平陆县",
  "value": "140829" },

{
  "label": "芮城县",
  "value": "140830" },

{
  "label": "永济市",
  "value": "140881" },

{
  "label": "河津市",
  "value": "140882" }],


[{
  "label": "忻府区",
  "value": "140902" },

{
  "label": "定襄县",
  "value": "140921" },

{
  "label": "五台县",
  "value": "140922" },

{
  "label": "代县",
  "value": "140923" },

{
  "label": "繁峙县",
  "value": "140924" },

{
  "label": "宁武县",
  "value": "140925" },

{
  "label": "静乐县",
  "value": "140926" },

{
  "label": "神池县",
  "value": "140927" },

{
  "label": "五寨县",
  "value": "140928" },

{
  "label": "岢岚县",
  "value": "140929" },

{
  "label": "河曲县",
  "value": "140930" },

{
  "label": "保德县",
  "value": "140931" },

{
  "label": "偏关县",
  "value": "140932" },

{
  "label": "五台山风景名胜区",
  "value": "140971" },

{
  "label": "原平市",
  "value": "140981" }],


[{
  "label": "尧都区",
  "value": "141002" },

{
  "label": "曲沃县",
  "value": "141021" },

{
  "label": "翼城县",
  "value": "141022" },

{
  "label": "襄汾县",
  "value": "141023" },

{
  "label": "洪洞县",
  "value": "141024" },

{
  "label": "古县",
  "value": "141025" },

{
  "label": "安泽县",
  "value": "141026" },

{
  "label": "浮山县",
  "value": "141027" },

{
  "label": "吉县",
  "value": "141028" },

{
  "label": "乡宁县",
  "value": "141029" },

{
  "label": "大宁县",
  "value": "141030" },

{
  "label": "隰县",
  "value": "141031" },

{
  "label": "永和县",
  "value": "141032" },

{
  "label": "蒲县",
  "value": "141033" },

{
  "label": "汾西县",
  "value": "141034" },

{
  "label": "侯马市",
  "value": "141081" },

{
  "label": "霍州市",
  "value": "141082" }],


[{
  "label": "离石区",
  "value": "141102" },

{
  "label": "文水县",
  "value": "141121" },

{
  "label": "交城县",
  "value": "141122" },

{
  "label": "兴县",
  "value": "141123" },

{
  "label": "临县",
  "value": "141124" },

{
  "label": "柳林县",
  "value": "141125" },

{
  "label": "石楼县",
  "value": "141126" },

{
  "label": "岚县",
  "value": "141127" },

{
  "label": "方山县",
  "value": "141128" },

{
  "label": "中阳县",
  "value": "141129" },

{
  "label": "交口县",
  "value": "141130" },

{
  "label": "孝义市",
  "value": "141181" },

{
  "label": "汾阳市",
  "value": "141182" }]],



[
[{
  "label": "新城区",
  "value": "150102" },

{
  "label": "回民区",
  "value": "150103" },

{
  "label": "玉泉区",
  "value": "150104" },

{
  "label": "赛罕区",
  "value": "150105" },

{
  "label": "土默特左旗",
  "value": "150121" },

{
  "label": "托克托县",
  "value": "150122" },

{
  "label": "和林格尔县",
  "value": "150123" },

{
  "label": "清水河县",
  "value": "150124" },

{
  "label": "武川县",
  "value": "150125" },

{
  "label": "呼和浩特金海工业园区",
  "value": "150171" },

{
  "label": "呼和浩特经济技术开发区",
  "value": "150172" }],


[{
  "label": "东河区",
  "value": "150202" },

{
  "label": "昆都仑区",
  "value": "150203" },

{
  "label": "青山区",
  "value": "150204" },

{
  "label": "石拐区",
  "value": "150205" },

{
  "label": "白云鄂博矿区",
  "value": "150206" },

{
  "label": "九原区",
  "value": "150207" },

{
  "label": "土默特右旗",
  "value": "150221" },

{
  "label": "固阳县",
  "value": "150222" },

{
  "label": "达尔罕茂明安联合旗",
  "value": "150223" },

{
  "label": "包头稀土高新技术产业开发区",
  "value": "150271" }],


[{
  "label": "海勃湾区",
  "value": "150302" },

{
  "label": "海南区",
  "value": "150303" },

{
  "label": "乌达区",
  "value": "150304" }],


[{
  "label": "红山区",
  "value": "150402" },

{
  "label": "元宝山区",
  "value": "150403" },

{
  "label": "松山区",
  "value": "150404" },

{
  "label": "阿鲁科尔沁旗",
  "value": "150421" },

{
  "label": "巴林左旗",
  "value": "150422" },

{
  "label": "巴林右旗",
  "value": "150423" },

{
  "label": "林西县",
  "value": "150424" },

{
  "label": "克什克腾旗",
  "value": "150425" },

{
  "label": "翁牛特旗",
  "value": "150426" },

{
  "label": "喀喇沁旗",
  "value": "150428" },

{
  "label": "宁城县",
  "value": "150429" },

{
  "label": "敖汉旗",
  "value": "150430" }],


[{
  "label": "科尔沁区",
  "value": "150502" },

{
  "label": "科尔沁左翼中旗",
  "value": "150521" },

{
  "label": "科尔沁左翼后旗",
  "value": "150522" },

{
  "label": "开鲁县",
  "value": "150523" },

{
  "label": "库伦旗",
  "value": "150524" },

{
  "label": "奈曼旗",
  "value": "150525" },

{
  "label": "扎鲁特旗",
  "value": "150526" },

{
  "label": "通辽经济技术开发区",
  "value": "150571" },

{
  "label": "霍林郭勒市",
  "value": "150581" }],


[{
  "label": "东胜区",
  "value": "150602" },

{
  "label": "康巴什区",
  "value": "150603" },

{
  "label": "达拉特旗",
  "value": "150621" },

{
  "label": "准格尔旗",
  "value": "150622" },

{
  "label": "鄂托克前旗",
  "value": "150623" },

{
  "label": "鄂托克旗",
  "value": "150624" },

{
  "label": "杭锦旗",
  "value": "150625" },

{
  "label": "乌审旗",
  "value": "150626" },

{
  "label": "伊金霍洛旗",
  "value": "150627" }],


[{
  "label": "海拉尔区",
  "value": "150702" },

{
  "label": "扎赉诺尔区",
  "value": "150703" },

{
  "label": "阿荣旗",
  "value": "150721" },

{
  "label": "莫力达瓦达斡尔族自治旗",
  "value": "150722" },

{
  "label": "鄂伦春自治旗",
  "value": "150723" },

{
  "label": "鄂温克族自治旗",
  "value": "150724" },

{
  "label": "陈巴尔虎旗",
  "value": "150725" },

{
  "label": "新巴尔虎左旗",
  "value": "150726" },

{
  "label": "新巴尔虎右旗",
  "value": "150727" },

{
  "label": "满洲里市",
  "value": "150781" },

{
  "label": "牙克石市",
  "value": "150782" },

{
  "label": "扎兰屯市",
  "value": "150783" },

{
  "label": "额尔古纳市",
  "value": "150784" },

{
  "label": "根河市",
  "value": "150785" }],


[{
  "label": "临河区",
  "value": "150802" },

{
  "label": "五原县",
  "value": "150821" },

{
  "label": "磴口县",
  "value": "150822" },

{
  "label": "乌拉特前旗",
  "value": "150823" },

{
  "label": "乌拉特中旗",
  "value": "150824" },

{
  "label": "乌拉特后旗",
  "value": "150825" },

{
  "label": "杭锦后旗",
  "value": "150826" }],


[{
  "label": "集宁区",
  "value": "150902" },

{
  "label": "卓资县",
  "value": "150921" },

{
  "label": "化德县",
  "value": "150922" },

{
  "label": "商都县",
  "value": "150923" },

{
  "label": "兴和县",
  "value": "150924" },

{
  "label": "凉城县",
  "value": "150925" },

{
  "label": "察哈尔右翼前旗",
  "value": "150926" },

{
  "label": "察哈尔右翼中旗",
  "value": "150927" },

{
  "label": "察哈尔右翼后旗",
  "value": "150928" },

{
  "label": "四子王旗",
  "value": "150929" },

{
  "label": "丰镇市",
  "value": "150981" }],


[{
  "label": "乌兰浩特市",
  "value": "152201" },

{
  "label": "阿尔山市",
  "value": "152202" },

{
  "label": "科尔沁右翼前旗",
  "value": "152221" },

{
  "label": "科尔沁右翼中旗",
  "value": "152222" },

{
  "label": "扎赉特旗",
  "value": "152223" },

{
  "label": "突泉县",
  "value": "152224" }],


[{
  "label": "二连浩特市",
  "value": "152501" },

{
  "label": "锡林浩特市",
  "value": "152502" },

{
  "label": "阿巴嘎旗",
  "value": "152522" },

{
  "label": "苏尼特左旗",
  "value": "152523" },

{
  "label": "苏尼特右旗",
  "value": "152524" },

{
  "label": "东乌珠穆沁旗",
  "value": "152525" },

{
  "label": "西乌珠穆沁旗",
  "value": "152526" },

{
  "label": "太仆寺旗",
  "value": "152527" },

{
  "label": "镶黄旗",
  "value": "152528" },

{
  "label": "正镶白旗",
  "value": "152529" },

{
  "label": "正蓝旗",
  "value": "152530" },

{
  "label": "多伦县",
  "value": "152531" },

{
  "label": "乌拉盖管委会",
  "value": "152571" }],


[{
  "label": "阿拉善左旗",
  "value": "152921" },

{
  "label": "阿拉善右旗",
  "value": "152922" },

{
  "label": "额济纳旗",
  "value": "152923" },

{
  "label": "内蒙古阿拉善经济开发区",
  "value": "152971" }]],



[
[{
  "label": "和平区",
  "value": "210102" },

{
  "label": "沈河区",
  "value": "210103" },

{
  "label": "大东区",
  "value": "210104" },

{
  "label": "皇姑区",
  "value": "210105" },

{
  "label": "铁西区",
  "value": "210106" },

{
  "label": "苏家屯区",
  "value": "210111" },

{
  "label": "浑南区",
  "value": "210112" },

{
  "label": "沈北新区",
  "value": "210113" },

{
  "label": "于洪区",
  "value": "210114" },

{
  "label": "辽中区",
  "value": "210115" },

{
  "label": "康平县",
  "value": "210123" },

{
  "label": "法库县",
  "value": "210124" },

{
  "label": "新民市",
  "value": "210181" }],


[{
  "label": "中山区",
  "value": "210202" },

{
  "label": "西岗区",
  "value": "210203" },

{
  "label": "沙河口区",
  "value": "210204" },

{
  "label": "甘井子区",
  "value": "210211" },

{
  "label": "旅顺口区",
  "value": "210212" },

{
  "label": "金州区",
  "value": "210213" },

{
  "label": "普兰店区",
  "value": "210214" },

{
  "label": "长海县",
  "value": "210224" },

{
  "label": "瓦房店市",
  "value": "210281" },

{
  "label": "庄河市",
  "value": "210283" }],


[{
  "label": "铁东区",
  "value": "210302" },

{
  "label": "铁西区",
  "value": "210303" },

{
  "label": "立山区",
  "value": "210304" },

{
  "label": "千山区",
  "value": "210311" },

{
  "label": "台安县",
  "value": "210321" },

{
  "label": "岫岩满族自治县",
  "value": "210323" },

{
  "label": "海城市",
  "value": "210381" }],


[{
  "label": "新抚区",
  "value": "210402" },

{
  "label": "东洲区",
  "value": "210403" },

{
  "label": "望花区",
  "value": "210404" },

{
  "label": "顺城区",
  "value": "210411" },

{
  "label": "抚顺县",
  "value": "210421" },

{
  "label": "新宾满族自治县",
  "value": "210422" },

{
  "label": "清原满族自治县",
  "value": "210423" }],


[{
  "label": "平山区",
  "value": "210502" },

{
  "label": "溪湖区",
  "value": "210503" },

{
  "label": "明山区",
  "value": "210504" },

{
  "label": "南芬区",
  "value": "210505" },

{
  "label": "本溪满族自治县",
  "value": "210521" },

{
  "label": "桓仁满族自治县",
  "value": "210522" }],


[{
  "label": "元宝区",
  "value": "210602" },

{
  "label": "振兴区",
  "value": "210603" },

{
  "label": "振安区",
  "value": "210604" },

{
  "label": "宽甸满族自治县",
  "value": "210624" },

{
  "label": "东港市",
  "value": "210681" },

{
  "label": "凤城市",
  "value": "210682" }],


[{
  "label": "古塔区",
  "value": "210702" },

{
  "label": "凌河区",
  "value": "210703" },

{
  "label": "太和区",
  "value": "210711" },

{
  "label": "黑山县",
  "value": "210726" },

{
  "label": "义县",
  "value": "210727" },

{
  "label": "凌海市",
  "value": "210781" },

{
  "label": "北镇市",
  "value": "210782" }],


[{
  "label": "站前区",
  "value": "210802" },

{
  "label": "西市区",
  "value": "210803" },

{
  "label": "鲅鱼圈区",
  "value": "210804" },

{
  "label": "老边区",
  "value": "210811" },

{
  "label": "盖州市",
  "value": "210881" },

{
  "label": "大石桥市",
  "value": "210882" }],


[{
  "label": "海州区",
  "value": "210902" },

{
  "label": "新邱区",
  "value": "210903" },

{
  "label": "太平区",
  "value": "210904" },

{
  "label": "清河门区",
  "value": "210905" },

{
  "label": "细河区",
  "value": "210911" },

{
  "label": "阜新蒙古族自治县",
  "value": "210921" },

{
  "label": "彰武县",
  "value": "210922" }],


[{
  "label": "白塔区",
  "value": "211002" },

{
  "label": "文圣区",
  "value": "211003" },

{
  "label": "宏伟区",
  "value": "211004" },

{
  "label": "弓长岭区",
  "value": "211005" },

{
  "label": "太子河区",
  "value": "211011" },

{
  "label": "辽阳县",
  "value": "211021" },

{
  "label": "灯塔市",
  "value": "211081" }],


[{
  "label": "双台子区",
  "value": "211102" },

{
  "label": "兴隆台区",
  "value": "211103" },

{
  "label": "大洼区",
  "value": "211104" },

{
  "label": "盘山县",
  "value": "211122" }],


[{
  "label": "银州区",
  "value": "211202" },

{
  "label": "清河区",
  "value": "211204" },

{
  "label": "铁岭县",
  "value": "211221" },

{
  "label": "西丰县",
  "value": "211223" },

{
  "label": "昌图县",
  "value": "211224" },

{
  "label": "调兵山市",
  "value": "211281" },

{
  "label": "开原市",
  "value": "211282" }],


[{
  "label": "双塔区",
  "value": "211302" },

{
  "label": "龙城区",
  "value": "211303" },

{
  "label": "朝阳县",
  "value": "211321" },

{
  "label": "建平县",
  "value": "211322" },

{
  "label": "喀喇沁左翼蒙古族自治县",
  "value": "211324" },

{
  "label": "北票市",
  "value": "211381" },

{
  "label": "凌源市",
  "value": "211382" }],


[{
  "label": "连山区",
  "value": "211402" },

{
  "label": "龙港区",
  "value": "211403" },

{
  "label": "南票区",
  "value": "211404" },

{
  "label": "绥中县",
  "value": "211421" },

{
  "label": "建昌县",
  "value": "211422" },

{
  "label": "兴城市",
  "value": "211481" }]],



[
[{
  "label": "南关区",
  "value": "220102" },

{
  "label": "宽城区",
  "value": "220103" },

{
  "label": "朝阳区",
  "value": "220104" },

{
  "label": "二道区",
  "value": "220105" },

{
  "label": "绿园区",
  "value": "220106" },

{
  "label": "双阳区",
  "value": "220112" },

{
  "label": "九台区",
  "value": "220113" },

{
  "label": "农安县",
  "value": "220122" },

{
  "label": "长春经济技术开发区",
  "value": "220171" },

{
  "label": "长春净月高新技术产业开发区",
  "value": "220172" },

{
  "label": "长春高新技术产业开发区",
  "value": "220173" },

{
  "label": "长春汽车经济技术开发区",
  "value": "220174" },

{
  "label": "榆树市",
  "value": "220182" },

{
  "label": "德惠市",
  "value": "220183" }],


[{
  "label": "昌邑区",
  "value": "220202" },

{
  "label": "龙潭区",
  "value": "220203" },

{
  "label": "船营区",
  "value": "220204" },

{
  "label": "丰满区",
  "value": "220211" },

{
  "label": "永吉县",
  "value": "220221" },

{
  "label": "吉林经济开发区",
  "value": "220271" },

{
  "label": "吉林高新技术产业开发区",
  "value": "220272" },

{
  "label": "吉林中国新加坡食品区",
  "value": "220273" },

{
  "label": "蛟河市",
  "value": "220281" },

{
  "label": "桦甸市",
  "value": "220282" },

{
  "label": "舒兰市",
  "value": "220283" },

{
  "label": "磐石市",
  "value": "220284" }],


[{
  "label": "铁西区",
  "value": "220302" },

{
  "label": "铁东区",
  "value": "220303" },

{
  "label": "梨树县",
  "value": "220322" },

{
  "label": "伊通满族自治县",
  "value": "220323" },

{
  "label": "公主岭市",
  "value": "220381" },

{
  "label": "双辽市",
  "value": "220382" }],


[{
  "label": "龙山区",
  "value": "220402" },

{
  "label": "西安区",
  "value": "220403" },

{
  "label": "东丰县",
  "value": "220421" },

{
  "label": "东辽县",
  "value": "220422" }],


[{
  "label": "东昌区",
  "value": "220502" },

{
  "label": "二道江区",
  "value": "220503" },

{
  "label": "通化县",
  "value": "220521" },

{
  "label": "辉南县",
  "value": "220523" },

{
  "label": "柳河县",
  "value": "220524" },

{
  "label": "梅河口市",
  "value": "220581" },

{
  "label": "集安市",
  "value": "220582" }],


[{
  "label": "浑江区",
  "value": "220602" },

{
  "label": "江源区",
  "value": "220605" },

{
  "label": "抚松县",
  "value": "220621" },

{
  "label": "靖宇县",
  "value": "220622" },

{
  "label": "长白朝鲜族自治县",
  "value": "220623" },

{
  "label": "临江市",
  "value": "220681" }],


[{
  "label": "宁江区",
  "value": "220702" },

{
  "label": "前郭尔罗斯蒙古族自治县",
  "value": "220721" },

{
  "label": "长岭县",
  "value": "220722" },

{
  "label": "乾安县",
  "value": "220723" },

{
  "label": "吉林松原经济开发区",
  "value": "220771" },

{
  "label": "扶余市",
  "value": "220781" }],


[{
  "label": "洮北区",
  "value": "220802" },

{
  "label": "镇赉县",
  "value": "220821" },

{
  "label": "通榆县",
  "value": "220822" },

{
  "label": "吉林白城经济开发区",
  "value": "220871" },

{
  "label": "洮南市",
  "value": "220881" },

{
  "label": "大安市",
  "value": "220882" }],


[{
  "label": "延吉市",
  "value": "222401" },

{
  "label": "图们市",
  "value": "222402" },

{
  "label": "敦化市",
  "value": "222403" },

{
  "label": "珲春市",
  "value": "222404" },

{
  "label": "龙井市",
  "value": "222405" },

{
  "label": "和龙市",
  "value": "222406" },

{
  "label": "汪清县",
  "value": "222424" },

{
  "label": "安图县",
  "value": "222426" }]],



[
[{
  "label": "道里区",
  "value": "230102" },

{
  "label": "南岗区",
  "value": "230103" },

{
  "label": "道外区",
  "value": "230104" },

{
  "label": "平房区",
  "value": "230108" },

{
  "label": "松北区",
  "value": "230109" },

{
  "label": "香坊区",
  "value": "230110" },

{
  "label": "呼兰区",
  "value": "230111" },

{
  "label": "阿城区",
  "value": "230112" },

{
  "label": "双城区",
  "value": "230113" },

{
  "label": "依兰县",
  "value": "230123" },

{
  "label": "方正县",
  "value": "230124" },

{
  "label": "宾县",
  "value": "230125" },

{
  "label": "巴彦县",
  "value": "230126" },

{
  "label": "木兰县",
  "value": "230127" },

{
  "label": "通河县",
  "value": "230128" },

{
  "label": "延寿县",
  "value": "230129" },

{
  "label": "尚志市",
  "value": "230183" },

{
  "label": "五常市",
  "value": "230184" }],


[{
  "label": "龙沙区",
  "value": "230202" },

{
  "label": "建华区",
  "value": "230203" },

{
  "label": "铁锋区",
  "value": "230204" },

{
  "label": "昂昂溪区",
  "value": "230205" },

{
  "label": "富拉尔基区",
  "value": "230206" },

{
  "label": "碾子山区",
  "value": "230207" },

{
  "label": "梅里斯达斡尔族区",
  "value": "230208" },

{
  "label": "龙江县",
  "value": "230221" },

{
  "label": "依安县",
  "value": "230223" },

{
  "label": "泰来县",
  "value": "230224" },

{
  "label": "甘南县",
  "value": "230225" },

{
  "label": "富裕县",
  "value": "230227" },

{
  "label": "克山县",
  "value": "230229" },

{
  "label": "克东县",
  "value": "230230" },

{
  "label": "拜泉县",
  "value": "230231" },

{
  "label": "讷河市",
  "value": "230281" }],


[{
  "label": "鸡冠区",
  "value": "230302" },

{
  "label": "恒山区",
  "value": "230303" },

{
  "label": "滴道区",
  "value": "230304" },

{
  "label": "梨树区",
  "value": "230305" },

{
  "label": "城子河区",
  "value": "230306" },

{
  "label": "麻山区",
  "value": "230307" },

{
  "label": "鸡东县",
  "value": "230321" },

{
  "label": "虎林市",
  "value": "230381" },

{
  "label": "密山市",
  "value": "230382" }],


[{
  "label": "向阳区",
  "value": "230402" },

{
  "label": "工农区",
  "value": "230403" },

{
  "label": "南山区",
  "value": "230404" },

{
  "label": "兴安区",
  "value": "230405" },

{
  "label": "东山区",
  "value": "230406" },

{
  "label": "兴山区",
  "value": "230407" },

{
  "label": "萝北县",
  "value": "230421" },

{
  "label": "绥滨县",
  "value": "230422" }],


[{
  "label": "尖山区",
  "value": "230502" },

{
  "label": "岭东区",
  "value": "230503" },

{
  "label": "四方台区",
  "value": "230505" },

{
  "label": "宝山区",
  "value": "230506" },

{
  "label": "集贤县",
  "value": "230521" },

{
  "label": "友谊县",
  "value": "230522" },

{
  "label": "宝清县",
  "value": "230523" },

{
  "label": "饶河县",
  "value": "230524" }],


[{
  "label": "萨尔图区",
  "value": "230602" },

{
  "label": "龙凤区",
  "value": "230603" },

{
  "label": "让胡路区",
  "value": "230604" },

{
  "label": "红岗区",
  "value": "230605" },

{
  "label": "大同区",
  "value": "230606" },

{
  "label": "肇州县",
  "value": "230621" },

{
  "label": "肇源县",
  "value": "230622" },

{
  "label": "林甸县",
  "value": "230623" },

{
  "label": "杜尔伯特蒙古族自治县",
  "value": "230624" },

{
  "label": "大庆高新技术产业开发区",
  "value": "230671" }],


[{
  "label": "伊春区",
  "value": "230702" },

{
  "label": "南岔区",
  "value": "230703" },

{
  "label": "友好区",
  "value": "230704" },

{
  "label": "西林区",
  "value": "230705" },

{
  "label": "翠峦区",
  "value": "230706" },

{
  "label": "新青区",
  "value": "230707" },

{
  "label": "美溪区",
  "value": "230708" },

{
  "label": "金山屯区",
  "value": "230709" },

{
  "label": "五营区",
  "value": "230710" },

{
  "label": "乌马河区",
  "value": "230711" },

{
  "label": "汤旺河区",
  "value": "230712" },

{
  "label": "带岭区",
  "value": "230713" },

{
  "label": "乌伊岭区",
  "value": "230714" },

{
  "label": "红星区",
  "value": "230715" },

{
  "label": "上甘岭区",
  "value": "230716" },

{
  "label": "嘉荫县",
  "value": "230722" },

{
  "label": "铁力市",
  "value": "230781" }],


[{
  "label": "向阳区",
  "value": "230803" },

{
  "label": "前进区",
  "value": "230804" },

{
  "label": "东风区",
  "value": "230805" },

{
  "label": "郊区",
  "value": "230811" },

{
  "label": "桦南县",
  "value": "230822" },

{
  "label": "桦川县",
  "value": "230826" },

{
  "label": "汤原县",
  "value": "230828" },

{
  "label": "同江市",
  "value": "230881" },

{
  "label": "富锦市",
  "value": "230882" },

{
  "label": "抚远市",
  "value": "230883" }],


[{
  "label": "新兴区",
  "value": "230902" },

{
  "label": "桃山区",
  "value": "230903" },

{
  "label": "茄子河区",
  "value": "230904" },

{
  "label": "勃利县",
  "value": "230921" }],


[{
  "label": "东安区",
  "value": "231002" },

{
  "label": "阳明区",
  "value": "231003" },

{
  "label": "爱民区",
  "value": "231004" },

{
  "label": "西安区",
  "value": "231005" },

{
  "label": "林口县",
  "value": "231025" },

{
  "label": "牡丹江经济技术开发区",
  "value": "231071" },

{
  "label": "绥芬河市",
  "value": "231081" },

{
  "label": "海林市",
  "value": "231083" },

{
  "label": "宁安市",
  "value": "231084" },

{
  "label": "穆棱市",
  "value": "231085" },

{
  "label": "东宁市",
  "value": "231086" }],


[{
  "label": "爱辉区",
  "value": "231102" },

{
  "label": "嫩江县",
  "value": "231121" },

{
  "label": "逊克县",
  "value": "231123" },

{
  "label": "孙吴县",
  "value": "231124" },

{
  "label": "北安市",
  "value": "231181" },

{
  "label": "五大连池市",
  "value": "231182" }],


[{
  "label": "北林区",
  "value": "231202" },

{
  "label": "望奎县",
  "value": "231221" },

{
  "label": "兰西县",
  "value": "231222" },

{
  "label": "青冈县",
  "value": "231223" },

{
  "label": "庆安县",
  "value": "231224" },

{
  "label": "明水县",
  "value": "231225" },

{
  "label": "绥棱县",
  "value": "231226" },

{
  "label": "安达市",
  "value": "231281" },

{
  "label": "肇东市",
  "value": "231282" },

{
  "label": "海伦市",
  "value": "231283" }],


[{
  "label": "加格达奇区",
  "value": "232701" },

{
  "label": "松岭区",
  "value": "232702" },

{
  "label": "新林区",
  "value": "232703" },

{
  "label": "呼中区",
  "value": "232704" },

{
  "label": "呼玛县",
  "value": "232721" },

{
  "label": "塔河县",
  "value": "232722" },

{
  "label": "漠河县",
  "value": "232723" }]],



[
[{
  "label": "黄浦区",
  "value": "310101" },

{
  "label": "徐汇区",
  "value": "310104" },

{
  "label": "长宁区",
  "value": "310105" },

{
  "label": "静安区",
  "value": "310106" },

{
  "label": "普陀区",
  "value": "310107" },

{
  "label": "虹口区",
  "value": "310109" },

{
  "label": "杨浦区",
  "value": "310110" },

{
  "label": "闵行区",
  "value": "310112" },

{
  "label": "宝山区",
  "value": "310113" },

{
  "label": "嘉定区",
  "value": "310114" },

{
  "label": "浦东新区",
  "value": "310115" },

{
  "label": "金山区",
  "value": "310116" },

{
  "label": "松江区",
  "value": "310117" },

{
  "label": "青浦区",
  "value": "310118" },

{
  "label": "奉贤区",
  "value": "310120" },

{
  "label": "崇明区",
  "value": "310151" }]],



[
[{
  "label": "玄武区",
  "value": "320102" },

{
  "label": "秦淮区",
  "value": "320104" },

{
  "label": "建邺区",
  "value": "320105" },

{
  "label": "鼓楼区",
  "value": "320106" },

{
  "label": "浦口区",
  "value": "320111" },

{
  "label": "栖霞区",
  "value": "320113" },

{
  "label": "雨花台区",
  "value": "320114" },

{
  "label": "江宁区",
  "value": "320115" },

{
  "label": "六合区",
  "value": "320116" },

{
  "label": "溧水区",
  "value": "320117" },

{
  "label": "高淳区",
  "value": "320118" }],


[{
  "label": "锡山区",
  "value": "320205" },

{
  "label": "惠山区",
  "value": "320206" },

{
  "label": "滨湖区",
  "value": "320211" },

{
  "label": "梁溪区",
  "value": "320213" },

{
  "label": "新吴区",
  "value": "320214" },

{
  "label": "江阴市",
  "value": "320281" },

{
  "label": "宜兴市",
  "value": "320282" }],


[{
  "label": "鼓楼区",
  "value": "320302" },

{
  "label": "云龙区",
  "value": "320303" },

{
  "label": "贾汪区",
  "value": "320305" },

{
  "label": "泉山区",
  "value": "320311" },

{
  "label": "铜山区",
  "value": "320312" },

{
  "label": "丰县",
  "value": "320321" },

{
  "label": "沛县",
  "value": "320322" },

{
  "label": "睢宁县",
  "value": "320324" },

{
  "label": "徐州经济技术开发区",
  "value": "320371" },

{
  "label": "新沂市",
  "value": "320381" },

{
  "label": "邳州市",
  "value": "320382" }],


[{
  "label": "天宁区",
  "value": "320402" },

{
  "label": "钟楼区",
  "value": "320404" },

{
  "label": "新北区",
  "value": "320411" },

{
  "label": "武进区",
  "value": "320412" },

{
  "label": "金坛区",
  "value": "320413" },

{
  "label": "溧阳市",
  "value": "320481" }],


[{
  "label": "虎丘区",
  "value": "320505" },

{
  "label": "吴中区",
  "value": "320506" },

{
  "label": "相城区",
  "value": "320507" },

{
  "label": "姑苏区",
  "value": "320508" },

{
  "label": "吴江区",
  "value": "320509" },

{
  "label": "苏州工业园区",
  "value": "320571" },

{
  "label": "常熟市",
  "value": "320581" },

{
  "label": "张家港市",
  "value": "320582" },

{
  "label": "昆山市",
  "value": "320583" },

{
  "label": "太仓市",
  "value": "320585" }],


[{
  "label": "崇川区",
  "value": "320602" },

{
  "label": "港闸区",
  "value": "320611" },

{
  "label": "通州区",
  "value": "320612" },

{
  "label": "海安县",
  "value": "320621" },

{
  "label": "如东县",
  "value": "320623" },

{
  "label": "南通经济技术开发区",
  "value": "320671" },

{
  "label": "启东市",
  "value": "320681" },

{
  "label": "如皋市",
  "value": "320682" },

{
  "label": "海门市",
  "value": "320684" }],


[{
  "label": "连云区",
  "value": "320703" },

{
  "label": "海州区",
  "value": "320706" },

{
  "label": "赣榆区",
  "value": "320707" },

{
  "label": "东海县",
  "value": "320722" },

{
  "label": "灌云县",
  "value": "320723" },

{
  "label": "灌南县",
  "value": "320724" },

{
  "label": "连云港经济技术开发区",
  "value": "320771" },

{
  "label": "连云港高新技术产业开发区",
  "value": "320772" }],


[{
  "label": "淮安区",
  "value": "320803" },

{
  "label": "淮阴区",
  "value": "320804" },

{
  "label": "清江浦区",
  "value": "320812" },

{
  "label": "洪泽区",
  "value": "320813" },

{
  "label": "涟水县",
  "value": "320826" },

{
  "label": "盱眙县",
  "value": "320830" },

{
  "label": "金湖县",
  "value": "320831" },

{
  "label": "淮安经济技术开发区",
  "value": "320871" }],


[{
  "label": "亭湖区",
  "value": "320902" },

{
  "label": "盐都区",
  "value": "320903" },

{
  "label": "大丰区",
  "value": "320904" },

{
  "label": "响水县",
  "value": "320921" },

{
  "label": "滨海县",
  "value": "320922" },

{
  "label": "阜宁县",
  "value": "320923" },

{
  "label": "射阳县",
  "value": "320924" },

{
  "label": "建湖县",
  "value": "320925" },

{
  "label": "盐城经济技术开发区",
  "value": "320971" },

{
  "label": "东台市",
  "value": "320981" }],


[{
  "label": "广陵区",
  "value": "321002" },

{
  "label": "邗江区",
  "value": "321003" },

{
  "label": "江都区",
  "value": "321012" },

{
  "label": "宝应县",
  "value": "321023" },

{
  "label": "扬州经济技术开发区",
  "value": "321071" },

{
  "label": "仪征市",
  "value": "321081" },

{
  "label": "高邮市",
  "value": "321084" }],


[{
  "label": "京口区",
  "value": "321102" },

{
  "label": "润州区",
  "value": "321111" },

{
  "label": "丹徒区",
  "value": "321112" },

{
  "label": "镇江新区",
  "value": "321171" },

{
  "label": "丹阳市",
  "value": "321181" },

{
  "label": "扬中市",
  "value": "321182" },

{
  "label": "句容市",
  "value": "321183" }],


[{
  "label": "海陵区",
  "value": "321202" },

{
  "label": "高港区",
  "value": "321203" },

{
  "label": "姜堰区",
  "value": "321204" },

{
  "label": "泰州医药高新技术产业开发区",
  "value": "321271" },

{
  "label": "兴化市",
  "value": "321281" },

{
  "label": "靖江市",
  "value": "321282" },

{
  "label": "泰兴市",
  "value": "321283" }],


[{
  "label": "宿城区",
  "value": "321302" },

{
  "label": "宿豫区",
  "value": "321311" },

{
  "label": "沭阳县",
  "value": "321322" },

{
  "label": "泗阳县",
  "value": "321323" },

{
  "label": "泗洪县",
  "value": "321324" },

{
  "label": "宿迁经济技术开发区",
  "value": "321371" }]],



[
[{
  "label": "上城区",
  "value": "330102" },

{
  "label": "下城区",
  "value": "330103" },

{
  "label": "江干区",
  "value": "330104" },

{
  "label": "拱墅区",
  "value": "330105" },

{
  "label": "西湖区",
  "value": "330106" },

{
  "label": "滨江区",
  "value": "330108" },

{
  "label": "萧山区",
  "value": "330109" },

{
  "label": "余杭区",
  "value": "330110" },

{
  "label": "富阳区",
  "value": "330111" },

{
  "label": "临安区",
  "value": "330112" },

{
  "label": "桐庐县",
  "value": "330122" },

{
  "label": "淳安县",
  "value": "330127" },

{
  "label": "建德市",
  "value": "330182" }],


[{
  "label": "海曙区",
  "value": "330203" },

{
  "label": "江北区",
  "value": "330205" },

{
  "label": "北仑区",
  "value": "330206" },

{
  "label": "镇海区",
  "value": "330211" },

{
  "label": "鄞州区",
  "value": "330212" },

{
  "label": "奉化区",
  "value": "330213" },

{
  "label": "象山县",
  "value": "330225" },

{
  "label": "宁海县",
  "value": "330226" },

{
  "label": "余姚市",
  "value": "330281" },

{
  "label": "慈溪市",
  "value": "330282" }],


[{
  "label": "鹿城区",
  "value": "330302" },

{
  "label": "龙湾区",
  "value": "330303" },

{
  "label": "瓯海区",
  "value": "330304" },

{
  "label": "洞头区",
  "value": "330305" },

{
  "label": "永嘉县",
  "value": "330324" },

{
  "label": "平阳县",
  "value": "330326" },

{
  "label": "苍南县",
  "value": "330327" },

{
  "label": "文成县",
  "value": "330328" },

{
  "label": "泰顺县",
  "value": "330329" },

{
  "label": "温州经济技术开发区",
  "value": "330371" },

{
  "label": "瑞安市",
  "value": "330381" },

{
  "label": "乐清市",
  "value": "330382" }],


[{
  "label": "南湖区",
  "value": "330402" },

{
  "label": "秀洲区",
  "value": "330411" },

{
  "label": "嘉善县",
  "value": "330421" },

{
  "label": "海盐县",
  "value": "330424" },

{
  "label": "海宁市",
  "value": "330481" },

{
  "label": "平湖市",
  "value": "330482" },

{
  "label": "桐乡市",
  "value": "330483" }],


[{
  "label": "吴兴区",
  "value": "330502" },

{
  "label": "南浔区",
  "value": "330503" },

{
  "label": "德清县",
  "value": "330521" },

{
  "label": "长兴县",
  "value": "330522" },

{
  "label": "安吉县",
  "value": "330523" }],


[{
  "label": "越城区",
  "value": "330602" },

{
  "label": "柯桥区",
  "value": "330603" },

{
  "label": "上虞区",
  "value": "330604" },

{
  "label": "新昌县",
  "value": "330624" },

{
  "label": "诸暨市",
  "value": "330681" },

{
  "label": "嵊州市",
  "value": "330683" }],


[{
  "label": "婺城区",
  "value": "330702" },

{
  "label": "金东区",
  "value": "330703" },

{
  "label": "武义县",
  "value": "330723" },

{
  "label": "浦江县",
  "value": "330726" },

{
  "label": "磐安县",
  "value": "330727" },

{
  "label": "兰溪市",
  "value": "330781" },

{
  "label": "义乌市",
  "value": "330782" },

{
  "label": "东阳市",
  "value": "330783" },

{
  "label": "永康市",
  "value": "330784" }],


[{
  "label": "柯城区",
  "value": "330802" },

{
  "label": "衢江区",
  "value": "330803" },

{
  "label": "常山县",
  "value": "330822" },

{
  "label": "开化县",
  "value": "330824" },

{
  "label": "龙游县",
  "value": "330825" },

{
  "label": "江山市",
  "value": "330881" }],


[{
  "label": "定海区",
  "value": "330902" },

{
  "label": "普陀区",
  "value": "330903" },

{
  "label": "岱山县",
  "value": "330921" },

{
  "label": "嵊泗县",
  "value": "330922" }],


[{
  "label": "椒江区",
  "value": "331002" },

{
  "label": "黄岩区",
  "value": "331003" },

{
  "label": "路桥区",
  "value": "331004" },

{
  "label": "三门县",
  "value": "331022" },

{
  "label": "天台县",
  "value": "331023" },

{
  "label": "仙居县",
  "value": "331024" },

{
  "label": "温岭市",
  "value": "331081" },

{
  "label": "临海市",
  "value": "331082" },

{
  "label": "玉环市",
  "value": "331083" }],


[{
  "label": "莲都区",
  "value": "331102" },

{
  "label": "青田县",
  "value": "331121" },

{
  "label": "缙云县",
  "value": "331122" },

{
  "label": "遂昌县",
  "value": "331123" },

{
  "label": "松阳县",
  "value": "331124" },

{
  "label": "云和县",
  "value": "331125" },

{
  "label": "庆元县",
  "value": "331126" },

{
  "label": "景宁畲族自治县",
  "value": "331127" },

{
  "label": "龙泉市",
  "value": "331181" }]],



[
[{
  "label": "瑶海区",
  "value": "340102" },

{
  "label": "庐阳区",
  "value": "340103" },

{
  "label": "蜀山区",
  "value": "340104" },

{
  "label": "包河区",
  "value": "340111" },

{
  "label": "长丰县",
  "value": "340121" },

{
  "label": "肥东县",
  "value": "340122" },

{
  "label": "肥西县",
  "value": "340123" },

{
  "label": "庐江县",
  "value": "340124" },

{
  "label": "合肥高新技术产业开发区",
  "value": "340171" },

{
  "label": "合肥经济技术开发区",
  "value": "340172" },

{
  "label": "合肥新站高新技术产业开发区",
  "value": "340173" },

{
  "label": "巢湖市",
  "value": "340181" }],


[{
  "label": "镜湖区",
  "value": "340202" },

{
  "label": "弋江区",
  "value": "340203" },

{
  "label": "鸠江区",
  "value": "340207" },

{
  "label": "三山区",
  "value": "340208" },

{
  "label": "芜湖县",
  "value": "340221" },

{
  "label": "繁昌县",
  "value": "340222" },

{
  "label": "南陵县",
  "value": "340223" },

{
  "label": "无为县",
  "value": "340225" },

{
  "label": "芜湖经济技术开发区",
  "value": "340271" },

{
  "label": "安徽芜湖长江大桥经济开发区",
  "value": "340272" }],


[{
  "label": "龙子湖区",
  "value": "340302" },

{
  "label": "蚌山区",
  "value": "340303" },

{
  "label": "禹会区",
  "value": "340304" },

{
  "label": "淮上区",
  "value": "340311" },

{
  "label": "怀远县",
  "value": "340321" },

{
  "label": "五河县",
  "value": "340322" },

{
  "label": "固镇县",
  "value": "340323" },

{
  "label": "蚌埠市高新技术开发区",
  "value": "340371" },

{
  "label": "蚌埠市经济开发区",
  "value": "340372" }],


[{
  "label": "大通区",
  "value": "340402" },

{
  "label": "田家庵区",
  "value": "340403" },

{
  "label": "谢家集区",
  "value": "340404" },

{
  "label": "八公山区",
  "value": "340405" },

{
  "label": "潘集区",
  "value": "340406" },

{
  "label": "凤台县",
  "value": "340421" },

{
  "label": "寿县",
  "value": "340422" }],


[{
  "label": "花山区",
  "value": "340503" },

{
  "label": "雨山区",
  "value": "340504" },

{
  "label": "博望区",
  "value": "340506" },

{
  "label": "当涂县",
  "value": "340521" },

{
  "label": "含山县",
  "value": "340522" },

{
  "label": "和县",
  "value": "340523" }],


[{
  "label": "杜集区",
  "value": "340602" },

{
  "label": "相山区",
  "value": "340603" },

{
  "label": "烈山区",
  "value": "340604" },

{
  "label": "濉溪县",
  "value": "340621" }],


[{
  "label": "铜官区",
  "value": "340705" },

{
  "label": "义安区",
  "value": "340706" },

{
  "label": "郊区",
  "value": "340711" },

{
  "label": "枞阳县",
  "value": "340722" }],


[{
  "label": "迎江区",
  "value": "340802" },

{
  "label": "大观区",
  "value": "340803" },

{
  "label": "宜秀区",
  "value": "340811" },

{
  "label": "怀宁县",
  "value": "340822" },

{
  "label": "潜山县",
  "value": "340824" },

{
  "label": "太湖县",
  "value": "340825" },

{
  "label": "宿松县",
  "value": "340826" },

{
  "label": "望江县",
  "value": "340827" },

{
  "label": "岳西县",
  "value": "340828" },

{
  "label": "安徽安庆经济开发区",
  "value": "340871" },

{
  "label": "桐城市",
  "value": "340881" }],


[{
  "label": "屯溪区",
  "value": "341002" },

{
  "label": "黄山区",
  "value": "341003" },

{
  "label": "徽州区",
  "value": "341004" },

{
  "label": "歙县",
  "value": "341021" },

{
  "label": "休宁县",
  "value": "341022" },

{
  "label": "黟县",
  "value": "341023" },

{
  "label": "祁门县",
  "value": "341024" }],


[{
  "label": "琅琊区",
  "value": "341102" },

{
  "label": "南谯区",
  "value": "341103" },

{
  "label": "来安县",
  "value": "341122" },

{
  "label": "全椒县",
  "value": "341124" },

{
  "label": "定远县",
  "value": "341125" },

{
  "label": "凤阳县",
  "value": "341126" },

{
  "label": "苏滁现代产业园",
  "value": "341171" },

{
  "label": "滁州经济技术开发区",
  "value": "341172" },

{
  "label": "天长市",
  "value": "341181" },

{
  "label": "明光市",
  "value": "341182" }],


[{
  "label": "颍州区",
  "value": "341202" },

{
  "label": "颍东区",
  "value": "341203" },

{
  "label": "颍泉区",
  "value": "341204" },

{
  "label": "临泉县",
  "value": "341221" },

{
  "label": "太和县",
  "value": "341222" },

{
  "label": "阜南县",
  "value": "341225" },

{
  "label": "颍上县",
  "value": "341226" },

{
  "label": "阜阳合肥现代产业园区",
  "value": "341271" },

{
  "label": "阜阳经济技术开发区",
  "value": "341272" },

{
  "label": "界首市",
  "value": "341282" }],


[{
  "label": "埇桥区",
  "value": "341302" },

{
  "label": "砀山县",
  "value": "341321" },

{
  "label": "萧县",
  "value": "341322" },

{
  "label": "灵璧县",
  "value": "341323" },

{
  "label": "泗县",
  "value": "341324" },

{
  "label": "宿州马鞍山现代产业园区",
  "value": "341371" },

{
  "label": "宿州经济技术开发区",
  "value": "341372" }],


[{
  "label": "金安区",
  "value": "341502" },

{
  "label": "裕安区",
  "value": "341503" },

{
  "label": "叶集区",
  "value": "341504" },

{
  "label": "霍邱县",
  "value": "341522" },

{
  "label": "舒城县",
  "value": "341523" },

{
  "label": "金寨县",
  "value": "341524" },

{
  "label": "霍山县",
  "value": "341525" }],


[{
  "label": "谯城区",
  "value": "341602" },

{
  "label": "涡阳县",
  "value": "341621" },

{
  "label": "蒙城县",
  "value": "341622" },

{
  "label": "利辛县",
  "value": "341623" }],


[{
  "label": "贵池区",
  "value": "341702" },

{
  "label": "东至县",
  "value": "341721" },

{
  "label": "石台县",
  "value": "341722" },

{
  "label": "青阳县",
  "value": "341723" }],


[{
  "label": "宣州区",
  "value": "341802" },

{
  "label": "郎溪县",
  "value": "341821" },

{
  "label": "广德县",
  "value": "341822" },

{
  "label": "泾县",
  "value": "341823" },

{
  "label": "绩溪县",
  "value": "341824" },

{
  "label": "旌德县",
  "value": "341825" },

{
  "label": "宣城市经济开发区",
  "value": "341871" },

{
  "label": "宁国市",
  "value": "341881" }]],



[
[{
  "label": "鼓楼区",
  "value": "350102" },

{
  "label": "台江区",
  "value": "350103" },

{
  "label": "仓山区",
  "value": "350104" },

{
  "label": "马尾区",
  "value": "350105" },

{
  "label": "晋安区",
  "value": "350111" },

{
  "label": "闽侯县",
  "value": "350121" },

{
  "label": "连江县",
  "value": "350122" },

{
  "label": "罗源县",
  "value": "350123" },

{
  "label": "闽清县",
  "value": "350124" },

{
  "label": "永泰县",
  "value": "350125" },

{
  "label": "平潭县",
  "value": "350128" },

{
  "label": "福清市",
  "value": "350181" },

{
  "label": "长乐市",
  "value": "350182" }],


[{
  "label": "思明区",
  "value": "350203" },

{
  "label": "海沧区",
  "value": "350205" },

{
  "label": "湖里区",
  "value": "350206" },

{
  "label": "集美区",
  "value": "350211" },

{
  "label": "同安区",
  "value": "350212" },

{
  "label": "翔安区",
  "value": "350213" }],


[{
  "label": "城厢区",
  "value": "350302" },

{
  "label": "涵江区",
  "value": "350303" },

{
  "label": "荔城区",
  "value": "350304" },

{
  "label": "秀屿区",
  "value": "350305" },

{
  "label": "仙游县",
  "value": "350322" }],


[{
  "label": "梅列区",
  "value": "350402" },

{
  "label": "三元区",
  "value": "350403" },

{
  "label": "明溪县",
  "value": "350421" },

{
  "label": "清流县",
  "value": "350423" },

{
  "label": "宁化县",
  "value": "350424" },

{
  "label": "大田县",
  "value": "350425" },

{
  "label": "尤溪县",
  "value": "350426" },

{
  "label": "沙县",
  "value": "350427" },

{
  "label": "将乐县",
  "value": "350428" },

{
  "label": "泰宁县",
  "value": "350429" },

{
  "label": "建宁县",
  "value": "350430" },

{
  "label": "永安市",
  "value": "350481" }],


[{
  "label": "鲤城区",
  "value": "350502" },

{
  "label": "丰泽区",
  "value": "350503" },

{
  "label": "洛江区",
  "value": "350504" },

{
  "label": "泉港区",
  "value": "350505" },

{
  "label": "惠安县",
  "value": "350521" },

{
  "label": "安溪县",
  "value": "350524" },

{
  "label": "永春县",
  "value": "350525" },

{
  "label": "德化县",
  "value": "350526" },

{
  "label": "金门县",
  "value": "350527" },

{
  "label": "石狮市",
  "value": "350581" },

{
  "label": "晋江市",
  "value": "350582" },

{
  "label": "南安市",
  "value": "350583" }],


[{
  "label": "芗城区",
  "value": "350602" },

{
  "label": "龙文区",
  "value": "350603" },

{
  "label": "云霄县",
  "value": "350622" },

{
  "label": "漳浦县",
  "value": "350623" },

{
  "label": "诏安县",
  "value": "350624" },

{
  "label": "长泰县",
  "value": "350625" },

{
  "label": "东山县",
  "value": "350626" },

{
  "label": "南靖县",
  "value": "350627" },

{
  "label": "平和县",
  "value": "350628" },

{
  "label": "华安县",
  "value": "350629" },

{
  "label": "龙海市",
  "value": "350681" }],


[{
  "label": "延平区",
  "value": "350702" },

{
  "label": "建阳区",
  "value": "350703" },

{
  "label": "顺昌县",
  "value": "350721" },

{
  "label": "浦城县",
  "value": "350722" },

{
  "label": "光泽县",
  "value": "350723" },

{
  "label": "松溪县",
  "value": "350724" },

{
  "label": "政和县",
  "value": "350725" },

{
  "label": "邵武市",
  "value": "350781" },

{
  "label": "武夷山市",
  "value": "350782" },

{
  "label": "建瓯市",
  "value": "350783" }],


[{
  "label": "新罗区",
  "value": "350802" },

{
  "label": "永定区",
  "value": "350803" },

{
  "label": "长汀县",
  "value": "350821" },

{
  "label": "上杭县",
  "value": "350823" },

{
  "label": "武平县",
  "value": "350824" },

{
  "label": "连城县",
  "value": "350825" },

{
  "label": "漳平市",
  "value": "350881" }],


[{
  "label": "蕉城区",
  "value": "350902" },

{
  "label": "霞浦县",
  "value": "350921" },

{
  "label": "古田县",
  "value": "350922" },

{
  "label": "屏南县",
  "value": "350923" },

{
  "label": "寿宁县",
  "value": "350924" },

{
  "label": "周宁县",
  "value": "350925" },

{
  "label": "柘荣县",
  "value": "350926" },

{
  "label": "福安市",
  "value": "350981" },

{
  "label": "福鼎市",
  "value": "350982" }]],



[
[{
  "label": "东湖区",
  "value": "360102" },

{
  "label": "西湖区",
  "value": "360103" },

{
  "label": "青云谱区",
  "value": "360104" },

{
  "label": "湾里区",
  "value": "360105" },

{
  "label": "青山湖区",
  "value": "360111" },

{
  "label": "新建区",
  "value": "360112" },

{
  "label": "南昌县",
  "value": "360121" },

{
  "label": "安义县",
  "value": "360123" },

{
  "label": "进贤县",
  "value": "360124" }],


[{
  "label": "昌江区",
  "value": "360202" },

{
  "label": "珠山区",
  "value": "360203" },

{
  "label": "浮梁县",
  "value": "360222" },

{
  "label": "乐平市",
  "value": "360281" }],


[{
  "label": "安源区",
  "value": "360302" },

{
  "label": "湘东区",
  "value": "360313" },

{
  "label": "莲花县",
  "value": "360321" },

{
  "label": "上栗县",
  "value": "360322" },

{
  "label": "芦溪县",
  "value": "360323" }],


[{
  "label": "濂溪区",
  "value": "360402" },

{
  "label": "浔阳区",
  "value": "360403" },

{
  "label": "柴桑区",
  "value": "360404" },

{
  "label": "武宁县",
  "value": "360423" },

{
  "label": "修水县",
  "value": "360424" },

{
  "label": "永修县",
  "value": "360425" },

{
  "label": "德安县",
  "value": "360426" },

{
  "label": "都昌县",
  "value": "360428" },

{
  "label": "湖口县",
  "value": "360429" },

{
  "label": "彭泽县",
  "value": "360430" },

{
  "label": "瑞昌市",
  "value": "360481" },

{
  "label": "共青城市",
  "value": "360482" },

{
  "label": "庐山市",
  "value": "360483" }],


[{
  "label": "渝水区",
  "value": "360502" },

{
  "label": "分宜县",
  "value": "360521" }],


[{
  "label": "月湖区",
  "value": "360602" },

{
  "label": "余江县",
  "value": "360622" },

{
  "label": "贵溪市",
  "value": "360681" }],


[{
  "label": "章贡区",
  "value": "360702" },

{
  "label": "南康区",
  "value": "360703" },

{
  "label": "赣县区",
  "value": "360704" },

{
  "label": "信丰县",
  "value": "360722" },

{
  "label": "大余县",
  "value": "360723" },

{
  "label": "上犹县",
  "value": "360724" },

{
  "label": "崇义县",
  "value": "360725" },

{
  "label": "安远县",
  "value": "360726" },

{
  "label": "龙南县",
  "value": "360727" },

{
  "label": "定南县",
  "value": "360728" },

{
  "label": "全南县",
  "value": "360729" },

{
  "label": "宁都县",
  "value": "360730" },

{
  "label": "于都县",
  "value": "360731" },

{
  "label": "兴国县",
  "value": "360732" },

{
  "label": "会昌县",
  "value": "360733" },

{
  "label": "寻乌县",
  "value": "360734" },

{
  "label": "石城县",
  "value": "360735" },

{
  "label": "瑞金市",
  "value": "360781" }],


[{
  "label": "吉州区",
  "value": "360802" },

{
  "label": "青原区",
  "value": "360803" },

{
  "label": "吉安县",
  "value": "360821" },

{
  "label": "吉水县",
  "value": "360822" },

{
  "label": "峡江县",
  "value": "360823" },

{
  "label": "新干县",
  "value": "360824" },

{
  "label": "永丰县",
  "value": "360825" },

{
  "label": "泰和县",
  "value": "360826" },

{
  "label": "遂川县",
  "value": "360827" },

{
  "label": "万安县",
  "value": "360828" },

{
  "label": "安福县",
  "value": "360829" },

{
  "label": "永新县",
  "value": "360830" },

{
  "label": "井冈山市",
  "value": "360881" }],


[{
  "label": "袁州区",
  "value": "360902" },

{
  "label": "奉新县",
  "value": "360921" },

{
  "label": "万载县",
  "value": "360922" },

{
  "label": "上高县",
  "value": "360923" },

{
  "label": "宜丰县",
  "value": "360924" },

{
  "label": "靖安县",
  "value": "360925" },

{
  "label": "铜鼓县",
  "value": "360926" },

{
  "label": "丰城市",
  "value": "360981" },

{
  "label": "樟树市",
  "value": "360982" },

{
  "label": "高安市",
  "value": "360983" }],


[{
  "label": "临川区",
  "value": "361002" },

{
  "label": "东乡区",
  "value": "361003" },

{
  "label": "南城县",
  "value": "361021" },

{
  "label": "黎川县",
  "value": "361022" },

{
  "label": "南丰县",
  "value": "361023" },

{
  "label": "崇仁县",
  "value": "361024" },

{
  "label": "乐安县",
  "value": "361025" },

{
  "label": "宜黄县",
  "value": "361026" },

{
  "label": "金溪县",
  "value": "361027" },

{
  "label": "资溪县",
  "value": "361028" },

{
  "label": "广昌县",
  "value": "361030" }],


[{
  "label": "信州区",
  "value": "361102" },

{
  "label": "广丰区",
  "value": "361103" },

{
  "label": "上饶县",
  "value": "361121" },

{
  "label": "玉山县",
  "value": "361123" },

{
  "label": "铅山县",
  "value": "361124" },

{
  "label": "横峰县",
  "value": "361125" },

{
  "label": "弋阳县",
  "value": "361126" },

{
  "label": "余干县",
  "value": "361127" },

{
  "label": "鄱阳县",
  "value": "361128" },

{
  "label": "万年县",
  "value": "361129" },

{
  "label": "婺源县",
  "value": "361130" },

{
  "label": "德兴市",
  "value": "361181" }]],



[
[{
  "label": "历下区",
  "value": "370102" },

{
  "label": "市中区",
  "value": "370103" },

{
  "label": "槐荫区",
  "value": "370104" },

{
  "label": "天桥区",
  "value": "370105" },

{
  "label": "历城区",
  "value": "370112" },

{
  "label": "长清区",
  "value": "370113" },

{
  "label": "章丘区",
  "value": "370114" },

{
  "label": "平阴县",
  "value": "370124" },

{
  "label": "济阳县",
  "value": "370125" },

{
  "label": "商河县",
  "value": "370126" },

{
  "label": "济南高新技术产业开发区",
  "value": "370171" }],


[{
  "label": "市南区",
  "value": "370202" },

{
  "label": "市北区",
  "value": "370203" },

{
  "label": "黄岛区",
  "value": "370211" },

{
  "label": "崂山区",
  "value": "370212" },

{
  "label": "李沧区",
  "value": "370213" },

{
  "label": "城阳区",
  "value": "370214" },

{
  "label": "即墨区",
  "value": "370215" },

{
  "label": "青岛高新技术产业开发区",
  "value": "370271" },

{
  "label": "胶州市",
  "value": "370281" },

{
  "label": "平度市",
  "value": "370283" },

{
  "label": "莱西市",
  "value": "370285" }],


[{
  "label": "淄川区",
  "value": "370302" },

{
  "label": "张店区",
  "value": "370303" },

{
  "label": "博山区",
  "value": "370304" },

{
  "label": "临淄区",
  "value": "370305" },

{
  "label": "周村区",
  "value": "370306" },

{
  "label": "桓台县",
  "value": "370321" },

{
  "label": "高青县",
  "value": "370322" },

{
  "label": "沂源县",
  "value": "370323" }],


[{
  "label": "市中区",
  "value": "370402" },

{
  "label": "薛城区",
  "value": "370403" },

{
  "label": "峄城区",
  "value": "370404" },

{
  "label": "台儿庄区",
  "value": "370405" },

{
  "label": "山亭区",
  "value": "370406" },

{
  "label": "滕州市",
  "value": "370481" }],


[{
  "label": "东营区",
  "value": "370502" },

{
  "label": "河口区",
  "value": "370503" },

{
  "label": "垦利区",
  "value": "370505" },

{
  "label": "利津县",
  "value": "370522" },

{
  "label": "广饶县",
  "value": "370523" },

{
  "label": "东营经济技术开发区",
  "value": "370571" },

{
  "label": "东营港经济开发区",
  "value": "370572" }],


[{
  "label": "芝罘区",
  "value": "370602" },

{
  "label": "福山区",
  "value": "370611" },

{
  "label": "牟平区",
  "value": "370612" },

{
  "label": "莱山区",
  "value": "370613" },

{
  "label": "长岛县",
  "value": "370634" },

{
  "label": "烟台高新技术产业开发区",
  "value": "370671" },

{
  "label": "烟台经济技术开发区",
  "value": "370672" },

{
  "label": "龙口市",
  "value": "370681" },

{
  "label": "莱阳市",
  "value": "370682" },

{
  "label": "莱州市",
  "value": "370683" },

{
  "label": "蓬莱市",
  "value": "370684" },

{
  "label": "招远市",
  "value": "370685" },

{
  "label": "栖霞市",
  "value": "370686" },

{
  "label": "海阳市",
  "value": "370687" }],


[{
  "label": "潍城区",
  "value": "370702" },

{
  "label": "寒亭区",
  "value": "370703" },

{
  "label": "坊子区",
  "value": "370704" },

{
  "label": "奎文区",
  "value": "370705" },

{
  "label": "临朐县",
  "value": "370724" },

{
  "label": "昌乐县",
  "value": "370725" },

{
  "label": "潍坊滨海经济技术开发区",
  "value": "370772" },

{
  "label": "青州市",
  "value": "370781" },

{
  "label": "诸城市",
  "value": "370782" },

{
  "label": "寿光市",
  "value": "370783" },

{
  "label": "安丘市",
  "value": "370784" },

{
  "label": "高密市",
  "value": "370785" },

{
  "label": "昌邑市",
  "value": "370786" }],


[{
  "label": "任城区",
  "value": "370811" },

{
  "label": "兖州区",
  "value": "370812" },

{
  "label": "微山县",
  "value": "370826" },

{
  "label": "鱼台县",
  "value": "370827" },

{
  "label": "金乡县",
  "value": "370828" },

{
  "label": "嘉祥县",
  "value": "370829" },

{
  "label": "汶上县",
  "value": "370830" },

{
  "label": "泗水县",
  "value": "370831" },

{
  "label": "梁山县",
  "value": "370832" },

{
  "label": "济宁高新技术产业开发区",
  "value": "370871" },

{
  "label": "曲阜市",
  "value": "370881" },

{
  "label": "邹城市",
  "value": "370883" }],


[{
  "label": "泰山区",
  "value": "370902" },

{
  "label": "岱岳区",
  "value": "370911" },

{
  "label": "宁阳县",
  "value": "370921" },

{
  "label": "东平县",
  "value": "370923" },

{
  "label": "新泰市",
  "value": "370982" },

{
  "label": "肥城市",
  "value": "370983" }],


[{
  "label": "环翠区",
  "value": "371002" },

{
  "label": "文登区",
  "value": "371003" },

{
  "label": "威海火炬高技术产业开发区",
  "value": "371071" },

{
  "label": "威海经济技术开发区",
  "value": "371072" },

{
  "label": "威海临港经济技术开发区",
  "value": "371073" },

{
  "label": "荣成市",
  "value": "371082" },

{
  "label": "乳山市",
  "value": "371083" }],


[{
  "label": "东港区",
  "value": "371102" },

{
  "label": "岚山区",
  "value": "371103" },

{
  "label": "五莲县",
  "value": "371121" },

{
  "label": "莒县",
  "value": "371122" },

{
  "label": "日照经济技术开发区",
  "value": "371171" },

{
  "label": "日照国际海洋城",
  "value": "371172" }],


[{
  "label": "莱城区",
  "value": "371202" },

{
  "label": "钢城区",
  "value": "371203" }],


[{
  "label": "兰山区",
  "value": "371302" },

{
  "label": "罗庄区",
  "value": "371311" },

{
  "label": "河东区",
  "value": "371312" },

{
  "label": "沂南县",
  "value": "371321" },

{
  "label": "郯城县",
  "value": "371322" },

{
  "label": "沂水县",
  "value": "371323" },

{
  "label": "兰陵县",
  "value": "371324" },

{
  "label": "费县",
  "value": "371325" },

{
  "label": "平邑县",
  "value": "371326" },

{
  "label": "莒南县",
  "value": "371327" },

{
  "label": "蒙阴县",
  "value": "371328" },

{
  "label": "临沭县",
  "value": "371329" },

{
  "label": "临沂高新技术产业开发区",
  "value": "371371" },

{
  "label": "临沂经济技术开发区",
  "value": "371372" },

{
  "label": "临沂临港经济开发区",
  "value": "371373" }],


[{
  "label": "德城区",
  "value": "371402" },

{
  "label": "陵城区",
  "value": "371403" },

{
  "label": "宁津县",
  "value": "371422" },

{
  "label": "庆云县",
  "value": "371423" },

{
  "label": "临邑县",
  "value": "371424" },

{
  "label": "齐河县",
  "value": "371425" },

{
  "label": "平原县",
  "value": "371426" },

{
  "label": "夏津县",
  "value": "371427" },

{
  "label": "武城县",
  "value": "371428" },

{
  "label": "德州经济技术开发区",
  "value": "371471" },

{
  "label": "德州运河经济开发区",
  "value": "371472" },

{
  "label": "乐陵市",
  "value": "371481" },

{
  "label": "禹城市",
  "value": "371482" }],


[{
  "label": "东昌府区",
  "value": "371502" },

{
  "label": "阳谷县",
  "value": "371521" },

{
  "label": "莘县",
  "value": "371522" },

{
  "label": "茌平县",
  "value": "371523" },

{
  "label": "东阿县",
  "value": "371524" },

{
  "label": "冠县",
  "value": "371525" },

{
  "label": "高唐县",
  "value": "371526" },

{
  "label": "临清市",
  "value": "371581" }],


[{
  "label": "滨城区",
  "value": "371602" },

{
  "label": "沾化区",
  "value": "371603" },

{
  "label": "惠民县",
  "value": "371621" },

{
  "label": "阳信县",
  "value": "371622" },

{
  "label": "无棣县",
  "value": "371623" },

{
  "label": "博兴县",
  "value": "371625" },

{
  "label": "邹平县",
  "value": "371626" }],


[{
  "label": "牡丹区",
  "value": "371702" },

{
  "label": "定陶区",
  "value": "371703" },

{
  "label": "曹县",
  "value": "371721" },

{
  "label": "单县",
  "value": "371722" },

{
  "label": "成武县",
  "value": "371723" },

{
  "label": "巨野县",
  "value": "371724" },

{
  "label": "郓城县",
  "value": "371725" },

{
  "label": "鄄城县",
  "value": "371726" },

{
  "label": "东明县",
  "value": "371728" },

{
  "label": "菏泽经济技术开发区",
  "value": "371771" },

{
  "label": "菏泽高新技术开发区",
  "value": "371772" }]],



[
[{
  "label": "中原区",
  "value": "410102" },

{
  "label": "二七区",
  "value": "410103" },

{
  "label": "管城回族区",
  "value": "410104" },

{
  "label": "金水区",
  "value": "410105" },

{
  "label": "上街区",
  "value": "410106" },

{
  "label": "惠济区",
  "value": "410108" },

{
  "label": "中牟县",
  "value": "410122" },

{
  "label": "郑州经济技术开发区",
  "value": "410171" },

{
  "label": "郑州高新技术产业开发区",
  "value": "410172" },

{
  "label": "郑州航空港经济综合实验区",
  "value": "410173" },

{
  "label": "巩义市",
  "value": "410181" },

{
  "label": "荥阳市",
  "value": "410182" },

{
  "label": "新密市",
  "value": "410183" },

{
  "label": "新郑市",
  "value": "410184" },

{
  "label": "登封市",
  "value": "410185" }],


[{
  "label": "龙亭区",
  "value": "410202" },

{
  "label": "顺河回族区",
  "value": "410203" },

{
  "label": "鼓楼区",
  "value": "410204" },

{
  "label": "禹王台区",
  "value": "410205" },

{
  "label": "祥符区",
  "value": "410212" },

{
  "label": "杞县",
  "value": "410221" },

{
  "label": "通许县",
  "value": "410222" },

{
  "label": "尉氏县",
  "value": "410223" },

{
  "label": "兰考县",
  "value": "410225" }],


[{
  "label": "老城区",
  "value": "410302" },

{
  "label": "西工区",
  "value": "410303" },

{
  "label": "瀍河回族区",
  "value": "410304" },

{
  "label": "涧西区",
  "value": "410305" },

{
  "label": "吉利区",
  "value": "410306" },

{
  "label": "洛龙区",
  "value": "410311" },

{
  "label": "孟津县",
  "value": "410322" },

{
  "label": "新安县",
  "value": "410323" },

{
  "label": "栾川县",
  "value": "410324" },

{
  "label": "嵩县",
  "value": "410325" },

{
  "label": "汝阳县",
  "value": "410326" },

{
  "label": "宜阳县",
  "value": "410327" },

{
  "label": "洛宁县",
  "value": "410328" },

{
  "label": "伊川县",
  "value": "410329" },

{
  "label": "洛阳高新技术产业开发区",
  "value": "410371" },

{
  "label": "偃师市",
  "value": "410381" }],


[{
  "label": "新华区",
  "value": "410402" },

{
  "label": "卫东区",
  "value": "410403" },

{
  "label": "石龙区",
  "value": "410404" },

{
  "label": "湛河区",
  "value": "410411" },

{
  "label": "宝丰县",
  "value": "410421" },

{
  "label": "叶县",
  "value": "410422" },

{
  "label": "鲁山县",
  "value": "410423" },

{
  "label": "郏县",
  "value": "410425" },

{
  "label": "平顶山高新技术产业开发区",
  "value": "410471" },

{
  "label": "平顶山市新城区",
  "value": "410472" },

{
  "label": "舞钢市",
  "value": "410481" },

{
  "label": "汝州市",
  "value": "410482" }],


[{
  "label": "文峰区",
  "value": "410502" },

{
  "label": "北关区",
  "value": "410503" },

{
  "label": "殷都区",
  "value": "410505" },

{
  "label": "龙安区",
  "value": "410506" },

{
  "label": "安阳县",
  "value": "410522" },

{
  "label": "汤阴县",
  "value": "410523" },

{
  "label": "滑县",
  "value": "410526" },

{
  "label": "内黄县",
  "value": "410527" },

{
  "label": "安阳高新技术产业开发区",
  "value": "410571" },

{
  "label": "林州市",
  "value": "410581" }],


[{
  "label": "鹤山区",
  "value": "410602" },

{
  "label": "山城区",
  "value": "410603" },

{
  "label": "淇滨区",
  "value": "410611" },

{
  "label": "浚县",
  "value": "410621" },

{
  "label": "淇县",
  "value": "410622" },

{
  "label": "鹤壁经济技术开发区",
  "value": "410671" }],


[{
  "label": "红旗区",
  "value": "410702" },

{
  "label": "卫滨区",
  "value": "410703" },

{
  "label": "凤泉区",
  "value": "410704" },

{
  "label": "牧野区",
  "value": "410711" },

{
  "label": "新乡县",
  "value": "410721" },

{
  "label": "获嘉县",
  "value": "410724" },

{
  "label": "原阳县",
  "value": "410725" },

{
  "label": "延津县",
  "value": "410726" },

{
  "label": "封丘县",
  "value": "410727" },

{
  "label": "长垣县",
  "value": "410728" },

{
  "label": "新乡高新技术产业开发区",
  "value": "410771" },

{
  "label": "新乡经济技术开发区",
  "value": "410772" },

{
  "label": "新乡市平原城乡一体化示范区",
  "value": "410773" },

{
  "label": "卫辉市",
  "value": "410781" },

{
  "label": "辉县市",
  "value": "410782" }],


[{
  "label": "解放区",
  "value": "410802" },

{
  "label": "中站区",
  "value": "410803" },

{
  "label": "马村区",
  "value": "410804" },

{
  "label": "山阳区",
  "value": "410811" },

{
  "label": "修武县",
  "value": "410821" },

{
  "label": "博爱县",
  "value": "410822" },

{
  "label": "武陟县",
  "value": "410823" },

{
  "label": "温县",
  "value": "410825" },

{
  "label": "焦作城乡一体化示范区",
  "value": "410871" },

{
  "label": "沁阳市",
  "value": "410882" },

{
  "label": "孟州市",
  "value": "410883" }],


[{
  "label": "华龙区",
  "value": "410902" },

{
  "label": "清丰县",
  "value": "410922" },

{
  "label": "南乐县",
  "value": "410923" },

{
  "label": "范县",
  "value": "410926" },

{
  "label": "台前县",
  "value": "410927" },

{
  "label": "濮阳县",
  "value": "410928" },

{
  "label": "河南濮阳工业园区",
  "value": "410971" },

{
  "label": "濮阳经济技术开发区",
  "value": "410972" }],


[{
  "label": "魏都区",
  "value": "411002" },

{
  "label": "建安区",
  "value": "411003" },

{
  "label": "鄢陵县",
  "value": "411024" },

{
  "label": "襄城县",
  "value": "411025" },

{
  "label": "许昌经济技术开发区",
  "value": "411071" },

{
  "label": "禹州市",
  "value": "411081" },

{
  "label": "长葛市",
  "value": "411082" }],


[{
  "label": "源汇区",
  "value": "411102" },

{
  "label": "郾城区",
  "value": "411103" },

{
  "label": "召陵区",
  "value": "411104" },

{
  "label": "舞阳县",
  "value": "411121" },

{
  "label": "临颍县",
  "value": "411122" },

{
  "label": "漯河经济技术开发区",
  "value": "411171" }],


[{
  "label": "湖滨区",
  "value": "411202" },

{
  "label": "陕州区",
  "value": "411203" },

{
  "label": "渑池县",
  "value": "411221" },

{
  "label": "卢氏县",
  "value": "411224" },

{
  "label": "河南三门峡经济开发区",
  "value": "411271" },

{
  "label": "义马市",
  "value": "411281" },

{
  "label": "灵宝市",
  "value": "411282" }],


[{
  "label": "宛城区",
  "value": "411302" },

{
  "label": "卧龙区",
  "value": "411303" },

{
  "label": "南召县",
  "value": "411321" },

{
  "label": "方城县",
  "value": "411322" },

{
  "label": "西峡县",
  "value": "411323" },

{
  "label": "镇平县",
  "value": "411324" },

{
  "label": "内乡县",
  "value": "411325" },

{
  "label": "淅川县",
  "value": "411326" },

{
  "label": "社旗县",
  "value": "411327" },

{
  "label": "唐河县",
  "value": "411328" },

{
  "label": "新野县",
  "value": "411329" },

{
  "label": "桐柏县",
  "value": "411330" },

{
  "label": "南阳高新技术产业开发区",
  "value": "411371" },

{
  "label": "南阳市城乡一体化示范区",
  "value": "411372" },

{
  "label": "邓州市",
  "value": "411381" }],


[{
  "label": "梁园区",
  "value": "411402" },

{
  "label": "睢阳区",
  "value": "411403" },

{
  "label": "民权县",
  "value": "411421" },

{
  "label": "睢县",
  "value": "411422" },

{
  "label": "宁陵县",
  "value": "411423" },

{
  "label": "柘城县",
  "value": "411424" },

{
  "label": "虞城县",
  "value": "411425" },

{
  "label": "夏邑县",
  "value": "411426" },

{
  "label": "豫东综合物流产业聚集区",
  "value": "411471" },

{
  "label": "河南商丘经济开发区",
  "value": "411472" },

{
  "label": "永城市",
  "value": "411481" }],


[{
  "label": "浉河区",
  "value": "411502" },

{
  "label": "平桥区",
  "value": "411503" },

{
  "label": "罗山县",
  "value": "411521" },

{
  "label": "光山县",
  "value": "411522" },

{
  "label": "新县",
  "value": "411523" },

{
  "label": "商城县",
  "value": "411524" },

{
  "label": "固始县",
  "value": "411525" },

{
  "label": "潢川县",
  "value": "411526" },

{
  "label": "淮滨县",
  "value": "411527" },

{
  "label": "息县",
  "value": "411528" },

{
  "label": "信阳高新技术产业开发区",
  "value": "411571" }],


[{
  "label": "川汇区",
  "value": "411602" },

{
  "label": "扶沟县",
  "value": "411621" },

{
  "label": "西华县",
  "value": "411622" },

{
  "label": "商水县",
  "value": "411623" },

{
  "label": "沈丘县",
  "value": "411624" },

{
  "label": "郸城县",
  "value": "411625" },

{
  "label": "淮阳县",
  "value": "411626" },

{
  "label": "太康县",
  "value": "411627" },

{
  "label": "鹿邑县",
  "value": "411628" },

{
  "label": "河南周口经济开发区",
  "value": "411671" },

{
  "label": "项城市",
  "value": "411681" }],


[{
  "label": "驿城区",
  "value": "411702" },

{
  "label": "西平县",
  "value": "411721" },

{
  "label": "上蔡县",
  "value": "411722" },

{
  "label": "平舆县",
  "value": "411723" },

{
  "label": "正阳县",
  "value": "411724" },

{
  "label": "确山县",
  "value": "411725" },

{
  "label": "泌阳县",
  "value": "411726" },

{
  "label": "汝南县",
  "value": "411727" },

{
  "label": "遂平县",
  "value": "411728" },

{
  "label": "新蔡县",
  "value": "411729" },

{
  "label": "河南驻马店经济开发区",
  "value": "411771" }],


[{
  "label": "济源市",
  "value": "419001" }]],


[
[{
  "label": "江岸区",
  "value": "420102" },

{
  "label": "江汉区",
  "value": "420103" },

{
  "label": "硚口区",
  "value": "420104" },

{
  "label": "汉阳区",
  "value": "420105" },

{
  "label": "武昌区",
  "value": "420106" },

{
  "label": "青山区",
  "value": "420107" },

{
  "label": "洪山区",
  "value": "420111" },

{
  "label": "东西湖区",
  "value": "420112" },

{
  "label": "汉南区",
  "value": "420113" },

{
  "label": "蔡甸区",
  "value": "420114" },

{
  "label": "江夏区",
  "value": "420115" },

{
  "label": "黄陂区",
  "value": "420116" },

{
  "label": "新洲区",
  "value": "420117" }],


[{
  "label": "黄石港区",
  "value": "420202" },

{
  "label": "西塞山区",
  "value": "420203" },

{
  "label": "下陆区",
  "value": "420204" },

{
  "label": "铁山区",
  "value": "420205" },

{
  "label": "阳新县",
  "value": "420222" },

{
  "label": "大冶市",
  "value": "420281" }],


[{
  "label": "茅箭区",
  "value": "420302" },

{
  "label": "张湾区",
  "value": "420303" },

{
  "label": "郧阳区",
  "value": "420304" },

{
  "label": "郧西县",
  "value": "420322" },

{
  "label": "竹山县",
  "value": "420323" },

{
  "label": "竹溪县",
  "value": "420324" },

{
  "label": "房县",
  "value": "420325" },

{
  "label": "丹江口市",
  "value": "420381" }],


[{
  "label": "西陵区",
  "value": "420502" },

{
  "label": "伍家岗区",
  "value": "420503" },

{
  "label": "点军区",
  "value": "420504" },

{
  "label": "猇亭区",
  "value": "420505" },

{
  "label": "夷陵区",
  "value": "420506" },

{
  "label": "远安县",
  "value": "420525" },

{
  "label": "兴山县",
  "value": "420526" },

{
  "label": "秭归县",
  "value": "420527" },

{
  "label": "长阳土家族自治县",
  "value": "420528" },

{
  "label": "五峰土家族自治县",
  "value": "420529" },

{
  "label": "宜都市",
  "value": "420581" },

{
  "label": "当阳市",
  "value": "420582" },

{
  "label": "枝江市",
  "value": "420583" }],


[{
  "label": "襄城区",
  "value": "420602" },

{
  "label": "樊城区",
  "value": "420606" },

{
  "label": "襄州区",
  "value": "420607" },

{
  "label": "南漳县",
  "value": "420624" },

{
  "label": "谷城县",
  "value": "420625" },

{
  "label": "保康县",
  "value": "420626" },

{
  "label": "老河口市",
  "value": "420682" },

{
  "label": "枣阳市",
  "value": "420683" },

{
  "label": "宜城市",
  "value": "420684" }],


[{
  "label": "梁子湖区",
  "value": "420702" },

{
  "label": "华容区",
  "value": "420703" },

{
  "label": "鄂城区",
  "value": "420704" }],


[{
  "label": "东宝区",
  "value": "420802" },

{
  "label": "掇刀区",
  "value": "420804" },

{
  "label": "京山县",
  "value": "420821" },

{
  "label": "沙洋县",
  "value": "420822" },

{
  "label": "钟祥市",
  "value": "420881" }],


[{
  "label": "孝南区",
  "value": "420902" },

{
  "label": "孝昌县",
  "value": "420921" },

{
  "label": "大悟县",
  "value": "420922" },

{
  "label": "云梦县",
  "value": "420923" },

{
  "label": "应城市",
  "value": "420981" },

{
  "label": "安陆市",
  "value": "420982" },

{
  "label": "汉川市",
  "value": "420984" }],


[{
  "label": "沙市区",
  "value": "421002" },

{
  "label": "荆州区",
  "value": "421003" },

{
  "label": "公安县",
  "value": "421022" },

{
  "label": "监利县",
  "value": "421023" },

{
  "label": "江陵县",
  "value": "421024" },

{
  "label": "荆州经济技术开发区",
  "value": "421071" },

{
  "label": "石首市",
  "value": "421081" },

{
  "label": "洪湖市",
  "value": "421083" },

{
  "label": "松滋市",
  "value": "421087" }],


[{
  "label": "黄州区",
  "value": "421102" },

{
  "label": "团风县",
  "value": "421121" },

{
  "label": "红安县",
  "value": "421122" },

{
  "label": "罗田县",
  "value": "421123" },

{
  "label": "英山县",
  "value": "421124" },

{
  "label": "浠水县",
  "value": "421125" },

{
  "label": "蕲春县",
  "value": "421126" },

{
  "label": "黄梅县",
  "value": "421127" },

{
  "label": "龙感湖管理区",
  "value": "421171" },

{
  "label": "麻城市",
  "value": "421181" },

{
  "label": "武穴市",
  "value": "421182" }],


[{
  "label": "咸安区",
  "value": "421202" },

{
  "label": "嘉鱼县",
  "value": "421221" },

{
  "label": "通城县",
  "value": "421222" },

{
  "label": "崇阳县",
  "value": "421223" },

{
  "label": "通山县",
  "value": "421224" },

{
  "label": "赤壁市",
  "value": "421281" }],


[{
  "label": "曾都区",
  "value": "421303" },

{
  "label": "随县",
  "value": "421321" },

{
  "label": "广水市",
  "value": "421381" }],


[{
  "label": "恩施市",
  "value": "422801" },

{
  "label": "利川市",
  "value": "422802" },

{
  "label": "建始县",
  "value": "422822" },

{
  "label": "巴东县",
  "value": "422823" },

{
  "label": "宣恩县",
  "value": "422825" },

{
  "label": "咸丰县",
  "value": "422826" },

{
  "label": "来凤县",
  "value": "422827" },

{
  "label": "鹤峰县",
  "value": "422828" }],


[{
  "label": "仙桃市",
  "value": "429004" },

{
  "label": "潜江市",
  "value": "429005" },

{
  "label": "天门市",
  "value": "429006" },

{
  "label": "神农架林区",
  "value": "429021" }]],



[
[{
  "label": "芙蓉区",
  "value": "430102" },

{
  "label": "天心区",
  "value": "430103" },

{
  "label": "岳麓区",
  "value": "430104" },

{
  "label": "开福区",
  "value": "430105" },

{
  "label": "雨花区",
  "value": "430111" },

{
  "label": "望城区",
  "value": "430112" },

{
  "label": "长沙县",
  "value": "430121" },

{
  "label": "浏阳市",
  "value": "430181" },

{
  "label": "宁乡市",
  "value": "430182" }],


[{
  "label": "荷塘区",
  "value": "430202" },

{
  "label": "芦淞区",
  "value": "430203" },

{
  "label": "石峰区",
  "value": "430204" },

{
  "label": "天元区",
  "value": "430211" },

{
  "label": "株洲县",
  "value": "430221" },

{
  "label": "攸县",
  "value": "430223" },

{
  "label": "茶陵县",
  "value": "430224" },

{
  "label": "炎陵县",
  "value": "430225" },

{
  "label": "云龙示范区",
  "value": "430271" },

{
  "label": "醴陵市",
  "value": "430281" }],


[{
  "label": "雨湖区",
  "value": "430302" },

{
  "label": "岳塘区",
  "value": "430304" },

{
  "label": "湘潭县",
  "value": "430321" },

{
  "label": "湖南湘潭高新技术产业园区",
  "value": "430371" },

{
  "label": "湘潭昭山示范区",
  "value": "430372" },

{
  "label": "湘潭九华示范区",
  "value": "430373" },

{
  "label": "湘乡市",
  "value": "430381" },

{
  "label": "韶山市",
  "value": "430382" }],


[{
  "label": "珠晖区",
  "value": "430405" },

{
  "label": "雁峰区",
  "value": "430406" },

{
  "label": "石鼓区",
  "value": "430407" },

{
  "label": "蒸湘区",
  "value": "430408" },

{
  "label": "南岳区",
  "value": "430412" },

{
  "label": "衡阳县",
  "value": "430421" },

{
  "label": "衡南县",
  "value": "430422" },

{
  "label": "衡山县",
  "value": "430423" },

{
  "label": "衡东县",
  "value": "430424" },

{
  "label": "祁东县",
  "value": "430426" },

{
  "label": "衡阳综合保税区",
  "value": "430471" },

{
  "label": "湖南衡阳高新技术产业园区",
  "value": "430472" },

{
  "label": "湖南衡阳松木经济开发区",
  "value": "430473" },

{
  "label": "耒阳市",
  "value": "430481" },

{
  "label": "常宁市",
  "value": "430482" }],


[{
  "label": "双清区",
  "value": "430502" },

{
  "label": "大祥区",
  "value": "430503" },

{
  "label": "北塔区",
  "value": "430511" },

{
  "label": "邵东县",
  "value": "430521" },

{
  "label": "新邵县",
  "value": "430522" },

{
  "label": "邵阳县",
  "value": "430523" },

{
  "label": "隆回县",
  "value": "430524" },

{
  "label": "洞口县",
  "value": "430525" },

{
  "label": "绥宁县",
  "value": "430527" },

{
  "label": "新宁县",
  "value": "430528" },

{
  "label": "城步苗族自治县",
  "value": "430529" },

{
  "label": "武冈市",
  "value": "430581" }],


[{
  "label": "岳阳楼区",
  "value": "430602" },

{
  "label": "云溪区",
  "value": "430603" },

{
  "label": "君山区",
  "value": "430611" },

{
  "label": "岳阳县",
  "value": "430621" },

{
  "label": "华容县",
  "value": "430623" },

{
  "label": "湘阴县",
  "value": "430624" },

{
  "label": "平江县",
  "value": "430626" },

{
  "label": "岳阳市屈原管理区",
  "value": "430671" },

{
  "label": "汨罗市",
  "value": "430681" },

{
  "label": "临湘市",
  "value": "430682" }],


[{
  "label": "武陵区",
  "value": "430702" },

{
  "label": "鼎城区",
  "value": "430703" },

{
  "label": "安乡县",
  "value": "430721" },

{
  "label": "汉寿县",
  "value": "430722" },

{
  "label": "澧县",
  "value": "430723" },

{
  "label": "临澧县",
  "value": "430724" },

{
  "label": "桃源县",
  "value": "430725" },

{
  "label": "石门县",
  "value": "430726" },

{
  "label": "常德市西洞庭管理区",
  "value": "430771" },

{
  "label": "津市市",
  "value": "430781" }],


[{
  "label": "永定区",
  "value": "430802" },

{
  "label": "武陵源区",
  "value": "430811" },

{
  "label": "慈利县",
  "value": "430821" },

{
  "label": "桑植县",
  "value": "430822" }],


[{
  "label": "资阳区",
  "value": "430902" },

{
  "label": "赫山区",
  "value": "430903" },

{
  "label": "南县",
  "value": "430921" },

{
  "label": "桃江县",
  "value": "430922" },

{
  "label": "安化县",
  "value": "430923" },

{
  "label": "益阳市大通湖管理区",
  "value": "430971" },

{
  "label": "湖南益阳高新技术产业园区",
  "value": "430972" },

{
  "label": "沅江市",
  "value": "430981" }],


[{
  "label": "北湖区",
  "value": "431002" },

{
  "label": "苏仙区",
  "value": "431003" },

{
  "label": "桂阳县",
  "value": "431021" },

{
  "label": "宜章县",
  "value": "431022" },

{
  "label": "永兴县",
  "value": "431023" },

{
  "label": "嘉禾县",
  "value": "431024" },

{
  "label": "临武县",
  "value": "431025" },

{
  "label": "汝城县",
  "value": "431026" },

{
  "label": "桂东县",
  "value": "431027" },

{
  "label": "安仁县",
  "value": "431028" },

{
  "label": "资兴市",
  "value": "431081" }],


[{
  "label": "零陵区",
  "value": "431102" },

{
  "label": "冷水滩区",
  "value": "431103" },

{
  "label": "祁阳县",
  "value": "431121" },

{
  "label": "东安县",
  "value": "431122" },

{
  "label": "双牌县",
  "value": "431123" },

{
  "label": "道县",
  "value": "431124" },

{
  "label": "江永县",
  "value": "431125" },

{
  "label": "宁远县",
  "value": "431126" },

{
  "label": "蓝山县",
  "value": "431127" },

{
  "label": "新田县",
  "value": "431128" },

{
  "label": "江华瑶族自治县",
  "value": "431129" },

{
  "label": "永州经济技术开发区",
  "value": "431171" },

{
  "label": "永州市金洞管理区",
  "value": "431172" },

{
  "label": "永州市回龙圩管理区",
  "value": "431173" }],


[{
  "label": "鹤城区",
  "value": "431202" },

{
  "label": "中方县",
  "value": "431221" },

{
  "label": "沅陵县",
  "value": "431222" },

{
  "label": "辰溪县",
  "value": "431223" },

{
  "label": "溆浦县",
  "value": "431224" },

{
  "label": "会同县",
  "value": "431225" },

{
  "label": "麻阳苗族自治县",
  "value": "431226" },

{
  "label": "新晃侗族自治县",
  "value": "431227" },

{
  "label": "芷江侗族自治县",
  "value": "431228" },

{
  "label": "靖州苗族侗族自治县",
  "value": "431229" },

{
  "label": "通道侗族自治县",
  "value": "431230" },

{
  "label": "怀化市洪江管理区",
  "value": "431271" },

{
  "label": "洪江市",
  "value": "431281" }],


[{
  "label": "娄星区",
  "value": "431302" },

{
  "label": "双峰县",
  "value": "431321" },

{
  "label": "新化县",
  "value": "431322" },

{
  "label": "冷水江市",
  "value": "431381" },

{
  "label": "涟源市",
  "value": "431382" }],


[{
  "label": "吉首市",
  "value": "433101" },

{
  "label": "泸溪县",
  "value": "433122" },

{
  "label": "凤凰县",
  "value": "433123" },

{
  "label": "花垣县",
  "value": "433124" },

{
  "label": "保靖县",
  "value": "433125" },

{
  "label": "古丈县",
  "value": "433126" },

{
  "label": "永顺县",
  "value": "433127" },

{
  "label": "龙山县",
  "value": "433130" },

{
  "label": "湖南吉首经济开发区",
  "value": "433172" },

{
  "label": "湖南永顺经济开发区",
  "value": "433173" }]],



[
[{
  "label": "荔湾区",
  "value": "440103" },

{
  "label": "越秀区",
  "value": "440104" },

{
  "label": "海珠区",
  "value": "440105" },

{
  "label": "天河区",
  "value": "440106" },

{
  "label": "白云区",
  "value": "440111" },

{
  "label": "黄埔区",
  "value": "440112" },

{
  "label": "番禺区",
  "value": "440113" },

{
  "label": "花都区",
  "value": "440114" },

{
  "label": "南沙区",
  "value": "440115" },

{
  "label": "从化区",
  "value": "440117" },

{
  "label": "增城区",
  "value": "440118" }],


[{
  "label": "武江区",
  "value": "440203" },

{
  "label": "浈江区",
  "value": "440204" },

{
  "label": "曲江区",
  "value": "440205" },

{
  "label": "始兴县",
  "value": "440222" },

{
  "label": "仁化县",
  "value": "440224" },

{
  "label": "翁源县",
  "value": "440229" },

{
  "label": "乳源瑶族自治县",
  "value": "440232" },

{
  "label": "新丰县",
  "value": "440233" },

{
  "label": "乐昌市",
  "value": "440281" },

{
  "label": "南雄市",
  "value": "440282" }],


[{
  "label": "罗湖区",
  "value": "440303" },

{
  "label": "福田区",
  "value": "440304" },

{
  "label": "南山区",
  "value": "440305" },

{
  "label": "宝安区",
  "value": "440306" },

{
  "label": "龙岗区",
  "value": "440307" },

{
  "label": "盐田区",
  "value": "440308" },

{
  "label": "龙华区",
  "value": "440309" },

{
  "label": "坪山区",
  "value": "440310" }],


[{
  "label": "香洲区",
  "value": "440402" },

{
  "label": "斗门区",
  "value": "440403" },

{
  "label": "金湾区",
  "value": "440404" }],


[{
  "label": "龙湖区",
  "value": "440507" },

{
  "label": "金平区",
  "value": "440511" },

{
  "label": "濠江区",
  "value": "440512" },

{
  "label": "潮阳区",
  "value": "440513" },

{
  "label": "潮南区",
  "value": "440514" },

{
  "label": "澄海区",
  "value": "440515" },

{
  "label": "南澳县",
  "value": "440523" }],


[{
  "label": "禅城区",
  "value": "440604" },

{
  "label": "南海区",
  "value": "440605" },

{
  "label": "顺德区",
  "value": "440606" },

{
  "label": "三水区",
  "value": "440607" },

{
  "label": "高明区",
  "value": "440608" }],


[{
  "label": "蓬江区",
  "value": "440703" },

{
  "label": "江海区",
  "value": "440704" },

{
  "label": "新会区",
  "value": "440705" },

{
  "label": "台山市",
  "value": "440781" },

{
  "label": "开平市",
  "value": "440783" },

{
  "label": "鹤山市",
  "value": "440784" },

{
  "label": "恩平市",
  "value": "440785" }],


[{
  "label": "赤坎区",
  "value": "440802" },

{
  "label": "霞山区",
  "value": "440803" },

{
  "label": "坡头区",
  "value": "440804" },

{
  "label": "麻章区",
  "value": "440811" },

{
  "label": "遂溪县",
  "value": "440823" },

{
  "label": "徐闻县",
  "value": "440825" },

{
  "label": "廉江市",
  "value": "440881" },

{
  "label": "雷州市",
  "value": "440882" },

{
  "label": "吴川市",
  "value": "440883" }],


[{
  "label": "茂南区",
  "value": "440902" },

{
  "label": "电白区",
  "value": "440904" },

{
  "label": "高州市",
  "value": "440981" },

{
  "label": "化州市",
  "value": "440982" },

{
  "label": "信宜市",
  "value": "440983" }],


[{
  "label": "端州区",
  "value": "441202" },

{
  "label": "鼎湖区",
  "value": "441203" },

{
  "label": "高要区",
  "value": "441204" },

{
  "label": "广宁县",
  "value": "441223" },

{
  "label": "怀集县",
  "value": "441224" },

{
  "label": "封开县",
  "value": "441225" },

{
  "label": "德庆县",
  "value": "441226" },

{
  "label": "四会市",
  "value": "441284" }],


[{
  "label": "惠城区",
  "value": "441302" },

{
  "label": "惠阳区",
  "value": "441303" },

{
  "label": "博罗县",
  "value": "441322" },

{
  "label": "惠东县",
  "value": "441323" },

{
  "label": "龙门县",
  "value": "441324" }],


[{
  "label": "梅江区",
  "value": "441402" },

{
  "label": "梅县区",
  "value": "441403" },

{
  "label": "大埔县",
  "value": "441422" },

{
  "label": "丰顺县",
  "value": "441423" },

{
  "label": "五华县",
  "value": "441424" },

{
  "label": "平远县",
  "value": "441426" },

{
  "label": "蕉岭县",
  "value": "441427" },

{
  "label": "兴宁市",
  "value": "441481" }],


[{
  "label": "城区",
  "value": "441502" },

{
  "label": "海丰县",
  "value": "441521" },

{
  "label": "陆河县",
  "value": "441523" },

{
  "label": "陆丰市",
  "value": "441581" }],


[{
  "label": "源城区",
  "value": "441602" },

{
  "label": "紫金县",
  "value": "441621" },

{
  "label": "龙川县",
  "value": "441622" },

{
  "label": "连平县",
  "value": "441623" },

{
  "label": "和平县",
  "value": "441624" },

{
  "label": "东源县",
  "value": "441625" }],


[{
  "label": "江城区",
  "value": "441702" },

{
  "label": "阳东区",
  "value": "441704" },

{
  "label": "阳西县",
  "value": "441721" },

{
  "label": "阳春市",
  "value": "441781" }],


[{
  "label": "清城区",
  "value": "441802" },

{
  "label": "清新区",
  "value": "441803" },

{
  "label": "佛冈县",
  "value": "441821" },

{
  "label": "阳山县",
  "value": "441823" },

{
  "label": "连山壮族瑶族自治县",
  "value": "441825" },

{
  "label": "连南瑶族自治县",
  "value": "441826" },

{
  "label": "英德市",
  "value": "441881" },

{
  "label": "连州市",
  "value": "441882" }],


[{
  "label": "东莞市",
  "value": "441900" }],

[{
  "label": "中山市",
  "value": "442000" }],

[{
  "label": "湘桥区",
  "value": "445102" },

{
  "label": "潮安区",
  "value": "445103" },

{
  "label": "饶平县",
  "value": "445122" }],


[{
  "label": "榕城区",
  "value": "445202" },

{
  "label": "揭东区",
  "value": "445203" },

{
  "label": "揭西县",
  "value": "445222" },

{
  "label": "惠来县",
  "value": "445224" },

{
  "label": "普宁市",
  "value": "445281" }],


[{
  "label": "云城区",
  "value": "445302" },

{
  "label": "云安区",
  "value": "445303" },

{
  "label": "新兴县",
  "value": "445321" },

{
  "label": "郁南县",
  "value": "445322" },

{
  "label": "罗定市",
  "value": "445381" }]],



[
[{
  "label": "兴宁区",
  "value": "450102" },

{
  "label": "青秀区",
  "value": "450103" },

{
  "label": "江南区",
  "value": "450105" },

{
  "label": "西乡塘区",
  "value": "450107" },

{
  "label": "良庆区",
  "value": "450108" },

{
  "label": "邕宁区",
  "value": "450109" },

{
  "label": "武鸣区",
  "value": "450110" },

{
  "label": "隆安县",
  "value": "450123" },

{
  "label": "马山县",
  "value": "450124" },

{
  "label": "上林县",
  "value": "450125" },

{
  "label": "宾阳县",
  "value": "450126" },

{
  "label": "横县",
  "value": "450127" }],


[{
  "label": "城中区",
  "value": "450202" },

{
  "label": "鱼峰区",
  "value": "450203" },

{
  "label": "柳南区",
  "value": "450204" },

{
  "label": "柳北区",
  "value": "450205" },

{
  "label": "柳江区",
  "value": "450206" },

{
  "label": "柳城县",
  "value": "450222" },

{
  "label": "鹿寨县",
  "value": "450223" },

{
  "label": "融安县",
  "value": "450224" },

{
  "label": "融水苗族自治县",
  "value": "450225" },

{
  "label": "三江侗族自治县",
  "value": "450226" }],


[{
  "label": "秀峰区",
  "value": "450302" },

{
  "label": "叠彩区",
  "value": "450303" },

{
  "label": "象山区",
  "value": "450304" },

{
  "label": "七星区",
  "value": "450305" },

{
  "label": "雁山区",
  "value": "450311" },

{
  "label": "临桂区",
  "value": "450312" },

{
  "label": "阳朔县",
  "value": "450321" },

{
  "label": "灵川县",
  "value": "450323" },

{
  "label": "全州县",
  "value": "450324" },

{
  "label": "兴安县",
  "value": "450325" },

{
  "label": "永福县",
  "value": "450326" },

{
  "label": "灌阳县",
  "value": "450327" },

{
  "label": "龙胜各族自治县",
  "value": "450328" },

{
  "label": "资源县",
  "value": "450329" },

{
  "label": "平乐县",
  "value": "450330" },

{
  "label": "荔浦县",
  "value": "450331" },

{
  "label": "恭城瑶族自治县",
  "value": "450332" }],


[{
  "label": "万秀区",
  "value": "450403" },

{
  "label": "长洲区",
  "value": "450405" },

{
  "label": "龙圩区",
  "value": "450406" },

{
  "label": "苍梧县",
  "value": "450421" },

{
  "label": "藤县",
  "value": "450422" },

{
  "label": "蒙山县",
  "value": "450423" },

{
  "label": "岑溪市",
  "value": "450481" }],


[{
  "label": "海城区",
  "value": "450502" },

{
  "label": "银海区",
  "value": "450503" },

{
  "label": "铁山港区",
  "value": "450512" },

{
  "label": "合浦县",
  "value": "450521" }],


[{
  "label": "港口区",
  "value": "450602" },

{
  "label": "防城区",
  "value": "450603" },

{
  "label": "上思县",
  "value": "450621" },

{
  "label": "东兴市",
  "value": "450681" }],


[{
  "label": "钦南区",
  "value": "450702" },

{
  "label": "钦北区",
  "value": "450703" },

{
  "label": "灵山县",
  "value": "450721" },

{
  "label": "浦北县",
  "value": "450722" }],


[{
  "label": "港北区",
  "value": "450802" },

{
  "label": "港南区",
  "value": "450803" },

{
  "label": "覃塘区",
  "value": "450804" },

{
  "label": "平南县",
  "value": "450821" },

{
  "label": "桂平市",
  "value": "450881" }],


[{
  "label": "玉州区",
  "value": "450902" },

{
  "label": "福绵区",
  "value": "450903" },

{
  "label": "容县",
  "value": "450921" },

{
  "label": "陆川县",
  "value": "450922" },

{
  "label": "博白县",
  "value": "450923" },

{
  "label": "兴业县",
  "value": "450924" },

{
  "label": "北流市",
  "value": "450981" }],


[{
  "label": "右江区",
  "value": "451002" },

{
  "label": "田阳县",
  "value": "451021" },

{
  "label": "田东县",
  "value": "451022" },

{
  "label": "平果县",
  "value": "451023" },

{
  "label": "德保县",
  "value": "451024" },

{
  "label": "那坡县",
  "value": "451026" },

{
  "label": "凌云县",
  "value": "451027" },

{
  "label": "乐业县",
  "value": "451028" },

{
  "label": "田林县",
  "value": "451029" },

{
  "label": "西林县",
  "value": "451030" },

{
  "label": "隆林各族自治县",
  "value": "451031" },

{
  "label": "靖西市",
  "value": "451081" }],


[{
  "label": "八步区",
  "value": "451102" },

{
  "label": "平桂区",
  "value": "451103" },

{
  "label": "昭平县",
  "value": "451121" },

{
  "label": "钟山县",
  "value": "451122" },

{
  "label": "富川瑶族自治县",
  "value": "451123" }],


[{
  "label": "金城江区",
  "value": "451202" },

{
  "label": "宜州区",
  "value": "451203" },

{
  "label": "南丹县",
  "value": "451221" },

{
  "label": "天峨县",
  "value": "451222" },

{
  "label": "凤山县",
  "value": "451223" },

{
  "label": "东兰县",
  "value": "451224" },

{
  "label": "罗城仫佬族自治县",
  "value": "451225" },

{
  "label": "环江毛南族自治县",
  "value": "451226" },

{
  "label": "巴马瑶族自治县",
  "value": "451227" },

{
  "label": "都安瑶族自治县",
  "value": "451228" },

{
  "label": "大化瑶族自治县",
  "value": "451229" }],


[{
  "label": "兴宾区",
  "value": "451302" },

{
  "label": "忻城县",
  "value": "451321" },

{
  "label": "象州县",
  "value": "451322" },

{
  "label": "武宣县",
  "value": "451323" },

{
  "label": "金秀瑶族自治县",
  "value": "451324" },

{
  "label": "合山市",
  "value": "451381" }],


[{
  "label": "江州区",
  "value": "451402" },

{
  "label": "扶绥县",
  "value": "451421" },

{
  "label": "宁明县",
  "value": "451422" },

{
  "label": "龙州县",
  "value": "451423" },

{
  "label": "大新县",
  "value": "451424" },

{
  "label": "天等县",
  "value": "451425" },

{
  "label": "凭祥市",
  "value": "451481" }]],



[
[{
  "label": "秀英区",
  "value": "460105" },

{
  "label": "龙华区",
  "value": "460106" },

{
  "label": "琼山区",
  "value": "460107" },

{
  "label": "美兰区",
  "value": "460108" }],


[{
  "label": "海棠区",
  "value": "460202" },

{
  "label": "吉阳区",
  "value": "460203" },

{
  "label": "天涯区",
  "value": "460204" },

{
  "label": "崖州区",
  "value": "460205" }],


[{
  "label": "西沙群岛",
  "value": "460321" },

{
  "label": "南沙群岛",
  "value": "460322" },

{
  "label": "中沙群岛的岛礁及其海域",
  "value": "460323" }],


[{
  "label": "儋州市",
  "value": "460400" }],

[{
  "label": "五指山市",
  "value": "469001" },

{
  "label": "琼海市",
  "value": "469002" },

{
  "label": "文昌市",
  "value": "469005" },

{
  "label": "万宁市",
  "value": "469006" },

{
  "label": "东方市",
  "value": "469007" },

{
  "label": "定安县",
  "value": "469021" },

{
  "label": "屯昌县",
  "value": "469022" },

{
  "label": "澄迈县",
  "value": "469023" },

{
  "label": "临高县",
  "value": "469024" },

{
  "label": "白沙黎族自治县",
  "value": "469025" },

{
  "label": "昌江黎族自治县",
  "value": "469026" },

{
  "label": "乐东黎族自治县",
  "value": "469027" },

{
  "label": "陵水黎族自治县",
  "value": "469028" },

{
  "label": "保亭黎族苗族自治县",
  "value": "469029" },

{
  "label": "琼中黎族苗族自治县",
  "value": "469030" }]],



[
[{
  "label": "万州区",
  "value": "500101" },

{
  "label": "涪陵区",
  "value": "500102" },

{
  "label": "渝中区",
  "value": "500103" },

{
  "label": "大渡口区",
  "value": "500104" },

{
  "label": "江北区",
  "value": "500105" },

{
  "label": "沙坪坝区",
  "value": "500106" },

{
  "label": "九龙坡区",
  "value": "500107" },

{
  "label": "南岸区",
  "value": "500108" },

{
  "label": "北碚区",
  "value": "500109" },

{
  "label": "綦江区",
  "value": "500110" },

{
  "label": "大足区",
  "value": "500111" },

{
  "label": "渝北区",
  "value": "500112" },

{
  "label": "巴南区",
  "value": "500113" },

{
  "label": "黔江区",
  "value": "500114" },

{
  "label": "长寿区",
  "value": "500115" },

{
  "label": "江津区",
  "value": "500116" },

{
  "label": "合川区",
  "value": "500117" },

{
  "label": "永川区",
  "value": "500118" },

{
  "label": "南川区",
  "value": "500119" },

{
  "label": "璧山区",
  "value": "500120" },

{
  "label": "铜梁区",
  "value": "500151" },

{
  "label": "潼南区",
  "value": "500152" },

{
  "label": "荣昌区",
  "value": "500153" },

{
  "label": "开州区",
  "value": "500154" },

{
  "label": "梁平区",
  "value": "500155" },

{
  "label": "武隆区",
  "value": "500156" }],


[{
  "label": "城口县",
  "value": "500229" },

{
  "label": "丰都县",
  "value": "500230" },

{
  "label": "垫江县",
  "value": "500231" },

{
  "label": "忠县",
  "value": "500233" },

{
  "label": "云阳县",
  "value": "500235" },

{
  "label": "奉节县",
  "value": "500236" },

{
  "label": "巫山县",
  "value": "500237" },

{
  "label": "巫溪县",
  "value": "500238" },

{
  "label": "石柱土家族自治县",
  "value": "500240" },

{
  "label": "秀山土家族苗族自治县",
  "value": "500241" },

{
  "label": "酉阳土家族苗族自治县",
  "value": "500242" },

{
  "label": "彭水苗族土家族自治县",
  "value": "500243" }]],



[
[{
  "label": "锦江区",
  "value": "510104" },

{
  "label": "青羊区",
  "value": "510105" },

{
  "label": "金牛区",
  "value": "510106" },

{
  "label": "武侯区",
  "value": "510107" },

{
  "label": "成华区",
  "value": "510108" },

{
  "label": "龙泉驿区",
  "value": "510112" },

{
  "label": "青白江区",
  "value": "510113" },

{
  "label": "新都区",
  "value": "510114" },

{
  "label": "温江区",
  "value": "510115" },

{
  "label": "双流区",
  "value": "510116" },

{
  "label": "郫都区",
  "value": "510117" },

{
  "label": "金堂县",
  "value": "510121" },

{
  "label": "大邑县",
  "value": "510129" },

{
  "label": "蒲江县",
  "value": "510131" },

{
  "label": "新津县",
  "value": "510132" },

{
  "label": "都江堰市",
  "value": "510181" },

{
  "label": "彭州市",
  "value": "510182" },

{
  "label": "邛崃市",
  "value": "510183" },

{
  "label": "崇州市",
  "value": "510184" },

{
  "label": "简阳市",
  "value": "510185" }],


[{
  "label": "自流井区",
  "value": "510302" },

{
  "label": "贡井区",
  "value": "510303" },

{
  "label": "大安区",
  "value": "510304" },

{
  "label": "沿滩区",
  "value": "510311" },

{
  "label": "荣县",
  "value": "510321" },

{
  "label": "富顺县",
  "value": "510322" }],


[{
  "label": "东区",
  "value": "510402" },

{
  "label": "西区",
  "value": "510403" },

{
  "label": "仁和区",
  "value": "510411" },

{
  "label": "米易县",
  "value": "510421" },

{
  "label": "盐边县",
  "value": "510422" }],


[{
  "label": "江阳区",
  "value": "510502" },

{
  "label": "纳溪区",
  "value": "510503" },

{
  "label": "龙马潭区",
  "value": "510504" },

{
  "label": "泸县",
  "value": "510521" },

{
  "label": "合江县",
  "value": "510522" },

{
  "label": "叙永县",
  "value": "510524" },

{
  "label": "古蔺县",
  "value": "510525" }],


[{
  "label": "旌阳区",
  "value": "510603" },

{
  "label": "罗江区",
  "value": "510604" },

{
  "label": "中江县",
  "value": "510623" },

{
  "label": "广汉市",
  "value": "510681" },

{
  "label": "什邡市",
  "value": "510682" },

{
  "label": "绵竹市",
  "value": "510683" }],


[{
  "label": "涪城区",
  "value": "510703" },

{
  "label": "游仙区",
  "value": "510704" },

{
  "label": "安州区",
  "value": "510705" },

{
  "label": "三台县",
  "value": "510722" },

{
  "label": "盐亭县",
  "value": "510723" },

{
  "label": "梓潼县",
  "value": "510725" },

{
  "label": "北川羌族自治县",
  "value": "510726" },

{
  "label": "平武县",
  "value": "510727" },

{
  "label": "江油市",
  "value": "510781" }],


[{
  "label": "利州区",
  "value": "510802" },

{
  "label": "昭化区",
  "value": "510811" },

{
  "label": "朝天区",
  "value": "510812" },

{
  "label": "旺苍县",
  "value": "510821" },

{
  "label": "青川县",
  "value": "510822" },

{
  "label": "剑阁县",
  "value": "510823" },

{
  "label": "苍溪县",
  "value": "510824" }],


[{
  "label": "船山区",
  "value": "510903" },

{
  "label": "安居区",
  "value": "510904" },

{
  "label": "蓬溪县",
  "value": "510921" },

{
  "label": "射洪县",
  "value": "510922" },

{
  "label": "大英县",
  "value": "510923" }],


[{
  "label": "市中区",
  "value": "511002" },

{
  "label": "东兴区",
  "value": "511011" },

{
  "label": "威远县",
  "value": "511024" },

{
  "label": "资中县",
  "value": "511025" },

{
  "label": "内江经济开发区",
  "value": "511071" },

{
  "label": "隆昌市",
  "value": "511083" }],


[{
  "label": "市中区",
  "value": "511102" },

{
  "label": "沙湾区",
  "value": "511111" },

{
  "label": "五通桥区",
  "value": "511112" },

{
  "label": "金口河区",
  "value": "511113" },

{
  "label": "犍为县",
  "value": "511123" },

{
  "label": "井研县",
  "value": "511124" },

{
  "label": "夹江县",
  "value": "511126" },

{
  "label": "沐川县",
  "value": "511129" },

{
  "label": "峨边彝族自治县",
  "value": "511132" },

{
  "label": "马边彝族自治县",
  "value": "511133" },

{
  "label": "峨眉山市",
  "value": "511181" }],


[{
  "label": "顺庆区",
  "value": "511302" },

{
  "label": "高坪区",
  "value": "511303" },

{
  "label": "嘉陵区",
  "value": "511304" },

{
  "label": "南部县",
  "value": "511321" },

{
  "label": "营山县",
  "value": "511322" },

{
  "label": "蓬安县",
  "value": "511323" },

{
  "label": "仪陇县",
  "value": "511324" },

{
  "label": "西充县",
  "value": "511325" },

{
  "label": "阆中市",
  "value": "511381" }],


[{
  "label": "东坡区",
  "value": "511402" },

{
  "label": "彭山区",
  "value": "511403" },

{
  "label": "仁寿县",
  "value": "511421" },

{
  "label": "洪雅县",
  "value": "511423" },

{
  "label": "丹棱县",
  "value": "511424" },

{
  "label": "青神县",
  "value": "511425" }],


[{
  "label": "翠屏区",
  "value": "511502" },

{
  "label": "南溪区",
  "value": "511503" },

{
  "label": "宜宾县",
  "value": "511521" },

{
  "label": "江安县",
  "value": "511523" },

{
  "label": "长宁县",
  "value": "511524" },

{
  "label": "高县",
  "value": "511525" },

{
  "label": "珙县",
  "value": "511526" },

{
  "label": "筠连县",
  "value": "511527" },

{
  "label": "兴文县",
  "value": "511528" },

{
  "label": "屏山县",
  "value": "511529" }],


[{
  "label": "广安区",
  "value": "511602" },

{
  "label": "前锋区",
  "value": "511603" },

{
  "label": "岳池县",
  "value": "511621" },

{
  "label": "武胜县",
  "value": "511622" },

{
  "label": "邻水县",
  "value": "511623" },

{
  "label": "华蓥市",
  "value": "511681" }],


[{
  "label": "通川区",
  "value": "511702" },

{
  "label": "达川区",
  "value": "511703" },

{
  "label": "宣汉县",
  "value": "511722" },

{
  "label": "开江县",
  "value": "511723" },

{
  "label": "大竹县",
  "value": "511724" },

{
  "label": "渠县",
  "value": "511725" },

{
  "label": "达州经济开发区",
  "value": "511771" },

{
  "label": "万源市",
  "value": "511781" }],


[{
  "label": "雨城区",
  "value": "511802" },

{
  "label": "名山区",
  "value": "511803" },

{
  "label": "荥经县",
  "value": "511822" },

{
  "label": "汉源县",
  "value": "511823" },

{
  "label": "石棉县",
  "value": "511824" },

{
  "label": "天全县",
  "value": "511825" },

{
  "label": "芦山县",
  "value": "511826" },

{
  "label": "宝兴县",
  "value": "511827" }],


[{
  "label": "巴州区",
  "value": "511902" },

{
  "label": "恩阳区",
  "value": "511903" },

{
  "label": "通江县",
  "value": "511921" },

{
  "label": "南江县",
  "value": "511922" },

{
  "label": "平昌县",
  "value": "511923" },

{
  "label": "巴中经济开发区",
  "value": "511971" }],


[{
  "label": "雁江区",
  "value": "512002" },

{
  "label": "安岳县",
  "value": "512021" },

{
  "label": "乐至县",
  "value": "512022" }],


[{
  "label": "马尔康市",
  "value": "513201" },

{
  "label": "汶川县",
  "value": "513221" },

{
  "label": "理县",
  "value": "513222" },

{
  "label": "茂县",
  "value": "513223" },

{
  "label": "松潘县",
  "value": "513224" },

{
  "label": "九寨沟县",
  "value": "513225" },

{
  "label": "金川县",
  "value": "513226" },

{
  "label": "小金县",
  "value": "513227" },

{
  "label": "黑水县",
  "value": "513228" },

{
  "label": "壤塘县",
  "value": "513230" },

{
  "label": "阿坝县",
  "value": "513231" },

{
  "label": "若尔盖县",
  "value": "513232" },

{
  "label": "红原县",
  "value": "513233" }],


[{
  "label": "康定市",
  "value": "513301" },

{
  "label": "泸定县",
  "value": "513322" },

{
  "label": "丹巴县",
  "value": "513323" },

{
  "label": "九龙县",
  "value": "513324" },

{
  "label": "雅江县",
  "value": "513325" },

{
  "label": "道孚县",
  "value": "513326" },

{
  "label": "炉霍县",
  "value": "513327" },

{
  "label": "甘孜县",
  "value": "513328" },

{
  "label": "新龙县",
  "value": "513329" },

{
  "label": "德格县",
  "value": "513330" },

{
  "label": "白玉县",
  "value": "513331" },

{
  "label": "石渠县",
  "value": "513332" },

{
  "label": "色达县",
  "value": "513333" },

{
  "label": "理塘县",
  "value": "513334" },

{
  "label": "巴塘县",
  "value": "513335" },

{
  "label": "乡城县",
  "value": "513336" },

{
  "label": "稻城县",
  "value": "513337" },

{
  "label": "得荣县",
  "value": "513338" }],


[{
  "label": "西昌市",
  "value": "513401" },

{
  "label": "木里藏族自治县",
  "value": "513422" },

{
  "label": "盐源县",
  "value": "513423" },

{
  "label": "德昌县",
  "value": "513424" },

{
  "label": "会理县",
  "value": "513425" },

{
  "label": "会东县",
  "value": "513426" },

{
  "label": "宁南县",
  "value": "513427" },

{
  "label": "普格县",
  "value": "513428" },

{
  "label": "布拖县",
  "value": "513429" },

{
  "label": "金阳县",
  "value": "513430" },

{
  "label": "昭觉县",
  "value": "513431" },

{
  "label": "喜德县",
  "value": "513432" },

{
  "label": "冕宁县",
  "value": "513433" },

{
  "label": "越西县",
  "value": "513434" },

{
  "label": "甘洛县",
  "value": "513435" },

{
  "label": "美姑县",
  "value": "513436" },

{
  "label": "雷波县",
  "value": "513437" }]],



[
[{
  "label": "南明区",
  "value": "520102" },

{
  "label": "云岩区",
  "value": "520103" },

{
  "label": "花溪区",
  "value": "520111" },

{
  "label": "乌当区",
  "value": "520112" },

{
  "label": "白云区",
  "value": "520113" },

{
  "label": "观山湖区",
  "value": "520115" },

{
  "label": "开阳县",
  "value": "520121" },

{
  "label": "息烽县",
  "value": "520122" },

{
  "label": "修文县",
  "value": "520123" },

{
  "label": "清镇市",
  "value": "520181" }],


[{
  "label": "钟山区",
  "value": "520201" },

{
  "label": "六枝特区",
  "value": "520203" },

{
  "label": "水城县",
  "value": "520221" },

{
  "label": "盘州市",
  "value": "520281" }],


[{
  "label": "红花岗区",
  "value": "520302" },

{
  "label": "汇川区",
  "value": "520303" },

{
  "label": "播州区",
  "value": "520304" },

{
  "label": "桐梓县",
  "value": "520322" },

{
  "label": "绥阳县",
  "value": "520323" },

{
  "label": "正安县",
  "value": "520324" },

{
  "label": "道真仡佬族苗族自治县",
  "value": "520325" },

{
  "label": "务川仡佬族苗族自治县",
  "value": "520326" },

{
  "label": "凤冈县",
  "value": "520327" },

{
  "label": "湄潭县",
  "value": "520328" },

{
  "label": "余庆县",
  "value": "520329" },

{
  "label": "习水县",
  "value": "520330" },

{
  "label": "赤水市",
  "value": "520381" },

{
  "label": "仁怀市",
  "value": "520382" }],


[{
  "label": "西秀区",
  "value": "520402" },

{
  "label": "平坝区",
  "value": "520403" },

{
  "label": "普定县",
  "value": "520422" },

{
  "label": "镇宁布依族苗族自治县",
  "value": "520423" },

{
  "label": "关岭布依族苗族自治县",
  "value": "520424" },

{
  "label": "紫云苗族布依族自治县",
  "value": "520425" }],


[{
  "label": "七星关区",
  "value": "520502" },

{
  "label": "大方县",
  "value": "520521" },

{
  "label": "黔西县",
  "value": "520522" },

{
  "label": "金沙县",
  "value": "520523" },

{
  "label": "织金县",
  "value": "520524" },

{
  "label": "纳雍县",
  "value": "520525" },

{
  "label": "威宁彝族回族苗族自治县",
  "value": "520526" },

{
  "label": "赫章县",
  "value": "520527" }],


[{
  "label": "碧江区",
  "value": "520602" },

{
  "label": "万山区",
  "value": "520603" },

{
  "label": "江口县",
  "value": "520621" },

{
  "label": "玉屏侗族自治县",
  "value": "520622" },

{
  "label": "石阡县",
  "value": "520623" },

{
  "label": "思南县",
  "value": "520624" },

{
  "label": "印江土家族苗族自治县",
  "value": "520625" },

{
  "label": "德江县",
  "value": "520626" },

{
  "label": "沿河土家族自治县",
  "value": "520627" },

{
  "label": "松桃苗族自治县",
  "value": "520628" }],


[{
  "label": "兴义市",
  "value": "522301" },

{
  "label": "兴仁县",
  "value": "522322" },

{
  "label": "普安县",
  "value": "522323" },

{
  "label": "晴隆县",
  "value": "522324" },

{
  "label": "贞丰县",
  "value": "522325" },

{
  "label": "望谟县",
  "value": "522326" },

{
  "label": "册亨县",
  "value": "522327" },

{
  "label": "安龙县",
  "value": "522328" }],


[{
  "label": "凯里市",
  "value": "522601" },

{
  "label": "黄平县",
  "value": "522622" },

{
  "label": "施秉县",
  "value": "522623" },

{
  "label": "三穗县",
  "value": "522624" },

{
  "label": "镇远县",
  "value": "522625" },

{
  "label": "岑巩县",
  "value": "522626" },

{
  "label": "天柱县",
  "value": "522627" },

{
  "label": "锦屏县",
  "value": "522628" },

{
  "label": "剑河县",
  "value": "522629" },

{
  "label": "台江县",
  "value": "522630" },

{
  "label": "黎平县",
  "value": "522631" },

{
  "label": "榕江县",
  "value": "522632" },

{
  "label": "从江县",
  "value": "522633" },

{
  "label": "雷山县",
  "value": "522634" },

{
  "label": "麻江县",
  "value": "522635" },

{
  "label": "丹寨县",
  "value": "522636" }],


[{
  "label": "都匀市",
  "value": "522701" },

{
  "label": "福泉市",
  "value": "522702" },

{
  "label": "荔波县",
  "value": "522722" },

{
  "label": "贵定县",
  "value": "522723" },

{
  "label": "瓮安县",
  "value": "522725" },

{
  "label": "独山县",
  "value": "522726" },

{
  "label": "平塘县",
  "value": "522727" },

{
  "label": "罗甸县",
  "value": "522728" },

{
  "label": "长顺县",
  "value": "522729" },

{
  "label": "龙里县",
  "value": "522730" },

{
  "label": "惠水县",
  "value": "522731" },

{
  "label": "三都水族自治县",
  "value": "522732" }]],



[
[{
  "label": "五华区",
  "value": "530102" },

{
  "label": "盘龙区",
  "value": "530103" },

{
  "label": "官渡区",
  "value": "530111" },

{
  "label": "西山区",
  "value": "530112" },

{
  "label": "东川区",
  "value": "530113" },

{
  "label": "呈贡区",
  "value": "530114" },

{
  "label": "晋宁区",
  "value": "530115" },

{
  "label": "富民县",
  "value": "530124" },

{
  "label": "宜良县",
  "value": "530125" },

{
  "label": "石林彝族自治县",
  "value": "530126" },

{
  "label": "嵩明县",
  "value": "530127" },

{
  "label": "禄劝彝族苗族自治县",
  "value": "530128" },

{
  "label": "寻甸回族彝族自治县",
  "value": "530129" },

{
  "label": "安宁市",
  "value": "530181" }],


[{
  "label": "麒麟区",
  "value": "530302" },

{
  "label": "沾益区",
  "value": "530303" },

{
  "label": "马龙县",
  "value": "530321" },

{
  "label": "陆良县",
  "value": "530322" },

{
  "label": "师宗县",
  "value": "530323" },

{
  "label": "罗平县",
  "value": "530324" },

{
  "label": "富源县",
  "value": "530325" },

{
  "label": "会泽县",
  "value": "530326" },

{
  "label": "宣威市",
  "value": "530381" }],


[{
  "label": "红塔区",
  "value": "530402" },

{
  "label": "江川区",
  "value": "530403" },

{
  "label": "澄江县",
  "value": "530422" },

{
  "label": "通海县",
  "value": "530423" },

{
  "label": "华宁县",
  "value": "530424" },

{
  "label": "易门县",
  "value": "530425" },

{
  "label": "峨山彝族自治县",
  "value": "530426" },

{
  "label": "新平彝族傣族自治县",
  "value": "530427" },

{
  "label": "元江哈尼族彝族傣族自治县",
  "value": "530428" }],


[{
  "label": "隆阳区",
  "value": "530502" },

{
  "label": "施甸县",
  "value": "530521" },

{
  "label": "龙陵县",
  "value": "530523" },

{
  "label": "昌宁县",
  "value": "530524" },

{
  "label": "腾冲市",
  "value": "530581" }],


[{
  "label": "昭阳区",
  "value": "530602" },

{
  "label": "鲁甸县",
  "value": "530621" },

{
  "label": "巧家县",
  "value": "530622" },

{
  "label": "盐津县",
  "value": "530623" },

{
  "label": "大关县",
  "value": "530624" },

{
  "label": "永善县",
  "value": "530625" },

{
  "label": "绥江县",
  "value": "530626" },

{
  "label": "镇雄县",
  "value": "530627" },

{
  "label": "彝良县",
  "value": "530628" },

{
  "label": "威信县",
  "value": "530629" },

{
  "label": "水富县",
  "value": "530630" }],


[{
  "label": "古城区",
  "value": "530702" },

{
  "label": "玉龙纳西族自治县",
  "value": "530721" },

{
  "label": "永胜县",
  "value": "530722" },

{
  "label": "华坪县",
  "value": "530723" },

{
  "label": "宁蒗彝族自治县",
  "value": "530724" }],


[{
  "label": "思茅区",
  "value": "530802" },

{
  "label": "宁洱哈尼族彝族自治县",
  "value": "530821" },

{
  "label": "墨江哈尼族自治县",
  "value": "530822" },

{
  "label": "景东彝族自治县",
  "value": "530823" },

{
  "label": "景谷傣族彝族自治县",
  "value": "530824" },

{
  "label": "镇沅彝族哈尼族拉祜族自治县",
  "value": "530825" },

{
  "label": "江城哈尼族彝族自治县",
  "value": "530826" },

{
  "label": "孟连傣族拉祜族佤族自治县",
  "value": "530827" },

{
  "label": "澜沧拉祜族自治县",
  "value": "530828" },

{
  "label": "西盟佤族自治县",
  "value": "530829" }],


[{
  "label": "临翔区",
  "value": "530902" },

{
  "label": "凤庆县",
  "value": "530921" },

{
  "label": "云县",
  "value": "530922" },

{
  "label": "永德县",
  "value": "530923" },

{
  "label": "镇康县",
  "value": "530924" },

{
  "label": "双江拉祜族佤族布朗族傣族自治县",
  "value": "530925" },

{
  "label": "耿马傣族佤族自治县",
  "value": "530926" },

{
  "label": "沧源佤族自治县",
  "value": "530927" }],


[{
  "label": "楚雄市",
  "value": "532301" },

{
  "label": "双柏县",
  "value": "532322" },

{
  "label": "牟定县",
  "value": "532323" },

{
  "label": "南华县",
  "value": "532324" },

{
  "label": "姚安县",
  "value": "532325" },

{
  "label": "大姚县",
  "value": "532326" },

{
  "label": "永仁县",
  "value": "532327" },

{
  "label": "元谋县",
  "value": "532328" },

{
  "label": "武定县",
  "value": "532329" },

{
  "label": "禄丰县",
  "value": "532331" }],


[{
  "label": "个旧市",
  "value": "532501" },

{
  "label": "开远市",
  "value": "532502" },

{
  "label": "蒙自市",
  "value": "532503" },

{
  "label": "弥勒市",
  "value": "532504" },

{
  "label": "屏边苗族自治县",
  "value": "532523" },

{
  "label": "建水县",
  "value": "532524" },

{
  "label": "石屏县",
  "value": "532525" },

{
  "label": "泸西县",
  "value": "532527" },

{
  "label": "元阳县",
  "value": "532528" },

{
  "label": "红河县",
  "value": "532529" },

{
  "label": "金平苗族瑶族傣族自治县",
  "value": "532530" },

{
  "label": "绿春县",
  "value": "532531" },

{
  "label": "河口瑶族自治县",
  "value": "532532" }],


[{
  "label": "文山市",
  "value": "532601" },

{
  "label": "砚山县",
  "value": "532622" },

{
  "label": "西畴县",
  "value": "532623" },

{
  "label": "麻栗坡县",
  "value": "532624" },

{
  "label": "马关县",
  "value": "532625" },

{
  "label": "丘北县",
  "value": "532626" },

{
  "label": "广南县",
  "value": "532627" },

{
  "label": "富宁县",
  "value": "532628" }],


[{
  "label": "景洪市",
  "value": "532801" },

{
  "label": "勐海县",
  "value": "532822" },

{
  "label": "勐腊县",
  "value": "532823" }],


[{
  "label": "大理市",
  "value": "532901" },

{
  "label": "漾濞彝族自治县",
  "value": "532922" },

{
  "label": "祥云县",
  "value": "532923" },

{
  "label": "宾川县",
  "value": "532924" },

{
  "label": "弥渡县",
  "value": "532925" },

{
  "label": "南涧彝族自治县",
  "value": "532926" },

{
  "label": "巍山彝族回族自治县",
  "value": "532927" },

{
  "label": "永平县",
  "value": "532928" },

{
  "label": "云龙县",
  "value": "532929" },

{
  "label": "洱源县",
  "value": "532930" },

{
  "label": "剑川县",
  "value": "532931" },

{
  "label": "鹤庆县",
  "value": "532932" }],


[{
  "label": "瑞丽市",
  "value": "533102" },

{
  "label": "芒市",
  "value": "533103" },

{
  "label": "梁河县",
  "value": "533122" },

{
  "label": "盈江县",
  "value": "533123" },

{
  "label": "陇川县",
  "value": "533124" }],


[{
  "label": "泸水市",
  "value": "533301" },

{
  "label": "福贡县",
  "value": "533323" },

{
  "label": "贡山独龙族怒族自治县",
  "value": "533324" },

{
  "label": "兰坪白族普米族自治县",
  "value": "533325" }],


[{
  "label": "香格里拉市",
  "value": "533401" },

{
  "label": "德钦县",
  "value": "533422" },

{
  "label": "维西傈僳族自治县",
  "value": "533423" }]],



[
[{
  "label": "城关区",
  "value": "540102" },

{
  "label": "堆龙德庆区",
  "value": "540103" },

{
  "label": "林周县",
  "value": "540121" },

{
  "label": "当雄县",
  "value": "540122" },

{
  "label": "尼木县",
  "value": "540123" },

{
  "label": "曲水县",
  "value": "540124" },

{
  "label": "达孜县",
  "value": "540126" },

{
  "label": "墨竹工卡县",
  "value": "540127" },

{
  "label": "格尔木藏青工业园区",
  "value": "540171" },

{
  "label": "拉萨经济技术开发区",
  "value": "540172" },

{
  "label": "西藏文化旅游创意园区",
  "value": "540173" },

{
  "label": "达孜工业园区",
  "value": "540174" }],


[{
  "label": "桑珠孜区",
  "value": "540202" },

{
  "label": "南木林县",
  "value": "540221" },

{
  "label": "江孜县",
  "value": "540222" },

{
  "label": "定日县",
  "value": "540223" },

{
  "label": "萨迦县",
  "value": "540224" },

{
  "label": "拉孜县",
  "value": "540225" },

{
  "label": "昂仁县",
  "value": "540226" },

{
  "label": "谢通门县",
  "value": "540227" },

{
  "label": "白朗县",
  "value": "540228" },

{
  "label": "仁布县",
  "value": "540229" },

{
  "label": "康马县",
  "value": "540230" },

{
  "label": "定结县",
  "value": "540231" },

{
  "label": "仲巴县",
  "value": "540232" },

{
  "label": "亚东县",
  "value": "540233" },

{
  "label": "吉隆县",
  "value": "540234" },

{
  "label": "聂拉木县",
  "value": "540235" },

{
  "label": "萨嘎县",
  "value": "540236" },

{
  "label": "岗巴县",
  "value": "540237" }],


[{
  "label": "卡若区",
  "value": "540302" },

{
  "label": "江达县",
  "value": "540321" },

{
  "label": "贡觉县",
  "value": "540322" },

{
  "label": "类乌齐县",
  "value": "540323" },

{
  "label": "丁青县",
  "value": "540324" },

{
  "label": "察雅县",
  "value": "540325" },

{
  "label": "八宿县",
  "value": "540326" },

{
  "label": "左贡县",
  "value": "540327" },

{
  "label": "芒康县",
  "value": "540328" },

{
  "label": "洛隆县",
  "value": "540329" },

{
  "label": "边坝县",
  "value": "540330" }],


[{
  "label": "巴宜区",
  "value": "540402" },

{
  "label": "工布江达县",
  "value": "540421" },

{
  "label": "米林县",
  "value": "540422" },

{
  "label": "墨脱县",
  "value": "540423" },

{
  "label": "波密县",
  "value": "540424" },

{
  "label": "察隅县",
  "value": "540425" },

{
  "label": "朗县",
  "value": "540426" }],


[{
  "label": "乃东区",
  "value": "540502" },

{
  "label": "扎囊县",
  "value": "540521" },

{
  "label": "贡嘎县",
  "value": "540522" },

{
  "label": "桑日县",
  "value": "540523" },

{
  "label": "琼结县",
  "value": "540524" },

{
  "label": "曲松县",
  "value": "540525" },

{
  "label": "措美县",
  "value": "540526" },

{
  "label": "洛扎县",
  "value": "540527" },

{
  "label": "加查县",
  "value": "540528" },

{
  "label": "隆子县",
  "value": "540529" },

{
  "label": "错那县",
  "value": "540530" },

{
  "label": "浪卡子县",
  "value": "540531" }],


[{
  "label": "那曲县",
  "value": "542421" },

{
  "label": "嘉黎县",
  "value": "542422" },

{
  "label": "比如县",
  "value": "542423" },

{
  "label": "聂荣县",
  "value": "542424" },

{
  "label": "安多县",
  "value": "542425" },

{
  "label": "申扎县",
  "value": "542426" },

{
  "label": "索县",
  "value": "542427" },

{
  "label": "班戈县",
  "value": "542428" },

{
  "label": "巴青县",
  "value": "542429" },

{
  "label": "尼玛县",
  "value": "542430" },

{
  "label": "双湖县",
  "value": "542431" }],


[{
  "label": "普兰县",
  "value": "542521" },

{
  "label": "札达县",
  "value": "542522" },

{
  "label": "噶尔县",
  "value": "542523" },

{
  "label": "日土县",
  "value": "542524" },

{
  "label": "革吉县",
  "value": "542525" },

{
  "label": "改则县",
  "value": "542526" },

{
  "label": "措勤县",
  "value": "542527" }]],



[
[{
  "label": "新城区",
  "value": "610102" },

{
  "label": "碑林区",
  "value": "610103" },

{
  "label": "莲湖区",
  "value": "610104" },

{
  "label": "灞桥区",
  "value": "610111" },

{
  "label": "未央区",
  "value": "610112" },

{
  "label": "雁塔区",
  "value": "610113" },

{
  "label": "阎良区",
  "value": "610114" },

{
  "label": "临潼区",
  "value": "610115" },

{
  "label": "长安区",
  "value": "610116" },

{
  "label": "高陵区",
  "value": "610117" },

{
  "label": "鄠邑区",
  "value": "610118" },

{
  "label": "蓝田县",
  "value": "610122" },

{
  "label": "周至县",
  "value": "610124" }],


[{
  "label": "王益区",
  "value": "610202" },

{
  "label": "印台区",
  "value": "610203" },

{
  "label": "耀州区",
  "value": "610204" },

{
  "label": "宜君县",
  "value": "610222" }],


[{
  "label": "渭滨区",
  "value": "610302" },

{
  "label": "金台区",
  "value": "610303" },

{
  "label": "陈仓区",
  "value": "610304" },

{
  "label": "凤翔县",
  "value": "610322" },

{
  "label": "岐山县",
  "value": "610323" },

{
  "label": "扶风县",
  "value": "610324" },

{
  "label": "眉县",
  "value": "610326" },

{
  "label": "陇县",
  "value": "610327" },

{
  "label": "千阳县",
  "value": "610328" },

{
  "label": "麟游县",
  "value": "610329" },

{
  "label": "凤县",
  "value": "610330" },

{
  "label": "太白县",
  "value": "610331" }],


[{
  "label": "秦都区",
  "value": "610402" },

{
  "label": "杨陵区",
  "value": "610403" },

{
  "label": "渭城区",
  "value": "610404" },

{
  "label": "三原县",
  "value": "610422" },

{
  "label": "泾阳县",
  "value": "610423" },

{
  "label": "乾县",
  "value": "610424" },

{
  "label": "礼泉县",
  "value": "610425" },

{
  "label": "永寿县",
  "value": "610426" },

{
  "label": "彬县",
  "value": "610427" },

{
  "label": "长武县",
  "value": "610428" },

{
  "label": "旬邑县",
  "value": "610429" },

{
  "label": "淳化县",
  "value": "610430" },

{
  "label": "武功县",
  "value": "610431" },

{
  "label": "兴平市",
  "value": "610481" }],


[{
  "label": "临渭区",
  "value": "610502" },

{
  "label": "华州区",
  "value": "610503" },

{
  "label": "潼关县",
  "value": "610522" },

{
  "label": "大荔县",
  "value": "610523" },

{
  "label": "合阳县",
  "value": "610524" },

{
  "label": "澄城县",
  "value": "610525" },

{
  "label": "蒲城县",
  "value": "610526" },

{
  "label": "白水县",
  "value": "610527" },

{
  "label": "富平县",
  "value": "610528" },

{
  "label": "韩城市",
  "value": "610581" },

{
  "label": "华阴市",
  "value": "610582" }],


[{
  "label": "宝塔区",
  "value": "610602" },

{
  "label": "安塞区",
  "value": "610603" },

{
  "label": "延长县",
  "value": "610621" },

{
  "label": "延川县",
  "value": "610622" },

{
  "label": "子长县",
  "value": "610623" },

{
  "label": "志丹县",
  "value": "610625" },

{
  "label": "吴起县",
  "value": "610626" },

{
  "label": "甘泉县",
  "value": "610627" },

{
  "label": "富县",
  "value": "610628" },

{
  "label": "洛川县",
  "value": "610629" },

{
  "label": "宜川县",
  "value": "610630" },

{
  "label": "黄龙县",
  "value": "610631" },

{
  "label": "黄陵县",
  "value": "610632" }],


[{
  "label": "汉台区",
  "value": "610702" },

{
  "label": "南郑区",
  "value": "610703" },

{
  "label": "城固县",
  "value": "610722" },

{
  "label": "洋县",
  "value": "610723" },

{
  "label": "西乡县",
  "value": "610724" },

{
  "label": "勉县",
  "value": "610725" },

{
  "label": "宁强县",
  "value": "610726" },

{
  "label": "略阳县",
  "value": "610727" },

{
  "label": "镇巴县",
  "value": "610728" },

{
  "label": "留坝县",
  "value": "610729" },

{
  "label": "佛坪县",
  "value": "610730" }],


[{
  "label": "榆阳区",
  "value": "610802" },

{
  "label": "横山区",
  "value": "610803" },

{
  "label": "府谷县",
  "value": "610822" },

{
  "label": "靖边县",
  "value": "610824" },

{
  "label": "定边县",
  "value": "610825" },

{
  "label": "绥德县",
  "value": "610826" },

{
  "label": "米脂县",
  "value": "610827" },

{
  "label": "佳县",
  "value": "610828" },

{
  "label": "吴堡县",
  "value": "610829" },

{
  "label": "清涧县",
  "value": "610830" },

{
  "label": "子洲县",
  "value": "610831" },

{
  "label": "神木市",
  "value": "610881" }],


[{
  "label": "汉滨区",
  "value": "610902" },

{
  "label": "汉阴县",
  "value": "610921" },

{
  "label": "石泉县",
  "value": "610922" },

{
  "label": "宁陕县",
  "value": "610923" },

{
  "label": "紫阳县",
  "value": "610924" },

{
  "label": "岚皋县",
  "value": "610925" },

{
  "label": "平利县",
  "value": "610926" },

{
  "label": "镇坪县",
  "value": "610927" },

{
  "label": "旬阳县",
  "value": "610928" },

{
  "label": "白河县",
  "value": "610929" }],


[{
  "label": "商州区",
  "value": "611002" },

{
  "label": "洛南县",
  "value": "611021" },

{
  "label": "丹凤县",
  "value": "611022" },

{
  "label": "商南县",
  "value": "611023" },

{
  "label": "山阳县",
  "value": "611024" },

{
  "label": "镇安县",
  "value": "611025" },

{
  "label": "柞水县",
  "value": "611026" }]],



[
[{
  "label": "城关区",
  "value": "620102" },

{
  "label": "七里河区",
  "value": "620103" },

{
  "label": "西固区",
  "value": "620104" },

{
  "label": "安宁区",
  "value": "620105" },

{
  "label": "红古区",
  "value": "620111" },

{
  "label": "永登县",
  "value": "620121" },

{
  "label": "皋兰县",
  "value": "620122" },

{
  "label": "榆中县",
  "value": "620123" },

{
  "label": "兰州新区",
  "value": "620171" }],


[{
  "label": "嘉峪关市",
  "value": "620201" }],

[{
  "label": "金川区",
  "value": "620302" },

{
  "label": "永昌县",
  "value": "620321" }],


[{
  "label": "白银区",
  "value": "620402" },

{
  "label": "平川区",
  "value": "620403" },

{
  "label": "靖远县",
  "value": "620421" },

{
  "label": "会宁县",
  "value": "620422" },

{
  "label": "景泰县",
  "value": "620423" }],


[{
  "label": "秦州区",
  "value": "620502" },

{
  "label": "麦积区",
  "value": "620503" },

{
  "label": "清水县",
  "value": "620521" },

{
  "label": "秦安县",
  "value": "620522" },

{
  "label": "甘谷县",
  "value": "620523" },

{
  "label": "武山县",
  "value": "620524" },

{
  "label": "张家川回族自治县",
  "value": "620525" }],


[{
  "label": "凉州区",
  "value": "620602" },

{
  "label": "民勤县",
  "value": "620621" },

{
  "label": "古浪县",
  "value": "620622" },

{
  "label": "天祝藏族自治县",
  "value": "620623" }],


[{
  "label": "甘州区",
  "value": "620702" },

{
  "label": "肃南裕固族自治县",
  "value": "620721" },

{
  "label": "民乐县",
  "value": "620722" },

{
  "label": "临泽县",
  "value": "620723" },

{
  "label": "高台县",
  "value": "620724" },

{
  "label": "山丹县",
  "value": "620725" }],


[{
  "label": "崆峒区",
  "value": "620802" },

{
  "label": "泾川县",
  "value": "620821" },

{
  "label": "灵台县",
  "value": "620822" },

{
  "label": "崇信县",
  "value": "620823" },

{
  "label": "华亭县",
  "value": "620824" },

{
  "label": "庄浪县",
  "value": "620825" },

{
  "label": "静宁县",
  "value": "620826" },

{
  "label": "平凉工业园区",
  "value": "620871" }],


[{
  "label": "肃州区",
  "value": "620902" },

{
  "label": "金塔县",
  "value": "620921" },

{
  "label": "瓜州县",
  "value": "620922" },

{
  "label": "肃北蒙古族自治县",
  "value": "620923" },

{
  "label": "阿克塞哈萨克族自治县",
  "value": "620924" },

{
  "label": "玉门市",
  "value": "620981" },

{
  "label": "敦煌市",
  "value": "620982" }],


[{
  "label": "西峰区",
  "value": "621002" },

{
  "label": "庆城县",
  "value": "621021" },

{
  "label": "环县",
  "value": "621022" },

{
  "label": "华池县",
  "value": "621023" },

{
  "label": "合水县",
  "value": "621024" },

{
  "label": "正宁县",
  "value": "621025" },

{
  "label": "宁县",
  "value": "621026" },

{
  "label": "镇原县",
  "value": "621027" }],


[{
  "label": "安定区",
  "value": "621102" },

{
  "label": "通渭县",
  "value": "621121" },

{
  "label": "陇西县",
  "value": "621122" },

{
  "label": "渭源县",
  "value": "621123" },

{
  "label": "临洮县",
  "value": "621124" },

{
  "label": "漳县",
  "value": "621125" },

{
  "label": "岷县",
  "value": "621126" }],


[{
  "label": "武都区",
  "value": "621202" },

{
  "label": "成县",
  "value": "621221" },

{
  "label": "文县",
  "value": "621222" },

{
  "label": "宕昌县",
  "value": "621223" },

{
  "label": "康县",
  "value": "621224" },

{
  "label": "西和县",
  "value": "621225" },

{
  "label": "礼县",
  "value": "621226" },

{
  "label": "徽县",
  "value": "621227" },

{
  "label": "两当县",
  "value": "621228" }],


[{
  "label": "临夏市",
  "value": "622901" },

{
  "label": "临夏县",
  "value": "622921" },

{
  "label": "康乐县",
  "value": "622922" },

{
  "label": "永靖县",
  "value": "622923" },

{
  "label": "广河县",
  "value": "622924" },

{
  "label": "和政县",
  "value": "622925" },

{
  "label": "东乡族自治县",
  "value": "622926" },

{
  "label": "积石山保安族东乡族撒拉族自治县",
  "value": "622927" }],


[{
  "label": "合作市",
  "value": "623001" },

{
  "label": "临潭县",
  "value": "623021" },

{
  "label": "卓尼县",
  "value": "623022" },

{
  "label": "舟曲县",
  "value": "623023" },

{
  "label": "迭部县",
  "value": "623024" },

{
  "label": "玛曲县",
  "value": "623025" },

{
  "label": "碌曲县",
  "value": "623026" },

{
  "label": "夏河县",
  "value": "623027" }]],



[
[{
  "label": "城东区",
  "value": "630102" },

{
  "label": "城中区",
  "value": "630103" },

{
  "label": "城西区",
  "value": "630104" },

{
  "label": "城北区",
  "value": "630105" },

{
  "label": "大通回族土族自治县",
  "value": "630121" },

{
  "label": "湟中县",
  "value": "630122" },

{
  "label": "湟源县",
  "value": "630123" }],


[{
  "label": "乐都区",
  "value": "630202" },

{
  "label": "平安区",
  "value": "630203" },

{
  "label": "民和回族土族自治县",
  "value": "630222" },

{
  "label": "互助土族自治县",
  "value": "630223" },

{
  "label": "化隆回族自治县",
  "value": "630224" },

{
  "label": "循化撒拉族自治县",
  "value": "630225" }],


[{
  "label": "门源回族自治县",
  "value": "632221" },

{
  "label": "祁连县",
  "value": "632222" },

{
  "label": "海晏县",
  "value": "632223" },

{
  "label": "刚察县",
  "value": "632224" }],


[{
  "label": "同仁县",
  "value": "632321" },

{
  "label": "尖扎县",
  "value": "632322" },

{
  "label": "泽库县",
  "value": "632323" },

{
  "label": "河南蒙古族自治县",
  "value": "632324" }],


[{
  "label": "共和县",
  "value": "632521" },

{
  "label": "同德县",
  "value": "632522" },

{
  "label": "贵德县",
  "value": "632523" },

{
  "label": "兴海县",
  "value": "632524" },

{
  "label": "贵南县",
  "value": "632525" }],


[{
  "label": "玛沁县",
  "value": "632621" },

{
  "label": "班玛县",
  "value": "632622" },

{
  "label": "甘德县",
  "value": "632623" },

{
  "label": "达日县",
  "value": "632624" },

{
  "label": "久治县",
  "value": "632625" },

{
  "label": "玛多县",
  "value": "632626" }],


[{
  "label": "玉树市",
  "value": "632701" },

{
  "label": "杂多县",
  "value": "632722" },

{
  "label": "称多县",
  "value": "632723" },

{
  "label": "治多县",
  "value": "632724" },

{
  "label": "囊谦县",
  "value": "632725" },

{
  "label": "曲麻莱县",
  "value": "632726" }],


[{
  "label": "格尔木市",
  "value": "632801" },

{
  "label": "德令哈市",
  "value": "632802" },

{
  "label": "乌兰县",
  "value": "632821" },

{
  "label": "都兰县",
  "value": "632822" },

{
  "label": "天峻县",
  "value": "632823" },

{
  "label": "大柴旦行政委员会",
  "value": "632857" },

{
  "label": "冷湖行政委员会",
  "value": "632858" },

{
  "label": "茫崖行政委员会",
  "value": "632859" }]],



[
[{
  "label": "兴庆区",
  "value": "640104" },

{
  "label": "西夏区",
  "value": "640105" },

{
  "label": "金凤区",
  "value": "640106" },

{
  "label": "永宁县",
  "value": "640121" },

{
  "label": "贺兰县",
  "value": "640122" },

{
  "label": "灵武市",
  "value": "640181" }],


[{
  "label": "大武口区",
  "value": "640202" },

{
  "label": "惠农区",
  "value": "640205" },

{
  "label": "平罗县",
  "value": "640221" }],


[{
  "label": "利通区",
  "value": "640302" },

{
  "label": "红寺堡区",
  "value": "640303" },

{
  "label": "盐池县",
  "value": "640323" },

{
  "label": "同心县",
  "value": "640324" },

{
  "label": "青铜峡市",
  "value": "640381" }],


[{
  "label": "原州区",
  "value": "640402" },

{
  "label": "西吉县",
  "value": "640422" },

{
  "label": "隆德县",
  "value": "640423" },

{
  "label": "泾源县",
  "value": "640424" },

{
  "label": "彭阳县",
  "value": "640425" }],


[{
  "label": "沙坡头区",
  "value": "640502" },

{
  "label": "中宁县",
  "value": "640521" },

{
  "label": "海原县",
  "value": "640522" }]],



[
[{
  "label": "天山区",
  "value": "650102" },

{
  "label": "沙依巴克区",
  "value": "650103" },

{
  "label": "新市区",
  "value": "650104" },

{
  "label": "水磨沟区",
  "value": "650105" },

{
  "label": "头屯河区",
  "value": "650106" },

{
  "label": "达坂城区",
  "value": "650107" },

{
  "label": "米东区",
  "value": "650109" },

{
  "label": "乌鲁木齐县",
  "value": "650121" },

{
  "label": "乌鲁木齐经济技术开发区",
  "value": "650171" },

{
  "label": "乌鲁木齐高新技术产业开发区",
  "value": "650172" }],


[{
  "label": "独山子区",
  "value": "650202" },

{
  "label": "克拉玛依区",
  "value": "650203" },

{
  "label": "白碱滩区",
  "value": "650204" },

{
  "label": "乌尔禾区",
  "value": "650205" }],


[{
  "label": "高昌区",
  "value": "650402" },

{
  "label": "鄯善县",
  "value": "650421" },

{
  "label": "托克逊县",
  "value": "650422" }],


[{
  "label": "伊州区",
  "value": "650502" },

{
  "label": "巴里坤哈萨克自治县",
  "value": "650521" },

{
  "label": "伊吾县",
  "value": "650522" }],


[{
  "label": "昌吉市",
  "value": "652301" },

{
  "label": "阜康市",
  "value": "652302" },

{
  "label": "呼图壁县",
  "value": "652323" },

{
  "label": "玛纳斯县",
  "value": "652324" },

{
  "label": "奇台县",
  "value": "652325" },

{
  "label": "吉木萨尔县",
  "value": "652327" },

{
  "label": "木垒哈萨克自治县",
  "value": "652328" }],


[{
  "label": "博乐市",
  "value": "652701" },

{
  "label": "阿拉山口市",
  "value": "652702" },

{
  "label": "精河县",
  "value": "652722" },

{
  "label": "温泉县",
  "value": "652723" }],


[{
  "label": "库尔勒市",
  "value": "652801" },

{
  "label": "轮台县",
  "value": "652822" },

{
  "label": "尉犁县",
  "value": "652823" },

{
  "label": "若羌县",
  "value": "652824" },

{
  "label": "且末县",
  "value": "652825" },

{
  "label": "焉耆回族自治县",
  "value": "652826" },

{
  "label": "和静县",
  "value": "652827" },

{
  "label": "和硕县",
  "value": "652828" },

{
  "label": "博湖县",
  "value": "652829" },

{
  "label": "库尔勒经济技术开发区",
  "value": "652871" }],


[{
  "label": "阿克苏市",
  "value": "652901" },

{
  "label": "温宿县",
  "value": "652922" },

{
  "label": "库车县",
  "value": "652923" },

{
  "label": "沙雅县",
  "value": "652924" },

{
  "label": "新和县",
  "value": "652925" },

{
  "label": "拜城县",
  "value": "652926" },

{
  "label": "乌什县",
  "value": "652927" },

{
  "label": "阿瓦提县",
  "value": "652928" },

{
  "label": "柯坪县",
  "value": "652929" }],


[{
  "label": "阿图什市",
  "value": "653001" },

{
  "label": "阿克陶县",
  "value": "653022" },

{
  "label": "阿合奇县",
  "value": "653023" },

{
  "label": "乌恰县",
  "value": "653024" }],


[{
  "label": "喀什市",
  "value": "653101" },

{
  "label": "疏附县",
  "value": "653121" },

{
  "label": "疏勒县",
  "value": "653122" },

{
  "label": "英吉沙县",
  "value": "653123" },

{
  "label": "泽普县",
  "value": "653124" },

{
  "label": "莎车县",
  "value": "653125" },

{
  "label": "叶城县",
  "value": "653126" },

{
  "label": "麦盖提县",
  "value": "653127" },

{
  "label": "岳普湖县",
  "value": "653128" },

{
  "label": "伽师县",
  "value": "653129" },

{
  "label": "巴楚县",
  "value": "653130" },

{
  "label": "塔什库尔干塔吉克自治县",
  "value": "653131" }],


[{
  "label": "和田市",
  "value": "653201" },

{
  "label": "和田县",
  "value": "653221" },

{
  "label": "墨玉县",
  "value": "653222" },

{
  "label": "皮山县",
  "value": "653223" },

{
  "label": "洛浦县",
  "value": "653224" },

{
  "label": "策勒县",
  "value": "653225" },

{
  "label": "于田县",
  "value": "653226" },

{
  "label": "民丰县",
  "value": "653227" }],


[{
  "label": "伊宁市",
  "value": "654002" },

{
  "label": "奎屯市",
  "value": "654003" },

{
  "label": "霍尔果斯市",
  "value": "654004" },

{
  "label": "伊宁县",
  "value": "654021" },

{
  "label": "察布查尔锡伯自治县",
  "value": "654022" },

{
  "label": "霍城县",
  "value": "654023" },

{
  "label": "巩留县",
  "value": "654024" },

{
  "label": "新源县",
  "value": "654025" },

{
  "label": "昭苏县",
  "value": "654026" },

{
  "label": "特克斯县",
  "value": "654027" },

{
  "label": "尼勒克县",
  "value": "654028" }],


[{
  "label": "塔城市",
  "value": "654201" },

{
  "label": "乌苏市",
  "value": "654202" },

{
  "label": "额敏县",
  "value": "654221" },

{
  "label": "沙湾县",
  "value": "654223" },

{
  "label": "托里县",
  "value": "654224" },

{
  "label": "裕民县",
  "value": "654225" },

{
  "label": "和布克赛尔蒙古自治县",
  "value": "654226" }],


[{
  "label": "阿勒泰市",
  "value": "654301" },

{
  "label": "布尔津县",
  "value": "654321" },

{
  "label": "富蕴县",
  "value": "654322" },

{
  "label": "福海县",
  "value": "654323" },

{
  "label": "哈巴河县",
  "value": "654324" },

{
  "label": "青河县",
  "value": "654325" },

{
  "label": "吉木乃县",
  "value": "654326" }],


[{
  "label": "石河子市",
  "value": "659001" },

{
  "label": "阿拉尔市",
  "value": "659002" },

{
  "label": "图木舒克市",
  "value": "659003" },

{
  "label": "五家渠市",
  "value": "659004" },

{
  "label": "铁门关市",
  "value": "659006" }]],



[
[{
  "label": "台北",
  "value": "660101" }],

[{
  "label": "高雄",
  "value": "660201" }],

[{
  "label": "基隆",
  "value": "660301" }],

[{
  "label": "台中",
  "value": "660401" }],

[{
  "label": "台南",
  "value": "660501" }],

[{
  "label": "新竹",
  "value": "660601" }],

[{
  "label": "嘉义",
  "value": "660701" }],

[{
  "label": "宜兰",
  "value": "660801" }],

[{
  "label": "桃园",
  "value": "660901" }],

[{
  "label": "苗栗",
  "value": "661001" }],

[{
  "label": "彰化",
  "value": "661101" }],

[{
  "label": "南投",
  "value": "661201" }],

[{
  "label": "云林",
  "value": "661301" }],

[{
  "label": "屏东",
  "value": "661401" }],

[{
  "label": "台东",
  "value": "661501" }],

[{
  "label": "花莲",
  "value": "661601" }],

[{
  "label": "澎湖",
  "value": "661701" }]],


[
[{
  "label": "香港岛",
  "value": "670101" }],

[{
  "label": "九龙",
  "value": "670201" }],

[{
  "label": "新界",
  "value": "670301" }]],


[
[{
  "label": "澳门半岛",
  "value": "680101" }],

[{
  "label": "氹仔岛",
  "value": "680201" }],

[{
  "label": "路环岛",
  "value": "680301" }],

[{
  "label": "路氹城",
  "value": "680401" }]],


[
[{
  "label": "钓鱼岛全岛",
  "value": "690101" }]]];var _default =



areaData;exports.default = _default;

/***/ }),

/***/ 262:
/*!****************************************************************!*\
  !*** D:/资料/程序资料/黔诺康/components/uni-swipe-action-item/mpwxs.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  data: function data() {
    return {
      position: [],
      button: [] };

  },
  computed: {
    pos: function pos() {
      return JSON.stringify(this.position);
    },
    btn: function btn() {
      return JSON.stringify(this.button);
    } },

  watch: {
    show: function show(newVal) {
      if (this.autoClose) return;
      var valueObj = this.position[0];
      if (!valueObj) {
        this.init();
        return;
      }
      valueObj.show = newVal;
      this.$set(this.position, 0, valueObj);
    } },

  created: function created() {
    if (this.swipeaction.children !== undefined) {
      this.swipeaction.children.push(this);
    }
  },
  mounted: function mounted() {
    this.init();

  },
  beforeDestroy: function beforeDestroy() {var _this = this;
    this.swipeaction.children.forEach(function (item, index) {
      if (item === _this) {
        _this.swipeaction.children.splice(index, 1);
      }
    });
  },
  methods: {
    init: function init() {var _this2 = this;

      setTimeout(function () {
        _this2.getSize();
        _this2.getButtonSize();
      }, 50);
    },
    closeSwipe: function closeSwipe(e) {
      if (!this.autoClose) return;
      this.swipeaction.closeOther(this);
    },

    change: function change(e) {
      this.$emit('change', e.open);
      var valueObj = this.position[0];
      if (valueObj.show !== e.open) {
        valueObj.show = e.open;
        this.$set(this.position, 0, valueObj);
      }
    },
    onClick: function onClick(index, item) {
      this.$emit('click', {
        content: item,
        index: index });

    },
    getSize: function getSize() {var _this3 = this;
      var views = uni.createSelectorQuery().in(this);
      views.
      selectAll('.selector-query-hock').
      boundingClientRect(function (data) {
        if (_this3.autoClose) {
          data[0].show = false;
        } else {
          data[0].show = _this3.show;
        }
        _this3.position = data;
      }).
      exec();
    },
    getButtonSize: function getButtonSize() {var _this4 = this;
      var views = uni.createSelectorQuery().in(this);
      views.
      selectAll('.button-hock').
      boundingClientRect(function (data) {
        _this4.button = data;
      }).
      exec();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*********************************!*\
  !*** D:/资料/程序资料/黔诺康/pages.json ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 52:
/*!*******************************************!*\
  !*** D:/资料/程序资料/黔诺康/static/icon-logo.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACQCAYAAADqWJL/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAw9pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjA0OTc2ODU3RUY2MTFFQUE1RDE5RDY0RTA0RDE5OTQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjA0OTc2ODQ3RUY2MTFFQUE1RDE5RDY0RTA0RDE5OTQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0iMzdENTQzRDEzNjM3QkE4NDA0MUEzNkNERTVBQjVDM0YiIHN0UmVmOmRvY3VtZW50SUQ9IjM3RDU0M0QxMzYzN0JBODQwNDFBMzZDREU1QUI1QzNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+42lwhwAAfHRJREFUeNrsvWeQZel5HvbFk27qHKcnz+zOLjYCC2AR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"

/***/ }),

/***/ 53:
/*!****************************************!*\
  !*** D:/资料/程序资料/黔诺康/static/icon/2.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD7klEQVRYR+2Xb2iVdRTHP9/n7m+QgxISEfrj0Gw6u/eRcJVrFL4QhKCxe61EF1hgRYWEgfhiJBLSizDBF/NFxZBt9+IbhYqIWmITHffuj3/K1QtpBUp/NHNbl+0+J57nun9et92xrfWi8+pyn+f8zvf3Ped8z3nEApsWOD4zAmAxdyfwKmYrkIpmDN7MQH1gX2LpN5W4cDNvABaNHEDaPeOgkzv0MnhzXV4ALBZZDzqNMYy8dxgcOKLjl/6aKRirI0QoXIPnHEE8iNnh/ABEw3uRsw/z3lO8c89MA9/+vkXD1cj5Buy7/ADEIh+B6vG8bUp0Ns0agM+E4w4DQ3kCcD8BtoFtVWvq6KwBgIi5np/S/z4Ae65yGYUFjaBN/woD1oDDxfCToCioFrFkjPJ5TIHVVRShot1IO0FLR4MaGbAOZF/geY1KdP8y5zVgtWseIlT0KWJlcLjZSRyOYsPteJleKNmIwxsovUMt5/vmFIC9WL6I4bIUsBzjHJnh53Ws+8L4IDbShua9oHhn89wCiEZ82g9g1sGganQiOZAjHLF5bEOLuf7twxhPK578eiS41T26Ecf5HOTMaxFazB0ESvCu3qXEz/7vbBnkAhjCsyolUsm5TUHMtUCR4snC2R6cr78/k0eV0P4HMAUDFqtcDYWbwTJ4doqKzjNqwJuOaqurXIkKnkVykH1LJtWuhC9ot+pruhQEOYq674PtQhobWMYlHLarJXlmMhAWjTSA9iJC47rnMvJeUktXW1Dg0wIYWUCyqvgVUhdYNWgdZmkyPKZjqZ5cvYi8DjqUbSNOIc5iVoVUhS/pTqZaLV3tUwKwTeXFLCq7HrSmUa940t8FsmdGI/uR9oC1qzX1xAS1zLJ2DVEGvKXW5MFxflmxg+/Vmlw1NYAtkQ2YToL9oNbUiglB6h8oYfDeG0AhTnqJms9fHdMNdw0OPRhXiCeXKmB6RFOCDegKsBhv6GESPb3j2/BPzO5GVo/sJzzncaT9PvWKp57JoTnq9iGWgbc9eH/EvFAlwr91Sq1JNzc97jlgNfAaZn1IxzF+l8Xcw4C/7080Y4AQ96s5+dvoTWrXhiko8KV7KhtC6eXjp+atads7sTCDOjkke8Ut5Dofgq0aO1VLgtFsnMWxtxno76KkdAM4B5HKwXyqr+WgkBYDFWDdeOwi3d9Bcel6nNAHwf9mF4FfQf3gneCRzsY77oQW5PqeBGhz7lWtnaupp9SGv9VOMKuhgPsiTaAtd/DrpvSP9fr48t/jn026lGa1ILIDeBlUAXQia+PGjX367Mf0VDmwaGRr8AmH1gZswUmKh99VU0//7X55bcXT5HxWjxccwD+bGREC0n3YdQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 54:
/*!******************************************!*\
  !*** D:/资料/程序资料/黔诺康/static/Positive.jpg ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAKAAD/4QN6aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6N2VkYzYyNTItNmM1Yy05ZDQxLWI1OTUtNjg1YTdiN2NlYTI4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIxQjk4M0YxN0ZDRjExRUE5NTIxQTJBQkJENTMyMkQ1IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIxQjk4M0YwN0ZDRjExRUE5NTIxQTJBQkJENTMyMkQ1IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkY2I4YTZkMC01Zjk5LWE4NDAtODUyZS1mNjMwZTQyY2E0N2QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N2VkYzYyNTItNmM1Yy05ZDQxLWI1OTUtNjg1YTdiN2NlYTI4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3Jk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"

/***/ }),

/***/ 57:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 58);

/***/ }),

/***/ 58:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 59);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 59:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map