import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDeployTokens } from '../templates';

export class GroupDeployTokens extends ResourceDeployTokens {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', options);
  }
}
