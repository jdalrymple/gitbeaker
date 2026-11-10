import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, OneOf, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface GroupLDAPLinkSchema extends Record<string, unknown> {
  cn: string | null;
  group_access: number;
  provider: string;
  filter: string | null;
  member_role_id: number | null;
}

export class GroupLDAPLinks<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupLDAPLinkSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GroupLDAPLinkSchema[]>()(
      this,
      endpoint`groups/${groupId}/ldap_group_links`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  add<E extends boolean = false>(
    groupId: string | number,
    groupAccess: number,
    provider: string,
    options?: {
      memberRoleId?: number;
    } & OneOf<{ cn: string; filter: string }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<GroupLDAPLinkSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<GroupLDAPLinkSchema>()(
      this,
      endpoint`groups/${groupId}/ldap_group_links`,
      {
        sudo,
        showExpanded,
        body: { ...body, groupAccess, provider },
      },
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    provider: string,
    options?: OneOf<{ cn: string; filter: string }> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.del()(this, endpoint`groups/${groupId}/ldap_group_links`, {
      sudo,
      showExpanded,
      body: { ...body, provider },
    });
  }
}
