import { ResourceMembers } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceMembers)
class ProjectMembers extends ResourceMembers {
  constructor(options) {
    super('projects', options);
  }
}

export default ProjectMembers;
