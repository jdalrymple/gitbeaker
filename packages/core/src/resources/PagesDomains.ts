import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

export interface PagesDomainSchema extends Record<string, unknown> {
  domain: string;
  url: string;
  project_id: number;
  auto_ssl_enabled?: boolean;
  certificate?: {
    expired: boolean;
    expiration: string;
    certificate: string;
    certificate_text: string;
  };
}

export class PagesDomains<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    options?: { projectId?: string | number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PagesDomainSchema[], C, E, void>> {
    const { projectId, sudo, showExpanded } = options || {};

    const url = getPrefixedUrl('pages/domains', { projects: projectId });

    return RequestHelper.get<PagesDomainSchema[]>()(this, url, {
      sudo,
      showExpanded,
    });
  }

  create<E extends boolean = false>(
    projectId: string | number,
    domain: string,
    options?: { autoSslEnabled?: string; certificate?: string; key?: string } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<PagesDomainSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<PagesDomainSchema>()(
      this,
      endpoint`projects/${projectId}/pages/domains`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          domain,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    domain: string,
    options?: { autoSslEnabled?: string; certificate?: string; key?: string } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<PagesDomainSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<PagesDomainSchema>()(
      this,
      endpoint`projects/${projectId}/pages/domains/${domain}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    domain: string,
    options?: { autoSslEnabled?: string; certificate?: string; key?: string } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<PagesDomainSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<PagesDomainSchema>()(
      this,
      endpoint`projects/${projectId}/pages/domains/${domain}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    domain: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/pages/domains/${domain}`, {
      sudo,
      showExpanded,
    });
  }
}
