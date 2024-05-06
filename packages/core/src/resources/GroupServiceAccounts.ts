import { BaseResource } from '@gitbeaker/requester-utils';
import type { AccessTokenSchema } from '../templates/ResourceAccessTokens';
import type { ServiceAccountSchema } from './ServiceAccounts';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, MappedOmit, ShowExpanded, Sudo } from '../infrastructure';

export type ServiceAccountAccessTokenSchema = MappedOmit<AccessTokenSchema, 'access_level'>;

export class GroupServiceAccounts<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    groupId: string | number,
    options?: {
      name?: string;
      username?: string;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ServiceAccountSchema, C, E, void>> {
    return RequestHelper.post<ServiceAccountSchema>()(
      this,
      endpoint`groups/${groupId}/service_accounts`,
      options,
    );
  }

  // @deprecated In favor of `createPersonalAccessToken`
  addPersonalAccessToken<E extends boolean = false>(
    groupId: string | number,
    serviceAccountId: number,
    options?: { expiresAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ServiceAccountAccessTokenSchema, C, E, void>> {
    return this.createPersonalAccessToken(groupId, serviceAccountId, options);
  }

  createPersonalAccessToken<E extends boolean = false>(
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
