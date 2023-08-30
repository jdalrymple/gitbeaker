import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
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
    options?: { state?: ImpersonationTokenState } & PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserImpersonationTokenSchema[], C, E, P>> {
    return RequestHelper.get<UserImpersonationTokenSchema[]>()(
      this,
      `users/${userId}/impersonation_tokens`,
      options,
    );
  }

  create<E extends boolean = false>(
    userId: number,
    name: string,
    scopes: ImpersonationTokenScope[],
    options?: { expiresAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserImpersonationTokenSchema, C, E, void>> {
    return RequestHelper.post<UserImpersonationTokenSchema>()(
      this,
      `users/${userId}/impersonation_tokens`,
      {
        name,
        scopes,
        ...options,
      },
    );
  }

  show<E extends boolean = false>(
    userId: number,
    tokenId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserImpersonationTokenSchema, C, E, void>> {
    return RequestHelper.get<UserImpersonationTokenSchema>()(
      this,
      `users/${userId}/impersonation_tokens/${tokenId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    userId: number,
    tokenId: number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.del()(this, `users/${userId}/impersonation_tokens/${tokenId}`, options);
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
