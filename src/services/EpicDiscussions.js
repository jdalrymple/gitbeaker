import { ResourceDiscussions } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceDiscussions)
class EpicDiscussions extends ResourceDiscussions {
  constructor(options) {
    super('groups', 'epics', options);
  }
}

export default EpicDiscussions;
