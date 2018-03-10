import { ResourceCustomAttributes } from '../templates';

export class ProjectCustomAttributes {
  constructor(options) {
    return new ResourceCustomAttributes('projects', options);
  }
}

export default ProjectCustomAttributes;
