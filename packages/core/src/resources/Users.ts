import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { ProjectExtendedSchema } from './Projects';
import { EventOptions, EventSchema } from './Events';

export interface UserSchema extends Record<string, unknown> {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string;
  web_url: string;
  created_at?: string;
}

export interface UserExtendedSchema extends UserSchema {
  bio?: string;
  location?: string;
  public_email: string;
  skype: string;
  linkedin: string;
  twitter: string;
  website_url: string;
  organization?: string;
  last_sign_in_at: string;
  confirmed_at: string;
  last_activity_on: string;
  email: string;
  theme_id: number;
  color_scheme_id: number;
  projects_limit: number;
  current_sign_in_at?: string;
  identities?: string[];
  can_create_group: boolean;
  can_create_project: boolean;
  two_factor_enabled: boolean;
  external: boolean;
  private_profile?: string;
}

export interface UserActivitySchema extends Record<string, unknown> {
  username: string;
  last_activity_on: string;
  last_activity_at: string;
}

export class Users<C extends boolean = false> extends BaseResource<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<UserSchema[]>()(this, 'users', options);
  }

  activities(options?: Sudo) {
    return RequestHelper.get<UserActivitySchema[]>()(this, 'users/activities', options);
  }

  projects(userId: number, options?: Sudo) {
    return RequestHelper.get<ProjectExtendedSchema[]>()(this, `users/${userId}/projects`, options);
  }

  block(userId: number, options?: Sudo) {
    return RequestHelper.post()(this, `users/${userId}/block`, options);
  }

  create(options?: BaseRequestOptions) {
    return RequestHelper.post<UserSchema>()(this, 'users', options);
  }

  current(options?: Sudo) {
    return RequestHelper.get<UserSchema>()(this, 'user', options);
  }

  edit(userId: number, options?: BaseRequestOptions) {
    return RequestHelper.put<UserSchema>()(this, `users/${userId}`, options);
  }

  events(userId: number, options?: BaseRequestOptions & EventOptions) {
    return RequestHelper.get<EventSchema[]>()(this, `users/${userId}/events`, options);
  }

  search(emailOrUsername: string, options?: Sudo) {
    return RequestHelper.get<UserSchema[]>()(this, 'users', {
      search: emailOrUsername,
      ...options,
    });
  }

  show(userId: number, options?: BaseRequestOptions) {
    return RequestHelper.get<UserSchema>()(this, `users/${userId}`, options);
  }

  remove(userId: number, options?: Sudo) {
    return RequestHelper.del()(this, `users/${userId}`, options);
  }

  unblock(userId: number, options?: Sudo) {
    return RequestHelper.post()(this, `users/${userId}/unblock`, options);
  }

  username(username: string, options?: Sudo) {
    return RequestHelper.get<UserSchema[]>()(this, 'users', {
      username,
      ...options,
    });
  }
}
