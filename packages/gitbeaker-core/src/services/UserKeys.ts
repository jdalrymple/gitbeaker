import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, RequestHelper } from '../infrastructure';

const url = (userId) => (userId ? `users/${encodeURIComponent(userId)}/keys` : 'user/keys');

export class UserKeys<C extends boolean = false> extends BaseService<C> {
  all({ userId, ...options }: { userId?: number } & PaginatedRequestOptions = {}) {
    return RequestHelper.get<C>(this, url(userId), options);
  }

  create(
    title: string,
    key,
    { userId, ...options }: { userId?: number } & BaseRequestOptions = {},
  ) {
    return RequestHelper.post<C>(this, url(userId), {
      title,
      key,
      ...options,
    });
  }

  show(keyId, options?: BaseRequestOptions) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get<C>(this, `user/keys/${kId}`, options);
  }

  remove(keyId, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.del<C>(this, `${url(userId)}/${kId}`, options);
  }
}
