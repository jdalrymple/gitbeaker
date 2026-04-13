import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

export type MetricType =
  | 'deployment_frequency'
  | 'lead_time_for_changes'
  | 'time_to_restore_service'
  | 'change_failure_rate';

export interface DORA4MetricSchema extends Record<string, unknown> {
  date: string;
  value: number;
}

export class ResourceDORA4Metrics<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false>(
    resourceId: string | number,
    metric: MetricType,
    options?: {
      startDate?: string;
      endDate?: string;
      interval?: 'all' | 'monthly' | 'daily';
      environmentTiers?: string[];
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<DORA4MetricSchema[], C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<DORA4MetricSchema[]>()(this, endpoint`${resourceId}/dora/metrics`, {
      sudo,
      showExpanded,
      searchParams: {
        ...searchParams,
        metric,
      },
    });
  }
}
