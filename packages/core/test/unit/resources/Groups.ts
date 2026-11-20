import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Groups } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Groups;

beforeEach(() => {
  service = new Groups({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Groups.all', () => {
  it('should request GET /groups', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Groups.create', () => {
  it('should request POST /groups', async () => {
    await service.create('test group', 'test-group');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups', {
      body: { name: 'test group', path: 'test-group' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /groups as formdata when avatar is passed', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });
    await service.create('test group', 'test-group', {
      avatar: { content, filename: 'image.jpeg' },
      sudo: 'user',
      showExpanded: true,
    });

    // The request options stay beside the body, they aren't sent as part of it
    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'groups', {
      body: expect.any(FormData),
      showExpanded: true,
      sudo: 'user',
    });

    const call = (RequestHelper.post() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      name: 'test group',
      path: 'test-group',
      avatar: expect.objectContaining({
        type: content.type,
        size: content.size,
      }),
    });
  });
});

describe('Groups.edit', () => {
  it('should request PUT /groups', async () => {
    await service.edit(12, { name: 'test group 2' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/12', {
      body: { name: 'test group 2' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /groups as formdata when avatar is passed', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });
    await service.edit(12, {
      name: 'test group 2',
      avatar: { content, filename: 'image.jpeg' },
      sudo: 'user',
      showExpanded: true,
    });

    // The request options stay beside the body, they aren't sent as part of it
    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'groups/12', {
      body: expect.any(FormData),
      showExpanded: true,
      sudo: 'user',
    });

    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      name: 'test group 2',
      avatar: expect.objectContaining({
        type: content.type,
        size: content.size,
      }),
    });
  });
});

describe('Groups.allProjects', () => {
  it('should request GET /groups/:id/projects', async () => {
    await service.allProjects(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/12/projects', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Groups.show', () => {
  it('should request GET /groups/:id', async () => {
    await service.show(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/12', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Groups.remove', () => {
  it('should request DEL /groups/:id', async () => {
    await service.remove(12);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'groups/12', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Groups.search', () => {
  it('should request GET /groups', async () => {
    await service.search('keywords');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups', {
      maxPages: undefined,
      searchParams: {
        search: 'keywords',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Groups.allDescendantGroups', () => {
  it('should request GET /groups/:id/descendant_groups', async () => {
    await service.allDescendantGroups(12, {});

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/12/descendant_groups', {
      searchParams: {},
    });
  });
});

describe('Groups.allSharedProjects', () => {
  it('should request GET /groups/:id/projects/shared', async () => {
    await service.allSharedProjects(12);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/12/projects/shared', {
      searchParams: {},
    });
  });
});

describe('Groups.allSubgroups', () => {
  it('should request GET /groups/:id/subgroups', async () => {
    await service.allSubgroups(12, { statistics: true, maxPages: 2 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/12/subgroups', {
      maxPages: 2,
      searchParams: { statistics: true },
    });
  });
});

describe('Groups.allProvisionedUsers', () => {
  it('should request GET /groups/:id/provisioned_users', async () => {
    await service.allProvisionedUsers(12);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/12/provisioned_users', {
      searchParams: {},
    });
  });
});

describe('Groups.allTransferLocations', () => {
  it('should request GET /groups/:id/transfer_locations', async () => {
    await service.allTransferLocations(12, { search: 'foo' });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/12/transfer_locations', {
      searchParams: { search: 'foo' },
    });
  });
});

describe('Groups.create with avatar', () => {
  it('should request POST /groups as formdata when avatar is passed', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.create('name', 'path', { avatar: { content, filename: 'image.jpeg' } });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'groups', {
      body: expect.any(FormData),
      showExpanded: undefined,
      sudo: undefined,
    });

    const call = (RequestHelper.post() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      name: 'name',
      path: 'path',
      avatar: expect.objectContaining({ type: content.type, size: content.size }),
    });
  });
});

describe('Groups.downloadAvatar', () => {
  it('should request GET /groups/:id/avatar', async () => {
    await service.downloadAvatar(12);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/12/avatar', {});
  });
});

describe('Groups.remove with options', () => {
  it('should send options as search params', async () => {
    await service.remove(12, { permanentlyRemove: true, fullPath: 'a/b' });

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'groups/12', {
      searchParams: { permanentlyRemove: true, fullPath: 'a/b' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Groups.removeAvatar', () => {
  it('should request PUT /groups/:id with empty avatar', async () => {
    await service.removeAvatar(12);

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'groups/12', {
      body: { avatar: '' },
    });
  });
});

describe('Groups.restore', () => {
  it('should request POST /groups/:id/restore', async () => {
    await service.restore(12);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'groups/12/restore', {});
  });
});

describe('Groups.share', () => {
  it('should request POST /groups/:id/share', async () => {
    await service.share(12, 13, 30, { expiresAt: '2030-01-01' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'groups/12/share', {
      body: { expiresAt: '2030-01-01', groupId: 13, groupAccess: 30 },
    });
  });
});

describe('Groups.transfer', () => {
  it('should request POST /groups/:id/transfer', async () => {
    await service.transfer(12, { groupId: 5 });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'groups/12/transfer', {
      body: { groupId: 5 },
    });
  });

  it('should send empty body without options', async () => {
    await service.transfer(12);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'groups/12/transfer', {
      body: {},
    });
  });
});

describe('Groups.transferProject', () => {
  it('should request POST /groups/:id/projects/:id', async () => {
    await service.transferProject(12, 7);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'groups/12/projects/7', {});
  });
});

describe('Groups.unshare', () => {
  it('should request DELETE /groups/:id/share/:id', async () => {
    await service.unshare(12, 13);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'groups/12/share/13', {});
  });
});

describe('Groups.uploadAvatar', () => {
  it('should request PUT /groups/:id/avatar as formdata', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.uploadAvatar(12, content, { filename: 'image.jpeg' });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'groups/12/avatar', {
      body: expect.any(FormData),
    });

    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      file: expect.objectContaining({ name: 'image.jpeg', size: content.size }),
    });
  });
});
