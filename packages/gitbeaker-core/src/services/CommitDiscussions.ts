import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions, DiscussionSchema } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface CommitDiscussions extends ResourceDiscussions {
  addNote(
    projectId: string | number,
    commitId: number,
    discussionId: number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<DiscussionSchema>;

  all(
    projectId: string | number,
    commitId: number,
    options?: PaginatedRequestOptions,
  ): Promise<DiscussionSchema[]>;

  create(
    projectId: string | number,
    commitId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<DiscussionSchema>;

  editNote(
    projectId: string | number,
    commitId: number,
    discussionId: number,
    noteId: number,
    options: BaseRequestOptions & { body: string },
  ): Promise<DiscussionSchema>;

  removeNote(
    projectId: string | number,
    commitId: number,
    discussionId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    projectId: string | number,
    commitId: number,
    discussionId: number,
    options?: Sudo,
  ): Promise<DiscussionSchema>;
}

export class CommitDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', 'repository/commits', options);
  }
}
