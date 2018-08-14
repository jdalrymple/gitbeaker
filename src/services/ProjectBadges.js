import { ResourceBadges } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceBadges)
class ProjectBadges extends ResourceBadges {
  constructor(options) {
    super('projects', options);
  }
}

export default ProjectBadges;
