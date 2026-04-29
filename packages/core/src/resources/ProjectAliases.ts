import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface ProjectAliasSchema extends Record<string, unknown> {
  id: number;
  project_id: string | number;
  name: string;
}

export class ProjectAliases<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectAliasSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ProjectAliasSchema[]>()(this, 'project_aliases', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  create<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectAliasSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ProjectAliasSchema>()(this, 'project_aliases', {
      sudo,
      showExpanded,
      body: {
        ...body,
        name,
        projectId,
      },
    });
  }

  edit<E extends boolean = false>(
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectAliasSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<ProjectAliasSchema>()(this, `project_aliases/${name}`, {
      sudo,
      showExpanded,
    });
  }

  remove<E extends boolean = false>(
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, `project_aliases/${name}`, {
      sudo,
      showExpanded,
    });
  }
}
