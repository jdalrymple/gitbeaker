import { BaseService, RequestHelper } from '../infrastructure';
import { validateEventOptions } from './Events';
import { cli } from '../cli/worker';


class Users extends BaseService {
  all(options) {
    return RequestHelper.get(this, 'users', options);
  }

  activities() {
    return RequestHelper.get(this, 'users/activities');
  }

  projects(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/projects`);
  }

  block(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/block`);
  }

  create(options) {
    return RequestHelper.post(this, 'users', options);
  }

  @cli({ alias: 'whoami' })
  current() {
    return RequestHelper.get(this, 'user');
  }

  events(userId, options) {
    validateEventOptions(options.action, options.targetType);

    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/events`, options);
  }

  session(email, password) {
    return RequestHelper.post(this, 'session', {
      email,
      password,
    });
  }

  search(emailOrUsername) {
    return RequestHelper.get(this, 'users', {
      search: emailOrUsername,
    });
  }

  show(userId, options) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}`, options);
  }

  remove(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.delete(this, `users/${uId}`);
  }

  unblock(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/unblock`);
  }
}

export default Users;
