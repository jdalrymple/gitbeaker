import { ResourceMilestones } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceMilestones)
class ProjectMilestones extends ResourceMilestones {
  constructor(options) {
    super('projects', options);
  }
}

export default ProjectMilestones;
