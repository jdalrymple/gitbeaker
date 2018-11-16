import { ResourceDiscussions } from '../templates';
import { BaseServiceOptions } from '@typings';

class IssueDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('projects', 'issues', options);
  }
}

export default IssueDiscussions;
