import { ResourceNotes } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceNotes)
class MergeRequestNotes extends ResourceNotes {
  constructor(options) {
    super('projects', 'merge_requests', options);
  }
}

export default MergeRequestNotes;
