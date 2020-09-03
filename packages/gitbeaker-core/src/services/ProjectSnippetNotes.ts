import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface ProjectSnippetNotes extends ResourceNotes {
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

export class ProjectSnippetNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'snippets', options);
  }
}
