import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class ProjectHooks extends BaseService {
  @api('<projectId>', { options: true, method: 'GET' })
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/hooks`, options);
  }

  @api('<projectId>', '<hookId>', { method: 'GET' })
  show(projectId, hookId) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/hooks/${hId}`);
  }

  @api('<projectId>', '<url>', { options: true, method: 'POST' })
  add(projectId, url, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/hooks`, { url, ...options });
  }

  @api('<projectId>', '<hookId>', '<url>', { options: true, method: 'PUT' })
  edit(projectId, hookId, url, options) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/hooks/${hId}`, { url, ...options });
  }

  @api('<projectId>', '<hookId>', { method: 'DELETE' })
  remove(projectId, hookId) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/hooks/${hId}`);
  }
}

export default ProjectHooks;
