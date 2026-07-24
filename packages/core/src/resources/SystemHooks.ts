import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { ExpandedHookSchema, AddResourceHookOptions } from '../templates/ResourceHooks';

import { RequestHelper } from '../infrastructure';

export interface SystemHookTestResponse extends Record<string, unknown> {
  project_id: number;
  owner_email: string;
  owner_name: string;
  name: string;
  path: string;
  event_name: string;
}

export type CreateSystemHookOptions = {
  repositoryUpdateEvents?: boolean;
} & Omit<
  AddResourceHookOptions,
  | 'issuesEvents'
  | 'confidentialIssuesEvents'
  | 'noteEvents'
  | 'confidentialNoteEvents'
  | 'jobEvents'
  | 'pipelineEvents'
  | 'wikiPageEvents'
  | 'deploymentEvents'
  | 'featureFlagEvents'
  | 'milestoneEvents'
  | 'subgroupEvents'
  | 'projectEvents'
  | 'resourceAccessTokenEvents'
>;

export type EditSystemHookOptions = CreateSystemHookOptions;

export class SystemHooks<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    options?: BaseRequestSearchParams & PaginationRequestOptions<'offset'> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema[], C, E, 'offset'>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ExpandedHookSchema[]>()(this, 'hooks', {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  // Convenience method
  add<E extends boolean = false>(
    url: string,
    options?: CreateSystemHookOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema, C, E, void>> {
    return this.create<E>(url, options);
  }

  create<E extends boolean = false>(
    url: string,
    options?: CreateSystemHookOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ExpandedHookSchema>()(this, 'hooks', {
      sudo,
      showExpanded,
      body: {
        url,
        ...body,
      },
    });
  }

  edit<E extends boolean = false>(
    hookId: number,
    options?: EditSystemHookOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ExpandedHookSchema>()(this, `hooks/${hookId}`, {
      sudo,
      showExpanded,
      body,
    });
  }

  test<E extends boolean = false>(
    hookId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SystemHookTestResponse, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<SystemHookTestResponse>()(this, `hooks/${hookId}`, {
      sudo,
      showExpanded,
    });
  }

  remove<E extends boolean = false>(
    hookId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, `hooks/${hookId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    hookId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ExpandedHookSchema>()(this, `hooks/${hookId}`, {
      sudo,
      showExpanded,
    });
  }

  setUrlVariable<E extends boolean = false>(
    hookId: number,
    key: string,
    value: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<void>()(this, `hooks/${hookId}/url_variables/${key}`, {
      sudo,
      showExpanded,
      body: { value },
    });
  }

  removeUrlVariable<E extends boolean = false>(
    hookId: number,
    key: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, `hooks/${hookId}/url_variables/${key}`, {
      sudo,
      showExpanded,
    });
  }
}
