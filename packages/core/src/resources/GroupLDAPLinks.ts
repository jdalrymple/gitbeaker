import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { AccessLevel } from '../templates/ResourceAccessLevels';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

// Documentation: https://docs.gitlab.com/ee/api/groups.html#ldap-group-links
export class GroupLDAPLinks<C extends boolean = false> extends BaseResource<C> {
  add<E extends boolean = false>(
    groupId: string | number,
    groupAccess: number,
    provider: string,
    options?: { cn?: string; groupAccess?: AccessLevel } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    return RequestHelper.post<string>()(this, endpoint`groups/${groupId}/ldap_group_links`, {
      groupAccess,
      provider,
      ...options,
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string[], C, E, P>> {
    return RequestHelper.get<string[]>()(
      this,
      endpoint`groups/${groupId}/ldap_group_links`,
      options,
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    provider: string,
    options?: { cn?: string; filter?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`groups/${groupId}/ldap_group_links`, {
      provider,
      ...options,
    });
  }

  sync(groupId: string | number, options?: Sudo & ShowExpanded) {
    return RequestHelper.post()(this, endpoint`groups/${groupId}/ldap_sync`, options);
  }
}
