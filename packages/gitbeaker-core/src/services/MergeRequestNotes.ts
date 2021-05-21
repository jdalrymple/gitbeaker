import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';
import { ResourceNotes } from '../templates';
import { MergeRequestNoteSchema } from '../models';

export interface MergeRequestNotes<C extends boolean = false> extends ResourceNotes<C> {
  all(
    projectId: string | number,
    mergerequestId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, MergeRequestNoteSchema>[]>;

  create(
    projectId: string | number,
    mergerequestId: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MergeRequestNoteSchema>>;

  edit(
    projectId: string | number,
    mergerequestId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, MergeRequestNoteSchema>>;

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
  ): Promise<CamelizedRecord<C, MergeRequestNoteSchema>>;
}

export class MergeRequestNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'merge_requests', options);
  }
}
