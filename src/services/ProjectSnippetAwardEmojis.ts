import { ResourceAwardEmojis } from '../templates';

class ProjectSnippetAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions) {
    super('issues', options);
  }
}

export default ProjectSnippetAwardEmojis;
