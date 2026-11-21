import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Projects } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: Projects;

beforeEach(() => {
  service = new Projects({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('Projects.all', () => {
  it('should request GET /projects', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.allTransferLocations', () => {
  it('should request GET /projects/2/transfer_locations', async () => {
    await service.allTransferLocations(2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/2/transfer_locations', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.allUsers', () => {
  it('should request GET /projects/2/users', async () => {
    await service.allUsers(2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/2/users', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.allGroups', () => {
  it('should request GET /projects/2/groups', async () => {
    await service.allGroups(2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/2/groups', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.allInvitedGroups', () => {
  it('should request GET /projects/2/invited_groups', async () => {
    await service.allInvitedGroups(2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/2/invited_groups', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.allSharableGroups', () => {
  it('should request GET /projects/2/groups', async () => {
    await service.allSharableGroups(2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/2/share_locations', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.allForks', () => {
  it('should request GET /projects/2/forks', async () => {
    await service.allForks(2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/2/forks', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.allStarrers', () => {
  it('should request GET /projects/2/starrers', async () => {
    await service.allStarrers(2);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/2/starrers', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.allStoragePaths', () => {
  it('should request GET /projects/2/storage', async () => {
    await service.allStoragePaths(2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/2/storage', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.archive', () => {
  it('should request POST /projects/:id/archive', async () => {
    await service.archive(12);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/12/archive', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /projects/:id/archive with sudo', async () => {
    await service.archive(12, { sudo: 2 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/12/archive', {
      showExpanded: undefined,
      sudo: 2,
    });
  });
});

describe('Projects.create', () => {
  it('should request POST /projects when userId undefined', async () => {
    await service.create({ name: 'test proj' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects', {
      body: {
        name: 'test proj',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /projects/user/:id when userId defined', async () => {
    await service.create({ userId: 2, name: 'test proj' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/user/2', {
      body: {
        name: 'test proj',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST /projects as formdata when avatar is passed', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });
    const avatar = { content, filename: 'image.jpeg' };
    await service.create({ name: 'test proj', avatar });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects',
      expect.objectContaining({
        body: expect.any(FormData),
        showExpanded: undefined,
        sudo: undefined,
      }),
    );

    // Verify FormData contents
    const call = (RequestHelper.post() as any).mock.calls.slice(-1)[0];
    const formData = call[2].body as FormData;
    const formDataObj = Object.fromEntries(formData.entries());
    expect(formDataObj).toEqual({
      name: 'test proj',
      avatar: expect.objectContaining({
        type: content.type,
        size: content.size,
      }),
    });
  });
});

describe('Projects.createForkRelationship', () => {
  it('should request POST /projects/:id/fork/:idd', async () => {
    await service.createForkRelationship(1, 2);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/fork/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.edit', () => {
  it('should request PUT /projects', async () => {
    await service.edit(12, { name: 'test proj 2' });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/12', {
      body: { name: 'test proj 2' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /projects with ciDeletePipelinesInSeconds', async () => {
    await service.edit(12, { ciDeletePipelinesInSeconds: 3600 });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/12', {
      body: { ciDeletePipelinesInSeconds: 3600 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /projects as formdata when avatar is passed', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });
    await service.edit(12, {
      name: 'test proj 2',
      avatar: { content, filename: 'image.jpeg' },
      sudo: 'user',
      showExpanded: true,
    });

    // The request options stay beside the body, they aren't sent as part of it
    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/12', {
      body: expect.any(FormData),
      showExpanded: true,
      sudo: 'user',
    });

    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      name: 'test proj 2',
      avatar: expect.objectContaining({
        type: content.type,
        size: content.size,
      }),
    });
  });
});

describe('Projects.fork', () => {
  it('should request POST /projects/:id/fork', async () => {
    await service.fork(12);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/12/fork', {
      body: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.createPullMirror', () => {
  it('should request POST projects/1/mirror/pull', async () => {
    await service.createPullMirror(1, 'https://x.git', true);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/mirror/pull', {
      body: { importUrl: 'https://x.git', mirror: true },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.downloadSnapshot', () => {
  it('should request GET projects/1/snapshot', async () => {
    await service.downloadSnapshot(1, { wiki: true });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/snapshot', {
      searchParams: { wiki: true },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.housekeeping', () => {
  it('should request POST projects/1/housekeeping', async () => {
    await service.housekeeping(1, { task: 'prune' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/housekeeping', {
      body: { task: 'prune' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.importProjectMembers', () => {
  it('should request POST projects/1/import_project_members/2', async () => {
    await service.importProjectMembers(1, 2);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(
      service,
      'projects/1/import_project_members/2',
      {
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });
});

describe('Projects.remove', () => {
  it('should request DEL projects/1', async () => {
    await service.remove(1, { permanentlyRemove: true, fullPath: 'a/b' });

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'projects/1', {
      searchParams: { permanentlyRemove: true, fullPath: 'a/b' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.removeForkRelationship', () => {
  it('should request DEL projects/1/fork', async () => {
    await service.removeForkRelationship(1);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'projects/1/fork', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.removeAvatar', () => {
  it('should request PUT projects/1', async () => {
    await service.removeAvatar(1);

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/1', {
      body: { avatar: '' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.restore', () => {
  it('should request POST projects/1/restore', async () => {
    await service.restore(1);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/restore', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.search', () => {
  it('should request GET projects', async () => {
    await service.search('proj', { sort: 'asc', orderBy: 'name' });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects', {
      searchParams: { sort: 'asc', orderBy: 'name', search: 'proj' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.share', () => {
  it('should request POST projects/1/share', async () => {
    await service.share(1, 2, 30, { expiresAt: '2030-01-01' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/share', {
      body: { expiresAt: '2030-01-01', groupId: 2, groupAccess: 30 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.show', () => {
  it('should request GET projects/1', async () => {
    await service.show(1, { statistics: true });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1', {
      searchParams: { statistics: true },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.showLanguages', () => {
  it('should request GET projects/1/languages', async () => {
    await service.showLanguages(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/languages', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.showPullMirror', () => {
  it('should request GET projects/1/mirror/pull', async () => {
    await service.showPullMirror(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/mirror/pull', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.star', () => {
  it('should request POST projects/1/star', async () => {
    await service.star(1);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/star', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.transfer', () => {
  it('should request PUT projects/1/transfer', async () => {
    await service.transfer(1, 5);

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/1/transfer', {
      body: { namespace: 5 },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.unarchive', () => {
  it('should request POST projects/1/unarchive', async () => {
    await service.unarchive(1);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/unarchive', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.unshare', () => {
  it('should request DEL projects/1/share/2', async () => {
    await service.unshare(1, 2);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'projects/1/share/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.unstar', () => {
  it('should request POST projects/1/unstar', async () => {
    await service.unstar(1);

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/unstar', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Projects.uploadForReference', () => {
  it('should request POST projects/1/uploads with formdata', async () => {
    const content = new Blob(['file'], { type: 'text/plain' });

    await service.uploadForReference(1, { content, filename: 'a.txt' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects/1/uploads', {
      body: expect.any(FormData),
      showExpanded: undefined,
      sudo: undefined,
    });

    const call = (RequestHelper.post() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      file: expect.objectContaining({ type: content.type, size: content.size }),
    });
  });
});

describe('Projects.uploadAvatar', () => {
  it('should request PUT projects/1 with formdata', async () => {
    const content = new Blob(['image'], { type: 'image/jpeg' });

    await service.uploadAvatar(1, { content, filename: 'image.jpeg' });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/1', {
      body: expect.any(FormData),
      showExpanded: undefined,
      sudo: undefined,
    });

    const call = (RequestHelper.put() as any).mock.calls.slice(-1)[0];
    const formDataObj = Object.fromEntries((call[2].body as FormData).entries());
    expect(formDataObj).toEqual({
      avatar: expect.objectContaining({ type: content.type, size: content.size }),
    });
  });
});
