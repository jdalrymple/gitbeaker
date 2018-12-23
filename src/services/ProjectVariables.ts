import { ResourceVariables } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class ProjectVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectVariables;
