import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

const url = userId => (userId ? `users/${encodeURIComponent(userId)}/keys` : 'user/keys');

@cls()
class UserKeys extends BaseService {
  @api('<userId>', { method: 'GET' })
  all(userId) {
    return RequestHelper.get(this, url(userId));
  }

  @api('<userId>', '<title>', '<key>', { method: 'POST' })
  create(userId, title, key) {
    return RequestHelper.post(this, url(userId), {
      title,
      key,
    });
  }

  @api('<keyId>', { method: 'GET' })
  show(keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `user/keys/${kId}`);
  }

  @api('<userId>', '<keyId>', { method: 'DELETE' })
  remove(userId, keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.delete(this, `${url(userId)}/${kId}`);
  }
}

export default UserKeys;
