import { RequestHelper } from '../../../src/infrastructure';
import { Groups } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Groups;

beforeEach(() => {
  service = new Groups({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Groups.all', () => {
  it('should request GET /groups', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups', undefined);
  });
});

describe('Groups.create', () => {
  it('should request POST /groups', async () => {
    await service.create('test group', 'test-group');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'groups', {
      name: 'test group',
      path: 'test-group',
    });
  });
});

describe('Groups.edit', () => {
  it('should request PUT /groups', async () => {
    await service.edit(12, { name: 'test group 2' });

    expect(RequestHelper.put()).toHaveBeenCalledWith(service, 'groups/12', {
      name: 'test group 2',
    });
  });
});

describe('Groups.allProjects', () => {
  it('should request GET /groups/:id/projects', async () => {
    await service.allProjects(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/12/projects', undefined);
  });
});

describe('Groups.show', () => {
  it('should request GET /groups/:id', async () => {
    await service.show(12);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/12', undefined);
  });
});

describe('Groups.remove', () => {
  it('should request DEL /groups/:id', async () => {
    await service.remove(12);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'groups/12', undefined);
  });
});

describe('Groups.search', () => {
  it('should request GET /groups', async () => {
    await service.search('keywords');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups', {
      search: 'keywords',
    });
  });
});
