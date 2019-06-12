import { ResourceDiscussions } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

class EpicDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('groups', 'epics', options);
  }
}

export default EpicDiscussions;
