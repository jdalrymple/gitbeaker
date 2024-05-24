import { Users } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
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

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/activate', undefined);
  });
});

describe('Users.approve', () => {
  it('should request POST users/:id/approve', async () => {
    await service.approve(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/approve', undefined);
  });
});

describe('Users.all', () => {
  it('should request GET users', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users', undefined);
  });
});

describe('Users.allActivities', () => {
  it('should request GET users', async () => {
    await service.allActivities();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/activities', undefined);
  });
});

describe('Users.allMemberships', () => {
  it('should request GET users/:user_id/memberships', async () => {
    await service.allMemberships(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/memberships', undefined);
  });
});

describe('Users.allFollowing', () => {
  it('should request GET users/:user_id/following', async () => {
    await service.allFollowing(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/following', undefined);
  });
});

describe('Users.allFollowers', () => {
  it('should request GET users/:user_id/followers', async () => {
    await service.allFollowers(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/followers', undefined);
  });
});

describe('Users.allProjects', () => {
  it('should request GET users/:id/projects', async () => {
    await service.allProjects(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/projects', undefined);
  });
});

describe('Users.allEvents', () => {
  it('should request GET users/:id/projects', async () => {
    await service.allEvents(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/events', undefined);
  });
});

describe('Users.allContributedProjects', () => {
  it('should request GET users/:id/contributed_projects', async () => {
    await service.allContributedProjects(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'users/1/contributed_projects',
      undefined,
    );
  });
});

describe('Users.allStarredProjects', () => {
  it('should request GET users/:id/starred_projects', async () => {
    await service.allStarredProjects(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'users/1/starred_projects',
      undefined,
    );
  });
});

describe('Users.ban', () => {
  it('should request POST users/:id/ban', async () => {
    await service.ban(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/ban', undefined);
  });
});

describe('Users.block', () => {
  it('should request POST users/:id/block', async () => {
    await service.block(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/block', undefined);
  });
});

describe('Users.create', () => {
  it('should request POST users/:id/block', async () => {
    await service.create({ name: "T'chala" });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users', { name: "T'chala" });
  });
});

describe('Users.createPersonalAccessToken', () => {
  it('should request POST users/:id/personal_access_tokens', async () => {
    await service.createPersonalAccessToken(1, 'token', ['test'], { expiresAt: '10' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/personal_access_tokens', {
      name: 'token',
      scopes: ['test'],
      expiresAt: '10',
    });
  });
});

describe('Users.createCIRunner', () => {
  it('should request POST users/:id/runners', async () => {
    await service.createCIRunner('instance_type');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'user/runners', {
      runnerType: 'instance_type',
    });
  });
});

describe('Users.deactivate', () => {
  it('should request POST users/:id/deactivate', async () => {
    await service.deactivate(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/deactivate', undefined);
  });
});

describe('Users.disableTwoFactor', () => {
  it('should request PATCH users/:id/disable_two_factor', async () => {
    await service.disableTwoFactor(1);

    expect(RequestHelper.patch()).toHaveBeenCalledWith(
      service,
      'users/1/disable_two_factor',
      undefined,
    );
  });
});

describe('Users.edit', () => {
  it('should request PUT users/:id', async () => {
    await service.edit(1, { name: 'Okoye' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'users/1', { name: 'Okoye' });
  });
});

describe('Users.editStatus', () => {
  it('should request PUT users/:id', async () => {
    await service.editStatus({ message: 'my message' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'user/status', {
      message: 'my message',
    });
  });
});

describe('Users.editCurrentUserPreferences', () => {
  it('should request PUT user/preferences', async () => {
    await service.editCurrentUserPreferences(true, false);

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'user/preferences', {
      viewDiffsFileByFile: true,
      showWhitespaceInDiffs: false,
    });
  });
});

describe('Users.follow', () => {
  it('should request POST users/:id/follow', async () => {
    await service.follow(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/follow', undefined);
  });
});

describe('Users.reject', () => {
  it('should request POST users/:id/reject', async () => {
    await service.reject(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/reject', undefined);
  });
});

describe('Users.show', () => {
  it('should request GET users/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1', undefined);
  });
});

describe('Users.showCount', () => {
  it('should request GET user_counts', async () => {
    await service.showCount();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user_counts', undefined);
  });
});

describe('Users.showAssociationsCount', () => {
  it('should request GET users/:id/associations_count', async () => {
    await service.showAssociationsCount(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'users/1/associations_count',
      undefined,
    );
  });
});

describe('Users.showCurrentUser', () => {
  it('should request GET user', async () => {
    await service.showCurrentUser();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user', undefined);
  });
});

describe('Users.showCurrentUserPreferences', () => {
  it('should request GET users', async () => {
    await service.showCurrentUserPreferences();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/preferences', undefined);
  });
});

describe('Users.showStatus', () => {
  it('should request GET user/status', async () => {
    await service.showStatus();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/status', {});
  });

  it('should request GET users/:id/status', async () => {
    await service.showStatus({ iDOrUsername: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/status', {});
  });
});

describe('Users.remove', () => {
  it('should request DELETE users/:id', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'users/1', undefined);
  });
});

describe('Users.removeAuthenticationIdentity', () => {
  it('should request DELETE users/:id/identities/:provider', async () => {
    await service.removeAuthenticationIdentity(1, 'prov');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'users/1/identities/prov', undefined);
  });
});

describe('Users.unban', () => {
  it('should request POST users/:id/unban', async () => {
    await service.unban(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/unban', undefined);
  });
});

describe('Users.unblock', () => {
  it('should request POST users/:id/unblock', async () => {
    await service.unblock(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/unblock', undefined);
  });
});

describe('Users.unfollow', () => {
  it('should request POST users/:id/unfollow', async () => {
    await service.unfollow(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/unfollow', undefined);
  });
});
