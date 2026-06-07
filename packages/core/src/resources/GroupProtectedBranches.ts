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

import { RequestHelper, endpoint } from '../infrastructure';

export interface ProtectedBranchAccessLevelEntity {
  id?: number;
  access_level?: number;
  user_id?: number | null;
  group_id?: number | null;
  access_level_description?: string;
  _destroy?: boolean;
}

export interface GroupProtectedBranchSchema extends Record<string, unknown> {
  id: number;
  name: string;
  push_access_levels: ProtectedBranchAccessLevelEntity[];
  merge_access_levels: ProtectedBranchAccessLevelEntity[];
  unprotect_access_levels?: ProtectedBranchAccessLevelEntity[];
  allow_force_push: boolean;
  code_owner_approval_required: boolean;
}

export class GroupProtectedBranches<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: {
      search?: string;
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<GroupProtectedBranchSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<GroupProtectedBranchSchema[]>()(
      this,
      endpoint`groups/${groupId}/protected_branches`,
      { sudo, showExpanded, maxPages, searchParams: searchParams as BaseRequestSearchParams &
              PaginationRequestSearchParams<P> &
              PaginationType<P>, },
    );
  }

  show<E extends boolean = false>(
    groupId: string | number,
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupProtectedBranchSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<GroupProtectedBranchSchema>()(
      this,
      endpoint`groups/${groupId}/protected_branches/${name}`,
      { sudo, showExpanded },
    );
  }

  create<E extends boolean = false>(
    groupId: string | number,
    name: string,
    options?: {
      allowForcePush?: boolean;
      allowedToMerge?: ProtectedBranchAccessLevelEntity[];
      allowedToPush?: ProtectedBranchAccessLevelEntity[];
      allowedToUnprotect?: ProtectedBranchAccessLevelEntity[];
      codeOwnerApprovalRequired?: boolean;
      mergeAccessLevel?: number;
      pushAccessLevel?: number;
      unprotectAccessLevel?: number;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<GroupProtectedBranchSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<GroupProtectedBranchSchema>()(
      this,
      endpoint`groups/${groupId}/protected_branches`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          name,
        },
      },
    );
  }

  edit<E extends boolean = false>(
    groupId: string | number,
    name: string,
    options?: {
      allowForcePush?: boolean;
      allowedToPush?: ProtectedBranchAccessLevelEntity[];
      allowedToMerge?: ProtectedBranchAccessLevelEntity[];
      allowedToUnprotect?: ProtectedBranchAccessLevelEntity[];
      codeOwnerApprovalRequired?: boolean;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<GroupProtectedBranchSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.patch<GroupProtectedBranchSchema>()(
      this,
      endpoint`groups/${groupId}/protected_branches/${name}`,
      { sudo, showExpanded, body },
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupProtectedBranchSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del<GroupProtectedBranchSchema>()(
      this,
      endpoint`groups/${groupId}/protected_branches/${name}`,
      { sudo, showExpanded },
    );
  }
}
