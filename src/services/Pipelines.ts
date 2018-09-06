import { BaseService, RequestHelper } from '../infrastructure';

export type PipelineId = string | number;

class Pipelines extends BaseService {
  all(projectId: ProjectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines`, options);
  }

  create(projectId: ProjectId, ref: string) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipeline`, { ref });
  }

  show(projectId: ProjectId, pipelineId: PipelineId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}`);
  }

  retry(projectId: ProjectId, pipelineId: PipelineId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipelines/${pipelineId}/retry`);
  }

  cancel(projectId: ProjectId, pipelineId: PipelineId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipelines/${pipelineId}/cancel`);
  }

  showJobs(projectId: ProjectId, pipelineId: PipelineId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}/jobs`, options);
  }
}

export default Pipelines;
