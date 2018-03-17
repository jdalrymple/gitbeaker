import { ResourceAccessRequests } from '../templates';

class GroupAccessRequests {
  constructor(options) {
    return new ResourceAccessRequests('groups', options);
  }
}

export default GroupAccessRequests;
