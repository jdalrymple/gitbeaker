import { BaseService, RequestHelper } from '../infrastructure';
import { BaseRequestOptions, UserIdOptions } from '@src/types';

const url = userId => (userId ? `users/${encodeURIComponent(userId)}/keys` : 'user/keys');

class UserKeys extends BaseService {
  all(options: UserIdOptions) {
    const { userId, ...opts } = options;

    return RequestHelper.get(this, url(userId), opts);
  }

  create(title, key, options: UserIdOptions) {
    const { userId, ...opts } = options;

    return RequestHelper.post(this, url(userId), {
      title,
      key,
      ...opts
    });
  }

  show(keyId, options: BaseRequestOptions) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `user/keys/${kId}`, options);
  }

  remove(keyId, options: UserIdOptions) {
    const kId = encodeURIComponent(keyId);
    const { userId, ...opts } = options;

    return RequestHelper.delete(this, `${url(userId)}/${kId}`, opts);
  }
}

export default UserKeys;
