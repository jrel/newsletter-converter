import { HTMLParser } from '../../data/protocols/html-parser';
import { parse } from 'node-html-parser';

export class NodeHTMLParser implements HTMLParser {
  parse(html: string) {
    return parse(html);
  }
}
