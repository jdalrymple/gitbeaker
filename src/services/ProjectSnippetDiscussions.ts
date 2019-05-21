import { ResourceDiscussions } from '../templates';

class ProjectSnippetDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('projects', 'snippets', options);
  }
}

export default ProjectSnippetDiscussions;
