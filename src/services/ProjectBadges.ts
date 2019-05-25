import { ResourceBadges } from '../templates';

class ProjectBadges extends ResourceBadges {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectBadges;
