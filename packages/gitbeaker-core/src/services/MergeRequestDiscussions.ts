import { ResourceDiscussions } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class MergeRequestDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'merge_requests', options);
  }
}
