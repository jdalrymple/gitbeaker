import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse } from '../infrastructure';

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

export type SidekickCompoundMetricsSchema = SidekickJobStatsSchema &
  SidekickQueueMetricsSchema &
  SidekickProcessMetricsSchema;

export class SidekiqMetrics<C extends boolean = false> extends BaseResource<C> {
  queueMetrics<E extends boolean = false>(): Promise<
    GitlabAPIResponse<SidekickQueueMetricsSchema, C, E, void>
  > {
    return RequestHelper.get<SidekickQueueMetricsSchema>()(this, 'sidekiq/queue_metrics');
  }

  processMetrics<E extends boolean = false>(): Promise<
    GitlabAPIResponse<SidekickProcessMetricsSchema, C, E, void>
  > {
    return RequestHelper.get<SidekickProcessMetricsSchema>()(this, 'sidekiq/process_metrics');
  }

  jobStats<E extends boolean = false>(): Promise<
    GitlabAPIResponse<SidekickJobStatsSchema, C, E, void>
  > {
    return RequestHelper.get<SidekickJobStatsSchema>()(this, 'sidekiq/job_stats');
  }

  compoundMetrics<E extends boolean = false>(): Promise<
    GitlabAPIResponse<SidekickCompoundMetricsSchema, C, E, void>
  > {
    return RequestHelper.get<SidekickCompoundMetricsSchema>()(this, 'sidekiq/compound_metrics');
  }
}
