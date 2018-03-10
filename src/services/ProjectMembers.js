import { ResourceMembers } from '../templates';

export class ProjectMembers {
  constructor(options) {
    return new ResourceMembers('projects', options);
  }
}

export default ProjectMembers;
