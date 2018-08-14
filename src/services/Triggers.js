import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class Triggers extends BaseService {
  @api('<projectId>', { options: true, method: 'POST' })
  add(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/triggers`, options);
  }

  @api('<projectId>', { method: 'GET' })
  all(projectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/triggers`);
  }

  @api('<projectId>', '<triggerId>', { options: true, method: 'PUT' })
  edit(projectId, triggerId, options) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/triggers/${tId}`, options);
  }

  @api('<projectId>', '<triggerId>', { method: 'DELETE' })
  remove(projectId, triggerId) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/triggers/${tId}`);
  }

  @api('<projectId>', '<triggerId>', { method: 'GET' })
  show(projectId, triggerId) {
    const [pId, tId] = [projectId, triggerId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/triggers/${tId}`);
  }
}

export default Triggers;
