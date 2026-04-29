import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { CreateAndEditPushRuleOptions, PushRuleSchema } from '../templates/ResourcePushRules';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourcePushRules } from '../templates';

export interface ProjectPushRules<C extends boolean = false> extends ResourcePushRules<C> {
  create<E extends boolean = false>(
    projectId: string | number,
    options?: CreateAndEditPushRuleOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    options?: CreateAndEditPushRuleOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>>;
}

export class ProjectPushRules<C extends boolean = false> extends ResourcePushRules<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
