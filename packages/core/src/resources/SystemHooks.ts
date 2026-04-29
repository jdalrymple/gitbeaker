import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { HookSchema } from '../templates/ResourceHooks';

import { RequestHelper } from '../infrastructure';

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
    options?: BaseRequestSearchParams & PaginationRequestOptions<'offset'> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<HookSchema[], C, E, 'offset'>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<HookSchema[]>()(this, 'hooks', {
      sudo,
      showExpanded,
      maxPages,
      searchParams,
    });
  }

  // Convenience method
  add<E extends boolean = false>(
    url: string,
    options?: CreateSystemHook & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<HookSchema, C, E, void>> {
    return this.create<E>(url, options);
  }

  create<E extends boolean = false>(
    url: string,
    options?: CreateSystemHook & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<HookSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<HookSchema>()(this, 'hooks', {
      sudo,
      showExpanded,
      body: {
        url,
        ...body,
      },
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
  ): Promise<GitlabAPIResponse<HookSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<HookSchema>()(this, `hooks/${hookId}`, {
      sudo,
      showExpanded,
    });
  }
}
