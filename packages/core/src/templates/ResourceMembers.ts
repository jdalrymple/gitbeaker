import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from '../constants';

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

export type AddMemberOptions = OneOf<{ userId: string | number; username: string }> & {
  expiresAt?: string;
  inviteSource?: string;
  tasksToBeDone?: string[];
  tasksProjectId?: number;
};

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
    options?: AddMemberOptions & Sudo & ShowExpanded<E>,
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
    options?: IncludeInherited &
      PaginationRequestOptions<P> &
      AllMembersOptions &
      BaseRequestSearchParams &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberSchema[], C, E, P>> {
    const { includeInherited, sudo, showExpanded, maxPages, ...searchParams } = options || {};
    const url = includeInherited
      ? endpoint`${resourceId}/members/all`
      : endpoint`${resourceId}/members`;

    return RequestHelper.get<MemberSchema[]>()(this, url, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as PaginationRequestSearchParams<P> & BaseRequestSearchParams,
    });
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    userId: number,
    accessLevel: Exclude<AccessLevel, AccessLevel.ADMIN>,
    options?: { expiresAt?: string; memberRoleId?: number } & Sudo & ShowExpanded<E>,
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
    options?: IncludeInherited & Sudo & ShowExpanded<E>,
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
    options?: { skipSubresources?: boolean; unassignIssuables?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/members/${userId}`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }
}
