import { RequestHelper } from '../../../src/infrastructure';
import { ProjectReleases } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: ProjectReleases;

beforeEach(() => {
  service = new ProjectReleases({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('ProjectReleases.all', () => {
  it('should request GET /projects/:id/releases', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/releases', undefined);
  });
});

describe('ProjectReleases.create', () => {
  it('should request POST /projects/:id/releases', async () => {
    await service.create(1, { prop: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/releases', {
      prop: 1,
    });
  });
});

describe('ProjectReleases.edit', () => {
  it('should request PUT /projects/:id/releases', async () => {
    await service.edit(1, '2');

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'projects/1/releases/2', undefined);
  });
});

describe('ProjectReleases.show', () => {
  it('should request GET /projects/:id/releases/:id', async () => {
    await service.show(1, '2');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/releases/2', undefined);
  });
});

describe('ProjectReleases.remove', () => {
  it('should request DEL /projects/:id/releases/:id', async () => {
    await service.remove(1, '2');

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/releases/2', undefined);
  });
});
