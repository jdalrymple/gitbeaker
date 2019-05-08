import { ResourceTemplates } from '../templates';
import { BaseServiceOptions } from '../../types/types';

class GitLabCIYMLTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions) {
    super('gitlab_ci_ymls', options);
  }
}

export default GitLabCIYMLTemplates;
