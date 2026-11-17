import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupSAMLIdentities } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupSAMLIdentities;

beforeEach(() => {
  service = new GroupSAMLIdentities({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupSAMLIdentities.all', () => {
  it('should request GET /groups/:id/saml/identities', async () => {
    await service.all(1, { perPage: 3, maxPages: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/saml/identities', {
      maxPages: 2,
      searchParams: { perPage: 3 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupSAMLIdentities.edit', () => {
  it('should request PATCH /groups/:id/saml/:identityId', async () => {
    await service.edit(1, 'uid1', { sudo: 'u' });

    expect(RequestHelper.patch()).toHaveBeenCalledWith(service, 'groups/1/saml/uid1', {
      body: {},
      showExpanded: undefined,
      sudo: 'u',
    });
  });
});

describe('GroupSAMLIdentities.show', () => {
  it('should request GET /groups/:id/saml/:uid', async () => {
    await service.show(1, 'uid1');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/saml/uid1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('GroupSAMLIdentities.remove', () => {
  it('should request DELETE /groups/:id/saml/:uid', async () => {
    await service.remove(1, 'uid1');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/1/saml/uid1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
