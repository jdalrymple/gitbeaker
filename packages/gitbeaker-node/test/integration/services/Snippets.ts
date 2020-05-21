import { Snippets } from '../../../src';

let service;

beforeEach(() => {
  service = new Snippets({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
});

describe('Snippets.create', () => {
  it('should create a snippet', async () => {
    const result = await service.create(
      'This is a snippet',
      'test.txt',
      'Hello world',
      'internal',
      { description: 'Hello World snippet' },
    );

    expect(result).toBeInstanceOf(Object);
    expect(result.title).toEqual('This is a snippet');
  });
});
