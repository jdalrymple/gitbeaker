import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { IdentitySchema } from './GroupSAMLIdentities';

export class GroupSCIMIdentities<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IdentitySchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<IdentitySchema[]>()(
      this,
      endpoint`groups/${groupId}/scim/identities`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P>
      },
    );
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    identityId: string,
    options: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.patch<void>()(this, endpoint`groups/${groupId}/scim/${identityId}`, {
      sudo,
      showExpanded,
      body,
    });
  }
}
