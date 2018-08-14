import { BaseService, RequestHelper } from '../infrastructure';
import { api, cls } from '../cli/worker';

const url = userId => (userId ? `users/${encodeURIComponent(userId)}/emails` : 'user/emails');

@cls()
class UserEmails extends BaseService {
  @api('<userId>', { method: 'GET' })
  all(userId) {
    return RequestHelper.get(this, url(userId));
  }

  @api('<userId>', '<email>', { method: 'POST' })
  add(userId, email) {
    return RequestHelper.post(this, url(userId), {
      email,
    });
  }

  @api('<emailId>', { method: 'GET' })
  show(emailId) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.get(this, `user/emails/${eId}`);
  }

  @api('<userId>', '<emailId>', { method: 'DELETE' })
  remove(userId, emailId) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.delete(this, `${url(userId)}/${eId}`);
  }
}

export default UserEmails;
