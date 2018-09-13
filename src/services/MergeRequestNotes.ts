import { ResourceNotes } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class MergeRequestNotes extends ResourceNotes {
  constructor(options: BaseModelContructorOptions) {
    super('projects', 'merge_requests', options);
  }
}

export default MergeRequestNotes;
