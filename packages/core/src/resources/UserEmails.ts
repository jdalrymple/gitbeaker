import { BaseResource } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, RequestHelper } from '../infrastructure';

export interface UserEmailSchema extends Record<string, unknown> {
  id: number;
  email: string;
  confirmed_at: string;
}

const url = (userId?: number) => (userId ? `users/${userId}/emails` : 'user/emails');

export class UserEmails<C extends boolean = false> extends BaseResource<C> {
  all({ userId, ...options }: { userId?: number } & PaginatedRequestOptions = {}) {
    return RequestHelper.get<UserEmailSchema[]>()(this, url(userId), options);
  }

  add(email: string, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    return RequestHelper.post<UserEmailSchema>()(this, url(userId), {
      email,
      ...options,
    });
  }

  show(emailId: number, options?: BaseRequestOptions) {
    return RequestHelper.get<UserEmailSchema>()(this, `user/emails/${emailId}`, options);
  }

  remove(emailId: number, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.del()(this, `${url(userId)}/${eId}`, options);
  }
}
