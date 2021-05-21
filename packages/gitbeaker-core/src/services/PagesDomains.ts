import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface PagesDomainSchema extends Record<string, unknown> {
  domain: string;
  url: string;
  project_id: number;
  auto_ssl_enabled: boolean;
  certificate: {
    expired: boolean;
    expiration: string;
  };
}

// TODO: Add missing functions

export class PagesDomains extends BaseService {
  all({ projectId, ...options }: { projectId?: string | number } & PaginatedRequestOptions = {}) {
    const url = projectId ? `projects/${encodeURIComponent(projectId)}/` : '';

    return RequestHelper.get<PagesDomainSchema[]>()(this, `${url}pages/domains`, options);
  }

  create(projectId: string | number, domain: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<PagesDomainSchema>()(this, `projects/${pId}/pages/domains`, {
      domain,
      ...options,
    });
  }

  edit(projectId: string | number, domain: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put<PagesDomainSchema>()(
      this,
      `projects/${pId}/pages/domains/${domain}`,
      options,
    );
  }

  show(projectId: string | number, domain: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<PagesDomainSchema>()(
      this,
      `projects/${pId}/pages/domains/${domain}`,
      options,
    );
  }

  remove(projectId: string | number, domain: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.del()(this, `projects/${pId}/pages/domains/${domain}`, options);
  }
}
