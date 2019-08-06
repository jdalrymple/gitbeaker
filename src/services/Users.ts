import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { UserId, EventOptions } from '.';

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
