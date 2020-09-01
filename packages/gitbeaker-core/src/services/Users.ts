import {
  BaseRequestOptions,
  BaseService,
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
