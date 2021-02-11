import { LoadArticlesRepository } from '../protocols';
import { LoadArticles } from '../../domain/usecases';

export class DBLoadArticles implements LoadArticles {
  constructor(
    private readonly loadArticlesRepository: LoadArticlesRepository
  ) {}

  async loadArticles() {
    return await this.loadArticlesRepository.loadArticles();
  }
}
