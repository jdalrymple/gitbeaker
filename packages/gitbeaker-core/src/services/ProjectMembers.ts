import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMembers } from '../templates';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  CamelizedRecord,
  Sudo,
} from '../infrastructure';
import { AccessLevel, MembersSchema, IncludeInherited } from '../models';

export interface GroupMembers<C extends boolean = false> extends ResourceMembers<C> {
  add(
    projectId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MembersSchema>>;

  all(
    projectId: string | number,
    options?: IncludeInherited & PaginatedRequestOptions,
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
    options?: IncludeInherited & Sudo,
  ): Promise<CamelizedRecord<C, MembersSchema>>;

  remove(projectId: string | number, userId: number, options?: Sudo): Promise<void>;
}

export class ProjectMembers<C extends boolean = false> extends ResourceMembers<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
