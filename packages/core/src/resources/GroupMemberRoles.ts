import { BaseResource } from '@gitbeaker/requester-utils';
import type { AccessLevel } from '../templates/ResourceAccessRequests';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface MemberRoleSchema extends Record<string, unknown> {
  id: number;
  group_id: number;
  base_access_level: number;
  read_code: boolean;
}

export class GroupMemberRoles<C extends boolean = false> extends BaseResource<C> {
  add<E extends boolean = false>(
    groupId: string | number,
    baseAccessLevel: AccessLevel,
    options?: { readCode?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberRoleSchema, C, E, void>> {
    return RequestHelper.post<MemberRoleSchema>()(this, endpoint`groups/${groupId}/members`, {
      baseAccessLevel,
      ...options,
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberRoleSchema[], C, E, P>> {
    return RequestHelper.get<MemberRoleSchema[]>()(
      this,
      endpoint`groups/${groupId}/member_roles`,
      options,
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    memberRoleId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`groups/${groupId}/member_roles/${memberRoleId}`,
      options,
    );
  }
}
