import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export class Helm<C extends boolean = false> extends BaseResource<C> {
  downloadChartIndex<E extends boolean = false>(
    projectId: string | number,
    channel: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/helm/${channel}/index.yaml`,
      options,
    );
  }

  downloadChart<E extends boolean = false>(
    projectId: string | number,
    channel: string,
    filename: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, void, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/helm/${channel}/charts/${filename}.tgz`,
      options,
    );
  }

  import<E extends boolean = false>(
    projectId: string | number,
    channel: string,
    chart: { content: Blob; filename: string },
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.post<void>()(
      this,
      endpoint`projects/${projectId}/packages/helm/api/${channel}/charts`,
      {
        isForm: true,
        ...options,
        chart: [chart.content, chart.filename],
      },
    );
  }
}
