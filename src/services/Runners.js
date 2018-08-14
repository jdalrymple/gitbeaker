import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Runners extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/runners` : 'runners/all';

    return RequestHelper.get(this, url, options);
  }

  @api({ options: true, method: 'GET' })
  allOwned(options) {
    return RequestHelper.get(this, 'runners', options);
  }

  @api('<runnerId>', { options: true, method: 'PUT' })
  edit(runnerId, attributes) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.put(this, `runners/${rId}`, attributes);
  }

  @api('<projectId>', '<runnerId>', { method: 'POST' })
  enable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.post(this, `projects/${pId}/runners`, { runnerId: rId });
  }

  @api('<projectId>', '<runnerId>', { method: 'DELETE' })
  disable(projectId, runnerId) {
    const [pId, rId] = [projectId, runnerId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/runners/${rId}`);
  }

  @api('<runnerId>', { method: 'GET' })
  jobs(runnerId) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get(this, `runners/${rId}/jobs`);
  }

  @api('<runnerId>', { method: 'DELETE' })
  remove(runnerId) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.delete(this, `runners/${rId}`);
  }

  @api('<runnerId>', { method: 'GET' })
  show(runnerId) {
    const rId = encodeURIComponent(runnerId);

    return RequestHelper.get(this, `runners/${rId}`);
  }
}

export default Runners;
