import { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceMembers } from '../templates';
import { MemberSchema, IncludeInherited, AccessLevel } from '../templates/types';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  CamelizedRecord,
  Sudo,
} from '../infrastructure';

export interface ProjectMembers<C extends boolean = false> extends ResourceMembers<C> {
  add(
    projectId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MemberSchema>>;

  all(
    projectId: string | number,
    options?: IncludeInherited & PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, MemberSchema>[]>;

  edit(
    projectId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MemberSchema>>;

  show(
    projectId: string | number,
    userId: number,
    options?: IncludeInherited & Sudo,
  ): Promise<CamelizedRecord<C, MemberSchema>>;

  remove(projectId: string | number, userId: number, options?: Sudo): Promise<void>;
}

export class ProjectMembers<C extends boolean = false> extends ResourceMembers<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
