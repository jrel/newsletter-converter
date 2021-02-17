import { DBDebugLogger, LoggerRepository } from '../../../src/data';
type SutTypes = {
  sut: DBDebugLogger;
  repositorySpy: LoggerRepositorySpy;
};

class LoggerRepositorySpy implements LoggerRepository {
  save: (log: LoggerRepository.Params) => Promise<void> = jest.fn();
}

const makeSut = (): SutTypes => {
  const repositorySpy = new LoggerRepositorySpy();
  const sut = new DBDebugLogger(repositorySpy);
  return {
    sut,
    repositorySpy,
  };
};
describe('DBDebugLogger', () => {
  it('should be possible instaciate sut', () => {
    const { sut } = makeSut();
    expect(sut).toBeInstanceOf(DBDebugLogger);
  });

  it('should be possible call sut.debug', () => {
    const { sut } = makeSut();
    expect(sut.debug).toBeInstanceOf(Function);
    expect(sut.debug('')).resolves.not.toThrow();
  });

  it('should be call repository.save when sut.debug', async () => {
    const { sut, repositorySpy } = makeSut();
    const message = 'message';
    const timestamp = new Date();

    jest.useFakeTimers('modern');
    jest.setSystemTime(timestamp);

    await sut.debug(message);
    expect(repositorySpy.save).toBeCalledWith({
      level: 'debug',
      message,
      timestamp: timestamp.toISOString(),
    });

    jest.useRealTimers();
  });
});
