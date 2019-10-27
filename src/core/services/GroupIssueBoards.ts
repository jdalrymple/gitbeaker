import { ResourceIssueBoards } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class GroupIssueBoards extends ResourceIssueBoards {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', options);
  }
}
