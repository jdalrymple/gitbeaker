import { BaseService, RequestHelper } from '../infrastructure';

class ProjectHooks extends BaseService {
  all(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/hooks`, options);
  }

  show(projectId: ProjectId, hookId) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/hooks/${hId}`);
  }

  add(projectId: ProjectId, url, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/hooks`, { url, ...options });
  }

  edit(projectId: ProjectId, hookId, url, options) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/hooks/${hId}`, { url, ...options });
  }

  remove(projectId: ProjectId, hookId) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/hooks/${hId}`);
  }
}

export default ProjectHooks;
