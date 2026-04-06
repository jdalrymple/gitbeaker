import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from '../constants';

export type AccessTokenScopes =
  | 'api'
  | 'read_api'
  | 'create_runner'
  | 'read_registry'
  | 'write_registry'
  | 'read_repository'
  | 'write_repository';

export interface AccessTokenSchema extends Record<string, unknown> {
  user_id: number;
  scopes?: AccessTokenScopes[];
  name: string;
  expires_at: string;
  id: number;
  active: boolean;
  created_at: string;
  revoked: boolean;
  access_level: Exclude<
    AccessLevel,
    AccessLevel.NO_ACCESS | AccessLevel.MINIMAL_ACCESS | AccessLevel.ADMIN
  >;
}

export interface AccessTokenExposedSchema extends AccessTokenSchema {
  token: string;
}

export class ResourceAccessTokens<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: BaseRequestSearchParams & Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<AccessTokenSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<AccessTokenSchema[]>()(this, endpoint`${resourceId}/access_tokens`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    name: string,
    scopes: AccessTokenScopes[],
    expiresAt: string,
    options?: {
      accessLevel?: Exclude<
        AccessLevel,
        AccessLevel.NO_ACCESS | AccessLevel.MINIMAL_ACCESS | AccessLevel.ADMIN
      >;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessTokenExposedSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<AccessTokenExposedSchema>()(
      this,
      endpoint`${resourceId}/access_tokens`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          name,
          scopes,
          expiresAt,
        },
      },
    );
  }

  revoke<E extends boolean = false>(
    resourceId: string | number,
    tokenId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/access_tokens/${tokenId}`, {
      sudo,
      showExpanded,
    });
  }

  rotate<E extends boolean = false>(
    resourceId: string | number,
    tokenId: string | number,
    options?: { expiresAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessTokenExposedSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<AccessTokenExposedSchema>()(
      this,
      endpoint`${resourceId}/access_tokens/${tokenId}/rotate`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    tokenId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessTokenSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<AccessTokenSchema>()(
      this,
      endpoint`${resourceId}/access_tokens/${tokenId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
