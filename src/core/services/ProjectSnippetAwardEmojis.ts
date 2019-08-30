import { ResourceAwardEmojis } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

class ProjectSnippetAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions) {
    super('issues', options);
  }
}

export default ProjectSnippetAwardEmojis;
