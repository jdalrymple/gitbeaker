import { Search } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: Search;

beforeEach(() => {
  service = new Search({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Search.all', () => {
  it('should request GET /search within the users scope', async () => {
    await service.all('users', 'search terms');

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'search', {
      maxPages: undefined,
      searchParams: {
        scope: 'users',
        search: 'search terms',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/search when project Id is passed', async () => {
    await service.all('projects', 'search terms', { projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/search', {
      maxPages: undefined,
      searchParams: {
        scope: 'projects',
        search: 'search terms',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /group/:id/search when group Id is passed', async () => {
    await service.all('issues', 'search terms', { groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'groups/2/search', {
      maxPages: undefined,
      searchParams: {
        scope: 'issues',
        search: 'search terms',
      },
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
