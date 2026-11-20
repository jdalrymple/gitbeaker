import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ContainerRegistryProtectionTagRules } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ContainerRegistryProtectionTagRules;

beforeEach(() => {
  service = new ContainerRegistryProtectionTagRules({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ContainerRegistryProtectionTagRules.all', () => {
  it('should request GET projects/1/registry/protection/tag/rules without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/protection/tag/rules',
      {
        maxPages: undefined,
        searchParams: {},
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should request GET projects/1/registry/protection/tag/rules with options', async () => {
    await service.all(1, { perPage: 5, maxPages: 2, sudo: 's' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/protection/tag/rules',
      {
        maxPages: 2,
        searchParams: { perPage: 5 },
        showExpanded: undefined,
        sudo: 's',
      },
    );
  });
});

describe('ContainerRegistryProtectionTagRules.create', () => {
  it('should request POST projects/1/registry/protection/tag/rules', async () => {
    await service.create(1, 'v*', 'maintainer', 'owner');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/protection/tag/rules',
      {
        body: {
          tagNamePattern: 'v*',
          minimumAccessLevelForPush: 'maintainer',
          minimumAccessLevelForDelete: 'owner',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ContainerRegistryProtectionTagRules.edit', () => {
  it('should request PATCH projects/1/registry/protection/tag/rules/2 with options', async () => {
    await service.edit(1, 2, { tagNamePattern: 'x', minimumAccessLevelForPush: 'admin' });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/protection/tag/rules/2',
      {
        body: { tagNamePattern: 'x', minimumAccessLevelForPush: 'admin' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should request PATCH projects/1/registry/protection/tag/rules/2 without options', async () => {
    await service.edit(1, 2);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/protection/tag/rules/2',
      {
        body: {},
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('ContainerRegistryProtectionTagRules.remove', () => {
  it('should request DEL projects/1/registry/protection/tag/rules/2', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/protection/tag/rules/2',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
