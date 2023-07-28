import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
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
    {
      environmentId,
      clusterId,
      ...options
    }: OneOf<{ environmentId: number; clusterId: number }> & { endingAt?: string } & Sudo &
      ShowExpanded<E> = {} as any,
  ): Promise<GitlabAPIResponse<DashboardAnnotationSchema, C, E, void>> {
    let url: string;

    if (environmentId) url = endpoint`environments/${environmentId}/metrics_dashboard/annotations`;
    else if (clusterId) url = endpoint`clusters/${clusterId}/metrics_dashboard/annotations`;
    else
      throw new Error(
        'Missing required argument. Please supply a environmentId or a cluserId in the options parameter.',
      );

    return RequestHelper.post<DashboardAnnotationSchema>()(this, url, {
      dashboardPath,
      startingAt,
      description,
      ...options,
    });
  }
}
