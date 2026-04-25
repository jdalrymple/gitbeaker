import { DashboardAnnotations } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: DashboardAnnotations;

beforeEach(() => {
  service = new DashboardAnnotations({
    requesterFn: vi.fn(),
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
        body: {
          dashboardPath: 'path',
          startingAt: 'start',
          description: 'desc',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should request POST /clusters/1/metrics_dashboard/annotations', async () => {
    await service.create('path', 'start', 'desc', { clusterId: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'clusters/1/metrics_dashboard/annotations',
      {
        body: {
          dashboardPath: 'path',
          startingAt: 'start',
          description: 'desc',
        },
        showExpanded: undefined,
        sudo: undefined,
      },
    );
  });

  it('should throw an error if environmentId or clusterId isnt passed', () => {
    expect(() => service.create('path', 'start', 'desc', {} as any)).toThrow(
      'Missing required parameter',
    );
  });
});
