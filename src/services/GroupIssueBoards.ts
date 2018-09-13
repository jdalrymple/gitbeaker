import { ResourceIssueBoards } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class GroupIssueBoards extends ResourceIssueBoards {
  constructor(options: BaseModelContructorOptions) {
    super('groups', options);
  }
}

export default GroupIssueBoards;
