import { Snippets } from '../../src';

describe('Snippets', () => {
  it('should create snippet', async () => {
    const service = new Snippets({
      host: process.env.GITLAB_URL,
      token: process.env.PERSONAL_ACCESS_TOKEN,
    });

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
