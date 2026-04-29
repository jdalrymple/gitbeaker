import { DeployTokens } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';
import { RequesterFn } from '@gitbeaker/requester-utils';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: DeployTokens;

beforeEach(() => {
  service = new DeployTokens({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('DeployTokens.create', () => {
  it('should request POST groups/5/deploy_tokens with a name and scopes', async () => {
    await service.create('token', ['read_repository'], { groupId: 5 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/5/deploy_tokens', {
      body: {
        name: 'token',
        scopes: ['read_repository'],
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST projects/5/deploy_tokens with a name and scopes', async () => {
    await service.create('token', ['read_repository'], { projectId: 5 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/5/deploy_tokens', {
      body: {
        name: 'token',
        scopes: ['read_repository'],
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST projects/5/deploy_tokens with name, scopes, and username if passed', async () => {
    await service.create('token', ['read_repository'], { projectId: 5, username: 'mr-smith' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/5/deploy_tokens', {
      body: {
        name: 'token',
        scopes: ['read_repository'],
        username: 'mr-smith',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST projects/5/deploy_tokens with name, scopes, and date if passed', async () => {
    await service.create('token', ['read_repository'], {
      projectId: 5,
      expires_at: '1975-08-19T22:15:30.000Z',
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/5/deploy_tokens', {
      body: {
        name: 'token',
        scopes: ['read_repository'],
        expires_at: '1975-08-19T22:15:30.000Z',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('DeployTokens.all', () => {
  it('should request GET /deploy_tokens', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'deploy_tokens', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET groups/5/deploy_tokens with groupId', async () => {
    await service.all({ groupId: 5 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/5/deploy_tokens', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET projects/5/deploy_tokens with projectId', async () => {
    await service.all({ projectId: 5 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/5/deploy_tokens', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('DeployTokens.remove', () => {
  it('should throw an error when attempting to delete a deploy_key without specifying the groupId or projectId', () => {
    expect(() => service.remove(6)).toThrow(
      'Missing required argument. Please supply a projectId or groupId in the options parameter.',
    );
  });

  it('should request DEL groups/5/deploy_tokens with groupId', async () => {
    await service.remove(6, { groupId: 5 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/5/deploy_tokens/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request DEL projects/5/deploy_tokens with projectId', async () => {
    await service.remove(6, { projectId: 5 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/5/deploy_tokens/6', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
