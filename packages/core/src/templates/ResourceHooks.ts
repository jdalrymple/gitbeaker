import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface HookSchema extends Record<string, unknown> {
  id: number;
  url: string;
  created_at: string;
  push_events: boolean;
  tag_push_events: boolean;
  merge_requests_events: boolean;
  repository_update_events: boolean; // TODO: Does this only exist for system hooks?
  enable_ssl_verification: boolean;
}

export interface ExpandedHookSchema extends HookSchema {
  push_events_branch_filter: string;
  issues_events: boolean;
  confidential_issues_events: boolean;
  note_events: boolean;
  confidential_note_events: boolean;
  job_events: boolean;
  pipeline_events: boolean;
  wiki_page_events: boolean;
  deployment_events: boolean;
  releases_events: boolean;
  alert_status: string;
  disabled_until?: string;
  url_variables: string[];
}

export interface AddResourceHookOptions {
  memberEvents?: boolean;
  pushEvents?: boolean;
  pushEventsBranchFilter?: string;
  issuesEvents?: boolean;
  confidentialIssuesEvents?: boolean;
  mergeRequestsEvents?: boolean;
  tagPushEvents?: boolean;
  noteEvents?: boolean;
  confidentialNoteEvents?: boolean;
  jobEvents?: boolean;
  pipelineEvents?: boolean;
  wikiPageEvents?: boolean;
  deploymentEvents?: boolean;
  releasesEvents?: boolean;
  subgroupEvents?: boolean;
  enableSslVerification?: boolean;
  token?: string;
}

export type EditResourceHookOptions = AddResourceHookOptions;

export class ResourceHooks<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  add<E extends boolean = false>(
    resourceId: string | number,
    url: string,
    options?: AddResourceHookOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ExpandedHookSchema>()(this, endpoint`${resourceId}/hooks`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        url,
      },
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ExpandedHookSchema[]>()(this, endpoint`${resourceId}/hooks`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams & PaginationRequestSearchParams<P>,
    });
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    hookId: number,
    url: string,
    options?: EditResourceHookOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ExpandedHookSchema>()(this, endpoint`${resourceId}/hooks/${hookId}`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        url,
      },
    });
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    hookId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/hooks/${hookId}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    hookId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ExpandedHookSchema>()(this, endpoint`${resourceId}/hooks/${hookId}`, {
      sudo,
      showExpanded,
    });
  }
}
