import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMembers, MembersSchema, IncludeInherited } from '../templates/ResourceMembers';
import { AccessLevel } from '../templates/ResourceAccessRequests';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  CamelizedRecord,
  Sudo,
} from '../infrastructure';

export interface GroupMembers<C extends boolean = false> extends ResourceMembers<C> {
  add(
    projectId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MembersSchema>>;

  all(
    projectId: string | number,
    { includeInherited, ...options }: IncludeInherited & PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, MembersSchema>[]>;

  edit(
    projectId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MembersSchema>>;

  show(
    projectId: string | number,
    userId: number,
    { includeInherited, ...options }: IncludeInherited & Sudo,
  ): Promise<CamelizedRecord<C, MembersSchema>>;

  remove(projectId: string | number, userId: number, options?: Sudo): Promise<void>;
}

export class ProjectMembers<C extends boolean = false> extends ResourceMembers<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', options);
  }
}
