import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import {
  MarkdownUploadCreatedSchema,
  MarkdownUploadSchema,
  ResourceMarkdownUploads,
} from '../templates';
import {
  type GitlabAPIResponse,
  type PaginationRequestOptions,
  type PaginationTypes,
  RequestHelper,
  type Sudo,
  endpoint,
} from '../infrastructure';

export interface ProjectMarkdownUploads<C extends boolean = false>
  extends ResourceMarkdownUploads<C> {
  create<E extends boolean = false>(
    projectId: string | number,
    file: { content: Blob; filename: string },
    options?: Sudo,
  ): Promise<GitlabAPIResponse<MarkdownUploadCreatedSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: Sudo & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<MarkdownUploadSchema[], C, E, P>>;

  download<E extends boolean = false>(
    projectId: string | number,
    uploadId: string | number,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    uploadId: string | number,
    options?: Sudo,
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
    options?: Sudo,
  ): Promise<GitlabAPIResponse<MarkdownUploadCreatedSchema, C, E, void>> {
    return RequestHelper.post<MarkdownUploadCreatedSchema>()(this, endpoint`${projectId}/uploads`, {
      isForm: true,
      ...options,
      file: [file.content, file.filename],
    });
  }
}
