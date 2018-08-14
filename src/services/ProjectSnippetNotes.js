import { ResourceNotes } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceNotes)
class ProjectSnippetNotes extends ResourceNotes {
  constructor(options) {
    super('projects', 'snippets', options);
  }
}

export default ProjectSnippetNotes;
