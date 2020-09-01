import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, RequestHelper } from '../infrastructure';

const url = (userId) => (userId ? `users/${encodeURIComponent(userId)}/keys` : 'user/keys');

export class UserKeys extends BaseService {
  all({ userId, ...options }: { userId?: number } & PaginatedRequestOptions = {}) {
    return RequestHelper.get(this, url(userId), options);
  }

  create(title, key, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    return RequestHelper.post(this, url(userId), {
      title,
      key,
      ...options,
    });
  }

  show(keyId, options?: BaseRequestOptions) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get(this, `user/keys/${kId}`, options);
  }

  remove(keyId, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.del(this, `${url(userId)}/${kId}`, options);
  }
}
