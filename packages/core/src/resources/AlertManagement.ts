import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestOptions,
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
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    alertIId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<MetricImageSchema[], C, E, P>> {
    return RequestHelper.get<MetricImageSchema[]>()(
      this,
      endpoint`/projects/${projectId}/alert_management_alerts/${alertIId}/metric_images`,
      options,
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    alertIId: number,
    imageId: number,
    options?: { url?: string; urlText?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MetricImageSchema, C, E, void>> {
    return RequestHelper.put<MetricImageSchema>()(
      this,
      endpoint`/projects/${projectId}/alert_management_alerts/${alertIId}/metric_images/${imageId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    alertIId: number,
    imageId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`/projects/${projectId}/alert_management_alerts/${alertIId}/metric_images/${imageId}`,
      options,
    );
  }

  upload<E extends boolean = false>(
    projectId: string | number,
    alertIId: number,
    content: Blob,
    {
      filename,
      url,
      urlText,
      ...options
    }: { url?: string; urlText?: string; filename?: string } & Sudo & ShowExpanded<E> = {
      filename: `${Date.now().toString()}.tar.gz`,
    },
  ): Promise<GitlabAPIResponse<MetricImageSchema, C, E, void>> {
    return RequestHelper.post<MetricImageSchema>()(
      this,
      endpoint`/projects/${projectId}/alert_management_alerts/${alertIId}/metric_images`,
      {
        isForm: true,
        ...options,
        file: [content, filename],
        url_text: urlText,
        url,
      },
    );
  }
}
