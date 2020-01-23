import { BaseService, RequestHelper, PaginatedRequestOptions, Sudo } from '../infrastructure';

type ImpersonationTokenScope = 'api' | 'read_user';

export class UserImpersonationTokens extends BaseService {
  all(userId: number, options?: PaginatedRequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/impersonation_tokens`, options);
  }

  add(
    userId: number,
    name: string,
    scopes: ImpersonationTokenScope,
    expiresAt: string,
    options?: Sudo,
  ) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/impersonation_tokens`, {
      name,
      expiresAt,
      scopes,
      ...options,
    });
  }

  show(userId: number, tokenId: number, options?: Sudo) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.get(this, `users/${uId}/impersonation_tokens/${tId}`, options);
  }

  revoke(userId: number, tokenId: number, options?: Sudo) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.del(this, `users/${uId}/impersonation_tokens/${tId}`, options);
  }
}
