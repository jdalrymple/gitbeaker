import { RequestHelper } from '../../../src/infrastructure';
import { DeployKeys } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: DeployKeys;

beforeEach(() => {
  service = new DeployKeys({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating DeployKeys service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(DeployKeys);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('DeployKeys.add', () => {
  it('should request POST /projects/:id/deploy_keys', async () => {
    await service.add(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/deploy_keys', undefined);
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
    await service.edit(1, 'key', { prop: 3 });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/deploy_keys/key', {
      prop: 3,
    });
  });
});

describe('DeployKeys.show', () => {
  it('should request GET /projects/:id/deploy_keys/:key', async () => {
    await service.show(1, 'key');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/deploy_keys/key',
      undefined,
    );
  });
});

describe('DeployKeys.remove', () => {
  it('should request DEL /projects/:id/deploy_keys/:key', async () => {
    await service.remove(1, 'key');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/deploy_keys/key',
      undefined,
    );
  });
});
