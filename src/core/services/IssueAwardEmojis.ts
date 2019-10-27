import { ResourceAwardEmojis } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class IssueAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions = {}) {
    super('issues', options);
  }
}
