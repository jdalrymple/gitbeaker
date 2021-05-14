import { BaseService } from '@gitbeaker/requester-utils';
import { CommitSchema } from './Commits';
import { PaginatedRequestOptions, RequestHelper, Sudo } from '../infrastructure';

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

export class Branches<C extends boolean = false> extends BaseService<C> {
  all(projectId: string | number, options?: PaginatedRequestOptions) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get<BranchSchema[]>()(
      this,
      `projects/${pId}/repository/branches`,
      options,
    );
  }

  create(projectId: string | number, branchName: string, ref: string, options?: Sudo) {
    const pId = encodeURIComponent(projectId);
    const branchKey = this.url.includes('v3') ? 'branchName' : 'branch';

    return RequestHelper.post<BranchSchema>()(this, `projects/${pId}/repository/branches`, {
      [branchKey]: branchName,
      ref,
      ...options,
    });
  }

  remove(projectId: string | number, branchName: string, options?: Sudo) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.del()(this, `projects/${pId}/repository/branches/${bName}`, options);
  }

  show(projectId: string | number, branchName: string, options?: Sudo) {
    const [pId, bName] = [projectId, branchName].map(encodeURIComponent);

    return RequestHelper.get<BranchSchema>()(
      this,
      `projects/${pId}/repository/branches/${bName}`,
      options,
    );
  }
}
