import { ContainerRegistry } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: ContainerRegistry;

beforeEach(() => {
  service = new ContainerRegistry({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('ContainerRegistry.allRepositories', () => {
  it('should request GET /projects/:id/registry/repositories', async () => {
    await service.allRepositories({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/registry/repositories', {
      maxPages: undefined,
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ContainerRegistry.allTags', () => {
  it('should request GET /projects/:id/registry/repositories/:id/tags', async () => {
    await service.allTags(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/repositories/2/tags',
      { maxPages: undefined, searchParams: {}, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerRegistry.removeRepository', () => {
  it('should request DELETE /projects/:id/registry/repositories/:id', async () => {
    await service.removeRepository(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/repositories/2',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerRegistry.removeTag', () => {
  it('should request DELETE /projects/:id/registry/repositories/:id/tags/:id', async () => {
    await service.removeTag(1, 2, 'name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/repositories/2/tags/name',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerRegistry.removeTags', () => {
  it('should request DELETE /projects/:id/registry/repositories/:id/tags', async () => {
    await service.removeTags(1, 2, 'name');

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/repositories/2/tags',
      { body: { nameRegexDelete: 'name' }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ContainerRegistry.showRepository', () => {
  it('should request GET /registry/repositories/:id', async () => {
    await service.showRepository(2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'registry/repositories/2', {
      showExpanded: undefined,
      sudo: undefined,
      maxPages: undefined,
      searchParams: {},
    });
  });
});

describe('ContainerRegistry.showTag', () => {
  it('should request GET /projects/:id/registry/repositories/:id/tags/:id', async () => {
    await service.showTag(1, 2, 'name');

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/registry/repositories/2/tags/name',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
