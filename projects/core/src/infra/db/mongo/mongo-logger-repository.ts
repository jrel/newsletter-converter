import { LoggerRepository } from '../../../data/protocols';
import { MongoHelper } from './mongo-helper';

export class MongoLoggerRepository implements LoggerRepository {
  async save(log: LoggerRepository.Params) {
    const collection = await MongoHelper.getCollection('logs');
    await collection.insertOne(log);
  }
}
