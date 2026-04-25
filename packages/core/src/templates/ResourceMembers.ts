import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { AccessLevel } from '../constants';
import { RequestHelper, endpoint } from '../infrastructure';

export interface IncludeInherited {
  includeInherited?: boolean;
}

export interface CondensedMemberSchema extends Record<string, unknown> {
  id: number;
  username: string;
  name: string;
  state: string;
  avatar_url: string;
  web_url: string;
}

export interface SimpleMemberSchema extends CondensedMemberSchema {
  expires_at: string;
  access_level: Exclude<AccessLevel, AccessLevel.ADMIN>;
  email: string;
}

export interface MemberSchema extends SimpleMemberSchema {
  group_saml_identity: {
    extern_uid: string;
    provider: string;
    saml_provider_id: number;
  };
}

export type AddMemberOptions = {
  expiresAt?: string;
  inviteSource?: string;
  tasksToBeDone?: string[];
  tasksProjectId?: number;
} & OneOf<{ userId: string | number; username: string }>;

export interface AllMembersOptions {
  query?: string;
  userIds?: number[];
  skipUsers?: number[];
  showSeatInfo?: boolean;
}

export class ResourceMembers<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  add<E extends boolean = false>(
    resourceId: string | number,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options?: AddMemberOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<MemberSchema>()(this, endpoint`${resourceId}/members`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        accessLevel,
      },
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: AllMembersOptions &
      BaseRequestSearchParams &
      IncludeInherited &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<MemberSchema[], C, E, P>> {
    const { includeInherited, sudo, showExpanded, maxPages, ...searchParams } = options || {};
    const url = includeInherited
      ? endpoint`${resourceId}/members/all`
      : endpoint`${resourceId}/members`;

    return RequestHelper.get<MemberSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    userId: number,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options?: { expiresAt?: string; memberRoleId?: number } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<MemberSchema>()(this, endpoint`${resourceId}/members/${userId}`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        accessLevel,
      },
    });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    userId: number,
    options?: IncludeInherited & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>> {
    const { includeInherited, sudo, showExpanded, ...searchParams } = options || {};
    const url = includeInherited
      ? endpoint`${resourceId}/members/all/${userId}`
      : endpoint`${resourceId}/members/${userId}`;

    return RequestHelper.get<MemberSchema>()(this, url, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    userId: number,
    options?: { skipSubresources?: boolean; unassignIssuables?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/members/${userId}`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }
}
