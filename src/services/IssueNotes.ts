import { ResourceNotes } from '../templates';

class IssueNotes extends ResourceNotes {
  constructor(options: temporaryAny) {
    super('projects', 'issues', options);
  }
}

export default IssueNotes;
