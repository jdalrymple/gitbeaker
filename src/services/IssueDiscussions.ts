import { ResourceDiscussions } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class IssueDiscussions extends ResourceDiscussions {
  constructor(options: BaseModelContructorOptions) {
    super('projects', 'issues', options);
  }
}

export default IssueDiscussions;
