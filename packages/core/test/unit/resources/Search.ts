import { RequestHelper } from '../../../src/infrastructure';
import { Search } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: Search;

beforeEach(() => {
  service = new Search({
    requesterFn: jest.fn(),
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Search.all', () => {
  it('should request GET /search within the users scope', async () => {
    await service.all('users', 'search terms');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'search', {
      scope: 'users',
      search: 'search terms',
    });
  });

  it('should request GET /projects/:id/search when project Id is passed', async () => {
    await service.all('projects', 'search terms', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/search', {
      scope: 'projects',
      search: 'search terms',
    });
  });

  it('should request GET /group/:id/search when group Id is passed', async () => {
    await service.all('issues', 'search terms', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/search', {
      scope: 'issues',
      search: 'search terms',
    });
  });
});
