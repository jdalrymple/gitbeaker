import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  endpoint,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface GroupHookSchema extends Record<string, unknown> {
  id: number;
  url: string;
  group_id: number;
  push_events: boolean;
  issues_events: boolean;
  confidential_issues_events: boolean;
  merge_requests_events: boolean;
  tag_push_events: boolean;
  note_events: boolean;
  confidential_note_events: boolean;
  job_events: boolean;
  pipeline_events: boolean;
  wiki_page_events: boolean;
  deployment_events: boolean;
  releases_events: boolean;
  subgroup_events: boolean;
  enable_ssl_verification: boolean;
  created_at: string;
}

export class GroupHooks<C extends boolean = false> extends BaseResource<C> {
  all(groupId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<GroupHookSchema[]>()(
      this,
      endpoint`groups/${groupId}/hooks`,
      options,
    );
  }

  show(groupId: string | number, hookId: number, options?: Sudo) {
    return RequestHelper.get<GroupHookSchema>()(
      this,
      endpoint`groups/${groupId}/hooks/${hookId}`,
      options,
    );
  }

  add(groupId: string | number, url: string, options?: BaseRequestOptions) {
    return RequestHelper.post<GroupHookSchema>()(this, endpoint`groups/${groupId}/hooks`, {
      url,
      ...options,
    });
  }

  edit(groupId: string | number, hookId: number, url: string, options?: BaseRequestOptions) {
    return RequestHelper.put<GroupHookSchema>()(
      this,
      endpoint`groups/${groupId}/hooks/${hookId}`,
      {
        url,
        ...options,
      },
    );
  }

  remove(groupId: string | number, hookId: number, options?: Sudo) {
    return RequestHelper.del()(this, endpoint`groups/${groupId}/hooks/${hookId}`, options);
  }
}
