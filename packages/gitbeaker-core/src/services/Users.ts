import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

import { EventOptions } from './Events';

export interface UserSchemaDefault {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string;
  web_url: string;
}

export interface UserSchemaCamelized {
  id: number;
  name: string;
  username: string;
  state: string;
  avatarUrl: string;
  webUrl: string;
}

// As of GitLab v12.6.2
export type UserSchema = UserSchemaDefault | UserSchemaCamelized;

export interface UserDetailSchemaDefault extends UserSchemaDefault {
  created_at: Date;
  bio?: string;
  location?: string;
  public_email: string;
  skype: string;
  linkedin: string;
  twitter: string;
  website_url?: string;
  organization?: string;
}

export interface UserDetailSchemaCamelized extends UserSchemaCamelized {
  createdAt: Date;
  bio?: string;
  location?: string;
  publicEmail: string;
  skype: string;
  linkedin: string;
  twitter: string;
  websiteUrl?: string;
  organization?: string;
}

// As of GitLab v12.6.2
export type UserDetailSchema = UserDetailSchemaDefault | UserSchemaCamelized;

export class Users<C extends boolean> extends BaseService<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<C>(this, 'users', options);
  }

  activities(options?: Sudo) {
    return RequestHelper.get<C>(this, 'users/activities', options);
  }

  projects(userId: number, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get<C>(this, `users/${uId}/projects`, options);
  }

  block(userId: number, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post<C>(this, `users/${uId}/block`, options);
  }

  create(options?: BaseRequestOptions) {
    return RequestHelper.post<C>(this, 'users', options);
  }

  current(options?: Sudo) {
    return RequestHelper.get<C>(this, 'user', options);
  }

  edit(userId: number, options?: BaseRequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.put<C>(this, `users/${uId}`, options);
  }

  events(userId: number, options?: BaseRequestOptions & EventOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get<C>(this, `users/${uId}/events`, options);
  }

  search(emailOrUsername: string, options?: Sudo) {
    return RequestHelper.get<C>(this, 'users', {
      search: emailOrUsername,
      ...options,
    });
  }

  show(userId: number, options?: BaseRequestOptions) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.get<C>(this, `users/${uId}`, options);
  }

  remove(userId: number, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.del<C>(this, `users/${uId}`, options);
  }

  unblock(userId: number, options?: Sudo) {
    const uId = encodeURIComponent(userId);

    return RequestHelper.post<C>(this, `users/${uId}/unblock`, options);
  }
}
