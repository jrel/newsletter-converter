import { makeSaveArticles } from '../usescases/save-articles';
import { makeArticlesParser } from '../../../main/factories/usescases/articles-parser';
import { MailWebhook } from '../../../presentation/controllers/mail-webhook';
import { Controller } from '../../../presentation/protocols/controller';

export const makeMailWebhook = (): Controller<MailWebhook.Response> => {
  const articlesParser = makeArticlesParser();
  const saveArticles = makeSaveArticles();
  return new MailWebhook(articlesParser, saveArticles);
};
