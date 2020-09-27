import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDeployTokens } from '../templates';

export class ProjectDeployTokens extends ResourceDeployTokens {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }
}
