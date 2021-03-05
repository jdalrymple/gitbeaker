import { BaseService } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface ProtectedBranchAccessLevelSchema {
  access_level: 0 | 30 | 40 | 60;
  access_level_description: string;
  group_id?: number;
  user_id?: number;
}

export interface ProtectedBranchSchema extends Record<string, unknown> {
  id: number;
  name: string;
  push_access_levels?: ProtectedBranchAccessLevelSchema[];
  merge_access_levels?: ProtectedBranchAccessLevelSchema[];
  unprotect_access_levels?: ProtectedBranchAccessLevelSchema[];
  code_owner_approval_required: string;
}

export class ProtectedBranches<C extends boolean = false> extends BaseService<C> {
  all(
    projectId: string | number,
    { search, ...options }: { search?: string } & PaginatedRequestOptions = {},
  ) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<ProtectedBranchSchema[]>()(
      this,
      `projects/${pId}/protected_branches`,
      { search, ...options },
    );
  }

  protect(projectId: string | number, branchName: string, options?: BaseRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post<ProtectedBranchSchema>()(this, `projects/${pId}/protected_branches`, {
      name: branchName,
      ...options,
    });
  }

  show(projectId: string | number, branchName: string, options?: Sudo) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.get<ProtectedBranchSchema>()(
      this,
      `projects/${pId}/protected_branches/${bName}`,
      options,
    );
  }

  unprotect(projectId: string | number, branchName: string, options?: Sudo) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.del<void>()(this, `projects/${pId}/protected_branches/${bName}`, options);
  }
}
