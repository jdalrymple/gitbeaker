import { BaseService, RequestHelper } from '../infrastructure';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  UserId,
  EventOptions,
} from '@typings';

class Users extends BaseService {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'users', options);
  }

  activities(options?: Sudo) {
    return RequestHelper.get(this, 'users/activities', options);
  }

  projects(userId: UserId, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/projects`, options);
  }

  block(userId: UserId, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/block`, options);
  }

  create(options?: BaseRequestOptions) {
    return RequestHelper.post(this, 'users', options);
  }

  current(options?: Sudo) {
    return RequestHelper.get(this, 'user', options);
  }

  edit(userId: UserId, options?: BaseRequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.put(this, `users/${uId}`, options);
  }

  events(userId: UserId, options?: BaseRequestOptions & EventOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/events`, options);
  }

  session(email: string, password: string, options?: Sudo) {
    return RequestHelper.post(this, 'session', {
      email,
      password,
      ...options,
    });
  }

  search(emailOrUsername: string, options?: Sudo) {
    return RequestHelper.get(this, 'users', {
      search: emailOrUsername,
      ...options,
    });
  }

  show(userId: UserId, options?: BaseRequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}`, options);
  }

  remove(userId: UserId, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.del(this, `users/${uId}`, options);
  }

  unblock(userId: UserId, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/unblock`, options);
  }
}

export default Users;
