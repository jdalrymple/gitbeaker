import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

class ProjectVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectVariables;
