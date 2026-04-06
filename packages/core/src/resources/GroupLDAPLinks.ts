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
import { AccessLevel } from '../constants';

// Documentation: https://docs.gitlab.com/api/groups/#ldap-group-links
export class GroupLDAPLinks<C extends boolean = false> extends BaseResource<C> {
  add<E extends boolean = false>(
    groupId: string | number,
    groupAccess: number,
    provider: string,
    options?: { cn?: string; groupAccess?: Exclude<AccessLevel, AccessLevel.ADMIN> } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<string>()(this, endpoint`groups/${groupId}/ldap_group_links`, {
      sudo,
      showExpanded,
      body: { ...body, groupAccess, provider },
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: PaginationRequestOptions<P> & BaseRequestSearchParams & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<string[]>()(this, endpoint`groups/${groupId}/ldap_group_links`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    provider: string,
    options?: { cn?: string; filter?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.del()(this, endpoint`groups/${groupId}/ldap_group_links`, {
      sudo,
      showExpanded,
      body: { ...body, provider },
    });
  }

  sync(groupId: string | number, options?: Sudo & ShowExpanded) {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post()(this, endpoint`groups/${groupId}/ldap_sync`, {
      sudo,
      showExpanded,
    });
  }
}
