import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupLDAPLinks } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupLDAPLinks;

beforeEach(() => {
  service = new GroupLDAPLinks({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupLDAPLinks.all', () => {
  it('should request GET /groups/:id/ldap_group_links', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/ldap_group_links', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupLDAPLinks.add', () => {
  it('should request POST /groups/:id/ldap_group_links', async () => {
    await service.add(1, 30, 'ldapmain', { cn: 'dev', memberRoleId: 4, sudo: 'u' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/ldap_group_links', {
      body: { cn: 'dev', memberRoleId: 4, groupAccess: 30, provider: 'ldapmain' },
      showExpanded: undefined,
      sudo: 'u',
    });
  });

  it('should support filter', async () => {
    await service.add(1, 30, 'ldapmain', { filter: '(a=b)' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/ldap_group_links', {
      body: { filter: '(a=b)', groupAccess: 30, provider: 'ldapmain' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupLDAPLinks.remove', () => {
  it('should request DELETE /groups/:id/ldap_group_links with body', async () => {
    await service.remove(1, 'ldapmain', { cn: 'dev' });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/1/ldap_group_links', {
      body: { cn: 'dev', provider: 'ldapmain' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should work without cn or filter', async () => {
    await service.remove(1, 'ldapmain');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/1/ldap_group_links', {
      body: { provider: 'ldapmain' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
