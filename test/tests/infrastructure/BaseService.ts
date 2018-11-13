import { BaseService } from '../../../src/infrastructure';

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
    const service = new BaseService({ host: 'https://testing.com', token: '1234', version: 'v3' });

    expect(service.url).toBe('https://testing.com/api/v3/');
  });
});
