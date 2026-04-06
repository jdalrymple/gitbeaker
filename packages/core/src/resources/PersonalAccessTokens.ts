import { BaseResource } from '@gitbeaker/requester-utils';
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

export interface PersonalAccessTokenSchema extends Record<string, unknown> {
  id: number;
  name: string;
  revoked: boolean;
  created_at: string;
  scopes?: string[];
  user_id: number;
  last_used_at: string;
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
};

export class PersonalAccessTokens<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    options?: AllPersonalAccessTokenOptions &
      BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PersonalAccessTokenSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<PersonalAccessTokenSchema[]>()(this, 'personal_access_tokens', {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }

  // Convience method - Also located in Users
  create<E extends boolean = false>(
    userId: number,
    name: string,
    scopes: string[],
    options?: { expiresAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PersonalAccessTokenSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<PersonalAccessTokenSchema>()(
      this,
      endpoint`users/${userId}/personal_access_tokens`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          name,
          scopes,
        },
      },
    );
  }

  remove<E extends boolean = false>(
    options?: { tokenId?: string | number } & Sudo & ShowExpanded<E>,
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
    options?: { expiresAt?: string } & Sudo & ShowExpanded<E>,
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
    options?: { tokenId?: string | number } & Sudo & ShowExpanded<E>,
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
}
