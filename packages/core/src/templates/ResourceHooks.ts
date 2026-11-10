import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

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
  name?: string;
  description?: string;
  push_events_branch_filter: string | null;
  branch_filter_strategy: string;
  issues_events: boolean;
  confidential_issues_events: boolean;
  note_events: boolean;
  confidential_note_events: boolean;
  job_events: boolean;
  pipeline_events: boolean;
  wiki_page_events: boolean;
  deployment_events: boolean;
  feature_flag_events: boolean;
  releases_events: boolean;
  milestone_events: boolean;
  subgroup_events?: boolean;
  member_events: boolean;
  project_events?: boolean;
  resource_access_token_events: boolean;
  emoji_events?: boolean;
  alert_status: string;
  disabled_until?: string | null;
  url_variables: unknown[];
  custom_webhook_template?: string;
  custom_headers?: { key: string; value?: string }[];
  token_present?: boolean;
  signing_token_present?: boolean;
}

export interface AddResourceHookOptions {
  name?: string;
  description?: string;
  branchFilterStrategy?: 'wildcard' | 'regex' | 'all_branches';
  confidentialIssuesEvents?: boolean;
  confidentialNoteEvents?: boolean;
  customHeaders?: { key: string; value?: string }[];
  customWebhookTemplate?: string;
  deploymentEvents?: boolean;
  enableSslVerification?: boolean;
  featureFlagEvents?: boolean;
  issuesEvents?: boolean;
  jobEvents?: boolean;
  memberEvents?: boolean;
  mergeRequestsEvents?: boolean;
  milestoneEvents?: boolean;
  noteEvents?: boolean;
  pipelineEvents?: boolean;
  projectEvents?: boolean;
  pushEvents?: boolean;
  pushEventsBranchFilter?: string;
  releasesEvents?: boolean;
  resourceAccessTokenEvents?: boolean;
  signingToken?: string;
  subgroupEvents?: boolean;
  tagPushEvents?: boolean;
  token?: string;
  wikiPageEvents?: boolean;
}

export type EditResourceHookOptions = AddResourceHookOptions;

export interface HookEventSchema extends Record<string, unknown> {
  id: number;
  url: string;
  trigger: string;
  request_headers: Record<string, string>;
  request_data: Record<string, unknown>;
  response_headers: Record<string, string>;
  response_body: string;
  execution_duration: number;
  response_status: string;
}

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
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
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

  allEvents<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    hookId: number,
    options?: { status?: string | number } & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<HookEventSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<HookEventSchema[]>()(
      this,
      endpoint`${resourceId}/hooks/${hookId}/events`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> & PaginationType<P>,
      },
    );
  }

  resendEvent<E extends boolean = false>(
    resourceId: string | number,
    hookId: number,
    eventId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ response_status: number }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<{ response_status: number }>()(
      this,
      endpoint`${resourceId}/hooks/${hookId}/events/${eventId}/resend`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
