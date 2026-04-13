import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import {
  type BaseRequestSearchParams,
  type GitlabAPIResponse,
  type PaginationRequestOptions,
  type PaginationTypes,
  RequestHelper,
  type ShowExpanded,
  type Sudo,
  createFormData,
  endpoint,
} from '../infrastructure';
import {
  MarkdownUploadCreatedSchema,
  MarkdownUploadSchema,
  ResourceMarkdownUploads,
} from '../templates';

export interface ProjectMarkdownUploads<C extends boolean = false>
  extends ResourceMarkdownUploads<C> {
  create<E extends boolean = false>(
    projectId: string | number,
    file: { content: Blob; filename: string },
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MarkdownUploadCreatedSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & Sudo,
  ): Promise<GitlabAPIResponse<MarkdownUploadSchema[], C, E, P>>;

  download<E extends boolean = false>(
    projectId: string | number,
    uploadId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>>;

  download<E extends boolean = false>(
    projectId: string | number,
    secret: string,
    filename: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    uploadId: string | number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    secret: string,
    filename: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
}

export class ProjectMarkdownUploads<C extends boolean = false> extends ResourceMarkdownUploads<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }

  create<E extends boolean = false>(
    projectId: string | number,
    file: { content: Blob; filename: string },
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MarkdownUploadCreatedSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<MarkdownUploadCreatedSchema>()(this, endpoint`${projectId}/uploads`, {
      sudo,
      showExpanded,
      body: createFormData({
        ...body,
        file: [file.content, file.filename],
      }),
    });
  }
}
