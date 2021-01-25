import { BaseService } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, PaginatedRequestOptions, RequestHelper } from '../infrastructure';

const url = (userId) => (userId ? `users/${encodeURIComponent(userId)}/emails` : 'user/emails');

export class UserEmails<C extends boolean> extends BaseService<C> {
  all({ userId, ...options }: { userId?: number } & PaginatedRequestOptions = {}) {
    return RequestHelper.get<C>(this, url(userId), options);
  }

  add(email, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    return RequestHelper.post<C>(this, url(userId), {
      email,
      ...options,
    });
  }

  show(emailId, options?: BaseRequestOptions) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.get<C>(this, `user/emails/${eId}`, options);
  }

  remove(emailId, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.del<C>(this, `${url(userId)}/${eId}`, options);
  }
}
