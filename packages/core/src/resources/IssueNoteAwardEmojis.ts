import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceNoteAwardEmojis } from '../templates';
import type { AwardEmojiSchema } from '../templates/types';
import type {
  BaseRequestOptions,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface IssueNoteAwardEmojis<C extends boolean = false>
  extends ResourceNoteAwardEmojis<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    options?: PaginationRequestOptions<P> & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema[], C, E, P>>;

  award<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    name: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>>;

  remove<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    awardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    awardId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<AwardEmojiSchema, C, E, void>>;
}

export class IssueNoteAwardEmojis<C extends boolean = false> extends ResourceNoteAwardEmojis<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('issues', options);
  }
}
