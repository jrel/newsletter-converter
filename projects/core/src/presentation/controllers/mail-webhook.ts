import { SaveArticles } from '../../domain/usecases/save-articles';
import { ArticlesParser } from '../../domain/usecases/articles-parser';
import { Controller } from '../../presentation/protocols/controller';

export class MailWebhook implements Controller<MailWebhook.Response> {
  constructor(
    private readonly articlesParser: ArticlesParser,
    private readonly saveArticles: SaveArticles
  ) {}

  async handle(request: MailWebhook.Request) {
    if (
      request.headers.from !==
      '"Filipe Deschamps Newsletter" <newsletter@filipedeschamps.com.br>'
    ) {
      return {
        statusCode: 400,
        body: {
          message: 'Illegal sender',
        },
      };
    }

    const articles = await this.articlesParser.parse({
      data: request.html,
      timestamp: new Date(request.headers.date),
    });
    await this.saveArticles.saveArticles(articles);
    return {
      body: {
        articles,
      },
      statusCode: 200,
    };
  }
}

export namespace MailWebhook {
  export type Request = {
    headers: { date: string; from: string };
    html: string;
  };
  export type Response = ResponseOk | ResponseError;

  export type ResponseOk = {
    articles: Array<{ content: string }>;
  };

  export type ResponseError = {
    message: string;
  };
}
