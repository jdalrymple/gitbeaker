import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface ProjectSnippetNotes<C extends boolean = false> extends ResourceNotes<C> {
  all(projectId: string | number, snippetId: string | number, options?: PaginatedRequestOptions);

  create(
    projectId: string | number,
    snippetId: string | number,
    body: string,
    options?: BaseRequestOptions,
  );

  edit(
    projectId: string | number,
    snippetId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  );

  remove(projectId: string | number, snippetId: string | number, noteId: number, options?: Sudo);

  show(projectId: string | number, snippetId: string | number, noteId: number, options?: Sudo);
}

export class ProjectSnippetNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', 'snippets', options);
  }
}
