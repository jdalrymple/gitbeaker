import { BaseService, RequestHelper } from '../infrastructure';
import { UserIdOptions } from '@types';

const url = userId => (userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys');

class UserGPGKeys extends BaseService {
  all(options: UserIdOptions) {
    const { userId, ...opts } = options;

    return RequestHelper.get(this, url(userId), opts);
  }

  add(title, key, options: UserIdOptions) {
    const { userId, ...opts } = options;

    return RequestHelper.post(this, url(userId), {
      title,
      key,
      ...opts
    });
  }

  show(keyId, options: UserIdOptions) {
    const kId = encodeURIComponent(keyId);
    const { userId, ...opts } = options;

    return RequestHelper.get(this, `${url(userId)}/${kId}`, opts);
  }

  remove(keyId, options: UserIdOptions) {
    const kId = encodeURIComponent(keyId);
    const { userId, ...opts } = options;

    return RequestHelper.delete(this, `${url(userId)}/${kId}`, opts);
  }
}

export default UserGPGKeys;
