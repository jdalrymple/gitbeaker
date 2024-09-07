import { BaseResource, BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface JobTokenScopeSchema extends Record<string, unknown> {
  inbound_enabled: boolean;
  outbound_enabled: boolean;
}

export interface AllowListSchema extends Record<string, unknown> {
  source_project_id: number;
  target_project_id: number;
}

export class ResourceJobTokenScopes<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobTokenScopeSchema, C, E, void>> {
    return RequestHelper.get<JobTokenScopeSchema>()(
      this,
      endpoint`${resourceId}/job_token_scope`,
      options,
    );
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    enabled: boolean,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<JobTokenScopeSchema, C, E, void>> {
    return RequestHelper.patch<JobTokenScopeSchema>()(
      this,
      endpoint`${resourceId}/job_token_scope`,
      { ...options, enabled },
    );
  }

  showInboundAllowList<E extends boolean = false>(
    resourceId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Record<string, unknown>[], C, E, void>> {
    return RequestHelper.get<Record<string, unknown>[]>()(
      this,
      endpoint`${resourceId}/job_token_scope/allowlist`,
      options,
    );
  }

  addToInboundAllowList<E extends boolean = false>(
    resourceId: string | number,
    targetResourceId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AllowListSchema, C, E, void>> {
    return RequestHelper.post<AllowListSchema>()(
      this,
      endpoint`${resourceId}/job_token_scope/allowlist/${targetResourceId}`,
      options,
    );
  }

  removeFromInboundAllowList<E extends boolean = false>(
    resourceId: string | number,
    targetResourceId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`${resourceId}/job_token_scope/allowlist/${targetResourceId}`,
      options,
    );
  }
}
