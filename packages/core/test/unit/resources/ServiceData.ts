import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ServiceData } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ServiceData;

beforeEach(() => {
  service = new ServiceData({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ServiceData.showMetricDefinitions', () => {
  it('should request GET usage_data/metric_definitions', async () => {
    await service.showMetricDefinitions();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'usage_data/metric_definitions', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ServiceData.showServicePingSQLQueries', () => {
  it('should request GET usage_data/queries', async () => {
    await service.showServicePingSQLQueries();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'usage_data/queries', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ServiceData.showUsageDataNonSQLMetrics', () => {
  it('should request GET usage_data/non_sql_metrics', async () => {
    await service.showUsageDataNonSQLMetrics();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'usage_data/non_sql_metrics', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});
