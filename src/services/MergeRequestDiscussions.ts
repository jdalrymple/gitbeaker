import { ResourceDiscussions } from '../templates';
import { BaseServiceOptions } from '@typings';

class MergeRequestDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('projects', 'merge_requests', options);
  }
}

export default MergeRequestDiscussions;
