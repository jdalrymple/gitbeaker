import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';

export interface ApplicationStatisticSchema extends Record<string, unknown> {
  forks: string;
  issues: string;
  merge_requests: string;
  notes: string;
  snippets: string;
  ssh_keys: string;
  milestones: string;
  users: string;
  groups: string;
  projects: string;
  active_users: string;
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
