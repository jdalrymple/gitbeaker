import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface PageDeploymentSchema extends Record<string, unknown> {
  created_at: string;
  url: string;
  path_prefix: string;
  root_directory: string | null;
}

export interface PagesSchema extends Record<string, unknown> {
  url: string;
  is_unique_domain_enabled: boolean;
  force_https: boolean;
  deployments: PageDeploymentSchema[];
  primary_domain: string | null;
}

export interface UpdatePagesOptions {
  pagesUniqueDomainEnabled?: boolean;
  pagesHttpsOnly?: boolean;
  pagesPrimaryDomain?: string;
}

export class Pages<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PagesSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<PagesSchema>()(this, endpoint`projects/${projectId}/pages`, {
      sudo,
      showExpanded,
    });
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo & UpdatePagesOptions,
  ): Promise<GitlabAPIResponse<PagesSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.patch<PagesSchema>()(this, endpoint`projects/${projectId}/pages`, {
      sudo,
      showExpanded,
      body,
    });
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`projects/${projectId}/pages`, {
      sudo,
      showExpanded,
    });
  }
}
