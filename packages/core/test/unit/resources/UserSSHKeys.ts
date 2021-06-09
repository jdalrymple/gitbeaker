import { UserSSHKeys } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: UserSSHKeys;

beforeEach(() => {
  service = new UserSSHKeys({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating UserSSHKeys service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(UserSSHKeys);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('UserSSHKeys.all', () => {
  it('should request GET user/keys', async () => {
    await service.all({ test: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/keys', { test: 1 });
  });

  it('should request GET user/keys without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/keys', {});
  });

  it('should request GET users/:id/keys', async () => {
    await service.all({ userId: 1, test: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/keys', { test: 1 });
  });

  it('should request GET users/:id/keys without options', async () => {
    await service.all({ userId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/keys', {});
  });
});

describe('UserSSHKeys.create', () => {
  it('should request POST user/keys', async () => {
    await service.create('title', 'key', { test: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'user/keys', {
      title: 'title',
      key: 'key',
      test: 1,
    });
  });

  it('should request POST user/keys without options', async () => {
    await service.create('title', 'key');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'user/keys', {
      title: 'title',
      key: 'key',
    });
  });

  it('should request POST users/1/keys', async () => {
    await service.create('title', 'key', { userId: 1, test: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/keys', {
      title: 'title',
      key: 'key',
      test: 1,
    });
  });
});

describe('UserSSHKeys.show', () => {
  it('should request GET user/keys', async () => {
    await service.show(1, { test: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/keys/1', { test: 1 });
  });

  it('should request GET user/keys without options', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/keys/1', {});
  });

  it('should request GET users/1/keys', async () => {
    await service.show(1, { userId: 1, test: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/keys/1', { test: 1 });
  });
});

describe('UserSSHKeys.remove', () => {
  it('should request GET user/keys', async () => {
    await service.remove(1, { test: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'user/keys/1', { test: 1 });
  });

  it('should request GET user/keys without options', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'user/keys/1', {});
  });

  it('should request GET users/1/keys', async () => {
    await service.remove(1, { userId: 1, test: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'users/1/keys/1', { test: 1 });
  });
});
