import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, HookId } from '@typings';

class ProjectHooks extends BaseService {
  all(projectId: ProjectId, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/hooks`, options);
  }

  show(projectId: ProjectId, hookId: HookId, options?: Sudo) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/hooks/${hId}`, options);
  }

  add(projectId: ProjectId, url: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/hooks`, { url, ...options });
  }

  edit(projectId: ProjectId, hookId: HookId, url: string, options?: BaseRequestOptions) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/hooks/${hId}`, { url, ...options });
  }

  remove(projectId: ProjectId, hookId: HookId, options?: Sudo) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/hooks/${hId}`, options);
  }
}

export default ProjectHooks;
