import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

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
  all<E extends boolean = false>({
    projectId,
    ...options
  }: { projectId?: string | number } & Sudo & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<PagesDomainSchema[], C, E, void>
  > {
    const prefix = projectId ? endpoint`projects/${projectId}/` : '';

    return RequestHelper.get<PagesDomainSchema[]>()(this, `${prefix}pages/domains`, options);
  }

  create<E extends boolean = false>(
    projectId: string | number,
    domain: string,
    options?: { autoSslEnabled?: string; certificate?: string; key?: string } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PagesDomainSchema, C, E, void>> {
    return RequestHelper.post<PagesDomainSchema>()(
      this,
      endpoint`projects/${projectId}/pages/domains`,
      {
        domain,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    domain: string,
    options?: { autoSslEnabled?: string; certificate?: string; key?: string } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PagesDomainSchema, C, E, void>> {
    return RequestHelper.put<PagesDomainSchema>()(
      this,
      endpoint`projects/${projectId}/pages/domains/${domain}`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    domain: string,
    options?: { autoSslEnabled?: string; certificate?: string; key?: string } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PagesDomainSchema, C, E, void>> {
    return RequestHelper.get<PagesDomainSchema>()(
      this,
      endpoint`projects/${projectId}/pages/domains/${domain}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    domain: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/pages/domains/${domain}`,
      options,
    );
  }
}
