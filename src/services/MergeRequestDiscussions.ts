import { ResourceDiscussions } from '../templates';
import { BaseServiceOptions } from '@src/types';

class MergeRequestDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('projects', 'merge_requests', options);
  }
}

export default MergeRequestDiscussions;
