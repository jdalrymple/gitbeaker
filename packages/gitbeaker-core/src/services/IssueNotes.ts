import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes, NoteSchema } from '../templates';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';

export interface IssueNotes<C extends boolean = false> extends ResourceNotes<C> {
  all(
    projectId: string | number,
    issueId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, NoteSchema>[]>;

  create(
    projectId: string | number,
    issueId: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, NoteSchema>>;

  edit(
    projectId: string | number,
    issueId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, NoteSchema>>;

  remove(
    projectId: string | number,
    issueId: string | number,
    noteId: number,
    options?: Sudo,
  );

  show(
    projectId: string | number,
    issueId: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, NoteSchema>>;
}

export class IssueNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', 'issues', options);
  }
}
