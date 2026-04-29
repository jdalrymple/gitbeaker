import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { CommitSchema } from './Commits';

import { RequestHelper, endpoint } from '../infrastructure';

export interface RepositorySubmoduleSchema extends CommitSchema {
  status?: string;
}

export class RepositorySubmodules<C extends boolean = false> extends BaseResource<C> {
  edit<E extends boolean = false>(
    projectId: string | number,
    submodule: string,
    branch: string,
    commitSha: string,
    options?: {
      commitMessage?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<RepositorySubmoduleSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<RepositorySubmoduleSchema>()(
      this,
      endpoint`projects/${projectId}/repository/submodules/${submodule}`,
      {
        sudo,
        showExpanded,
        body: {
          ...body,
          branch,
          commitSha,
        },
      },
    );
  }
}
