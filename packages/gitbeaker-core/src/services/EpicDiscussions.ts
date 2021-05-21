import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions, DiscussionSchema } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface EpicDiscussions extends ResourceDiscussions {
  addNote(
    groupId: string | number,
    epicId: number,
    discussionId: number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<DiscussionSchema>;

  all(
    groupId: string | number,
    epicId: number,
    options?: PaginatedRequestOptions,
  ): Promise<DiscussionSchema[]>;

  create(
    groupId: string | number,
    epicId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<DiscussionSchema>;

  editNote(
    groupId: string | number,
    epicId: number,
    discussionId: number,
    noteId: number,
    options: BaseRequestOptions & { body: string },
  ): Promise<DiscussionSchema>;

  removeNote(
    groupId: string | number,
    epicId: number,
    discussionId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    groupId: string | number,
    epicId: number,
    discussionId: number,
    options?: Sudo,
  ): Promise<DiscussionSchema>;
}

export class EpicDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('groups', 'epics', options);
  }
}
