import { ResourceNotes } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class ProjectSnippetNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'snippets', options);
  }
}
