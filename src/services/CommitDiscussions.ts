import { ResourceDiscussions } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class CommitDiscussions extends ResourceDiscussions {
  constructor(baseParams: BaseModelContructorOptions) {
    super('projects', 'commits', baseParams);
  }
}

export default CommitDiscussions;
