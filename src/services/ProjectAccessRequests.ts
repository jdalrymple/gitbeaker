import { ResourceAccessRequests } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ProjectAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseModelContructorOptions) {
    super('projects', options);
  }
}

export default ProjectAccessRequests;
