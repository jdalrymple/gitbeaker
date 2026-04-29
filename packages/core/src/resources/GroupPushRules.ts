import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { CreateAndEditPushRuleOptions, PushRuleSchema } from '../templates/ResourcePushRules';

import { ResourcePushRules } from '../templates';

export interface GroupPushRules<C extends boolean = false> extends ResourcePushRules<C> {
  create<E extends boolean = false>(
    groupId: string | number,
    options?: CreateAndEditPushRuleOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    options?: CreateAndEditPushRuleOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>>;
}

export class GroupPushRules<C extends boolean = false> extends ResourcePushRules<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
