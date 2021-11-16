import { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions } from '../templates';
import { DiscussionSchema } from '../templates/types';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';

export interface MergeRequestDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  addNote(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  all(
    projectId: string | number,
    mergerequestId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>[]>;

  create(
    projectId: string | number,
    mergerequestId: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  editNote(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: number,
    noteId: number,
    options: BaseRequestOptions & ({ body: string } | { resolved: boolean }),
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  removeNote(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;
}

export class MergeRequestDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'merge_requests', options);
  }
}
