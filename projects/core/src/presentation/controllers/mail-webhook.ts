import {
  SaveArticles,
  ArticlesParser,
  DebugLogger,
} from '../../domain/usecases';
import { Controller } from '../../presentation/protocols/controller';

export class MailWebhook implements Controller<MailWebhook.Response> {
  private static readonly EXPECTED_FROM =
    '"Filipe Deschamps Newsletter" <newsletter@filipedeschamps.com.br>';
  constructor(
    private readonly articlesParser: ArticlesParser,
    private readonly saveArticles: SaveArticles,
    private readonly logger: DebugLogger
  ) {}

  async handle(request: MailWebhook.Request) {
    if (request.headers.from !== MailWebhook.EXPECTED_FROM) {
      this.logger.debug(
        `Expected "${MailWebhook.EXPECTED_FROM}" but recieve "${request.headers.from}`
      );
      return {
        statusCode: 400,
        body: {
          message: `Expected "${MailWebhook.EXPECTED_FROM}" but recieve "${request.headers.from}`,
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
