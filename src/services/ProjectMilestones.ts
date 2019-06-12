import { ResourceMilestones } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

class ProjectMilestones extends ResourceMilestones {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectMilestones;
