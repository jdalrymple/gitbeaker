import { ResourceVariables } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ProjectVariables extends ResourceVariables {
  constructor(options: BaseModelContructorOptions) {
    super('projects', options);
  }
}

export default ProjectVariables;
