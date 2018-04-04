import { BaseService, RequestHelper } from '../infrastructure';

class ProjectHooks extends BaseService {
  all(projectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/hooks`, options);
  }

  show(projectId, hookId) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/hooks/${hId}`);
  }

  add(projectId, url, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/hooks`, { url, ...options });
  }

  edit(projectId, hookId, url, options) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/hooks/${hId}`, { url, ...options });
  }

  remove(projectId, hookId) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/hooks/${hId}`);
  }
}

export default ProjectHooks;
