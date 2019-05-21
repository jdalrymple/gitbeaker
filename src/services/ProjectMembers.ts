import { ResourceMembers } from '../templates';

class ProjectMembers extends ResourceMembers {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectMembers;
