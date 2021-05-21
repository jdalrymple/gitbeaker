import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { EventOptions, EventSchema, ProjectExtendedSchema, UserSchema } from '../models';
import { UserActivitySchema } from '../models/UserActivitySchema';

export class Users<C extends boolean = false> extends BaseService<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<UserSchema[]>()(this, 'users', options);
  }

  activities(options?: Sudo) {
    return RequestHelper.get<UserActivitySchema[]>()(this, 'users/activities', options);
  }

  projects(userId: number, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get<ProjectExtendedSchema[]>()(this, `users/${uId}/projects`, options);
  }

  block(userId: number, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post()(this, `users/${uId}/block`, options);
  }

  create(options?: BaseRequestOptions) {
    return RequestHelper.post<UserSchema>()(this, 'users', options);
  }

  current(options?: Sudo) {
    return RequestHelper.get<UserSchema>()(this, 'user', options);
  }

  edit(userId: number, options?: BaseRequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.put<UserSchema>()(this, `users/${uId}`, options);
  }

  events(userId: number, options?: BaseRequestOptions & EventOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get<EventSchema[]>()(this, `users/${uId}/events`, options);
  }

  search(emailOrUsername: string, options?: Sudo) {
    return RequestHelper.get<UserSchema>()(this, 'users', {
      search: emailOrUsername,
      ...options,
    });
  }

  show(userId: number, options?: BaseRequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get<UserSchema>()(this, `users/${uId}`, options);
  }

  remove(userId: number, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.del()(this, `users/${uId}`, options);
  }

  unblock(userId: number, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post()(this, `users/${uId}/unblock`, options);
  }
}
