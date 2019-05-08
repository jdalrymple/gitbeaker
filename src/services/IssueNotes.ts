import { ResourceNotes } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class IssueNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions) {
    super('projects', 'issues', options);
  }
}

export default IssueNotes;
