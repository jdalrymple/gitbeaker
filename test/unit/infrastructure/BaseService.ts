import { RequestHelper, KyRequester, BaseService } from '../../../src/core/infrastructure';

describe('Creation of BaseService instance', () => {
  test('host defaults to https://gitlab.com/api/v4/', async () => {
    const service = new BaseService({ token: 'test' });

    expect(service.url).toBe('https://gitlab.com/api/v4/');
  });

  test('Use the Oauth Token when a given both a Private Token and a Oauth Token', async () => {
    const service = new BaseService({ token: 'test', oauthToken: '1234' });

    expect(service.headers['private-token']).toBeUndefined();
    expect(service.headers.authorization).toBe('Bearer 1234');
  });

  test('Custom host still appends api and version number to host', async () => {
    const service = new BaseService({ host: 'https://testing.com', token: 'test' });

    expect(service.url).toBe('https://testing.com/api/v4/');
  });

  test('Oauth token adds to authorization header as a bearer token', async () => {
    const service = new BaseService({ host: 'https://testing.com', oauthToken: '1234' });

    expect(service.headers.authorization).toBe('Bearer 1234');
  });

  test('Private token adds to private-token header', async () => {
    const service = new BaseService({ host: 'https://testing.com', token: '1234' });

    expect(service.headers['private-token']).toBe('1234');
  });

  test('API version should be modified', async () => {
    const service = new BaseService({ host: 'https://testing.com', token: '1234', version: 3 });

    expect(service.url).toBe('https://testing.com/api/v3/');
  });

  /* eslint @typescript-eslint/camelcase: 0 */
  test('Camelize option should return simple response with camelized keys', async () => {
    const service = new BaseService({ host: 'https://testing.com', token: '1234', camelize: true });

    service.show = jest.fn(() => RequestHelper.get(service, 'test'));
    KyRequester.get = jest.fn(() => ({
      body: [
        { id: 3, gravatar_enable: true },
        { id: 4, gravatar_enable: false },
      ],
      headers: {},
    }));

    const results = await service.show();

    expect(results).toIncludeSameMembers([
      { id: 3, gravatarEnable: true },
      { id: 4, gravatarEnable: false },
    ]);
  });

  /* eslint @typescript-eslint/camelcase: 0 */
  test('Camelize option unset should return simple response with default keys', async () => {
    const service = new BaseService({ host: 'https://testing.com', token: '1234' });

    service.show = jest.fn(() => RequestHelper.get(service, 'test'));
    KyRequester.get = jest.fn(() => ({ body: { id: 3, gravatar_enable: true }, headers: {} }));

    const results = await service.show();

    expect(results).toMatchObject({ id: 3, gravatar_enable: true });
  });
});
