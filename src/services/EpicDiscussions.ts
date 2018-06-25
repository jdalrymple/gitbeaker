import { ResourceDiscussions } from '../templates';

class EpicDiscussions extends ResourceDiscussions {
  constructor(options) {
    super('groups', 'epics', options);
  }
}

export default EpicDiscussions;
