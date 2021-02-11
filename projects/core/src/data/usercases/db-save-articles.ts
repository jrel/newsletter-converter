import { SaveArticlesRepository } from '../protocols/save-articles-repository';
import { SaveArticles } from '../../domain/usecases/save-articles';

export class DBSaveArticles implements SaveArticles {
  constructor(
    private readonly saveArticlesRepository: SaveArticlesRepository
  ) {}

  async saveArticles(data: SaveArticles.Params): Promise<SaveArticles.Result> {
    await this.saveArticlesRepository.saveArticles(data);
  }
}
