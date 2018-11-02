import { BaseService, RequestHelper } from '../infrastructure';

const url = (userId?: UserId) => (userId ? `users/${encodeURIComponent(userId)}/emails` : 'user/emails');

class UserEmails extends BaseService {
  all({ userId }: UserIdOptions = {}) {
    return RequestHelper.get(this, url(userId));
  }

  add(email: string, { userId }: UserIdOptions = {}) {
    return RequestHelper.post(this, url(userId), {
      email,
    });
  }

  show(emailId: string) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.get(this, `user/emails/${eId}`);
  }

  remove(emailId: string, { userId }: UserIdOptions = {}) {
    const eId = encodeURIComponent(emailId);

    return RequestHelper.delete(this, `${url(userId)}/${eId}`);
  }
}

export default UserEmails;
