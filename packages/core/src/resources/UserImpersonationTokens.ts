import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestSearchParams,
  PaginationRequestSearchParams,
  RequestHelper,
} from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export type ImpersonationTokenScope =
  | 'api'
  | 'read_api'
  | 'read_user'
  | 'create_runner'
  | 'read_repository'
  | 'write_repository'
  | 'read_registry'
  | 'write_registry'
  | 'sudo'
  | 'admin_mode';

export type ImpersonationTokenState = 'all' | 'active' | 'inactive';

export interface UserImpersonationTokenSchema extends Record<string, unknown> {
  active: boolean;
  user_id: number;
  scopes?: string[];
  revoked: boolean;
  name: string;
  id: number;
  created_at: string;
  impersonation: boolean;
  expires_at: string;
  token?: string;
}

export class UserImpersonationTokens<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    userId: number,
    options?: PaginationRequestOptions<P> &
      BaseRequestSearchParams & { state?: ImpersonationTokenState } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserImpersonationTokenSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<UserImpersonationTokenSchema[]>()(
      this,
      `users/${userId}/impersonation_tokens`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams & PaginationRequestSearchParams<P>,
      },
    );
  }

  create<E extends boolean = false>(
    userId: number,
    name: string,
    scopes: ImpersonationTokenScope[],
    options?: { expiresAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserImpersonationTokenSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<UserImpersonationTokenSchema>()(
      this,
      `users/${userId}/impersonation_tokens`,
      {
        sudo,
        showExpanded,
        body: {
          name,
          scopes,
          ...body,
        },
      },
    );
  }

  show<E extends boolean = false>(
    userId: number,
    tokenId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserImpersonationTokenSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<UserImpersonationTokenSchema>()(
      this,
      `users/${userId}/impersonation_tokens/${tokenId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  remove<E extends boolean = false>(
    userId: number,
    tokenId: number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, `users/${userId}/impersonation_tokens/${tokenId}`, {
      sudo,
      showExpanded,
    });
  }

  // Convienence method
  revoke<E extends boolean = false>(
    userId: number,
    tokenId: number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return this.remove(userId, tokenId, options);
  }
}
