import { BaseResource } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

import { AccessLevel } from '../constants';
import { RequestHelper, endpoint } from '../infrastructure';

export type ProtectedBranchAccessLevel =
  | AccessLevel.NO_ACCESS
  | AccessLevel.DEVELOPER
  | AccessLevel.MAINTAINER
  | AccessLevel.ADMIN;

export interface ExtendedProtectedBranchAccessLevelSchema {
  id: number;
  access_level: ProtectedBranchAccessLevel;
  access_level_description: string;
  user_id?: number | null;
  group_id?: number | null;
}

export interface ProtectedBranchSchema extends Record<string, unknown> {
  id: number;
  name: string;
  push_access_levels?: ExtendedProtectedBranchAccessLevelSchema[];
  merge_access_levels?: ExtendedProtectedBranchAccessLevelSchema[];
  unprotect_access_levels?: ExtendedProtectedBranchAccessLevelSchema[];
  allow_force_push: boolean;
  code_owner_approval_required: boolean;
}

export type CreateProtectedBranchAllowOptions =
  | { userId: number }
  | { groupId: number }
  | { accessLevel: ProtectedBranchAccessLevel };

export type EditProtectedBranchAllowOptions = {
  _destroy?: boolean;
} & (
  | { userId: number }
  | { groupId: number }
  | {
      accessLevel: ProtectedBranchAccessLevel;
      id: number;
    }
);

export type CreateProtectedBranchOptions = {
  allowForcePush?: boolean;
  allowedToMerge?: CreateProtectedBranchAllowOptions[];
  allowedToPush?: CreateProtectedBranchAllowOptions[];
  allowedToUnprotect?: CreateProtectedBranchAllowOptions[];
  codeOwnerApprovalRequired?: boolean;
  mergeAccessLevel?: ProtectedBranchAccessLevel;
  pushAccessLevel?: ProtectedBranchAccessLevel;
  unprotectAccessLevel?: ProtectedBranchAccessLevel;
};

export type EditProtectedBranchOptions = {
  allowForcePush?: boolean;
  allowedToMerge?: EditProtectedBranchAllowOptions[];
  allowedToPush?: EditProtectedBranchAllowOptions[];
  allowedToUnprotect?: EditProtectedBranchAllowOptions[];
  codeOwnerApprovalRequired?: boolean;
};

export class ProtectedBranches<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { search?: string } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<ProtectedBranchSchema[]>()(
      this,
      endpoint`projects/${projectId}/protected_branches`,
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
    projectId: string | number,
    branchName: string,
    options?: CreateProtectedBranchOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.post<ProtectedBranchSchema>()(
      this,
      endpoint`projects/${projectId}/protected_branches`,
      {
        sudo,
        showExpanded,
        searchParams: {
          ...searchParams,
          name: branchName,
        },
      },
    );
  }

  // Convenience method - create
  protect<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: BaseRequestSearchParams & CreateProtectedBranchOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema, C, E, void>> {
    return this.create(projectId, branchName, options);
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: BaseRequestSearchParams & EditProtectedBranchOptions & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.patch<ProtectedBranchSchema>()(
      this,
      endpoint`projects/${projectId}/protected_branches/${branchName}`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ProtectedBranchSchema>()(
      this,
      endpoint`projects/${projectId}/protected_branches/${branchName}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/protected_branches/${branchName}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  // Convenience method - remove
  unprotect<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return this.remove(projectId, branchName, options);
  }
}
