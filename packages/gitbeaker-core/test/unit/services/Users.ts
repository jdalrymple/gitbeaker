import { Users } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';
import { mockRequesterFn } from '../../mocks/requesterFn';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: Users;

beforeEach(() => {
  service = new Users({
    requesterFn: mockRequesterFn,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Users service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Users);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Users.all', () => {
  it('should request GET users', async () => {
    await service.all();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'users', undefined);
  });
});

describe('Users.activities', () => {
  it('should request GET users', async () => {
    await service.activities();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'users/activities', undefined);
  });
});

describe('Users.projects', () => {
  it('should request GET users/:id/projects', async () => {
    await service.projects(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'users/1/projects', undefined);
  });
});

describe('Users.block', () => {
  it('should request POST users/:id/block', async () => {
    await service.block(1);

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'users/1/block', undefined);
  });
});

describe('Users.create', () => {
  it('should request POST users/:id/block', async () => {
    await service.create({ name: "T'chala" });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'users', { name: "T'chala" });
  });
});

describe('Users.current', () => {
  it('should request GET user', async () => {
    await service.current();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'user', undefined);
  });
});

describe('Users.edit', () => {
  it('should request PUT users/:id', async () => {
    await service.edit(1, { name: 'Okoye' });

    expect(RequestHelper.put).toHaveBeenCalledWith(service, 'users/1', { name: 'Okoye' });
  });
});

describe('Users.events', () => {
  it('should request GET users/:id/projects', async () => {
    await service.events(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'users/1/events', undefined);
  });
});

describe('Users.search', () => {
  it('should request GET users', async () => {
    await service.search('Erik Killmonger');

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'users', { search: 'Erik Killmonger' });
  });
});

describe('Users.show', () => {
  it('should request GET users/:id', async () => {
    await service.show(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'users/1', undefined);
  });
});

describe('Users.remove', () => {
  it('should request DELETE users/:id', async () => {
    await service.remove(1);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'users/1', undefined);
  });
});

describe('Users.unblock', () => {
  it('should request POST users/:id/unblock', async () => {
    await service.unblock(1);

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'users/1/unblock', undefined);
  });
});
