import { ResourceMilestones } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class GroupMilestones extends ResourceMilestones {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}
