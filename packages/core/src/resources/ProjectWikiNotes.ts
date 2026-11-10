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

export interface ProjectWikiNoteSchema extends NoteSchema {
  noteable_type: 'WikiPage::Meta';
  project_id: number;
}

export interface ProjectWikiNotes<C extends boolean = false> extends ResourceNotes<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    wikiPageMetaId: number,
    options?: {
      sort?: 'asc' | 'desc';
      orderBy?: 'created_at' | 'updated_at';
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ProjectWikiNoteSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    wikiPageMetaId: number,
    body: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectWikiNoteSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    wikiPageMetaId: number,
    noteId: number,
    options: { body: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectWikiNoteSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    wikiPageMetaId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    wikiPageMetaId: number,
    noteId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ProjectWikiNoteSchema, C, E, void>>;
}

export class ProjectWikiNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'wiki_pages', options);
  }
}
