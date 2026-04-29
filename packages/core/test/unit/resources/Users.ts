import { Users } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: Users;

beforeEach(() => {
  service = new Users({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Users.activate', () => {
  it('should request POST users/:id/activate', async () => {
    await service.activate(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/activate', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.approve', () => {
  it('should request POST users/:id/approve', async () => {
    await service.approve(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/approve', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.all', () => {
  it('should request GET users', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.allActivities', () => {
  it('should request GET users', async () => {
    await service.allActivities();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/activities', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.allMemberships', () => {
  it('should request GET users/:user_id/memberships', async () => {
    await service.allMemberships(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/memberships', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.allFollowing', () => {
  it('should request GET users/:user_id/following', async () => {
    await service.allFollowing(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/following', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.allFollowers', () => {
  it('should request GET users/:user_id/followers', async () => {
    await service.allFollowers(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/followers', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.allProjects', () => {
  it('should request GET users/:id/projects', async () => {
    await service.allProjects(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/projects', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.allEvents', () => {
  it('should request GET users/:id/projects', async () => {
    await service.allEvents(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/events', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.allContributedProjects', () => {
  it('should request GET users/:id/contributed_projects', async () => {
    await service.allContributedProjects(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/contributed_projects', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.allStarredProjects', () => {
  it('should request GET users/:id/starred_projects', async () => {
    await service.allStarredProjects(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/starred_projects', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.ban', () => {
  it('should request POST users/:id/ban', async () => {
    await service.ban(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/ban', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.block', () => {
  it('should request POST users/:id/block', async () => {
    await service.block(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/block', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.create', () => {
  it('should request POST users/:id/block', async () => {
    await service.create({ name: "T'chala" });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users', {
      body: { name: "T'chala" },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.createPersonalAccessToken', () => {
  it('should request POST users/:id/personal_access_tokens', async () => {
    await service.createPersonalAccessToken(1, 'token', ['test'], { expiresAt: '10' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/personal_access_tokens', {
      body: {
        name: 'token',
        scopes: ['test'],
        expiresAt: '10',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.createCIRunner', () => {
  it('should request POST users/:id/runners', async () => {
    await service.createCIRunner('instance_type');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'user/runners', {
      body: {
        runnerType: 'instance_type',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.deactivate', () => {
  it('should request POST users/:id/deactivate', async () => {
    await service.deactivate(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/deactivate', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.disableTwoFactor', () => {
  it('should request PATCH users/:id/disable_two_factor', async () => {
    await service.disableTwoFactor(1);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(service, 'users/1/disable_two_factor', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.edit', () => {
  it('should request PUT users/:id', async () => {
    await service.edit(1, { name: 'Okoye' });

    expect(RequestHelper.put()).toHaveBeenLastCalledWith(service, 'users/1', {
      body: { name: 'Okoye' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.editStatus', () => {
  it('should request PUT users/:id', async () => {
    await service.editStatus({ message: 'my message' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'user/status', {
      body: {
        message: 'my message',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.editCurrentUserPreferences', () => {
  it('should request PUT user/preferences', async () => {
    await service.editCurrentUserPreferences(true, false);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'user/preferences', {
      body: {
        viewDiffsFileByFile: true,
        showWhitespaceInDiffs: false,
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.follow', () => {
  it('should request POST users/:id/follow', async () => {
    await service.follow(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/follow', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.reject', () => {
  it('should request POST users/:id/reject', async () => {
    await service.reject(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/reject', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.show', () => {
  it('should request GET users/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.showCount', () => {
  it('should request GET user_counts', async () => {
    await service.showCount();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user_counts', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.showAssociationsCount', () => {
  it('should request GET users/:id/associations_count', async () => {
    await service.showAssociationsCount(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/associations_count', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.showCurrentUser', () => {
  it('should request GET user', async () => {
    await service.showCurrentUser();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.showCurrentUserPreferences', () => {
  it('should request GET users', async () => {
    await service.showCurrentUserPreferences();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/preferences', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.showStatus', () => {
  it('should request GET user/status', async () => {
    await service.showStatus();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/status', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET users/:id/status', async () => {
    await service.showStatus({ iDOrUsername: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/status', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.remove', () => {
  it('should request DELETE users/:id', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'users/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.removeAuthenticationIdentity', () => {
  it('should request DELETE users/:id/identities/:provider', async () => {
    await service.removeAuthenticationIdentity(1, 'prov');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'users/1/identities/prov', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.unban', () => {
  it('should request POST users/:id/unban', async () => {
    await service.unban(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/unban', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.unblock', () => {
  it('should request POST users/:id/unblock', async () => {
    await service.unblock(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/unblock', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Users.unfollow', () => {
  it('should request POST users/:id/unfollow', async () => {
    await service.unfollow(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/unfollow', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
