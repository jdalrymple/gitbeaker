import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDeployTokens } from '../templates';

export class GroupDeployTokens<C extends boolean = false> extends ResourceDeployTokens<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('groups', options);
  }
}
