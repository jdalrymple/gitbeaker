import { describe, expect, it, vi } from 'vitest';
import { BaseResource } from '../../src/BaseResource';
import {
  type OptionsHandlerFn,
  type RequestHandlerFn,
  type RequesterFn,
  createRequesterFn,
} from '../../src/RequesterUtils';

describe('Creation of BaseResource instance', () => {
  it('should default host to https://gitlab.com/api/v4/', () => {
    const service = new BaseResource({ requesterFn: vi.fn<RequesterFn>(), token: 'test' });

    expect(service.url).toBe('https://gitlab.com/api/v4/');
  });

  it('should append api and version number to host when using a custom host url', () => {
    const service = new BaseResource({
      requesterFn: vi.fn<RequesterFn>(),
      host: 'https://testing.com',
      token: 'test',
    });

    expect(service.url).toBe('https://testing.com/api/v4/');
  });

  it('should allow a camelize option to set', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn<RequesterFn>(),
      camelize: true,
    });

    expect(service.camelize).toBe(true);
  });

  it('should accept a string oauthToken', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn<RequesterFn>(),
      oauthToken: '1234',
    });

    expect(service.authHeaders.authorization).toBeInstanceOf(Function);

    await expect(service.authHeaders.authorization()).resolves.toBe('Bearer 1234');
  });

  it('should accept a dynamic oauthToken that returns a promise<string>', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn<RequesterFn>(),
      oauthToken: () =>
        new Promise((res) => {
          setTimeout(() => {
            res('1234');
          }, 1000);
        }),
    });

    expect(service.authHeaders.authorization).toBeInstanceOf(Function);

    await expect(service.authHeaders.authorization()).resolves.toBe('Bearer 1234');
  });

  it('should use the Oauth Token when a given both a Private Token and a Oauth Token', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn<RequesterFn>(),
      token: 'test',
      oauthToken: () => Promise.resolve('1234'),
    });

    expect(Object.keys(service.authHeaders).length).toBe(1);
    expect(service.authHeaders.authorization).toBeInstanceOf(Function);
    await expect(service.authHeaders.authorization()).resolves.toBe('Bearer 1234');
  });

  it('should accept a string token (private-token)', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn<RequesterFn>(),
      token: '1234',
    });

    expect(service.authHeaders['private-token']).toBeInstanceOf(Function);
    await expect(service.authHeaders['private-token']()).resolves.toBe('1234');
  });

  it('should accept a function token (private-token) that returns a promise<string>', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn<RequesterFn>(),
      token: () => Promise.resolve('1234'),
    });

    expect(service.authHeaders['private-token']).toBeInstanceOf(Function);
    await expect(service.authHeaders['private-token']()).resolves.toBe('1234');
  });

  it('should accept a string jobToken (job-token)', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn<RequesterFn>(),
      jobToken: '1234',
    });

    expect(service.authHeaders['job-token']).toBeInstanceOf(Function);
    await expect(service.authHeaders['job-token']()).resolves.toBe('1234');
  });

  it('should accept a function jobToken (job-token) that returns a promise<string>', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn<RequesterFn>(),
      jobToken: () => Promise.resolve('1234'),
    });

    expect(service.authHeaders['job-token']).toBeInstanceOf(Function);
    await expect(service.authHeaders['job-token']()).resolves.toBe('1234');
  });

  it('should set the X-Profile-Token header if the profileToken option is given', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn<RequesterFn>(),
      profileToken: 'abcd',
    });

    expect(service.headers['X-Profile-Token']).toBe('abcd');
  });

  it('should defult the profileMode option to execution', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn<RequesterFn>(),
      profileToken: 'abcd',
    });

    expect(service.headers['X-Profile-Token']).toBe('abcd');
    expect(service.headers['X-Profile-Mode']).toBe('execution');
  });

  it('should set the X-Profile-Token and X-Profile-Mode header if the profileToken and profileMode options are given', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn<RequesterFn>(),
      profileToken: 'abcd',
      profileMode: 'memory',
    });

    expect(service.headers['X-Profile-Token']).toBe('abcd');
    expect(service.headers['X-Profile-Mode']).toBe('memory');
  });

  it('should default the queryTimeout to 300s', () => {
    const service = new BaseResource({ token: '123', requesterFn: vi.fn<RequesterFn>() });

    expect(service.queryTimeout).toBe(300000);
  });

  it('should allow for the queryTimeout to be set', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn<RequesterFn>(),
      queryTimeout: 10,
    });

    expect(service.queryTimeout).toBe(10);
  });

  it('should allow for the sudo user to be set', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn<RequesterFn>(),
      sudo: 'test',
    });

    expect(service.headers.Sudo).toBe('test');
  });

  it('should allow for prefix resource urls to be set', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn<RequesterFn>(),
      prefixUrl: 'test',
    });

    expect(service.url).toBe('https://gitlab.com/api/v4/test');
  });

  it('should allow for prefix resource urls to be set without host defaults', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn<RequesterFn>(),
      host: 'https://fakehost.com',
      prefixUrl: 'test',
    });

    expect(service.url).toBe('https://fakehost.com/api/v4/test');
  });

  it('should throw an error if requesterFn is not passed', () => {
    expect(() => {
      // @ts-ignore
      new BaseResource();
    }).toThrow('Missing requesterFn: BaseResource requires a function to handle HTTP requests');

    expect(() => {
      // @ts-ignore
      new BaseResource({});
    }).toThrow('Missing requesterFn: BaseResource requires a function to handle HTTP requests');
  });

  it('should set the internal requester based on the required requesterFn parameter', async () => {
    const requestHandler = vi.fn<RequestHandlerFn>();
    const optionsHandler = vi.fn<OptionsHandlerFn>();

    const requesterFn = createRequesterFn(optionsHandler, requestHandler);
    const serviceA = new BaseResource({ token: '123', requesterFn, prefixUrl: 'test' });

    await serviceA.requester.get('test');

    expect(optionsHandler).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://gitlab.com/api/v4/test' }),
      expect.objectContaining({ method: 'GET' }),
    );
  });
});
