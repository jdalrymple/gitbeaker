import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { AccessLevel } from './ResourceAccessRequests';

export type AccessTokenScopes =
  | 'api'
  | 'read_api'
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
  access_level: AccessLevel;
}

export class ResourceAccessTokens<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<AccessTokenSchema[], C, E, P>> {
    return RequestHelper.get<AccessTokenSchema[]>()(
      this,
      endpoint`${resourceId}/access_tokens`,
      options,
    );
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    name: string,
    scopes: AccessTokenScopes[],
    options?: { accessLevel?: AccessLevel; expiresAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessTokenSchema, C, E, void>> {
    return RequestHelper.post<AccessTokenSchema>()(this, endpoint`${resourceId}/access_tokens`, {
      name,
      scopes,
      ...options,
    });
  }

  revoke<E extends boolean = false>(
    resourceId: string | number,
    tokenId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${resourceId}/access_tokens/${tokenId}`, options);
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    tokenId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AccessTokenSchema, C, E, void>> {
    return RequestHelper.get<AccessTokenSchema>()(
      this,
      endpoint`${resourceId}/access_tokens/${tokenId}`,
      options,
    );
  }
}
