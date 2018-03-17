import { ResourceAccessRequests } from '../templates';

class ProjectAccessRequests {
  constructor(options) {
    return new ResourceAccessRequests('projects', options);
  }
}

export default ProjectAccessRequests;
