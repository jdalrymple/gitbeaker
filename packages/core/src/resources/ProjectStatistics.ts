import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface ProjectStatisticSchema extends Record<string, unknown> {
  fetches: {
    total: number;
    days: { count: number; date: string }[];
  };
}

export class ProjectStatistics<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectStatisticSchema, C, E, void>> {
    return RequestHelper.get<ProjectStatisticSchema>()(
      this,
      endpoint`projects/${projectId}/statistics`,
      options as ShowExpanded<E> & Sudo,
    );
  }
}
