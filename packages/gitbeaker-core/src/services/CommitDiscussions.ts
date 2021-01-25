import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface CommitDiscussions<C extends boolean> extends ResourceDiscussions<C> {
  addNote(
    projectId: string | number,
    commitId: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  );

  all(projectId: string | number, commitId: string | number, options?: PaginatedRequestOptions);

  create(
    projectId: string | number,
    commitId: string | number,
    content: string,
    options?: BaseRequestOptions,
  );

  editNote(
    projectId: string | number,
    commitId: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  );

  removeNote(
    projectId: string | number,
    commitId: string | number,
    discussionId: string | number,
    noteId: number,
    options?: Sudo,
  );

  show(
    projectId: string | number,
    commitId: string | number,
    discussionId: string | number,
    options?: Sudo,
  );
}

export class CommitDiscussions<C extends boolean> extends ResourceDiscussions<C> {
  constructor(options: BaseServiceOptions<C>) {
    super('projects', 'repository/commits', options);
  }
}
