import { ResourceAccessRequests } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

class GroupAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupAccessRequests;
