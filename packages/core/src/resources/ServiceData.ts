import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export class ServiceData<C extends boolean = false> extends BaseResource<C> {
  showMetricDefinitions<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    return RequestHelper.get<string>()(this, 'usage_data/metric_definitions', options);
  }

  showServicePingSQLQueries<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Record<string, unknown>, C, E, void>> {
    return RequestHelper.get<Record<string, unknown>>()(this, 'usage_data/queries', options);
  }

  showUsageDataNonSQLMetrics<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Record<string, unknown>, C, E, void>> {
    return RequestHelper.get<Record<string, unknown>>()(
      this,
      'usage_data/non_sql_metrics',
      options,
    );
  }
}
