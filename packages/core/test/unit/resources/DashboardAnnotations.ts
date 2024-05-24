import { RequestHelper } from '../../../src/infrastructure';
import { DashboardAnnotations } from '../../../src';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => require('../../__mocks__/RequestHelper').default,
);

let service: DashboardAnnotations;

beforeEach(() => {
  service = new DashboardAnnotations({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('DashboardAnnotations.create', () => {
  it('should request POST /environments/1/metrics_dashboard/annotations', async () => {
    await service.create('path', 'start', 'desc', { environmentId: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'environments/1/metrics_dashboard/annotations',
      {
        dashboardPath: 'path',
        startingAt: 'start',
        description: 'desc',
      },
    );
  });

  it('should request POST /clusters/1/metrics_dashboard/annotations', async () => {
    await service.create('path', 'start', 'desc', { clusterId: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'clusters/1/metrics_dashboard/annotations',
      {
        dashboardPath: 'path',
        startingAt: 'start',
        description: 'desc',
      },
    );
  });

  it('should throw an error if environmentId or clusterId isnt passed', () => {
    /* eslint-disable-next-line */
    expect(() => service.create('path', 'start', 'desc', {} as any)).toThrow();
  });
});
