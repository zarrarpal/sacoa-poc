"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NFCContentType", {
  enumerable: true,
  get: function () {
    return _NFCTagType.NFCContentType;
  }
});
Object.defineProperty(exports, "NFCTagType4", {
  enumerable: true,
  get: function () {
    return _NFCTagType.default;
  }
});
exports.default = void 0;
var _reactNative = require("react-native");
var _NFCTagType = _interopRequireWildcard(require("./NFCTagType4"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  Hce
} = _reactNative.NativeModules;
class HCESession {
  /**
   * Initializes and controls the session of HCE session.
   * @param application HCE application to initialize.
   */
  constructor(application) {
    /**
     * Stops the HCE session.
     */
    _defineProperty(this, "terminate", async () => {
      await Hce.setEnabled(false);
      this.active = false;
    });
    /**
     * Starts the HCE session.
     */
    _defineProperty(this, "start", async () => {
      if (_reactNative.Platform.OS !== 'android') {
        throw new Error('react-native-hce does not support this platform');
      }
      if (this.application instanceof _NFCTagType.default) {
        await Hce.setContent(this.application.content.contentType, this.application.content.content);
        await Hce.setEnabled(true);
        this.active = true;
        return this;
      }
      throw new Error('Unrecognized app type.');
    });
    _defineProperty(this, "application", void 0);
    /**
     * Indication, if the session is still active.
     */
    _defineProperty(this, "active", void 0);
    this.application = application;
    this.active = false;
  }
}
var _default = exports.default = HCESession;
//# sourceMappingURL=index.js.map