import { ResourceDiscussions } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class MergeRequestDiscussions extends ResourceDiscussions {
  constructor(options: BaseModelContructorOptions) {
    super('projects', 'merge_requests', options);
  }
}

export default MergeRequestDiscussions;
