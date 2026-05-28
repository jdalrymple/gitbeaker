import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface ContainerRegistryProtectionTagRuleSchema extends Record<string, unknown> {
  id: number;
  project_id: number;
  tag_name_pattern: string;
  minimum_access_level_for_push: 'maintainer' | 'owner' | 'admin';
  minimum_access_level_for_delete: 'maintainer' | 'owner' | 'admin';
}

export class ContainerRegistryProtectionTagRules<
  C extends boolean = false,
> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ContainerRegistryProtectionTagRuleSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ContainerRegistryProtectionTagRuleSchema[]>()(
      this,
      endpoint`projects/${projectId}/registry/protection/tag/rules`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    tagNamePattern: string,
    minimumAccessLevelForPush: 'maintainer' | 'owner' | 'admin',
    minimumAccessLevelForDelete: 'maintainer' | 'owner' | 'admin',
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ContainerRegistryProtectionTagRuleSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<ContainerRegistryProtectionTagRuleSchema>()(
      this,
      endpoint`projects/${projectId}/registry/protection/tag/rules`,
      {
        sudo,
        showExpanded,
        body: {
          tagNamePattern,
          minimumAccessLevelForPush,
          minimumAccessLevelForDelete,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    protectionRuleId: number,
    options?: {
      tagNamePattern?: string;
      minimumAccessLevelForPush?: 'maintainer' | 'owner' | 'admin' | '';
      minimumAccessLevelForDelete?: 'maintainer' | 'owner' | 'admin' | '';
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ContainerRegistryProtectionTagRuleSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.patch<ContainerRegistryProtectionTagRuleSchema>()(
      this,
      endpoint`projects/${projectId}/registry/protection/tag/rules/${protectionRuleId}`,
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
      endpoint`projects/${projectId}/registry/protection/tag/rules/${protectionRuleId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
