import { BaseService } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

type ImpersonationTokenScope = 'api' | 'read_user';
type ImpersonationTokenState = 'all' | 'active' | 'inactive';

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

export class UserImpersonationTokens<C extends boolean = false> extends BaseService<C> {
  all(userId: number, options?: { state?: ImpersonationTokenState } & PaginatedRequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get<UserImpersonationTokenSchema[]>()(
      this,
      `users/${uId}/impersonation_tokens`,
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
    const uId = encodeURIComponent(userId);

    return RequestHelper.post<UserImpersonationTokenSchema>()(
      this,
      `users/${uId}/impersonation_tokens`,
      {
        name,
        expiresAt,
        scopes,
        ...options,
      },
    );
  }

  show(userId: number, tokenId: number, options?: Sudo) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.get<UserImpersonationTokenSchema>()(
      this,
      `users/${uId}/impersonation_tokens/${tId}`,
      options,
    );
  }

  revoke(userId: number, tokenId: number, options?: Sudo) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.del()(this, `users/${uId}/impersonation_tokens/${tId}`, options);
  }
}
