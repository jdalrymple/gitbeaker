import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class ProjectHooks extends BaseService {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/hooks`, options);
  }

  show(projectId: string | number, hookId: number, options?: Sudo) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.get(this, `projects/${pId}/hooks/${hId}`, options);
  }

  add(projectId: string | number, url: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/hooks`, { url, ...options });
  }

  edit(projectId: string | number, hookId: number, url: string, options?: BaseRequestOptions) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.put(this, `projects/${pId}/hooks/${hId}`, { url, ...options });
  }

  remove(projectId: string | number, hookId: number, options?: Sudo) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.del(this, `projects/${pId}/hooks/${hId}`, options);
  }
}
