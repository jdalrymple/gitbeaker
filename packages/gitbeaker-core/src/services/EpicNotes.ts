import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes, NoteSchema } from '../templates';
import {
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';

export interface EpicNoteSchema
  extends Exclude<
    NoteSchema,
    'attachment' | 'system' | 'noteable_id' | 'noteable_type' | 'noteable_iid' | 'resolvable'
  > {
  file_name: string;
  expires_at: string;
}

export interface EpicNotes<C extends boolean = false> extends ResourceNotes<C> {
  all(
    groupId: string | number,
    epicId: number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, EpicNoteSchema>[]>;

  create(
    groupId: string | number,
    epicId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, EpicNoteSchema>>;

  edit(
    groupId: string | number,
    epicId: number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, EpicNoteSchema>>;

  remove(groupId: string | number, epicId: number, noteId: number, options?: Sudo): Promise<void>;

  show(
    groupId: string | number,
    epicId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, EpicNoteSchema>>;
}

export class EpicNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseServiceOptions<C>) {
    super('groups', 'epics', options);
  }
}
