import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
} from '../infrastructure';

const url = userId => (userId ? `users/${encodeURIComponent(userId)}/emails` : 'user/emails');

export class UserEmails extends BaseService {
  all({ userId, ...options }: { userId?: number } & PaginatedRequestOptions = {}) {
    return RequestHelper.get(this, url(userId), options);
  }

  add(email, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    return RequestHelper.post(this, url(userId), {
      email,
      ...options,
    });
  }

  show(emailId, options?: BaseRequestOptions) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.get(this, `user/emails/${eId}`, options);
  }

  remove(emailId, { userId, ...options }: { userId?: number } & BaseRequestOptions = {}) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.del(this, `${url(userId)}/${eId}`, options);
  }
}
