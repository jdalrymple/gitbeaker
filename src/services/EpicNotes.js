import { ResourceNotes } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceNotes)
class EpicNotes extends ResourceNotes {
  constructor(options) {
    super('groups', 'epics', options);
  }
}

export default EpicNotes;
