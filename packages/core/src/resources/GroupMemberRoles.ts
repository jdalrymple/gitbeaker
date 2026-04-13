import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from '../constants';

export interface MemberRoleSchema extends Record<string, unknown> {
  id: number;
  group_id: number;
  base_access_level: number;
  read_code: boolean;
}

export class GroupMemberRoles<C extends boolean = false> extends BaseResource<C> {
  add<E extends boolean = false>(
    groupId: string | number,
    baseAccessLevel: Exclude<
      AccessLevel,
      AccessLevel.NO_ACCESS | AccessLevel.MINIMAL_ACCESS | AccessLevel.ADMIN
    >,
    options?: { readCode?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberRoleSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<MemberRoleSchema>()(this, endpoint`groups/${groupId}/members`, {
      sudo,
      showExpanded,
      body: { ...body, baseAccessLevel },
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: PaginationRequestOptions<P> & BaseRequestSearchParams & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberRoleSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<MemberRoleSchema[]>()(this, endpoint`groups/${groupId}/member_roles`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams
    });
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    memberRoleId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`groups/${groupId}/member_roles/${memberRoleId}`, {
      sudo,
      showExpanded,
    });
  }
}
