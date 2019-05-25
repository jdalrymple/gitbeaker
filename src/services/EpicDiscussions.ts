import { ResourceDiscussions } from '../templates';

class EpicDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('groups', 'epics', options);
  }
}

export default EpicDiscussions;
