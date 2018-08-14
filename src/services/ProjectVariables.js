import { ResourceVariables } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceVariables)
class ProjectVariables extends ResourceVariables {
  constructor(options) {
    super('projects', null, options);
  }
}

export default ProjectVariables;
