import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { SimpleProjectSchema } from './Projects';

export interface JobTokenScopeSchema extends Record<string, unknown> {
  inbound_enabled: boolean;
  outbound_enabled: boolean;
}

export interface AllowListSchema extends Record<string, unknown> {
  source_project_id: number;
  target_project_id: number;
}

export class JobTokenScopes<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobTokenScopeSchema, C, E, void>> {
    return RequestHelper.get<JobTokenScopeSchema>()(
      this,
      endpoint`projects/${projectId}/job_token_scope`,
      options,
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    enabled: boolean,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobTokenScopeSchema, C, E, void>> {
    return RequestHelper.patch<JobTokenScopeSchema>()(
      this,
      endpoint`projects/${projectId}/job_token_scope`,
      { ...options, enabled },
    );
  }

  showInboundAllowList<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SimpleProjectSchema[], C, E, void>> {
    return RequestHelper.get<SimpleProjectSchema[]>()(
      this,
      endpoint`projects/${projectId}/job_token_scope/allowlist`,
      options,
    );
  }

  addToInboundAllowList<E extends boolean = false>(
    projectId: string | number,
    targetProjectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AllowListSchema, C, E, void>> {
    return RequestHelper.post<AllowListSchema>()(
      this,
      endpoint`projects/${projectId}/job_token_scope/allowlist/${targetProjectId}`,
      options,
    );
  }

  removeFromInboundAllowList<E extends boolean = false>(
    projectId: string | number,
    targetProjectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/job_token_scope/allowlist/${targetProjectId}`,
      options,
    );
  }
}
