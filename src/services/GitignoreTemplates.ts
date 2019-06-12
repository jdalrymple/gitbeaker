import { ResourceTemplates } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

class GitignoreTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions) {
    super('gitignores', options);
  }
}

export default GitignoreTemplates;
