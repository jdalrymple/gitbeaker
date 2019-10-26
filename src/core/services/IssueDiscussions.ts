import { ResourceDiscussions } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class IssueDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('projects', 'issues', options);
  }
}
