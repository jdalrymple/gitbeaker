import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupMemberRoles } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupMemberRoles;

beforeEach(() => {
  service = new GroupMemberRoles({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupMemberRoles.add', () => {
  it('should request POST /groups/:id/members', async () => {
    await service.add(1, 30, { readCode: true, sudo: 'u', showExpanded: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/members', {
      sudo: 'u',
      showExpanded: true,
      body: { readCode: true, baseAccessLevel: 30 },
    });
  });

  it('should work without options', async () => {
    await service.add(1, 30);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/members', {
      sudo: undefined,
      showExpanded: undefined,
      body: { baseAccessLevel: 30 },
    });
  });
});

describe('GroupMemberRoles.all', () => {
  it('should request GET /groups/:id/member_roles', async () => {
    await service.all(1, { maxPages: 2, perPage: 5, sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/member_roles', {
      sudo: 'u',
      showExpanded: true,
      maxPages: 2,
      searchParams: { perPage: 5 },
    });
  });
});

describe('GroupMemberRoles.remove', () => {
  it('should request DELETE /groups/:id/member_roles/:roleId', async () => {
    await service.remove('a/b', 3, { sudo: 'u', showExpanded: true });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/a%2Fb/member_roles/3', {
      sudo: 'u',
      showExpanded: true,
    });
  });
});
