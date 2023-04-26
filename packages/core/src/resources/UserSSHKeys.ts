import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface UserSSHKeySchema extends Record<string, unknown> {
  id: number;
  key: string;
  title: string;
  created_at: string;
}

const url = (userId?: number) => (userId ? `users/${userId}/keys` : 'user/keys');

export class UserSSHKeys<C extends boolean = false> extends BaseResource<C> {
  // Convienence method for create
  add<E extends boolean = false>(
    title: string,
    key: string,
    options?: {
      userId?: number;
      expiresAt?: string;
      usageType?: 'auth' | 'signing' | 'auth_and_signing';
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserSSHKeySchema, C, E, void>> {
    return this.create<E>(title, key, options);
  }

  all<E extends boolean = false>({
    userId,
    ...options
  }: { userId?: number } & Sudo & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<UserSSHKeySchema[], C, E, void>
  > {
    return RequestHelper.get<UserSSHKeySchema[]>()(
      this,
      url(userId),
      options as Sudo & ShowExpanded<E>,
    );
  }

  create<E extends boolean = false>(
    title: string,
    key: string,
    {
      userId,
      ...options
    }: {
      userId?: number;
      expiresAt?: string;
      usageType?: 'auth' | 'signing' | 'auth_and_signing';
    } & Sudo &
      ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<UserSSHKeySchema, C, E, void>> {
    return RequestHelper.post<UserSSHKeySchema>()(this, url(userId), {
      title,
      key,
      ...options,
    });
  }

  show<E extends boolean = false>(
    keyId: number,
    { userId, ...options }: { userId?: number } & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<UserSSHKeySchema, C, E, void>> {
    return RequestHelper.get<UserSSHKeySchema>()(
      this,
      `${url(userId)}/${keyId}`,
      options as Sudo & ShowExpanded<E>,
    );
  }

  remove<E extends boolean = false>(
    keyId: number,
    { userId, ...options }: { userId?: number } & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, `${url(userId)}/${keyId}`, options as Sudo & ShowExpanded<E>);
  }
}
