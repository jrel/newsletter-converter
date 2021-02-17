import { DebugLogger } from '../../domain/usecases';
import { LoggerRepository } from '../protocols';

export class DBDebugLogger implements DebugLogger {
  constructor(private readonly loggerRepository: LoggerRepository) {}

  async debug(message: string) {
    await this.loggerRepository.save({
      level: LoggerRepository.Level.DEBUG,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
