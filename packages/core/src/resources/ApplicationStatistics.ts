import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ApplicationStatisticSchema, C, E, void>> {
    return RequestHelper.get<ApplicationStatisticSchema>()(this, 'application/statistics', options);
  }
}
