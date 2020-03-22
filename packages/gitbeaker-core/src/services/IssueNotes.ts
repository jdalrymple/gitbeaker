import { ResourceNotes } from '../templates';
import { GetResponse } from '../infrastructure/RequestHelper';
import {
  BaseServiceOptions,
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
} from '../infrastructure';

export interface IssueNotes extends ResourceNotes {
  all(
    projectId: string | number,
    issueId: string | number,
    options: PaginatedRequestOptions,
  ): Promise<GetResponse>;

  create(
    projectId: string | number,
    issueId: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<object>;

  edit(
    projectId: string | number,
    issueId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<object>;

  remove(
    projectId: string | number,
    issueId: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<object>;

  show(
    projectId: string | number,
    issueId: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<GetResponse>;
}

export class IssueNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'issues', options);
  }
}
