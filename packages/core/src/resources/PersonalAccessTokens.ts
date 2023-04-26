import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
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
}

export type PersonalAccessTokenScopes =
  | 'api'
  | 'read_user'
  | 'read_api'
  | 'read_repository'
  | 'write_repository';

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
    options?: AllPersonalAccessTokenOptions & Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<PersonalAccessTokenSchema[], C, E, P>> {
    return RequestHelper.get<PersonalAccessTokenSchema[]>()(
      this,
      'personal_access_tokens',
      options,
    );
  }

  // Convience method - Also located in Users
  create<E extends boolean = false>(
    userId: number,
    name: string,
    scopes: string[],
    options?: { expiresAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PersonalAccessTokenSchema, C, E, void>> {
    return RequestHelper.post<PersonalAccessTokenSchema>()(
      this,
      endpoint`users/${userId}/personal_access_tokens`,
      {
        name,
        scopes,
        ...options,
      },
    );
  }

  remove<E extends boolean = false>({
    tokenId,
    ...options
  }: { tokenId?: string | number } & Sudo & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<void, C, E, void>
  > {
    const url = tokenId
      ? endpoint`personal_access_tokens/${tokenId}`
      : 'personal_access_tokens/self';

    return RequestHelper.del()(this, url, options);
  }

  show<E extends boolean = false>({
    tokenId,
    ...options
  }: { tokenId?: string | number } & Sudo & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<PersonalAccessTokenSchema, C, E, void>
  > {
    const url = tokenId
      ? endpoint`personal_access_tokens/${tokenId}`
      : 'personal_access_tokens/self';

    return RequestHelper.get<PersonalAccessTokenSchema>()(this, url, options);
  }
}
