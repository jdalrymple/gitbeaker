import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export interface StarredDashboardSchema extends Record<string, unknown> {
  id: number;
  dashboard_path: string;
  user_id: number;
  project_id: number;
}

export class UserStarredMetricsDashboard<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    projectId: string | number,
    dashboardPath: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<StarredDashboardSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<StarredDashboardSchema>()(
      this,
      endpoint`projects/${projectId}/metrics/user_starred_dashboards`,
      {
        sudo,
        showExpanded,
        searchParams: {
          dashboardPath,
        },
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    options?: { dashboardPath?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<{ deleted_rows: number }, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.del<{ deleted_rows: number }>()(
      this,
      endpoint`projects/${projectId}/metrics/user_starred_dashboards`,
      {
        sudo,
        showExpanded,
        searchParams,
      },
    );
  }
}
