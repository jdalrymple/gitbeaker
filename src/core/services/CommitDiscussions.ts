import { ResourceDiscussions } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class CommitDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('projects', 'commits', options);
  }
}
