import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { DiscussionSchema } from '../models';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';
import { ResourceDiscussions } from '../templates';

export interface EpicDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  addNote(
    groupId: string | number,
    epicId: number,
    discussionId: number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  all(
    groupId: string | number,
    epicId: number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>[]>;

  create(
    groupId: string | number,
    epicId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  editNote(
    groupId: string | number,
    epicId: number,
    discussionId: number,
    noteId: number,
    options: BaseRequestOptions & { body: string },
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

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
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;
}

export class EpicDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('groups', 'epics', options);
  }
}
