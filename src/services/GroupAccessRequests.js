import { ResourceAccessRequests } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceAccessRequests)
class GroupAccessRequests extends ResourceAccessRequests {
  constructor(options) {
    super('groups', options);
  }
}

export default GroupAccessRequests;
