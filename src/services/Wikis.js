import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Wikis extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/wikis`, options);
  }

  @api('<projectId>', { options: true, method: 'POST' })
  create(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/wikis`, options);
  }

  @api('<projectId>', '<slug>', { options: true, method: 'PUT' })
  edit(projectId, slug, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/wikis/${slug}`, options);
  }

  @api('<projectId>', '<slug>', { method: 'GET' })
  show(projectId, slug) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/wikis/${slug}`);
  }

  @api('<projectId>', '<slug>', { method: 'DELETE' })
  remove(projectId, slug) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}/wikis/${slug}`);
  }
}

export default Wikis;
