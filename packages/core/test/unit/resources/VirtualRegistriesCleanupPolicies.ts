import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { VirtualRegistriesCleanupPolicies } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: VirtualRegistriesCleanupPolicies;

beforeEach(() => {
  service = new VirtualRegistriesCleanupPolicies({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('VirtualRegistriesCleanupPolicies.show', () => {
  it('should request GET groups/1/-/virtual_registries/cleanup/policy', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/cleanup/policy',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('VirtualRegistriesCleanupPolicies.create', () => {
  it('should request POST groups/1/-/virtual_registries/cleanup/policy without options', async () => {
    await service.create(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/cleanup/policy',
      {
        body: {},
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should request POST groups/1/-/virtual_registries/cleanup/policy with options', async () => {
    await service.create(1, { cadence: 7, enabled: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/cleanup/policy',
      {
        body: { cadence: 7, enabled: true },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('VirtualRegistriesCleanupPolicies.edit', () => {
  it('should request PATCH groups/1/-/virtual_registries/cleanup/policy', async () => {
    await service.edit(1, { keep_n_days_after_download: 10 });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/cleanup/policy',
      {
        body: { keep_n_days_after_download: 10 },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('VirtualRegistriesCleanupPolicies.remove', () => {
  it('should request DEL groups/1/-/virtual_registries/cleanup/policy', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'groups/1/-/virtual_registries/cleanup/policy',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});
