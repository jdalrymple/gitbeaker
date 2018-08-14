import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

const url = userId => (userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys');

@cls()
class UserGPGKeys extends BaseService {
  @api('<userId>', { method: 'GET' })
  all(userId) {
    return RequestHelper.get(this, url(userId));
  }

  @api('<userId>', '<title>', '<key>', { method: 'POST' })
  add(userId, title, key) {
    return RequestHelper.post(this, url(userId), {
      title,
      key,
    });
  }

  @api('<userId>', '<keyId>', { method: 'POST' })
  show(userId, keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `${url(userId)}/${kId}`);
  }

  @api('<userId>', '<keyId>', { method: 'DELETE' })
  remove(userId, keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.delete(this, `${url(userId)}/${kId}`);
  }
}

export default UserGPGKeys;
