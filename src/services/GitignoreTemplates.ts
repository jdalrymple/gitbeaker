import { ResourceTemplates } from '../templates';

class GitignoreTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions) {
    super('gitignores', options);
  }
}

export default GitignoreTemplates;
