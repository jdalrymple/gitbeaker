import { ResourceAccessRequests } from '../templates';

class ProjectAccessRequests extends ResourceAccessRequests {
  constructor(options) {
    super('projects', options);
  }
}

export default ProjectAccessRequests;
