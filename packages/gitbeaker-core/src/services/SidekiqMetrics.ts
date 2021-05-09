import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';

export interface ProcessMetricSchema {
  hostname: string;
  pid: number;
  tag: string;
  started_at: string;
  queues?: string[];
  labels?: string[];
  concurrency: number;
  busy: number;
}

export interface SidekickProcessMetricsSchema extends Record<string, unknown> {
  processes?: ProcessMetricSchema[];
}

export interface SidekickQueueMetricsSchema extends Record<string, unknown> {
  queues: {
    default: {
      backlog: number;
      latency: number;
    };
  };
}

export interface SidekickJobStatsSchema extends Record<string, unknown> {
  jobs: {
    processed: number;
    failed: number;
    enqueued: number;
    dead: number;
  };
}

export interface SidekickCompoundMetricsSchema
  extends SidekickJobStatsSchema,
    SidekickQueueMetricsSchema,
    SidekickProcessMetricsSchema {}

export class SidekiqMetrics<C extends boolean = false> extends BaseService<C> {
  queueMetrics() {
    return RequestHelper.get<SidekickQueueMetricsSchema>()(this, 'sidekiq/queue_metrics');
  }

  processMetrics() {
    return RequestHelper.get<SidekickProcessMetricsSchema>()(this, 'sidekiq/process_metrics');
  }

  jobStats() {
    return RequestHelper.get<SidekickJobStatsSchema>()(this, 'sidekiq/job_stats');
  }

  compoundMetrics() {
    return RequestHelper.get<SidekickCompoundMetricsSchema>()(this, 'sidekiq/compound_metrics');
  }
}
