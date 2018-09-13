import { ResourceDiscussions } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ProjectSnippetDiscussions extends ResourceDiscussions {
  constructor(options: BaseModelContructorOptions) {
    super('projects', 'snippets', options);
  }
}

export default ProjectSnippetDiscussions;
