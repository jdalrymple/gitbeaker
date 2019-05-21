import { ResourceAccessRequests } from '../templates';

class ProjectAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectAccessRequests;
