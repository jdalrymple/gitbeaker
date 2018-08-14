import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

@cls()
class UserImpersonationTokens extends BaseService {
  @api('<userId>', { method: 'GET' })
  all(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/impersonation_tokens`);
  }

  @api('<userId>', '<name>', '<scopes>', '<expiresAt>', { method: 'POST' })
  add(userId, name, scopes, expiresAt) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/impersonation_tokens`, {
      name,
      expiresAt,
      scopes,
    });
  }

  @api('<userId>', '<tokenId>', { method: 'GET' })
  show(userId, tokenId) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.get(this, `users/${uId}/impersonation_tokens/${tId}`);
  }

  @api('<userId>', '<tokenId>', { method: 'DELETE' })
  revoke(userId, tokenId) {
    const [uId, tId] = [userId, tokenId].map(encodeURIComponent);

    return RequestHelper.delete(this, `users/${uId}/impersonation_tokens/${tId}`);
  }
}

export default UserImpersonationTokens;
