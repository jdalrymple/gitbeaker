import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { DiscussionSchema } from '../models';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';
import { ResourceDiscussions } from '../templates';

export interface IssueDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  addNote(
    projectId: string | number,
    issueIId: number,
    discussionId: number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  all(
    projectId: string | number,
    issueIId: number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>[]>;

  create(
    projectId: string | number,
    issueIId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  editNote(
    projectId: string | number,
    issueIId: number,
    discussionId: number,
    noteId: number,
    options: BaseRequestOptions & { body: string },
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  removeNote(
    projectId: string | number,
    issueIId: number,
    discussionId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    projectId: string | number,
    issueIId: number,
    discussionId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;
}

export class IssueDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'issues', options);
  }
}
