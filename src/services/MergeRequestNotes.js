import { ResourceNotes } from '../templates';

export class MergeRequestNotes {
  constructor(options) {
    return new ResourceNotes('mergerequests', 'notes', options);
  }
}

export default MergeRequestNotes;
