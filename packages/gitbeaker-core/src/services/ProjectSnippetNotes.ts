import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes, NoteSchema } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface SnippetNoteSchema extends NoteSchema {
  file_name: string;
  expires_at: string;
}

export interface ProjectSnippetNotes extends ResourceNotes {
  all(
    projectId: string | number,
    snippetId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<SnippetNoteSchema[]>;

  create(
    projectId: string | number,
    snippetId: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<SnippetNoteSchema>;

  edit(
    projectId: string | number,
    snippetId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<SnippetNoteSchema>;

  remove(projectId: string | number, snippetId: string | number, noteId: number, options?: Sudo);

  show(
    projectId: string | number,
    snippetId: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<SnippetNoteSchema>;
}

export class ProjectSnippetNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', 'snippets', options);
  }
}
