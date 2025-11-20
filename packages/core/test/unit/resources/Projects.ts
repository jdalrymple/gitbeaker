import { Projects } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock(
  '../../../src/infrastructure/RequestHelper',
  async () => {
    const mock = await vi.importActual('../../__mocks__/RequestHelper');
    return (mock as any).default;
  },
);

let service: Projects;

beforeEach(() => {
  service = new Projects({
    requesterFn: vi.fn(),
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

    const expectedFormData = new FormData();
    expectedFormData.append('name', 'test proj');
    expectedFormData.append('avatar', content, 'image.jpeg');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'projects', {
      body: expectedFormData,
      showExpanded: undefined,
      sudo: undefined,
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
      body: {
        body: {
          name: 'test proj 2',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request PUT /projects with ciDeletePipelinesInSeconds', async () => {
    await service.edit(12, { ciDeletePipelinesInSeconds: 3600 });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'projects/12', {
      body: {
        body: {
          ciDeletePipelinesInSeconds: 3600,
        },
        showExpanded: undefined,
        sudo: undefined,
      },
      showExpanded: undefined,
      sudo: undefined,
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
