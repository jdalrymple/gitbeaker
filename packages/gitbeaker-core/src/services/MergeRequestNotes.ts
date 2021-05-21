import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes, NoteSchema } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface MergeRequestNoteSchema extends NoteSchema {
  attachment?: string;
  system: boolean;
  noteable_id: number;
  noteable_type: string;
  noteable_iid: number;
  resolvable: boolean;
}

export interface MergeRequestNotes extends ResourceNotes {
  all(
    projectId: string | number,
    mergerequestId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<MergeRequestNoteSchema[]>;

  create(
    projectId: string | number,
    mergerequestId: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<MergeRequestNoteSchema>;

  edit(
    projectId: string | number,
    mergerequestId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<MergeRequestNoteSchema>;

  remove(
    projectId: string | number,
    mergerequestId: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    projectId: string | number,
    mergerequestIdepicId: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<MergeRequestNoteSchema>;
}

export class MergeRequestNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', 'merge_requests', options);
  }
}
