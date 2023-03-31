import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourcePushRules } from '../templates';
import type { PushRuleSchema } from '../templates/types';
import type { BaseRequestOptions, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface GroupPushRules<C extends boolean = false> extends ResourcePushRules<C> {
  create<E extends boolean = false>(
    groupId: string | number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>>;
}

export class GroupPushRules<C extends boolean = false> extends ResourcePushRules<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
