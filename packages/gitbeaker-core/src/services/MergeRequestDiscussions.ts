import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions } from '../templates';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface MergeRequestDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  addNote(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  );

  all(
    projectId: string | number,
    mergerequestId: string | number,
    options?: PaginatedRequestOptions,
  );

  create(
    projectId: string | number,
    mergerequestId: string | number,
    content: string,
    options?: BaseRequestOptions,
  );

  editNote(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string | number,
    noteId: number,
    content: string,
    options?: BaseRequestOptions,
  );

  removeNote(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string | number,
    noteId: number,
    options?: Sudo,
  );

  show(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string | number,
    options?: Sudo,
  );
}

export class MergeRequestDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('projects', 'merge_requests', options);
  }
}
