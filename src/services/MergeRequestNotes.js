import { ResourceNotes } from '../templates';

class MergeRequestNotes extends ResourceNotes {
  constructor(options) {
    super('mergerequests', 'notes', options);
  }
}

export default MergeRequestNotes;
