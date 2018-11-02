import { BaseService, RequestHelper } from '../infrastructure';
import { HookId } from './SystemHooks';
import { RequestOptions } from '../infrastructure/RequestHelper';

class ProjectHooks extends BaseService {
  all(projectId: ProjectId, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/hooks`, options);
  }

  show(projectId: ProjectId, hookId: HookId) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/hooks/${hId}`);
  }

  add(projectId: ProjectId, url: string, options: RequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/hooks`, { url, ...options });
  }

  edit(projectId: ProjectId, hookId: HookId, url: string, options: RequestOptions) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/hooks/${hId}`, { url, ...options });
  }

  remove(projectId: ProjectId, hookId: HookId) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/hooks/${hId}`);
  }
}

export default ProjectHooks;
