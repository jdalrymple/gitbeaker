import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';

export class SidekiqMetrics<C extends boolean = false> extends BaseService<C> {
  queueMetrics() {
    return RequestHelper.get<C>(this, 'sidekiq/queue_metrics');
  }

  processMetrics() {
    return RequestHelper.get<C>(this, 'sidekiq/process_metrics');
  }

  jobStats() {
    return RequestHelper.get<C>(this, 'sidekiq/job_stats');
  }

  compoundMetrics() {
    return RequestHelper.get<C>(this, 'sidekiq/compound_metrics');
  }
}
