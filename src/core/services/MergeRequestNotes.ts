import { ResourceNotes } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class MergeRequestNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'merge_requests', options);
  }
}
