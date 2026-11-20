import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SidekiqMetrics } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: SidekiqMetrics;

beforeEach(() => {
  service = new SidekiqMetrics({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('SidekiqMetrics.queueMetrics', () => {
  it('should request GET /sidekiq/queue_metrics', async () => {
    await service.queueMetrics();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'sidekiq/queue_metrics');
  });
});

describe('SidekiqMetrics.processMetrics', () => {
  it('should request GET /sidekiq/process_metrics', async () => {
    await service.processMetrics();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'sidekiq/process_metrics');
  });
});

describe('SidekiqMetrics.jobStats', () => {
  it('should request GET /sidekiq/job_stats', async () => {
    await service.jobStats();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'sidekiq/job_stats');
  });
});

describe('SidekiqMetrics.compoundMetrics', () => {
  it('should request GET /sidekiq/compound_metrics', async () => {
    await service.compoundMetrics();

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'sidekiq/compound_metrics');
  });
});
