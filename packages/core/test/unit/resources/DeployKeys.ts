import { RequestHelper } from '../../../src/infrastructure';
import { DeployKeys } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: DeployKeys;

beforeEach(() => {
  service = new DeployKeys({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('DeployKeys.add', () => {
  it('should request POST /projects/:id/deploy_keys', async () => {
    await service.create(1, 'title', 'key');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/deploy_keys', {
      title: 'title',
      key: 'key',
    });
  });
});

describe('DeployKeys.all', () => {
  it('should request GET /deploy_keys', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'deploy_keys', {});
  });

  it('should request GET /projects/:id/deploy_keys', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/deploy_keys', {});
  });
});

describe('DeployKeys.edit', () => {
  it('should request PUT /projects/:id/deploy_keys/:key', async () => {
    await service.edit(1, 2, { title: 'title' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/deploy_keys/2', {
      title: 'title',
    });
  });
});

describe('DeployKeys.show', () => {
  it('should request GET /projects/:id/deploy_keys/:key', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/deploy_keys/2',
      undefined,
    );
  });
});

describe('DeployKeys.remove', () => {
  it('should request DEL /projects/:id/deploy_keys/:key', async () => {
    await service.remove(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/deploy_keys/2',
      undefined,
    );
  });
});
