import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { AwardEmojiSchema } from '../templates/ResourceAwardEmojis';

import { ResourceAwardEmojis } from '../templates';

export interface EpicAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    epicId: string | number,
    issueIId: number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema[], C, E, P>>;

  award<E extends boolean = false>(
    epicId: string | number,
    issueIId: number,
    name: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>>;

  remove<E extends boolean = false>(
    epicId: string | number,
    issueIId: number,
    awardId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    epicId: string | number,
    issueIId: number,
    awardId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>>;
}

export class EpicAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('epics', 'issues', options);
  }
}
