import { ResourceDiscussions } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class EpicDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('groups', 'epics', options);
  }
}
