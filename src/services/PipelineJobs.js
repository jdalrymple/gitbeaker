import { BaseService, RequestHelper } from '../infrastructure';

class PipelineJobs extends BaseService {
  all(projectId, pipelineId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}/jobs`, options);
  }
}

export default PipelineJobs;
