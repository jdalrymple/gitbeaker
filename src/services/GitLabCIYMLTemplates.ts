import { ResourceTemplates } from '../templates';

class GitLabCIYMLTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions) {
    super('gitlab_ci_ymls', options);
  }
}

export default GitLabCIYMLTemplates;
