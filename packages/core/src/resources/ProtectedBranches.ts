import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export type ProtectedBranchAccessLevel = 0 | 30 | 40 | 60;
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

export type ProtectedBranchAllowOptions = OneOf<{
  userId: number;
  groupId: number;
  accessLevel: ProtectedBranchAccessLevel;
}>;

export type EditsProtectedBranchAllowOptions = {
  _destroy?: boolean;
  id?: number;
} & ProtectedBranchAllowOptions;

export type CreateProtectedBranchOptions = {
  allowForcePush?: boolean;
  allowedToMerge?: ProtectedBranchAllowOptions[];
  allowedToPush?: ProtectedBranchAllowOptions[];
  allowedToUnprotect?: ProtectedBranchAllowOptions[];
  codeOwnerApprovalRequired?: boolean;
  mergeAccessLevel?: ProtectedBranchAccessLevel;
  pushAccessLevel?: ProtectedBranchAccessLevel;
  unprotectAccessLevel?: ProtectedBranchAccessLevel;
};

export type EditProtectedBranchOptions = {
  allowForcePush?: boolean;
  allowedToMerge?: EditsProtectedBranchAllowOptions[];
  allowedToPush?: EditsProtectedBranchAllowOptions[];
  allowedToUnprotect?: EditsProtectedBranchAllowOptions[];
  codeOwnerApprovalRequired?: boolean;
};

export class ProtectedBranches<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { search?: string } & Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema[], C, E, P>> {
    return RequestHelper.get<ProtectedBranchSchema[]>()(
      this,
      endpoint`projects/${projectId}/protected_branches`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: CreateProtectedBranchOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema, C, E, void>> {
    const { sudo, showExpanded, ...opts } = options || {};

    return RequestHelper.post<ProtectedBranchSchema>()(
      this,
      endpoint`projects/${projectId}/protected_branches`,
      {
        searchParams: {
          ...opts,
          name: branchName,
        },
        sudo,
        showExpanded,
      },
    );
  }

  // Convenience method - create
  protect<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: CreateProtectedBranchOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema, C, E, void>> {
    return this.create(projectId, branchName, options);
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: EditProtectedBranchOptions & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema, C, E, void>> {
    return RequestHelper.patch<ProtectedBranchSchema>()(
      this,
      endpoint`projects/${projectId}/protected_branches/${branchName}`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema, C, E, void>> {
    return RequestHelper.get<ProtectedBranchSchema>()(
      this,
      endpoint`projects/${projectId}/protected_branches/${branchName}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/protected_branches/${branchName}`,
      options,
    );
  }

  // Convenience method - remove
  unprotect<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return this.remove(projectId, branchName, options);
  }
}
