import { ResourceMilestones } from '../templates';

export class ProjectMilestones {
  constructor(options) {
    return new ResourceMilestones('projects', options);
  }
}

export default ProjectMilestones;
