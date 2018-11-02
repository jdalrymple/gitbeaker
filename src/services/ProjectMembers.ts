import { ResourceMembers } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ProjectMembers extends ResourceMembers {
  constructor(options: BaseModelContructorOptions) {
    super('projects', options);
  }
}

export default ProjectMembers;
