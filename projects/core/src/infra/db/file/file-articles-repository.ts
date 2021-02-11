import {
  SaveArticlesRepository,
  LoadArticlesRepository,
} from '../../../data/protocols';
import { FileHelper } from './file-helper';

export class FileArticlesRepository
  implements LoadArticlesRepository, SaveArticlesRepository {
  async loadArticles() {
    try {
      const persisted = await FileHelper.read('db.json');

      return this.parseOrDefault<LoadArticlesRepository.Result>(persisted, []);
    } catch {
      return [];
    }
  }

  async saveArticles(data: SaveArticlesRepository.Params) {
    const persisted = await FileHelper.read('db.json');
    const articles = this.parseOrDefault<SaveArticlesRepository.Params>(
      persisted,
      []
    );

    const toSave = JSON.stringify(articles.concat(data));
    await FileHelper.write('db.json', toSave);
  }

  private parseOrDefault<T>(toParse: string, defaultValue: T): T {
    try {
      return JSON.parse(toParse);
    } catch {
      return defaultValue;
    }
  }
}
