import { ResourceMilestones } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ProjectMilestones extends ResourceMilestones {
  constructor(options: BaseModelContructorOptions) {
    super('projects', options);
  }
}

export default ProjectMilestones;
