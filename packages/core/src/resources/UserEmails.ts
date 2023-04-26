import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface UserEmailSchema extends Record<string, unknown> {
  id: number;
  email: string;
  confirmed_at: string;
}

const url = (userId?: number) => (userId ? `users/${userId}/emails` : 'user/emails');

export class UserEmails<C extends boolean = false> extends BaseResource<C> {
  // Convenience method for create
  add<E extends boolean = false>(
    email: string,
    options?: { userId?: number; skipConfirmation?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserEmailSchema, C, E, void>> {
    return this.create<E>(email, options);
  }

  all<E extends boolean = false>({
    userId,
    ...options
  }: { userId?: number } & Sudo & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<UserEmailSchema[], C, E, void>
  > {
    return RequestHelper.get<UserEmailSchema[]>()(
      this,
      url(userId),
      options as Sudo & ShowExpanded<E>,
    );
  }

  create<E extends boolean = false>(
    email: string,
    {
      userId,
      ...options
    }: { userId?: number; skipConfirmation?: boolean } & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<UserEmailSchema, C, E, void>> {
    return RequestHelper.post<UserEmailSchema>()(this, url(userId), {
      email,
      ...options,
    });
  }

  show<E extends boolean = false>(
    emailId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserEmailSchema, C, E, void>> {
    return RequestHelper.get<UserEmailSchema>()(this, `user/emails/${emailId}`, options);
  }

  remove<E extends boolean = false>(
    emailId: number,
    { userId, ...options }: { userId?: number } & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      `${url(userId)}/${emailId}`,
      options as Sudo & ShowExpanded<E>,
    );
  }
}
