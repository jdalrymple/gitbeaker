import { Requester } from '@gitbeaker/requester-base';
import { RequestHelper, BaseService } from '../../../src/infrastructure';

describe('Creation of BaseService instance', () => {
  it('should default host to https://gitlab.com/api/v4/', async () => {
    const service = new BaseService({ token: 'test' });

    expect(service.url).toBe('https://gitlab.com/api/v4/');
  });

  it('should use the Oauth Token when a given both a Private Token and a Oauth Token', async () => {
    const service = new BaseService({ token: 'test', oauthToken: '1234' });

    expect(service.headers['private-token']).toBeUndefined();
    expect(service.headers.authorization).toBe('Bearer 1234');
  });

  it('should append api and version number to host when using a custom host url', async () => {
    const service = new BaseService({ host: 'https://testing.com', token: 'test' });

    expect(service.url).toBe('https://testing.com/api/v4/');
  });

  it('should add Oauth token to authorization header as a bearer token', async () => {
    const service = new BaseService({ host: 'https://testing.com', oauthToken: '1234' });

    expect(service.headers.authorization).toBe('Bearer 1234');
  });

  it('should add Private token to private-token header', async () => {
    const service = new BaseService({ host: 'https://testing.com', token: '1234' });

    expect(service.headers['private-token']).toBe('1234');
  });

  it('should add Job token to job-token header', async () => {
    const service = new BaseService({ host: 'https://testing.com', jobToken: '1234' });

    expect(service.headers['job-token']).toBe('1234');
  });

  it('should allow for the API version to be modified', async () => {
    const service = new BaseService({ host: 'https://testing.com', token: '1234', version: 3 });

    expect(service.url).toBe('https://testing.com/api/v3/');
  });

  /* eslint @typescript-eslint/camelcase: 0 */
  it('should return simple response with camelized keys when using the camelize option', async () => {
    const service = new BaseService({ host: 'https://testing.com', token: '1234', camelize: true });

    service.show = jest.fn(() => RequestHelper.get(service, 'test'));
    Requester.get = jest.fn(() => ({
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
  it('should return simple response with default keys without camelize option', async () => {
    const service = new BaseService({ host: 'https://testing.com', token: '1234' });

    service.show = jest.fn(() => RequestHelper.get(service, 'test'));
    Requester.get = jest.fn(() => ({ body: { id: 3, gravatar_enable: true }, headers: {} }));

    const results = await service.show();

    expect(results).toMatchObject({ id: 3, gravatar_enable: true });
  });

  it('should set the X-Profile-Token header if the profileToken option is given', async () => {
    const service = new BaseService({ profileToken: 'abcd' });

    expect(service.headers['X-Profile-Token']).toBe('abcd');
  });

  it('should defult the profileMode option to execution', async () => {
    const service = new BaseService({ profileToken: 'abcd' });

    expect(service.headers['X-Profile-Token']).toBe('abcd');
    expect(service.headers['X-Profile-Mode']).toBe('execution');
  });

  it('should set the X-Profile-Token and X-Profile-Mode header if the profileToken and profileMode options are given', async () => {
    const service = new BaseService({ profileToken: 'abcd', profileMode: 'memory' });

    expect(service.headers['X-Profile-Token']).toBe('abcd');
    expect(service.headers['X-Profile-Mode']).toBe('memory');
  });

  it('should default the https reject unauthorized option to true', async () => {
    const service = new BaseService({ rejectUnauthorized: true });

    expect(service.rejectUnauthorized).toBeTruthy();
  });

  it('should allow for the https reject unauthorized option to be set', async () => {
    const service = new BaseService({ rejectUnauthorized: false });

    expect(service.rejectUnauthorized).toBeFalsy();
  });

  it('should default the requestTimeout to 300s', async () => {
    const service = new BaseService({});

    expect(service.requestTimeout).toBe(300000);
  });

  it('should allow for the requestTimeout to be set', async () => {
    const service = new BaseService({ requestTimeout: 10 });

    expect(service.requestTimeout).toBe(10);
  });

  it('should allow for the sudo user to be set', async () => {
    const service = new BaseService({ sudo: 'test' });

    expect(service.headers.Sudo).toBe('test');
  });
});
