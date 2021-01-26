import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceAwardEmojis } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface IssueAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  all(
    projectId: string | number,
    issueId: string | number,
    noteId: number,
    options?: PaginatedRequestOptions,
  );

  award(
    projectId: string | number,
    issueId: string | number,
    noteId: number,
    name: string,
    options?: Sudo,
  );

  remove(
    projectId: string | number,
    issueId: string | number,
    awardId: number,
    noteId: number,
    options?: Sudo,
  );

  show(
    projectId: string | number,
    issueId: string | number,
    awardId: number,
    noteId: number,
    options?: Sudo,
  );
}

export class IssueAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  constructor(options: BaseServiceOptions<C> = {}) {
    super('issues', options);
  }
}
