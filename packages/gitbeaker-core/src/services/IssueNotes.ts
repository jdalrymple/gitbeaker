import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { NoteSchema } from '../models';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';
import { ResourceNotes } from '../templates';

export interface IssueNoteSchema extends NoteSchema {
  attachment?: string;
  system: boolean;
  noteable_id: number;
  noteable_type: string;
  noteable_iid: number;
  resolvable: boolean;
}

export interface IssueNotes<C extends boolean = false> extends ResourceNotes<C> {
  all(
    projectId: string | number,
    issueIId: number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, IssueNoteSchema>[]>;

  create(
    projectId: string | number,
    issueIId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, IssueNoteSchema>>;

  edit(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, IssueNoteSchema>>;

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
  ): Promise<CamelizedRecord<C, IssueNoteSchema>>;
}

export class IssueNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'issues', options);
  }
}
