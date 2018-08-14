import { ResourceDiscussions } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceDiscussions)
class ProjectSnippetDiscussions extends ResourceDiscussions {
  constructor(options) {
    super('projects', 'snippets', options);
  }
}

export default ProjectSnippetDiscussions;
