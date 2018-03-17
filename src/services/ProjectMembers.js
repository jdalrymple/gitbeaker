import { ResourceMembers } from '../templates';

class ProjectMembers {
  constructor(options) {
    return new ResourceMembers('projects', options);
  }
}

export default ProjectMembers;
