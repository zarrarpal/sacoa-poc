import type HCEApplication from "../HCEApplication";

export enum NFCContentType {
  Text = 'text',
  URL = 'url',
}

class NFCTagType4 implements HCEApplication {
  /**
   * Creates a new instance of NFCTagType4 containing an NDEF message.
   * @param contentType The NDEF type: text or url. Use the values from NFCContentType
   * @param content The actual content of NDEF message.
   */
  constructor(contentType: NFCContentType, content: string) {
    this.type = 'NFCTag';
    this.content = {
      contentType,
      content,
    };
  }

  content: any;
  type: string;
}

export default NFCTagType4;
