import { ResourceDiscussions } from '../templates';

class IssueDiscussions extends ResourceDiscussions {
  constructor(options) {
    super('projects', 'issues', options);
  }
}

export default IssueDiscussions;
