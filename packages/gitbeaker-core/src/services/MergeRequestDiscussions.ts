import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions, DiscussionSchema } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface MergeRequestDiscussions extends ResourceDiscussions {
  addNote(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: number,
    noteId: number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<DiscussionSchema>;

  all(
    projectId: string | number,
    issueId: string | number,
    options?: PaginatedRequestOptions,
  ): Promise<DiscussionSchema[]>;

  create(
    projectId: string | number,
    mergerequestId: string | number,
    body: string,
    options?: BaseRequestOptions,
  ): Promise<DiscussionSchema>;

  editNote(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: number,
    noteId: number,
    options: BaseRequestOptions & ({ body: string } | { resolved: boolean }),
  ): Promise<DiscussionSchema>;

  removeNote(
    projectId: string | number,
    issueId: string | number,
    discussionId: number,
    noteId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: number,
    options?: Sudo,
  ): Promise<DiscussionSchema>;
}

export class MergeRequestDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('projects', 'merge_requests', options);
  }
}
