import { BaseService, RequestHelper } from '../infrastructure';

class Environments extends BaseService {
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/environments`, options);
  }
}

export default Environments;
