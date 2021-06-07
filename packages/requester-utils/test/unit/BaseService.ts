import { BaseService } from '../../src';
import { createRequesterFn } from '../../src/RequesterUtils';

describe('Creation of BaseService instance', () => {
  it('should default host to https://gitlab.com/api/v4/', () => {
    const service = new BaseService({ requesterFn: jest.fn(), token: 'test' });

    expect(service.url).toBe('https://gitlab.com/api/v4/');
  });

  it('should use the Oauth Token when a given both a Private Token and a Oauth Token', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      token: 'test',
      oauthToken: '1234',
    });

    expect(service.headers['private-token']).toBeUndefined();
    expect(service.headers.authorization).toBe('Bearer 1234');
  });

  it('should append api and version number to host when using a custom host url', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      host: 'https://testing.com',
      token: 'test',
    });

    expect(service.url).toBe('https://testing.com/api/v4/');
  });

  it('should allow a camelize option to set', () => {
    const service = new BaseService({ requesterFn: jest.fn(), camelize: true });

    expect(service.camelize).toBe(true);
  });

  it('should add Oauth token to authorization header as a bearer token', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      host: 'https://testing.com',
      oauthToken: '1234',
    });

    expect(service.headers.authorization).toBe('Bearer 1234');
  });

  it('should add Private token to private-token header', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      host: 'https://testing.com',
      token: '1234',
    });

    expect(service.headers['private-token']).toBe('1234');
  });

  it('should add Job token to job-token header', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      host: 'https://testing.com',
      jobToken: '1234',
    });

    expect(service.headers['job-token']).toBe('1234');
  });

  it('should allow for the API version to be modified', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      host: 'https://testing.com',
      token: '1234',
      version: 3,
    });

    expect(service.url).toBe('https://testing.com/api/v3/');
  });

  it('should set the X-Profile-Token header if the profileToken option is given', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      profileToken: 'abcd',
    });

    expect(service.headers['X-Profile-Token']).toBe('abcd');
  });

  it('should defult the profileMode option to execution', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      profileToken: 'abcd',
    });

    expect(service.headers['X-Profile-Token']).toBe('abcd');
    expect(service.headers['X-Profile-Mode']).toBe('execution');
  });

  it('should set the X-Profile-Token and X-Profile-Mode header if the profileToken and profileMode options are given', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      profileToken: 'abcd',
      profileMode: 'memory',
    });

    expect(service.headers['X-Profile-Token']).toBe('abcd');
    expect(service.headers['X-Profile-Mode']).toBe('memory');
  });

  it('should default the https reject unauthorized option to true', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      rejectUnauthorized: true,
    });

    expect(service.rejectUnauthorized).toBeTruthy();
  });

  it('should allow for the https reject unauthorized option to be set', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      rejectUnauthorized: false,
    });

    expect(service.rejectUnauthorized).toBeFalsy();
  });

  it('should default the requestTimeout to 300s', () => {
    const service = new BaseService({ requesterFn: jest.fn() });

    expect(service.requestTimeout).toBe(300000);
  });

  it('should allow for the requestTimeout to be set', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      requestTimeout: 10,
    });

    expect(service.requestTimeout).toBe(10);
  });

  it('should allow for the sudo user to be set', () => {
    const service = new BaseService({ requesterFn: jest.fn(), sudo: 'test' });

    expect(service.headers.Sudo).toBe('test');
  });

  it('should allow for prefix resource urls to be set', () => {
    const service = new BaseService({ requesterFn: jest.fn(), prefixUrl: 'test' });

    expect(service.url).toBe('https://gitlab.com/api/v4/test');
  });

  it('should allow for prefix resource urls to be set without host or version defaults', () => {
    const service = new BaseService({
      requesterFn: jest.fn(),
      version: 3,
      host: 'https://fakehost.com',
      prefixUrl: 'test',
    });

    expect(service.url).toBe('https://fakehost.com/api/v3/test');
  });

  it('should throw an error if requesterFn is not passed', () => {
    expect(() => {
      new BaseService(); // eslint-disable-line
    }).toThrow();
  });

  it('should set the internal requester based on the required requesterFn parameter', async () => {
    const requestHandler = jest.fn();
    const optionsHandler = jest.fn();
    const requesterFn = createRequesterFn(optionsHandler, requestHandler);
    const serviceA = new BaseService({ requesterFn, prefixUrl: 'test' });
    const serviceB = new BaseService({ requesterFn, prefixUrl: 'test2' });

    await serviceA.requester.get('test');

    expect(optionsHandler).toBeCalledWith(
      expect.objectContaining({ url: 'https://gitlab.com/api/v4/test' }),
      { method: 'get' },
    );

    await serviceB.requester.get('test');

    expect(optionsHandler).toBeCalledWith(
      expect.objectContaining({ url: 'https://gitlab.com/api/v4/test2' }),
      { method: 'get' },
    );
  });
});
