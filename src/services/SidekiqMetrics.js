import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()class SidekiqMetrics extends BaseService {
  @api({ method: 'GET' })
  queueMetrics() {
    return RequestHelper.get(this, 'sidekiq/queue_metrics');
  }

  @api({ method: 'GET' })
  processMetrics() {
    return RequestHelper.get(this, 'sidekiq/process_metrics');
  }

  @api({ method: 'GET' })
  jobStats() {
    return RequestHelper.get(this, 'sidekiq/job_stats');
  }

  @api({ method: 'GET' })
  compoundMetrics() {
    return RequestHelper.get(this, 'sidekiq/compound_metrics');
  }
}

export default SidekiqMetrics;
