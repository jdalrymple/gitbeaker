import { ResourceMilestones } from '../templates';

class GroupMilestones {
  constructor(options) {
    return new ResourceMilestones('groups', options);
  }
}

export default GroupMilestones;
