import { ResourceCustomAttributes } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

class ProjectCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectCustomAttributes;
