import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceAccessRequests, AccessRequestSchema, AccessLevel } from '../templates';
import { Sudo } from '../infrastructure';

export interface GroupAccessRequests extends ResourceAccessRequests {
  all(groupId: string | number): Promise<AccessRequestSchema[]>;

  request(groupId: string | number): Promise<AccessRequestSchema>;

  approve(
    groupId: string | number,
    userId: number,
    options?: { accessLevel?: AccessLevel } & Sudo,
  ): Promise<AccessRequestSchema>;

  deny(groupId: string | number, userId: number): Promise<void>;
}

export class GroupAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
