import { BaseService, RequestHelper } from '../infrastructure';
import {
  PaginatedRequestOptions,
  Sudo,
  UserId,
  ImpersonationTokenId,
  ImpersonationTokenScope,
} from '@typings';

class UserImpersonationTokens extends BaseService {
  all(userId: UserId, options?: PaginatedRequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/impersonation_tokens`, options);
  }

  add(
    userId: UserId,
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

  show(userId: UserId, tokenId: ImpersonationTokenId, options?: Sudo) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.get(this, `users/${uId}/impersonation_tokens/${tId}`, options);
  }

  revoke(userId: UserId, tokenId: ImpersonationTokenId, options?: Sudo) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.del(this, `users/${uId}/impersonation_tokens/${tId}`, options);
  }
}

export default UserImpersonationTokens;
