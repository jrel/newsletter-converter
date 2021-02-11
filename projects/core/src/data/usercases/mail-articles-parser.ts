import { HTMLParser } from '../protocols/html-parser';
import { ArticlesParser } from '../../domain/usecases/articles-parser';

export class MailArticlesParser implements ArticlesParser {
  constructor(private readonly htmlParser: HTMLParser) {}
  async parse({ data, timestamp }: ArticlesParser.Params) {
    const html = this.htmlParser.parse(data);

    return html.querySelectorAll('table tbody tr td p').map((el) => {
      el.querySelectorAll('*').forEach((child) => {
        child.removeAttribute('style');
        child.removeAttribute('data-auth');
      });
      el.removeChild(el.querySelector('br'));
      return {
        content: el.innerHTML.trim(),
        timestamp,
      };
    });
  }
}
