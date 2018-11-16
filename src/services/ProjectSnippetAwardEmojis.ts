import { ResourceAwardEmojis } from '../templates';
import { BaseServiceOptions } from '@typings';

class ProjectSnippetAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions) {
    super('issues', options);
  }
}

export default ProjectSnippetAwardEmojis;
