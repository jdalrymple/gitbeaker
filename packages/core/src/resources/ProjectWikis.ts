import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceWikis } from '../templates';
import type { WikiAttachmentSchema, WikiSchema } from '../templates/ResourceWikis';
import type {
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface ProjectWikis<C extends boolean = false> extends ResourceWikis<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options: { withContent: true } & Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<(WikiSchema & { content: string })[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<WikiSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    options?: { withContent?: boolean } & Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<WikiSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    content: string,
    title: string,
    options?: { format?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<WikiSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    slug: string,
    options?: OneOf<{ content: string; title: string }> & { format?: string } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<WikiSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    slug: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    slug: string,
    options?: { renderHtml?: boolean; version?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<WikiSchema, C, E, void>>;

  uploadAttachment<E extends boolean = false>(
    projectId: string | number,
    file: { content: Blob; filename: string },
    options?: { branch?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<WikiAttachmentSchema, C, E, void>>;
}

export class ProjectWikis<C extends boolean = false> extends ResourceWikis<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', options);
  }
}
