import { ResourceNotes } from '../templates';

class MergeRequestNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions) {
    super('projects', 'merge_requests', options);
  }
}

export default MergeRequestNotes;
