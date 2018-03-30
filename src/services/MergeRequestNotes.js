import { ResourceNotes } from '../templates';

class MergeRequestNotes extends ResourceNotes {
  constructor(options) {
    super('projects', 'mergerequests', options);
  }
}

export default MergeRequestNotes;
