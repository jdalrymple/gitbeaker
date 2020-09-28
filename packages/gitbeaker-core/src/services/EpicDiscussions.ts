import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface EpicDiscussions extends ResourceDiscussions {
  addNote(
    groupId: string | number,
    epicId: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  );

  all(groupId: string | number, epicId: string | number, options?: PaginatedRequestOptions);

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

export class EpicDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    super('groups', 'epics', options);
  }
}
