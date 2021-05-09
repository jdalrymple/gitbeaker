import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes, NoteSchema } from '../templates';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';

export interface SnippetNoteSchema extends NoteSchema {
  file_name: string;
  expires_at: string;
}

export interface ProjectSnippetNotes<C extends boolean = false> extends ResourceNotes<C> {
  all(
    projectId: string | number,
    snippetId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, SnippetNoteSchema>[]>;

  create(
    projectId: string | number,
    snippetId: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, SnippetNoteSchema>>;

  edit(
    projectId: string | number,
    snippetId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, SnippetNoteSchema>>;

  remove(projectId: string | number, snippetId: string | number, noteId: number, options?: Sudo);

  show(
    projectId: string | number,
    snippetId: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, SnippetNoteSchema>>;
}

export class ProjectSnippetNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', 'snippets', options);
  }
}
