import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint, getPrefixedUrl } from '../infrastructure';

export interface PersonalAccessTokenSchema extends Record<string, unknown> {
  id: number;
  name: string;
  description?: string;
  revoked: boolean;
  created_at: string;
  scopes?: string[];
  user_id: number;
  last_used_at: string | null;
  active: boolean;
  expires_at?: string;
  token: string;
}

export type PersonalAccessTokenScopes =
  | 'api'
  | 'read_api'
  | 'read_user'
  | 'create_runner'
  | 'read_repository'
  | 'write_repository'
  | 'read_registry'
  | 'write_registry'
  | 'sudo'
  | 'admin_mode';

export type AllPersonalAccessTokenOptions = {
  userId?: string | number;
  state?: 'active' | 'inactive';
  search?: string;
  revoked?: boolean;
  lastUsedBefore?: string;
  lastUsedAfter?: string;
  createdBefore?: string;
  createdAfter?: string;
  expiresAfter?: string;
  expiresBefore?: string;
  sort?:
    | 'created_asc'
    | 'created_desc'
    | 'expires_asc'
    | 'expires_desc'
    | 'last_used_asc'
    | 'last_used_desc'
    | 'name_asc'
    | 'name_desc';
};

export interface TokenAssociationGroupSchema extends Record<string, unknown> {
  id: number;
  web_url: string;
  name: string;
  parent_id: number | null;
  organization_id: number;
  access_levels: number;
  visibility: string;
}

export interface TokenAssociationProjectSchema extends Record<string, unknown> {
  id: number;
  description: string;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: string;
  access_levels: {
    project_access_level: number | null;
    group_access_level: number | null;
  };
  visibility: string;
  web_url: string;
  namespace: {
    id: number;
    name: string;
    path: string;
    kind: string;
    full_path: string;
    parent_id: number | null;
    avatar_url: string | null;
    web_url: string;
  };
}

export interface TokenAssociationsSchema extends Record<string, unknown> {
  groups: TokenAssociationGroupSchema[];
  projects: TokenAssociationProjectSchema[];
}

export class PersonalAccessTokens<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: AllPersonalAccessTokenOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<PersonalAccessTokenSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<PersonalAccessTokenSchema[]>()(this, 'personal_access_tokens', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  // Convenience method - Also located in Users
  create<E extends boolean = false>(
    name: string,
    scopes: string[],
    {
      userId,
      ...options
    }: { userId?: number; expiresAt?: string; description?: string } & ShowExpanded<E> & Sudo = {},
  ): Promise<GitlabAPIResponse<PersonalAccessTokenSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    const url = getPrefixedUrl('personal_access_tokens', { users: userId, user: !userId });

    return RequestHelper.post<PersonalAccessTokenSchema>()(this, url, {
      sudo,
      showExpanded,
      body: {
        ...body,
        name,
        scopes,
      },
    });
  }

  remove<E extends boolean = false>(
    options?: { tokenId?: string | number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { tokenId, sudo, showExpanded } = options || {};

    const url = tokenId
      ? endpoint`personal_access_tokens/${tokenId}`
      : 'personal_access_tokens/self';

    return RequestHelper.del()(this, url, {
      sudo,
      showExpanded,
    });
  }

  rotate<E extends boolean = false>(
    tokenId: number | 'self',
    options?: { expiresAt?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PersonalAccessTokenSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<PersonalAccessTokenSchema>()(
      this,
      endpoint`personal_access_tokens/${tokenId}/rotate`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  show<E extends boolean = false>(
    options?: { tokenId?: string | number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PersonalAccessTokenSchema, C, E, void>> {
    const { tokenId, sudo, showExpanded } = options || {};

    const url = tokenId
      ? endpoint`personal_access_tokens/${tokenId}`
      : 'personal_access_tokens/self';

    return RequestHelper.get<PersonalAccessTokenSchema>()(this, url, {
      sudo,
      showExpanded,
    });
  }

  allAssociations<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: {
      minAccessLevel?: 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50;
      page?: number;
      perPage?: number;
    } & PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<TokenAssociationsSchema, C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<TokenAssociationsSchema>()(
      this,
      'personal_access_tokens/self/associations',
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams &
          PaginationRequestSearchParams<P> &
          PaginationType<P>,
      },
    );
  }
}
