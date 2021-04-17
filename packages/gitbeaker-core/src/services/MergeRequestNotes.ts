import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes, NoteSchema } from '../templates/ResourceNotes';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';

export interface MergeRequestNotes<C extends boolean = false> extends ResourceNotes<C> {
  all(
    projectId: string | number,
    mergerequestId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, NoteSchema>[]>;

  create(
    projectId: string | number,
    mergerequestId: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, NoteSchema>>;

  edit(
    projectId: string | number,
    mergerequestId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, NoteSchema>>;

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
  ): Promise<CamelizedRecord<C, NoteSchema>>;
}

export class MergeRequestNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', 'merge_requests', options);
  }
}
