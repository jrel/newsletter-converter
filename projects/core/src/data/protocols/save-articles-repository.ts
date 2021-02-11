import { SaveArticles } from '../../domain/usecases/save-articles';

export interface SaveArticlesRepository {
  saveArticles: (data: SaveArticlesRepository.Params) => Promise<void>;
}

export namespace SaveArticlesRepository {
  export interface Params extends SaveArticles.Params{};
}
