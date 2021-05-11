import { RequestHelper } from '../../../src/infrastructure';
import { ContainerRegistry } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ContainerRegistry;

beforeEach(() => {
  service = new ContainerRegistry({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating ContainerRegistry service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ContainerRegistry);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('ContainerRegistry.repositories', () => {
  it('should request GET /projects/:id/registry/repositories', async () => {
    await service.projectRepositories(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/repositories',
      undefined,
    );
  });
});

describe('ContainerRegistry.tags', () => {
  it('should request GET /projects/:id/registry/repositories/:id/tags', async () => {
    await service.tags(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/repositories/2/tags',
      undefined,
    );
  });
});

describe('ContainerRegistry.removeRepository', () => {
  it('should request DELETE /projects/:id/registry/repositories/:id', async () => {
    await service.removeRepository(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/repositories/2',
      undefined,
    );
  });
});

describe('ContainerRegistry.removeTag', () => {
  it('should request DELETE /projects/:id/registry/repositories/:id/tags/:id', async () => {
    await service.removeTag(1, 2, 'name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/repositories/2/tags/name',
      undefined,
    );
  });
});

describe('ContainerRegistry.removeTags', () => {
  it('should request DELETE /projects/:id/registry/repositories/:id/tags', async () => {
    await service.removeTags(1, 2, 'name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/repositories/2/tags',
      { nameRegexDelete: 'name' },
    );
  });
});

describe('ContainerRegistry.showTag', () => {
  it('should request GET /projects/:id/registry/repositories/:id/tags/:id', async () => {
    await service.showTag(1, 2, 'name');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/repositories/2/tags/name',
      undefined,
    );
  });
});
