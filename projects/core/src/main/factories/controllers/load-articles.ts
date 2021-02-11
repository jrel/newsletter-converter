import { LoadArticlesController } from '../../../presentation/controllers';
import { Controller } from '../../../presentation/protocols/controller';
import { makeLoadArticles } from '../usescases';

export const makeLoadArticlesController = (): Controller<LoadArticlesController.Response> => {
  const loadArticles = makeLoadArticles();
  return new LoadArticlesController(loadArticles);
};
