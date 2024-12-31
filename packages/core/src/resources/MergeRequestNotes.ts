import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes } from '../templates';
import type { NoteSchema } from '../templates/ResourceNotes';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface MergeRequestNoteSchema extends NoteSchema {
  noteable_type: 'MergeRequest';
}

export interface MergeRequestNotes<C extends boolean = false> extends ResourceNotes<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestIId: number,
    options?: {
      sort?: 'asc' | 'desc';
      orderBy?: 'created_at' | 'updated_at';
    } & PaginationRequestOptions<P> &
      Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestNoteSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    body: string,
    options?: { mergeRequestDiffSha?: string; createdAt?: string; internal?: boolean } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestNoteSchema, C, E, void>>;

  edit<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    noteId: number,
    options: { body: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestNoteSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    noteId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestNoteSchema, C, E, void>>;
}

export class MergeRequestNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'merge_requests', options);
  }
}
