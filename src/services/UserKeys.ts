import { BaseService, RequestHelper } from '../infrastructure';

const url = (userId?: string) => (userId ? `users/${encodeURIComponent(userId)}/keys` : 'user/keys');

/** SSH key ID */
export type KeyId = string;
class UserKeys extends BaseService {
  all({ userId }: UserIdOptions) {
    return RequestHelper.get(this, url(userId));
  }
  /** Add SSH key for user */
  create(title: string, key: KeyId, { userId }: UserIdOptions = {}) {
    return RequestHelper.post(this, url(userId), {
      title,
      key,
    });
  }

  show(keyId: KeyId) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `user/keys/${kId}`);
  }

  remove(keyId: KeyId, { userId }: UserIdOptions = {}) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.delete(this, `${url(userId)}/${kId}`);
  }
}

export default UserKeys;
