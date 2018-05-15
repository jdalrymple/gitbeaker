import { ResourceDiscussions } from '../templates';

class ProjectSnippetDiscussions extends ResourceDiscussions {
  constructor(options) {
    super('projects', 'snippets', options);
  }
}

export default ProjectSnippetDiscussions;
