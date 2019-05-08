import { ResourceMembers } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class ProjectMembers extends ResourceMembers {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectMembers;
