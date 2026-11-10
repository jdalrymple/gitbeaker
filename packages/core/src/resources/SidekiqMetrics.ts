import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface ProcessMetricSchema {
  hostname: string;
  pid: number;
  tag: string;
  started_at: string;
  queues: string[];
  labels: string[];
  concurrency: number;
  busy: number;
}

export interface SidekiqProcessMetricsSchema extends Record<string, unknown> {
  processes: ProcessMetricSchema[];
}

export interface SidekiqQueueMetricsSchema extends Record<string, unknown> {
  queues: {
    [queueName: string]: {
      backlog: number;
      latency: number;
    };
  };
}

export interface SidekiqJobStatsSchema extends Record<string, unknown> {
  jobs: {
    processed: number;
    failed: number;
    enqueued: number;
    dead: number;
  };
}

export type SidekiqCompoundMetricsSchema = SidekiqJobStatsSchema &
  SidekiqProcessMetricsSchema &
  SidekiqQueueMetricsSchema;

export class SidekiqMetrics<C extends boolean = false> extends BaseResource<C> {
  queueMetrics<E extends boolean = false>(): Promise<
    GitlabAPIResponse<SidekiqQueueMetricsSchema, C, E, void>
  > {
    return RequestHelper.get<SidekiqQueueMetricsSchema>()(this, 'sidekiq/queue_metrics');
  }

  processMetrics<E extends boolean = false>(): Promise<
    GitlabAPIResponse<SidekiqProcessMetricsSchema, C, E, void>
  > {
    return RequestHelper.get<SidekiqProcessMetricsSchema>()(this, 'sidekiq/process_metrics');
  }

  jobStats<E extends boolean = false>(): Promise<
    GitlabAPIResponse<SidekiqJobStatsSchema, C, E, void>
  > {
    return RequestHelper.get<SidekiqJobStatsSchema>()(this, 'sidekiq/job_stats');
  }

  compoundMetrics<E extends boolean = false>(): Promise<
    GitlabAPIResponse<SidekiqCompoundMetricsSchema, C, E, void>
  > {
    return RequestHelper.get<SidekiqCompoundMetricsSchema>()(this, 'sidekiq/compound_metrics');
  }
}
