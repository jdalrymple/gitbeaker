import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { NoteSchema } from '../templates/ResourceNotes';

import { ResourceNotes } from '../templates';

export interface SnippetNoteSchema extends NoteSchema {
  noteable_type: 'Snippet';
}

export interface ProjectSnippetNotes<C extends boolean = false> extends ResourceNotes<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    snippedId: number,
    options?: {
      sort?: 'asc' | 'desc';
      orderBy?: 'created_at' | 'updated_at';
    } & PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<SnippetNoteSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    snippedId: number,
    body: string,
    options?: { createdAt?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SnippetNoteSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    snippedId: number,
    noteId: number,
    options: { body: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SnippetNoteSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    snippedId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    snippedId: number,
    noteId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<SnippetNoteSchema, C, E, void>>;
}

export class ProjectSnippetNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'snippets', options);
  }
}
