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

export interface AllPersonalAccessTokenOptions extends Record<string, unknown> {
  userId?: number;
  state?: string;
  search?: string;
  revoked?: boolean;
  last_used_before?: string;
  last_used_after?: string;
  created_before?: string;
  created_after?: string;
}

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

  create<E extends boolean = false>(
    userId: number,
    name: string,
    scopes: PersonalAccessTokenScopes,
    options?: { expires_at?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PersonalAccessTokenSchema, C, E, void>> {
    return RequestHelper.get<PersonalAccessTokenSchema>()(
      this,
      `user/${userId}/personal_access_tokens`,
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
