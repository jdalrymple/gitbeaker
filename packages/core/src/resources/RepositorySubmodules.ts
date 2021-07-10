import { BaseResource } from '@gitbeaker/requester-utils';
import { BaseRequestOptions, RequestHelper } from '../infrastructure';

export interface RepositorySubmoduleSchema extends Record<string, unknown> {
  id: string;
  short_id: string;
  title: string;
  author_name: string;
  author_email: string;
  committer_name: string;
  committer_email: string;
  created_at: string;
  message: string;
  parent_ids: string[];
  committed_date: Date;
  authored_date: Date;
  status?: string;
}

export class RepositorySubmodules<C extends boolean = false> extends BaseResource<C> {
  update(
    projectId: string | number,
    submodule: string,
    branch: string,
    commit_sha: string,
    options?: BaseRequestOptions,
  ) {
    const [pId, sm] = [projectId, submodule].map(encodeURIComponent);
    return RequestHelper.put<RepositorySubmoduleSchema>()(
      this,
      `projects/${pId}/repository/submodules/${sm}`,
      {
        branch,
        commit_sha,
        ...options,
      },
    );
  }
}
