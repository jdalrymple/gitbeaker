import { BaseResource } from '@gitbeaker/requester-utils';
import type { AccessTokenSchema } from '../templates/ResourceAccessTokens';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, MappedOmit, ShowExpanded, Sudo } from '../infrastructure';

export interface GroupServiceAccountCreateOptions {
  name?: string;
  username?: string;
}

export interface GroupServiceAccountSchema extends Record<string, unknown> {
  id: number;
  username: string;
  name: string;
}

export type ServiceAccountAccessTokenSchema = MappedOmit<AccessTokenSchema, 'access_level'>;

export class GroupServiceAccounts<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    groupId: string | number,
    options?: GroupServiceAccountCreateOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupServiceAccountSchema, C, E, void>> {
    return RequestHelper.post<GroupServiceAccountSchema>()(
      this,
      endpoint`groups/${groupId}/service_accounts`,
      options,
    );
  }

  addPersonalAccessToken<E extends boolean = false>(
    groupId: string | number,
    serviceAccountId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ServiceAccountAccessTokenSchema, C, E, void>> {
    return RequestHelper.post<ServiceAccountAccessTokenSchema>()(
      this,
      endpoint`groups/${groupId}/service_accounts/${serviceAccountId}`,
      options,
    );
  }

  rotatePersonalAccessToken<E extends boolean = false>(
    groupId: string | number,
    serviceAccountId: number,
    tokenId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ServiceAccountAccessTokenSchema, C, E, void>> {
    return RequestHelper.post<ServiceAccountAccessTokenSchema>()(
      this,
      endpoint`groups/${groupId}/service_accounts/${serviceAccountId}/personal_access_tokens/${tokenId}/rotate`,
      options,
    );
  }
}
