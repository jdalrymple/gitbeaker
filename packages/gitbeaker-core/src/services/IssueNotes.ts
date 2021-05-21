import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes, NoteSchema } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface IssueNoteSchema extends NoteSchema {
  attachment?: string;
  system: boolean;
  noteable_id: number;
  noteable_type: string;
  noteable_iid: number;
  resolvable: boolean;
}

export interface IssueNotes extends ResourceNotes {
  all(
    projectId: string | number,
    issueIId: number,
    options?: PaginatedRequestOptions,
  ): Promise<IssueNoteSchema[]>;

  create(
    projectId: string | number,
    issueIId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<IssueNoteSchema>;

  edit(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<IssueNoteSchema>;

  remove(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<IssueNoteSchema>;
}

export class IssueNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', 'issues', options);
  }
}
