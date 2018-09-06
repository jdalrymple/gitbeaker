import { BaseService, RequestHelper } from '../infrastructure';

class Pipelines extends BaseService {
  all(projectId: ProjectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines`, options);
  }

  create(projectId: ProjectId, ref) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipeline`, { ref });
  }

  show(projectId: ProjectId, pipelineId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}`);
  }

  retry(projectId: ProjectId, pipelineId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipelines/${pipelineId}/retry`);
  }

  cancel(projectId: ProjectId, pipelineId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipelines/${pipelineId}/cancel`);
  }

  showJobs(projectId: ProjectId, pipelineId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}/jobs`, options);
  }
}

export default Pipelines;
