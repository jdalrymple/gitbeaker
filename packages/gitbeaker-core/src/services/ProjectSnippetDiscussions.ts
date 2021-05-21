import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { DiscussionSchema } from '../models';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  Sudo,
  CamelizedRecord,
} from '../infrastructure';
import { ResourceDiscussions } from '../templates';

export interface ProjectSnippetDiscussions<C extends boolean = false>
  extends ResourceDiscussions<C> {
  addNote(
    projectId: string | number,
    snippetId: string | number,
    discussionId: number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  all(
    projectId: string | number,
    issueId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>[]>;

  create(
    projectId: string | number,
    snippetId: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  editNote(
    projectId: string | number,
    snippetId: string | number,
    discussionId: number,
    noteId: number,
    options: BaseRequestOptions & { body: string },
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;

  removeNote(
    projectId: string | number,
    snippetId: string | number,
    discussionId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    projectId: string | number,
    snippetId: string | number,
    discussionId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, DiscussionSchema>>;
}

export class ProjectSnippetDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'snippets', options);
  }
}
