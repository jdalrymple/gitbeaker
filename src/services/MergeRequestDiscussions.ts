import { ResourceDiscussions } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class MergeRequestDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('projects', 'merge_requests', options);
  }
}

export default MergeRequestDiscussions;
