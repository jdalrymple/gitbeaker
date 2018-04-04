import { BaseService, RequestHelper } from '../infrastructure';

class SidekiqMetrics extends BaseService {
  queueMetrics() {
    return RequestHelper.get(this, 'sidekiq/queue_metrics');
  }

  processMetrics() {
    return RequestHelper.get(this, 'sidekiq/process_metrics');
  }

  jobStats() {
    return RequestHelper.get(this, 'sidekiq/job_stats');
  }

  compoundMetrics() {
    return RequestHelper.get(this, 'sidekiq/compound_metrics');
  }
}

export default SidekiqMetrics;
