import { ResourceAwardEmojis } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

class IssueAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions) {
    super('issues', options);
  }
}

export default IssueAwardEmojis;
