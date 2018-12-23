import { ResourceAwardEmojis } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class MergeRequestAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions) {
    super('merge_requests', options);
  }
}

export default MergeRequestAwardEmojis;
