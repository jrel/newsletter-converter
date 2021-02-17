import { inspect } from 'util';
import { SaveArticles, SaveArticlesRepository } from '../../../src';

class SaveArticlesRepositorySpy implements SaveArticlesRepository {
  articleSaved: SaveArticlesRepository.Params;
  async saveArticles(params: SaveArticlesRepository.Params) {
    this.articleSaved = params;
  }
}
export class DBSaveArticles implements SaveArticles {
  constructor(
    private readonly saveArticlesRepository: SaveArticlesRepository
  ) {}

  async saveArticles(data: SaveArticles.Params) {
    await this.saveArticlesRepository.saveArticles(data);
  }
}

type SutTypes = {
  sut: DBSaveArticles;
  saveArticlesRepositorySpy: SaveArticlesRepositorySpy;
};

const makeSut = (): SutTypes => {
  const saveArticlesRepositorySpy = new SaveArticlesRepositorySpy();
  const sut = new DBSaveArticles(saveArticlesRepositorySpy);
  return {
    sut,
    saveArticlesRepositorySpy,
  };
};

describe('DBSaveArticles', () => {
  it('should be possible instaciate sut', () => {
    const { sut } = makeSut();
    expect(sut).toBeInstanceOf(DBSaveArticles);
  });

  it('should be be possible call sut.saveArticles', () => {
    const { sut } = makeSut();
    expect(sut.saveArticles).toBeInstanceOf(Function);
  });

  it('sut.saveArticles must call Repository.saveArticles protocols', () => {
    const { sut, saveArticlesRepositorySpy } = makeSut();
    const params = [
      {
        content: 'any text',
        timestamp: new Date(),
      },
    ];
    sut.saveArticles(params);

    expect(saveArticlesRepositorySpy.articleSaved).toBe(params);
  });
});
