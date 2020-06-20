import { ResourceNotes } from '../templates';
import { GetResponse } from '../infrastructure/RequestHelper';
import {
  BaseServiceOptions,
  PaginatedRequestOptions,
  BaseRequestOptions,
  Sudo,
} from '../infrastructure';

export interface EpicNotes extends ResourceNotes {
  all(
    groupId: string | number,
    epicId: string | number,
    options: PaginatedRequestOptions,
  ): Promise<GetResponse>;

  create(
    groupId: string | number,
    epicId: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<object>;

  edit(
    groupId: string | number,
    epicId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<object>;

  remove(
    groupId: string | number,
    epicId: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<object>;

  show(
    groupId: string | number,
    epicId: string | number,
    noteId: number,
    options?: Sudo,
  ): Promise<GetResponse>;
}

export class EpicNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions) {
    super('groups', 'epics', options);
  }
}
