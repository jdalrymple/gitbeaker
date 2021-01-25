import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, RequestHelper } from '../infrastructure';

const url = (userId) =>
  userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';

export class UserGPGKeys<C extends boolean> extends BaseService<C> {
  all({ userId, ...options }: { userId?: number } & PaginatedRequestOptions = {}) {
    return RequestHelper.get<C>(this, url(userId), options);
  }

  add(key: string, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    return RequestHelper.post<C>(this, url(userId), {
      key,
      ...options,
    });
  }

  show(keyId: number, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get<C>(this, `${url(userId)}/${kId}`, options);
  }

  remove(keyId: number, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.del<C>(this, `${url(userId)}/${kId}`, options);
  }
}
