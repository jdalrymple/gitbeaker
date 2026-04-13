import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';

export class ServiceData<C extends boolean = false> extends BaseResource<C> {
  showMetricDefinitions<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<string>()(this, 'usage_data/metric_definitions', {
      sudo,
      showExpanded,
    });
  }

  showServicePingSQLQueries<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Record<string, unknown>, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Record<string, unknown>>()(this, 'usage_data/queries', {
      sudo,
      showExpanded,
    });
  }

  showUsageDataNonSQLMetrics<E extends boolean = false>(
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Record<string, unknown>, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Record<string, unknown>>()(this, 'usage_data/non_sql_metrics', {
      sudo,
      showExpanded,
    });
  }
}
