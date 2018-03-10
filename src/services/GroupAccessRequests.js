import { ResourceAccessRequests } from '../templates';

export class GroupAccessRequests {
  constructor(options) {
    return new ResourceAccessRequests('groups', options);
  }
}

export default GroupAccessRequests;
