import { ResourceMilestones } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class GroupMilestones extends ResourceMilestones {
  constructor(options: BaseModelContructorOptions) {
    super('groups', options);
  }
}

export default GroupMilestones;
