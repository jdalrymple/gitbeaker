import { RequestHelper } from '../../../src/infrastructure';
import { GroupHooks } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: GroupHooks;

beforeEach(() => {
  service = new GroupHooks({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Instantiating GroupHooks service', () => {
  it('should create a valid service object', () => {
    expect(service).toBeInstanceOf(GroupHooks);
    expect(service.url).toBeDefined();
  });

  it('should call /groups prefix', () => {
    expect(service.url.includes('groups')).toBeTruthy();
  });
});

describe('GroupHooks.all', () => {
  it('should request GET /groups/:id/hooks without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/hooks', undefined);
  });

  it('should request GET /groups/:id/hooks with options', async () => {
    await service.all(1, { sudo: 'sudo' });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/hooks', { sudo: 'sudo' });
  });
});

describe('GroupHooks.add', () => {
  it('should request POST /groups/:id/hooks', async () => {
    await service.add(1, 'url');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, '1/hooks', {
      url: 'url',
    });
  });
});

describe('GroupHooks.edit', () => {
  it('should request PUT /groups/:id/hooks/:hook_id', async () => {
    await service.edit(1, 2, 'url');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, '1/hooks/2', { url: 'url' });
  });
});

describe('GroupHooks.show', () => {
  it('should request GET /groups/:id/hooks/:hook_id without options', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/hooks/2', undefined);
  });

  it('should request GET /groups/:id/hooks/:hook_id with options', async () => {
    await service.show(1, 2, { sudo: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, '1/hooks/2', { sudo: 1 });
  });
});

describe('GroupHooks.remove', () => {
  it('should request DEL /groups/:id/hooks/:hook_id with options', async () => {
    await service.remove(1, 2, { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '1/hooks/2', { sudo: 1 });
  });

  it('should request DEL /groups/:id/hooks/:hook_id without options', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, '1/hooks/2', undefined);
  });
});
