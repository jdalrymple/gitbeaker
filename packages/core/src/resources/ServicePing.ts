import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper } from '../infrastructure';

export interface ServicePingSchema extends Record<string, unknown> {
  recorded_at: string;
  license: Record<string, unknown>;
  counts: Record<string, number>;
  [key: string]: unknown;
}

export interface MetricDefinitionSchema extends Record<string, unknown> {
  key_path: string;
  description: string;
  product_group: string;
  value_type: string;
  status: string;
  time_frame: string;
  data_source: string;
  tier: string[];
}

export interface ServicePingQueriesSchema extends Record<string, unknown> {
  recorded_at: string;
  uuid: string | null;
  hostname: string;
  version: string;
  installation_type: string;
  active_user_count: string;
  edition: string;
  license_md5: string;
  license_sha256: string;
  license_id: string | null;
  historical_max_users: number;
  licensee: Record<string, unknown>;
  license_user_count: number | null;
  license_starts_at: string;
  license_expires_at: string;
  license_plan: string;
  license_add_ons: Record<string, number>;
  license_trial: boolean | null;
  license_subscription_id: string;
  license: Record<string, unknown>;
  settings: Record<string, unknown>;
  counts: Record<string, string>;
  [key: string]: unknown;
}

export interface TrackEventOptions extends Record<string, unknown> {
  event: string;
  sendToSnowplow?: boolean;
  namespaceId?: number;
  projectId?: number;
  additionalProperties?: Record<string, unknown>;
}

export class ServicePing<C extends boolean = false> extends BaseResource<C> {
  exportServicePing<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ServicePingSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ServicePingSchema>()(this, 'usage_data/service_ping', {
      sudo,
      showExpanded,
    });
  }

  exportMetricDefinitions<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MetricDefinitionSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MetricDefinitionSchema[]>()(this, 'usage_data/metric_definitions', {
      sudo,
      showExpanded,
    });
  }

  allQueries<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ServicePingQueriesSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ServicePingQueriesSchema>()(this, 'usage_data/queries', {
      sudo,
      showExpanded,
    });
  }

  allNonSqlMetrics<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ServicePingSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ServicePingSchema>()(this, 'usage_data/non_sql_metrics', {
      sudo,
      showExpanded,
    });
  }

  trackEvent<E extends boolean = false>(
    eventData: TrackEventOptions,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, 'usage_data/track_event', {
      sudo,
      showExpanded,
      body: eventData,
    });
  }

  trackEvents<E extends boolean = false>(
    events: TrackEventOptions[],
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<void>()(this, 'usage_data/track_events', {
      sudo,
      showExpanded,
      body: { events },
    });
  }
}
