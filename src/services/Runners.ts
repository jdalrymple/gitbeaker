import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

type RunnerId = string | number;
interface RunnersOptions {
  projectId?: ProjectId;
}
class Runners extends BaseService {
  all({ projectId, ...options }: RunnersOptions = {}) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/runners` : 'runners/all';

    return RequestHelper.get(this, url, options);
  }

  allOwned(options: RequestOptions) {
    return RequestHelper.get(this, 'runners', options);
  }

  edit(runnerId: RunnerId, options: RequestOptions) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.put(this, `runners/${rId}`, options);
  }

  enable(projectId: ProjectId, runnerId: RunnerId) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/runners`, { runnerId: rId });
  }

  disable(projectId: ProjectId, runnerId: RunnerId) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/runners/${rId}`);
  }

  jobs(runnerId: RunnerId) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get(this, `runners/${rId}/jobs`);
  }

  remove(runnerId: RunnerId) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.delete(this, `runners/${rId}`);
  }

  show(runnerId: RunnerId) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get(this, `runners/${rId}`);
  }
}

export default Runners;
