import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  Sudo,
} from '../infrastructure';

import { MarkdownUploadSchema, ResourceMarkdownUploads } from '../templates';

export interface GroupMarkdownUploads<C extends boolean = false>
  extends ResourceMarkdownUploads<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & Sudo,
  ): Promise<GitlabAPIResponse<MarkdownUploadSchema[], C, E, P>>;

  download<E extends boolean = false>(
    groupId: string | number,
    uploadId: string | number,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>>;

  download<E extends boolean = false>(
    projectId: string | number,
    secret: string,
    filename: string,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    uploadId: string | number,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    secret: string,
    filename: string,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;
}

export class GroupMarkdownUploads<C extends boolean = false> extends ResourceMarkdownUploads<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
