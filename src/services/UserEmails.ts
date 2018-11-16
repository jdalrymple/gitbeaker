import { BaseService, RequestHelper } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, UserId } from '@typings';

const url = userId => (userId ? `users/${encodeURIComponent(userId)}/emails` : 'user/emails');

class UserEmails extends BaseService {
  all({ userId, ...options }: { userId?: UserId } & PaginatedRequestOptions = {}) {
    return RequestHelper.get(this, url(userId), options);
  }

  add(email, { userId, ...options }: { userId?: UserId } & BaseRequestOptions = {}) {
    return RequestHelper.post(this, url(userId), {
      email,
      ...options,
    });
  }

  show(emailId, options?: BaseRequestOptions) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.get(this, `user/emails/${eId}`, options);
  }

  remove(emailId, { userId, ...options }: { userId?: UserId } & BaseRequestOptions = {}) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.delete(this, `${url(userId)}/${eId}`, options);
  }
}

export default UserEmails;
