import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceAwardEmojis, AwardEmojiSchema } from '../templates';
import { PaginatedRequestOptions, Sudo, CamelizedRecord } from '../infrastructure';

export interface MergeRequestAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  all(
    projectId: string | number,
    mergerequestIId: number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, AwardEmojiSchema>[]>;

  award(
    projectId: string | number,
    mergerequestIId: number,
    name: string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, AwardEmojiSchema>>;

  remove(
    projectId: string | number,
    mergerequestIId: number,
    awardId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    projectId: string | number,
    mergerequestIId: number,
    awardId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, AwardEmojiSchema>>;
}

export class MergeRequestAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('merge_requests', options);
  }
}
