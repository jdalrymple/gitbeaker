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

export interface IdentitySchema extends Record<string, unknown> {
  extern_uid: string;
  user_id: number;
}

export class GroupSAMLIdentities<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<IdentitySchema[], C, E, P>> {
    return RequestHelper.get<IdentitySchema[]>()(
      this,
      endpoint`groups/${groupId}/saml/identities`,
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
      endpoint`groups/${groupId}/saml/${identityId}`,
      options,
    );
  }
}
