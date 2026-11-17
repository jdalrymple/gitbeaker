import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupEnterpriseUsers } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupEnterpriseUsers;

beforeEach(() => {
  service = new GroupEnterpriseUsers({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupEnterpriseUsers.all', () => {
  it('should request GET /groups/1/enterprise_users', async () => {
    await service.all(1, { search: 'bob', twoFactor: 'enabled' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/enterprise_users', {
      sudo: undefined,
      showExpanded: undefined,
      maxPages: undefined,
      searchParams: { search: 'bob', twoFactor: 'enabled' },
    });
  });
});

describe('GroupEnterpriseUsers.show', () => {
  it('should request GET /groups/1/enterprise_users/2', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/enterprise_users/2', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('GroupEnterpriseUsers.edit', () => {
  it('should request PATCH /groups/1/enterprise_users/2', async () => {
    await service.edit(1, 2, { name: 'n', email: 'e@x.com' });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(service, 'groups/1/enterprise_users/2', {
      sudo: undefined,
      showExpanded: undefined,
      body: { name: 'n', email: 'e@x.com' },
    });
  });
});

describe('GroupEnterpriseUsers.remove', () => {
  it('should request DELETE /groups/1/enterprise_users/2', async () => {
    await service.remove(1, 2, { hardDelete: true });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/1/enterprise_users/2', {
      sudo: undefined,
      showExpanded: undefined,
      body: { hardDelete: true },
    });
  });
});

describe('GroupEnterpriseUsers.disableTwoFactor', () => {
  it('should request PATCH /groups/1/enterprise_users/2/disable_two_factor', async () => {
    await service.disableTwoFactor(1, 2);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'groups/1/enterprise_users/2/disable_two_factor',
      {
        sudo: undefined,
        showExpanded: undefined,
      },
    );
  });
});
