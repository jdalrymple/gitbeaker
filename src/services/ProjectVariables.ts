import { ResourceVariables } from '../templates';

class ProjectVariables extends ResourceVariables {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectVariables;
