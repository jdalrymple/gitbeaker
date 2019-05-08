import { ResourceIssueBoards } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class ProjectIssueBoards extends ResourceIssueBoards {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}

export default ProjectIssueBoards;
