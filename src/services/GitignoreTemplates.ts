import { ResourceTemplates } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class GitignoreTemplates extends ResourceTemplates {
  constructor(options: BaseModelContructorOptions) {
    super('gitignores', options);
  }
}

export default GitignoreTemplates;
