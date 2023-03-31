import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

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
}

export class ResourceHooks<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  add<E extends boolean = false>(
    resourceId: string | number,
    url: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema, C, E, void>> {
    return RequestHelper.post<ExpandedHookSchema>()(this, endpoint`${resourceId}/hooks`, {
      url,
      ...options,
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema[], C, E, P>> {
    return RequestHelper.get<ExpandedHookSchema[]>()(this, endpoint`${resourceId}/hooks`, options);
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    hookId: number,
    url: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema, C, E, void>> {
    return RequestHelper.put<ExpandedHookSchema>()(this, endpoint`${resourceId}/hooks/${hookId}`, {
      url,
      ...options,
    });
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    hookId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${resourceId}/hooks/${hookId}`, options);
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    hookId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ExpandedHookSchema, C, E, void>> {
    return RequestHelper.get<ExpandedHookSchema>()(
      this,
      endpoint`${resourceId}/hooks/${hookId}`,
      options,
    );
  }
}
