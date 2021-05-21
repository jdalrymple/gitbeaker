import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDeployTokens, DeployTokenScope, DeployTokenSchema } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface GroupDeployTokens extends ResourceDeployTokens {
  add(
    groupId: string | number,
    tokenName: string,
    tokenScopes: DeployTokenScope[],
    options?: BaseRequestOptions,
  ): Promise<DeployTokenSchema>;

  all({
    groupId,
    ...options
  }: { groupId?: string | number } & PaginatedRequestOptions): Promise<DeployTokenSchema[]>;

  remove(groupId: string | number, tokenId: number, options?: Sudo): Promise<void>;
}

export class GroupDeployTokens extends ResourceDeployTokens {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
