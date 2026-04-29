import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DeployKeys } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: DeployKeys;

beforeEach(() => {
  service = new DeployKeys({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('DeployKeys.add', () => {
  it('should request POST /projects/:id/deploy_keys', async () => {
    await service.create(1, 'title', 'key');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/deploy_keys', {
      body: {
        title: 'title',
        key: 'key',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('DeployKeys.all', () => {
  it('should request GET /deploy_keys', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'deploy_keys', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/deploy_keys', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/deploy_keys', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('DeployKeys.edit', () => {
  it('should request PUT /projects/:id/deploy_keys/:key', async () => {
    await service.edit(1, 2, { title: 'title' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/deploy_keys/2', {
      body: {
        title: 'title',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('DeployKeys.show', () => {
  it('should request GET /projects/:id/deploy_keys/:key', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/deploy_keys/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('DeployKeys.remove', () => {
  it('should request DEL /projects/:id/deploy_keys/:key', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/deploy_keys/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
