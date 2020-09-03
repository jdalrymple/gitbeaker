import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface IssueNotes extends ResourceNotes {
  all(projectId: string | number, issueId: string | number, options?: PaginatedRequestOptions);

  create(
    projectId: string | number,
    issueId: string | number,
    body: string,
    options?: BaseRequestOptions,
  );

  edit(
    projectId: string | number,
    issueId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  );

  remove(projectId: string | number, issueId: string | number, noteId: number, options?: Sudo);

  show(projectId: string | number, issueId: string | number, noteId: number, options?: Sudo);
}

export class IssueNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'issues', options);
  }
}
