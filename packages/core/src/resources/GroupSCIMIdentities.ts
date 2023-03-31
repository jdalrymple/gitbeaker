import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { IdentitySchema } from './GroupSAMLIdentities';

export class GroupSCIMIdentities<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<IdentitySchema[], C, E, P>> {
    return RequestHelper.get<IdentitySchema[]>()(
      this,
      endpoint`groups/${groupId}/scim/identities`,
      options,
    );
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    identityId: string,
    options: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.patch<void>()(
      this,
      endpoint`groups/${groupId}/scim/${identityId}`,
      options,
    );
  }
}
