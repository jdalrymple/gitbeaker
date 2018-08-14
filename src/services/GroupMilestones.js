import { ResourceMilestones } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceMilestones)
class GroupMilestones extends ResourceMilestones {
  constructor(options) {
    super('groups', options);
  }
}

export default GroupMilestones;
