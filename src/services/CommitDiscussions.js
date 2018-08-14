import { ResourceDiscussions } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceDiscussions)
class CommitDiscussions extends ResourceDiscussions {
  constructor(options) {
    super('projects', 'commits', options);
  }
}

export default CommitDiscussions;
