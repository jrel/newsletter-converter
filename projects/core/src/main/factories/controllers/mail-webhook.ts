import {
  makeArticlesParser,
  makeDebugLogger,
  makeSaveArticles,
} from '../usescases';
import { MailWebhook, Controller } from '../../../presentation';

export const makeMailWebhook = (): Controller<MailWebhook.Response> => {
  const articlesParser = makeArticlesParser();
  const saveArticles = makeSaveArticles();
  const debugLogger = makeDebugLogger();
  return new MailWebhook(articlesParser, saveArticles, debugLogger);
};
