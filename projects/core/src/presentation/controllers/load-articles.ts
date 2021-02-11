import { SaveArticles } from '../../domain/usecases/save-articles';
import { LoadArticles } from '../../domain/usecases';
import { Controller } from '../protocols/controller';

export class LoadArticlesController
  implements Controller<LoadArticlesController.Response> {
  constructor(private readonly loadArticles: LoadArticles) {}

  async handle() {
    const articles = await this.loadArticles.loadArticles();
    return {
      body: {
        articles,
      },
      statusCode: 200,
    };
  }
}

export namespace LoadArticlesController {
  export type Request = {};

  export type Response = {
    articles: LoadArticles.Result;
  };
}
