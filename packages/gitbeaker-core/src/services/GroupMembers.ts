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
    groupId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MembersSchema>>;

  all(
    groupId: string | number,
    { includeInherited, ...options }: IncludeInherited & PaginatedRequestOptions,
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
    { includeInherited, ...options }: IncludeInherited & Sudo,
  ): Promise<CamelizedRecord<C, MembersSchema>>;

  remove(groupId: string | number, userId: number, options?: Sudo): Promise<void>;
}

export class GroupMembers<C extends boolean = false> extends ResourceMembers<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('groups', options);
  }
}
