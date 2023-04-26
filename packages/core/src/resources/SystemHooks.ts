import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { HookSchema } from '../templates/ResourceHooks';

export interface SystemHookTestResponse extends Record<string, unknown> {
  project_id: number;
  owner_email: string;
  owner_name: string;
  name: string;
  path: string;
  event_name: string;
}

export interface CreateSystemHook {
  token?: string;
  pushEvents?: boolean;
  tagPushEvents?: boolean;
  mergeRequestsEvents?: boolean;
  repositoryUpdateEvents?: boolean;
  enableSslVerification?: boolean;
}

export class SystemHooks<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<HookSchema[], C, E, void>> {
    return RequestHelper.get<HookSchema[]>()(this, 'hooks', options);
  }

  // Convenience method
  add<E extends boolean = false>(
    url: string,
    options?: CreateSystemHook & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<HookSchema, C, E, void>> {
    return this.create<E>(url, options);
  }

  create<E extends boolean = false>(
    url: string,
    options?: CreateSystemHook & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<HookSchema, C, E, void>> {
    return RequestHelper.post<HookSchema>()(this, 'hooks', {
      url,
      ...options,
    });
  }

  test<E extends boolean = false>(
    hookId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SystemHookTestResponse, C, E, void>> {
    return RequestHelper.post<SystemHookTestResponse>()(this, `hooks/${hookId}`, options);
  }

  remove<E extends boolean = false>(
    hookId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, `hooks/${hookId}`, options);
  }

  show<E extends boolean = false>(
    hookId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<HookSchema, C, E, void>> {
    return RequestHelper.post<HookSchema>()(this, `hooks/${hookId}`, options);
  }
}
