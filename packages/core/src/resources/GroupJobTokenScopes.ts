import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { AllowListSchema } from '../templates/ResourceJobTokenScopes';
import { ResourceJobTokenScopes } from '../templates/ResourceJobTokenScopes';

export interface GroupJobTokenScopes<C extends boolean = false> extends ResourceJobTokenScopes<C> {
  addToInboundAllowList<E extends boolean = false>(
    groupId: string | number,
    targetGroupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AllowListSchema, C, E, void>>;

  removeFromInboundAllowList<E extends boolean = false>(
    groupId: string | number,
    targetGroupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
}

export class GroupJobTokenScopes<C extends boolean = false> extends ResourceJobTokenScopes<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
