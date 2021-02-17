import {
  ArticlesParser,
  MailWebhook,
  SaveArticles,
  DebugLogger,
} from '../../../src';
const EXPECTED_FROM =
  '"Filipe Deschamps Newsletter" <newsletter@filipedeschamps.com.br>';
const makeSut = () => {
  const articlesParser = new (class implements ArticlesParser {
    parse: ArticlesParser['parse'] = jest.fn();
  })();
  const saveArticles = new (class implements SaveArticles {
    saveArticles: SaveArticles['saveArticles'] = jest.fn();
  })();
  const logger = new (class implements DebugLogger {
    debug: DebugLogger['debug'] = jest.fn();
  })();
  return {
    sut: new MailWebhook(articlesParser, saveArticles, logger),
    articlesParser,
    saveArticles,
    logger,
  };
};

const makeParam = (from?: string) => ({
  headers: {
    date: new Date().toISOString(),
    from: from ?? EXPECTED_FROM,
  },
  html: '',
});

describe('MailWebhook', () => {
  test('Should be possible instaciate sut', () => {
    const { sut, logger } = makeSut();
    expect(sut).toBeInstanceOf(MailWebhook);
  });

  test('Should not log and return a 200 error when correct mail is passed', async () => {
    const { sut, logger } = makeSut();

    const from = EXPECTED_FROM;
    const result = await sut.handle(makeParam(from));
    expect(logger.debug).not.toBeCalled();
    expect(result.statusCode).toBe(200);
  });

  test('Should log and return a 400 error when wrong mail is passed', async () => {
    const { sut, logger } = makeSut();

    const from = 'jrelourenco@outlook.pt';
    const result = await sut.handle(makeParam(from));
    expect(logger.debug).toBeCalledWith(
      `Expected "${EXPECTED_FROM}" but recieve "${from}`
    );
    expect(result).toEqual({
      body: {
        message: `Expected "${EXPECTED_FROM}" but recieve "${from}`,
      },
      statusCode: 400,
    });
  });
});
