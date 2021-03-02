import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface EpicDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  addNote(
    groupId: string | number,
    epicId: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  );

  all(
    groupId: string | number,
    epicId: string | number,
    options?: PaginatedRequestOptions<'keyset' | 'offset'>,
  );

  create(
    groupId: string | number,
    epicId: string | number,
    content: string,
    options?: BaseRequestOptions,
  );

  editNote(
    groupId: string | number,
    epicId: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  );

  removeNote(
    groupId: string | number,
    epicId: string | number,
    discussionId: string | number,
    noteId: number,
    options?: Sudo,
  );

  show(
    groupId: string | number,
    epicId: string | number,
    discussionId: string | number,
    options?: Sudo,
  );
}

export class EpicDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  constructor(options: BaseServiceOptions<C>) {
    super('groups', 'epics', options);
  }
}
