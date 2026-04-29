import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type {
  AccessTokenExposedSchema,
  AccessTokenSchema,
  AccessTokenScopes,
} from '../templates/ResourceAccessTokens';

import { AccessLevel } from '../constants';
import { ResourceAccessTokens } from '../templates';

export interface GroupAccessTokens<C extends boolean = false> extends ResourceAccessTokens<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AccessTokenSchema[], C, E, P>>;

  create<E extends boolean = false>(
    groupId: string | number,
    name: string,
    scopes: AccessTokenScopes[],
    expiresAt: string,
    options?: {
      accessLevel?: Exclude<
        AccessLevel,
        AccessLevel.MINIMAL_ACCESS | AccessLevel.NO_ACCESS | AccessLevel.ADMIN
      >;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<AccessTokenExposedSchema, C, E, void>>;

  revoke<E extends boolean = false>(
    groupId: string | number,
    tokenId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  rotate<E extends boolean = false>(
    groupId: string | number,
    tokenId: string | number,
    options?: { expiresAt?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AccessTokenExposedSchema, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    tokenId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AccessTokenSchema, C, E, void>>;
}

export class GroupAccessTokens<C extends boolean = false> extends ResourceAccessTokens<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
