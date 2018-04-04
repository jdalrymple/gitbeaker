import { ResourceVariables } from '../templates';

class ProjectVariables extends ResourceVariables {
  constructor(options) {
    super('projects', null, options);
  }
}

export default ProjectVariables;
