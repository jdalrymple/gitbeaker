import { ResourceDiscussions } from '../templates';

class MergeRequestDiscussions extends ResourceDiscussions {
  constructor(options) {
    super('projects', 'merge_requests', options);
  }
}

export default MergeRequestDiscussions;
