import { BaseService, RequestHelper } from '../infrastructure';
import { assertEventOptions, EventOptions } from './Events';
import { RequestOptions } from '../infrastructure/RequestHelper';

class Users extends BaseService {
  all(options: RequestOptions) {
    return RequestHelper.get(this, 'users', options);
  }

  activities() {
    return RequestHelper.get(this, 'users/activities');
  }

  projects(userId: UserId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/projects`);
  }

  block(userId: UserId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/block`);
  }

  create(options: RequestOptions) {
    return RequestHelper.post(this, 'users', options);
  }

  current() {
    return RequestHelper.get(this, 'user');
  }

  edit(userId: UserId, options: RequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.put(this, `users/${uId}`, options);
  }

  events(userId: UserId, options: RequestOptions & EventOptions) {
    assertEventOptions(options.action, options.targetType);

    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/events`, options);
  }

  session(email: string, password: string) {
    return RequestHelper.post(this, 'session', {
      email,
      password,
    });
  }

  search(emailOrUsername: string) {
    return RequestHelper.get(this, 'users', {
      search: emailOrUsername,
    });
  }

  show(userId: UserId, options: RequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}`, options);
  }

  remove(userId: UserId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.delete(this, `users/${uId}`);
  }

  unblock(userId: UserId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/unblock`);
  }
}

export default Users;
