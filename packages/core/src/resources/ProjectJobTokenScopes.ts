import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { SimpleProjectSchema } from './Projects';
import type { AllowListSchema, JobTokenScopeSchema } from '../templates/ResourceJobTokenScopes';
import { ResourceJobTokenScopes } from '../templates/ResourceJobTokenScopes';

export interface ProjectJobTokenScopes<C extends boolean = false>
  extends ResourceJobTokenScopes<C> {
  edit<E extends boolean = false>(
    projectId: string | number,
    enabled: boolean,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobTokenScopeSchema, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobTokenScopeSchema, C, E, void>>;

  showInboundAllowList<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleProjectSchema[], C, E, void>>;

  addToInboundAllowList<E extends boolean = false>(
    projectId: string | number,
    targetProjectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AllowListSchema, C, E, void>>;

  removeFromInboundAllowList<E extends boolean = false>(
    projectId: string | number,
    targetProjectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
}

export class ProjectJobTokenScopes<C extends boolean = false> extends ResourceJobTokenScopes<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
