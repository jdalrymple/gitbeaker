import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { AccessLevel } from '../constants';
import { RequestHelper, endpoint } from '../infrastructure';

export interface ProtectedEnvironmentAccessLevelSummarySchema {
  access_level: AccessLevel.DEVELOPER | AccessLevel.MAINTAINER | AccessLevel.ADMIN;
  access_level_description: string;
  user_id?: number;
  group_id?: number;
}

export interface ProtectedEnvironmentSchema extends Record<string, unknown> {
  name: string;
  deploy_access_levels?: ProtectedEnvironmentAccessLevelSummarySchema[];
  required_approval_count: number;
}

export type ProtectedEnvironmentAccessLevelEntity = OneOf<{
  userId: number;
  groupId: number;
  accessLevel: AccessLevel.DEVELOPER | AccessLevel.MAINTAINER | AccessLevel.ADMIN;
}>;

export class ResourceProtectedEnvironments<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: { search?: string } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ProtectedEnvironmentSchema[]>()(
      this,
      endpoint`${resourceId}/protected_environments`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams: searchParams as BaseRequestSearchParams &
          PaginationRequestSearchParams<P> &
          PaginationType<P>,
      },
    );
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    name: string,
    deployAccessLevels: ProtectedEnvironmentAccessLevelEntity[],
    options?: {
      requiredApprovalCount?: number;
      approvalRules?: ProtectedEnvironmentAccessLevelEntity[];
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<ProtectedEnvironmentSchema>()(
      this,
      endpoint`${resourceId}/protected_environments`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          name,
          deployAccessLevels,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    name: string,
    options?: {
      deployAccessLevels?: ProtectedEnvironmentAccessLevelEntity[];
      requiredApprovalCount?: number;
      approvalRules?: ProtectedEnvironmentAccessLevelEntity[];
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<ProtectedEnvironmentSchema>()(
      this,
      endpoint`${resourceId}/protected_environments/${name}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProtectedEnvironmentSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ProtectedEnvironmentSchema>()(
      this,
      endpoint`${resourceId}/protected_environments/${name}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/protected_environments/${name}`, {
      sudo,
      showExpanded,
    });
  }
}
