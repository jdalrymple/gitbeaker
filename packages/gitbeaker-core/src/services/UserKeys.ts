import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, RequestHelper } from '../infrastructure';

export interface UserSSHKeySchema extends Record<string, unknown> {
  id: number;
  key: string;
  title: string;
  created_at: string;
}

const url = (userId?: number) =>
  userId ? `users/${encodeURIComponent(userId)}/keys` : 'user/keys';

export class UserKeys<C extends boolean = false> extends BaseService<C> {
  all({ userId, ...options }: { userId?: number } & PaginatedRequestOptions = {}) {
    return RequestHelper.get<UserSSHKeySchema[]>()(this, url(userId), options);
  }

  create(
    title: string,
    key: string,
    { userId, ...options }: { userId?: number } & BaseRequestOptions = {},
  ) {
    return RequestHelper.post<UserSSHKeySchema>()(this, url(userId), {
      title,
      key,
      ...options,
    });
  }

  show(keyId: string, options?: BaseRequestOptions) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.get<UserSSHKeySchema>()(this, `user/keys/${kId}`, options);
  }

  remove(keyId: string, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    const kId = encodeURIComponent(keyId);

    return RequestHelper.del()(this, `${url(userId)}/${kId}`, options);
  }
}
