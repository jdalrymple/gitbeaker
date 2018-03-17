import { ResourceMilestones } from '../templates';

class ProjectMilestones {
  constructor(options) {
    return new ResourceMilestones('projects', options);
  }
}

export default ProjectMilestones;
