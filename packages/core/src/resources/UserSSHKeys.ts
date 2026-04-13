import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

export interface UserSSHKeySchema extends Record<string, unknown> {
  id: number;
  key: string;
  title: string;
  created_at: string;
}

export class UserSSHKeys<C extends boolean = false> extends BaseResource<C> {
  // Convienence method for create
  add<E extends boolean = false>(
    title: string,
    key: string,
    options?: {
      userId?: number;
      expiresAt?: string;
      usageType?: 'auth' | 'signing' | 'auth_and_signing';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<UserSSHKeySchema, C, E, void>> {
    return this.create<E>(title, key, options);
  }

  all<E extends boolean = false>({
    userId,
    ...options
  }: { userId?: number } & ShowExpanded<E> & Sudo = {}): Promise<
    GitlabAPIResponse<UserSSHKeySchema[], C, E, void>
  > {
    const { sudo, showExpanded } = options || {};

    const url = getPrefixedUrl('keys', { users: userId, user: !userId });

    return RequestHelper.get<UserSSHKeySchema[]>()(this, url, {
      sudo,
      showExpanded,
    });
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
    } & ShowExpanded<E> &
      Sudo = {},
  ): Promise<GitlabAPIResponse<UserSSHKeySchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    const url = getPrefixedUrl('keys', { users: userId, user: !userId });

    return RequestHelper.post<UserSSHKeySchema>()(this, url, {
      sudo,
      showExpanded,
      body: {
        ...body,
        title,
        key,
      },
    });
  }

  show<E extends boolean = false>(
    keyId: number,
    { userId, ...options }: { userId?: number } & ShowExpanded<E> & Sudo = {},
  ): Promise<GitlabAPIResponse<UserSSHKeySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    const suffix = endpoint`keys/${keyId}`;
    const uri = getPrefixedUrl(suffix, { users: userId, user: !userId });

    return RequestHelper.get<UserSSHKeySchema>()(this, uri, {
      sudo,
      showExpanded,
    });
  }

  remove<E extends boolean = false>(
    keyId: number,
    { userId, ...options }: { userId?: number } & ShowExpanded<E> & Sudo = {},
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    const suffix = endpoint`keys/${keyId}`;
    const uri = getPrefixedUrl(suffix, { users: userId, user: !userId });

    return RequestHelper.del()(this, uri, { sudo, showExpanded });
  }
}
