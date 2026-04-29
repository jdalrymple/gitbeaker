import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';

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
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MarkdownUploadSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<MarkdownUploadSchema[]>()(this, endpoint`${resourceId}/uploads`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  download<E extends boolean = false>(
    resourceId: string | number,
    uploadId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>>;

  download<E extends boolean = false>(
    resourceId: string | number,
    secret: string,
    filename: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>>;

  download<E extends boolean = false>(
    resourceId: string | number,
    uploadIdOrSecret: string | number,
    filename?: any,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    if (filename && typeof filename === 'string') {
      const { sudo, showExpanded } = options || {};
      return RequestHelper.get<Blob>()(
        this,
        endpoint`${resourceId}/uploads/${uploadIdOrSecret}/${filename}`,
        {
          sudo,
          showExpanded,
        },
      );
    }
    const { sudo, showExpanded } = options || {};
    return RequestHelper.get<Blob>()(this, endpoint`${resourceId}/uploads/${uploadIdOrSecret}`, {
      sudo,
      showExpanded,
    });
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    uploadId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  remove<E extends boolean = false>(
    resourceId: string | number,
    secret: string,
    filename: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  remove<E extends boolean = false>(
    resourceId: string | number,
    uploadIdOrSecret: string | number,
    filename?: any,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    if (filename && typeof filename === 'string') {
      const { sudo, showExpanded } = options || {};
      return RequestHelper.del()(
        this,
        endpoint`${resourceId}/uploads/${uploadIdOrSecret}/${filename}`,
        {
          sudo,
          showExpanded,
        },
      );
    }
    const { sudo, showExpanded } = options || {};
    return RequestHelper.del()(this, endpoint`${resourceId}/uploads/${uploadIdOrSecret}`, {
      sudo,
      showExpanded,
    });
  }
}
