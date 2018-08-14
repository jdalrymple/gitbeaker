import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Pipelines extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines`, options);
  }

  @api('<projectId>', '<ref>', { method: 'POST' })
  create(projectId, ref) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipeline`, { ref });
  }

  @api('<projectId>', '<pipelineId>', { method: 'GET' })
  show(projectId, pipelineId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}`);
  }

  @api('<projectId>', '<pipelineId>', { method: 'POST' })
  retry(projectId, pipelineId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipelines/${pipelineId}/retry`);
  }

  @api('<projectId>', '<pipelineId>', { method: 'POST' })
  cancel(projectId, pipelineId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipelines/${pipelineId}/cancel`);
  }

  @api('<projectId>', '<pipelineId>', { options: true, method: 'GET' })
  showJobs(projectId, pipelineId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}/jobs`, options);
  }
}

export default Pipelines;
