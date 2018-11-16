import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId } from '@typings';

class PagesDomains extends BaseService {
  all({ projectId, ...options }: { projectId?: ProjectId } & PaginatedRequestOptions = {}) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/` : '';

    return RequestHelper.get(this, `${url}pages/domains`, options);
  }

  create(projectId: ProjectId, domain: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pages/domains`, { domain, ...options });
  }

  edit(projectId: ProjectId, domain: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/pages/domains/${domain}`, options);
  }

  show(projectId: ProjectId, domain: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pages/domains/${domain}`, options);
  }

  remove(projectId: ProjectId, domain: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/pages/domains/${domain}`, options);
  }
}

export default PagesDomains;
