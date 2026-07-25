import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export interface PullMirrorSchema extends Record<string, unknown> {
  id: number;
  enabled: boolean;
  last_error: string | null;
  last_successful_update_at: string;
  last_update_at: string;
  last_update_started_at: string;
  mirror_branch_regex: string | null;
  mirror_overwrites_diverged_branches: boolean;
  mirror_trigger_builds: boolean;
  only_mirror_protected_branches: boolean | null;
  update_status: 'none' | 'scheduled' | 'started' | 'finished' | 'failed' | 'canceled';
  url: string;
}

export type UpdatePullMirrorOptions = {
  authPassword?: string;
  authUser?: string;
  enabled?: boolean;
  mirrorBranchRegex?: string;
  mirrorOverwritesDivergedBranches?: boolean;
  mirrorTriggerBuilds?: boolean;
  onlyMirrorProtectedBranches?: boolean;
  url?: string;
};

export class ProjectPullMirroring<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<PullMirrorSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<PullMirrorSchema>()(
      this,
      endpoint`projects/${projectId}/mirror/pull`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo & UpdatePullMirrorOptions,
  ): Promise<GitlabAPIResponse<PullMirrorSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<PullMirrorSchema>()(
      this,
      endpoint`projects/${projectId}/mirror/pull`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  start<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, endpoint`projects/${projectId}/mirror/pull`, {
      sudo,
      showExpanded,
    });
  }
}
