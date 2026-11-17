import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ContainerRepositoryProtectionRules } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ContainerRepositoryProtectionRules;

beforeEach(() => {
  service = new ContainerRepositoryProtectionRules({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ContainerRepositoryProtectionRules.all', () => {
  it('should request GET /projects/1/registry/protection/repository/rules', async () => {
    await service.all(1, { perPage: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/protection/repository/rules',
      {
        sudo: undefined,
        showExpanded: undefined,
        maxPages: undefined,
        searchParams: { perPage: 2 },
      },
    );
  });
});

describe('ContainerRepositoryProtectionRules.create', () => {
  it('should request POST /projects/1/registry/protection/repository/rules', async () => {
    await service.create(1, 'path/*', { minimumAccessLevelForPush: 'owner' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/protection/repository/rules',
      {
        sudo: undefined,
        showExpanded: undefined,
        searchParams: { minimumAccessLevelForPush: 'owner', repositoryPathPattern: 'path/*' },
      },
    );
  });
});

describe('ContainerRepositoryProtectionRules.edit', () => {
  it('should request PATCH /projects/1/registry/protection/repository/rules/2', async () => {
    await service.edit(1, 2, { minimumAccessLevelForDelete: 'admin' });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/protection/repository/rules/2',
      {
        sudo: undefined,
        showExpanded: undefined,
        searchParams: { minimumAccessLevelForDelete: 'admin' },
      },
    );
  });
});

describe('ContainerRepositoryProtectionRules.remove', () => {
  it('should request DELETE /projects/1/registry/protection/repository/rules/2', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/protection/repository/rules/2',
      {
        sudo: undefined,
        showExpanded: undefined,
      },
    );
  });
});
