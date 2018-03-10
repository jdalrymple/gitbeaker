import { ResourceAccessRequests } from '../templates';

export class ProjectAccessRequests {
  constructor(options) {
    return new ResourceAccessRequests('projects', options);
  }
}

export default ProjectAccessRequests;
