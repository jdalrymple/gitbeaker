import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { FeatureFlags } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: FeatureFlags;

beforeEach(() => {
  service = new FeatureFlags({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('FeatureFlags.all', () => {
  it('should request GET /projects/:id/feature_flags without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/feature_flags', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/feature_flags', async () => {
    await service.all(1, { scope: 'enabled' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/feature_flags', {
      maxPages: undefined,
      searchParams: { scope: 'enabled' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('FeatureFlags.create', () => {
  it('should request POST /projects/:id/feature_flags', async () => {
    await service.create(1, 'name', '1');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/feature_flags', {
      body: {
        version: '1',
        name: 'name',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('FeatureFlags.edit', () => {
  it('should request PUT /projects/:id/feature_flags/:flag_name', async () => {
    await service.edit(1, 'name', { description: 'test' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/feature_flags/name', {
      body: {
        description: 'test',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('FeatureFlags.remove', () => {
  it('should request DEL /projects/:id/feature_flags/:flag_name', async () => {
    await service.remove(1, 'name', { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/feature_flags/name', {
      showExpanded: undefined,
      sudo: 1,
    });
  });
});

describe('FeatureFlags.show', () => {
  it('should request GET /projects/:id/feature_flags/:flag_name', async () => {
    await service.show(1, 'name');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/feature_flags/name', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
