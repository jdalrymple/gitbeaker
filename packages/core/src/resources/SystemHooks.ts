import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { BaseRequestOptions, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { HookSchema } from '../templates/types';

export interface SystemHookTestResponse extends Record<string, unknown> {
  project_id: number;
  owner_email: string;
  owner_name: string;
  name: string;
  path: string;
  event_name: string;
}

export class SystemHooks<C extends boolean = false> extends BaseResource<C> {
  // Convenience method
  add<E extends boolean = false>(
    url: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<HookSchema, C, E, void>> {
    return this.create<E>(url, options);
  }

  all<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<HookSchema[], C, E, void>> {
    return RequestHelper.get<HookSchema[]>()(this, 'hooks', options);
  }

  create<E extends boolean = false>(
    url: string,
    options?: BaseRequestOptions<E>,
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
