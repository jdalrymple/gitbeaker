import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UserGPGKeys } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: UserGPGKeys;

beforeEach(() => {
  service = new UserGPGKeys({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('UserGPGKeys.add', () => {
  it('should request POST user/gpg_keys', async () => {
    await service.add('key');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'user/gpg_keys', {
      body: { key: 'key' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST users/1/gpg_keys', async () => {
    await service.add('key', { userId: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'users/1/gpg_keys', {
      body: { key: 'key' },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserGPGKeys.all', () => {
  it('should request GET user/gpg_keys', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'user/gpg_keys', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET users/:id/gpg_keys', async () => {
    await service.all({ userId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'users/1/gpg_keys', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserGPGKeys.show', () => {
  it('should request GET user/gpg_keys', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'user/gpg_keys/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET users/1/gpg_keys', async () => {
    await service.show(1, { userId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'users/1/gpg_keys/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserGPGKeys.remove', () => {
  it('should request DEL user/gpg_keys', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'user/gpg_keys/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request DEL users/1/gpg_keys', async () => {
    await service.remove(1, { userId: 1 });

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'users/1/gpg_keys/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
