import { BaseService, RequestHelper } from '../infrastructure';

class UserEmails extends BaseService {
  all({ userId } = {}) {
    const url = userId ? `users/${encodeURIComponent(userId)}/emails` : 'users/emails';

    return RequestHelper.get(this, url);
  }

  add(email, { userId } = {}) {
    const url = userId ? `users/${encodeURIComponent(userId)}/emails` : 'users/emails';

    return RequestHelper.post(this, url, {
      email,
    });
  }

  show(emailId) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.get(this, `users/emails/${eId}`);
  }

  remove(emailId, { userId } = {}) {
    const eId = encodeURIComponent(emailId);
    const url = userId ? `users/${encodeURIComponent(userId)}/emails` : 'users/emails';

    return RequestHelper.delete(this, `${url}/${eId}`);
  }
}

export default UserEmails;
