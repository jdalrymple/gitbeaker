import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  DiscussionNotePositionOptions,
  DiscussionNoteSchema,
  DiscussionSchema,
} from '../templates/ResourceDiscussions';

import {
  type GitlabAPIResponse,
  type PaginationRequestOptions,
  type PaginationTypes,
  RawPathSegment,
  type ShowExpanded,
  type Sudo,
} from '../infrastructure';
import { ResourceDiscussions } from '../templates';

export interface CommitDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  addNote<E extends boolean = false>(
    projectId: string | number,
    commitId: string,
    discussionId: string,
    body: string,
    options?: { createdAt?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DiscussionNoteSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    commitId: string,
    options?: PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DiscussionSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    commitId: string,
    body: string,
    options?: {
      position?: DiscussionNotePositionOptions;
      commitId?: string;
      createdAt?: string;
    } & ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>>;

  editNote<E extends boolean = false>(
    projectId: string | number,
    commitId: string,
    discussionId: string,
    noteId: number,
    options?: { body?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DiscussionNoteSchema, C, E, void>>;

  removeNote<E extends boolean = false>(
    projectId: string | number,
    commitId: string,
    discussionId: string,
    noteId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    commitId: string,
    discussionId: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>>;
}

export class CommitDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', new RawPathSegment('repository/commits'), options);
  }
}
