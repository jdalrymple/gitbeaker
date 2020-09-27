import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNotes } from '../templates';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo } from '../infrastructure';

export interface EpicNotes extends ResourceNotes {
  all(groupId: string | number, epicId: string | number, options?: PaginatedRequestOptions);

  create(
    groupId: string | number,
    epicId: string | number,
    body: string,
    options?: BaseRequestOptions,
  );

  edit(
    groupId: string | number,
    epicId: string | number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  );

  remove(groupId: string | number, epicId: string | number, noteId: number, options?: Sudo);

  show(groupId: string | number, epicId: string | number, noteId: number, options?: Sudo);
}

export class EpicNotes extends ResourceNotes {
  constructor(options: BaseServiceOptions) {
    super('groups', 'epics', options);
  }
}
