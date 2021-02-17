export interface LoggerRepository {
  save(log: LoggerRepository.Params): Promise<void>;
}

export namespace LoggerRepository {
  export enum Level {
    DEBUG = 'debug',
  }

  export interface Params {
    level: LoggerRepository.Level;
    message: string;
    timestamp: string;
  }
}
