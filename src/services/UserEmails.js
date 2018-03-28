import { BaseService, RequestHelper } from '../infrastructure';

const url = userId => (userId ? `users/${encodeURIComponent(userId)}/emails` : 'users/emails');

class UserEmails extends BaseService {
  all({ userId } = {}) {
    return RequestHelper.get(this, url(userId));
  }

  add(email, { userId } = {}) {
    return RequestHelper.post(this, url(userId), {
      email,
    });
  }

  show(emailId) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.get(this, `users/emails/${eId}`);
  }

  remove(emailId, { userId } = {}) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.delete(this, `${url(userId)}/${eId}`);
  }
}

export default UserEmails;
