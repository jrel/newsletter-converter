import { Article } from '../models/article';

export interface SaveArticles {
  saveArticles(data: SaveArticles.Params): Promise<SaveArticles.Result>;
}

export namespace SaveArticles {
  export type Params = {
    content: string;
    timestamp: Date;
  }[];

  export type Result = void;
}
