import { ResourceMilestones } from '../templates';

class GroupMilestones extends ResourceMilestones {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupMilestones;
