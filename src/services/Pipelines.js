import { BaseService, RequestHelper } from '../infrastructure';

export class Pipelines extends BaseService {
  all(projectId, options = {}) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pipelines`, options);
  }
}

export default Pipelines;
