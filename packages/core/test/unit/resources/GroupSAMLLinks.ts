import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GroupSAMLLinks } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: GroupSAMLLinks;

beforeEach(() => {
  service = new GroupSAMLLinks({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('GroupSAMLLinks.all', () => {
  it('should request GET /groups/:id/saml_group_links', async () => {
    await service.all(1, { maxPages: 2, perPage: 5, sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/saml_group_links', {
      sudo: 'u',
      showExpanded: true,
      maxPages: 2,
      searchParams: { perPage: 5 },
    });
  });
});

describe('GroupSAMLLinks.create', () => {
  it('should request POST /groups/:id/saml_group_links', async () => {
    await service.create(1, 'saml-group', 30, {
      memberRoleId: 4,
      provider: 'okta',
      sudo: 'u',
      showExpanded: true,
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/saml_group_links', {
      sudo: 'u',
      showExpanded: true,
      body: { memberRoleId: 4, provider: 'okta', accessLevel: 30, samlGroupName: 'saml-group' },
    });
  });

  it('should work without options', async () => {
    await service.create(1, 'g', 10);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups/1/saml_group_links', {
      sudo: undefined,
      showExpanded: undefined,
      body: { accessLevel: 10, samlGroupName: 'g' },
    });
  });
});

describe('GroupSAMLLinks.remove', () => {
  it('should request DELETE /groups/:id/saml_group_links/:name', async () => {
    await service.remove(1, 'my group', { provider: 'okta', sudo: 'u', showExpanded: true });

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'groups/1/saml_group_links/my%20group',
      { sudo: 'u', showExpanded: true, searchParams: { provider: 'okta' } },
    );
  });
});

describe('GroupSAMLLinks.show', () => {
  it('should request GET /groups/:id/saml_group_links/:name', async () => {
    await service.show(1, 'g', { provider: 'okta', sudo: 'u', showExpanded: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/1/saml_group_links/g', {
      sudo: 'u',
      showExpanded: true,
      searchParams: { provider: 'okta' },
    });
  });
});
