// custom-module.d.ts
declare module 'custom-module' {
  interface Content {
    content: string;
    type: string;
    writable: boolean;
  }

  interface NFCContent {
    content: Content;
    type: string;
  }

  function setContent(content: NFCContent): void;
  function stop(): void;

  export {setContent, stop};
}
