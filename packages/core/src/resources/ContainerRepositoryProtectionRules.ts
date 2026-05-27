import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface ContainerRepositoryProtectionRuleSchema extends Record<string, unknown> {
  id: number;
  project_id: number;
  repository_path_pattern: string;
  minimum_access_level_for_push?: 'maintainer' | 'owner' | 'admin';
  minimum_access_level_for_delete?: 'maintainer' | 'owner' | 'admin';
}

export class ContainerRepositoryProtectionRules<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ContainerRepositoryProtectionRuleSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ContainerRepositoryProtectionRuleSchema[]>()(
      this,
      endpoint`projects/${projectId}/registry/protection/repository/rules`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    repositoryPathPattern: string,
    options?: {
      minimumAccessLevelForPush?: 'maintainer' | 'owner' | 'admin';
      minimumAccessLevelForDelete?: 'maintainer' | 'owner' | 'admin';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ContainerRepositoryProtectionRuleSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.post<ContainerRepositoryProtectionRuleSchema>()(
      this,
      endpoint`projects/${projectId}/registry/protection/repository/rules`,
      {
        sudo,
        showExpanded,
        searchParams: {
          ...searchParams,
          repositoryPathPattern,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    protectionRuleId: number,
    options?: {
      repositoryPathPattern?: string;
      minimumAccessLevelForPush?: 'maintainer' | 'owner' | 'admin' | '';
      minimumAccessLevelForDelete?: 'maintainer' | 'owner' | 'admin' | '';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ContainerRepositoryProtectionRuleSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.patch<ContainerRepositoryProtectionRuleSchema>()(
      this,
      endpoint`projects/${projectId}/registry/protection/repository/rules/${protectionRuleId}`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    protectionRuleId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/registry/protection/repository/rules/${protectionRuleId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}