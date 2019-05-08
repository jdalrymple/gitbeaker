import { ResourceCustomAttributes } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class ProjectCustomAttributes extends ResourceCustomAttributes {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectCustomAttributes;
