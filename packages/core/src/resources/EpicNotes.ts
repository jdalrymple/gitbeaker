import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes } from '../templates';
import type { NoteSchema } from '../templates/types';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface EpicNoteSchema extends NoteSchema {
  confidential: boolean;
  file_name: string;
  expires_at: string;
}

export interface EpicNotes<C extends boolean = false> extends ResourceNotes<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    epicId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<EpicNoteSchema[], C, E, P>>;

  create<E extends boolean = false>(
    groupId: string | number,
    epicId: number,
    body: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicNoteSchema, C, E, void>>;

  edit<E extends boolean = false>(
    groupId: string | number,
    epicId: number,
    noteId: number,
    options: { body: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicNoteSchema, C, E, void>>;

  remove<E extends boolean = false>(
    groupId: string | number,
    epicId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    groupId: string | number,
    epicId: number,
    noteId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<EpicNoteSchema, C, E, void>>;
}

export class EpicNotes<C extends boolean = false> extends ResourceNotes<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('groups', 'epics', options);
  }
}
