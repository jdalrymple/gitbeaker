import { ResourceIssueBoards } from '../templates';
import { BaseServiceOptions } from '@typings';

class GroupIssueBoards extends ResourceIssueBoards {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupIssueBoards;
