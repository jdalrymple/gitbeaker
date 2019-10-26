import { ResourceAccessRequests } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class GroupAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}
