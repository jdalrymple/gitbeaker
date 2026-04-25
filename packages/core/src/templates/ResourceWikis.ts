import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationRequestSearchParams,
  PaginationType,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, createFormData, endpoint } from '../infrastructure';

export interface WikiSchema extends Record<string, unknown> {
  content: string;
  format: string;
  slug: string;
  title: string;
  encoding: string;
}

export interface WikiAttachmentSchema extends Record<string, unknown> {
  file_name: string;
  file_path: string;
  branch: string;
  link: {
    url: string;
    markdown: string;
  };
}

export class ResourceWikis<C extends boolean = false> extends BaseResource<C> {
  constructor(resourceType: string, options: BaseResourceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options: { withContent: true } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<({ content: string } & WikiSchema)[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<WikiSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    resourceId: string | number,
    options?: { withContent?: boolean } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<WikiSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<WikiSchema[]>()(this, endpoint`${resourceId}/wikis`, {
      sudo,
      showExpanded,
      maxPages,
      searchParams: searchParams as BaseRequestSearchParams &
        PaginationRequestSearchParams<P> &
        PaginationType<P>,
    });
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    content: string,
    title: string,
    options?: { format?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<WikiSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<WikiSchema>()(this, endpoint`${resourceId}/wikis`, {
      sudo,
      showExpanded,
      body: {
        ...body,
        content,
        title,
      },
    });
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    slug: string,
    options?: { format?: string } & OneOf<{ content: string; title: string }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<WikiSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.put<WikiSchema>()(this, endpoint`${resourceId}/wikis/${slug}`, {
      sudo,
      showExpanded,
      body,
    });
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    slug: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(this, endpoint`${resourceId}/wikis/${slug}`, {
      sudo,
      showExpanded,
    });
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    slug: string,
    options?: { renderHtml?: boolean; version?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<WikiSchema, C, E, void>> {
    const { sudo, showExpanded, ...searchParams } = options || {};

    return RequestHelper.get<WikiSchema>()(this, endpoint`${resourceId}/wikis/${slug}`, {
      sudo,
      showExpanded,
      searchParams,
    });
  }

  uploadAttachment<E extends boolean = false>(
    resourceId: string | number,
    file: { content: Blob; filename: string },
    options?: { branch?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<WikiAttachmentSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<WikiAttachmentSchema>()(
      this,
      endpoint`${resourceId}/wikis/attachments`,
      {
        sudo,
        showExpanded,
        body: createFormData({
          ...body,
          file: [file.content, file.filename],
        }),
      },
    );
  }
}
