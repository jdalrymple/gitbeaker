import { ResourceNotes } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceNotes)
class IssueNotes extends ResourceNotes {
  constructor(options) {
    super('projects', 'issues', options);
  }
}

export default IssueNotes;
