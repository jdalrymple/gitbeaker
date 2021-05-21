import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceAwardEmojis, AwardEmojiSchema } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface ProjectSnippetAwardEmojis extends ResourceAwardEmojis {
  all(
    projectId: string | number,
    snippetIId: number,
    options?: PaginatedRequestOptions,
  ): Promise<AwardEmojiSchema[]>;

  award(
    projectId: string | number,
    snippetIId: number,
    name: string,
    options?: Sudo,
  ): Promise<AwardEmojiSchema>;

  remove(
    projectId: string | number,
    snippetIId: number,
    awardId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    projectId: string | number,
    snippetIId: number,
    awardId: number,
    options?: Sudo,
  ): Promise<AwardEmojiSchema>;
}

export class ProjectSnippetAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('snippets', options);
  }
}
