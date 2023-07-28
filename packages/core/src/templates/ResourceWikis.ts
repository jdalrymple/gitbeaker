import { BaseResource } from '@gitbeaker/requester-utils';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

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
    options?: { withContent?: boolean } & Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<WikiSchema[], C, E, P>> {
    return RequestHelper.get<WikiSchema[]>()(this, endpoint`${resourceId}/wikis`, options);
  }

  create<E extends boolean = false>(
    resourceId: string | number,
    content: string,
    title: string,
    options?: { format?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<WikiSchema, C, E, void>> {
    return RequestHelper.post<WikiSchema>()(this, endpoint`${resourceId}/wikis`, {
      content,
      title,
      ...options,
    });
  }

  edit<E extends boolean = false>(
    resourceId: string | number,
    slug: string,
    options?: OneOf<{ content: string; title: string }> & { format?: string } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<WikiSchema, C, E, void>> {
    return RequestHelper.put<WikiSchema>()(this, endpoint`${resourceId}/wikis/${slug}`, options);
  }

  remove<E extends boolean = false>(
    resourceId: string | number,
    slug: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, endpoint`${resourceId}/wikis/${slug}`, options);
  }

  show<E extends boolean = false>(
    resourceId: string | number,
    slug: string,
    options?: { renderHtml?: boolean; version?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<WikiSchema, C, E, void>> {
    return RequestHelper.get<WikiSchema>()(this, endpoint`${resourceId}/wikis/${slug}`, options);
  }

  uploadAttachment<E extends boolean = false>(
    resourceId: string | number,
    file: { content: Blob; filename: string },
    options?: { branch?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<WikiAttachmentSchema, C, E, void>> {
    return RequestHelper.post<WikiAttachmentSchema>()(
      this,
      endpoint`${resourceId}/wikis/attachments`,
      {
        ...options,
        isForm: true,
        file: [file.content, file.filename],
      },
    );
  }
}
