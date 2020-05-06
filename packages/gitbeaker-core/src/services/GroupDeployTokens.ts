import { ResourceDeployTokens } from '../templates';
import { BaseServiceOptions } from '../infrastructure';

export class GroupDeployTokens extends ResourceDeployTokens {
  constructor(options: BaseServiceOptions = {}) {
    super('groups', options);
  }
}
