import { BaseService, RequestHelper } from '../infrastructure';

const url = userId => (userId ? `users/${encodeURIComponent(userId)}/keys` : 'user/keys');

class UserKeys extends BaseService {
  all({ userId }) {
    return RequestHelper.get(this, url(userId));
  }

  create(title, key, { userId }: UserIdOptions = {}) {
    return RequestHelper.post(this, url(userId), {
      title,
      key,
    });
  }

  show(keyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `user/keys/${kId}`);
  }

  remove(keyId, { userId }: UserIdOptions = {}) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.delete(this, `${url(userId)}/${kId}`);
  }
}

export default UserKeys;
