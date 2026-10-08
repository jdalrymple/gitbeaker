import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { NoteSchema } from '../templates/ResourceNotes';

import { ResourceNotes } from '../templates/ResourceNotes';

export interface GroupWikiNoteSchema extends NoteSchema {
  noteable_type: 'WikiPage::Meta';
  project_id: null;
}

export interface GroupWikiNotes<C extends boolean = false> extends ResourceNotes<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    wikiPageMetaId: number,
    options?: {
      sort?: 'asc' | 'desc';
      orderBy?: 'created_at' | 'updated_at';
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<GroupWikiNoteSchema[], C, E, P>>;

  create<E extends boolean = false>(
    groupId: string | number,
    wikiPageMetaId: number,
    body: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupWikiNoteSchema, C, E, void>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    wikiPageMetaId: number,
    noteId: number,
    options: { body: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupWikiNoteSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    wikiPageMetaId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    wikiPageMetaId: number,
    noteId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<GroupWikiNoteSchema, C, E, void>>;
}

export class GroupWikiNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', 'wiki_pages', options);
  }
}
