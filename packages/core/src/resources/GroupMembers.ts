import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceMembers } from '../templates';
import type {
  AddMemberOptions,
  AllMembersOptions,
  CondensedMemberSchema,
  IncludeInherited,
  MemberSchema,
  SimpleMemberSchema,
} from '../templates/ResourceMembers';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from '../constants';

export interface BillableGroupMemberSchema extends CondensedMemberSchema {
  last_activity_on: string;
  membership_type: string;
  removable: boolean;
  created_at: string;
}

export interface BillableGroupMemberMembershipSchema extends Record<string, unknown> {
  id: number;
  source_id: number;
  source_full_name: string;
  source_members_url: string;
  created_at: string;
  expires_at: string;
  access_level: {
    string_value: string;
    integer_value: Exclude<AccessLevel, AccessLevel.ADMIN>;
  };
}

export interface OverrodeGroupMemberSchema extends SimpleMemberSchema {
  override: boolean;
}

export interface GroupMembers<C extends boolean = false> extends ResourceMembers<C> {
  add<E extends boolean = false>(
    projectId: string | number,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options?: AddMemberOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: IncludeInherited &
      PaginationRequestOptions<P> &
      AllMembersOptions &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    userId: number,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options?: { expiresAt?: string; memberRoleId?: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    userId: number,
    options?: IncludeInherited & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
}

export class GroupMembers<C extends boolean = false> extends ResourceMembers<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }

  allBillable<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<BillableGroupMemberSchema[], C, E, P>> {
    return RequestHelper.get<BillableGroupMemberSchema[]>()(
      this,
      endpoint`${groupId}/billable_members`,
      options,
    );
  }

  allPending<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberSchema[], C, E, P>> {
    return RequestHelper.get<MemberSchema[]>()(this, endpoint`${groupId}/pending_members`, options);
  }

  allBillableMemberships<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: {
      search?: string;
      sort?:
        | 'access_level_asc'
        | 'access_level_desc'
        | 'last_joined'
        | 'name_asc'
        | 'name_desc'
        | 'oldest_joined'
        | 'oldest_sign_in'
        | 'recent_sign_in'
        | 'last_activity_on_asc'
        | 'last_activity_on_desc';
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<BillableGroupMemberMembershipSchema[], C, E, void>> {
    return RequestHelper.get<BillableGroupMemberMembershipSchema[]>()(
      this,
      endpoint`${groupId}/billable_members/${userId}/memberships`,
      options,
    );
  }

  approve<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>> {
    return RequestHelper.put<MemberSchema>()(
      this,
      endpoint`${groupId}/members/${userId}/approve`,
      options,
    );
  }

  approveAll<E extends boolean = false>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberSchema[], C, E, void>> {
    return RequestHelper.put<MemberSchema[]>()(
      this,
      endpoint`${groupId}/members/approve_all`,
      options,
    );
  }

  removeBillable<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${groupId}/billable_members/${userId}`, options);
  }

  removeOverrideFlag<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<OverrodeGroupMemberSchema, C, E, void>> {
    return RequestHelper.del<OverrodeGroupMemberSchema>()(
      this,
      endpoint`${groupId}/members/${userId}/override`,
      options,
    );
  }

  setOverrideFlag<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<OverrodeGroupMemberSchema, C, E, void>> {
    return RequestHelper.post<OverrodeGroupMemberSchema>()(
      this,
      endpoint`${groupId}/members/${userId}/override`,
      options,
    );
  }
}
