import { RequestHelper } from '../../../src/infrastructure';
import { SystemHooks } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: SystemHooks;

beforeEach(() => {
  service = new SystemHooks({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('SystemHooks.all', () => {
  it('should request GET /hooks without options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'hooks', undefined);
  });

  it('should request GET /hooks with options', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'hooks', undefined);
  });
});

describe('SystemHooks.add', () => {
  it('should request POST /hooks', async () => {
    await service.add('url');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'hooks', {
      url: 'url',
    });
  });
});

describe('SystemHooks.remove', () => {
  it('should request DEL /hooks/:hook_id with options', async () => {
    await service.remove(2, { sudo: 1 });

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'hooks/2', { sudo: 1 });
  });

  it('should request DEL /hooks/:hook_id without options', async () => {
    await service.remove(2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'hooks/2', undefined);
  });
});
