import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { AwardEmojiSchema } from '../models';
import { PaginatedRequestOptions, CamelizedRecord, Sudo } from '../infrastructure';
import { ResourceNoteAwardEmojis } from '../templates';

export interface IssueNoteAwardEmojis<C extends boolean = false>
  extends ResourceNoteAwardEmojis<C> {
  all(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    options?: PaginatedRequestOptions,
  ): Promise<CamelizedRecord<C, AwardEmojiSchema>[]>;

  award(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    name: string,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, AwardEmojiSchema>>;

  remove(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    awardId: number,
    options?: Sudo,
  ): Promise<void>;

  show(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    awardId: number,
    options?: Sudo,
  ): Promise<CamelizedRecord<C, AwardEmojiSchema>>;
}

export class IssueNoteAwardEmojis<C extends boolean = false> extends ResourceNoteAwardEmojis<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('issues', options);
  }
}
