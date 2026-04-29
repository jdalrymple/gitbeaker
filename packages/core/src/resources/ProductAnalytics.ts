import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, endpoint } from '../infrastructure';

export class ProductAnalytics<C extends boolean = false> extends BaseResource<C> {
  allFunnels<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Record<string, unknown>, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Record<string, unknown>>()(
      this,
      endpoint`projects/${projectId}/product_analytics/funnels`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  load<E extends boolean = false>(
    projectId: string | number,
    options?: { includeToken?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<void>()(
      this,
      endpoint`projects/${projectId}/product_analytics/request/load`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  dryRun<E extends boolean = false>(
    projectId: string | number,
    options?: { includeToken?: boolean } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<void>()(
      this,
      endpoint`projects/${projectId}/product_analytics/request/dry-run`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  showMetadata<E extends boolean = false>(
    projectId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<void>()(
      this,
      endpoint`projects/${projectId}/product_analytics/request/meta`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
