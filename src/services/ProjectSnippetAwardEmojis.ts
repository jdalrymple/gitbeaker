import { ResourceAwardEmojis } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class ProjectSnippetAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseModelContructorOptions) {
    super('issues', options);
  }
}

export default ProjectSnippetAwardEmojis;
