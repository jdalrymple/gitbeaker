import { RequestHelper } from '../../../src/infrastructure';
import { ResourceAccessTokens } from '../../../src/templates';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ResourceAccessTokens;

beforeEach(() => {
  service = new ResourceAccessTokens('resource', {
    requesterFn: vi.fn(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Instantiating ResourceAccessTokens service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceAccessTokens);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceAccessTokens.all', () => {
  it('should call the correct url for getting all access requests with a string identifer', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/access_tokens', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should call the correct url for getting all access requests with a number identifer', async () => {
    await service.all(5);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/access_tokens', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceAccessTokens.create', () => {
  it('should call the correct url for creating access token with a string identifer', async () => {
    await service.create('5', 'test', ['api'], '2021-01-31');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/access_tokens', {
      body: {
        name: 'test',
        scopes: ['api'],
        expiresAt: '2021-01-31',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should call the correct url for creating access token with a number identifer', async () => {
    await service.create(5, 'test', ['api'], '2021-01-31');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/access_tokens', {
      body: {
        name: 'test',
        scopes: ['api'],
        expiresAt: '2021-01-31',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceAccessTokens.show', () => {
  it('should call the correct url with a string identifer', async () => {
    await service.show('5', '6');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/access_tokens/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should call the correct url for creating access token with a number identifer', async () => {
    await service.show(5, 6);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/access_tokens/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceAccessTokens.rotate', () => {
  it('should call the correct url with a string identifer', async () => {
    await service.rotate('5', '6');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/access_tokens/6/rotate', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should call the correct url for creating access token with a number identifer', async () => {
    await service.rotate(5, 6);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/access_tokens/6/rotate', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should take options', async () => {
    const options = { expiresAt: '2021-01-31' };

    await service.rotate('5', '6', options);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/access_tokens/6/rotate', {
      body: options,
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceAccessTokens.revoke', () => {
  it('should call the correct url with a string identifer', async () => {
    await service.revoke('5', '6');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/access_tokens/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should call the correct url for creating access token with a number identifer', async () => {
    await service.revoke(5, 6);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/access_tokens/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
