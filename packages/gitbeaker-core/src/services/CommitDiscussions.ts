import { ResourceDiscussions } from '../templates';
import {
  BaseRequestOptions,
  BaseServiceOptions,
  PaginatedRequestOptions,
  Sudo,
} from '../infrastructure';

export interface CommitDiscussions extends ResourceDiscussions {
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

export class CommitDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('projects', 'repository/commits', options);
  }
}
