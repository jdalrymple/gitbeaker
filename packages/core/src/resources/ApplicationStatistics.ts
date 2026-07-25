import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface ApplicationStatisticSchema extends Record<string, unknown> {
  forks: number;
  issues: number;
  merge_requests: number;
  notes: number;
  snippets: number;
  ssh_keys: number;
  milestones: number;
  users: number;
  groups: number;
  projects: number;
  active_users: number;
}

export class ApplicationStatistics<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ApplicationStatisticSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ApplicationStatisticSchema>()(this, 'application/statistics', {
      sudo,
      showExpanded,
    });
  }
}
