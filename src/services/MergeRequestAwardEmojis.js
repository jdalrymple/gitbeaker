import { ResourceAwardEmojis } from '../templates';

class MergeRequestAwardEmojis extends ResourceAwardEmojis {
  constructor(options) {
    super('issues', options);
  }
}

export default MergeRequestAwardEmojis;
