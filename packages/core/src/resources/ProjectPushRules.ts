import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourcePushRules } from '../templates';
import type { PushRuleSchema } from '../templates/ResourcePushRules';
import type { BaseRequestOptions, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface ProjectPushRules<C extends boolean = false> extends ResourcePushRules<C> {
  create<E extends boolean = false>(
    projectId: string | number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<PushRuleSchema, C, E, void>>;
}

export class ProjectPushRules<C extends boolean = false> extends ResourcePushRules<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
