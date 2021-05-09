import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, RequestHelper } from '../infrastructure';

export interface UserGPGKeySchema extends Record<string, unknown> {
  id: number;
  key: string;
  created_at: string;
}

const url = (userId?: number) =>
  userId ? `users/${encodeURIComponent(userId)}/gpg_keys` : 'users/gpg_keys';

export class UserGPGKeys<C extends boolean = false> extends BaseService<C> {
  all({ userId, ...options }: { userId?: number } & PaginatedRequestOptions = {}) {
    return RequestHelper.get<UserGPGKeySchema[]>()(this, url(userId), options);
  }

  add(key: string, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    return RequestHelper.post<UserGPGKeySchema>()(this, url(userId), {
      key,
      ...options,
    });
  }

  show(keyId: number, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get<UserGPGKeySchema>()(this, `${url(userId)}/${kId}`, options);
  }

  remove(keyId: number, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.del()(this, `${url(userId)}/${kId}`, options);
  }
}
