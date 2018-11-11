import { BaseService, RequestHelper } from '../infrastructure';
import { BaseRequestOptions, UserIdOptions } from '@src/types';

const url = userId => (userId ? `users/${encodeURIComponent(userId)}/emails` : 'user/emails');

class UserEmails extends BaseService {
  all(options: UserIdOptions) {
    const { userId, ...opts } = options;

    return RequestHelper.get(this, url(userId), opts);
  }

  add(email, options: UserIdOptions) {
    const { userId, ...opts } = options;

    return RequestHelper.post(this, url(userId), {
      email,
      ...opts
    });
  }

  show(emailId, options: BaseRequestOptions) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.get(this, `user/emails/${eId}`, options);
  }

  remove(emailId, options: UserIdOptions) {
    const eId = encodeURIComponent(emailId);
    const { userId, ...opts } = options;

    return RequestHelper.delete(this, `${url(userId)}/${eId}`, opts);
  }
}

export default UserEmails;
