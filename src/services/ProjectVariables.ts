import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '@typings';

class ProjectVariables extends ResourceVariables {
  constructor(options: BaseModelContructorOptions) {
    super('projects', options);
  }
}

export default ProjectVariables;
