import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { SimpleProjectSchema } from './Projects';
import { CondensedGroupSchema } from './Groups';

export interface JobTokenScopeSchema extends Record<string, unknown> {
  inbound_enabled: boolean;
  outbound_enabled: boolean;
}

export interface ProjectAllowListSchema extends Record<string, unknown> {
  source_project_id: number;
  target_project_id: number;
}

export interface GroupAllowListSchema extends Record<string, unknown> {
  source_project_id: number;
  target_group_id: number;
}

export class ProjectJobTokenScopes<C extends boolean = false> extends BaseResource<C> {
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
  ): Promise<GitlabAPIResponse<ProjectAllowListSchema, C, E, void>> {
    return RequestHelper.post<ProjectAllowListSchema>()(
      this,
      endpoint`projects/${projectId}/job_token_scope/allowlist`,
      { ...options, targetProjectId },
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

  showGroupsAllowList<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedGroupSchema[], C, E, void>> {
    return RequestHelper.get<CondensedGroupSchema[]>()(
      this,
      endpoint`projects/${projectId}/job_token_scope/groups_allowlist`,
      options,
    );
  }

  addToGroupsAllowList<E extends boolean = false>(
    projectId: string | number,
    targetGroupId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<GroupAllowListSchema, C, E, void>> {
    return RequestHelper.post<GroupAllowListSchema>()(
      this,
      endpoint`projects/${projectId}/job_token_scope/groups_allowlist`,
      { ...options, targetGroupId },
    );
  }

  removeFromGroupsAllowList<E extends boolean = false>(
    projectId: string | number,
    targetGroupId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/job_token_scope/groups_allowlist/${targetGroupId}`,
      options,
    );
  }
}
