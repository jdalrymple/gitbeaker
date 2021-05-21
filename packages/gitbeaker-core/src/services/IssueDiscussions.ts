import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions, DiscussionSchema } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface IssueDiscussions extends ResourceDiscussions {
  addNote(
    projectId: string | number,
    issueIId: number,
    discussionId: number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<DiscussionSchema>;

  all(
    projectId: string | number,
    issueIId: number,
    options?: PaginatedRequestOptions,
  ): Promise<DiscussionSchema[]>;

  create(
    projectId: string | number,
    issueIId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<DiscussionSchema>;

  editNote(
    projectId: string | number,
    issueIId: number,
    discussionId: number,
    noteId: number,
    options: BaseRequestOptions & { body: string },
  ): Promise<DiscussionSchema>;

  removeNote(
    projectId: string | number,
    issueIId: number,
    discussionId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    projectId: string | number,
    issueIId: number,
    discussionId: number,
    options?: Sudo,
  ): Promise<DiscussionSchema>;
}

export class IssueDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', 'issues', options);
  }
}
