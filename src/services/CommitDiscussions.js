import { ResourceDiscussions } from '../templates';

class CommitDiscussions extends ResourceDiscussions {
  constructor(options) {
    super('projects', 'commits', options);
  }
}

export default CommitDiscussions;
