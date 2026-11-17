import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupSCIMIdentities } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupSCIMIdentities;

beforeEach(() => {
  service = new GroupSCIMIdentities({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupSCIMIdentities.all', () => {
  it('should request GET /groups/:id/scim/identities', async () => {
    await service.all(1, { perPage: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/scim/identities', {
      maxPages: undefined,
      searchParams: { perPage: 2 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupSCIMIdentities.edit', () => {
  it('should request PATCH /groups/:id/scim/:uid', async () => {
    await service.edit(1, 'uid', { externUid: 'new' } as any);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(service, 'groups/1/scim/uid', {
      body: { externUid: 'new' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupSCIMIdentities.show', () => {
  it('should request GET /groups/:id/scim/:uid', async () => {
    await service.show(1, 'uid');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/scim/uid', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupSCIMIdentities.remove', () => {
  it('should request DELETE /groups/:id/scim/:uid', async () => {
    await service.remove(1, 'uid');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/1/scim/uid', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
