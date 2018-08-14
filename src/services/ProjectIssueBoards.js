import { ResourceIssueBoards } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceIssueBoards)
class ProjectIssueBoards extends ResourceIssueBoards {
  constructor(options) {
    super('projects', options);
  }
}

export default ProjectIssueBoards;
