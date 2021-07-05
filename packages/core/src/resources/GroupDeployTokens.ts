import { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceDeployTokens } from '../templates';
import { DeployTokenScope, DeployTokenSchema } from '../templates/types';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  CamelizedRecord,
  Sudo,
} from '../infrastructure';

export interface GroupDeployTokens<C extends boolean = false> extends ResourceDeployTokens<C> {
  add(
    groupId: string | number,
    tokenName: string,
    tokenScopes: DeployTokenScope[],
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DeployTokenSchema>>;

  all(
    options?: { groupId?: string | number } & PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, DeployTokenSchema>[]>;

  remove(groupId: string | number, tokenId: number, options?: Sudo): Promise<void>;
}

export class GroupDeployTokens<C extends boolean = false> extends ResourceDeployTokens<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
