import { ResourceMilestones } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class ProjectMilestones extends ResourceMilestones {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}
