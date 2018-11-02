import { ResourceAwardEmojis } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class MergeRequestAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseModelContructorOptions) {
    super('merge_requests', options);
  }
}

export default MergeRequestAwardEmojis;
