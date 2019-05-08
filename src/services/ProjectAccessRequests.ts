import { ResourceAccessRequests } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class ProjectAccessRequests extends ResourceAccessRequests {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectAccessRequests;
