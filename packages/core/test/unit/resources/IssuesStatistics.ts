import { IssuesStatistics } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: IssuesStatistics;

beforeEach(() => {
  service = new IssuesStatistics({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('IssuesStatistics.all', () => {
  it('should request GET /issues_statistics', async () => {
    await service.all();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'issues_statistics', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /projects/:id/issues_statistics when project Id is passed', async () => {
    await service.all({ projectId: 1 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'projects/1/issues_statistics', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });

  it('should request GET /group/:id/issues_statistics when group Id is passed', async () => {
    await service.all({ groupId: 2 });

    expect(RequestHelper.get()).toHaveBeenLastCalledWith(service, 'groups/2/issues_statistics', {
      searchParams: {},
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
