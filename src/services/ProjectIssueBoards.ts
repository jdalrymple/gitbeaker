import { ResourceIssueBoards } from '../templates';

class ProjectIssueBoards extends ResourceIssueBoards {
  constructor(options) {
    super('products', options);
  }
}

export default ProjectIssueBoards;
