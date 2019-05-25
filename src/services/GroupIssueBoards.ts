import { ResourceIssueBoards } from '../templates';

class GroupIssueBoards extends ResourceIssueBoards {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupIssueBoards;
