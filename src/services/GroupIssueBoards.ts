import { ResourceIssueBoards } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class GroupIssueBoards extends ResourceIssueBoards {
  constructor(options: BaseServiceOptions) {
    super('groups', options);
  }
}

export default GroupIssueBoards;
