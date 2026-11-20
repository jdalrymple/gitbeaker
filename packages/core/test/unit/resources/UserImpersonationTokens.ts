import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UserImpersonationTokens } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: UserImpersonationTokens;

beforeEach(() => {
  service = new UserImpersonationTokens({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('UserImpersonationTokens.all', () => {
  it('should request GET /users/1/impersonation_tokens', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/impersonation_tokens', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /users/1/impersonation_tokens with options', async () => {
    await service.all(1, { state: 'active' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/impersonation_tokens', {
      maxPages: undefined,
      searchParams: { state: 'active' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserImpersonationTokens.create', () => {
  it('should request POST /users/1/impersonation_tokens', async () => {
    await service.create(1, 'tok', ['api']);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/impersonation_tokens', {
      body: { name: 'tok', scopes: ['api'] },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /users/1/impersonation_tokens with options', async () => {
    await service.create(1, 'tok', ['api'], { expiresAt: '2030-01-01', description: 'd' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/impersonation_tokens', {
      body: { name: 'tok', scopes: ['api'], expiresAt: '2030-01-01', description: 'd' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserImpersonationTokens.show', () => {
  it('should request GET /users/1/impersonation_tokens/2', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/impersonation_tokens/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserImpersonationTokens.remove', () => {
  it('should request DEL /users/1/impersonation_tokens/2', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'users/1/impersonation_tokens/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserImpersonationTokens.revoke', () => {
  it('should request DEL /users/1/impersonation_tokens/2', async () => {
    await service.revoke(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'users/1/impersonation_tokens/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
