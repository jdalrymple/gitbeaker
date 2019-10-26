import { ResourceIssueBoards } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class ProjectIssueBoards extends ResourceIssueBoards {
  constructor(options: BaseServiceOptions) {
    super('projects', options);
  }
}
