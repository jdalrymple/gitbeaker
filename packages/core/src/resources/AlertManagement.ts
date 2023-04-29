import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

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
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MetricImageSchema[], C, E, P>> {
    return RequestHelper.get<MetricImageSchema[]>()(
      this,
      endpoint`projects/${projectId}/alert_management_alerts/${alertIId}/metric_images`,
      options,
    );
  }

  editMetricImage<E extends boolean = false>(
    projectId: string | number,
    alertIId: number,
    imageId: number,
    options?: { url?: string; urlText?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MetricImageSchema, C, E, void>> {
    return RequestHelper.put<MetricImageSchema>()(
      this,
      endpoint`projects/${projectId}/alert_management_alerts/${alertIId}/metric_images/${imageId}`,
      options,
    );
  }

  removeMetricImage<E extends boolean = false>(
    projectId: string | number,
    alertIId: number,
    imageId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/alert_management_alerts/${alertIId}/metric_images/${imageId}`,
      options,
    );
  }

  uploadMetricImage<E extends boolean = false>(
    projectId: string | number,
    alertIId: number,
    metricImage: { content: Blob; filename: string },
    options?: { url?: string; urlText?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MetricImageSchema, C, E, void>> {
    return RequestHelper.post<MetricImageSchema>()(
      this,
      endpoint`projects/${projectId}/alert_management_alerts/${alertIId}/metric_images`,
      {
        isForm: true,
        file: [metricImage.content, metricImage.filename],
        ...options,
      },
    );
  }
}
