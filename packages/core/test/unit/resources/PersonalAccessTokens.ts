import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PersonalAccessTokens } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: PersonalAccessTokens;

beforeEach(() => {
  service = new PersonalAccessTokens({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('PersonalAccessTokens.all', () => {
  it('should request GET /personal_access_tokens', async () => {
    await service.all({ search: 'x' } as any);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'personal_access_tokens', {
      maxPages: undefined,
      searchParams: { search: 'x' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PersonalAccessTokens.create', () => {
  it('should request POST /user/personal_access_tokens without userId', async () => {
    await service.create('name', ['api'], { expiresAt: '2030-01-01' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'user/personal_access_tokens', {
      body: { expiresAt: '2030-01-01', name: 'name', scopes: ['api'] },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /users/:id/personal_access_tokens with userId', async () => {
    await service.create('name', ['api'], { userId: 5 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/5/personal_access_tokens', {
      body: { name: 'name', scopes: ['api'] },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PersonalAccessTokens.remove', () => {
  it('should request DELETE /personal_access_tokens/self without tokenId', async () => {
    await service.remove();

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'personal_access_tokens/self', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request DELETE /personal_access_tokens/:id with tokenId', async () => {
    await service.remove({ tokenId: 3 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'personal_access_tokens/3', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PersonalAccessTokens.rotate', () => {
  it('should request POST /personal_access_tokens/:id/rotate', async () => {
    await service.rotate(3, { expiresAt: '2030-01-01' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'personal_access_tokens/3/rotate', {
      body: { expiresAt: '2030-01-01' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should support self', async () => {
    await service.rotate('self');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'personal_access_tokens/self/rotate',
      { body: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('PersonalAccessTokens.show', () => {
  it('should request GET /personal_access_tokens/self without tokenId', async () => {
    await service.show();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'personal_access_tokens/self', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /personal_access_tokens/:id with tokenId', async () => {
    await service.show({ tokenId: 3 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'personal_access_tokens/3', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('PersonalAccessTokens.allAssociations', () => {
  it('should request GET /personal_access_tokens/self/associations', async () => {
    await service.allAssociations({ minAccessLevel: 30 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'personal_access_tokens/self/associations',
      {
        maxPages: undefined,
        searchParams: { minAccessLevel: 30 },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
