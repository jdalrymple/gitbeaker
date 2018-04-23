import { BaseService, RequestHelper } from '../infrastructure';

class PipelineJobs extends BaseService {
  all(projectId, pipelineId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}/jobs`);
  }
}

export default PipelineJobs;
