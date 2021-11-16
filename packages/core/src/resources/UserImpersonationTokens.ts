import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

export type ImpersonationTokenScope = 'api' | 'read_user';
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
}

export class UserImpersonationTokens<C extends boolean = false> extends BaseResource<C> {
  all(userId: number, options?: { state?: ImpersonationTokenState } & PaginatedRequestOptions) {
    return RequestHelper.get<UserImpersonationTokenSchema[]>()(
      this,
      `users/${userId}/impersonation_tokens`,
      options,
    );
  }

  // TODO: change required params
  add(
    userId: number,
    name: string,
    scopes: ImpersonationTokenScope,
    expiresAt: string,
    options?: Sudo,
  ) {
    return RequestHelper.post<UserImpersonationTokenSchema>()(
      this,
      `users/${userId}/impersonation_tokens`,
      {
        name,
        expiresAt,
        scopes,
        ...options,
      },
    );
  }

  show(userId: number, tokenId: number, options?: Sudo) {
    return RequestHelper.get<UserImpersonationTokenSchema>()(
      this,
      `users/${userId}/impersonation_tokens/${tokenId}`,
      options,
    );
  }

  revoke(userId: number, tokenId: number, options?: Sudo) {
    return RequestHelper.del()(this, `users/${userId}/impersonation_tokens/${tokenId}`, options);
  }
}
