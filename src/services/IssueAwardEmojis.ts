import { ResourceAwardEmojis } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class IssueAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseModelContructorOptions) {
    super('issues', options);
  }
}

export default IssueAwardEmojis;
