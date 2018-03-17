import { BaseService, RequestHelper } from '../infrastructure';

class UserKeys extends BaseService {
  all({ userId }) {
    const url = userId ? `users/${encodeURIComponent(userId)}/keys` : 'users/keys';

    return RequestHelper.get(this, url);
  }

  create(title, key, { userId }) {
    const url = userId ? `users/${encodeURIComponent(userId)}/keys` : 'users/keys';

    return RequestHelper.post(this, url, {
      title,
      key,
    });
  }

  show(keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `users/keys/${kId}`);
  }

  remove(keyId, { userId }) {
    const kId = encodeURIComponent(keyId);
    const url = userId ? `users/${encodeURIComponent(userId)}/keys` : 'users/keys';

    return RequestHelper.delete(this, `${url}/${kId}`);
  }
}

export default UserKeys;
