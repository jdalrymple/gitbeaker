import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMembers, MembersSchema, IncludeInherited, AccessLevel } from '../templates';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  CamelizedRecord,
  Sudo,
} from '../infrastructure';

export interface GroupMembers<C extends boolean = false> extends ResourceMembers<C> {
  add(
    groupId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MembersSchema>>;

  all(
    groupId: string | number,
    options?: IncludeInherited & PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, MembersSchema>[]>;

  edit(
    groupId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MembersSchema>>;

  show(
    groupId: string | number,
    userId: number,
    options?: IncludeInherited & Sudo,
  ): Promise<CamelizedRecord<C, MembersSchema>>;

  remove(groupId: string | number, userId: number, options?: Sudo): Promise<void>;
}

export class GroupMembers<C extends boolean = false> extends ResourceMembers<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
