import { ResourceAwardEmojis } from '../templates';
import { BaseServiceOptions } from '@typings';

class IssueAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions) {
    super('issues', options);
  }
}

export default IssueAwardEmojis;
