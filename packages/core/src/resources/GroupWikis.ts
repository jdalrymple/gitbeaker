import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { WikiAttachmentSchema, WikiSchema } from '../templates/ResourceWikis';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceWikis } from '../templates';

export interface GroupWikis<C extends boolean = false> extends ResourceWikis<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options: { withContent: true } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<({ content: string } & WikiSchema)[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<WikiSchema[], C, E, P>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    options?: { withContent?: boolean } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<WikiSchema[], C, E, P>>;

  create<E extends boolean = false>(
    groupId: string | number,
    content: string,
    title: string,
    options?: { format?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<WikiSchema, C, E, void>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    slug: string,
    options?: { format?: string } & OneOf<{ content: string; title: string }> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<WikiSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    slug: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    slug: string,
    options?: { renderHtml?: boolean; version?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<WikiSchema, C, E, void>>;

  uploadAttachment<E extends boolean = false>(
    groupId: string | number,
    file: { content: Blob; filename: string },
    options?: { branch?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<WikiAttachmentSchema, C, E, void>>;
}

export class GroupWikis<C extends boolean = false> extends ResourceWikis<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', options);
  }
}
