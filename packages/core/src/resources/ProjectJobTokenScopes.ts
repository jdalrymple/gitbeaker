import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import { CondensedGroupSchema } from './Groups';
import { SimpleProjectSchema } from './Projects';

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
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<JobTokenScopeSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<JobTokenScopeSchema>()(
      this,
      endpoint`projects/${projectId}/job_token_scope`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    enabled: boolean,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<JobTokenScopeSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.patch<JobTokenScopeSchema>()(
      this,
      endpoint`projects/${projectId}/job_token_scope`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          enabled,
        },
      },
    );
  }

  showInboundAllowList<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SimpleProjectSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<SimpleProjectSchema[]>()(
      this,
      endpoint`projects/${projectId}/job_token_scope/allowlist`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  addToInboundAllowList<E extends boolean = false>(
    projectId: string | number,
    targetProjectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectAllowListSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ProjectAllowListSchema>()(
      this,
      endpoint`projects/${projectId}/job_token_scope/allowlist`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          targetProjectId,
        },
      },
    );
  }

  removeFromInboundAllowList<E extends boolean = false>(
    projectId: string | number,
    targetProjectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/job_token_scope/allowlist/${targetProjectId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  showGroupsAllowList<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<CondensedGroupSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<CondensedGroupSchema[]>()(
      this,
      endpoint`projects/${projectId}/job_token_scope/groups_allowlist`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  addToGroupsAllowList<E extends boolean = false>(
    projectId: string | number,
    targetGroupId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupAllowListSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<GroupAllowListSchema>()(
      this,
      endpoint`projects/${projectId}/job_token_scope/groups_allowlist`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          targetGroupId,
        },
      },
    );
  }

  removeFromGroupsAllowList<E extends boolean = false>(
    projectId: string | number,
    targetGroupId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/job_token_scope/groups_allowlist/${targetGroupId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
