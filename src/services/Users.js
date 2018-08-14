import { BaseService, RequestHelper } from '../infrastructure';
import { validateEventOptions } from './Events';
import { api, cls } from '../cli/worker';

@cls()
class Users extends BaseService {
  @api({ options: true })
  all(options) {
    return RequestHelper.get(this, 'users', options);
  }

  @api()
  activities() {
    return RequestHelper.get(this, 'users/activities');
  }

  @api('<userId>')
  projects(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/projects`);
  }

  @api('<userId>')
  block(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/block`);
  }

  @api({ options: true })
  create(options) {
    return RequestHelper.post(this, 'users', options);
  }

  @api({ alias: 'whoami' })
  current() {
    return RequestHelper.get(this, 'user');
  }

  @api('<userId>', { options: true })
  events(userId, options) {
    validateEventOptions(options.action, options.targetType);

    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/events`, options);
  }

  @api('<email>', '<password>')
  session(email, password) {
    return RequestHelper.post(this, 'session', {
      email,
      password,
    });
  }

  @api('<emailOrUsername>')
  search(emailOrUsername) {
    return RequestHelper.get(this, 'users', {
      search: emailOrUsername,
    });
  }

  @api('<userId>', { options: true })
  show(userId, options) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}`, options);
  }

  @api('<userId>')
  remove(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.delete(this, `users/${uId}`);
  }

  @api('<userId>')
  unblock(userId) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/unblock`);
  }
}

export default Users;
