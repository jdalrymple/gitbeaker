import { ResourceIssueBoards } from '../templates';

class ProjectIssueBoards extends ResourceIssueBoards {
  constructor(options) {
    super('projects', options);
  }
}

export default ProjectIssueBoards;
