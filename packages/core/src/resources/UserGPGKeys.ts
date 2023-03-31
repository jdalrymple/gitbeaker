import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface UserGPGKeySchema extends Record<string, unknown> {
  id: number;
  key: string;
  created_at: string;
}

const url = (userId?: number) => (userId ? `users/${userId}/gpg_keys` : 'user/gpg_keys');

export class UserGPGKeys<C extends boolean = false> extends BaseResource<C> {
  // Convienence method
  add<E extends boolean = false>(
    key: string,
    options?: { userId?: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<UserGPGKeySchema, C, E, void>> {
    return this.create<E>(key, options);
  }

  all<E extends boolean = false>({
    userId,
    ...options
  }: { userId?: number } & Sudo & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<UserGPGKeySchema[], C, E, void>
  > {
    return RequestHelper.get<UserGPGKeySchema[]>()(
      this,
      url(userId),
      options as Sudo & ShowExpanded<E>,
    );
  }

  create<E extends boolean = false>(
    key: string,
    { userId, ...options }: { userId?: number } & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<UserGPGKeySchema, C, E, void>> {
    return RequestHelper.post<UserGPGKeySchema>()(this, url(userId), {
      key,
      ...options,
    });
  }

  show<E extends boolean = false>(
    keyId: number,
    { userId, ...options }: { userId?: number } & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<UserGPGKeySchema, C, E, void>> {
    return RequestHelper.get<UserGPGKeySchema>()(
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
