import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceAwardEmojis } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface MergeRequestAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
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

export class MergeRequestAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('merge_requests', options);
  }
}
