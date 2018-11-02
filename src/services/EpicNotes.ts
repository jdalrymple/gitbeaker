import { ResourceNotes } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class EpicNotes extends ResourceNotes {
  constructor(options: BaseModelContructorOptions) {
    super('groups', 'epics', options);
  }
}

export default EpicNotes;
