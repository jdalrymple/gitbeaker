import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export class PagesDomains<C extends boolean> extends BaseService<C> {
  all({ projectId, ...options }: { projectId?: string | number } & PaginatedRequestOptions = {}) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/` : '';

    return RequestHelper.get<C>(this, `${url}pages/domains`, options);
  }

  create(projectId: string | number, domain: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<C>(this, `projects/${pId}/pages/domains`, { domain, ...options });
  }

  edit(projectId: string | number, domain: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put<C>(this, `projects/${pId}/pages/domains/${domain}`, options);
  }

  show(projectId: string | number, domain: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<C>(this, `projects/${pId}/pages/domains/${domain}`, options);
  }

  remove(projectId: string | number, domain: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del<C>(this, `projects/${pId}/pages/domains/${domain}`, options);
  }
}
