import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceNoteAwardEmojis, AwardEmojiSchema } from '../templates';
import { PaginatedRequestOptions, Sudo } from '../infrastructure';

export interface IssueNoteAwardEmojis extends ResourceNoteAwardEmojis {
  all(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    options?: PaginatedRequestOptions,
  ): Promise<AwardEmojiSchema[]>;

  award(
    projectId: string | number,
    issueIId: number,
    noteId: number,
    name: string,
    options?: Sudo,
  ): Promise<AwardEmojiSchema>;

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
  ): Promise<AwardEmojiSchema>;
}

export class IssueNoteAwardEmojis extends ResourceNoteAwardEmojis {
  constructor(options: BaseServiceOptions) {
    /* istanbul ignore next */
    super('issues', options);
  }
}
