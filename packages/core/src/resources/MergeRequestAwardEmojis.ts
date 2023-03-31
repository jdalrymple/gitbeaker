import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceAwardEmojis } from '../templates';
import type { AwardEmojiSchema } from '../templates/types';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface MergeRequestAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestIId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema[], C, E, P>>;

  award<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    awardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    awardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>>;
}

export class MergeRequestAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'merge_requests', options);
  }
}
