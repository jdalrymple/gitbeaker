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
    requestTimeout: 3000,
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

describe('Users.showCurrentUserPreferences', () => {
  it('should request GET users', async () => {
    await service.showCurrentUserPreferences();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/preferences', undefined);
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

describe('Users.showCurrentUser', () => {
  it('should request GET user', async () => {
    await service.showCurrentUser();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user', undefined);
  });
});

describe('Users.edit', () => {
  it('should request PUT users/:id', async () => {
    await service.edit(1, { name: 'Okoye' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'users/1', { name: 'Okoye' });
  });
});

describe('Users.allEvents', () => {
  it('should request GET users/:id/projects', async () => {
    await service.allEvents(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/events', undefined);
  });
});

describe('Users.show', () => {
  it('should request GET users/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1', undefined);
  });
});

describe('Users.remove', () => {
  it('should request DELETE users/:id', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'users/1', undefined);
  });
});

describe('Users.unblock', () => {
  it('should request POST users/:id/unblock', async () => {
    await service.unblock(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/unblock', undefined);
  });
});
