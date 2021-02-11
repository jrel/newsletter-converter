export interface HTMLParser {
  parse(html: string): HTMLParser.Result;
}

export namespace HTMLParser {
  export interface Result {
    querySelectorAll(cssSelector: string): HTMLParser.Result[];
    querySelector(cssSelector: string): HTMLParser.Result;
    removeAttribute(name: string): void;
    removeChild(node: any): void;
    innerHTML: string;
  }
}
