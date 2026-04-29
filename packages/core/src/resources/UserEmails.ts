import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

export interface UserEmailSchema extends Record<string, unknown> {
  id: number;
  email: string;
  confirmed_at: string;
}

export class UserEmails<C extends boolean = false> extends BaseResource<C> {
  // Convenience method for create
  add<E extends boolean = false>(
    email: string,
    options?: { userId?: number; skipConfirmation?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserEmailSchema, C, E, void>> {
    return this.create<E>(email, options);
  }

  all<E extends boolean = false>({
    userId,
    ...options
  }: { userId?: number } & ShowExpanded<E> & Sudo = {}): Promise<
    GitlabAPIResponse<UserEmailSchema[], C, E, void>
  > {
    const { sudo, showExpanded } = options || {};
    const url = getPrefixedUrl('emails', { users: userId, user: !userId });

    return RequestHelper.get<UserEmailSchema[]>()(this, url, {
      sudo,
      showExpanded,
    });
  }

  create<E extends boolean = false>(
    email: string,
    {
      userId,
      ...options
    }: { userId?: number; skipConfirmation?: boolean } & ShowExpanded<E> & Sudo = {},
  ): Promise<GitlabAPIResponse<UserEmailSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};
    const url = getPrefixedUrl('emails', { users: userId, user: !userId });

    return RequestHelper.post<UserEmailSchema>()(this, url, {
      sudo,
      showExpanded,
      body: {
        email,
        ...body,
      },
    });
  }

  show<E extends boolean = false>(
    emailId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserEmailSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<UserEmailSchema>()(this, endpoint`user/emails/${emailId}`, {
      sudo,
      showExpanded,
    });
  }

  remove<E extends boolean = false>(
    emailId: number,
    { userId, ...options }: { userId?: number } & ShowExpanded<E> & Sudo = {},
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    const suffix = endpoint`emails/${emailId}`;
    const uri = getPrefixedUrl(suffix, { users: userId, user: !userId });

    return RequestHelper.del()(this, uri, {
      sudo,
      showExpanded,
    });
  }
}
