import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceMembers, MembersSchema, IncludeInherited, AccessLevel } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface GroupMembers extends ResourceMembers {
  add(
    groupId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ): Promise<MembersSchema>;

  all(
    groupId: string | number,
    options?: IncludeInherited & PaginatedRequestOptions,
  ): Promise<MembersSchema[]>;

  edit(
    groupId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ): Promise<MembersSchema>;

  show(
    groupId: string | number,
    userId: number,
    options?: IncludeInherited & Sudo,
  ): Promise<MembersSchema>;

  remove(groupId: string | number, userId: number, options?: Sudo): Promise<void>;
}

export class GroupMembers extends ResourceMembers {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
