import { BaseResource } from '@gitbeaker/requester-utils';

import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

import { RequestHelper, createFormData, endpoint } from '../infrastructure';

export class Helm<C extends boolean = false> extends BaseResource<C> {
  downloadChartIndex<E extends boolean = false>(
    projectId: string | number,
    channel: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/helm/${channel}/index.yaml`,
      { sudo, showExpanded },
    );
  }

  downloadChart<E extends boolean = false>(
    projectId: string | number,
    channel: string,
    filename: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/helm/${channel}/charts/${filename}.tgz`,
      { sudo, showExpanded },
    );
  }

  uploadChart<E extends boolean = false>(
    projectId: string | number,
    channel: string,
    chart: { content: Blob; filename: string },
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<void>()(
      this,
      endpoint`projects/${projectId}/packages/helm/api/${channel}/charts`,
      {
        sudo,
        showExpanded,
        body: createFormData({
          ...body,
          chart,
        }),
      },
    );
  }

  import<E extends boolean = false>(
    projectId: string | number,
    channel: string,
    chart: { content: Blob; filename: string },
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return this.uploadChart(projectId, channel, chart, options);
  }
}
