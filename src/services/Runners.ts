import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, RunnerId } from '@typings';

class Runners extends BaseService {
  all({ projectId, ...options }: { projectId: ProjectId } & PaginatedRequestOptions) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/runners` : 'runners/all';

    return RequestHelper.get(this, url, options);
  }

  allOwned(options?: BaseRequestOptions) {
    return RequestHelper.get(this, 'runners', options);
  }

  edit(runnerId: RunnerId, options?: BaseRequestOptions) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.put(this, `runners/${rId}`, options);
  }

  enable(projectId: ProjectId, runnerId: RunnerId, options?: Sudo) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/runners`, { runnerId: rId, ...options });
  }

  disable(projectId: ProjectId, runnerId: RunnerId, options?: Sudo) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/runners/${rId}`, options);
  }

  jobs(runnerId: RunnerId, options?: Sudo) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get(this, `runners/${rId}/jobs`, options);
  }

  remove(runnerId: RunnerId, options?: Sudo) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.delete(this, `runners/${rId}`, options);
  }

  show(runnerId: RunnerId, options?: Sudo) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get(this, `runners/${rId}`, options);
  }
}

export default Runners;
