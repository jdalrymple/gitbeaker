import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, UserId } from '@typings';

const url = (userId) => (userId ? `users/${encodeURIComponent(userId)}/keys` : 'user/keys');

class UserKeys extends BaseService {
  all({ userId, ...options }: { userId?: UserId } & PaginatedRequestOptions = {}) {
    return RequestHelper.get(this, url(userId), options);
  }

  create(title, key, { userId, ...options }: { userId?: UserId } & BaseRequestOptions = {}) {
    return RequestHelper.post(this, url(userId), {
      title,
      key,
      ...options
    });
  }

  show(keyId, options?: BaseRequestOptions) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `user/keys/${kId}`, options);
  }

  remove(keyId, { userId, ...options }: { userId?: UserId } & BaseRequestOptions = {}) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.delete(this, `${url(userId)}/${kId}`, options);
  }
}

export default UserKeys;
