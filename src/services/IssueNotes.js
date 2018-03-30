import { ResourceNotes } from '../templates';

class IssueNotes extends ResourceNotes {
  constructor(options) {
    super('projects', 'issues', options);
  }
}

export default IssueNotes;
