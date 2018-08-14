import { ResourceAwardEmojis } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceAwardEmojis)
class IssueAwardEmojis extends ResourceAwardEmojis {
  constructor(options) {
    super('issues', options);
  }
}

export default IssueAwardEmojis;
