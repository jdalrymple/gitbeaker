import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export class ProductAnalytics<C extends boolean = false> extends BaseResource<C> {
  allFunnels<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Record<string, unknown>, C, E, void>> {
    return RequestHelper.get<Record<string, unknown>>()(
      this,
      endpoint`projects/${projectId}/product_analytics/funnels`,
      options,
    );
  }

  load<E extends boolean = false>(
    projectId: string | number,
    options?: { includeToken?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(
      this,
      endpoint`projects/${projectId}/product_analytics/request/load`,
      options,
    );
  }

  dryRun<E extends boolean = false>(
    projectId: string | number,
    options?: { includeToken?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(
      this,
      endpoint`projects/${projectId}/product_analytics/request/dry-run`,
      options,
    );
  }

  showMetadata<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.get<void>()(
      this,
      endpoint`projects/${projectId}/product_analytics/request/meta`,
      options,
    );
  }
}
