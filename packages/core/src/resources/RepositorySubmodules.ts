import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { CommitSchema } from './Commits';

export interface RepositorySubmoduleSchema extends CommitSchema {
  status?: string;
}

export class RepositorySubmodules<C extends boolean = false> extends BaseResource<C> {
  edit<E extends boolean = false>(
    projectId: string | number,
    submodule: string,
    branch: string,
    commitSha: string,
    options?: { commitMessage?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RepositorySubmoduleSchema, C, E, void>> {
    return RequestHelper.put<RepositorySubmoduleSchema>()(
      this,
      endpoint`projects/${projectId}/repository/submodules/${submodule}`,
      {
        branch,
        commitSha,
        ...options,
      },
    );
  }
}
