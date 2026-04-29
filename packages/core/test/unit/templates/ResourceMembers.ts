import { RequestHelper } from '../../../src/infrastructure';
import { RequesterFn } from '@gitbeaker/requester-utils';
import { ResourceMembers } from '../../../src/templates';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ResourceMembers;

beforeEach(() => {
  service = new ResourceMembers('resource', {
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Instantiating ResourceMembers service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(ResourceMembers);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceMembers.add', () => {
  it('should call the correct url for adding a member with a resource id, user id and access level', async () => {
    await service.add('5', 10, { userId: 5 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '5/members', {
      body: { accessLevel: 10, userId: 5 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceMembers.all', () => {
  it('should call the correct url for getting all members for a resource', async () => {
    await service.all('5');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/members', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should call the correct url for getting all members for a resource including inherited ones', async () => {
    await service.all('5', { includeInherited: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/members/all', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceMembers.edit', () => {
  it('should call the correct url for editing a member with a resource id, user id and access level', async () => {
    await service.edit('5', 5, 10);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '5/members/5', {
      body: { accessLevel: 10 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceMembers.show', () => {
  it('should call the correct url for showing a member with a resource id, and user id', async () => {
    await service.show('5', 5);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/members/5', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should call the correct url for showing a member with a resource id, and user id, including inherited ones', async () => {
    await service.show('5', 5, { includeInherited: true });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '5/members/all/5', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ResourceMembers.remove', () => {
  it('should call the correct url for removing a member with a resource id, and user id', async () => {
    await service.remove('5', 5);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '5/members/5', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
