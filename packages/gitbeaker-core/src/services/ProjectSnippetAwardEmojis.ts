import { ResourceAwardEmojis } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class ProjectSnippetAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions = {}) {
    super('issues', options);
  }
}
