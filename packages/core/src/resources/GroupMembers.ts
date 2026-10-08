import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

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
import type {
  AddMemberOptions,
  AllMembersOptions,
  CondensedMemberSchema,
  IncludeInherited,
  MemberSchema,
  SimpleMemberSchema,
} from '../templates/ResourceMembers';

import { AccessLevel } from '../constants';
import { RequestHelper, endpoint } from '../infrastructure';
import { ResourceMembers } from '../templates';

export interface BillableGroupMemberSchema extends CondensedMemberSchema {
  last_activity_on: string;
  membership_type: string;
  removable: boolean;
  created_at: string;
  last_login_at?: string;
  email?: string;
}

export interface BillableGroupMemberMembershipSchema extends Record<string, unknown> {
  id: number;
  source_id: number;
  source_full_name: string;
  source_members_url: string;
  created_at: string;
  expires_at: string | null;
  access_level: {
    string_value: string;
    integer_value: Exclude<AccessLevel, AccessLevel.ADMIN>;
  };
}

export interface OverrodeGroupMemberSchema extends SimpleMemberSchema {
  override: boolean;
}

export interface PendingMemberSchema extends Record<string, unknown> {
  id: number;
  name?: string;
  username?: string;
  email: string;
  avatar_url: string;
  web_url?: string;
  approved: boolean;
  invited: boolean;
}

export interface GroupMembers<C extends boolean = false> extends ResourceMembers<C> {
  add<E extends boolean = false>(
    projectId: string | number,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options?: AddMemberOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: AllMembersOptions &
      BaseRequestSearchParams &
      IncludeInherited &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MemberSchema[], C, E, P>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    userId: number,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options?: { expiresAt?: string; memberRoleId?: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    userId: number,
    options?: IncludeInherited & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    userId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
}

export class GroupMembers<C extends boolean = false> extends ResourceMembers<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }

  allBillable<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
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
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<BillableGroupMemberSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<BillableGroupMemberSchema[]>()(
      this,
      endpoint`${groupId}/billable_members`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams &
          PaginationRequestSearchParams<P> &
          PaginationType<P>,
      },
    );
  }

  allPending<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PendingMemberSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<PendingMemberSchema[]>()(this, endpoint`${groupId}/pending_members`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  allBillableMemberships<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    userId: number,
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BillableGroupMemberMembershipSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<BillableGroupMemberMembershipSchema[]>()(
      this,
      endpoint`${groupId}/billable_members/${userId}/memberships`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> & PaginationType<P>,
      },
    );
  }

  allBillableIndirect<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    userId: number,
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<BillableGroupMemberMembershipSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<BillableGroupMemberMembershipSchema[]>()(
      this,
      endpoint`${groupId}/billable_members/${userId}/indirect`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as PaginationRequestSearchParams<P> & PaginationType<P>,
      },
    );
  }

  approve<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<MemberSchema>()(this, endpoint`${groupId}/members/${userId}/approve`, {
      sudo,
      showExpanded,
    });
  }

  approveAll<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MemberSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<MemberSchema[]>()(this, endpoint`${groupId}/members/approve_all`, {
      sudo,
      showExpanded,
    });
  }

  changeMembershipState<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    state: 'awaiting' | 'active',
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ success: boolean }, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<{ success: boolean }>()(
      this,
      endpoint`${groupId}/members/${userId}/state`,
      {
        sudo,
        showExpanded,
        searchParams: { state },
      },
    );
  }

  removeBillable<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${groupId}/billable_members/${userId}`, {
      sudo,
      showExpanded,
    });
  }

  removeOverrideFlag<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<OverrodeGroupMemberSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del<OverrodeGroupMemberSchema>()(
      this,
      endpoint`${groupId}/members/${userId}/override`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  setOverrideFlag<E extends boolean = false>(
    groupId: string | number,
    userId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<OverrodeGroupMemberSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<OverrodeGroupMemberSchema>()(
      this,
      endpoint`${groupId}/members/${userId}/override`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
