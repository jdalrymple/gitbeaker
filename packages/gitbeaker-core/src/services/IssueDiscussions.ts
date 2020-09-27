import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface IssueDiscussions extends ResourceDiscussions {
  addNote(
    projectId: string | number,
    issueId: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  );

  all(projectId: string | number, issueId: string | number, options?: PaginatedRequestOptions);

  create(
    projectId: string | number,
    issueId: string | number,
    content: string,
    options?: BaseRequestOptions,
  );

  editNote(
    projectId: string | number,
    issueId: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  );

  removeNote(
    projectId: string | number,
    issueId: string | number,
    discussionId: string | number,
    noteId: number,
    options?: Sudo,
  );

  show(
    projectId: string | number,
    issueId: string | number,
    discussionId: string | number,
    options?: Sudo,
  );
}

export class IssueDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'issues', options);
  }
}
