import { BaseService, RequestHelper } from '../infrastructure';

const url = (userId?: UserId) => (userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys');

class UserGPGKeys extends BaseService {
  all({ userId }: UserIdOptions = {}) {
    return RequestHelper.get(this, url(userId));
  }

  add(title: string, key: string, { userId }: UserIdOptions = {}) {
    return RequestHelper.post(this, url(userId), {
      title,
      key,
    });
  }

  show(keyId: string, { userId }: UserIdOptions = {}) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `${url(userId)}/${kId}`);
  }

  remove(keyId: string, { userId }: UserIdOptions = {}) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.delete(this, `${url(userId)}/${kId}`);
  }
}

export default UserGPGKeys;
