import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { AccessLevel } from './ResourceAccessRequests';

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
  access_level: AccessLevel;
  email: string;
}

export interface MemberSchema extends SimpleMemberSchema {
  group_saml_identity: {
    extern_uid: string;
    provider: string;
    saml_provider_id: number;
  };
}

export interface AddMemeberOptions {
  expiresAt?: string;
  inviteSource?: string;
  tasksToBeDone?: string[];
  tasksProjectId?: number;
}

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
    userId: number,
    accessLevel: AccessLevel,
    options?: AddMemeberOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>> {
    return RequestHelper.post<MemberSchema>()(this, endpoint`${resourceId}/members`, {
      userId: String(userId),
      accessLevel,
      ...options,
    });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    {
      includeInherited,
      ...options
    }: IncludeInherited &
      PaginationRequestOptions<P> &
      AllMembersOptions &
      BaseRequestOptions<E> = {} as any,
  ): Promise<GitlabAPIResponse<MemberSchema[], C, E, P>> {
    let url = endpoint`${resourceId}/members`;

    if (includeInherited) url += '/all';

    return RequestHelper.get<MemberSchema[]>()(this, url, options);
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: { expiresAt?: string; memberRoleId?: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>> {
    return RequestHelper.put<MemberSchema>()(this, endpoint`${resourceId}/members/${userId}`, {
      accessLevel,
      ...options,
    });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    userId: number,
    { includeInherited, ...options }: IncludeInherited & Sudo & ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<MemberSchema, C, E, void>> {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);
    const url = [rId, 'members'];

    if (includeInherited) url.push('all');

    url.push(uId);

    return RequestHelper.get<MemberSchema>()(
      this,
      url.join('/'),
      options as Sudo & ShowExpanded<E>,
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    userId: number,
    options?: { skipSubresourceS?: boolean; unassignIssuables?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${resourceId}/members/${userId}`, options);
  }
}
