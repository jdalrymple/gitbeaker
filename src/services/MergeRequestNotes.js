import { ResourceNotes } from '../templates';

class MergeRequestNotes {
  constructor(options) {
    return new ResourceNotes('mergerequests', 'notes', options);
  }
}

export default MergeRequestNotes;
