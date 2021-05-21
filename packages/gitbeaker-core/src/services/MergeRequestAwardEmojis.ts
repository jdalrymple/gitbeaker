import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceAwardEmojis, AwardEmojiSchema } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface MergeRequestAwardEmojis extends ResourceAwardEmojis {
  all(
    projectId: string | number,
    mergerequestIId: number,
    options?: PaginatedRequestOptions,
  ): Promise<AwardEmojiSchema[]>;

  award(
    projectId: string | number,
    mergerequestIId: number,
    name: string,
    options?: Sudo,
  ): Promise<AwardEmojiSchema>;

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
  ): Promise<AwardEmojiSchema>;
}

export class MergeRequestAwardEmojis extends ResourceAwardEmojis {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('merge_requests', options);
  }
}
