import { ResourceAwardEmojis } from '../templates';
import { BaseServiceOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface MergeRequestAwardEmojis extends ResourceAwardEmojis {
  all(
    projectId: string | number,
    mergerequestId: string | number,
    noteId: number,
    options?: PaginatedRequestOptions,
  );

  award(
    projectId: string | number,
    mergerequestId: string | number,
    noteId: number,
    name: string,
    options?: Sudo,
  );

  remove(
    projectId: string | number,
    mergerequestId: string | number,
    awardId: number,
    noteId: number,
    options?: Sudo,
  );

  show(
    projectId: string | number,
    mergerequestId: string | number,
    awardId: number,
    noteId: number,
    options?: Sudo,
  );
}

export class MergeRequestAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions = {}) {
    super('merge_requests', options);
  }
}
