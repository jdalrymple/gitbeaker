import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, createFormData, endpoint } from '../infrastructure';

export interface MetricImageSchema extends Record<string, unknown> {
  id: number;
  created_at: string;
  filename: string;
  file_path: string;
  url: string;
  url_text: string;
}

export class AlertManagement<C extends boolean = false> extends BaseResource<C> {
  allMetricImages<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    alertIId: number,
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MetricImageSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<MetricImageSchema[]>()(
      this,
      endpoint`projects/${projectId}/alert_management_alerts/${alertIId}/metric_images`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams,
      },
    );
  }

  editMetricImage<E extends boolean = false>(
    projectId: string | number,
    alertIId: number,
    imageId: number,
    options?: { url?: string; urlText?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MetricImageSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<MetricImageSchema>()(
      this,
      endpoint`projects/${projectId}/alert_management_alerts/${alertIId}/metric_images/${imageId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  removeMetricImage<E extends boolean = false>(
    projectId: string | number,
    alertIId: number,
    imageId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/alert_management_alerts/${alertIId}/metric_images/${imageId}`,
      { sudo, showExpanded },
    );
  }

  uploadMetricImage<E extends boolean = false>(
    projectId: string | number,
    alertIId: number,
    metricImage: { content: Blob; filename: string },
    options?: { url?: string; urlText?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MetricImageSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<MetricImageSchema>()(
      this,
      endpoint`projects/${projectId}/alert_management_alerts/${alertIId}/metric_images`,
      {
        sudo,
        showExpanded,
        body: createFormData({
          file: [metricImage.content, metricImage.filename],
          url: body?.url,
          urlText: body?.urlText,
        }),
      },
    );
  }
}
