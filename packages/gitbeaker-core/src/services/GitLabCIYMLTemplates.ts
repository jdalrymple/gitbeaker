import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../templates';

export class GitLabCIYMLTemplates extends ResourceTemplates {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('gitlab_ci_ymls', options);
  }
}
