import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { FeatureFlagUserLists } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: FeatureFlagUserLists;

beforeEach(() => {
  service = new FeatureFlagUserLists({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('FeatureFlagUserLists.all', () => {
  it('should request GET projects/1/feature_flags_user_lists without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/feature_flags_user_lists',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request GET projects/1/feature_flags_user_lists with options', async () => {
    await service.all(1, { search: 'string' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/feature_flags_user_lists',
      {
        maxPages: undefined,
        searchParams: { search: 'string' },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('FeatureFlagUserLists.create', () => {
  it('should request POST /projects/:id/feature_flags_user_lists', async () => {
    await service.create(1, 'name', 'xids');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/feature_flags_user_lists',
      {
        body: {
          name: 'name',
          userXids: 'xids',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('FeatureFlagUserLists.edit', () => {
  it('should request PUT /projects/:id/feature_flags_user_lists/:idd', async () => {
    await service.edit(1, 2, { name: 'test' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(
      service,
      'projects/1/feature_flags_user_lists/2',
      {
        body: {
          name: 'test',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('FeatureFlagUserLists.remove', () => {
  it('should request DEL /projects/:id/feature_flags_user_lists/:idd', async () => {
    await service.remove(1, 2, { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/feature_flags_user_lists/2',
      {
        showExpanded: undefined,
        sudo: 1,
      },
    );
  });
});

describe('FeatureFlags.show', () => {
  it('should request GET /projects/:id/feature_flags_user_lists/:idd', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/feature_flags_user_lists/2',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
