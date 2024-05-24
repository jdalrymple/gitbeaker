import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<StarredDashboardSchema, C, E, void>> {
    return RequestHelper.get<StarredDashboardSchema>()(
      this,
      endpoint`projects/${projectId}/metrics/user_starred_dashboards`,
      {
        dashboardPath,
        ...options,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    options?: { dashboard_path?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<{ deleted_rows: number }, C, E, void>> {
    return RequestHelper.del<{ deleted_rows: number }>()(
      this,
      endpoint`projects/${projectId}/metrics/user_starred_dashboards`,
      options,
    );
  }
}
