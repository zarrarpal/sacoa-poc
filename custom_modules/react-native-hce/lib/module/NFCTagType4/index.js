function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export let NFCContentType = /*#__PURE__*/function (NFCContentType) {
  NFCContentType["Text"] = "text";
  NFCContentType["URL"] = "url";
  return NFCContentType;
}({});
class NFCTagType4 {
  /**
   * Creates a new instance of NFCTagType4 containing an NDEF message.
   * @param contentType The NDEF type: text or url. Use the values from NFCContentType
   * @param content The actual content of NDEF message.
   */
  constructor(contentType, content) {
    _defineProperty(this, "content", void 0);
    _defineProperty(this, "type", void 0);
    this.type = 'NFCTag';
    this.content = {
      contentType,
      content
    };
  }
}
export default NFCTagType4;
//# sourceMappingURL=index.js.map