import { BaseService, RequestHelper } from '../infrastructure';

type ImpersonationTokenId = string | number;

class UserImpersonationTokens extends BaseService {
  all(userId: UserId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/impersonation_tokens`);
  }
  /**
   * It creates a new impersonation token. Note that only administrators can do this.
   * You are only able to create impersonation tokens to impersonate the user and perform
   * both API calls and Git reads and writes. The user will not see these tokens
   * in their profile settings page.
   * @param userId UserId
   * @param name The name of the impersonation token
   * @param scopes The array of scopes of the impersonation token (api, read_user)
   * @param expiresAt The expiration date of the impersonation token in ISO format (YYYY-MM-DD)
   */
  add(userId: UserId, name: string, scopes: temporaryAny, expiresAt: string) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/impersonation_tokens`, {
      name,
      expiresAt,
      scopes,
    });
  }

  show(userId: UserId, tokenId: ImpersonationTokenId) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.get(this, `users/${uId}/impersonation_tokens/${tId}`);
  }

  revoke(userId: UserId, tokenId: ImpersonationTokenId) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.delete(this, `users/${uId}/impersonation_tokens/${tId}`);
  }
}

export default UserImpersonationTokens;
