import { RequesterType } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../../../src/infrastructure';
import { IssuesStatistics } from '../../../src';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: IssuesStatistics;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new IssuesStatistics({
    requester,
    token: 'abcdefg',
    requestTimeout: 3000,
  });
});

describe('Instantiating IssuesStatistics service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(IssuesStatistics);
    expect(service.url).toBeDefined();
    expect(service.rejectUnauthorized).toBeTruthy();
    expect(service.headers).toMatchObject({ 'private-token': 'abcdefg' });
    expect(service.requestTimeout).toBe(3000);
  });
});

describe('IssuesStatistics.all', () => {
  it('should request GET /issues_statistics', async () => {
    await service.all();

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'issues_statistics', {});
  });

  it('should request GET /projects/:id/issues_statistics when project Id is passed', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'projects/1/issues_statistics', {});
  });

  it('should request GET /group/:id/issues_statistics when group Id is passed', async () => {
    await service.all({ groupId: 2 });

    expect(RequestHelper.get).toHaveBeenCalledWith(service, 'groups/1/issues_statistics', {});
  });
});
