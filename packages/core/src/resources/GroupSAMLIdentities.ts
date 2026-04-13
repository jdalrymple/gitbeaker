import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface IdentitySchema extends Record<string, unknown> {
  extern_uid: string;
  user_id: number;
}

export class GroupSAMLIdentities<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IdentitySchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<IdentitySchema[]>()(
      this,
      endpoint`groups/${groupId}/saml/identities`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P>,
      },
    );
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    identityId: string,
    options: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.patch<void>()(this, endpoint`groups/${groupId}/saml/${identityId}`, {
      sudo,
      showExpanded,
      body,
    });
  }
}
