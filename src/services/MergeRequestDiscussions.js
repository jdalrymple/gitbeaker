import { ResourceDiscussions } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceDiscussions)
class MergeRequestDiscussions extends ResourceDiscussions {
  constructor(options) {
    super('projects', 'merge_requests', options);
  }
}

export default MergeRequestDiscussions;
