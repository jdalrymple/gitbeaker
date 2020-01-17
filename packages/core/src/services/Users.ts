import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

import { EventOptions } from './Events';

export class Users extends BaseService {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get(this, 'users', options);
  }

  activities(options?: Sudo) {
    return RequestHelper.get(this, 'users/activities', options);
  }

  projects(userId: number, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/projects`, options);
  }

  block(userId: number, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/block`, options);
  }

  create(options?: BaseRequestOptions) {
    return RequestHelper.post(this, 'users', options);
  }

  current(options?: Sudo) {
    return RequestHelper.get(this, 'user', options);
  }

  edit(userId: number, options?: BaseRequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.put(this, `users/${uId}`, options);
  }

  events(userId: number, options?: BaseRequestOptions & EventOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}/events`, options);
  }

  search(emailOrUsername: string, options?: Sudo) {
    return RequestHelper.get(this, 'users', {
      search: emailOrUsername,
      ...options,
    });
  }

  show(userId: number, options?: BaseRequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get(this, `users/${uId}`, options);
  }

  remove(userId: number, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.del(this, `users/${uId}`, options);
  }

  unblock(userId: number, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post(this, `users/${uId}/unblock`, options);
  }
}
