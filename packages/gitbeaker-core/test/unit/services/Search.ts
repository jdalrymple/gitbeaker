import { RequestHelper } from '../../../src/infrastructure';
import { Search } from '../../../src';
import { mockRequesterFn } from '../../mocks/requesterFn';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: Search;

beforeEach(() => {
  service = new Search({
    requesterFn: mockRequesterFn,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating Search service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(Search);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('Search.all', () => {
  it('should request GET /search', async () => {
    await service.all('scope', 'search terms');

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'search', {
      scope: 'scope',
      search: 'search terms',
    });
  });

  it('should request GET /projects/:id/search when project Id is passed', async () => {
    await service.all('scope', 'search terms', { projectId: 1 });

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/search', {
      scope: 'scope',
      search: 'search terms',
    });
  });

  it('should request GET /group/:id/search when group Id is passed', async () => {
    await service.all('scope', 'search terms', { groupId: 2 });

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'groups/2/search', {
      scope: 'scope',
      search: 'search terms',
    });
  });
});
