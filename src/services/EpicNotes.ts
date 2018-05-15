import { ResourceNotes } from '../templates';

class EpicNotes extends ResourceNotes {
  constructor(options) {
    super('groups', 'epics', options);
  }
}

export default EpicNotes;
