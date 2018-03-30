import { ResourceIssueBoards } from '../templates';

class GroupIssueBoards extends ResourceIssueBoards {
  constructor(options) {
    super('groups', options);
  }
}

export default GroupIssueBoards;
