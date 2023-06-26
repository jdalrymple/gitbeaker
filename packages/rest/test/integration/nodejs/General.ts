import { Projects } from '../../../src';

const { GITLAB_PERSONAL_ACCESS_TOKEN = '', GITLAB_URL = '', TEST_ID = Date.now() } = process.env;

describe('Dynamic Token Resolution', () => {
  it('should support a dynamic resolution of a private token', async () => {
    const service = new Projects({
      host: GITLAB_URL,
      token: () => Promise.resolve(GITLAB_PERSONAL_ACCESS_TOKEN),
    });

    const name = `Project with dynamic private token - NODEJS ${TEST_ID}`;
    const p = await service.create({ name });

    expect(p).toBeObject();
    expect(p.name).toEqual(name);
  });

  it('should support a delayed dynamic resolution of a private token', async () => {
    const service = new Projects({
      host: GITLAB_URL,
      token: () =>
        new Promise((res) => {
          setTimeout(() => {
            res(GITLAB_PERSONAL_ACCESS_TOKEN);
          }, 1000);
        }),
    });

    const name = `Project with delyed dynamic private token - NODEJS ${TEST_ID}`;
    const p = await service.create({ name });

    expect(p).toBeObject();
    expect(p.name).toEqual(name);
  });
});
