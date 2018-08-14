import { ResourceIssueBoards } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceIssueBoards)
class GroupIssueBoards extends ResourceIssueBoards {
  constructor(options) {
    super('groups', options);
  }
}

export default GroupIssueBoards;
