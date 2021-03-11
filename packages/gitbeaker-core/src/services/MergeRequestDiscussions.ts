import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions } from '../templates';
import { DiscussionSchema } from '../templates/ResourceDiscussions';
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
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  all(
    projectId: string | number,
    issueId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>[]>;

  create(
    projectId: string | number,
    mergerequestId: string | number,
    content: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  editNote(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  removeNote(
    projectId: string | number,
    issueId: string | number,
    discussionId: string | number,
    noteId: number,
    options?: Sudo,
  );

  show(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string | number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;
}

export class MergeRequestDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', 'merge_requests', options);
  }
}
