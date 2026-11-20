import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProductAnalytics } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ProductAnalytics;

beforeEach(() => {
  service = new ProductAnalytics({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ProductAnalytics.allFunnels', () => {
  it('should request GET /projects/1/product_analytics/funnels', async () => {
    await service.allFunnels(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/product_analytics/funnels',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProductAnalytics.load', () => {
  it('should request POST /projects/1/product_analytics/request/load', async () => {
    await service.load(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/product_analytics/request/load',
      { body: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request POST /projects/1/product_analytics/request/load with options', async () => {
    await service.load(1, { includeToken: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/product_analytics/request/load',
      { body: { includeToken: true }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProductAnalytics.dryRun', () => {
  it('should request POST /projects/1/product_analytics/request/dry-run', async () => {
    await service.dryRun(1);

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/product_analytics/request/dry-run',
      { body: {}, showExpanded: undefined, sudo: undefined },
    );
  });

  it('should request POST /projects/1/product_analytics/request/dry-run with options', async () => {
    await service.dryRun(1, { includeToken: true });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/product_analytics/request/dry-run',
      { body: { includeToken: true }, showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ProductAnalytics.showMetadata', () => {
  it('should request GET /projects/1/product_analytics/request/meta', async () => {
    await service.showMetadata(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/product_analytics/request/meta',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
