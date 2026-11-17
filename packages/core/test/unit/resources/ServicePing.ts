import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ServicePing } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ServicePing;

beforeEach(() => {
  service = new ServicePing({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ServicePing.exportServicePing', () => {
  it('should request GET /usage_data/service_ping', async () => {
    await service.exportServicePing();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'usage_data/service_ping', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('ServicePing.exportMetricDefinitions', () => {
  it('should request GET /usage_data/metric_definitions', async () => {
    await service.exportMetricDefinitions();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'usage_data/metric_definitions', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('ServicePing.allQueries', () => {
  it('should request GET /usage_data/queries', async () => {
    await service.allQueries();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'usage_data/queries', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('ServicePing.allNonSqlMetrics', () => {
  it('should request GET /usage_data/non_sql_metrics', async () => {
    await service.allNonSqlMetrics();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'usage_data/non_sql_metrics', {
      sudo: undefined,
      showExpanded: undefined,
    });
  });
});

describe('ServicePing.trackEvent', () => {
  it('should request POST /usage_data/track_event', async () => {
    await service.trackEvent({ event: 'e', projectId: 1 });

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'usage_data/track_event', {
      sudo: undefined,
      showExpanded: undefined,
      body: { event: 'e', projectId: 1 },
    });
  });
});

describe('ServicePing.trackEvents', () => {
  it('should request POST /usage_data/track_events', async () => {
    await service.trackEvents([{ event: 'e' }]);

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'usage_data/track_events', {
      sudo: undefined,
      showExpanded: undefined,
      body: { events: [{ event: 'e' }] },
    });
  });
});
