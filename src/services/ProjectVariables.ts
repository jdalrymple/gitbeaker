import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '@src/types';

class ProjectVariables extends ResourceVariables {
  constructor(options: BaseModelContructorOptions) {
    super('projects', options);
  }
}

export default ProjectVariables;
