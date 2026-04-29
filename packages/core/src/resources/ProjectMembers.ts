import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type {
  AddMemberOptions,
  AllMembersOptions,
  IncludeInherited,
  MemberSchema,
} from '../templates/ResourceMembers';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { AccessLevel } from '../constants';
import { ResourceMembers } from '../templates';

export interface ProjectMembers<C extends boolean = false> extends ResourceMembers<C> {
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
    accessLevel: AccessLevel,
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
    options?: { skipSubresourceS?: boolean; unassignIssuables?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
}

export class ProjectMembers<C extends boolean = false> extends ResourceMembers<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
