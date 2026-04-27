import { expectTypeOf, describe, expect, it, vi } from 'vitest';
import { BaseResource } from '../../src/BaseResource';
import { createRequesterFn } from '../../src/RequesterUtils';

describe('Creation of BaseResource instance', () => {
  it('should default host to https://gitlab.com/api/v4/', () => {
    const service = new BaseResource({ requesterFn: vi.fn(), token: 'test' });

    expect(service.url).toBe('https://gitlab.com/api/v4/');
  });

  it('should append api and version number to host when using a custom host url', () => {
    const service = new BaseResource({
      requesterFn: vi.fn(),
      host: 'https://testing.com',
      token: 'test',
    });

    expect(service.url).toBe('https://testing.com/api/v4/');
  });

  it('should allow a camelize option to set', () => {
    const service = new BaseResource({ token: '123', requesterFn: vi.fn(), camelize: true });

    expect(service.camelize).toBe(true);
  });

  it('should accept a string oauthToken', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn(),
      oauthToken: '1234',
    });

    expectTypeOf(service.authHeaders.authorization).toBeFunction();

    await expect(service.authHeaders.authorization()).resolves.toBe('Bearer 1234');
  });

  it('should accept a dynamic oauthToken that returns a promise<string>', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn(),
      oauthToken: () =>
        new Promise((res) => {
          setTimeout(() => {
            res('1234');
          }, 1000);
        }),
    });

    expectTypeOf(service.authHeaders.authorization).toBeFunction();

    await expect(service.authHeaders.authorization()).resolves.toBe('Bearer 1234');
  });

  it('should use the Oauth Token when a given both a Private Token and a Oauth Token', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn(),
      token: 'test',
      oauthToken: () => Promise.resolve('1234'),
    });

    expect(Object.keys(service.authHeaders).length).toBe(1);
    expectTypeOf(service.authHeaders.authorization).toBeFunction();
    await expect(service.authHeaders.authorization()).resolves.toBe('Bearer 1234');
  });

  it('should accept a string token (private-token)', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn(),
      token: '1234',
    });

    expectTypeOf(service.authHeaders['private-token']).toBeFunction();
    await expect(service.authHeaders['private-token']()).resolves.toBe('1234');
  });

  it('should accept a function token (private-token) that returns a promise<string>', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn(),
      token: () => Promise.resolve('1234'),
    });

    expectTypeOf(service.authHeaders['private-token']).toBeFunction();
    await expect(service.authHeaders['private-token']()).resolves.toBe('1234');
  });

  it('should accept a string jobToken (job-token)', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn(),
      jobToken: '1234',
    });

    expectTypeOf(service.authHeaders['job-token']).toBeFunction();
    await expect(service.authHeaders['job-token']()).resolves.toBe('1234');
  });

  it('should accept a function jobToken (job-token) that returns a promise<string>', async () => {
    const service = new BaseResource({
      requesterFn: vi.fn(),
      jobToken: () => Promise.resolve('1234'),
    });

    expectTypeOf(service.authHeaders['job-token']).toBeFunction();
    await expect(service.authHeaders['job-token']()).resolves.toBe('1234');
  });

  it('should set the X-Profile-Token header if the profileToken option is given', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn(),
      profileToken: 'abcd',
    });

    expect(service.headers['X-Profile-Token']).toBe('abcd');
  });

  it('should defult the profileMode option to execution', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn(),
      profileToken: 'abcd',
    });

    expect(service.headers['X-Profile-Token']).toBe('abcd');
    expect(service.headers['X-Profile-Mode']).toBe('execution');
  });

  it('should set the X-Profile-Token and X-Profile-Mode header if the profileToken and profileMode options are given', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn(),
      profileToken: 'abcd',
      profileMode: 'memory',
    });

    expect(service.headers['X-Profile-Token']).toBe('abcd');
    expect(service.headers['X-Profile-Mode']).toBe('memory');
  });

  it('should default the queryTimeout to 300s', () => {
    const service = new BaseResource({ token: '123', requesterFn: vi.fn() });

    expect(service.queryTimeout).toBe(300000);
  });

  it('should allow for the queryTimeout to be set', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn(),
      queryTimeout: 10,
    });

    expect(service.queryTimeout).toBe(10);
  });

  it('should allow for the sudo user to be set', () => {
    const service = new BaseResource({ token: '123', requesterFn: vi.fn(), sudo: 'test' });

    expect(service.headers.Sudo).toBe('test');
  });

  it('should allow for prefix resource urls to be set', () => {
    const service = new BaseResource({ token: '123', requesterFn: vi.fn(), prefixUrl: 'test' });

    expect(service.url).toBe('https://gitlab.com/api/v4/test');
  });

  it('should allow for prefix resource urls to be set without host defaults', () => {
    const service = new BaseResource({
      token: '123',
      requesterFn: vi.fn(),
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
    const requestHandler = vi.fn();
    const optionsHandler = vi.fn();

    const requesterFn = createRequesterFn(optionsHandler, requestHandler);
    const serviceA = new BaseResource({ token: '123', requesterFn, prefixUrl: 'test' });

    await serviceA.requester.get('test');

    expect(optionsHandler).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://gitlab.com/api/v4/test' }),
      expect.objectContaining({ method: 'GET' }),
    );
  });
});
