import { ResourceAccessRequests } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class GroupAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseModelContructorOptions) {
    super('groups', options);
  }
}

export default GroupAccessRequests;
