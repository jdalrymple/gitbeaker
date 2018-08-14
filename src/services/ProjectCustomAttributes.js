import { ResourceCustomAttributes } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceCustomAttributes)
class ProjectCustomAttributes extends ResourceCustomAttributes {
  constructor(options) {
    super('projects', options);
  }
}

export default ProjectCustomAttributes;
