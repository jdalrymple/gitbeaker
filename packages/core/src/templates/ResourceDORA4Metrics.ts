import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { BaseRequestOptions, GitlabAPIResponse } from '../infrastructure';

export type MetricType = 'deployment_frequency' | 'lead_time_for_changes';

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
      interval?: string;
      environmentTier?: string;
    } & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<DORA4MetricSchema[], C, E, void>> {
    return RequestHelper.get<DORA4MetricSchema[]>()(this, endpoint`${resourceId}/dora/metrics`, {
      metric,
      ...options,
    });
  }
}
