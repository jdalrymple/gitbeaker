import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMembers, MembersSchema, IncludeInherited, AccessLevel } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface GroupMembers extends ResourceMembers {
  add(
    projectId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ): Promise<MembersSchema>;

  all(
    projectId: string | number,
    options?: IncludeInherited & PaginatedRequestOptions,
  ): Promise<MembersSchema[]>;

  edit(
    projectId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ): Promise<MembersSchema>;

  show(
    projectId: string | number,
    userId: number,
    options?: IncludeInherited & Sudo,
  ): Promise<MembersSchema>;

  remove(projectId: string | number, userId: number, options?: Sudo): Promise<void>;
}

export class ProjectMembers extends ResourceMembers {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
