import { ResourceCustomAttributes } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ProjectCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseModelContructorOptions) {
    super('projects', options);
  }
}

export default ProjectCustomAttributes;
