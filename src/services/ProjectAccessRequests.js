import { ResourceAccessRequests } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceAccessRequests)
class ProjectAccessRequests extends ResourceAccessRequests {
  constructor(options) {
    super('projects', options);
  }
}

export default ProjectAccessRequests;
