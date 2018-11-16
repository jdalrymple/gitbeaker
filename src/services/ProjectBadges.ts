import { ResourceBadges } from '../templates';
import { BaseServiceOptions } from '@typings';

class ProjectBadges extends ResourceBadges {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectBadges;
