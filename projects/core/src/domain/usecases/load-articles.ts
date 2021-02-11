import { Article } from '../models/article';

export interface LoadArticles {
  loadArticles(): Promise<LoadArticles.Result>;
}

export namespace LoadArticles {
  export type Result = {
    id: String;
    content: string;
  }[];
}
