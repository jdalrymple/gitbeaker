import { ResourceNotes } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class EpicNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', 'epics', options);
  }
}
