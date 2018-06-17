import { BaseService, RequestHelper } from '../infrastructure';

interface RunnersOptions {
  projectId?: string;
}
class Runners extends BaseService {
  all({ projectId, ...options }: RunnersOptions = {}) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/runners` : 'runners/all';

    return RequestHelper.get(this, url, options);
  }

  allOwned(options) {
    return RequestHelper.get(this, 'runners', options);
  }

  edit(runnerId, attributes) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.put(this, `runners/${rId}`, attributes);
  }

  enable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/runners`, { runnerId: rId });
  }

  disable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/runners/${rId}`);
  }

  jobs(runnerId) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get(this, `runners/${rId}/jobs`);
  }

  remove(runnerId) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.delete(this, `runners/${rId}`);
  }

  show(runnerId) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get(this, `runners/${rId}`);
  }
}

export default Runners;
