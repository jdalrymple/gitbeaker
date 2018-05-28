import { BaseService } from '../../../src/infrastructure';

describe('Creation of BaseService instance', () => {
  test('If a token or oauthToken is not passed, throw an error', async () => {
    expect(() => {
      const service = new BaseService(); // eslint-disable-line no-unused-vars
    }).toThrowError('`token` (private-token) or `oauth_token` is mandatory');
  });

  test('Url defaults to https://gitlab.com/api/v4', async () => {
    const service = new BaseService({ token: 'test' });

    expect(service.url).toBe('https://gitlab.com/api/v4');
  });

  test('Use the Oauth Token when a user supplies both a Private Token and a Oauth Token', async () => {
    const service = new BaseService({ token: 'test', oauthToken: '1234' });

    expect(service.headers['private-token']).toBeUndefined();
    expect(service.headers.authorization).toBe('Bearer 1234');
  });

  test('Custom url still appends api and version number to url', async () => {
    const service = new BaseService({ url: 'https://testing.com', token: 'test' });

    expect(service.url).toBe('https://testing.com/api/v4');
  });

  test('Oauth token adds to authorization header as a bearer token', async () => {
    const service = new BaseService({ url: 'https://testing.com', oauthToken: '1234' });

    expect(service.headers.authorization).toBe('Bearer 1234');
  });

  test('Private token adds to private-token header', async () => {
    const service = new BaseService({ url: 'https://testing.com', token: '1234' });

    expect(service.headers['private-token']).toBe('1234');
  });

  test('API version should be modified', async () => {
    const service = new BaseService({ url: 'https://testing.com', token: '1234', version: 'v3' });

    expect(service.url).toBe('https://testing.com/api/v3');
  });
});
