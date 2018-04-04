import { BaseService, RequestHelper } from '../infrastructure';

class UserImpersonationTokens extends BaseService {
  all(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/impersonation_tokens`);
  }

  add(userId, name, scopes, expiresAt) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/impersonation_tokens`, {
      name,
      expiresAt,
      scopes,
    });
  }

  show(userId, tokenId) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.get(this, `users/${uId}/impersonation_tokens/${tId}`);
  }

  revoke(userId, tokenId) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.delete(this, `users/${uId}/impersonation_tokens/${tId}`);
  }
}

export default UserImpersonationTokens;
