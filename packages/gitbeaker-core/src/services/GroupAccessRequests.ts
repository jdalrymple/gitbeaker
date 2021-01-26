import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceAccessRequests } from '../templates';

export class GroupAccessRequests<C extends boolean = false> extends ResourceAccessRequests<C> {
  constructor(options: BaseServiceOptions<C>) {
    super('groups', options);
  }
}
