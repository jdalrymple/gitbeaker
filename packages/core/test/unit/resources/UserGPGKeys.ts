import { UserGPGKeys } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: UserGPGKeys;

beforeEach(() => {
  service = new UserGPGKeys({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('UserGPGKeys.add', () => {
  it('should request POST user/gpg_keys', async () => {
    await service.add('key');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'user/gpg_keys', { key: 'key' });
  });

  it('should request POST users/1/gpg_keys', async () => {
    await service.add('key', { userId: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/gpg_keys', { key: 'key' });
  });
});

describe('UserGPGKeys.all', () => {
  it('should request GET user/gpg_keys', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/gpg_keys', {});
  });

  it('should request GET users/:id/gpg_keys', async () => {
    await service.all({ userId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/gpg_keys', {});
  });
});

describe('UserGPGKeys.show', () => {
  it('should request GET user/gpg_keys', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'user/gpg_keys/1', {});
  });

  it('should request GET users/1/gpg_keys', async () => {
    await service.show(1, { userId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'users/1/gpg_keys/1', {});
  });
});

describe('UserGPGKeys.remove', () => {
  it('should request DEL user/gpg_keys', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'user/gpg_keys/1', {});
  });

  it('should request DEL users/1/gpg_keys', async () => {
    await service.remove(1, { userId: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'users/1/gpg_keys/1', {});
  });
});
