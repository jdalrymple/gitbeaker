import { BaseService, RequestHelper } from '../infrastructure';

class Jobs extends BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/jobs`, options);
  }
}

export default Jobs;
