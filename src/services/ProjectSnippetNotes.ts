import { ResourceNotes } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

class ProjectSnippetNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions) {
    super('projects', 'snippets', options);
  }
}

export default ProjectSnippetNotes;
