import { ResourceMilestones } from '../templates';

class ProjectMilestones extends ResourceMilestones {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectMilestones;
