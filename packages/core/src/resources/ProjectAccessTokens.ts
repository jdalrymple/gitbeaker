import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceAccessTokens } from '../templates';
import type { AccessTokenSchema, AccessTokenScopes } from '../templates/ResourceAccessTokens';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from '../constants';

export interface ProjectAccessTokens<C extends boolean = false> extends ResourceAccessTokens<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<AccessTokenSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    name: string,
    scopes: AccessTokenScopes[],
    options?: {
      accessLevel?: Exclude<
        AccessLevel,
        AccessLevel.MINIMAL_ACCESS | AccessLevel.NO_ACCESS | AccessLevel.ADMIN
      >;
      expiresAt?: string;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessTokenSchema, C, E, void>>;

  revoke<E extends boolean = false>(
    projectId: string | number,
    tokenId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    tokenId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessTokenSchema, C, E, void>>;
}

export class ProjectAccessTokens<C extends boolean = false> extends ResourceAccessTokens<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
