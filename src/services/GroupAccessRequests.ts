import { ResourceAccessRequests } from '../templates';
import { BaseServiceOptions } from '@src/types';

class GroupAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupAccessRequests;
