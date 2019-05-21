import { ResourceDiscussions } from '../templates';

class IssueDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('projects', 'issues', options);
  }
}

export default IssueDiscussions;
