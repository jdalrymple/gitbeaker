import { ResourceDiscussions } from '../templates';
import {
  BaseRequestOptions,
  BaseServiceOptions,
  PaginatedRequestOptions,
  Sudo,
} from '../infrastructure';

export interface MergeRequestDiscussions extends ResourceDiscussions {
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

export class MergeRequestDiscussions extends ResourceDiscussions {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', 'merge_requests', options);
  }
}
