import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface SystemHookSchema extends Record<string, unknown> {
  id: number;
  url: string;
  created_at: string;
  push_events: boolean;
  tag_push_events: boolean;
  merge_requests_events: boolean;
  repository_update_events: boolean;
  enable_ssl_verification: boolean;
}

export class SystemHooks<C extends boolean = false> extends BaseResource<C> {
  add(url: string, options?: BaseRequestOptions) {
    return RequestHelper.post<SystemHookSchema>()(this, 'hooks', { url, ...options });
  }

  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<SystemHookSchema[]>()(this, 'hooks', options);
  }

  edit(hookId: number, url: string, options?: BaseRequestOptions) {
    return RequestHelper.put<SystemHookSchema>()(this, `hooks/${hookId}`, { url, ...options });
  }

  remove(hookId: number, options?: Sudo) {
    return RequestHelper.del()(this, `hooks/${hookId}`, options);
  }
}
