import { ResourceAwardEmojis } from '../templates';
import { BaseServiceOptions, PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ProjectSnippetAwardEmojis extends ResourceAwardEmojis {
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

export class ProjectSnippetAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions = {}) {
    super('issues', options);
  }
}
