import { ResourceDiscussions } from '../templates';
import {
  BaseRequestOptions,
  BaseServiceOptions,
  PaginatedRequestOptions,
  Sudo,
} from '../infrastructure';

export interface ProjectSnippetDiscussions extends ResourceDiscussions {
  addNote(
    projectId: string | number,
    snippetId: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  );

  all(projectId: string | number, snippetId: string | number, options?: PaginatedRequestOptions);

  create(
    projectId: string | number,
    snippetId: string | number,
    content: string,
    options?: BaseRequestOptions,
  );

  editNote(
    projectId: string | number,
    snippetId: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  );

  removeNote(
    projectId: string | number,
    snippetId: string | number,
    discussionId: string | number,
    noteId: number,
    options?: Sudo,
  );

  show(
    projectId: string | number,
    snippetId: string | number,
    discussionId: string | number,
    options?: Sudo,
  );
}

export class ProjectSnippetDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'snippets', options);
  }
}
