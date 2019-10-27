import { ResourceTemplates } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class GitLabCIYMLTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions = {}) {
    super('gitlab_ci_ymls', options);
  }
}
