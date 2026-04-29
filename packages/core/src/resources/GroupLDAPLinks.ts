import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { AccessLevel } from '../constants';
import { RequestHelper, endpoint } from '../infrastructure';

// Documentation: https://docs.gitlab.com/api/groups/#ldap-group-links
export class GroupLDAPLinks<C extends boolean = false> extends BaseResource<C> {
  add<E extends boolean = false>(
    groupId: string | number,
    groupAccess: number,
    provider: string,
    options?: {
      cn?: string;
      groupAccess?: Exclude<AccessLevel, AccessLevel.ADMIN>;
    } & ShowExpanded<E> &
      Sudo,
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
    options: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<string[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<string[]>()(this, endpoint`groups/${groupId}/ldap_group_links`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    provider: string,
    options?: { cn?: string; filter?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.del()(this, endpoint`groups/${groupId}/ldap_group_links`, {
      sudo,
      showExpanded,
      body: { ...body, provider },
    });
  }

  sync(groupId: string | number, options?: ShowExpanded & Sudo) {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post()(this, endpoint`groups/${groupId}/ldap_sync`, {
      sudo,
      showExpanded,
    });
  }
}
