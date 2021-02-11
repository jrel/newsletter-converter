import { DBSaveArticles } from '../../../data/usercases/db-save-articles';
import { SaveArticles } from '../../../domain/usecases/save-articles';
import { MongoArticlesRepository } from '../../../infra/db/mongo/mongo-articles-repository';

export const makeSaveArticles = (): SaveArticles => {
  const articlesRepository = new MongoArticlesRepository();
  return new DBSaveArticles(articlesRepository);
};
