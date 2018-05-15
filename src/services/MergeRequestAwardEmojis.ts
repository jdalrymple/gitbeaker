import { ResourceAwardEmojis } from '../templates';

class MergeRequestAwardEmojis extends ResourceAwardEmojis {
  constructor(options) {
    super('merge_requests', options);
  }
}

export default MergeRequestAwardEmojis;
