import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceAccessRequests } from '../templates';

export class GroupAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}
