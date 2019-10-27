import { ResourceAwardEmojis } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class MergeRequestAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions = {}) {
    super('merge_requests', options);
  }
}
