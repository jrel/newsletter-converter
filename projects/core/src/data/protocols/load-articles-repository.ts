import { LoadArticles } from '../../domain/usecases';

export interface LoadArticlesRepository {
  loadArticles: () => Promise<LoadArticlesRepository.Result>;
}

export namespace LoadArticlesRepository {
  export type Result =  LoadArticles.Result
}
