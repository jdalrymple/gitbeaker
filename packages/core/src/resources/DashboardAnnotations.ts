import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, ensureRequiredParams, getPrefixedUrl } from '../infrastructure';
import type { GitlabAPIResponse, OneOf, ShowExpanded, Sudo } from '../infrastructure';

export interface DashboardAnnotationSchema extends Record<string, unknown> {
  id: number;
  starting_at: string;
  ending_at?: null;
  dashboard_path: string;
  description: string;
  environment_id: number;
  cluster_id?: null;
}

export class DashboardAnnotations<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    dashboardPath: string,
    startingAt: string,
    description: string,
    options?: OneOf<{ environmentId: number; clusterId: number }> & { endingAt?: string } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DashboardAnnotationSchema, C, E, void>> {
    const { environmentId, clusterId, sudo, showExpanded, ...body } = options || {};

    ensureRequiredParams({ environmentId, clusterId });

    const url = getPrefixedUrl('metrics_dashboard/annotations', {
      environments: environmentId,
      clusters: clusterId,
    });

    return RequestHelper.post<DashboardAnnotationSchema>()(this, url, {
      sudo,
      showExpanded,
      body: {
        dashboardPath,
        startingAt,
        description,
        ...body,
      },
    });
  }
}
