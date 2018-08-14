import { ResourceAwardEmojis } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceAwardEmojis)
class MergeRequestAwardEmojis extends ResourceAwardEmojis {
  constructor(options) {
    super('merge_requests', options);
  }
}

export default MergeRequestAwardEmojis;
