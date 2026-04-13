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
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { AccessLevel } from '../constants';
import { ResourceAccessTokens } from '../templates';

export interface ProjectAccessTokens<C extends boolean = false> extends ResourceAccessTokens<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AccessTokenSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
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
    projectId: string | number,
    tokenId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  rotate<E extends boolean = false>(
    projectId: string | number,
    tokenId: string | number,
    options?: { expiresAt?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AccessTokenExposedSchema, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    tokenId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AccessTokenSchema, C, E, void>>;
}

export class ProjectAccessTokens<C extends boolean = false> extends ResourceAccessTokens<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
