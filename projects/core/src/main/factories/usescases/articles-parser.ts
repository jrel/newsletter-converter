import { MailArticlesParser } from '../../../data/usercases/mail-articles-parser';
import { ArticlesParser } from '../../../domain/usecases/articles-parser';
import { NodeHTMLParser } from '../../../infra/adapters/node-html-parser';

export const makeArticlesParser = (): ArticlesParser => {
  const htmlParser = new NodeHTMLParser();
  return new MailArticlesParser(htmlParser);
};
