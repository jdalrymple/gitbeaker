import { ResourceDiscussions } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class ProjectSnippetDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('projects', 'snippets', options);
  }
}
