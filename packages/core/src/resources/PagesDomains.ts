import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  endpoint,
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

export class PagesDomains<C extends boolean = false> extends BaseResource<C> {
  all({ projectId, ...options }: { projectId?: string | number } & PaginatedRequestOptions = {}) {
    const url = projectId ? endpoint`projects/${projectId}/` : '';

    return RequestHelper.get<PagesDomainSchema[]>()(this, `${url}pages/domains`, options);
  }

  create(projectId: string | number, domain: string, options?: BaseRequestOptions) {
    return RequestHelper.post<PagesDomainSchema>()(
      this,
      endpoint`projects/${projectId}/pages/domains`,
      {
        domain,
        ...options,
      },
    );
  }

  edit(projectId: string | number, domain: string, options?: BaseRequestOptions) {
    return RequestHelper.put<PagesDomainSchema>()(
      this,
      endpoint`projects/${projectId}/pages/domains/${domain}`,
      options,
    );
  }

  show(projectId: string | number, domain: string, options?: Sudo) {
    return RequestHelper.get<PagesDomainSchema>()(
      this,
      endpoint`projects/${projectId}/pages/domains/${domain}`,
      options,
    );
  }

  remove(projectId: string | number, domain: string, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/pages/domains/${domain}`,
      options,
    );
  }
}
