import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

export interface UserGPGKeySchema extends Record<string, unknown> {
  id: number;
  key: string;
  created_at: string;
}

export class UserGPGKeys<C extends boolean = false> extends BaseResource<C> {
  // Convienence method
  add<E extends boolean = false>(
    key: string,
    options?: { userId?: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<UserGPGKeySchema, C, E, void>> {
    return this.create<E>(key, options);
  }

  all<E extends boolean = false>({
    userId,
    ...options
  }: { userId?: number } & ShowExpanded<E> & Sudo = {}): Promise<
    GitlabAPIResponse<UserGPGKeySchema[], C, E, void>
  > {
    const { sudo, showExpanded } = options || {};

    const url = getPrefixedUrl('gpg_keys', { users: userId, user: !userId });

    return RequestHelper.get<UserGPGKeySchema[]>()(this, url, {
      sudo,
      showExpanded,
    });
  }

  create<E extends boolean = false>(
    key: string,
    { userId, ...options }: { userId?: number } & ShowExpanded<E> & Sudo = {},
  ): Promise<GitlabAPIResponse<UserGPGKeySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    const url = getPrefixedUrl('gpg_keys', { users: userId, user: !userId });

    return RequestHelper.post<UserGPGKeySchema>()(this, url, {
      sudo,
      showExpanded,
      body: {
        key,
      },
    });
  }

  show<E extends boolean = false>(
    keyId: number,
    { userId, ...options }: { userId?: number } & ShowExpanded<E> & Sudo = {},
  ): Promise<GitlabAPIResponse<UserGPGKeySchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    const suffix = endpoint`gpg_keys/${keyId}`;
    const uri = getPrefixedUrl(suffix, { users: userId, user: !userId });

    return RequestHelper.get<UserGPGKeySchema>()(this, uri, {
      sudo,
      showExpanded,
    });
  }

  remove<E extends boolean = false>(
    keyId: number,
    { userId, ...options }: { userId?: number } & ShowExpanded<E> & Sudo = {},
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    const suffix = endpoint`gpg_keys/${keyId}`;
    const uri = getPrefixedUrl(suffix, { users: userId, user: !userId });

    return RequestHelper.del()(this, uri, {
      sudo,
      showExpanded,
    });
  }
}
