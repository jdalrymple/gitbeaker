import { ResourceDiscussions } from '../templates';
import { BaseServiceOptions } from '@typings';

class ProjectSnippetDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('projects', 'snippets', options);
  }
}

export default ProjectSnippetDiscussions;
