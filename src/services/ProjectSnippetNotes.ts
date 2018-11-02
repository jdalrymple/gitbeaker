import { ResourceNotes } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ProjectSnippetNotes extends ResourceNotes {
  constructor(options: BaseModelContructorOptions) {
    super('projects', 'snippets', options);
  }
}

export default ProjectSnippetNotes;
