import { Collection } from 'mongodb';
import { LoggerRepository } from '../../../../src/data';
import { MongoHelper, MongoLoggerRepository } from '../../../../src/infra';

const makeSut = () => {
  return {
    sut: new MongoLoggerRepository(),
  };
};

const makeLog = () => ({
  level: 'debug' as LoggerRepository.Level,
  message: 'message',
  timestamp: new Date().toISOString(),
});

describe('MongoLoggerRepository', () => {
  let collection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    collection = await MongoHelper.getCollection('logs');
    await collection.deleteMany({});
  });
  test('Should be possible instaciate sut', () => {
    const { sut } = makeSut();
    expect(sut).toBeInstanceOf(MongoLoggerRepository);
  });

  test('should be possible call sut.save', () => {
    const { sut } = makeSut();
    expect(sut.save).toBeInstanceOf(Function);
    expect(sut.save(makeLog())).resolves.not.toThrow();
  });

  test('Should create an document in collection on success', async () => {
    const { sut } = makeSut();
    expect(await collection.countDocuments()).toBe(0);
    await sut.save(makeLog());
    expect(await collection.countDocuments()).toBe(1);
  });
});
