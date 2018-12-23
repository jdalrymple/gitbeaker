import { ResourceNotes } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class MergeRequestNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions) {
    super('projects', 'merge_requests', options);
  }
}

export default MergeRequestNotes;
