import { ResourceAccessRequests } from '../templates';

class GroupAccessRequests extends ResourceAccessRequests {
  constructor(options) {
    super('groups', options);
  }
}

export default GroupAccessRequests;
