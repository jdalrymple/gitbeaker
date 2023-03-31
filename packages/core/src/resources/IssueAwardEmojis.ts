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

export interface IssueAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    issueIId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema[], C, E, P>>;

  award<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    awardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    awardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>>;
}

export class IssueAwardEmojis<C extends boolean = false> extends ResourceAwardEmojis<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'issues', options);
  }
}
