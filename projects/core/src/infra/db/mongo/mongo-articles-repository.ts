import {
  SaveArticlesRepository,
  LoadArticlesRepository,
} from '../../../data/protocols';
import { MongoHelper } from './mongo-helper';
import { WithId } from 'mongodb';

export class MongoArticlesRepository
  implements LoadArticlesRepository, SaveArticlesRepository {
  async loadArticles() {
    try {
      const collection = await MongoHelper.getCollection<MongoArticlesRepository.ShemaWithId>(
        'articles'
      );
      const articles = await collection
        .find({})
        .sort({ timestamp: -1 })
        .toArray();

      return MongoHelper.mapCollection(articles);
    } catch {
      return [];
    }
  }

  async saveArticles(data: SaveArticlesRepository.Params) {
    const collection = await MongoHelper.getCollection('articles');
    await collection.insertMany(data as MongoArticlesRepository.Schema[]);
  }
}

export namespace MongoArticlesRepository {
  export interface Schema {
    content: string;
    timestamp: Date;
  }

  export type ShemaWithId = WithId<Schema>;
}
