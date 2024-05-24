import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  MappedOmit,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { CommitSchema } from './Commits';

export interface BranchSchema extends Record<string, unknown> {
  name: string;
  merged: boolean;
  protected: boolean;
  default: boolean;
  developers_can_push: boolean;
  developers_can_merge: boolean;
  can_push: boolean;
  web_url: string;
  commit: MappedOmit<CommitSchema, 'web_url' | 'created_at'>;
}

export class Branches<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { search?: string; regex?: string } & PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<BranchSchema[], C, E, P>> {
    return RequestHelper.get<BranchSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/branches`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    ref: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<BranchSchema, C, E, void>> {
    return RequestHelper.post<BranchSchema>()(
      this,
      endpoint`projects/${projectId}/repository/branches`,
      {
        branch: branchName,
        ref,
        ...options,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/repository/branches/${branchName}`,
      options,
    );
  }

  removeMerged<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/repository/merged_branches`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<BranchSchema, C, E, void>> {
    return RequestHelper.get<BranchSchema>()(
      this,
      endpoint`projects/${projectId}/repository/branches/${branchName}`,
      options,
    );
  }
}
