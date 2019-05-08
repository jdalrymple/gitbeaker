import { ResourceMilestones } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class ProjectMilestones extends ResourceMilestones {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectMilestones;
