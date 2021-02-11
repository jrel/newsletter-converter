import { Article } from '../models/article';

export interface ArticlesParser {
  parse(data: ArticlesParser.Params): Promise<ArticlesParser.Result>;
}

export namespace ArticlesParser {
  export interface Params {
    data: string;
    timestamp: Date;
  }

  export type Result = Article[];
}
