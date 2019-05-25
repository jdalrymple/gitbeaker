import { ResourceAwardEmojis } from '../templates';

class IssueAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions) {
    super('issues', options);
  }
}

export default IssueAwardEmojis;
