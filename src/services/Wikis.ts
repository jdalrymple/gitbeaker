import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId } from '@typings';

class Wikis extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/wikis`, options);
  }

  create(projectId: ProjectId, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/wikis`, options);
  }

  edit(projectId: ProjectId, slug: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/wikis/${slug}`, options);
  }

  show(projectId: ProjectId, slug: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/wikis/${slug}`, options);
  }

  remove(projectId: ProjectId, slug: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del(this, `projects/${pId}/wikis/${slug}`, options);
  }
}

export default Wikis;
