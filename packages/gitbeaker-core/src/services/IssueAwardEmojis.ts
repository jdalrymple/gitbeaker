import { ResourceAwardEmojis } from '../templates';
import { BaseServiceOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface IssueAwardEmojis extends ResourceAwardEmojis {
  all(
    projectId: string | number,
    issueId: string | number,
    noteId: number,
    options?: PaginatedRequestOptions,
  );

  award(
    projectId: string | number,
    issueId: string | number,
    name: string,
    noteId: number,
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

export class IssueAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions = {}) {
    super('issues', options);
  }
}
