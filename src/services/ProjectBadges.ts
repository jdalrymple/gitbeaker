import { ResourceBadges } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ProjectBadges extends ResourceBadges {
  constructor(options: BaseModelContructorOptions) {
    super('projects', options);
  }
}

export default ProjectBadges;
