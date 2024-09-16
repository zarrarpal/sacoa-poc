function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { NativeModules, Platform } from 'react-native';
import NFCTagType4, { NFCContentType } from './NFCTagType4';
const {
  Hce
} = NativeModules;
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
      if (Platform.OS !== 'android') {
        throw new Error('react-native-hce does not support this platform');
      }
      if (this.application instanceof NFCTagType4) {
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
export default HCESession;
export { NFCTagType4, NFCContentType };
//# sourceMappingURL=index.js.map