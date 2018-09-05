import { BaseService, RequestHelper } from '../infrastructure';

interface PagesDomainsOptions {
  projectId?: string;
}
class PagesDomains extends BaseService {
  all({ projectId }: PagesDomainsOptions = {}) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/` : '';

    return RequestHelper.get(this, `${url}pages/domains`);
  }

  create(projectId, domain, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pages/domains`, { domain, ...options });
  }

  edit(projectId, domain, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/pages/domains/${domain}`, options);
  }

  show(projectId, domain) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pages/domains/${domain}`);
  }

  remove(projectId, domain) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/pages/domains/${domain}`);
  }
}

export default PagesDomains;
