import { ResourceDiscussions } from '../templates';

class MergeRequestDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('projects', 'merge_requests', options);
  }
}

export default MergeRequestDiscussions;
