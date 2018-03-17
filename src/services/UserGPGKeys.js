import { BaseService, RequestHelper } from '../infrastructure';

class UserGPGKeys extends BaseService {
  all({ userId }) {
    const url = userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';

    return RequestHelper.get(this, url);
  }

  add(title, key, { userId }) {
    const url = userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';

    return RequestHelper.post(this, url, {
      title,
      key,
    });
  }

  show(keyId, { userId }) {
    const kId = encodeURIComponent(keyId);
    const url = userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';

    return RequestHelper.get(this, `${url}/${kId}`);
  }

  remove(keyId, { userId }) {
    const kId = encodeURIComponent(keyId);
    const url = userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';

    return RequestHelper.delete(this, `${url}/${kId}`);
  }
}

export default UserGPGKeys;
