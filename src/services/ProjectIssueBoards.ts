import { ResourceIssueBoards } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ProjectIssueBoards extends ResourceIssueBoards {
  constructor(options: BaseModelContructorOptions) {
    super('projects', options);
  }
}

export default ProjectIssueBoards;
