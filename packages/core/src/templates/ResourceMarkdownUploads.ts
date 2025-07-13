import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  Sudo,
} from '../infrastructure';

export interface MarkdownUploadUserSchema extends Record<string, unknown> {
  id: number;
  name: string;
  username: string;
}

export interface MarkdownUploadSchema extends Record<string, unknown> {
  id: number;
  size: number;
  filename: string;
  created_at: string;
  uploaded_by: MarkdownUploadUserSchema;
}

export interface MarkdownUploadCreatedSchema extends Record<string, unknown> {
  id: number;
  alt: string;
  url: string;
  full_path: string;
  markdown: string;
}

export class ResourceMarkdownUploads<C extends boolean> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: Sudo & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<MarkdownUploadSchema[], C, E, P>> {
    return RequestHelper.get<MarkdownUploadSchema[]>()(
      this,
      endpoint`${resourceId}/uploads`,
      options,
    );
  }

  download<E extends boolean = false>(
    resourceId: string | number,
    uploadId: string | number,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    return RequestHelper.get<Blob>()(this, endpoint`${resourceId}/uploads/${uploadId}`, options);
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    uploadId: string | number,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${resourceId}/uploads/${uploadId}`, options);
  }
}
