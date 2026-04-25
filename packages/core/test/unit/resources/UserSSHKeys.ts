import { UserSSHKeys } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: UserSSHKeys;

beforeEach(() => {
  service = new UserSSHKeys({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('UserSSHKeys.all', () => {
  it('should request GET user/keys without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'user/keys', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET users/:id/keys without options', async () => {
    await service.all({ userId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'users/1/keys', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserSSHKeys.create', () => {
  it('should request POST user/keys', async () => {
    await service.create('title', 'key', { expiresAt: 'test' });

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'user/keys', {
      body: {
        title: 'title',
        key: 'key',
        expiresAt: 'test',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request POST user/keys without options', async () => {
    await service.create('title', 'key');

    expect(RequestHelper.post()).toHaveBeenLastCalledWith(service, 'user/keys', {
      body: {
        title: 'title',
        key: 'key',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserSSHKeys.show', () => {
  it('should request GET user/keys/:key_id without options', async () => {
    await service.show(1);

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'user/keys/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('UserSSHKeys.remove', () => {
  it('should request DEL user/keys/:key_id', async () => {
    await service.remove(1);

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'user/keys/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET users/1/keys/:key_id', async () => {
    await service.remove(1, { userId: 1 });

    expect(RequestHelper.del()).toHaveBeenLastCalledWith(service, 'users/1/keys/1', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
