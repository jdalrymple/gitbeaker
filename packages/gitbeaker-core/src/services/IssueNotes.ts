import { ResourceNotes } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class IssueNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'issues', options);
  }
}
