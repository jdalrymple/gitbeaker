import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class PagesDomains extends BaseService {
  @api('<projectId>', { method: 'GET' })
  all(projectId) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/` : '';

    return RequestHelper.get(this, `${url}page/domains`);
  }

  @api('<projectId>', '<domain>', { options: true, method: 'POST' })
  create(projectId, domain, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/pages/domains`, { domain, ...options });
  }

  @api('<projectId>', '<domain>', { options: true, method: 'PUT' })
  edit(projectId, domain, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/pages/domains/${domain}`, options);
  }

  @api('<projectId>', '<domain>', { method: 'GET' })
  show(projectId, domain) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/pages/domains/${domain}`);
  }

  @api('<projectId>', '<domain>', { method: 'DELETE' })
  remove(projectId, domain) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/pages/domains/${domain}`);
  }
}

export default PagesDomains;
