import { ResourceMilestones } from '../templates';

export class GroupMilestones {
  constructor(options) {
    return new ResourceMilestones('groups', options);
  }
}

export default GroupMilestones;
