import { ResourceAccessRequests } from '../templates';

class GroupAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupAccessRequests;
