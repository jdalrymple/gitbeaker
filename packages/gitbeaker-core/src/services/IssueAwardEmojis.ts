import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceAwardEmojis, AwardEmojiSchema } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface IssueAwardEmojis extends ResourceAwardEmojis {
  all(
    projectId: string | number,
    issueIId: number,
    options?: PaginatedRequestOptions,
  ): Promise<AwardEmojiSchema[]>;

  award(
    projectId: string | number,
    issueIId: number,
    name: string,
    options?: Sudo,
  ): Promise<AwardEmojiSchema>;

  remove(
    projectId: string | number,
    issueIId: number,
    awardId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    projectId: string | number,
    issueIId: number,
    awardId: number,
    options?: Sudo,
  ): Promise<AwardEmojiSchema>;
}

export class IssueAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('issues', options);
  }
}
