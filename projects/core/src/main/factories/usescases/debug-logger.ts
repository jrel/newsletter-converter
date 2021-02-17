import { MongoLoggerRepository } from '../../../infra';
import { DBDebugLogger } from '../../../data';
import { DebugLogger } from '../../../domain';

export const makeDebugLogger = (): DebugLogger => {
  const loggerRepository = new MongoLoggerRepository();
  return new DBDebugLogger(loggerRepository);
};
