import { ResourceDiscussions } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class EpicDiscussions extends ResourceDiscussions {
  constructor(options: BaseModelContructorOptions) {
    super('groups', 'epics', options);
  }
}

export default EpicDiscussions;
