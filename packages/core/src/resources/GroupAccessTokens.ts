import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceAccessTokens } from '../templates';
import type { AccessTokenSchema, AccessTokenScopes } from '../templates/ResourceAccessTokens';
import type { AccessLevel } from '../templates/ResourceAccessRequests';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface GroupAccessTokens<C extends boolean = false> extends ResourceAccessTokens<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<AccessTokenSchema[], C, E, P>>;

  create<E extends boolean = false>(
    groupId: string | number,
    name: string,
    scopes: AccessTokenScopes[],
    options?: { accessLevel?: AccessLevel; expiresAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessTokenSchema, C, E, void>>;

  revoke<E extends boolean = false>(
    groupId: string | number,
    tokenId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    tokenId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessTokenSchema, C, E, void>>;
}

export class GroupAccessTokens<C extends boolean = false> extends ResourceAccessTokens<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
