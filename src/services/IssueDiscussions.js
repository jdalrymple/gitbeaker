import { ResourceDiscussions } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceDiscussions)
class IssueDiscussions extends ResourceDiscussions {
  constructor(options) {
    super('projects', 'issues', options);
  }
}

export default IssueDiscussions;
