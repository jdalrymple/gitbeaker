import { RequesterType } from '@gitbeaker/requester-utils';
import { UserGPGKeys } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: UserGPGKeys;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new UserGPGKeys({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating UserGPGKeys service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(UserGPGKeys);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('UserGPGKeys.add', () => {
  it('should request POST users/gpg_keys', async () => {
    await service.add('key');

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'users/gpg_keys', { key: 'key' });
  });

  it('should request POST users/1/gpg_keys', async () => {
    await service.add('key', { userId: 1 });

    expect(RequestHelper.post).toHaveBeenCalledWith(service, 'users/1/gpg_keys', { key: 'key' });
  });
});

describe('UserGPGKeys.all', () => {
  it('should request GET users/gpg_keys', async () => {
    await service.all();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'users/gpg_keys', {});
  });

  it('should request GET users/:id/gpg_keys', async () => {
    await service.all({ userId: 1 });

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'users/1/gpg_keys', {});
  });
});

describe('UserGPGKeys.show', () => {
  it('should request GET users/gpg_keys', async () => {
    await service.show(1);

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'users/gpg_keys/1', {});
  });

  it('should request GET users/1/gpg_keys', async () => {
    await service.show(1, { userId: 1 });

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'users/1/gpg_keys/1', {});
  });
});

describe('UserGPGKeys.remove', () => {
  it('should request GET users/gpg_keys', async () => {
    await service.remove(1);

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'users/gpg_keys/1', {});
  });

  it('should request GET users/1/gpg_keys', async () => {
    await service.remove(1, { userId: 1 });

    expect(RequestHelper.del).toHaveBeenCalledWith(service, 'users/1/gpg_keys/1', {});
  });
});
