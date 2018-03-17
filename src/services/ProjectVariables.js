import { ResourceVariables } from '../templates';

class ProjectVariables {
  constructor(options) {
    return new ResourceVariables('projects', options);
  }
}

export default ProjectVariables;
