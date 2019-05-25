import { ResourceCustomAttributes } from '../templates';

class ProjectCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectCustomAttributes;
