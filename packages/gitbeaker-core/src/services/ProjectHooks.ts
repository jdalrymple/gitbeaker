import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class ProjectHooks<C extends boolean> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<C>(this, `projects/${pId}/hooks`, options);
  }

  show(projectId: string | number, hookId: number, options?: Sudo) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.get<C>(this, `projects/${pId}/hooks/${hId}`, options);
  }

  add(projectId: string | number, url: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<C>(this, `projects/${pId}/hooks`, { url, ...options });
  }

  edit(projectId: string | number, hookId: number, url: string, options?: BaseRequestOptions) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.put<C>(this, `projects/${pId}/hooks/${hId}`, { url, ...options });
  }

  remove(projectId: string | number, hookId: number, options?: Sudo) {
    const [pId, hId] = [projectId, hookId].map(encodeURIComponent);

    return RequestHelper.del<C>(this, `projects/${pId}/hooks/${hId}`, options);
  }
}
