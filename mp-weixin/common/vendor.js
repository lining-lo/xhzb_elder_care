"use strict";
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return expectsLowerCase ? (val) => set2.has(val.toLowerCase()) : (val) => set2.has(val);
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i3 = arr.indexOf(el);
  if (i3 > -1) {
    arr.splice(i3, 1);
  }
};
const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty$2.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$2 = (val) => val !== null && typeof val === "object";
const isPromise$1 = (val) => {
  return (isObject$2(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c3) => c3 ? c3.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s4 = str ? `on${capitalize(str)}` : ``;
  return s4;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i3 = 0; i3 < fns.length; i3++) {
    fns[i3](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i3 = 0; i3 < value.length; i3++) {
      const item = value[i3];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject$2(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i3 = 0; i3 < value.length; i3++) {
      const normalized = normalizeClass(value[i3]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$2(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject$2(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i3) => {
          entries[stringifySymbol(key, i3) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v2) => stringifySymbol(v2))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject$2(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v2, i3 = "") => {
  var _a;
  return isSymbol(v2) ? `Symbol(${(_a = v2.description) != null ? _a : i3})` : v2;
};
const isObject$1 = (val) => val !== null && typeof val === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile$1(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format2, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format2.length) {
    let char = format2[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format2[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format2[position++];
      }
      const isClosed = char === endDelimiter;
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile$1(tokens, values) {
  const compiled = [];
  let index2 = 0;
  const mode = Array.isArray(values) ? "list" : isObject$1(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index2 < tokens.length) {
    const token = tokens[index2];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        } else {
          {
            console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
          }
        }
        break;
      case "unknown":
        {
          console.warn(`Detect 'unknown' type of token!`);
        }
        break;
    }
    index2++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale2, messages) {
  if (!locale2) {
    return;
  }
  locale2 = locale2.trim().replace(/_/g, "-");
  if (messages && messages[locale2]) {
    return locale2;
  }
  locale2 = locale2.toLowerCase();
  if (locale2 === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale2.indexOf("zh") === 0) {
    if (locale2.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale2.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale2, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  const lang = startsWith(locale2, locales);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale: locale2, fallbackLocale, messages, watcher, formater: formater2 }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater2 || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale2 || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale2) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale2, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index2 = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index2, 1);
    };
  }
  add(locale2, message, override = true) {
    const curMessages = this.messages[locale2];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key];
          }
        });
      }
    } else {
      this.messages[locale2] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key, locale2, values) {
    let message = this.message;
    if (typeof locale2 === "string") {
      locale2 = normalizeLocale(locale2, this.messages);
      locale2 && (message = this.messages[locale2]);
    } else {
      values = locale2;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function watchAppLocale(appVm, i18n) {
  if (appVm.$watchLocale) {
    appVm.$watchLocale((newLocale) => {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(() => appVm.$locale, (newLocale) => {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof index !== "undefined" && index.getLocale) {
    return index.getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale2, messages = {}, fallbackLocale, watcher) {
  if (typeof locale2 !== "string") {
    const options = [
      messages,
      locale2
    ];
    locale2 = options[0];
    messages = options[1];
  }
  if (typeof locale2 !== "string") {
    locale2 = getDefaultLocale();
  }
  if (typeof fallbackLocale !== "string") {
    fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n = new I18n({
    locale: locale2,
    fallbackLocale,
    messages,
    watcher
  });
  let t3 = (key, values) => {
    if (typeof getApp !== "function") {
      t3 = function(key2, values2) {
        return i18n.t(key2, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t3 = function(key2, values2) {
        const appVm = getApp().$vm;
        if (appVm) {
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key2, values2);
      };
    }
    return t3(key, values);
  };
  return {
    i18n,
    f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t(key, values) {
      return t3(key, values);
    },
    add(locale22, message, override = true) {
      return i18n.add(locale22, message, override);
    },
    watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale() {
      return i18n.getLocale();
    },
    setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_SHARE_CHAT = "onShareChat";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const VIRTUAL_HOST_STYLE = "virtualHostStyle";
const VIRTUAL_HOST_CLASS = "virtualHostClass";
const VIRTUAL_HOST_HIDDEN = "virtualHostHidden";
const VIRTUAL_HOST_ID = "virtualHostId";
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i3 = 0; i3 < fns.length; i3++) {
    ret = fns[i3](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x2) => x2.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  return createErrorHandler2(app);
});
const E$1 = function() {
};
E$1.prototype = {
  _id: 1,
  on: function(name, callback, ctx) {
    var e3 = this.e || (this.e = {});
    (e3[name] || (e3[name] = [])).push({
      fn: callback,
      ctx,
      _id: this._id
    });
    return this._id++;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i3 = 0;
    var len = evtArr.length;
    for (i3; i3 < len; i3++) {
      evtArr[i3].fn.apply(evtArr[i3].ctx, data);
    }
    return this;
  },
  off: function(name, event) {
    var e3 = this.e || (this.e = {});
    var evts = e3[name];
    var liveEvents = [];
    if (evts && event) {
      for (var i3 = evts.length - 1; i3 >= 0; i3--) {
        if (evts[i3].fn === event || evts[i3].fn._ === event || evts[i3]._id === event) {
          evts.splice(i3, 1);
          break;
        }
      }
      liveEvents = evts;
    }
    liveEvents.length ? e3[name] = liveEvents : delete e3[name];
    return this;
  }
};
var E$1$1 = E$1;
/**
* @dcloudio/uni-mp-vue v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i3, l2;
      for (i3 = 0, l2 = this.effects.length; i3 < l2; i3++) {
        this.effects[i3].stop();
      }
      for (i3 = 0, l2 = this.cleanups.length; i3 < l2; i3++) {
        this.cleanups[i3]();
      }
      if (this.scopes) {
        for (i3 = 0, l2 = this.scopes.length; i3 < l2; i3++) {
          this.scopes[i3].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeEffect;
class ReactiveEffect {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i3 = 0; i3 < this._depsLength; i3++) {
        const dep = this.deps[i3];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v2) {
    this._dirtyLevel = v2 ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i3 = effect2._depsLength; i3 < effect2.deps.length; i3++) {
      cleanupDepEffect(effect2.deps[i3], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    {
      (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      {
        (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
      {
        target,
        type,
        key
      }
    );
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
        {
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        }
      );
    }
  }
  resetScheduling();
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i3 = 0, l2 = this.length; i3 < l2; i3++) {
        track(arr, "get", i3 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$2(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$1(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn$1(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    {
      warn$2(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn$2(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get22 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get22.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get22 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get22 ? get22.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn$1(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    warn$2(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$2(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$2(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$2(value) ? readonly(value) : value;
const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self = toRaw(this);
    if ((!self._cacheable || self.effect.dirty) && hasChanged(self._value, self._value = self.effect.run())) {
      triggerRefValue(self, 4);
    }
    trackRefValue(self);
    if (self.effect._dirtyLevel >= 2) {
      if (this._warnRecursive) {
        warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
      }
      triggerRefValue(self, 2);
    }
    return self._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v2) {
    this.effect.dirty = v2;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      warn$2("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
      {
        target: ref2,
        type: "get",
        key: "value"
      }
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      }
    );
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a4) => {
          var _a, _b;
          return (_b = (_a = a4.toString) == null ? void 0 : _a.call(a4)) != null ? _b : JSON.stringify(a4);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i3) => {
    logs.push(...i3 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise$1(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i3 = 0; i3 < fn.length; i3++) {
    values.push(callWithAsyncErrorHandling(fn[i3], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i3 = 0; i3 < errorCapturedHooks.length; i3++) {
          if (errorCapturedHooks[i3](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue$1 = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue$1[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue$1.length || !queue$1.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue$1.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i3 = queue$1.indexOf(job);
  if (i3 > flushIndex) {
    queue$1.splice(i3, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i3 = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i3 < queue$1.length; i3++) {
    const cb = queue$1[i3];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue$1.splice(i3, 1);
      i3--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a4, b3) => getId(a4) - getId(b3)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a4, b3) => {
  const diff2 = getId(a4) - getId(b3);
  if (diff2 === 0) {
    if (a4.pre && !b3.pre)
      return -1;
    if (b3.pre && !a4.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue$1.length; flushIndex++) {
      const job = queue$1[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue$1.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue$1.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid2 = validator(...rawArgs);
          if (!isValid2) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a4) => isString(a4) ? a4.trim() : a4);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$2(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$2(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(
      `resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once: once2,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once2) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once2 !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s22) => {
    warn$1(
      `Invalid watch source: `,
      s22,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s22) => isReactive(s22) || isShallow(s22));
    getter = () => source.map((s22) => {
      if (isRef(s22)) {
        return s22.value;
      } else if (isReactive(s22)) {
        return reactiveGetter(s22);
      } else if (isFunction(s22)) {
        return callWithErrorHandling(s22, instance, 2);
      } else {
        warnInvalidSource(s22);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i3) => hasChanged(v2, oldValue[i3])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove(scope.effects, effect2);
    }
  };
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i3 = 0; i3 < segments.length && cur; i3++) {
      cur = cur[segments[i3]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen) {
  if (!isObject$2(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (isArray(value)) {
    for (let i3 = 0; i3 < value.length; i3++) {
      traverse(value[i3], depth, currentDepth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, depth, currentDepth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen);
    }
  }
  return value;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$2(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(
      (ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, "")
    );
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`
    );
  }
}
const createHook$1 = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook$1("bm");
const onMounted = createHook$1("m");
const onBeforeUpdate = createHook$1("bu");
const onUpdated = createHook$1("u");
const onBeforeUnmount = createHook$1("bum");
const onUnmounted = createHook$1("um");
const onServerPrefetch = createHook$1("sp");
const onRenderTriggered = createHook$1(
  "rtg"
);
const onRenderTracked = createHook$1(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const getPublicInstance = (i3) => {
  if (!i3)
    return null;
  if (isStatefulComponent(i3))
    return getExposeProxy(i3) || i3.proxy;
  return getPublicInstance(i3.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i3) => i3,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i3) => i3.__$el || (i3.__$el = {}),
    $data: (i3) => i3.data,
    $props: (i3) => shallowReadonly(i3.props),
    $attrs: (i3) => shallowReadonly(i3.attrs),
    $slots: (i3) => shallowReadonly(i3.slots),
    $refs: (i3) => shallowReadonly(i3.refs),
    $parent: (i3) => getPublicInstance(i3.parent),
    $root: (i3) => getPublicInstance(i3.root),
    $emit: (i3) => i3.emit,
    $options: (i3) => resolveMergedOptions(i3),
    $forceUpdate: (i3) => i3.f || (i3.f = () => {
      i3.effect.dirty = true;
      queueJob(i3.update);
    }),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i3) => instanceWatch.bind(i3)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$1(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn$1(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn$1(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$1(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$1(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  function initInjections() {
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
  }
  {
    initInjections();
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise$1(data)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject$2(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get22 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get22 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      };
      const c22 = computed({
        get: get22,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c22.value,
        set: (v2) => c22.value = v2
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  function initProvides() {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    initProvides();
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register2, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register2(_hook.bind(publicThis)));
    } else if (hook) {
      register2(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$2(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v2) => injected.value = v2
      });
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h22) => h22.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$2(raw)) {
    if (isArray(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m22) => mergeOptions(resolved, m22, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$2(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m22) => mergeOptions(to, m22, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i3 = 0; i3 < raw.length; i3++) {
      res[raw[i3]] = raw[i3];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext() && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i3 = 0; i3 < propsToUpdate.length; i3++) {
        let key = propsToUpdate[i3];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue$1(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$1(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue$1(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i3 = 0; i3 < needCastKeys.length; i3++) {
      const key = needCastKeys[i3];
      props[key] = resolvePropValue$1(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn$1(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue$1(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$2(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i3 = 0; i3 < raw.length; i3++) {
      if (!isString(raw[i3])) {
        warn$1(`props must be strings when using array syntax.`, raw[i3]);
      }
      const normalizedKey = camelize(raw[i3]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$2(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$2(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType$1(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a4, b3) {
  return getType$1(a4) === getType$1(b3);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t22) => isSameType(t22, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp$1(
      key,
      resolvedValues[key],
      opt,
      shallowReadonly(resolvedValues),
      !hasOwn$1(rawProps, key) && !hasOwn$1(rawProps, hyphenate(key))
    );
  }
}
function validateProp$1(name, value, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid2 = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i3 = 0; i3 < types.length && !isValid2; i3++) {
      const { valid, expectedType } = assertType$1(value, types[i3]);
      expectedTypes.push(expectedType || "");
      isValid2 = valid;
    }
    if (!isValid2) {
      warn$1(getInvalidTypeMessage$1(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t22 = typeof value;
    valid = t22 === expectedType.toLowerCase();
    if (!valid && t22 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$2(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null,
    // fixed by xxxxxx 用于存储uni-app的元素缓存
    $uniElements: /* @__PURE__ */ new Map(),
    $templateUniElementRefs: [],
    $templateUniElementStyles: {},
    $eS: {}
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  internalSetCurrentInstance = (i3) => {
    currentInstance = i3;
  };
  setInSSRSetupState = (v2) => {
    isInSSRComponentSetup = v2;
  };
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i3 = 0; i3 < names.length; i3++) {
        validateComponentName(names[i3], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i3 = 0; i3 < names.length; i3++) {
        validateDirectiveName(names[i3]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        shallowReadonly(instance.props),
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise$1(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(
          `setup() returned a Promise, but the version of Vue you are using does not support it yet.`
        );
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$2(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions$1(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c22) => c22.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match2 = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match2) {
      name = match2[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  const c22 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  {
    const i3 = getCurrentInstance();
    if (i3 && i3.appContext.config.warnRecursiveComputed) {
      c22._warnRecursive = true;
    }
  }
  return c22;
};
const version = "3.4.21";
const warn = warn$1;
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            if (currentValue.length < preValue.length) {
              setResult(
                result,
                (path == "" ? "" : path + ".") + key,
                currentValue
              );
            } else {
              currentValue.forEach((item, index2) => {
                _diff(
                  item,
                  preValue[index2],
                  (path == "" ? "" : path + ".") + key + "[" + index2 + "]",
                  result
                );
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            for (let subKey in currentValue) {
              _diff(
                currentValue[subKey],
                preValue[subKey],
                (path == "" ? "" : path + ".") + key + "." + subKey,
                result
              );
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k2, v2) {
  result[k2] = v2;
}
function hasComponentEffect(instance) {
  return queue$1.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i3 = 0; i3 < copies.length; i3++) {
      copies[i3]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i3 = 0; i3 < len; i3++) {
        copy[i3] = clone(src[i3], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn$1(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  data.$eS = instance.$eS || {};
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(
    options,
    instance,
    publicThis
  );
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const {
    setupState,
    $templateRefs,
    $templateUniElementRefs,
    ctx: { $scope, $mpPlatform }
  } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$scope || !$templateRefs && !$templateUniElementRefs) {
    return;
  }
  if (isUnmount) {
    $templateRefs && $templateRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
    $templateUniElementRefs && $templateUniElementRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
    return;
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    if (refs.length === 0) {
      return [];
    }
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat(
        $scope.selectAllComponents(".r-i-f") || []
      )
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    if ($templateRefs) {
      const refs = doSetByRefs($templateRefs);
      if (refs.length && instance.proxy && instance.proxy.$scope) {
        instance.proxy.$scope.setData({ r1: 1 }, () => {
          doSetByRefs(refs);
        });
      }
    }
  };
  if ($templateUniElementRefs && $templateUniElementRefs.length) {
    nextTick(instance, () => {
      $templateUniElementRefs.forEach((templateRef) => {
        if (isArray(templateRef.v)) {
          templateRef.v.forEach((v2) => {
            setTemplateRef(templateRef, v2, setupState);
          });
        } else {
          setTemplateRef(templateRef, templateRef.v, setupState);
        }
      });
    });
  }
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject$2(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find(
    (com) => com && (com.properties || com.props).uI === id
  );
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          if (refValue.$) {
            onBeforeUnmount(() => remove(existing, refValue), refValue.$);
          }
        }
      } else if (_isString) {
        if (hasOwn$1(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const {
    type: Component2,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    uid: uid2,
    appContext: {
      app: {
        config: {
          globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 }
        }
      }
    },
    inheritAttrs
  } = instance;
  instance.$uniElementIds = /* @__PURE__ */ new Map();
  instance.$templateRefs = [];
  instance.$templateUniElementRefs = [];
  instance.$templateUniElementStyles = {};
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(
        proxyToUse,
        proxyToUse,
        renderCache,
        props,
        setupState,
        data,
        ctx
      );
    } else {
      fallthroughAttrs(
        inheritAttrs,
        props,
        propsOptions,
        Component2.props ? attrs : getFunctionalFallthrough(attrs)
      );
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter(
      (key) => key !== "class" && key !== "style"
    );
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(
        data,
        oldScopedSlotData[index2]
      );
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect: effect2, update: update3 }, allowed) {
  effect2.allowRecurse = update3.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(
    instance
  );
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u: u3 } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u3) {
        queuePostRenderEffect(u3);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect2 = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    NOOP,
    () => queueJob(update3),
    instance.scope
    // track it in component's effect scope
  );
  const update3 = instance.update = () => {
    if (effect2.dirty) {
      effect2.run();
    }
  };
  update3.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect2.onTrack = instance.rtc ? (e22) => invokeArrayFns$1(instance.rtc, e22) : void 0;
    effect2.onTrigger = instance.rtg ? (e22) => invokeArrayFns$1(instance.rtg, e22) : void 0;
    update3.ownerInstance = instance;
  }
  {
    update3();
  }
}
function unmountComponent(instance) {
  const { bum, scope, update: update3, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  {
    const parentInstance = instance.parent;
    if (parentInstance) {
      const $children = parentInstance.ctx.$children;
      const target = getExposeProxy(instance) || instance.proxy;
      const index2 = $children.indexOf(target);
      if (index2 > -1) {
        $children.splice(index2, 1);
      }
    }
  }
  scope.stop();
  if (update3) {
    update3.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode2 = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent22(initialVNode, options) {
    return mountComponent(createVNode2(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(
      createVNode2({ type: rootComponent }),
      {
        mpType: "app",
        mpInstance: null,
        parentComponent: null,
        slots: [],
        props: null
      }
    );
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  const userErrorHandler = app.config.errorHandler;
  return function errorHandler(err, instance, info) {
    if (userErrorHandler) {
      userErrorHandler(err, instance, info);
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    if (appInstance[ON_ERROR]) {
      {
        appInstance.proxy.$callHook(ON_ERROR, err);
      }
    } else {
      logError(err, info, instance ? instance.$.vnode : null, false);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i3 = 0;
    for (; i3 < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i3++)) << 18 | b64.indexOf(str.charAt(i3++)) << 12 | (r1 = b64.indexOf(str.charAt(i3++))) << 6 | (r2 = b64.indexOf(str.charAt(i3++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c22) {
    return "%" + ("00" + c22.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined" && typeof global[method] !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq" || ctx.$mpPlatform === "mp-xhs") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e22) => {
    patchMPEvent(e22);
    let args = [e22];
    if (instance && instance.ctx.$getTriggerEventDetail) {
      if (typeof e22.detail === "number") {
        e22.detail = instance.ctx.$getTriggerEventDetail(e22.detail);
      }
    }
    if (e22.detail && e22.detail.__args__) {
      args = e22.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e22, eventValue), instance, 5, args);
    const eventTarget = e22.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e22.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e22.type === "input" && (isArray(res) || isPromise$1(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event, instance) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn$1(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn$1(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn$1(event.detail, "checked") && !hasOwn$1(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e22, value) {
  if (isArray(value)) {
    const originalStop = e22.stopImmediatePropagation;
    e22.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e22);
      e22._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i3 = 0, l2 = source.length; i3 < l2; i3++) {
      ret[i3] = renderItem(source[i3], i3, i3);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i3 = 0; i3 < source; i3++) {
      ret[i3] = renderItem(i3 + 1, i3, i3);
    }
  } else if (isObject$2(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i3) => renderItem(item, i3, i3));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i3 = 0, l2 = keys.length; i3 < l2; i3++) {
        const key = keys[i3];
        ret[i3] = renderItem(source[key], key, i3);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function setRef(ref2, id, opts = {}) {
  const { $templateRefs } = getCurrentInstance();
  $templateRefs.push({ i: id, r: ref2, k: opts.k, f: opts.f });
}
const o$1 = (value, key) => vOn(value, key);
const f$1 = (source, renderItem) => vFor(source, renderItem);
const s$1 = (value) => stringifyStyle(value);
const e$1 = (target, ...sources) => extend(target, ...sources);
const n$1 = (value) => normalizeClass(value);
const t$1 = (val) => toDisplayString(val);
const p$1 = (props) => renderProps(props);
const sr = (ref2, id, opts) => setRef(ref2, id, opts);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp(key, data[key], protocol[key], !hasOwn$1(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i3 = 0; i3 < len; i3++) {
    const opts = protocol[i3];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i3) {
      data[opts.name] = args[i3];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid2 = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i3 = 0; i3 < types.length && !isValid2; i3++) {
      const { valid, expectedType } = assertType(value, types[i3]);
      expectedTypes.push(expectedType || "");
      isValid2 = valid;
    }
    if (!isValid2) {
      return getInvalidTypeMessage(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t3 = typeof value;
    valid = t3 === expectedType.toLowerCase();
    if (!valid && t3 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$2(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType(ctor) {
  const match2 = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match2 ? match2[1] : "";
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e3) {
      console.error(e3);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue(hooks, data, params) {
  let promise = false;
  for (let i3 = 0; i3 < hooks.length; i3++) {
    const hook = hooks[i3];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise$1(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  args[0];
  {
    return;
  }
}
function invokeSuccess(id, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
  const errMsgPrefix = name + ":fail";
  let apiErrMsg = "";
  if (!errMsg) {
    apiErrMsg = errMsgPrefix;
  } else if (errMsg.indexOf(errMsgPrefix) === 0) {
    apiErrMsg = errMsg;
  } else {
    apiErrMsg = errMsgPrefix + " " + errMsg;
  }
  {
    delete errRes.errCode;
  }
  let res = extend({ errMsg: apiErrMsg }, errRes);
  return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  const errMsg = formatApiArgs(args);
  if (errMsg) {
    return errMsg;
  }
}
function parseErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    if (typeof globalThis === "undefined" || !globalThis.harmonyChannel) {
      console.error(errMsg.message + "\n" + errMsg.stack);
    }
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, parseErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { windowWidth, pixelRatio, platform } = Object.assign({}, wx.getWindowInfo(), {
    platform: wx.getDeviceInfo().platform
  });
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
function __f__(type, filename, ...args) {
  if (filename) {
    args.push(filename);
  }
  console[type].apply(console, args);
}
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i3 = 0; i3 < hooks.length; i3++) {
    if (res.indexOf(hooks[i3]) === -1) {
      res.push(hooks[i3]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: [Function, Number]
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
class EventBus {
  constructor() {
    this.$emitter = new E$1$1();
  }
  on(name, callback) {
    return this.$emitter.on(name, callback);
  }
  once(name, callback) {
    return this.$emitter.once(name, callback);
  }
  off(name, callback) {
    if (!name) {
      this.$emitter.e = {};
      return;
    }
    this.$emitter.off(name, callback);
  }
  emit(name, ...args) {
    this.$emitter.emit(name, ...args);
  }
}
const eventBus = new EventBus();
const $on = defineSyncApi(API_ON, (name, callback) => {
  eventBus.on(name, callback);
  return () => eventBus.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  eventBus.once(name, callback);
  return () => eventBus.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!isArray(name))
    name = name ? [name] : [];
  name.forEach((n2) => eventBus.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  eventBus.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e3) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i3 = 0; i3 < onPushMessageCallbacks.length; i3++) {
      const callback = onPushMessageCallbacks[i3];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_2, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|__f__|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|rpx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const TASK_APIS = ["request", "downloadFile", "uploadFile", "connectSocket"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function isTaskApi(name) {
  return TASK_APIS.indexOf(name) !== -1;
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn$1(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn$1(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      if (isFunction(argsOption)) {
        argsOption(fromArgs, {});
      }
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    const realKeepReturnValue = keepReturnValue || false;
    return processArgs(methodName, res, returnValue, {}, realKeepReturnValue);
  }
  return function wrapper(methodName, method) {
    const hasProtocol = hasOwn$1(protocols2, methodName);
    const needWrapper = hasProtocol || isFunction(protocols2.returnValue) || isContextApi(methodName) || isTaskApi(methodName);
    const hasMethod = hasProtocol || isFunction(method);
    if (!hasProtocol && !method) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    if (!needWrapper || !hasMethod) {
      return method;
    }
    const protocol = protocols2[methodName];
    return function(arg1, arg2) {
      let options = protocol || {};
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isContextApi(methodName) || isTaskApi(methodName)) {
        if (returnValue && !returnValue.__v_skip) {
          returnValue.__v_skip = true;
        }
      }
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getAppBaseInfo().language) || LOCALE_EN;
};
const setLocale = (locale2) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale2) {
    app.$vm.$locale = locale2;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale: locale2 }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_2, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function getOSInfo(system, platform) {
  let osName = "";
  let osVersion = "";
  if (platform && false) {
    osName = platform;
    osVersion = system;
  } else {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  return {
    osName: osName.toLocaleLowerCase(),
    osVersion
  };
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  const { osName, osVersion } = getOSInfo(system, platform);
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = (language || "").replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__5FE6024",
    appName: "zhyl-xcx",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.45",
    uniCompilerVersion: "4.45",
    uniRuntimeVersion: "4.45",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName,
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0,
    isUniAppX: false
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model, system = "", platform = "" } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    const { osName, osVersion } = getOSInfo(system, platform);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model,
      osName,
      osVersion
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = (language || "").replace(/_/g, "-");
    const parameters = {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__5FE6024",
      appName: "zhyl-xcx",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      isUniAppX: false,
      uniPlatform: "mp-weixin",
      uniCompileVersion: "4.45",
      uniCompilerVersion: "4.45",
      uniRuntimeVersion: "4.45"
    };
    extend(toRes, parameters);
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const onError = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {};
    if (!app.$vm) {
      if (!wx.$onErrorHandlers) {
        wx.$onErrorHandlers = [];
      }
      wx.$onErrorHandlers.push(fromArgs);
    } else {
      injectHook(ON_ERROR, fromArgs, app.$vm.$);
    }
  }
};
const offError = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {};
    if (!app.$vm) {
      if (!wx.$onErrorHandlers) {
        return;
      }
      const index2 = wx.$onErrorHandlers.findIndex((fn) => fn === fromArgs);
      if (index2 !== -1) {
        wx.$onErrorHandlers.splice(index2, 1);
      }
    } else if (fromArgs.__weh) {
      const onErrors = app.$vm.$[ON_ERROR];
      if (onErrors) {
        const index2 = onErrors.indexOf(fromArgs.__weh);
        if (index2 > -1) {
          onErrors.splice(index2, 1);
        }
      }
    }
  }
};
const onSocketOpen = {
  args() {
    if (wx.__uni_console__) {
      if (wx.__uni_console_warned__) {
        return;
      }
      wx.__uni_console_warned__ = true;
      console.warn(`开发模式下小程序日志回显会使用 socket 连接，为了避免冲突，建议使用 SocketTask 的方式去管理 WebSocket 或手动关闭日志回显功能。[详情](https://uniapp.dcloud.net.cn/tutorial/run/mp-log.html)`);
    }
  }
};
const onSocketMessage = onSocketOpen;
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  rpx2px: upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback,
  __f__
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn$1(target, key)) {
        return target[key];
      }
      if (hasOwn$1(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn$1(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  offError,
  onError,
  onSocketMessage,
  onSocketOpen,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
const CONSOLE_TYPES = ["log", "warn", "error", "info", "debug"];
let sendConsole = null;
const messageQueue = [];
function sendConsoleMessages(messages) {
  if (sendConsole == null) {
    messageQueue.push(...messages);
    return;
  }
  sendConsole(JSON.stringify({
    type: "console",
    data: messages
  }));
}
function setSendConsole(value) {
  sendConsole = value;
  if (value != null && messageQueue.length > 0) {
    const messages = messageQueue.slice();
    messageQueue.length = 0;
    sendConsoleMessages(messages);
  }
}
const originalConsole = /* @__PURE__ */ CONSOLE_TYPES.reduce((methods, type) => {
  methods[type] = console[type].bind(console);
  return methods;
}, {});
const atFileRegex = /^at\s+[\w/./-]+:\d+$/;
function rewriteConsole() {
  function wrapConsole(type) {
    return function(...args) {
      const originalArgs = [...args];
      if (originalArgs.length) {
        const maybeAtFile = originalArgs[originalArgs.length - 1];
        if (typeof maybeAtFile === "string" && atFileRegex.test(maybeAtFile)) {
          originalArgs.pop();
        }
      }
      {
        originalConsole[type](...originalArgs);
      }
      sendConsoleMessages([formatMessage(type, args)]);
    };
  }
  if (isConsoleWritable()) {
    CONSOLE_TYPES.forEach((type) => {
      console[type] = wrapConsole(type);
    });
    return function restoreConsole() {
      CONSOLE_TYPES.forEach((type) => {
        console[type] = originalConsole[type];
      });
    };
  } else {
    const oldLog = index.__f__;
    if (oldLog) {
      index.__f__ = function(...args) {
        const [type, filename, ...rest] = args;
        oldLog(type, "", ...rest);
        sendConsoleMessages([formatMessage(type, [...rest, filename])]);
      };
      return function restoreConsole() {
        index.__f__ = oldLog;
      };
    }
  }
  return function restoreConsole() {
  };
}
function isConsoleWritable() {
  const value = console.log;
  const sym = Symbol();
  try {
    console.log = sym;
  } catch (ex) {
    return false;
  }
  const isWritable = console.log === sym;
  console.log = value;
  return isWritable;
}
function formatMessage(type, args) {
  try {
    return {
      type,
      args: formatArgs(args)
    };
  } catch (e3) {
    originalConsole.error(e3);
  }
  return {
    type,
    args: []
  };
}
function formatArgs(args) {
  return args.map((arg) => formatArg(arg));
}
function formatArg(arg, depth = 0) {
  if (depth >= 7) {
    return {
      type: "object",
      value: "[Maximum depth reached]"
    };
  }
  return ARG_FORMATTERS[typeof arg](arg, depth);
}
function formatObject(value, depth) {
  if (value === null) {
    return {
      type: "null"
    };
  }
  if (isComponentPublicInstance(value)) {
    return formatComponentPublicInstance(value, depth);
  }
  if (isComponentInternalInstance(value)) {
    return formatComponentInternalInstance(value, depth);
  }
  if (isUniElement(value)) {
    return formatUniElement(value, depth);
  }
  if (isCSSStyleDeclaration(value)) {
    return formatCSSStyleDeclaration(value, depth);
  }
  if (Array.isArray(value)) {
    return {
      type: "object",
      subType: "array",
      value: {
        properties: value.map((v2, i3) => formatArrayElement(v2, i3, depth + 1))
      }
    };
  }
  if (value instanceof Set) {
    return {
      type: "object",
      subType: "set",
      className: "Set",
      description: `Set(${value.size})`,
      value: {
        entries: Array.from(value).map((v2) => formatSetEntry(v2, depth + 1))
      }
    };
  }
  if (value instanceof Map) {
    return {
      type: "object",
      subType: "map",
      className: "Map",
      description: `Map(${value.size})`,
      value: {
        entries: Array.from(value.entries()).map((v2) => formatMapEntry(v2, depth + 1))
      }
    };
  }
  if (value instanceof Promise) {
    return {
      type: "object",
      subType: "promise",
      value: {
        properties: []
      }
    };
  }
  if (value instanceof RegExp) {
    return {
      type: "object",
      subType: "regexp",
      value: String(value),
      className: "Regexp"
    };
  }
  if (value instanceof Date) {
    return {
      type: "object",
      subType: "date",
      value: String(value),
      className: "Date"
    };
  }
  if (value instanceof Error) {
    return {
      type: "object",
      subType: "error",
      value: value.message || String(value),
      className: value.name || "Error"
    };
  }
  return {
    type: "object",
    value: {
      properties: Object.entries(value).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function isComponentPublicInstance(value) {
  return value.$ && isComponentInternalInstance(value.$);
}
function isComponentInternalInstance(value) {
  return value.type && value.uid != null && value.appContext;
}
function formatComponentPublicInstance(value, depth) {
  return {
    type: "object",
    className: "ComponentPublicInstance",
    value: {
      properties: Object.entries(value.$.type).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function formatComponentInternalInstance(value, depth) {
  return {
    type: "object",
    className: "ComponentInternalInstance",
    value: {
      properties: Object.entries(value.type).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function isUniElement(value) {
  return value.style && value.tagName != null && value.nodeName != null;
}
function formatUniElement(value, depth) {
  return {
    type: "object",
    // 非 x 没有 UniElement 的概念
    // className: 'UniElement',
    value: {
      properties: Object.entries(value).filter(([name]) => [
        "id",
        "tagName",
        "nodeName",
        "dataset",
        "offsetTop",
        "offsetLeft",
        "style"
      ].includes(name)).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function isCSSStyleDeclaration(value) {
  return typeof value.getPropertyValue === "function" && typeof value.setProperty === "function" && value.$styles;
}
function formatCSSStyleDeclaration(style, depth) {
  return {
    type: "object",
    value: {
      properties: Object.entries(style.$styles).map(([name, value]) => formatObjectProperty(name, value, depth + 1))
    }
  };
}
function formatObjectProperty(name, value, depth) {
  return Object.assign(formatArg(value, depth), {
    name
  });
}
function formatArrayElement(value, index2, depth) {
  return Object.assign(formatArg(value, depth), {
    name: `${index2}`
  });
}
function formatSetEntry(value, depth) {
  return {
    value: formatArg(value, depth)
  };
}
function formatMapEntry(value, depth) {
  return {
    key: formatArg(value[0], depth),
    value: formatArg(value[1], depth)
  };
}
const ARG_FORMATTERS = {
  function(value) {
    return {
      type: "function",
      value: `function ${value.name}() {}`
    };
  },
  undefined() {
    return {
      type: "undefined"
    };
  },
  object(value, depth) {
    return formatObject(value, depth);
  },
  boolean(value) {
    return {
      type: "boolean",
      value: String(value)
    };
  },
  number(value) {
    return {
      type: "number",
      value: String(value)
    };
  },
  bigint(value) {
    return {
      type: "bigint",
      value: String(value)
    };
  },
  string(value) {
    return {
      type: "string",
      value
    };
  },
  symbol(value) {
    return {
      type: "symbol",
      value: value.description
    };
  }
};
function initRuntimeSocket(hosts, port, id) {
  if (!hosts || !port || !id)
    return Promise.resolve(null);
  return hosts.split(",").reduce((promise, host2) => {
    return promise.then((socket) => {
      if (socket)
        return socket;
      return tryConnectSocket(host2, port, id);
    });
  }, Promise.resolve(null));
}
const SOCKET_TIMEOUT = 500;
function tryConnectSocket(host2, port, id) {
  return new Promise((resolve2, reject) => {
    const socket = index.connectSocket({
      url: `ws://${host2}:${port}/${id}`,
      // 支付宝小程序 是否开启多实例
      multiple: true,
      fail() {
        resolve2(null);
      }
    });
    const timer = setTimeout(() => {
      socket.close({
        code: 1006,
        reason: "connect timeout"
      });
      resolve2(null);
    }, SOCKET_TIMEOUT);
    socket.onOpen((e3) => {
      clearTimeout(timer);
      resolve2(socket);
    });
    socket.onClose((e3) => {
      clearTimeout(timer);
      resolve2(null);
    });
    socket.onError((e3) => {
      clearTimeout(timer);
      resolve2(null);
    });
  });
}
let sendError = null;
const errorQueue = /* @__PURE__ */ new Set();
function sendErrorMessages(errors) {
  if (sendError == null) {
    errors.forEach((error) => {
      errorQueue.add(error);
    });
    return;
  }
  sendError(JSON.stringify({
    type: "error",
    data: errors.map((err) => {
      const isPromiseRejection = err && "promise" in err && "reason" in err;
      const prefix = isPromiseRejection ? "UnhandledPromiseRejection: " : "";
      if (isPromiseRejection) {
        err = err.reason;
      }
      if (err instanceof Error && err.stack) {
        return prefix + err.stack;
      }
      if (typeof err === "object" && err !== null) {
        try {
          return prefix + JSON.stringify(err);
        } catch (err2) {
          return prefix + String(err2);
        }
      }
      return prefix + String(err);
    })
  }));
}
function setSendError(value) {
  sendError = value;
  if (value != null && errorQueue.size > 0) {
    const errors = Array.from(errorQueue);
    errorQueue.clear();
    sendErrorMessages(errors);
  }
}
function initOnError() {
  function onError2(error) {
    try {
      if (typeof PromiseRejectionEvent !== "undefined" && error instanceof PromiseRejectionEvent && error.reason instanceof Error && error.reason.message && error.reason.message.includes(`Cannot create property 'errMsg' on string 'taskId`)) {
        return;
      }
      if (true) {
        originalConsole.error(error);
      }
      sendErrorMessages([error]);
    } catch (err) {
      originalConsole.error(err);
    }
  }
  if (typeof index.onError === "function") {
    index.onError(onError2);
  }
  if (typeof index.onUnhandledRejection === "function") {
    index.onUnhandledRejection(onError2);
  }
  return function offError2() {
    if (typeof index.offError === "function") {
      index.offError(onError2);
    }
    if (typeof index.offUnhandledRejection === "function") {
      index.offUnhandledRejection(onError2);
    }
  };
}
function initRuntimeSocketService() {
  const hosts = "192.168.102.1,192.168.100.125,172.16.17.191,127.0.0.1";
  const port = "8090";
  const id = "mp-weixin_jtvDU_";
  const lazy = typeof swan !== "undefined";
  let restoreError = lazy ? () => {
  } : initOnError();
  let restoreConsole = lazy ? () => {
  } : rewriteConsole();
  return Promise.resolve().then(() => {
    if (lazy) {
      restoreError = initOnError();
      restoreConsole = rewriteConsole();
    }
    return initRuntimeSocket(hosts, port, id).then((socket) => {
      if (!socket) {
        restoreError();
        restoreConsole();
        originalConsole.error(wrapError("开发模式下日志通道建立 socket 连接失败。"));
        originalConsole.error(wrapError("如果是小程序平台，请勾选不校验合法域名配置。"));
        originalConsole.error(wrapError("如果是运行到真机，请确认手机与电脑处于同一网络。"));
        return false;
      }
      initMiniProgramGlobalFlag();
      socket.onClose(() => {
        originalConsole.error(wrapError("开发模式下日志通道 socket 连接关闭，请在 HBuilderX 中重新运行。"));
        restoreError();
        restoreConsole();
      });
      setSendConsole((data) => {
        socket.send({
          data
        });
      });
      setSendError((data) => {
        socket.send({
          data
        });
      });
      return true;
    });
  });
}
const ERROR_CHAR = "‌";
function wrapError(error) {
  return `${ERROR_CHAR}${error}${ERROR_CHAR}`;
}
function initMiniProgramGlobalFlag() {
  if (typeof wx$1 !== "undefined") {
    wx$1.__uni_console__ = true;
  } else if (typeof my !== "undefined") {
    my.__uni_console__ = true;
  } else if (typeof tt !== "undefined") {
    tt.__uni_console__ = true;
  } else if (typeof swan !== "undefined") {
    swan.__uni_console__ = true;
  } else if (typeof qq !== "undefined") {
    qq.__uni_console__ = true;
  } else if (typeof ks !== "undefined") {
    ks.__uni_console__ = true;
  } else if (typeof jd !== "undefined") {
    jd.__uni_console__ = true;
  } else if (typeof xhs !== "undefined") {
    xhs.__uni_console__ = true;
  } else if (typeof has !== "undefined") {
    has.__uni_console__ = true;
  } else if (typeof qa !== "undefined") {
    qa.__uni_console__ = true;
  }
}
initRuntimeSocketService();
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn$1(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i3 = $children.length - 1; i3 >= 0; i3--) {
    const childVm = $children[i3];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i3 = $children.length - 1; i3 >= 0; i3--) {
    parentVm = findVmByVueId($children[i3], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  {
    Object.defineProperties(ctx, {
      // only id
      [VIRTUAL_HOST_ID]: {
        get() {
          const id = this.$scope.data[VIRTUAL_HOST_ID];
          return id === void 0 ? "" : id;
        }
      }
    });
  }
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn$1(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn$1(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn$1(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope && ctx.$callHook) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  const onErrorHandlers = wx.$onErrorHandlers;
  if (onErrorHandlers) {
    onErrorHandlers.forEach((fn) => {
      injectHook(ON_ERROR, fn, internalInstance);
    });
    onErrorHandlers.length = 0;
  }
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn$1(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn$1(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale2 = ref(
    normalizeLocale(wx.getAppBaseInfo().language) || LOCALE_EN
  );
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale2.value;
    },
    set(v2) {
      locale2.value = v2;
    }
  });
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    let observerSlots = function(newVal) {
      const $slots = /* @__PURE__ */ Object.create(null);
      newVal && newVal.forEach((slotName) => {
        $slots[slotName] = true;
      });
      this.setData({
        $slots
      });
    };
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: []
    };
    {
      properties.uS.observer = observerSlots;
    }
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties[VIRTUAL_HOST_STYLE] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_CLASS] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_HIDDEN] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_ID] = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(resolvePropValue(properties.uP))) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = resolvePropValue(properties[name]);
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function resolvePropValue(prop) {
  return prop;
}
function initData(_2) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(resolvePropValue(up), this.$vm.$);
    } else if (resolvePropValue(this.properties.uT) === "m") {
      updateMiniProgramComponentProperties(resolvePropValue(up), this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i3 = 0; i3 < nextKeys.length; i3++) {
    const key = nextKeys[i3];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse: parse2, mocks: mocks2, isPage: isPage2, isPageInProject, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$2(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse2) {
    parse2(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    isPageInProject: true,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    {
      this.options = query;
    }
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse2 && parse2(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [
      customizeEvent(event),
      ...args
    ]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        // vueSlots
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShow = /* @__PURE__ */ createHook(ON_SHOW);
const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
const onUnload = /* @__PURE__ */ createHook(ON_UNLOAD);
const onReachBottom = /* @__PURE__ */ createHook(ON_REACH_BOTTOM);
const onPullDownRefresh = /* @__PURE__ */ createHook(ON_PULL_DOWN_REFRESH);
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */
var storeKey = "store";
function useStore(key) {
  if (key === void 0)
    key = null;
  return inject(key !== null ? key : storeKey);
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
function assert(condition2, msg) {
  if (!condition2) {
    throw new Error("[vuex] " + msg);
  }
}
function partial(fn, arg) {
  return function() {
    return fn(arg);
  };
}
function genericSubscribe(fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend ? subs.unshift(fn) : subs.push(fn);
  }
  return function() {
    var i3 = subs.indexOf(fn);
    if (i3 > -1) {
      subs.splice(i3, 1);
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
  resetStoreState(store, state, hot);
}
function resetStoreState(store, state, hot) {
  var oldState = store._state;
  var oldScope = store._scope;
  store.getters = {};
  store._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computedObj = {};
  var computedCache = {};
  var scope = effectScope(true);
  scope.run(function() {
    forEachValue(wrappedGetters, function(fn, key) {
      computedObj[key] = partial(fn, store);
      computedCache[key] = computed(function() {
        return computedObj[key]();
      });
      Object.defineProperty(store.getters, key, {
        get: function() {
          return computedCache[key].value;
        },
        enumerable: true
        // for local getters
      });
    });
  });
  store._state = reactive({
    data: state
  });
  store._scope = scope;
  if (store.strict) {
    enableStrictMode(store);
  }
  if (oldState) {
    if (hot) {
      store._withCommit(function() {
        oldState.data = null;
      });
    }
  }
  if (oldScope) {
    oldScope.stop();
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
      {
        if (moduleName in parentState) {
          console.warn(
            '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
          );
        }
      }
      parentState[moduleName] = module2.state;
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
    {
      console.error("[vuex] duplicate getter key: " + type);
    }
    return;
  }
  store._wrappedGetters[type] = function wrappedGetter(store2) {
    return rawGetter(
      local.state,
      // local state
      local.getters,
      // local getters
      store2.state,
      // root state
      store2.getters
      // root getters
    );
  };
}
function enableStrictMode(store) {
  watch(function() {
    return store._state.data;
  }, function() {
    {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, flush: "sync" });
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
  {
    assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
  }
  return { type, payload, options };
}
var Module = function Module2(rawModule, runtime) {
  this.runtime = runtime;
  this._children = /* @__PURE__ */ Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
};
var prototypeAccessors$1 = { namespaced: { configurable: true } };
prototypeAccessors$1.namespaced.get = function() {
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
Module.prototype.update = function update(rawModule) {
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
Object.defineProperties(Module.prototype, prototypeAccessors$1);
var ModuleCollection = function ModuleCollection2(rawRootModule) {
  this.register([], rawRootModule, false);
};
ModuleCollection.prototype.get = function get2(path) {
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
  update2([], this.root, rawRootModule);
};
ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1$1 = this;
  if (runtime === void 0)
    runtime = true;
  {
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
      this$1$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};
ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);
  if (!child) {
    {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is not registered"
      );
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
function update2(path, targetModule, newModule) {
  {
    assertRawModule(path, newModule);
  }
  targetModule.update(newModule);
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
          );
        }
        return;
      }
      update2(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
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
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
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
function createStore(options) {
  return new Store(options);
}
var Store = function Store2(options) {
  var this$1$1 = this;
  if (options === void 0)
    options = {};
  {
    assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store2, "store must be called with the new operator.");
  }
  var plugins = options.plugins;
  if (plugins === void 0)
    plugins = [];
  var strict = options.strict;
  if (strict === void 0)
    strict = false;
  var devtools2 = options.devtools;
  this._committing = false;
  this._actions = /* @__PURE__ */ Object.create(null);
  this._actionSubscribers = [];
  this._mutations = /* @__PURE__ */ Object.create(null);
  this._wrappedGetters = /* @__PURE__ */ Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  this._subscribers = [];
  this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  this._scope = null;
  this._devtools = devtools2;
  var store = this;
  var ref2 = this;
  var dispatch2 = ref2.dispatch;
  var commit2 = ref2.commit;
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch2.call(store, type, payload);
  };
  this.commit = function boundCommit(type, payload, options2) {
    return commit2.call(store, type, payload, options2);
  };
  this.strict = strict;
  var state = this._modules.root.state;
  installModule(this, state, [], this._modules.root);
  resetStoreState(this, state);
  plugins.forEach(function(plugin2) {
    return plugin2(this$1$1);
  });
};
var prototypeAccessors = { state: { configurable: true } };
Store.prototype.install = function install(app, injectKey) {
  app.provide(injectKey || storeKey, this);
  app.config.globalProperties.$store = this;
  this._devtools !== void 0 ? this._devtools : true;
};
prototypeAccessors.state.get = function() {
  return this._state.data;
};
prototypeAccessors.state.set = function(v2) {
  {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};
Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1$1 = this;
  var ref2 = unifyObjectStyle(_type, _payload, _options);
  var type = ref2.type;
  var payload = ref2.payload;
  var options = ref2.options;
  var mutation = { type, payload };
  var entry = this._mutations[type];
  if (!entry) {
    {
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
    return sub(mutation, this$1$1.state);
  });
  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
    );
  }
};
Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1$1 = this;
  var ref2 = unifyObjectStyle(_type, _payload);
  var type = ref2.type;
  var payload = ref2.payload;
  var action = { type, payload };
  var entry = this._actions[type];
  if (!entry) {
    {
      console.error("[vuex] unknown action type: " + type);
    }
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(sub) {
      return sub.before;
    }).forEach(function(sub) {
      return sub.before(action, this$1$1.state);
    });
  } catch (e3) {
    {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e3);
    }
  }
  var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
    return handler(payload);
  })) : entry[0](payload);
  return new Promise(function(resolve2, reject) {
    result.then(function(res) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.after;
        }).forEach(function(sub) {
          return sub.after(action, this$1$1.state);
        });
      } catch (e3) {
        {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e3);
        }
      }
      resolve2(res);
    }, function(error) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.error;
        }).forEach(function(sub) {
          return sub.error(action, this$1$1.state, error);
        });
      } catch (e3) {
        {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e3);
        }
      }
      reject(error);
    });
  });
};
Store.prototype.subscribe = function subscribe(fn, options) {
  return genericSubscribe(fn, this._subscribers, options);
};
Store.prototype.subscribeAction = function subscribeAction(fn, options) {
  var subs = typeof fn === "function" ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options);
};
Store.prototype.watch = function watch$1(getter, cb, options) {
  var this$1$1 = this;
  {
    assert(typeof getter === "function", "store.watch only accepts a function.");
  }
  return watch(function() {
    return getter(this$1$1.state, this$1$1.getters);
  }, cb, Object.assign({}, options));
};
Store.prototype.replaceState = function replaceState(state) {
  var this$1$1 = this;
  this._withCommit(function() {
    this$1$1._state.data = state;
  });
};
Store.prototype.registerModule = function registerModule(path, rawModule, options) {
  if (options === void 0)
    options = {};
  if (typeof path === "string") {
    path = [path];
  }
  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, "cannot register the root module by using registerModule.");
  }
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  resetStoreState(this, this.state);
};
Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1$1 = this;
  if (typeof path === "string") {
    path = [path];
  }
  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }
  this._modules.unregister(path);
  this._withCommit(function() {
    var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
    delete parentState[path[path.length - 1]];
  });
  resetStore(this);
};
Store.prototype.hasModule = function hasModule(path) {
  if (typeof path === "string") {
    path = [path];
  }
  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }
  return this._modules.isRegistered(path);
};
Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};
Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};
Object.defineProperties(Store.prototype, prototypeAccessors);
function _typeof(o2) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof(o2);
}
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      index.__f__("warn", "at node_modules/date-fns/esm/toDate/index.js:46", "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      index.__f__("warn", "at node_modules/date-fns/esm/toDate/index.js:48", new Error().stack);
    }
    return /* @__PURE__ */ new Date(NaN);
  }
}
function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}
function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}
function isDate(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || _typeof(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function isValid(dirtyDate) {
  requiredArgs(1, arguments);
  if (!isDate(dirtyDate) && typeof dirtyDate !== "number") {
    return false;
  }
  var date = toDate(dirtyDate);
  return !isNaN(Number(date));
}
function endOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}
function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}
var MILLISECONDS_IN_DAY = 864e5;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}
function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff2 = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff2);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}
var MILLISECONDS_IN_WEEK$1 = 6048e5;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff2 = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
  return Math.round(diff2 / MILLISECONDS_IN_WEEK$1) + 1;
}
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff2 = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff2);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = /* @__PURE__ */ new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = /* @__PURE__ */ new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getUTCWeekYear(dirtyDate, options);
  var firstWeek = /* @__PURE__ */ new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, options);
  return date;
}
var MILLISECONDS_IN_WEEK = 6048e5;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff2 = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
  return Math.round(diff2 / MILLISECONDS_IN_WEEK) + 1;
}
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign + output;
}
var formatters$1 = {
  // Year
  y: function y(date, token) {
    var signedYear = date.getUTCFullYear();
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d: function d(date, token) {
    return addLeadingZeros(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h: function h(date, token) {
    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function H(date, token) {
    return addLeadingZeros(date.getUTCHours(), token.length);
  },
  // Minute
  m: function m(date, token) {
    return addLeadingZeros(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function s(date, token) {
    return addLeadingZeros(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
const formatters$2 = formatters$1;
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  // Era
  G: function G(date, token, localize2) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, {
          width: "abbreviated"
        });
      case "GGGGG":
        return localize2.era(era, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return localize2.era(era, {
          width: "wide"
        });
    }
  },
  // Year
  y: function y2(date, token, localize2) {
    if (token === "yo") {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, {
        unit: "year"
      });
    }
    return formatters$2.y(date, token);
  },
  // Local week-numbering year
  Y: function Y(date, token, localize2, options) {
    var signedWeekYear = getUTCWeekYear(date, options);
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, {
        unit: "year"
      });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function R(date, token) {
    var isoWeekYear = getUTCISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function Q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function M2(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "M":
      case "MM":
        return formatters$2.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone month
  L: function L(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Local week of year
  w: function w(date, token, localize2, options) {
    var week = getUTCWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, {
        unit: "week"
      });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function I(date, token, localize2) {
    var isoWeek = getUTCISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, {
        unit: "week"
      });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function d2(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getUTCDate(), {
        unit: "date"
      });
    }
    return formatters$2.d(date, token);
  },
  // Day of year
  D: function D(date, token, localize2) {
    var dayOfYear = getUTCDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, {
        unit: "dayOfYear"
      });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function E(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function e(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function c(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function i(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, {
          unit: "day"
        });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function a2(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function b(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function B(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function h2(date, token, localize2) {
    if (token === "ho") {
      var hours = date.getUTCHours() % 12;
      if (hours === 0)
        hours = 12;
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return formatters$2.h(date, token);
  },
  // Hour [0-23]
  H: function H2(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getUTCHours(), {
        unit: "hour"
      });
    }
    return formatters$2.H(date, token);
  },
  // Hour [0-11]
  K: function K(date, token, localize2) {
    var hours = date.getUTCHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function k(date, token, localize2) {
    var hours = date.getUTCHours();
    if (hours === 0)
      hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function m2(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getUTCMinutes(), {
        unit: "minute"
      });
    }
    return formatters$2.m(date, token);
  },
  // Second
  s: function s2(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getUTCSeconds(), {
        unit: "second"
      });
    }
    return formatters$2.s(date, token);
  },
  // Fraction of second
  S: function S2(date, token) {
    return formatters$2.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || "";
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || "";
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
var dateLongFormatter = function dateLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "P":
      return formatLong2.date({
        width: "short"
      });
    case "PP":
      return formatLong2.date({
        width: "medium"
      });
    case "PPP":
      return formatLong2.date({
        width: "long"
      });
    case "PPPP":
    default:
      return formatLong2.date({
        width: "full"
      });
  }
};
var timeLongFormatter = function timeLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "p":
      return formatLong2.time({
        width: "short"
      });
    case "pp":
      return formatLong2.time({
        width: "medium"
      });
    case "ppp":
      return formatLong2.time({
        width: "long"
      });
    case "pppp":
    default:
      return formatLong2.time({
        width: "full"
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter2(pattern, formatLong2) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({
        width: "short"
      });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({
        width: "full"
      });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
var protectedDayOfYearTokens = ["D", "DD"];
var protectedWeekYearTokens = ["YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format2, input) {
  if (token === "YYYY") {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "YY") {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "D") {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "DD") {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
const formatDistance$1 = formatDistance;
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
const formatLong$1 = formatLong;
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = function formatRelative2(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
const formatRelative$1 = formatRelative;
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index2 = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index2];
  };
}
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
const localize$1 = localize;
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index2) {
      return index2 + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
const match$1 = match;
var locale = {
  code: "en-US",
  formatDistance: formatDistance$1,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const defaultLocale = locale;
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale;
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (!locale2.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale2.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      var longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map(function(substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = formatters[firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale2.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
    }
    return substring;
  }).join("");
  return result;
}
function cleanEscapedString(input) {
  var matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}
const pages = [
  {
    path: "pages/index/index",
    style: {
      navigationStyle: "custom",
      navigationBarTitleText: "星海智伴",
      enablePullDownRefresh: true
    }
  },
  {
    path: "pages/family/index",
    style: {
      navigationStyle: "custom",
      navigationBarTitleText: "家人",
      enablePullDownRefresh: false
    }
  },
  {
    path: "pages/family/binding",
    style: {
      navigationStyle: "custom",
      navigationBarTitleText: "绑定家人",
      enablePullDownRefresh: false
    }
  },
  {
    path: "pages/service/index",
    style: {
      navigationStyle: "custom",
      navigationBarTitleText: "全部服务",
      enablePullDownRefresh: false
    }
  },
  {
    path: "pages/service/details",
    style: {
      navigationStyle: "custom",
      navigationBarTitleText: "服务详情",
      enablePullDownRefresh: false,
      backgroundColor: "#f4f3f7"
    }
  },
  {
    path: "pages/service/orderVerify",
    style: {
      navigationStyle: "custom",
      navigationBarTitleText: "确认订单",
      enablePullDownRefresh: false,
      backgroundColor: "#f4f3f7"
    }
  },
  {
    path: "pages/login/index",
    style: {
      navigationStyle: "custom",
      navigationBarTitleText: "登录",
      enablePullDownRefresh: false
    }
  },
  {
    path: "pages/my/index",
    style: {
      navigationStyle: "custom",
      navigationBarTitleText: "我的",
      backgroundColor: "#f4f3f7",
      enablePullDownRefresh: false
    }
  },
  {
    path: "components/Foot/index",
    style: {
      navigationBarTitleText: "",
      enablePullDownRefresh: false
    }
  },
  {
    path: "components/uni-phone/index",
    style: {
      navigationBarTitleText: "",
      enablePullDownRefresh: false
    }
  }
];
const subPackages = [
  {
    root: "subPages",
    pages: [
      {
        path: "healthy/index",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "健康数据",
          backgroundColor: "#f4f3f7",
          enablePullDownRefresh: false
        }
      },
      {
        path: "wuDataDetail/index",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "心率",
          backgroundColor: "#f4f3f7",
          enablePullDownRefresh: false
        }
      },
      {
        path: "appointment/index",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "参观预约",
          enablePullDownRefresh: false,
          backgroundColor: "#f4f3f7"
        }
      },
      {
        path: "appointment/components/PickerView",
        style: {
          navigationBarTitleText: "",
          enablePullDownRefresh: false
        }
      },
      {
        path: "appointment/list/index",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "我的预约",
          enablePullDownRefresh: false,
          backgroundColor: "#f4f3f7"
        }
      },
      {
        path: "appointment/components/des",
        style: {
          navigationBarTitleText: "",
          enablePullDownRefresh: false
        }
      },
      {
        path: "introduce/index",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "养老院介绍",
          enablePullDownRefresh: false,
          backgroundColor: "#f4f3f7"
        }
      },
      {
        path: "bill/index",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "我的账单",
          enablePullDownRefresh: false,
          backgroundColor: "#f4f3f7"
        }
      },
      {
        path: "contract/index",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "我的合同",
          backgroundColor: "#f4f3f7",
          enablePullDownRefresh: false
        }
      },
      {
        path: "order/index",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "我的订单",
          enablePullDownRefresh: false,
          backgroundColor: "#f4f3f7"
        }
      },
      {
        path: "order/cancel",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "订单取消原因",
          enablePullDownRefresh: false,
          backgroundColor: "#f4f3f7"
        }
      },
      {
        path: "order/details",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "订单详情",
          enablePullDownRefresh: false,
          backgroundColor: "#f4f3f7"
        }
      },
      {
        path: "success/index",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "支付订单",
          enablePullDownRefresh: false,
          backgroundColor: "#f4f3f7"
        }
      },
      {
        path: "search/index",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "搜索",
          enablePullDownRefresh: false,
          backgroundColor: "#f4f3f7"
        }
      },
      {
        path: "pay/index",
        style: {
          navigationStyle: "custom",
          navigationBarTitleText: "支付订单",
          enablePullDownRefresh: false,
          backgroundColor: "#f4f3f7"
        }
      }
    ]
  }
];
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "星海智伴",
  backgroundColor: "#F8F8F8",
  onReachBottomDistance: 50,
  enablePullDownRefresh: true
};
const condition = {
  current: 0,
  list: [
    {
      name: "",
      path: "",
      query: ""
    }
  ]
};
const e2 = {
  pages,
  subPackages,
  globalStyle,
  condition
};
var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
function t2(e22) {
  return e22 && e22.__esModule && Object.prototype.hasOwnProperty.call(e22, "default") ? e22.default : e22;
}
function n(e22, t22, n2) {
  return e22(n2 = { path: t22, exports: {}, require: function(e3, t3) {
    return function() {
      throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }(null == t3 && n2.path);
  } }, n2.exports), n2.exports;
}
var s3 = n(function(e22, t22) {
  var n2;
  e22.exports = (n2 = n2 || function(e3, t3) {
    var n3 = Object.create || /* @__PURE__ */ function() {
      function e4() {
      }
      return function(t4) {
        var n4;
        return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
      };
    }(), s22 = {}, r2 = s22.lib = {}, i22 = r2.Base = { extend: function(e4) {
      var t4 = n3(this);
      return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
        t4.$super.init.apply(this, arguments);
      }), t4.init.prototype = t4, t4.$super = this, t4;
    }, create: function() {
      var e4 = this.extend();
      return e4.init.apply(e4, arguments), e4;
    }, init: function() {
    }, mixIn: function(e4) {
      for (var t4 in e4)
        e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
      e4.hasOwnProperty("toString") && (this.toString = e4.toString);
    }, clone: function() {
      return this.init.prototype.extend(this);
    } }, o2 = r2.WordArray = i22.extend({ init: function(e4, n4) {
      e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
    }, toString: function(e4) {
      return (e4 || c22).stringify(this);
    }, concat: function(e4) {
      var t4 = this.words, n4 = e4.words, s32 = this.sigBytes, r3 = e4.sigBytes;
      if (this.clamp(), s32 % 4)
        for (var i3 = 0; i3 < r3; i3++) {
          var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
          t4[s32 + i3 >>> 2] |= o3 << 24 - (s32 + i3) % 4 * 8;
        }
      else
        for (i3 = 0; i3 < r3; i3 += 4)
          t4[s32 + i3 >>> 2] = n4[i3 >>> 2];
      return this.sigBytes += r3, this;
    }, clamp: function() {
      var t4 = this.words, n4 = this.sigBytes;
      t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
    }, clone: function() {
      var e4 = i22.clone.call(this);
      return e4.words = this.words.slice(0), e4;
    }, random: function(t4) {
      for (var n4, s32 = [], r3 = function(t5) {
        var n5 = 987654321, s4 = 4294967295;
        return function() {
          var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
          return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
        };
      }, i3 = 0; i3 < t4; i3 += 4) {
        var a32 = r3(4294967296 * (n4 || e3.random()));
        n4 = 987654071 * a32(), s32.push(4294967296 * a32() | 0);
      }
      return new o2.init(s32, t4);
    } }), a22 = s22.enc = {}, c22 = a22.Hex = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s32 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s32.push((i3 >>> 4).toString(16)), s32.push((15 & i3).toString(16));
      }
      return s32.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s32 = 0; s32 < t4; s32 += 2)
        n4[s32 >>> 3] |= parseInt(e4.substr(s32, 2), 16) << 24 - s32 % 8 * 4;
      return new o2.init(n4, t4 / 2);
    } }, u22 = a22.Latin1 = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s32 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s32.push(String.fromCharCode(i3));
      }
      return s32.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s32 = 0; s32 < t4; s32++)
        n4[s32 >>> 2] |= (255 & e4.charCodeAt(s32)) << 24 - s32 % 4 * 8;
      return new o2.init(n4, t4);
    } }, h22 = a22.Utf8 = { stringify: function(e4) {
      try {
        return decodeURIComponent(escape(u22.stringify(e4)));
      } catch (e5) {
        throw new Error("Malformed UTF-8 data");
      }
    }, parse: function(e4) {
      return u22.parse(unescape(encodeURIComponent(e4)));
    } }, l2 = r2.BufferedBlockAlgorithm = i22.extend({ reset: function() {
      this._data = new o2.init(), this._nDataBytes = 0;
    }, _append: function(e4) {
      "string" == typeof e4 && (e4 = h22.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
    }, _process: function(t4) {
      var n4 = this._data, s32 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a32 = r3 / (4 * i3), c3 = (a32 = t4 ? e3.ceil(a32) : e3.max((0 | a32) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
      if (c3) {
        for (var h32 = 0; h32 < c3; h32 += i3)
          this._doProcessBlock(s32, h32);
        var l3 = s32.splice(0, c3);
        n4.sigBytes -= u3;
      }
      return new o2.init(l3, u3);
    }, clone: function() {
      var e4 = i22.clone.call(this);
      return e4._data = this._data.clone(), e4;
    }, _minBufferSize: 0 });
    r2.Hasher = l2.extend({ cfg: i22.extend(), init: function(e4) {
      this.cfg = this.cfg.extend(e4), this.reset();
    }, reset: function() {
      l2.reset.call(this), this._doReset();
    }, update: function(e4) {
      return this._append(e4), this._process(), this;
    }, finalize: function(e4) {
      return e4 && this._append(e4), this._doFinalize();
    }, blockSize: 16, _createHelper: function(e4) {
      return function(t4, n4) {
        return new e4.init(n4).finalize(t4);
      };
    }, _createHmacHelper: function(e4) {
      return function(t4, n4) {
        return new d22.HMAC.init(e4, n4).finalize(t4);
      };
    } });
    var d22 = s22.algo = {};
    return s22;
  }(Math), n2);
}), r = s3, i2 = (n(function(e22, t22) {
  var n2;
  e22.exports = (n2 = r, function(e3) {
    var t3 = n2, s22 = t3.lib, r2 = s22.WordArray, i22 = s22.Hasher, o2 = t3.algo, a22 = [];
    !function() {
      for (var t4 = 0; t4 < 64; t4++)
        a22[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
    }();
    var c22 = o2.MD5 = i22.extend({ _doReset: function() {
      this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = 0; n3 < 16; n3++) {
        var s32 = t4 + n3, r3 = e4[s32];
        e4[s32] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
      }
      var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m22 = e4[t4 + 5], y22 = e4[t4 + 6], _2 = e4[t4 + 7], w22 = e4[t4 + 8], v2 = e4[t4 + 9], I22 = e4[t4 + 10], S22 = e4[t4 + 11], T22 = e4[t4 + 12], b22 = e4[t4 + 13], E22 = e4[t4 + 14], k2 = e4[t4 + 15], P2 = i3[0], C2 = i3[1], A2 = i3[2], O22 = i3[3];
      P2 = u22(P2, C2, A2, O22, o3, 7, a22[0]), O22 = u22(O22, P2, C2, A2, c3, 12, a22[1]), A2 = u22(A2, O22, P2, C2, p2, 17, a22[2]), C2 = u22(C2, A2, O22, P2, f2, 22, a22[3]), P2 = u22(P2, C2, A2, O22, g2, 7, a22[4]), O22 = u22(O22, P2, C2, A2, m22, 12, a22[5]), A2 = u22(A2, O22, P2, C2, y22, 17, a22[6]), C2 = u22(C2, A2, O22, P2, _2, 22, a22[7]), P2 = u22(P2, C2, A2, O22, w22, 7, a22[8]), O22 = u22(O22, P2, C2, A2, v2, 12, a22[9]), A2 = u22(A2, O22, P2, C2, I22, 17, a22[10]), C2 = u22(C2, A2, O22, P2, S22, 22, a22[11]), P2 = u22(P2, C2, A2, O22, T22, 7, a22[12]), O22 = u22(O22, P2, C2, A2, b22, 12, a22[13]), A2 = u22(A2, O22, P2, C2, E22, 17, a22[14]), P2 = h22(P2, C2 = u22(C2, A2, O22, P2, k2, 22, a22[15]), A2, O22, c3, 5, a22[16]), O22 = h22(O22, P2, C2, A2, y22, 9, a22[17]), A2 = h22(A2, O22, P2, C2, S22, 14, a22[18]), C2 = h22(C2, A2, O22, P2, o3, 20, a22[19]), P2 = h22(P2, C2, A2, O22, m22, 5, a22[20]), O22 = h22(O22, P2, C2, A2, I22, 9, a22[21]), A2 = h22(A2, O22, P2, C2, k2, 14, a22[22]), C2 = h22(C2, A2, O22, P2, g2, 20, a22[23]), P2 = h22(P2, C2, A2, O22, v2, 5, a22[24]), O22 = h22(O22, P2, C2, A2, E22, 9, a22[25]), A2 = h22(A2, O22, P2, C2, f2, 14, a22[26]), C2 = h22(C2, A2, O22, P2, w22, 20, a22[27]), P2 = h22(P2, C2, A2, O22, b22, 5, a22[28]), O22 = h22(O22, P2, C2, A2, p2, 9, a22[29]), A2 = h22(A2, O22, P2, C2, _2, 14, a22[30]), P2 = l2(P2, C2 = h22(C2, A2, O22, P2, T22, 20, a22[31]), A2, O22, m22, 4, a22[32]), O22 = l2(O22, P2, C2, A2, w22, 11, a22[33]), A2 = l2(A2, O22, P2, C2, S22, 16, a22[34]), C2 = l2(C2, A2, O22, P2, E22, 23, a22[35]), P2 = l2(P2, C2, A2, O22, c3, 4, a22[36]), O22 = l2(O22, P2, C2, A2, g2, 11, a22[37]), A2 = l2(A2, O22, P2, C2, _2, 16, a22[38]), C2 = l2(C2, A2, O22, P2, I22, 23, a22[39]), P2 = l2(P2, C2, A2, O22, b22, 4, a22[40]), O22 = l2(O22, P2, C2, A2, o3, 11, a22[41]), A2 = l2(A2, O22, P2, C2, f2, 16, a22[42]), C2 = l2(C2, A2, O22, P2, y22, 23, a22[43]), P2 = l2(P2, C2, A2, O22, v2, 4, a22[44]), O22 = l2(O22, P2, C2, A2, T22, 11, a22[45]), A2 = l2(A2, O22, P2, C2, k2, 16, a22[46]), P2 = d22(P2, C2 = l2(C2, A2, O22, P2, p2, 23, a22[47]), A2, O22, o3, 6, a22[48]), O22 = d22(O22, P2, C2, A2, _2, 10, a22[49]), A2 = d22(A2, O22, P2, C2, E22, 15, a22[50]), C2 = d22(C2, A2, O22, P2, m22, 21, a22[51]), P2 = d22(P2, C2, A2, O22, T22, 6, a22[52]), O22 = d22(O22, P2, C2, A2, f2, 10, a22[53]), A2 = d22(A2, O22, P2, C2, I22, 15, a22[54]), C2 = d22(C2, A2, O22, P2, c3, 21, a22[55]), P2 = d22(P2, C2, A2, O22, w22, 6, a22[56]), O22 = d22(O22, P2, C2, A2, k2, 10, a22[57]), A2 = d22(A2, O22, P2, C2, y22, 15, a22[58]), C2 = d22(C2, A2, O22, P2, b22, 21, a22[59]), P2 = d22(P2, C2, A2, O22, g2, 6, a22[60]), O22 = d22(O22, P2, C2, A2, S22, 10, a22[61]), A2 = d22(A2, O22, P2, C2, p2, 15, a22[62]), C2 = d22(C2, A2, O22, P2, v2, 21, a22[63]), i3[0] = i3[0] + P2 | 0, i3[1] = i3[1] + C2 | 0, i3[2] = i3[2] + A2 | 0, i3[3] = i3[3] + O22 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s32 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
      var i3 = e3.floor(s32 / 4294967296), o3 = s32;
      n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
      for (var a32 = this._hash, c3 = a32.words, u3 = 0; u3 < 4; u3++) {
        var h32 = c3[u3];
        c3[u3] = 16711935 & (h32 << 8 | h32 >>> 24) | 4278255360 & (h32 << 24 | h32 >>> 8);
      }
      return a32;
    }, clone: function() {
      var e4 = i22.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    function u22(e4, t4, n3, s32, r3, i3, o3) {
      var a32 = e4 + (t4 & n3 | ~t4 & s32) + r3 + o3;
      return (a32 << i3 | a32 >>> 32 - i3) + t4;
    }
    function h22(e4, t4, n3, s32, r3, i3, o3) {
      var a32 = e4 + (t4 & s32 | n3 & ~s32) + r3 + o3;
      return (a32 << i3 | a32 >>> 32 - i3) + t4;
    }
    function l2(e4, t4, n3, s32, r3, i3, o3) {
      var a32 = e4 + (t4 ^ n3 ^ s32) + r3 + o3;
      return (a32 << i3 | a32 >>> 32 - i3) + t4;
    }
    function d22(e4, t4, n3, s32, r3, i3, o3) {
      var a32 = e4 + (n3 ^ (t4 | ~s32)) + r3 + o3;
      return (a32 << i3 | a32 >>> 32 - i3) + t4;
    }
    t3.MD5 = i22._createHelper(c22), t3.HmacMD5 = i22._createHmacHelper(c22);
  }(Math), n2.MD5);
}), n(function(e22, t22) {
  var n2;
  e22.exports = (n2 = r, void function() {
    var e3 = n2, t3 = e3.lib.Base, s22 = e3.enc.Utf8;
    e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
      e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s22.parse(t4));
      var n3 = e4.blockSize, r2 = 4 * n3;
      t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
      for (var i22 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a22 = i22.words, c22 = o2.words, u22 = 0; u22 < n3; u22++)
        a22[u22] ^= 1549556828, c22[u22] ^= 909522486;
      i22.sigBytes = o2.sigBytes = r2, this.reset();
    }, reset: function() {
      var e4 = this._hasher;
      e4.reset(), e4.update(this._iKey);
    }, update: function(e4) {
      return this._hasher.update(e4), this;
    }, finalize: function(e4) {
      var t4 = this._hasher, n3 = t4.finalize(e4);
      return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
    } });
  }());
}), n(function(e22, t22) {
  e22.exports = r.HmacMD5;
})), o = n(function(e22, t22) {
  e22.exports = r.enc.Utf8;
}), a3 = n(function(e22, t22) {
  var n2;
  e22.exports = (n2 = r, function() {
    var e3 = n2, t3 = e3.lib.WordArray;
    function s22(e4, n3, s32) {
      for (var r2 = [], i22 = 0, o2 = 0; o2 < n3; o2++)
        if (o2 % 4) {
          var a22 = s32[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c22 = s32[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
          r2[i22 >>> 2] |= (a22 | c22) << 24 - i22 % 4 * 8, i22++;
        }
      return t3.create(r2, i22);
    }
    e3.enc.Base64 = { stringify: function(e4) {
      var t4 = e4.words, n3 = e4.sigBytes, s32 = this._map;
      e4.clamp();
      for (var r2 = [], i22 = 0; i22 < n3; i22 += 3)
        for (var o2 = (t4[i22 >>> 2] >>> 24 - i22 % 4 * 8 & 255) << 16 | (t4[i22 + 1 >>> 2] >>> 24 - (i22 + 1) % 4 * 8 & 255) << 8 | t4[i22 + 2 >>> 2] >>> 24 - (i22 + 2) % 4 * 8 & 255, a22 = 0; a22 < 4 && i22 + 0.75 * a22 < n3; a22++)
          r2.push(s32.charAt(o2 >>> 6 * (3 - a22) & 63));
      var c22 = s32.charAt(64);
      if (c22)
        for (; r2.length % 4; )
          r2.push(c22);
      return r2.join("");
    }, parse: function(e4) {
      var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
      if (!r2) {
        r2 = this._reverseMap = [];
        for (var i22 = 0; i22 < n3.length; i22++)
          r2[n3.charCodeAt(i22)] = i22;
      }
      var o2 = n3.charAt(64);
      if (o2) {
        var a22 = e4.indexOf(o2);
        -1 !== a22 && (t4 = a22);
      }
      return s22(e4, t4, r2);
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
  }(), n2.enc.Base64);
});
const c2 = "uni_id_token", u2 = "uni_id_token_expired", h3 = "uniIdToken", l = { DEFAULT: "FUNCTION", FUNCTION: "FUNCTION", OBJECT: "OBJECT", CLIENT_DB: "CLIENT_DB" }, d3 = "pending", p = "fulfilled", f = "rejected";
function g(e22) {
  return Object.prototype.toString.call(e22).slice(8, -1).toLowerCase();
}
function m3(e22) {
  return "object" === g(e22);
}
function y3(e22) {
  return "function" == typeof e22;
}
function _(e22) {
  return function() {
    try {
      return e22.apply(e22, arguments);
    } catch (e3) {
      console.error(e3);
    }
  };
}
const w2 = "REJECTED", v = "NOT_PENDING";
class I2 {
  constructor({ createPromise: e22, retryRule: t22 = w2 } = {}) {
    this.createPromise = e22, this.status = null, this.promise = null, this.retryRule = t22;
  }
  get needRetry() {
    if (!this.status)
      return true;
    switch (this.retryRule) {
      case w2:
        return this.status === f;
      case v:
        return this.status !== d3;
    }
  }
  exec() {
    return this.needRetry ? (this.status = d3, this.promise = this.createPromise().then((e22) => (this.status = p, Promise.resolve(e22)), (e22) => (this.status = f, Promise.reject(e22))), this.promise) : this.promise;
  }
}
class S3 {
  constructor() {
    this._callback = {};
  }
  addListener(e22, t22) {
    this._callback[e22] || (this._callback[e22] = []), this._callback[e22].push(t22);
  }
  on(e22, t22) {
    return this.addListener(e22, t22);
  }
  removeListener(e22, t22) {
    if (!t22)
      throw new Error('The "listener" argument must be of type function. Received undefined');
    const n2 = this._callback[e22];
    if (!n2)
      return;
    const s22 = function(e3, t3) {
      for (let n3 = e3.length - 1; n3 >= 0; n3--)
        if (e3[n3] === t3)
          return n3;
      return -1;
    }(n2, t22);
    n2.splice(s22, 1);
  }
  off(e22, t22) {
    return this.removeListener(e22, t22);
  }
  removeAllListener(e22) {
    delete this._callback[e22];
  }
  emit(e22, ...t22) {
    const n2 = this._callback[e22];
    if (n2)
      for (let e3 = 0; e3 < n2.length; e3++)
        n2[e3](...t22);
  }
}
function T2(e22) {
  return e22 && "string" == typeof e22 ? JSON.parse(e22) : e22;
}
const b2 = true, E2 = "mp-weixin", P = T2(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), C = E2, A = T2(""), O2 = T2("[]") || [];
let N = "";
try {
  N = "__UNI__5FE6024";
} catch (e22) {
}
let L2 = {};
function U(e22, t22 = {}) {
  var n2, s22;
  return n2 = L2, s22 = e22, Object.prototype.hasOwnProperty.call(n2, s22) || (L2[e22] = t22), L2[e22];
}
const M3 = ["invoke", "success", "fail", "complete"], q2 = U("_globalUniCloudInterceptor");
function F(e22, t22) {
  q2[e22] || (q2[e22] = {}), m3(t22) && Object.keys(t22).forEach((n2) => {
    M3.indexOf(n2) > -1 && function(e3, t3, n3) {
      let s22 = q2[e3][t3];
      s22 || (s22 = q2[e3][t3] = []), -1 === s22.indexOf(n3) && y3(n3) && s22.push(n3);
    }(e22, n2, t22[n2]);
  });
}
function K2(e22, t22) {
  q2[e22] || (q2[e22] = {}), m3(t22) ? Object.keys(t22).forEach((n2) => {
    M3.indexOf(n2) > -1 && function(e3, t3, n3) {
      const s22 = q2[e3][t3];
      if (!s22)
        return;
      const r2 = s22.indexOf(n3);
      r2 > -1 && s22.splice(r2, 1);
    }(e22, n2, t22[n2]);
  }) : delete q2[e22];
}
function j(e22, t22) {
  return e22 && 0 !== e22.length ? e22.reduce((e3, n2) => e3.then(() => n2(t22)), Promise.resolve()) : Promise.resolve();
}
function $(e22, t22) {
  return q2[e22] && q2[e22][t22] || [];
}
function B2(e22) {
  F("callObject", e22);
}
const W = U("_globalUniCloudListener"), H3 = { RESPONSE: "response", NEED_LOGIN: "needLogin", REFRESH_TOKEN: "refreshToken" }, J = { CLIENT_DB: "clientdb", CLOUD_FUNCTION: "cloudfunction", CLOUD_OBJECT: "cloudobject" };
function z2(e22) {
  return W[e22] || (W[e22] = []), W[e22];
}
function V(e22, t22) {
  const n2 = z2(e22);
  n2.includes(t22) || n2.push(t22);
}
function G2(e22, t22) {
  const n2 = z2(e22), s22 = n2.indexOf(t22);
  -1 !== s22 && n2.splice(s22, 1);
}
function Y2(e22, t22) {
  const n2 = z2(e22);
  for (let e3 = 0; e3 < n2.length; e3++) {
    (0, n2[e3])(t22);
  }
}
let Q2, X2 = false;
function Z() {
  return Q2 || (Q2 = new Promise((e22) => {
    X2 && e22(), function t22() {
      if ("function" == typeof getCurrentPages) {
        const t3 = getCurrentPages();
        t3 && t3[0] && (X2 = true, e22());
      }
      X2 || setTimeout(() => {
        t22();
      }, 30);
    }();
  }), Q2);
}
function ee(e22) {
  const t22 = {};
  for (const n2 in e22) {
    const s22 = e22[n2];
    y3(s22) && (t22[n2] = _(s22));
  }
  return t22;
}
class te extends Error {
  constructor(e22) {
    super(e22.message), this.errMsg = e22.message || e22.errMsg || "unknown system error", this.code = this.errCode = e22.code || e22.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e22.subject || e22.errSubject, this.cause = e22.cause, this.requestId = e22.requestId;
  }
  toJson(e22 = 0) {
    if (!(e22 >= 10))
      return e22++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e22) : this.cause };
  }
}
var ne = { request: (e22) => index.request(e22), uploadFile: (e22) => index.uploadFile(e22), setStorageSync: (e22, t22) => index.setStorageSync(e22, t22), getStorageSync: (e22) => index.getStorageSync(e22), removeStorageSync: (e22) => index.removeStorageSync(e22), clearStorageSync: () => index.clearStorageSync(), connectSocket: (e22) => index.connectSocket(e22) };
function se(e22) {
  return e22 && se(e22.__v_raw) || e22;
}
function re() {
  return { token: ne.getStorageSync(c2) || ne.getStorageSync(h3), tokenExpired: ne.getStorageSync(u2) };
}
function ie({ token: e22, tokenExpired: t22 } = {}) {
  e22 && ne.setStorageSync(c2, e22), t22 && ne.setStorageSync(u2, t22);
}
let oe, ae;
function ce() {
  return oe || (oe = index.getSystemInfoSync()), oe;
}
function ue() {
  let e22, t22;
  try {
    if (index.getLaunchOptionsSync) {
      if (index.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
        return;
      const { scene: n2, channel: s22 } = index.getLaunchOptionsSync();
      e22 = s22, t22 = n2;
    }
  } catch (e3) {
  }
  return { channel: e22, scene: t22 };
}
let he = {};
function le() {
  const e22 = index.getLocale && index.getLocale() || "en";
  if (ae)
    return { ...he, ...ae, locale: e22, LOCALE: e22 };
  const t22 = ce(), { deviceId: n2, osName: s22, uniPlatform: r2, appId: i22 } = t22, o2 = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
  for (const e3 in t22)
    Object.hasOwnProperty.call(t22, e3) && -1 === o2.indexOf(e3) && delete t22[e3];
  return ae = { PLATFORM: r2, OS: s22, APPID: i22, DEVICEID: n2, ...ue(), ...t22 }, { ...he, ...ae, locale: e22, LOCALE: e22 };
}
var de = { sign: function(e22, t22) {
  let n2 = "";
  return Object.keys(e22).sort().forEach(function(t3) {
    e22[t3] && (n2 = n2 + "&" + t3 + "=" + e22[t3]);
  }), n2 = n2.slice(1), i2(n2, t22).toString();
}, wrappedRequest: function(e22, t22) {
  return new Promise((n2, s22) => {
    t22(Object.assign(e22, { complete(e3) {
      e3 || (e3 = {});
      const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
      if (!e3.statusCode || e3.statusCode >= 400) {
        const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
        return s22(new te({ code: n3, message: r3, requestId: t3 }));
      }
      const r2 = e3.data;
      if (r2.error)
        return s22(new te({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
      r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
    } }));
  });
}, toBase64: function(e22) {
  return a3.stringify(o.parse(e22));
} };
var pe = class {
  constructor(e22) {
    ["spaceId", "clientSecret"].forEach((t22) => {
      if (!Object.prototype.hasOwnProperty.call(e22, t22))
        throw new Error(`${t22} required`);
    }), this.config = Object.assign({}, { endpoint: 0 === e22.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e22), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = ne, this._getAccessTokenPromiseHub = new I2({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
      if (!e3.result || !e3.result.accessToken)
        throw new te({ code: "AUTH_FAILED", message: "获取accessToken失败" });
      this.setAccessToken(e3.result.accessToken);
    }), retryRule: v });
  }
  get hasAccessToken() {
    return !!this.accessToken;
  }
  setAccessToken(e22) {
    this.accessToken = e22;
  }
  requestWrapped(e22) {
    return de.wrappedRequest(e22, this.adapter.request);
  }
  requestAuth(e22) {
    return this.requestWrapped(e22);
  }
  request(e22, t22) {
    return Promise.resolve().then(() => this.hasAccessToken ? t22 ? this.requestWrapped(e22) : this.requestWrapped(e22).catch((t3) => new Promise((e3, n2) => {
      !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
    }).then(() => this.getAccessToken()).then(() => {
      const t4 = this.rebuildRequest(e22);
      return this.request(t4, true);
    })) : this.getAccessToken().then(() => {
      const t3 = this.rebuildRequest(e22);
      return this.request(t3, true);
    }));
  }
  rebuildRequest(e22) {
    const t22 = Object.assign({}, e22);
    return t22.data.token = this.accessToken, t22.header["x-basement-token"] = this.accessToken, t22.header["x-serverless-sign"] = de.sign(t22.data, this.config.clientSecret), t22;
  }
  setupRequest(e22, t22) {
    const n2 = Object.assign({}, e22, { spaceId: this.config.spaceId, timestamp: Date.now() }), s22 = { "Content-Type": "application/json" };
    return "auth" !== t22 && (n2.token = this.accessToken, s22["x-basement-token"] = this.accessToken), s22["x-serverless-sign"] = de.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s22 };
  }
  getAccessToken() {
    return this._getAccessTokenPromiseHub.exec();
  }
  async authorize() {
    await this.getAccessToken();
  }
  callFunction(e22) {
    const t22 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e22.name, functionArgs: e22.data || {} }) };
    return this.request({ ...this.setupRequest(t22), timeout: e22.timeout });
  }
  getOSSUploadOptionsFromPath(e22) {
    const t22 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e22) };
    return this.request(this.setupRequest(t22));
  }
  uploadFileToOSS({ url: e22, formData: t22, name: n2, filePath: s22, fileType: r2, onUploadProgress: i22 }) {
    return new Promise((o2, a22) => {
      const c22 = this.adapter.uploadFile({ url: e22, formData: t22, name: n2, filePath: s22, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
        e3 && e3.statusCode < 400 ? o2(e3) : a22(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        a22(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof i22 && c22 && "function" == typeof c22.onProgressUpdate && c22.onProgressUpdate((e3) => {
        i22({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  reportOSSUpload(e22) {
    const t22 = { method: "serverless.file.resource.report", params: JSON.stringify(e22) };
    return this.request(this.setupRequest(t22));
  }
  async uploadFile({ filePath: e22, cloudPath: t22, fileType: n2 = "image", cloudPathAsRealPath: s22 = false, onUploadProgress: r2, config: i22 }) {
    if ("string" !== g(t22))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t22 = t22.trim()))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t22))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const o2 = i22 && i22.envType || this.config.envType;
    if (s22 && ("/" !== t22[0] && (t22 = "/" + t22), t22.indexOf("\\") > -1))
      throw new te({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
    const a22 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s22 ? t22.split("/").pop() : t22, fileId: s22 ? t22 : void 0 })).result, c22 = "https://" + a22.cdnDomain + "/" + a22.ossPath, { securityToken: u22, accessKeyId: h22, signature: l2, host: d22, ossPath: p2, id: f2, policy: m22, ossCallbackUrl: y22 } = a22, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h22, Signature: l2, host: d22, id: f2, key: p2, policy: m22, success_action_status: 200 };
    if (u22 && (_2["x-oss-security-token"] = u22), y22) {
      const e3 = JSON.stringify({ callbackUrl: y22, callbackBody: JSON.stringify({ fileId: f2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
      _2.callback = de.toBase64(e3);
    }
    const w22 = { url: "https://" + a22.host, formData: _2, fileName: "file", name: "file", filePath: e22, fileType: n2 };
    if (await this.uploadFileToOSS(Object.assign({}, w22, { onUploadProgress: r2 })), y22)
      return { success: true, filePath: e22, fileID: c22 };
    if ((await this.reportOSSUpload({ id: f2 })).success)
      return { success: true, filePath: e22, fileID: c22 };
    throw new te({ code: "UPLOAD_FAILED", message: "文件上传失败" });
  }
  getTempFileURL({ fileList: e22 } = {}) {
    return new Promise((t22, n2) => {
      Array.isArray(e22) && 0 !== e22.length || n2(new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t22({ fileList: e22.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
    });
  }
  async getFileInfo({ fileList: e22 } = {}) {
    if (!Array.isArray(e22) || 0 === e22.length)
      throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const t22 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e22.map((e3) => e3.split("?")[0]).join(",") }) };
    return { fileList: (await this.request(this.setupRequest(t22))).result };
  }
};
var fe = { init(e22) {
  const t22 = new pe(e22), n2 = { signInAnonymously: function() {
    return t22.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t22.auth = function() {
    return n2;
  }, t22.customAuth = t22.auth, t22;
} };
const ge = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
var me;
!function(e22) {
  e22.local = "local", e22.none = "none", e22.session = "session";
}(me || (me = {}));
var ye = function() {
}, _e = n(function(e22, t22) {
  var n2;
  e22.exports = (n2 = r, function(e3) {
    var t3 = n2, s22 = t3.lib, r2 = s22.WordArray, i22 = s22.Hasher, o2 = t3.algo, a22 = [], c22 = [];
    !function() {
      function t4(t5) {
        for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
          if (!(t5 % s4))
            return false;
        return true;
      }
      function n3(e4) {
        return 4294967296 * (e4 - (0 | e4)) | 0;
      }
      for (var s32 = 2, r3 = 0; r3 < 64; )
        t4(s32) && (r3 < 8 && (a22[r3] = n3(e3.pow(s32, 0.5))), c22[r3] = n3(e3.pow(s32, 1 / 3)), r3++), s32++;
    }();
    var u22 = [], h22 = o2.SHA256 = i22.extend({ _doReset: function() {
      this._hash = new r2.init(a22.slice(0));
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = this._hash.words, s32 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a32 = n3[4], h32 = n3[5], l2 = n3[6], d22 = n3[7], p2 = 0; p2 < 64; p2++) {
        if (p2 < 16)
          u22[p2] = 0 | e4[t4 + p2];
        else {
          var f2 = u22[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m22 = u22[p2 - 2], y22 = (m22 << 15 | m22 >>> 17) ^ (m22 << 13 | m22 >>> 19) ^ m22 >>> 10;
          u22[p2] = g2 + u22[p2 - 7] + y22 + u22[p2 - 16];
        }
        var _2 = s32 & r3 ^ s32 & i3 ^ r3 & i3, w22 = (s32 << 30 | s32 >>> 2) ^ (s32 << 19 | s32 >>> 13) ^ (s32 << 10 | s32 >>> 22), v2 = d22 + ((a32 << 26 | a32 >>> 6) ^ (a32 << 21 | a32 >>> 11) ^ (a32 << 7 | a32 >>> 25)) + (a32 & h32 ^ ~a32 & l2) + c22[p2] + u22[p2];
        d22 = l2, l2 = h32, h32 = a32, a32 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s32, s32 = v2 + (w22 + _2) | 0;
      }
      n3[0] = n3[0] + s32 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a32 | 0, n3[5] = n3[5] + h32 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d22 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s32 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s32 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s32, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
    }, clone: function() {
      var e4 = i22.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    t3.SHA256 = i22._createHelper(h22), t3.HmacSHA256 = i22._createHmacHelper(h22);
  }(Math), n2.SHA256);
}), we = _e, ve = n(function(e22, t22) {
  e22.exports = r.HmacSHA256;
});
const Ie = () => {
  let e22;
  if (!Promise) {
    e22 = () => {
    }, e22.promise = {};
    const t3 = () => {
      throw new te({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
    };
    return Object.defineProperty(e22.promise, "then", { get: t3 }), Object.defineProperty(e22.promise, "catch", { get: t3 }), e22;
  }
  const t22 = new Promise((t3, n2) => {
    e22 = (e3, s22) => e3 ? n2(e3) : t3(s22);
  });
  return e22.promise = t22, e22;
};
function Se(e22) {
  return void 0 === e22;
}
function Te(e22) {
  return "[object Null]" === Object.prototype.toString.call(e22);
}
function be(e22 = "") {
  return e22.replace(/([\s\S]+)\s+(请前往云开发AI小助手查看问题：.*)/, "$1");
}
function Ee(e22 = 32) {
  const t22 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let n2 = "";
  for (let s22 = 0; s22 < e22; s22++)
    n2 += t22.charAt(Math.floor(62 * Math.random()));
  return n2;
}
var ke;
function Pe(e22) {
  const t22 = (n2 = e22, "[object Array]" === Object.prototype.toString.call(n2) ? e22 : [e22]);
  var n2;
  for (const e3 of t22) {
    const { isMatch: t3, genAdapter: n3, runtime: s22 } = e3;
    if (t3())
      return { adapter: n3(), runtime: s22 };
  }
}
!function(e22) {
  e22.WEB = "web", e22.WX_MP = "wx_mp";
}(ke || (ke = {}));
const Ce = { adapter: null, runtime: void 0 }, Ae = ["anonymousUuidKey"];
class Oe extends ye {
  constructor() {
    super(), Ce.adapter.root.tcbObject || (Ce.adapter.root.tcbObject = {});
  }
  setItem(e22, t22) {
    Ce.adapter.root.tcbObject[e22] = t22;
  }
  getItem(e22) {
    return Ce.adapter.root.tcbObject[e22];
  }
  removeItem(e22) {
    delete Ce.adapter.root.tcbObject[e22];
  }
  clear() {
    delete Ce.adapter.root.tcbObject;
  }
}
function xe(e22, t22) {
  switch (e22) {
    case "local":
      return t22.localStorage || new Oe();
    case "none":
      return new Oe();
    default:
      return t22.sessionStorage || new Oe();
  }
}
class Ne {
  constructor(e22) {
    if (!this._storage) {
      this._persistence = Ce.adapter.primaryStorage || e22.persistence, this._storage = xe(this._persistence, Ce.adapter);
      const t22 = `access_token_${e22.env}`, n2 = `access_token_expire_${e22.env}`, s22 = `refresh_token_${e22.env}`, r2 = `anonymous_uuid_${e22.env}`, i22 = `login_type_${e22.env}`, o2 = "device_id", a22 = `token_type_${e22.env}`, c22 = `user_info_${e22.env}`;
      this.keys = { accessTokenKey: t22, accessTokenExpireKey: n2, refreshTokenKey: s22, anonymousUuidKey: r2, loginTypeKey: i22, userInfoKey: c22, deviceIdKey: o2, tokenTypeKey: a22 };
    }
  }
  updatePersistence(e22) {
    if (e22 === this._persistence)
      return;
    const t22 = "local" === this._persistence;
    this._persistence = e22;
    const n2 = xe(e22, Ce.adapter);
    for (const e3 in this.keys) {
      const s22 = this.keys[e3];
      if (t22 && Ae.includes(e3))
        continue;
      const r2 = this._storage.getItem(s22);
      Se(r2) || Te(r2) || (n2.setItem(s22, r2), this._storage.removeItem(s22));
    }
    this._storage = n2;
  }
  setStore(e22, t22, n2) {
    if (!this._storage)
      return;
    const s22 = { version: n2 || "localCachev1", content: t22 }, r2 = JSON.stringify(s22);
    try {
      this._storage.setItem(e22, r2);
    } catch (e3) {
      throw e3;
    }
  }
  getStore(e22, t22) {
    try {
      if (!this._storage)
        return;
    } catch (e3) {
      return "";
    }
    t22 = t22 || "localCachev1";
    const n2 = this._storage.getItem(e22);
    if (!n2)
      return "";
    if (n2.indexOf(t22) >= 0) {
      return JSON.parse(n2).content;
    }
    return "";
  }
  removeStore(e22) {
    this._storage.removeItem(e22);
  }
}
const Re = {}, Le = {};
function Ue(e22) {
  return Re[e22];
}
class De {
  constructor(e22, t22) {
    this.data = t22 || null, this.name = e22;
  }
}
class Me extends De {
  constructor(e22, t22) {
    super("error", { error: e22, data: t22 }), this.error = e22;
  }
}
const qe = new class {
  constructor() {
    this._listeners = {};
  }
  on(e22, t22) {
    return function(e3, t3, n2) {
      n2[e3] = n2[e3] || [], n2[e3].push(t3);
    }(e22, t22, this._listeners), this;
  }
  off(e22, t22) {
    return function(e3, t3, n2) {
      if (n2 && n2[e3]) {
        const s22 = n2[e3].indexOf(t3);
        -1 !== s22 && n2[e3].splice(s22, 1);
      }
    }(e22, t22, this._listeners), this;
  }
  fire(e22, t22) {
    if (e22 instanceof Me)
      return console.error(e22.error), this;
    const n2 = "string" == typeof e22 ? new De(e22, t22 || {}) : e22;
    const s22 = n2.name;
    if (this._listens(s22)) {
      n2.target = this;
      const e3 = this._listeners[s22] ? [...this._listeners[s22]] : [];
      for (const t3 of e3)
        t3.call(this, n2);
    }
    return this;
  }
  _listens(e22) {
    return this._listeners[e22] && this._listeners[e22].length > 0;
  }
}();
function Fe(e22, t22) {
  qe.on(e22, t22);
}
function Ke(e22, t22 = {}) {
  qe.fire(e22, t22);
}
function je(e22, t22) {
  qe.off(e22, t22);
}
const $e = "loginStateChanged", Be = "loginStateExpire", We = "loginTypeChanged", He = "anonymousConverted", Je = "refreshAccessToken";
var ze;
!function(e22) {
  e22.ANONYMOUS = "ANONYMOUS", e22.WECHAT = "WECHAT", e22.WECHAT_PUBLIC = "WECHAT-PUBLIC", e22.WECHAT_OPEN = "WECHAT-OPEN", e22.CUSTOM = "CUSTOM", e22.EMAIL = "EMAIL", e22.USERNAME = "USERNAME", e22.NULL = "NULL";
}(ze || (ze = {}));
class Ve {
  constructor() {
    this._fnPromiseMap = /* @__PURE__ */ new Map();
  }
  async run(e22, t22) {
    let n2 = this._fnPromiseMap.get(e22);
    return n2 || (n2 = new Promise(async (n3, s22) => {
      try {
        await this._runIdlePromise();
        const e3 = t22();
        n3(await e3);
      } catch (e3) {
        s22(e3);
      } finally {
        this._fnPromiseMap.delete(e22);
      }
    }), this._fnPromiseMap.set(e22, n2)), n2;
  }
  _runIdlePromise() {
    return Promise.resolve();
  }
}
class Ge {
  constructor(e22) {
    this._singlePromise = new Ve(), this._cache = Ue(e22.env), this._baseURL = `https://${e22.env}.ap-shanghai.tcb-api.tencentcloudapi.com`, this._reqClass = new Ce.adapter.reqClass({ timeout: e22.timeout, timeoutMsg: `请求在${e22.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] });
  }
  _getDeviceId() {
    if (this._deviceID)
      return this._deviceID;
    const { deviceIdKey: e22 } = this._cache.keys;
    let t22 = this._cache.getStore(e22);
    return "string" == typeof t22 && t22.length >= 16 && t22.length <= 48 || (t22 = Ee(), this._cache.setStore(e22, t22)), this._deviceID = t22, t22;
  }
  async _request(e22, t22, n2 = {}) {
    const s22 = { "x-request-id": Ee(), "x-device-id": this._getDeviceId() };
    if (n2.withAccessToken) {
      const { tokenTypeKey: e3 } = this._cache.keys, t3 = await this.getAccessToken(), n3 = this._cache.getStore(e3);
      s22.authorization = `${n3} ${t3}`;
    }
    return this._reqClass["get" === n2.method ? "get" : "post"]({ url: `${this._baseURL}${e22}`, data: t22, headers: s22 });
  }
  async _fetchAccessToken() {
    const { loginTypeKey: e22, accessTokenKey: t22, accessTokenExpireKey: n2, tokenTypeKey: s22 } = this._cache.keys, r2 = this._cache.getStore(e22);
    if (r2 && r2 !== ze.ANONYMOUS)
      throw new te({ code: "INVALID_OPERATION", message: "非匿名登录不支持刷新 access token" });
    const i22 = await this._singlePromise.run("fetchAccessToken", async () => (await this._request("/auth/v1/signin/anonymously", {}, { method: "post" })).data), { access_token: o2, expires_in: a22, token_type: c22 } = i22;
    return this._cache.setStore(s22, c22), this._cache.setStore(t22, o2), this._cache.setStore(n2, Date.now() + 1e3 * a22), o2;
  }
  isAccessTokenExpired(e22, t22) {
    let n2 = true;
    return e22 && t22 && (n2 = t22 < Date.now()), n2;
  }
  async getAccessToken() {
    const { accessTokenKey: e22, accessTokenExpireKey: t22 } = this._cache.keys, n2 = this._cache.getStore(e22), s22 = this._cache.getStore(t22);
    return this.isAccessTokenExpired(n2, s22) ? this._fetchAccessToken() : n2;
  }
  async refreshAccessToken() {
    const { accessTokenKey: e22, accessTokenExpireKey: t22, loginTypeKey: n2 } = this._cache.keys;
    return this._cache.removeStore(e22), this._cache.removeStore(t22), this._cache.setStore(n2, ze.ANONYMOUS), this.getAccessToken();
  }
  async getUserInfo() {
    return this._singlePromise.run("getUserInfo", async () => (await this._request("/auth/v1/user/me", {}, { withAccessToken: true, method: "get" })).data);
  }
}
const Ye = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Qe = { "X-SDK-Version": "1.3.5" };
function Xe(e22, t22, n2) {
  const s22 = e22[t22];
  e22[t22] = function(t3) {
    const r2 = {}, i22 = {};
    n2.forEach((n3) => {
      const { data: s32, headers: o3 } = n3.call(e22, t3);
      Object.assign(r2, s32), Object.assign(i22, o3);
    });
    const o2 = t3.data;
    return o2 && (() => {
      var e3;
      if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
        t3.data = { ...o2, ...r2 };
      else
        for (const e4 in r2)
          o2.append(e4, r2[e4]);
    })(), t3.headers = { ...t3.headers || {}, ...i22 }, s22.call(e22, t3);
  };
}
function Ze() {
  const e22 = Math.random().toString(16).slice(2);
  return { data: { seqId: e22 }, headers: { ...Qe, "x-seqid": e22 } };
}
class et {
  constructor(e22 = {}) {
    var t22;
    this.config = e22, this._reqClass = new Ce.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Ue(this.config.env), this._localCache = (t22 = this.config.env, Le[t22]), this.oauth = new Ge(this.config), Xe(this._reqClass, "post", [Ze]), Xe(this._reqClass, "upload", [Ze]), Xe(this._reqClass, "download", [Ze]);
  }
  async post(e22) {
    return await this._reqClass.post(e22);
  }
  async upload(e22) {
    return await this._reqClass.upload(e22);
  }
  async download(e22) {
    return await this._reqClass.download(e22);
  }
  async refreshAccessToken() {
    let e22, t22;
    this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
    try {
      e22 = await this._refreshAccessTokenPromise;
    } catch (e3) {
      t22 = e3;
    }
    if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t22)
      throw t22;
    return e22;
  }
  async _refreshAccessToken() {
    const { accessTokenKey: e22, accessTokenExpireKey: t22, refreshTokenKey: n2, loginTypeKey: s22, anonymousUuidKey: r2 } = this._cache.keys;
    this._cache.removeStore(e22), this._cache.removeStore(t22);
    let i22 = this._cache.getStore(n2);
    if (!i22)
      throw new te({ message: "未登录CloudBase" });
    const o2 = { refresh_token: i22 }, a22 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
    if (a22.data.code) {
      const { code: e3 } = a22.data;
      if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
        if (this._cache.getStore(s22) === ze.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
          const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s32 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
          return this.setRefreshToken(s32.refresh_token), this._refreshAccessToken();
        }
        Ke(Be), this._cache.removeStore(n2);
      }
      throw new te({ code: a22.data.code, message: `刷新access token失败：${a22.data.code}` });
    }
    if (a22.data.access_token)
      return Ke(Je), this._cache.setStore(e22, a22.data.access_token), this._cache.setStore(t22, a22.data.access_token_expire + Date.now()), { accessToken: a22.data.access_token, accessTokenExpire: a22.data.access_token_expire };
    a22.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a22.data.refresh_token), this._refreshAccessToken());
  }
  async getAccessToken() {
    const { accessTokenKey: e22, accessTokenExpireKey: t22, refreshTokenKey: n2 } = this._cache.keys;
    if (!this._cache.getStore(n2))
      throw new te({ message: "refresh token不存在，登录状态异常" });
    let s22 = this._cache.getStore(e22), r2 = this._cache.getStore(t22), i22 = true;
    return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s22, r2) && (i22 = false), (!s22 || !r2 || r2 < Date.now()) && i22 ? this.refreshAccessToken() : { accessToken: s22, accessTokenExpire: r2 };
  }
  async request(e22, t22, n2) {
    const s22 = `x-tcb-trace_${this.config.env}`;
    let r2 = "application/x-www-form-urlencoded";
    const i22 = { action: e22, env: this.config.env, dataVersion: "2019-08-16", ...t22 };
    let o2;
    if (-1 === Ye.indexOf(e22) && (this._cache.keys, i22.access_token = await this.oauth.getAccessToken()), "storage.uploadFile" === e22) {
      o2 = new FormData();
      for (let e3 in o2)
        o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i22[e3]);
      r2 = "multipart/form-data";
    } else {
      r2 = "application/json", o2 = {};
      for (let e3 in i22)
        void 0 !== i22[e3] && (o2[e3] = i22[e3]);
    }
    let a22 = { headers: { "content-type": r2 } };
    n2 && n2.timeout && (a22.timeout = n2.timeout), n2 && n2.onUploadProgress && (a22.onUploadProgress = n2.onUploadProgress);
    const c22 = this._localCache.getStore(s22);
    c22 && (a22.headers["X-TCB-Trace"] = c22);
    const { parse: u22, inQuery: h22, search: l2 } = t22;
    let d22 = { env: this.config.env };
    u22 && (d22.parse = true), h22 && (d22 = { ...h22, ...d22 });
    let p2 = function(e3, t3, n3 = {}) {
      const s32 = /\?/.test(t3);
      let r3 = "";
      for (let e4 in n3)
        "" === r3 ? !s32 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
      return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
    }(ge, "//tcb-api.tencentcloudapi.com/web", d22);
    l2 && (p2 += l2);
    const f2 = await this.post({ url: p2, data: o2, ...a22 }), g2 = f2.header && f2.header["x-tcb-trace"];
    if (g2 && this._localCache.setStore(s22, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
      throw new te({ code: "NETWORK_ERROR", message: "network request error" });
    return f2;
  }
  async send(e22, t22 = {}, n2 = {}) {
    const s22 = await this.request(e22, t22, { ...n2, onUploadProgress: t22.onUploadProgress });
    if (("ACCESS_TOKEN_DISABLED" === s22.data.code || "ACCESS_TOKEN_EXPIRED" === s22.data.code) && -1 === Ye.indexOf(e22)) {
      await this.oauth.refreshAccessToken();
      const s32 = await this.request(e22, t22, { ...n2, onUploadProgress: t22.onUploadProgress });
      if (s32.data.code)
        throw new te({ code: s32.data.code, message: be(s32.data.message) });
      return s32.data;
    }
    if (s22.data.code)
      throw new te({ code: s22.data.code, message: be(s22.data.message) });
    return s22.data;
  }
  setRefreshToken(e22) {
    const { accessTokenKey: t22, accessTokenExpireKey: n2, refreshTokenKey: s22 } = this._cache.keys;
    this._cache.removeStore(t22), this._cache.removeStore(n2), this._cache.setStore(s22, e22);
  }
}
const tt$1 = {};
function nt(e22) {
  return tt$1[e22];
}
class st {
  constructor(e22) {
    this.config = e22, this._cache = Ue(e22.env), this._request = nt(e22.env);
  }
  setRefreshToken(e22) {
    const { accessTokenKey: t22, accessTokenExpireKey: n2, refreshTokenKey: s22 } = this._cache.keys;
    this._cache.removeStore(t22), this._cache.removeStore(n2), this._cache.setStore(s22, e22);
  }
  setAccessToken(e22, t22) {
    const { accessTokenKey: n2, accessTokenExpireKey: s22 } = this._cache.keys;
    this._cache.setStore(n2, e22), this._cache.setStore(s22, t22);
  }
  async refreshUserInfo() {
    const { data: e22 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e22), e22;
  }
  setLocalUserInfo(e22) {
    const { userInfoKey: t22 } = this._cache.keys;
    this._cache.setStore(t22, e22);
  }
}
class rt {
  constructor(e22) {
    if (!e22)
      throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._envId = e22, this._cache = Ue(this._envId), this._request = nt(this._envId), this.setUserInfo();
  }
  linkWithTicket(e22) {
    if ("string" != typeof e22)
      throw new te({ code: "PARAM_ERROR", message: "ticket must be string" });
    return this._request.send("auth.linkWithTicket", { ticket: e22 });
  }
  linkWithRedirect(e22) {
    e22.signInWithRedirect();
  }
  updatePassword(e22, t22) {
    return this._request.send("auth.updatePassword", { oldPassword: t22, newPassword: e22 });
  }
  updateEmail(e22) {
    return this._request.send("auth.updateEmail", { newEmail: e22 });
  }
  updateUsername(e22) {
    if ("string" != typeof e22)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    return this._request.send("auth.updateUsername", { username: e22 });
  }
  async getLinkedUidList() {
    const { data: e22 } = await this._request.send("auth.getLinkedUidList", {});
    let t22 = false;
    const { users: n2 } = e22;
    return n2.forEach((e3) => {
      e3.wxOpenId && e3.wxPublicId && (t22 = true);
    }), { users: n2, hasPrimaryUid: t22 };
  }
  setPrimaryUid(e22) {
    return this._request.send("auth.setPrimaryUid", { uid: e22 });
  }
  unlink(e22) {
    return this._request.send("auth.unlink", { platform: e22 });
  }
  async update(e22) {
    const { nickName: t22, gender: n2, avatarUrl: s22, province: r2, country: i22, city: o2 } = e22, { data: a22 } = await this._request.send("auth.updateUserInfo", { nickName: t22, gender: n2, avatarUrl: s22, province: r2, country: i22, city: o2 });
    this.setLocalUserInfo(a22);
  }
  async refresh() {
    const e22 = await this._request.oauth.getUserInfo();
    return this.setLocalUserInfo(e22), e22;
  }
  setUserInfo() {
    const { userInfoKey: e22 } = this._cache.keys, t22 = this._cache.getStore(e22);
    ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
      this[e3] = t22[e3];
    }), this.location = { country: t22.country, province: t22.province, city: t22.city };
  }
  setLocalUserInfo(e22) {
    const { userInfoKey: t22 } = this._cache.keys;
    this._cache.setStore(t22, e22), this.setUserInfo();
  }
}
class it {
  constructor(e22) {
    if (!e22)
      throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._cache = Ue(e22);
    const { refreshTokenKey: t22, accessTokenKey: n2, accessTokenExpireKey: s22 } = this._cache.keys, r2 = this._cache.getStore(t22), i22 = this._cache.getStore(n2), o2 = this._cache.getStore(s22);
    this.credential = { refreshToken: r2, accessToken: i22, accessTokenExpire: o2 }, this.user = new rt(e22);
  }
  get isAnonymousAuth() {
    return this.loginType === ze.ANONYMOUS;
  }
  get isCustomAuth() {
    return this.loginType === ze.CUSTOM;
  }
  get isWeixinAuth() {
    return this.loginType === ze.WECHAT || this.loginType === ze.WECHAT_OPEN || this.loginType === ze.WECHAT_PUBLIC;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
}
class ot extends st {
  async signIn() {
    this._cache.updatePersistence("local"), await this._request.oauth.getAccessToken(), Ke($e), Ke(We, { env: this.config.env, loginType: ze.ANONYMOUS, persistence: "local" });
    const e22 = new it(this.config.env);
    return await e22.user.refresh(), e22;
  }
  async linkAndRetrieveDataWithTicket(e22) {
    const { anonymousUuidKey: t22, refreshTokenKey: n2 } = this._cache.keys, s22 = this._cache.getStore(t22), r2 = this._cache.getStore(n2), i22 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s22, refresh_token: r2, ticket: e22 });
    if (i22.refresh_token)
      return this._clearAnonymousUUID(), this.setRefreshToken(i22.refresh_token), await this._request.refreshAccessToken(), Ke(He, { env: this.config.env }), Ke(We, { loginType: ze.CUSTOM, persistence: "local" }), { credential: { refreshToken: i22.refresh_token } };
    throw new te({ message: "匿名转化失败" });
  }
  _setAnonymousUUID(e22) {
    const { anonymousUuidKey: t22, loginTypeKey: n2 } = this._cache.keys;
    this._cache.removeStore(t22), this._cache.setStore(t22, e22), this._cache.setStore(n2, ze.ANONYMOUS);
  }
  _clearAnonymousUUID() {
    this._cache.removeStore(this._cache.keys.anonymousUuidKey);
  }
}
class at extends st {
  async signIn(e22) {
    if ("string" != typeof e22)
      throw new te({ code: "PARAM_ERROR", message: "ticket must be a string" });
    const { refreshTokenKey: t22 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e22, refresh_token: this._cache.getStore(t22) || "" });
    if (n2.refresh_token)
      return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Ke($e), Ke(We, { env: this.config.env, loginType: ze.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new it(this.config.env);
    throw new te({ message: "自定义登录失败" });
  }
}
class ct extends st {
  async signIn(e22, t22) {
    if ("string" != typeof e22)
      throw new te({ code: "PARAM_ERROR", message: "email must be a string" });
    const { refreshTokenKey: n2 } = this._cache.keys, s22 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e22, password: t22, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i22, access_token_expire: o2 } = s22;
    if (r2)
      return this.setRefreshToken(r2), i22 && o2 ? this.setAccessToken(i22, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Ke($e), Ke(We, { env: this.config.env, loginType: ze.EMAIL, persistence: this.config.persistence }), new it(this.config.env);
    throw s22.code ? new te({ code: s22.code, message: `邮箱登录失败: ${s22.message}` }) : new te({ message: "邮箱登录失败" });
  }
  async activate(e22) {
    return this._request.send("auth.activateEndUserMail", { token: e22 });
  }
  async resetPasswordWithToken(e22, t22) {
    return this._request.send("auth.resetPasswordWithToken", { token: e22, newPassword: t22 });
  }
}
class ut extends st {
  async signIn(e22, t22) {
    if ("string" != typeof e22)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    "string" != typeof t22 && (t22 = "", console.warn("password is empty"));
    const { refreshTokenKey: n2 } = this._cache.keys, s22 = await this._request.send("auth.signIn", { loginType: ze.USERNAME, username: e22, password: t22, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i22, access_token: o2 } = s22;
    if (r2)
      return this.setRefreshToken(r2), o2 && i22 ? this.setAccessToken(o2, i22) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Ke($e), Ke(We, { env: this.config.env, loginType: ze.USERNAME, persistence: this.config.persistence }), new it(this.config.env);
    throw s22.code ? new te({ code: s22.code, message: `用户名密码登录失败: ${s22.message}` }) : new te({ message: "用户名密码登录失败" });
  }
}
class ht {
  constructor(e22) {
    this.config = e22, this._cache = Ue(e22.env), this._request = nt(e22.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), Fe(We, this._onLoginTypeChanged);
  }
  get currentUser() {
    const e22 = this.hasLoginState();
    return e22 && e22.user || null;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
  anonymousAuthProvider() {
    return new ot(this.config);
  }
  customAuthProvider() {
    return new at(this.config);
  }
  emailAuthProvider() {
    return new ct(this.config);
  }
  usernameAuthProvider() {
    return new ut(this.config);
  }
  async signInAnonymously() {
    return new ot(this.config).signIn();
  }
  async signInWithEmailAndPassword(e22, t22) {
    return new ct(this.config).signIn(e22, t22);
  }
  signInWithUsernameAndPassword(e22, t22) {
    return new ut(this.config).signIn(e22, t22);
  }
  async linkAndRetrieveDataWithTicket(e22) {
    this._anonymousAuthProvider || (this._anonymousAuthProvider = new ot(this.config)), Fe(He, this._onAnonymousConverted);
    return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e22);
  }
  async signOut() {
    if (this.loginType === ze.ANONYMOUS)
      throw new te({ message: "匿名用户不支持登出操作" });
    const { refreshTokenKey: e22, accessTokenKey: t22, accessTokenExpireKey: n2 } = this._cache.keys, s22 = this._cache.getStore(e22);
    if (!s22)
      return;
    const r2 = await this._request.send("auth.logout", { refresh_token: s22 });
    return this._cache.removeStore(e22), this._cache.removeStore(t22), this._cache.removeStore(n2), Ke($e), Ke(We, { env: this.config.env, loginType: ze.NULL, persistence: this.config.persistence }), r2;
  }
  async signUpWithEmailAndPassword(e22, t22) {
    return this._request.send("auth.signUpWithEmailAndPassword", { email: e22, password: t22 });
  }
  async sendPasswordResetEmail(e22) {
    return this._request.send("auth.sendPasswordResetEmail", { email: e22 });
  }
  onLoginStateChanged(e22) {
    Fe($e, () => {
      const t3 = this.hasLoginState();
      e22.call(this, t3);
    });
    const t22 = this.hasLoginState();
    e22.call(this, t22);
  }
  onLoginStateExpired(e22) {
    Fe(Be, e22.bind(this));
  }
  onAccessTokenRefreshed(e22) {
    Fe(Je, e22.bind(this));
  }
  onAnonymousConverted(e22) {
    Fe(He, e22.bind(this));
  }
  onLoginTypeChanged(e22) {
    Fe(We, () => {
      const t22 = this.hasLoginState();
      e22.call(this, t22);
    });
  }
  async getAccessToken() {
    return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
  }
  hasLoginState() {
    const { accessTokenKey: e22, accessTokenExpireKey: t22 } = this._cache.keys, n2 = this._cache.getStore(e22), s22 = this._cache.getStore(t22);
    return this._request.oauth.isAccessTokenExpired(n2, s22) ? null : new it(this.config.env);
  }
  async isUsernameRegistered(e22) {
    if ("string" != typeof e22)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    const { data: t22 } = await this._request.send("auth.isUsernameRegistered", { username: e22 });
    return t22 && t22.isRegistered;
  }
  getLoginState() {
    return Promise.resolve(this.hasLoginState());
  }
  async signInWithTicket(e22) {
    return new at(this.config).signIn(e22);
  }
  shouldRefreshAccessToken(e22) {
    this._request._shouldRefreshAccessTokenHook = e22.bind(this);
  }
  getUserInfo() {
    return this._request.send("auth.getUserInfo", {}).then((e22) => e22.code ? e22 : { ...e22.data, requestId: e22.seqId });
  }
  getAuthHeader() {
    const { refreshTokenKey: e22, accessTokenKey: t22 } = this._cache.keys, n2 = this._cache.getStore(e22);
    return { "x-cloudbase-credentials": this._cache.getStore(t22) + "/@@/" + n2 };
  }
  _onAnonymousConverted(e22) {
    const { env: t22 } = e22.data;
    t22 === this.config.env && this._cache.updatePersistence(this.config.persistence);
  }
  _onLoginTypeChanged(e22) {
    const { loginType: t22, persistence: n2, env: s22 } = e22.data;
    s22 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t22));
  }
}
const lt = function(e22, t22) {
  t22 = t22 || Ie();
  const n2 = nt(this.config.env), { cloudPath: s22, filePath: r2, onUploadProgress: i22, fileType: o2 = "image" } = e22;
  return n2.send("storage.getUploadMetadata", { path: s22 }).then((e3) => {
    const { data: { url: a22, authorization: c22, token: u22, fileId: h22, cosFileId: l2 }, requestId: d22 } = e3, p2 = { key: s22, signature: c22, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u22 };
    n2.upload({ url: a22, data: p2, file: r2, name: s22, fileType: o2, onUploadProgress: i22 }).then((e4) => {
      201 === e4.statusCode ? t22(null, { fileID: h22, requestId: d22 }) : t22(new te({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
    }).catch((e4) => {
      t22(e4);
    });
  }).catch((e3) => {
    t22(e3);
  }), t22.promise;
}, dt = function(e22, t22) {
  t22 = t22 || Ie();
  const n2 = nt(this.config.env), { cloudPath: s22 } = e22;
  return n2.send("storage.getUploadMetadata", { path: s22 }).then((e3) => {
    t22(null, e3);
  }).catch((e3) => {
    t22(e3);
  }), t22.promise;
}, pt = function({ fileList: e22 }, t22) {
  if (t22 = t22 || Ie(), !e22 || !Array.isArray(e22))
    return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
  for (let t3 of e22)
    if (!t3 || "string" != typeof t3)
      return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
  const n2 = { fileid_list: e22 };
  return nt(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
    e3.code ? t22(null, e3) : t22(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
  }).catch((e3) => {
    t22(e3);
  }), t22.promise;
}, ft = function({ fileList: e22 }, t22) {
  t22 = t22 || Ie(), e22 && Array.isArray(e22) || t22(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
  let n2 = [];
  for (let s32 of e22)
    "object" == typeof s32 ? (s32.hasOwnProperty("fileID") && s32.hasOwnProperty("maxAge") || t22(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s32.fileID, max_age: s32.maxAge })) : "string" == typeof s32 ? n2.push({ fileid: s32 }) : t22(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
  const s22 = { file_list: n2 };
  return nt(this.config.env).send("storage.batchGetDownloadUrl", s22).then((e3) => {
    e3.code ? t22(null, e3) : t22(null, { fileList: e3.data.download_list, requestId: e3.requestId });
  }).catch((e3) => {
    t22(e3);
  }), t22.promise;
}, gt = async function({ fileID: e22 }, t22) {
  const n2 = (await ft.call(this, { fileList: [{ fileID: e22, maxAge: 600 }] })).fileList[0];
  if ("SUCCESS" !== n2.code)
    return t22 ? t22(n2) : new Promise((e3) => {
      e3(n2);
    });
  const s22 = nt(this.config.env);
  let r2 = n2.download_url;
  if (r2 = encodeURI(r2), !t22)
    return s22.download({ url: r2 });
  t22(await s22.download({ url: r2 }));
}, mt = function({ name: e22, data: t22, query: n2, parse: s22, search: r2, timeout: i22 }, o2) {
  const a22 = o2 || Ie();
  let c22;
  try {
    c22 = t22 ? JSON.stringify(t22) : "";
  } catch (e3) {
    return Promise.reject(e3);
  }
  if (!e22)
    return Promise.reject(new te({ code: "PARAM_ERROR", message: "函数名不能为空" }));
  const u22 = { inQuery: n2, parse: s22, search: r2, function_name: e22, request_data: c22 };
  return nt(this.config.env).send("functions.invokeFunction", u22, { timeout: i22 }).then((e3) => {
    if (e3.code)
      a22(null, e3);
    else {
      let t3 = e3.data.response_data;
      if (s22)
        a22(null, { result: t3, requestId: e3.requestId });
      else
        try {
          t3 = JSON.parse(e3.data.response_data), a22(null, { result: t3, requestId: e3.requestId });
        } catch (e4) {
          a22(new te({ message: "response data must be json" }));
        }
    }
    return a22.promise;
  }).catch((e3) => {
    a22(e3);
  }), a22.promise;
}, yt = { timeout: 15e3, persistence: "session" }, _t = 6e5, wt = {};
class vt {
  constructor(e22) {
    this.config = e22 || this.config, this.authObj = void 0;
  }
  init(e22) {
    switch (Ce.adapter || (this.requestClient = new Ce.adapter.reqClass({ timeout: e22.timeout || 5e3, timeoutMsg: `请求在${(e22.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...yt, ...e22 }, true) {
      case this.config.timeout > _t:
        console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = _t;
        break;
      case this.config.timeout < 100:
        console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
    }
    return new vt(this.config);
  }
  auth({ persistence: e22 } = {}) {
    if (this.authObj)
      return this.authObj;
    const t22 = e22 || Ce.adapter.primaryStorage || yt.persistence;
    var n2;
    return t22 !== this.config.persistence && (this.config.persistence = t22), function(e3) {
      const { env: t3 } = e3;
      Re[t3] = new Ne(e3), Le[t3] = new Ne({ ...e3, persistence: "local" });
    }(this.config), n2 = this.config, tt$1[n2.env] = new et(n2), this.authObj = new ht(this.config), this.authObj;
  }
  on(e22, t22) {
    return Fe.apply(this, [e22, t22]);
  }
  off(e22, t22) {
    return je.apply(this, [e22, t22]);
  }
  callFunction(e22, t22) {
    return mt.apply(this, [e22, t22]);
  }
  deleteFile(e22, t22) {
    return pt.apply(this, [e22, t22]);
  }
  getTempFileURL(e22, t22) {
    return ft.apply(this, [e22, t22]);
  }
  downloadFile(e22, t22) {
    return gt.apply(this, [e22, t22]);
  }
  uploadFile(e22, t22) {
    return lt.apply(this, [e22, t22]);
  }
  getUploadMetadata(e22, t22) {
    return dt.apply(this, [e22, t22]);
  }
  registerExtension(e22) {
    wt[e22.name] = e22;
  }
  async invokeExtension(e22, t22) {
    const n2 = wt[e22];
    if (!n2)
      throw new te({ message: `扩展${e22} 必须先注册` });
    return await n2.invoke(t22, this);
  }
  useAdapters(e22) {
    const { adapter: t22, runtime: n2 } = Pe(e22) || {};
    t22 && (Ce.adapter = t22), n2 && (Ce.runtime = n2);
  }
}
var It = new vt();
function St(e22, t22, n2) {
  void 0 === n2 && (n2 = {});
  var s22 = /\?/.test(t22), r2 = "";
  for (var i22 in n2)
    "" === r2 ? !s22 && (t22 += "?") : r2 += "&", r2 += i22 + "=" + encodeURIComponent(n2[i22]);
  return /^http(s)?:\/\//.test(t22 += r2) ? t22 : "" + e22 + t22;
}
class Tt {
  get(e22) {
    const { url: t22, data: n2, headers: s22, timeout: r2 } = e22;
    return new Promise((e3, i22) => {
      ne.request({ url: St("https:", t22), data: n2, method: "GET", header: s22, timeout: r2, success(t3) {
        e3(t3);
      }, fail(e4) {
        i22(e4);
      } });
    });
  }
  post(e22) {
    const { url: t22, data: n2, headers: s22, timeout: r2 } = e22;
    return new Promise((e3, i22) => {
      ne.request({ url: St("https:", t22), data: n2, method: "POST", header: s22, timeout: r2, success(t3) {
        e3(t3);
      }, fail(e4) {
        i22(e4);
      } });
    });
  }
  upload(e22) {
    return new Promise((t22, n2) => {
      const { url: s22, file: r2, data: i22, headers: o2, fileType: a22 } = e22, c22 = ne.uploadFile({ url: St("https:", s22), name: "file", formData: Object.assign({}, i22), filePath: r2, fileType: a22, header: o2, success(e3) {
        const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
        200 === e3.statusCode && i22.success_action_status && (n3.statusCode = parseInt(i22.success_action_status, 10)), t22(n3);
      }, fail(e3) {
        n2(new Error(e3.errMsg || "uploadFile:fail"));
      } });
      "function" == typeof e22.onUploadProgress && c22 && "function" == typeof c22.onProgressUpdate && c22.onProgressUpdate((t3) => {
        e22.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
      });
    });
  }
}
const bt = { setItem(e22, t22) {
  ne.setStorageSync(e22, t22);
}, getItem: (e22) => ne.getStorageSync(e22), removeItem(e22) {
  ne.removeStorageSync(e22);
}, clear() {
  ne.clearStorageSync();
} };
var Et = { genAdapter: function() {
  return { root: {}, reqClass: Tt, localStorage: bt, primaryStorage: "local" };
}, isMatch: function() {
  return true;
}, runtime: "uni_app" };
It.useAdapters(Et);
const kt = It, Pt = kt.init;
kt.init = function(e22) {
  e22.env = e22.spaceId;
  const t22 = Pt.call(this, e22);
  t22.config.provider = "tencent", t22.config.spaceId = e22.spaceId;
  const n2 = t22.auth;
  return t22.auth = function(e3) {
    const t3 = n2.call(this, e3);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
      var n3;
      t3[e4] = (n3 = t3[e4], function(e5) {
        e5 = e5 || {};
        const { success: t4, fail: s22, complete: r2 } = ee(e5);
        if (!(t4 || s22 || r2))
          return n3.call(this, e5);
        n3.call(this, e5).then((e6) => {
          t4 && t4(e6), r2 && r2(e6);
        }, (e6) => {
          s22 && s22(e6), r2 && r2(e6);
        });
      }).bind(t3);
    }), t3;
  }, t22.customAuth = t22.auth, t22;
};
var Ct = kt;
async function At(e22, t22) {
  const n2 = `http://${e22}:${t22}/system/ping`;
  try {
    const e3 = await (s22 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
      ne.request({ ...s22, success(t4) {
        e4(t4);
      }, fail(e5) {
        t3(e5);
      } });
    }));
    return !(!e3.data || 0 !== e3.data.code);
  } catch (e3) {
    return false;
  }
  var s22;
}
async function Ot(e22, t22) {
  let n2;
  for (let s22 = 0; s22 < e22.length; s22++) {
    const r2 = e22[s22];
    if (await At(r2, t22)) {
      n2 = r2;
      break;
    }
  }
  return { address: n2, port: t22 };
}
const xt = { "serverless.file.resource.generateProximalSign": "storage/generate-proximal-sign", "serverless.file.resource.report": "storage/report", "serverless.file.resource.delete": "storage/delete", "serverless.file.resource.getTempFileURL": "storage/get-temp-file-url" };
var Nt = class {
  constructor(e22) {
    if (["spaceId", "clientSecret"].forEach((t22) => {
      if (!Object.prototype.hasOwnProperty.call(e22, t22))
        throw new Error(`${t22} required`);
    }), !e22.endpoint)
      throw new Error("集群空间未配置ApiEndpoint，配置后需要重新关联服务空间后生效");
    this.config = Object.assign({}, e22), this.config.provider = "dcloud", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.adapter = ne;
  }
  async request(e22, t22 = true) {
    const n2 = t22;
    return e22 = n2 ? await this.setupLocalRequest(e22) : this.setupRequest(e22), Promise.resolve().then(() => n2 ? this.requestLocal(e22) : de.wrappedRequest(e22, this.adapter.request));
  }
  requestLocal(e22) {
    return new Promise((t22, n2) => {
      this.adapter.request(Object.assign(e22, { complete(e3) {
        if (e3 || (e3 = {}), !e3.statusCode || e3.statusCode >= 400) {
          const t3 = e3.data && e3.data.code || "SYS_ERR", s22 = e3.data && e3.data.message || "request:fail";
          return n2(new te({ code: t3, message: s22 }));
        }
        t22({ success: true, result: e3.data });
      } }));
    });
  }
  setupRequest(e22) {
    const t22 = Object.assign({}, e22, { spaceId: this.config.spaceId, timestamp: Date.now() }), n2 = { "Content-Type": "application/json" };
    n2["x-serverless-sign"] = de.sign(t22, this.config.clientSecret);
    const s22 = le();
    n2["x-client-info"] = encodeURIComponent(JSON.stringify(s22));
    const { token: r2 } = re();
    return n2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: t22, dataType: "json", header: JSON.parse(JSON.stringify(n2)) };
  }
  async setupLocalRequest(e22) {
    const t22 = le(), { token: n2 } = re(), s22 = Object.assign({}, e22, { spaceId: this.config.spaceId, timestamp: Date.now(), clientInfo: t22, token: n2 }), { address: r2, servePort: i22 } = this.__dev__ && this.__dev__.debugInfo || {}, { address: o2 } = await Ot(r2, i22);
    return { url: `http://${o2}:${i22}/${xt[e22.method]}`, method: "POST", data: s22, dataType: "json", header: JSON.parse(JSON.stringify({ "Content-Type": "application/json" })) };
  }
  callFunction(e22) {
    const t22 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e22.name, functionArgs: e22.data || {} }) };
    return this.request(t22, false);
  }
  getUploadFileOptions(e22) {
    const t22 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e22) };
    return this.request(t22);
  }
  reportUploadFile(e22) {
    const t22 = { method: "serverless.file.resource.report", params: JSON.stringify(e22) };
    return this.request(t22);
  }
  uploadFile({ filePath: e22, cloudPath: t22, fileType: n2 = "image", onUploadProgress: s22 }) {
    if (!t22)
      throw new te({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
    let r2;
    return this.getUploadFileOptions({ cloudPath: t22 }).then((t3) => {
      const { url: i22, formData: o2, name: a22 } = t3.result;
      return r2 = t3.result.fileUrl, new Promise((t4, r3) => {
        const c22 = this.adapter.uploadFile({ url: i22, formData: o2, name: a22, filePath: e22, fileType: n2, success(e3) {
          e3 && e3.statusCode < 400 ? t4(e3) : r3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          r3(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof s22 && c22 && "function" == typeof c22.onProgressUpdate && c22.onProgressUpdate((e3) => {
          s22({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }).then(() => this.reportUploadFile({ cloudPath: t22 })).then((t3) => new Promise((n3, s32) => {
      t3.success ? n3({ success: true, filePath: e22, fileID: r2 }) : s32(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
    }));
  }
  deleteFile({ fileList: e22 }) {
    const t22 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e22 }) };
    return this.request(t22).then((e3) => {
      if (e3.success)
        return e3.result;
      throw new te({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
    });
  }
  getTempFileURL({ fileList: e22, maxAge: t22 } = {}) {
    if (!Array.isArray(e22) || 0 === e22.length)
      throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e22, maxAge: t22 }) };
    return this.request(n2).then((e3) => {
      if (e3.success)
        return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
      throw new te({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
    });
  }
};
var Rt = { init(e22) {
  const t22 = new Nt(e22), n2 = { signInAnonymously: function() {
    return Promise.resolve();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t22.auth = function() {
    return n2;
  }, t22.customAuth = t22.auth, t22;
} }, Lt = n(function(e22, t22) {
  e22.exports = r.enc.Hex;
});
function Ut() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e22) {
    var t22 = 16 * Math.random() | 0;
    return ("x" === e22 ? t22 : 3 & t22 | 8).toString(16);
  });
}
function Dt(e22 = "", t22 = {}) {
  const { data: n2, functionName: s22, method: r2, headers: i22, signHeaderKeys: o2 = [], config: a22 } = t22, c22 = String(Date.now()), u22 = Ut(), h22 = Object.assign({}, i22, { "x-from-app-id": a22.spaceAppId, "x-from-env-id": a22.spaceId, "x-to-env-id": a22.spaceId, "x-from-instance-id": c22, "x-from-function-name": s22, "x-client-timestamp": c22, "x-alipay-source": "client", "x-request-id": u22, "x-alipay-callid": u22, "x-trace-id": u22 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d22 = "", p2 = ""] = e22.split("?") || [], f2 = function(e3) {
    const t3 = "HMAC-SHA256", n3 = e3.signedHeaders.join(";"), s32 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), r3 = we(e3.body).toString(Lt), i3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${s32}
${n3}
${r3}
`, o3 = we(i3).toString(Lt), a32 = `${t3}
${e3.timestamp}
${o3}
`, c3 = ve(a32, e3.secretKey).toString(Lt);
    return `${t3} Credential=${e3.secretId}, SignedHeaders=${n3}, Signature=${c3}`;
  }({ path: d22, query: p2, method: r2, headers: h22, timestamp: c22, body: JSON.stringify(n2), secretId: a22.accessKey, secretKey: a22.secretKey, signedHeaders: l2.sort() });
  return { url: `${a22.endpoint}${e22}`, headers: Object.assign({}, h22, { Authorization: f2 }) };
}
function Mt({ url: e22, data: t22, method: n2 = "POST", headers: s22 = {}, timeout: r2 }) {
  return new Promise((i22, o2) => {
    ne.request({ url: e22, method: n2, data: "object" == typeof t22 ? JSON.stringify(t22) : t22, header: s22, dataType: "json", timeout: r2, complete: (e3 = {}) => {
      const t3 = s22["x-trace-id"] || "";
      if (!e3.statusCode || e3.statusCode >= 400) {
        const { message: n3, errMsg: s32, trace_id: r3 } = e3.data || {};
        return o2(new te({ code: "SYS_ERR", message: n3 || s32 || "request:fail", requestId: r3 || t3 }));
      }
      i22({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
    } });
  });
}
function qt(e22, t22) {
  const { path: n2, data: s22, method: r2 = "GET" } = e22, { url: i22, headers: o2 } = Dt(n2, { functionName: "", data: s22, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t22 });
  return Mt({ url: i22, data: s22, method: r2, headers: o2 }).then((e3) => {
    const t3 = e3.data || {};
    if (!t3.success)
      throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    return t3.data || {};
  }).catch((e3) => {
    throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
  });
}
function Ft(e22 = "") {
  const t22 = e22.trim().replace(/^cloud:\/\//, ""), n2 = t22.indexOf("/");
  if (n2 <= 0)
    throw new te({ code: "INVALID_PARAM", message: "fileID不合法" });
  const s22 = t22.substring(0, n2), r2 = t22.substring(n2 + 1);
  return s22 !== this.config.spaceId && console.warn("file ".concat(e22, " does not belong to env ").concat(this.config.spaceId)), r2;
}
function Kt(e22 = "") {
  return "cloud://".concat(this.config.spaceId, "/").concat(e22.replace(/^\/+/, ""));
}
class jt {
  constructor(e22) {
    this.config = e22;
  }
  signedURL(e22, t22 = {}) {
    const n2 = `/ws/function/${e22}`, s22 = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""), r2 = Object.assign({}, t22, { accessKeyId: this.config.accessKey, signatureNonce: Ut(), timestamp: "" + Date.now() }), i22 = [n2, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function(e3) {
      return r2[e3] ? "".concat(e3, "=").concat(r2[e3]) : null;
    }).filter(Boolean).join("&"), `host:${s22}`].join("\n"), o2 = ["HMAC-SHA256", we(i22).toString(Lt)].join("\n"), a22 = ve(o2, this.config.secretKey).toString(Lt), c22 = Object.keys(r2).map((e3) => `${e3}=${encodeURIComponent(r2[e3])}`).join("&");
    return `${this.config.wsEndpoint}${n2}?${c22}&signature=${a22}`;
  }
}
var $t = class {
  constructor(e22) {
    if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t22) => {
      if (!Object.prototype.hasOwnProperty.call(e22, t22))
        throw new Error(`${t22} required`);
    }), e22.endpoint) {
      if ("string" != typeof e22.endpoint)
        throw new Error("endpoint must be string");
      if (!/^https:\/\//.test(e22.endpoint))
        throw new Error("endpoint must start with https://");
      e22.endpoint = e22.endpoint.replace(/\/$/, "");
    }
    this.config = Object.assign({}, e22, { endpoint: e22.endpoint || `https://${e22.spaceId}.api-hz.cloudbasefunction.cn`, wsEndpoint: e22.wsEndpoint || `wss://${e22.spaceId}.api-hz.cloudbasefunction.cn` }), this._websocket = new jt(this.config);
  }
  callFunction(e22) {
    return function(e3, t22) {
      const { name: n2, data: s22, async: r2 = false, timeout: i22 } = e3, o2 = "POST", a22 = { "x-to-function-name": n2 };
      r2 && (a22["x-function-invoke-type"] = "async");
      const { url: c22, headers: u22 } = Dt("/functions/invokeFunction", { functionName: n2, data: s22, method: o2, headers: a22, signHeaderKeys: ["x-to-function-name"], config: t22 });
      return Mt({ url: c22, data: s22, method: o2, headers: u22, timeout: i22 }).then((e4) => {
        let t3 = 0;
        if (r2) {
          const n3 = e4.data || {};
          t3 = "200" === n3.errCode ? 0 : n3.errCode, e4.data = n3.data || {}, e4.errMsg = n3.errMsg;
        }
        if (0 !== t3)
          throw new te({ code: t3, message: e4.errMsg, requestId: e4.requestId });
        return { errCode: t3, success: 0 === t3, requestId: e4.requestId, result: e4.data };
      }).catch((e4) => {
        throw new te({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
      });
    }(e22, this.config);
  }
  uploadFileToOSS({ url: e22, filePath: t22, fileType: n2, formData: s22, onUploadProgress: r2 }) {
    return new Promise((i22, o2) => {
      const a22 = ne.uploadFile({ url: e22, filePath: t22, fileType: n2, formData: s22, name: "file", success(e3) {
        e3 && e3.statusCode < 400 ? i22(e3) : o2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        o2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof r2 && a22 && "function" == typeof a22.onProgressUpdate && a22.onProgressUpdate((e3) => {
        r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  async uploadFile({ filePath: e22, cloudPath: t22 = "", fileType: n2 = "image", onUploadProgress: s22 }) {
    if ("string" !== g(t22))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t22 = t22.trim()))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t22))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const r2 = await qt({ path: "/".concat(t22.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i22, upload_url: o2, form_data: a22 } = r2, c22 = a22 && a22.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
    return this.uploadFileToOSS({ url: o2, filePath: e22, fileType: n2, formData: c22, onUploadProgress: s22 }).then(() => ({ fileID: i22 }));
  }
  async getTempFileURL({ fileList: e22 }) {
    return new Promise((t22, n2) => {
      (!e22 || e22.length < 0) && t22({ code: "INVALID_PARAM", message: "fileList不能为空数组" }), e22.length > 50 && t22({ code: "INVALID_PARAM", message: "fileList数组长度不能超过50" });
      const s22 = [];
      for (const n3 of e22) {
        let e3;
        "string" !== g(n3) && t22({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
        try {
          e3 = Ft.call(this, n3);
        } catch (t3) {
          console.warn(t3.errCode, t3.errMsg), e3 = n3;
        }
        s22.push({ file_id: e3, expire: 600 });
      }
      qt({ path: "/?download_url", data: { file_list: s22 }, method: "POST" }, this.config).then((e3) => {
        const { file_list: n3 = [] } = e3;
        t22({ fileList: n3.map((e4) => ({ fileID: Kt.call(this, e4.file_id), tempFileURL: e4.download_url })) });
      }).catch((e3) => n2(e3));
    });
  }
  async connectWebSocket(e22) {
    const { name: t22, query: n2 } = e22;
    return ne.connectSocket({ url: this._websocket.signedURL(t22, n2), complete: () => {
    } });
  }
};
var Bt = { init: (e22) => {
  e22.provider = "alipay";
  const t22 = new $t(e22);
  return t22.auth = function() {
    return { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(true);
    } };
  }, t22;
} };
function Wt({ data: e22 }) {
  let t22;
  t22 = le();
  const n2 = JSON.parse(JSON.stringify(e22 || {}));
  if (Object.assign(n2, { clientInfo: t22 }), !n2.uniIdToken) {
    const { token: e3 } = re();
    e3 && (n2.uniIdToken = e3);
  }
  return n2;
}
async function Ht(e22 = {}) {
  await this.__dev__.initLocalNetwork();
  const { localAddress: t22, localPort: n2 } = this.__dev__, s22 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], r2 = this.config.spaceId, i22 = `http://${t22}:${n2}/system/check-function`, o2 = `http://${t22}:${n2}/cloudfunctions/${e22.name}`;
  return new Promise((t3, n3) => {
    ne.request({ method: "POST", url: i22, data: { name: e22.name, platform: C, provider: s22, spaceId: r2 }, timeout: 3e3, success(e3) {
      t3(e3);
    }, fail() {
      t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
    } });
  }).then(({ data: e3 } = {}) => {
    const { code: t3, message: n3 } = e3 || {};
    return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
  }).then(({ code: t3, message: n3 }) => {
    if (0 !== t3) {
      switch (t3) {
        case "MODULE_ENCRYPTED":
          console.error(`此云函数（${e22.name}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
          break;
        case "FUNCTION_ENCRYPTED":
          console.error(`此云函数（${e22.name}）已加密不可本地调试，自动切换为云端已部署的云函数`);
          break;
        case "ACTION_ENCRYPTED":
          console.error(n3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
          break;
        case "NETWORK_ERROR":
          console.error(n3 || "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下");
          break;
        case "SWITCH_TO_CLOUD":
          break;
        default: {
          const e3 = `检测本地调试服务出现错误：${n3}，请检查网络环境或重启客户端再试`;
          throw console.error(e3), new Error(e3);
        }
      }
      return this._callCloudFunction(e22);
    }
    return new Promise((t4, n4) => {
      const r3 = Wt.call(this, { data: e22.data });
      ne.request({ method: "POST", url: o2, data: { provider: s22, platform: C, param: r3 }, timeout: e22.timeout, success: ({ statusCode: e3, data: s32 } = {}) => !e3 || e3 >= 400 ? n4(new te({ code: s32.code || "SYS_ERR", message: s32.message || "request:fail" })) : t4({ result: s32 }), fail(e3) {
        n4(new te({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
      } });
    });
  });
}
const Jt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
var zt = /[\\^$.*+?()[\]{}|]/g, Vt = RegExp(zt.source);
function Gt(e22, t22, n2) {
  return e22.replace(new RegExp((s22 = t22) && Vt.test(s22) ? s22.replace(zt, "\\$&") : s22, "g"), n2);
  var s22;
}
const Yt = { NONE: "none", REQUEST: "request", RESPONSE: "response", BOTH: "both" }, Qt = "_globalUniCloudStatus", Xt = "_globalUniCloudSecureNetworkCache__{spaceId}";
const Un = "uni-secure-network", Dn = { SYSTEM_ERROR: { code: 2e4, message: "System error" }, APP_INFO_INVALID: { code: 20101, message: "Invalid client" }, GET_ENCRYPT_KEY_FAILED: { code: 20102, message: "Get encrypt key failed" } };
function qn(e22) {
  const { errSubject: t22, subject: n2, errCode: s22, errMsg: r2, code: i22, message: o2, cause: a22 } = e22 || {};
  return new te({ subject: t22 || n2 || Un, code: s22 || i22 || Dn.SYSTEM_ERROR.code, message: r2 || o2, cause: a22 });
}
let Kn;
function Hn({ secretType: e22 } = {}) {
  return e22 === Yt.REQUEST || e22 === Yt.RESPONSE || e22 === Yt.BOTH;
}
function Jn({ name: e22, data: t22 = {} } = {}) {
  return "app" === C;
}
function zn({ provider: e22, spaceId: t22, functionName: n2 } = {}) {
  const { appId: s22, uniPlatform: r2, osName: i22 } = ce();
  let o2 = r2;
  "app" === r2 && (o2 = i22);
  const a22 = function({ provider: e3, spaceId: t3 } = {}) {
    const n3 = P;
    if (!n3)
      return {};
    e3 = /* @__PURE__ */ function(e4) {
      return "tencent" === e4 ? "tcb" : e4;
    }(e3);
    const s32 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
    return s32 && s32.config;
  }({ provider: e22, spaceId: t22 });
  if (!a22 || !a22.accessControl || !a22.accessControl.enable)
    return false;
  const c22 = a22.accessControl.function || {}, u22 = Object.keys(c22);
  if (0 === u22.length)
    return true;
  const h22 = function(e3, t3) {
    let n3, s32, r3;
    for (let i3 = 0; i3 < e3.length; i3++) {
      const o3 = e3[i3];
      o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s32 = o3) : r3 = o3 : n3 = o3;
    }
    return n3 || s32 || r3;
  }(u22, n2);
  if (!h22)
    return false;
  if ((c22[h22] || []).find((e3 = {}) => e3.appId === s22 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
    return true;
  throw console.error(`此应用[appId: ${s22}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), qn(Dn.APP_INFO_INVALID);
}
function Vn({ functionName: e22, result: t22, logPvd: n2 }) {
  if (this.__dev__.debugLog && t22 && t22.requestId) {
    const s22 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e22, requestId: t22.requestId });
    console.log(`[${n2}-request]${s22}[/${n2}-request]`);
  }
}
function Gn(e22) {
  const t22 = e22.callFunction, n2 = function(n3) {
    const s22 = n3.name;
    n3.data = Wt.call(e22, { data: n3.data });
    const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], i22 = Hn(n3), o2 = Jn(n3), a22 = i22 || o2;
    return t22.call(this, n3).then((e3) => (e3.errCode = 0, !a22 && Vn.call(this, { functionName: s22, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a22 && Vn.call(this, { functionName: s22, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
      for (let s32 = 0; s32 < n4.length; s32++) {
        const { rule: r3, content: i3, mode: o3 } = n4[s32], a32 = e4.match(r3);
        if (!a32)
          continue;
        let c22 = i3;
        for (let e5 = 1; e5 < a32.length; e5++)
          c22 = Gt(c22, `{$${e5}}`, a32[e5]);
        for (const e5 in t3)
          c22 = Gt(c22, `{${e5}}`, t3[e5]);
        return "replace" === o3 ? c22 : e4 + c22;
      }
      return e4;
    }({ message: `[${n3.name}]: ${e3.message}`, formatter: Jt, extraInfo: { functionName: s22 } })), Promise.reject(e3)));
  };
  e22.callFunction = function(t3) {
    const { provider: s22, spaceId: r2 } = e22.config, i22 = t3.name;
    let o2, a22;
    if (t3.data = t3.data || {}, e22.__dev__.debugInfo && !e22.__dev__.debugInfo.forceRemote && O2 ? (e22._callCloudFunction || (e22._callCloudFunction = n2, e22._callLocalFunction = Ht), o2 = Ht) : o2 = n2, o2 = o2.bind(e22), Jn(t3))
      ;
    else if (function({ name: e3, data: t4 = {} }) {
      return "uni-id-co" === e3 && "secureNetworkHandshakeByWeixin" === t4.method;
    }(t3))
      a22 = o2.call(e22, t3);
    else if (Hn(t3)) {
      a22 = new Kn({ secretType: t3.secretType, uniCloudIns: e22 }).wrapEncryptDataCallFunction(n2.bind(e22))(t3);
    } else if (zn({ provider: s22, spaceId: r2, functionName: i22 })) {
      a22 = new Kn({ secretType: t3.secretType, uniCloudIns: e22 }).wrapVerifyClientCallFunction(n2.bind(e22))(t3);
    } else
      a22 = o2(t3);
    return Object.defineProperty(a22, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a22.then((e3) => ("undefined" != typeof UTSJSONObject && (e3.result = new UTSJSONObject(e3.result)), e3));
  };
}
Kn = class {
  constructor() {
    throw qn({ message: `Platform ${C} is not enabled, please check whether secure network module is enabled in your manifest.json` });
  }
};
const Yn = Symbol("CLIENT_DB_INTERNAL");
function Qn(e22, t22) {
  return e22.then = "DoNotReturnProxyWithAFunctionNamedThen", e22._internalType = Yn, e22.inspect = null, e22.__v_raw = void 0, new Proxy(e22, { get(e3, n2, s22) {
    if ("_uniClient" === n2)
      return null;
    if ("symbol" == typeof n2)
      return e3[n2];
    if (n2 in e3 || "string" != typeof n2) {
      const t3 = e3[n2];
      return "function" == typeof t3 ? t3.bind(e3) : t3;
    }
    return t22.get(e3, n2, s22);
  } });
}
function Xn(e22) {
  return { on: (t22, n2) => {
    e22[t22] = e22[t22] || [], e22[t22].indexOf(n2) > -1 || e22[t22].push(n2);
  }, off: (t22, n2) => {
    e22[t22] = e22[t22] || [];
    const s22 = e22[t22].indexOf(n2);
    -1 !== s22 && e22[t22].splice(s22, 1);
  } };
}
const Zn = ["db.Geo", "db.command", "command.aggregate"];
function es(e22, t22) {
  return Zn.indexOf(`${e22}.${t22}`) > -1;
}
function ts(e22) {
  switch (g(e22 = se(e22))) {
    case "array":
      return e22.map((e3) => ts(e3));
    case "object":
      return e22._internalType === Yn || Object.keys(e22).forEach((t22) => {
        e22[t22] = ts(e22[t22]);
      }), e22;
    case "regexp":
      return { $regexp: { source: e22.source, flags: e22.flags } };
    case "date":
      return { $date: e22.toISOString() };
    default:
      return e22;
  }
}
function ns(e22) {
  return e22 && e22.content && e22.content.$method;
}
class ss {
  constructor(e22, t22, n2) {
    this.content = e22, this.prevStage = t22 || null, this.udb = null, this._database = n2;
  }
  toJSON() {
    let e22 = this;
    const t22 = [e22.content];
    for (; e22.prevStage; )
      e22 = e22.prevStage, t22.push(e22.content);
    return { $db: t22.reverse().map((e3) => ({ $method: e3.$method, $param: ts(e3.$param) })) };
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
  getAction() {
    const e22 = this.toJSON().$db.find((e3) => "action" === e3.$method);
    return e22 && e22.$param && e22.$param[0];
  }
  getCommand() {
    return { $db: this.toJSON().$db.filter((e22) => "action" !== e22.$method) };
  }
  get isAggregate() {
    let e22 = this;
    for (; e22; ) {
      const t22 = ns(e22), n2 = ns(e22.prevStage);
      if ("aggregate" === t22 && "collection" === n2 || "pipeline" === t22)
        return true;
      e22 = e22.prevStage;
    }
    return false;
  }
  get isCommand() {
    let e22 = this;
    for (; e22; ) {
      if ("command" === ns(e22))
        return true;
      e22 = e22.prevStage;
    }
    return false;
  }
  get isAggregateCommand() {
    let e22 = this;
    for (; e22; ) {
      const t22 = ns(e22), n2 = ns(e22.prevStage);
      if ("aggregate" === t22 && "command" === n2)
        return true;
      e22 = e22.prevStage;
    }
    return false;
  }
  getNextStageFn(e22) {
    const t22 = this;
    return function() {
      return rs({ $method: e22, $param: ts(Array.from(arguments)) }, t22, t22._database);
    };
  }
  get count() {
    return this.isAggregate ? this.getNextStageFn("count") : function() {
      return this._send("count", Array.from(arguments));
    };
  }
  get remove() {
    return this.isCommand ? this.getNextStageFn("remove") : function() {
      return this._send("remove", Array.from(arguments));
    };
  }
  get() {
    return this._send("get", Array.from(arguments));
  }
  get add() {
    return this.isCommand ? this.getNextStageFn("add") : function() {
      return this._send("add", Array.from(arguments));
    };
  }
  update() {
    return this._send("update", Array.from(arguments));
  }
  end() {
    return this._send("end", Array.from(arguments));
  }
  get set() {
    return this.isCommand ? this.getNextStageFn("set") : function() {
      throw new Error("JQL禁止使用set方法");
    };
  }
  _send(e22, t22) {
    const n2 = this.getAction(), s22 = this.getCommand();
    if (s22.$db.push({ $method: e22, $param: ts(t22) }), b2) {
      const e3 = s22.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
      t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
    }
    return this._database._callCloudFunction({ action: n2, command: s22 });
  }
}
function rs(e22, t22, n2) {
  return Qn(new ss(e22, t22, n2), { get(e3, t3) {
    let s22 = "db";
    return e3 && e3.content && (s22 = e3.content.$method), es(s22, t3) ? rs({ $method: t3 }, e3, n2) : function() {
      return rs({ $method: t3, $param: ts(Array.from(arguments)) }, e3, n2);
    };
  } });
}
function is({ path: e22, method: t22 }) {
  return class {
    constructor() {
      this.param = Array.from(arguments);
    }
    toJSON() {
      return { $newDb: [...e22.map((e3) => ({ $method: e3 })), { $method: t22, $param: this.param }] };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
  };
}
class os {
  constructor({ uniClient: e22 = {}, isJQL: t22 = false } = {}) {
    this._uniClient = e22, this._authCallBacks = {}, this._dbCallBacks = {}, e22._isDefault && (this._dbCallBacks = U("_globalUniCloudDatabaseCallback")), t22 || (this.auth = Xn(this._authCallBacks)), this._isJQL = t22, Object.assign(this, Xn(this._dbCallBacks)), this.env = Qn({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = Qn({}, { get: (e3, t3) => is({ path: ["Geo"], method: t3 }) }), this.serverDate = is({ path: [], method: "serverDate" }), this.RegExp = is({ path: [], method: "RegExp" });
  }
  getCloudEnv(e22) {
    if ("string" != typeof e22 || !e22.trim())
      throw new Error("getCloudEnv参数错误");
    return { $env: e22.replace("$cloudEnv_", "") };
  }
  _callback(e22, t22) {
    const n2 = this._dbCallBacks;
    n2[e22] && n2[e22].forEach((e3) => {
      e3(...t22);
    });
  }
  _callbackAuth(e22, t22) {
    const n2 = this._authCallBacks;
    n2[e22] && n2[e22].forEach((e3) => {
      e3(...t22);
    });
  }
  multiSend() {
    const e22 = Array.from(arguments), t22 = e22.map((e3) => {
      const t3 = e3.getAction(), n2 = e3.getCommand();
      if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
        throw new Error("multiSend只支持子命令内使用getTemp");
      return { action: t3, command: n2 };
    });
    return this._callCloudFunction({ multiCommand: t22, queryList: e22 });
  }
}
function as(e22, t22 = {}) {
  return Qn(new e22(t22), { get: (e3, t3) => es("db", t3) ? rs({ $method: t3 }, null, e3) : function() {
    return rs({ $method: t3, $param: ts(Array.from(arguments)) }, null, e3);
  } });
}
class cs extends os {
  _parseResult(e22) {
    return this._isJQL ? e22.result : e22;
  }
  _callCloudFunction({ action: e22, command: t22, multiCommand: n2, queryList: s22 }) {
    function r2(e3, t3) {
      if (n2 && s22)
        for (let n3 = 0; n3 < s22.length; n3++) {
          const r3 = s22[n3];
          r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
        }
    }
    const i22 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
    function a22(e3) {
      return i22._callback("error", [e3]), j($(o2, "fail"), e3).then(() => j($(o2, "complete"), e3)).then(() => (r2(null, e3), Y2(H3.RESPONSE, { type: J.CLIENT_DB, content: e3 }), Promise.reject(e3)));
    }
    const c22 = j($(o2, "invoke")), u22 = this._uniClient;
    return c22.then(() => u22.callFunction({ name: "DCloud-clientDB", type: l.CLIENT_DB, data: { action: e22, command: t22, multiCommand: n2 } })).then((e3) => {
      const { code: t3, message: n3, token: s32, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
      if (u3)
        for (let e4 = 0; e4 < u3.length; e4++) {
          const { level: t4, message: n4, detail: s4 } = u3[e4];
          let r3 = "[System Info]" + n4;
          s4 && (r3 = `${r3}
详细信息：${s4}`), (console[t4] || console.log)(r3);
        }
      if (t3) {
        return a22(new te({ code: t3, message: n3, requestId: e3.requestId }));
      }
      e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s32 && c3 && (ie({ token: s32, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s32, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s32, tokenExpired: c3 }]), Y2(H3.REFRESH_TOKEN, { token: s32, tokenExpired: c3 }));
      const h22 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
      for (let t4 = 0; t4 < h22.length; t4++) {
        const { prop: n4, tips: s4 } = h22[t4];
        if (n4 in e3.result) {
          const t5 = e3.result[n4];
          Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
        }
      }
      return function(e4) {
        return j($(o2, "success"), e4).then(() => j($(o2, "complete"), e4)).then(() => {
          r2(e4, null);
          const t4 = i22._parseResult(e4);
          return Y2(H3.RESPONSE, { type: J.CLIENT_DB, content: t4 }), Promise.resolve(t4);
        });
      }(e3);
    }, (e3) => {
      /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
      return a22(new te({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
    });
  }
}
const us = "token无效，跳转登录页面", hs = "token过期，跳转登录页面", ls = { TOKEN_INVALID_TOKEN_EXPIRED: hs, TOKEN_INVALID_INVALID_CLIENTID: us, TOKEN_INVALID: us, TOKEN_INVALID_WRONG_TOKEN: us, TOKEN_INVALID_ANONYMOUS_USER: us }, ds = { "uni-id-token-expired": hs, "uni-id-check-token-failed": us, "uni-id-token-not-exist": us, "uni-id-check-device-feature-failed": us };
function ps(e22, t22) {
  let n2 = "";
  return n2 = e22 ? `${e22}/${t22}` : t22, n2.replace(/^\//, "");
}
function fs(e22 = [], t22 = "") {
  const n2 = [], s22 = [];
  return e22.forEach((e3) => {
    true === e3.needLogin ? n2.push(ps(t22, e3.path)) : false === e3.needLogin && s22.push(ps(t22, e3.path));
  }), { needLoginPage: n2, notNeedLoginPage: s22 };
}
function gs(e22) {
  return e22.split("?")[0].replace(/^\//, "");
}
function ms() {
  return function(e22) {
    let t22 = e22 && e22.$page && e22.$page.fullPath || "";
    return t22 ? ("/" !== t22.charAt(0) && (t22 = "/" + t22), t22) : t22;
  }(function() {
    const e22 = getCurrentPages();
    return e22[e22.length - 1];
  }());
}
function ys() {
  return gs(ms());
}
function _s(e22 = "", t22 = {}) {
  if (!e22)
    return false;
  if (!(t22 && t22.list && t22.list.length))
    return false;
  const n2 = t22.list, s22 = gs(e22);
  return n2.some((e3) => e3.pagePath === s22);
}
const ws = !!e2.uniIdRouter;
const { loginPage: vs, routerNeedLogin: Is, resToLogin: Ss, needLoginPage: Ts, notNeedLoginPage: bs, loginPageInTabBar: Es } = function({ pages: t22 = [], subPackages: n2 = [], uniIdRouter: s22 = {}, tabBar: r2 = {} } = e2) {
  const { loginPage: i22, needLogin: o2 = [], resToLogin: a22 = true } = s22, { needLoginPage: c22, notNeedLoginPage: u22 } = fs(t22), { needLoginPage: h22, notNeedLoginPage: l2 } = function(e22 = []) {
    const t3 = [], n3 = [];
    return e22.forEach((e3) => {
      const { root: s32, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = fs(r3, s32);
      t3.push(...i3), n3.push(...o3);
    }), { needLoginPage: t3, notNeedLoginPage: n3 };
  }(n2);
  return { loginPage: i22, routerNeedLogin: o2, resToLogin: a22, needLoginPage: [...c22, ...h22], notNeedLoginPage: [...u22, ...l2], loginPageInTabBar: _s(i22, r2) };
}();
if (Ts.indexOf(vs) > -1)
  throw new Error(`Login page [${vs}] should not be "needLogin", please check your pages.json`);
function ks$1(e22) {
  const t22 = ys();
  if ("/" === e22.charAt(0))
    return e22;
  const [n2, s22] = e22.split("?"), r2 = n2.replace(/^\//, "").split("/"), i22 = t22.split("/");
  i22.pop();
  for (let e3 = 0; e3 < r2.length; e3++) {
    const t3 = r2[e3];
    ".." === t3 ? i22.pop() : "." !== t3 && i22.push(t3);
  }
  return "" === i22[0] && i22.shift(), "/" + i22.join("/") + (s22 ? "?" + s22 : "");
}
function Ps(e22) {
  const t22 = gs(ks$1(e22));
  return !(bs.indexOf(t22) > -1) && (Ts.indexOf(t22) > -1 || Is.some((t3) => function(e3, t4) {
    return new RegExp(t4).test(e3);
  }(e22, t3)));
}
function Cs({ redirect: e22 }) {
  const t22 = gs(e22), n2 = gs(vs);
  return ys() !== n2 && t22 !== n2;
}
function As({ api: e22, redirect: t22 } = {}) {
  if (!t22 || !Cs({ redirect: t22 }))
    return;
  const n2 = function(e3, t3) {
    return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
  }(vs, t22);
  Es ? "navigateTo" !== e22 && "redirectTo" !== e22 || (e22 = "switchTab") : "switchTab" === e22 && (e22 = "navigateTo");
  const s22 = { navigateTo: index.navigateTo, redirectTo: index.redirectTo, switchTab: index.switchTab, reLaunch: index.reLaunch };
  setTimeout(() => {
    s22[e22]({ url: n2 });
  }, 0);
}
function Os({ url: e22 } = {}) {
  const t22 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
    const { token: e3, tokenExpired: t3 } = re();
    let n3;
    if (e3) {
      if (t3 < Date.now()) {
        const e4 = "uni-id-token-expired";
        n3 = { errCode: e4, errMsg: ds[e4] };
      }
    } else {
      const e4 = "uni-id-check-token-failed";
      n3 = { errCode: e4, errMsg: ds[e4] };
    }
    return n3;
  }();
  if (Ps(e22) && n2) {
    n2.uniIdRedirectUrl = e22;
    if (z2(H3.NEED_LOGIN).length > 0)
      return setTimeout(() => {
        Y2(H3.NEED_LOGIN, n2);
      }, 0), t22.abortLoginPageJump = true, t22;
    t22.autoToLoginPage = true;
  }
  return t22;
}
function xs() {
  !function() {
    const e3 = ms(), { abortLoginPageJump: t22, autoToLoginPage: n2 } = Os({ url: e3 });
    t22 || n2 && As({ api: "redirectTo", redirect: e3 });
  }();
  const e22 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  for (let t22 = 0; t22 < e22.length; t22++) {
    const n2 = e22[t22];
    index.addInterceptor(n2, { invoke(e3) {
      const { abortLoginPageJump: t3, autoToLoginPage: s22 } = Os({ url: e3.url });
      return t3 ? e3 : s22 ? (As({ api: n2, redirect: ks$1(e3.url) }), false) : e3;
    } });
  }
}
function Ns() {
  this.onResponse((e22) => {
    const { type: t22, content: n2 } = e22;
    let s22 = false;
    switch (t22) {
      case "cloudobject":
        s22 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in ds;
        }(n2);
        break;
      case "clientdb":
        s22 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in ls;
        }(n2);
    }
    s22 && function(e3 = {}) {
      const t3 = z2(H3.NEED_LOGIN);
      Z().then(() => {
        const n3 = ms();
        if (n3 && Cs({ redirect: n3 }))
          return t3.length > 0 ? Y2(H3.NEED_LOGIN, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (vs && As({ api: "navigateTo", redirect: n3 }));
      });
    }(n2);
  });
}
function Rs(e22) {
  !function(e3) {
    e3.onResponse = function(e4) {
      V(H3.RESPONSE, e4);
    }, e3.offResponse = function(e4) {
      G2(H3.RESPONSE, e4);
    };
  }(e22), function(e3) {
    e3.onNeedLogin = function(e4) {
      V(H3.NEED_LOGIN, e4);
    }, e3.offNeedLogin = function(e4) {
      G2(H3.NEED_LOGIN, e4);
    }, ws && (U(Qt).needLoginInit || (U(Qt).needLoginInit = true, Z().then(() => {
      xs.call(e3);
    }), Ss && Ns.call(e3)));
  }(e22), function(e3) {
    e3.onRefreshToken = function(e4) {
      V(H3.REFRESH_TOKEN, e4);
    }, e3.offRefreshToken = function(e4) {
      G2(H3.REFRESH_TOKEN, e4);
    };
  }(e22);
}
let Ls;
const Us = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Ds = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function Ms() {
  const e22 = re().token || "", t22 = e22.split(".");
  if (!e22 || 3 !== t22.length)
    return { uid: null, role: [], permission: [], tokenExpired: 0 };
  let n2;
  try {
    n2 = JSON.parse((s22 = t22[1], decodeURIComponent(Ls(s22).split("").map(function(e3) {
      return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
    }).join(""))));
  } catch (e3) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
  }
  var s22;
  return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
}
Ls = "function" != typeof atob ? function(e22) {
  if (e22 = String(e22).replace(/[\t\n\f\r ]+/g, ""), !Ds.test(e22))
    throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t22;
  e22 += "==".slice(2 - (3 & e22.length));
  for (var n2, s22, r2 = "", i22 = 0; i22 < e22.length; )
    t22 = Us.indexOf(e22.charAt(i22++)) << 18 | Us.indexOf(e22.charAt(i22++)) << 12 | (n2 = Us.indexOf(e22.charAt(i22++))) << 6 | (s22 = Us.indexOf(e22.charAt(i22++))), r2 += 64 === n2 ? String.fromCharCode(t22 >> 16 & 255) : 64 === s22 ? String.fromCharCode(t22 >> 16 & 255, t22 >> 8 & 255) : String.fromCharCode(t22 >> 16 & 255, t22 >> 8 & 255, 255 & t22);
  return r2;
} : atob;
var qs = n(function(e22, t22) {
  Object.defineProperty(t22, "__esModule", { value: true });
  const n2 = "chooseAndUploadFile:ok", s22 = "chooseAndUploadFile:fail";
  function r2(e3, t3) {
    return e3.tempFiles.forEach((e4, n3) => {
      e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
    }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
  }
  function i22(e3, t3, { onChooseFile: s32, onUploadProgress: r3 }) {
    return t3.then((e4) => {
      if (s32) {
        const t4 = s32(e4);
        if (void 0 !== t4)
          return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
      }
      return e4;
    }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
      (t5 = Object.assign({}, t5)).errMsg = n2;
      const i3 = t5.tempFiles, o2 = i3.length;
      let a22 = 0;
      return new Promise((n3) => {
        for (; a22 < s4; )
          c22();
        function c22() {
          const s5 = a22++;
          if (s5 >= o2)
            return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
          const u22 = i3[s5];
          e4.uploadFile({ provider: u22.provider, filePath: u22.path, cloudPath: u22.cloudPath, fileType: u22.fileType, cloudPathAsRealPath: u22.cloudPathAsRealPath, onUploadProgress(e5) {
            e5.index = s5, e5.tempFile = u22, e5.tempFilePath = u22.path, r4 && r4(e5);
          } }).then((e5) => {
            u22.url = e5.fileID, s5 < o2 && c22();
          }).catch((e5) => {
            u22.errMsg = e5.errMsg || e5.message, s5 < o2 && c22();
          });
        }
      });
    }(e3, t4, 5, r3));
  }
  t22.initChooseAndUploadFile = function(e3) {
    return function(t3 = { type: "all" }) {
      return "image" === t3.type ? i22(e3, function(e4) {
        const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
        return new Promise((e5, a22) => {
          index.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
            e5(r2(t5, "image"));
          }, fail(e6) {
            a22({ errMsg: e6.errMsg.replace("chooseImage:fail", s22) });
          } });
        });
      }(t3), t3) : "video" === t3.type ? i22(e3, function(e4) {
        const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a22 } = e4;
        return new Promise((e5, c22) => {
          index.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a22, success(t5) {
            const { tempFilePath: n4, duration: s32, size: i4, height: o3, width: a32 } = t5;
            e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a32, height: o3, duration: s32, fileType: "video", cloudPath: "" }] }, "video"));
          }, fail(e6) {
            c22({ errMsg: e6.errMsg.replace("chooseVideo:fail", s22) });
          } });
        });
      }(t3), t3) : i22(e3, function(e4) {
        const { count: t4, extension: n3 } = e4;
        return new Promise((e5, i3) => {
          let o2 = index.chooseFile;
          if ("undefined" != typeof wx$1 && "function" == typeof wx$1.chooseMessageFile && (o2 = wx$1.chooseMessageFile), "function" != typeof o2)
            return i3({ errMsg: s22 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
          o2({ type: "all", count: t4, extension: n3, success(t5) {
            e5(r2(t5));
          }, fail(e6) {
            i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s22) });
          } });
        });
      }(t3), t3);
    };
  };
}), Fs = t2(qs);
const Ks = { auto: "auto", onready: "onready", manual: "manual" };
function js(e22) {
  return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
    this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
      var e3 = [];
      return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t22) => {
        e3.push(this[t22]);
      }), e3;
    }, (e3, t22) => {
      if (this.loadtime === Ks.manual)
        return;
      let n2 = false;
      const s22 = [];
      for (let r2 = 2; r2 < e3.length; r2++)
        e3[r2] !== t22[r2] && (s22.push(e3[r2]), n2 = true);
      e3[0] !== t22[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s22);
    });
  }, methods: { onMixinDatacomPropsChange(e3, t22) {
  }, mixinDatacomEasyGet({ getone: e3 = false, success: t22, fail: n2 } = {}) {
    this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
      this.mixinDatacomLoading = false;
      const { data: s22, count: r2 } = n3.result;
      this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s22.length < this.pageSize;
      const i22 = e3 ? s22.length ? s22[0] : void 0 : s22;
      this.mixinDatacomResData = i22, t22 && t22(i22);
    }).catch((e4) => {
      this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
    }));
  }, mixinDatacomGet(t22 = {}) {
    let n2;
    t22 = t22 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e22.databaseForJQL(this.spaceInfo) : e22.database(this.spaceInfo);
    const s22 = t22.action || this.action;
    s22 && (n2 = n2.action(s22));
    const r2 = t22.collection || this.collection;
    n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
    const i22 = t22.where || this.where;
    i22 && Object.keys(i22).length && (n2 = n2.where(i22));
    const o2 = t22.field || this.field;
    o2 && (n2 = n2.field(o2));
    const a22 = t22.foreignKey || this.foreignKey;
    a22 && (n2 = n2.foreignKey(a22));
    const c22 = t22.groupby || this.groupby;
    c22 && (n2 = n2.groupBy(c22));
    const u22 = t22.groupField || this.groupField;
    u22 && (n2 = n2.groupField(u22));
    true === (void 0 !== t22.distinct ? t22.distinct : this.distinct) && (n2 = n2.distinct());
    const h22 = t22.orderby || this.orderby;
    h22 && (n2 = n2.orderBy(h22));
    const l2 = void 0 !== t22.pageCurrent ? t22.pageCurrent : this.mixinDatacomPage.current, d22 = void 0 !== t22.pageSize ? t22.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t22.getcount ? t22.getcount : this.getcount, f2 = void 0 !== t22.gettree ? t22.gettree : this.gettree, g2 = void 0 !== t22.gettreepath ? t22.gettreepath : this.gettreepath, m22 = { getCount: p2 }, y22 = { limitLevel: void 0 !== t22.limitlevel ? t22.limitlevel : this.limitlevel, startWith: void 0 !== t22.startwith ? t22.startwith : this.startwith };
    return f2 && (m22.getTree = y22), g2 && (m22.getTreePath = y22), n2 = n2.skip(d22 * (l2 - 1)).limit(d22).get(m22), n2;
  } } };
}
function $s(e22) {
  return function(t22, n2 = {}) {
    n2 = function(e3, t3 = {}) {
      return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
    }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
    const { customUI: s22, loadingOptions: r2, errorOptions: i22, parseSystemError: o2 } = n2, a22 = !s22;
    return new Proxy({}, { get(s32, c22) {
      switch (c22) {
        case "toString":
          return "[object UniCloudObject]";
        case "toJSON":
          return {};
      }
      return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
        return async function(...s4) {
          const r3 = n3 ? n3({ params: s4 }) : {};
          let i3, o3;
          try {
            return await j($(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await j($(t3, "success"), { ...r3, result: i3 }), i3;
          } catch (e4) {
            throw o3 = e4, await j($(t3, "fail"), { ...r3, error: o3 }), o3;
          } finally {
            await j($(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
          }
        };
      }({ fn: async function s4(...u22) {
        let h22;
        a22 && index.showLoading({ title: r2.title, mask: r2.mask });
        const d22 = { name: t22, type: l.OBJECT, data: { method: c22, params: u22 } };
        "object" == typeof n2.secretMethods && function(e3, t3) {
          const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
          r3 && (t3.secretType = r3);
        }(n2, d22);
        let p2 = false;
        try {
          h22 = await e22.callFunction(d22);
        } catch (e3) {
          p2 = true, h22 = { result: new te(e3) };
        }
        const { errSubject: f2, errCode: g2, errMsg: m22, newToken: y22 } = h22.result || {};
        if (a22 && index.hideLoading(), y22 && y22.token && y22.tokenExpired && (ie(y22), Y2(H3.REFRESH_TOKEN, { ...y22 })), g2) {
          let e3 = m22;
          if (p2 && o2) {
            e3 = (await o2({ objectName: t22, methodName: c22, params: u22, errSubject: f2, errCode: g2, errMsg: m22 })).errMsg || m22;
          }
          if (a22)
            if ("toast" === i22.type)
              index.showToast({ title: e3, icon: "none" });
            else {
              if ("modal" !== i22.type)
                throw new Error(`Invalid errorOptions.type: ${i22.type}`);
              {
                const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                  return new Promise((i3, o3) => {
                    index.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                      i3(e5);
                    }, fail() {
                      i3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "提示", content: e3, showCancel: i22.retry, cancelText: "取消", confirmText: i22.retry ? "重试" : "确定" });
                if (i22.retry && t3)
                  return s4(...u22);
              }
            }
          const n3 = new te({ subject: f2, code: g2, message: m22, requestId: h22.requestId });
          throw n3.detail = h22.result, Y2(H3.RESPONSE, { type: J.CLOUD_OBJECT, content: n3 }), n3;
        }
        return Y2(H3.RESPONSE, { type: J.CLOUD_OBJECT, content: h22.result }), h22.result;
      }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
        return { objectName: t22, methodName: c22, params: e3 };
      } });
    } });
  };
}
function Bs(e22) {
  return U(Xt.replace("{spaceId}", e22.config.spaceId));
}
async function Ws({ openid: e22, callLoginByWeixin: t22 = false } = {}) {
  const n2 = Bs(this);
  if (e22 && t22)
    throw new Error("[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time");
  if (e22)
    return n2.mpWeixinOpenid = e22, {};
  const s22 = await new Promise((e3, t3) => {
    index.login({ success(t4) {
      e3(t4.code);
    }, fail(e4) {
      t3(new Error(e4.errMsg));
    } });
  }), r2 = this.importObject("uni-id-co", { customUI: true });
  return await r2.secureNetworkHandshakeByWeixin({ code: s22, callLoginByWeixin: t22 }), n2.mpWeixinCode = s22, { code: s22 };
}
async function Hs(e22) {
  const t22 = Bs(this);
  return t22.initPromise || (t22.initPromise = Ws.call(this, e22).then((e3) => e3).catch((e3) => {
    throw delete t22.initPromise, e3;
  })), t22.initPromise;
}
function Js(e22) {
  return function({ openid: t22, callLoginByWeixin: n2 = false } = {}) {
    return Hs.call(e22, { openid: t22, callLoginByWeixin: n2 });
  };
}
function zs(e22) {
  !function(e3) {
    he = e3;
  }(e22);
}
function Vs(e22) {
  const t22 = { getSystemInfo: index.getSystemInfo, getPushClientId: index.getPushClientId };
  return function(n2) {
    return new Promise((s22, r2) => {
      t22[e22]({ ...n2, success(e3) {
        s22(e3);
      }, fail(e3) {
        r2(e3);
      } });
    });
  };
}
class Gs extends S3 {
  constructor() {
    super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
  }
  init() {
    return Promise.all([Vs("getSystemInfo")(), Vs("getPushClientId")()]).then(([{ appId: e22 } = {}, { cid: t22 } = {}] = []) => {
      if (!e22)
        throw new Error("Invalid appId, please check the manifest.json file");
      if (!t22)
        throw new Error("Invalid push client id");
      this._appId = e22, this._pushClientId = t22, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
    }, (e22) => {
      throw this.emit("error", e22), this.close(), e22;
    });
  }
  async open() {
    return this.init();
  }
  _isUniCloudSSE(e22) {
    if ("receive" !== e22.type)
      return false;
    const t22 = e22 && e22.data && e22.data.payload;
    return !(!t22 || "UNI_CLOUD_SSE" !== t22.channel || t22.seqId !== this._seqId);
  }
  _receivePushMessage(e22) {
    if (!this._isUniCloudSSE(e22))
      return;
    const t22 = e22 && e22.data && e22.data.payload, { action: n2, messageId: s22, message: r2 } = t22;
    this._payloadQueue.push({ action: n2, messageId: s22, message: r2 }), this._consumMessage();
  }
  _consumMessage() {
    for (; ; ) {
      const e22 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
      if (!e22)
        break;
      this._currentMessageId++, this._parseMessagePayload(e22);
    }
  }
  _parseMessagePayload(e22) {
    const { action: t22, messageId: n2, message: s22 } = e22;
    "end" === t22 ? this._end({ messageId: n2, message: s22 }) : "message" === t22 && this._appendMessage({ messageId: n2, message: s22 });
  }
  _appendMessage({ messageId: e22, message: t22 } = {}) {
    this.emit("message", t22);
  }
  _end({ messageId: e22, message: t22 } = {}) {
    this.emit("end", t22), this.close();
  }
  _initMessageListener() {
    index.onPushMessage(this._uniPushMessageCallback);
  }
  _destroy() {
    index.offPushMessage(this._uniPushMessageCallback);
  }
  toJSON() {
    return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
  }
  close() {
    this._destroy(), this.emit("close");
  }
}
async function Ys(e22) {
  const t22 = e22.__dev__;
  if (!t22.debugInfo)
    return;
  const { address: n2, servePort: s22 } = t22.debugInfo, { address: r2 } = await Ot(n2, s22);
  if (r2)
    return t22.localAddress = r2, void (t22.localPort = s22);
  const i22 = console["warn"];
  let o2 = "";
  if ("remote" === t22.debugInfo.initialLaunchType ? (t22.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === C.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t22.debugInfo.forceRemote)
    throw new Error(o2);
  i22(o2);
}
function Qs(e22) {
  e22._initPromiseHub || (e22._initPromiseHub = new I2({ createPromise: function() {
    let t22 = Promise.resolve();
    var n2;
    n2 = 1, t22 = new Promise((e3) => {
      setTimeout(() => {
        e3();
      }, n2);
    });
    const s22 = e22.auth();
    return t22.then(() => s22.getLoginState()).then((e3) => e3 ? Promise.resolve() : s22.signInAnonymously());
  } }));
}
const Xs = { tcb: Ct, tencent: Ct, aliyun: fe, private: Rt, dcloud: Rt, alipay: Bt };
let Zs = new class {
  init(e22) {
    let t22 = {};
    const n2 = Xs[e22.provider];
    if (!n2)
      throw new Error("未提供正确的provider参数");
    t22 = n2.init(e22), function(e3) {
      const t3 = {};
      e3.__dev__ = t3, t3.debugLog = "mp-harmony" === C;
      const n3 = A;
      n3 && !n3.code && (t3.debugInfo = n3);
      const s22 = new I2({ createPromise: function() {
        return Ys(e3);
      } });
      t3.initLocalNetwork = function() {
        return s22.exec();
      };
    }(t22), Qs(t22), Gn(t22), function(e3) {
      const t3 = e3.uploadFile;
      e3.uploadFile = function(e4) {
        return t3.call(this, e4);
      };
    }(t22), function(e3) {
      e3.database = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).database();
        if (this._database)
          return this._database;
        const n3 = as(cs, { uniClient: e3 });
        return this._database = n3, n3;
      }, e3.databaseForJQL = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).databaseForJQL();
        if (this._databaseForJQL)
          return this._databaseForJQL;
        const n3 = as(cs, { uniClient: e3, isJQL: true });
        return this._databaseForJQL = n3, n3;
      };
    }(t22), function(e3) {
      e3.getCurrentUserInfo = Ms, e3.chooseAndUploadFile = Fs.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
        return js(e3);
      } }), e3.SSEChannel = Gs, e3.initSecureNetworkByWeixin = Js(e3), e3.setCustomClientInfo = zs, e3.importObject = $s(e3);
    }(t22);
    return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
      if (!t22[e3])
        return;
      const n3 = t22[e3];
      t22[e3] = function() {
        return n3.apply(t22, Array.from(arguments));
      }, t22[e3] = (/* @__PURE__ */ function(e4, t3) {
        return function(n4) {
          let s22 = false;
          if ("callFunction" === t3) {
            const e5 = n4 && n4.type || l.DEFAULT;
            s22 = e5 !== l.DEFAULT;
          }
          const r2 = "callFunction" === t3 && !s22, i22 = this._initPromiseHub.exec();
          n4 = n4 || {};
          const { success: o2, fail: a22, complete: c22 } = ee(n4), u22 = i22.then(() => s22 ? Promise.resolve() : j($(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s22 ? Promise.resolve(e5) : j($(t3, "success"), e5).then(() => j($(t3, "complete"), e5)).then(() => (r2 && Y2(H3.RESPONSE, { type: J.CLOUD_FUNCTION, content: e5 }), Promise.resolve(e5))), (e5) => s22 ? Promise.reject(e5) : j($(t3, "fail"), e5).then(() => j($(t3, "complete"), e5)).then(() => (Y2(H3.RESPONSE, { type: J.CLOUD_FUNCTION, content: e5 }), Promise.reject(e5))));
          if (!(o2 || a22 || c22))
            return u22;
          u22.then((e5) => {
            o2 && o2(e5), c22 && c22(e5), r2 && Y2(H3.RESPONSE, { type: J.CLOUD_FUNCTION, content: e5 });
          }, (e5) => {
            a22 && a22(e5), c22 && c22(e5), r2 && Y2(H3.RESPONSE, { type: J.CLOUD_FUNCTION, content: e5 });
          });
        };
      }(t22[e3], e3)).bind(t22);
    }), t22.init = this.init, t22;
  }
}();
(() => {
  const e22 = O2;
  let t22 = {};
  if (e22 && 1 === e22.length)
    t22 = e22[0], Zs = Zs.init(t22), Zs._isDefault = true;
  else {
    const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
    let n2;
    n2 = e22 && e22.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
      Zs[e3] = function() {
        return console.error(n2), Promise.reject(new te({ code: "SYS_ERR", message: n2 }));
      };
    });
  }
  if (Object.assign(Zs, { get mixinDatacom() {
    return js(Zs);
  } }), Rs(Zs), Zs.addInterceptor = F, Zs.removeInterceptor = K2, Zs.interceptObject = B2, "web" === C)
    ;
})();
var er = Zs;
exports._export_sfc = _export_sfc;
exports.createApp = createApp$1;
exports.createStore = createStore;
exports.e = e$1;
exports.endOfDay = endOfDay;
exports.er = er;
exports.f = f$1;
exports.format = format;
exports.index = index;
exports.initVueI18n = initVueI18n;
exports.n = n$1;
exports.nextTick$1 = nextTick$1;
exports.o = o$1;
exports.onLoad = onLoad;
exports.onMounted = onMounted;
exports.onPullDownRefresh = onPullDownRefresh;
exports.onReachBottom = onReachBottom;
exports.onShow = onShow;
exports.onUnload = onUnload;
exports.p = p$1;
exports.reactive = reactive;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.s = s$1;
exports.sr = sr;
exports.startOfDay = startOfDay;
exports.t = t$1;
exports.unref = unref;
exports.useStore = useStore;
exports.watch = watch;
exports.wx$1 = wx$1;
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
