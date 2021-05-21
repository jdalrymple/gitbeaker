import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes, NoteSchema } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface EpicNoteSchema extends NoteSchema {
  file_name: string;
  expires_at: string;
}

export interface EpicNotes extends ResourceNotes {
  all(
    groupId: string | number,
    epicId: number,
    options?: PaginatedRequestOptions,
  ): Promise<EpicNoteSchema[]>;

  create(
    groupId: string | number,
    epicId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<EpicNoteSchema>;

  edit(
    groupId: string | number,
    epicId: number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<EpicNoteSchema>;

  remove(groupId: string | number, epicId: number, noteId: number, options?: Sudo): Promise<void>;

  show(
    groupId: string | number,
    epicId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<EpicNoteSchema>;
}

export class EpicNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('groups', 'epics', options);
  }
}
