import { BaseResource } from '@gitbeaker/requester-utils';
import { CommitSchema } from './Commits';
import { endpoint, PaginatedRequestOptions, RequestHelper, Sudo } from '../infrastructure';

export interface BranchSchema extends Record<string, unknown> {
  name: string;
  merged: boolean;
  protected: boolean;
  default: boolean;
  developers_can_push: boolean;
  developers_can_merge: boolean;
  can_push: boolean;
  web_url: string;
  commit: Omit<CommitSchema, 'web_url' | 'created_at'>;
}

export class Branches<C extends boolean = false> extends BaseResource<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    return RequestHelper.get<BranchSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/branches`,
      options,
    );
  }

  create(projectId: string | number, branchName: string, ref: string, options?: Sudo) {
    const branchKey = this.url.includes('v3') ? 'branchName' : 'branch';

    return RequestHelper.post<BranchSchema>()(
      this,
      endpoint`projects/${projectId}/repository/branches`,
      {
        [branchKey]: branchName,
        ref,
        ...options,
      },
    );
  }

  remove(projectId: string | number, branchName: string, options?: Sudo) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/repository/branches/${branchName}`,
      options,
    );
  }

  show(projectId: string | number, branchName: string, options?: Sudo) {
    return RequestHelper.get<BranchSchema>()(
      this,
      endpoint`projects/${projectId}/repository/branches/${branchName}`,
      options,
    );
  }
}
