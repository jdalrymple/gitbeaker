import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '@typings';

class ProjectVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    super('projects', null, options);
  }
}

export default ProjectVariables;
