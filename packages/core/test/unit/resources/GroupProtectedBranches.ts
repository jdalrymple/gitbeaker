import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupProtectedBranches } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupProtectedBranches;

beforeEach(() => {
  service = new GroupProtectedBranches({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupProtectedBranches.all', () => {
  it('should request GET groups/1/protected_branches without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/protected_branches', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET groups/1/protected_branches with search', async () => {
    await service.all(1, { search: 'x', maxPages: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/protected_branches', {
      maxPages: 2,
      searchParams: { search: 'x' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupProtectedBranches.show', () => {
  it('should request GET groups/1/protected_branches/main', async () => {
    await service.show(1, 'main');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/protected_branches/main', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET groups/1/protected_branches/feature%2Fx with encoded name', async () => {
    await service.show(1, 'feature/x');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'groups/1/protected_branches/feature%2Fx',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('GroupProtectedBranches.create', () => {
  it('should request POST groups/1/protected_branches without options', async () => {
    await service.create(1, 'main');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/protected_branches', {
      body: { name: 'main' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST groups/1/protected_branches with options', async () => {
    await service.create(1, 'main', { allowForcePush: true, pushAccessLevel: 40 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/protected_branches', {
      body: { allowForcePush: true, pushAccessLevel: 40, name: 'main' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupProtectedBranches.edit', () => {
  it('should request PATCH groups/1/protected_branches/main', async () => {
    await service.edit(1, 'main', { allowForcePush: false });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'groups/1/protected_branches/main',
      {
        body: { allowForcePush: false },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('GroupProtectedBranches.remove', () => {
  it('should request DEL groups/1/protected_branches/main', async () => {
    await service.remove(1, 'main');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/1/protected_branches/main', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
