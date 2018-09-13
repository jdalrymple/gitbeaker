import { BaseService, RequestHelper } from '../infrastructure';
import { RequestOptions } from '../infrastructure/RequestHelper';

interface PagesDomainsOptions {
  projectId?: ProjectId;
}
class PagesDomains extends BaseService {
  all({ projectId }: PagesDomainsOptions = {}) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/` : '';

    return RequestHelper.get(this, `${url}pages/domains`);
  }

  create(projectId: ProjectId, domain: string, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pages/domains`, { domain, ...options });
  }

  edit(projectId: ProjectId, domain: string, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/pages/domains/${domain}`, options);
  }

  show(projectId: ProjectId, domain: string) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pages/domains/${domain}`);
  }

  remove(projectId: ProjectId, domain: string) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/pages/domains/${domain}`);
  }
}

export default PagesDomains;
