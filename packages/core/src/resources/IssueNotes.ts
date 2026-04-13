import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { NoteSchema } from '../templates/ResourceNotes';
import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes } from '../templates';

export interface IssueNoteSchema extends NoteSchema {
  noteable_type: 'Issue';
}

export interface IssueNotes<C extends boolean = false> extends ResourceNotes<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    issueIId: number,
    options?: {
      sort?: 'asc' | 'desc';
      orderBy?: 'created_at' | 'updated_at';
    } & BaseRequestSearchParams &
      PaginationRequestOptions<P> &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<IssueNoteSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    body: string,
    options?: { internal?: boolean; createdAt?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueNoteSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    options: { body?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueNoteSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<IssueNoteSchema, C, E, void>>;
}

export class IssueNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'issues', options);
  }
}
