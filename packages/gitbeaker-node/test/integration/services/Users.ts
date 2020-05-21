import { Users } from '../../../src';

let service;

beforeEach(() => {
  service = new Users({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
});

describe('Users.current', () => {
  it('should get current user', async () => {
    const u = await service.current();

    expect(u).toBeInstanceOf(Object);
    expect(u.name).toEqual('admin');
    expect(u.is_admin).toBeTruthy();
  });
});

describe('Users.all', () => {
  it('should get all users', async () => {
    const users = await service.all();

    expect(users).toBeInstanceOf(Array);
  });
});

describe('Users.search', () => {
  it('should search for a specific user', async () => {
    const users = await service.search('admin');
    const user = users.find((u) => u.name === 'admin');

    expect(users).toBeInstanceOf(Array);
    expect(user).toBeObject();
  });
});

describe('Users.show', () => {
  it('should get a user', async () => {
    const u = await service.current();
    const us = await service.show(u.id);

    expect(us.id).toBe(u.id);
  });
});
