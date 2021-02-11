import { DBLoadArticles } from '../../../data/usercases/db-load-articles';
import { LoadArticles } from '../../../domain/usecases';
import { MongoArticlesRepository } from '../../../infra/db/mongo/mongo-articles-repository';

export const makeLoadArticles = (): LoadArticles => {
  const articlesRepository = new MongoArticlesRepository();
  return new DBLoadArticles(articlesRepository);
};
