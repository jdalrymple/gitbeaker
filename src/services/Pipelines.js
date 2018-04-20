import { BaseService, RequestHelper } from '../infrastructure';

class Pipelines extends BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines`, options);
  }

  create(projectId, ref) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pipeline`, { ref });
  }

  show(projectId, pipelineId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines/${pipelineId}`);
  }
}

export default Pipelines;
