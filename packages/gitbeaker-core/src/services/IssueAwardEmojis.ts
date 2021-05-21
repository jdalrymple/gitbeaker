import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { AwardEmojiSchema } from '../models';
import { PaginatedRequestOptions, Sudo, CamelizedRecord } from '../infrastructure';
import { ResourceAwardEmojis } from '../templates';

export interface IssueAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  all(
    projectId: string | number,
    issueIId: number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, AwardEmojiSchema>[]>;

  award(
    projectId: string | number,
    issueIId: number,
    name: string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, AwardEmojiSchema>>;

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
  ): Promise<CamelizedRecord<C, AwardEmojiSchema>>;
}

export class IssueAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('issues', options);
  }
}
