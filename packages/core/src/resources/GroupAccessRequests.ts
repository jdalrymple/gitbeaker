import { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceAccessRequests } from '../templates';
import { AccessRequestSchema, AccessLevel } from '../templates/types';
import { Sudo, CamelizedRecord } from '../infrastructure';

export interface GroupAccessRequests<C extends boolean = false> extends ResourceAccessRequests<C> {
  all(groupId: string | number): Promise<CamelizedRecord<C, AccessRequestSchema>[]>;

  request(groupId: string | number): Promise<CamelizedRecord<C, AccessRequestSchema>>;

  approve(
    groupId: string | number,
    userId: number,
    options?: { accessLevel?: AccessLevel } & Sudo,
  ): Promise<CamelizedRecord<C, AccessRequestSchema>>;

  deny(groupId: string | number, userId: number): Promise<void>;
}

export class GroupAccessRequests<C extends boolean = false> extends ResourceAccessRequests<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
