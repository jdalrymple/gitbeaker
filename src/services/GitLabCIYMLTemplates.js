import { ResourceTemplates } from '../templates';
import { cls } from '../cli/worker';

@cls(ResourceTemplates)
class GitLabCIYMLTemplates extends ResourceTemplates {
  constructor(options) {
    super('gitlab_ci_ymls', options);
  }
}

export default GitLabCIYMLTemplates;
