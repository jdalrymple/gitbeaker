import { ResourceTemplates } from '../templates';
import { BaseModelContructorOptions } from '../infrastructure/BaseService';

class GitLabCIYMLTemplates extends ResourceTemplates {
  constructor(options: BaseModelContructorOptions) {
    super('gitlab_ci_ymls', options);
  }
}

export default GitLabCIYMLTemplates;
