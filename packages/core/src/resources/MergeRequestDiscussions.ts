import type { BaseResourceOptions } from '@gitbeaker/requester-utils';

import type {
  BaseRequestSearchParams,
  GitlabAPIResponse,
  OneOf,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type {
  DiscussionNotePositionOptions,
  DiscussionNotePositionSchema,
  DiscussionNoteSchema,
  DiscussionSchema,
} from '../templates/ResourceDiscussions';

import { RequestHelper, endpoint } from '../infrastructure';
import { ResourceDiscussions } from '../templates';

export interface MergeRequestDiscussionNoteSchema extends DiscussionNoteSchema {
  resolved_by: string;
  resolved_at: string;
  position?: DiscussionNotePositionSchema;
}

export type MergeRequestDiscussionNotePositionOptions = {
  lineRange?: {
    start?: {
      lineCode: string;
      type: 'new' | 'old';
    };
    end?: {
      lineCode: string;
      type: 'new' | 'old';
    };
  };
} & DiscussionNotePositionOptions;

export interface MergeRequestDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  addNote<E extends boolean = false>(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string,
    body: string,
    options?: { createdAt?: string } & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestDiscussionNoteSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestId: string | number,
    options?: BaseRequestSearchParams & PaginationRequestOptions<P> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DiscussionSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    mergerequestId: string | number,
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
    mergerequestId: string | number,
    discussionId: string,
    noteId: number,
    options: OneOf<{ body: string; resolved: boolean }> & ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<MergeRequestDiscussionNoteSchema, C, E, void>>;

  removeNote<E extends boolean = false>(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string,
    noteId: number,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  resolve<E extends boolean = false>(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string,
    resolve: boolean,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>>;
}

export class MergeRequestDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'merge_requests', options);
  }

  resolve<E extends boolean = false>(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string,
    resolved: boolean,
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<DiscussionSchema>()(
      this,
      endpoint`${projectId}/merge_requests/${mergerequestId}/discussions/${discussionId}`,
      {
        sudo,
        showExpanded,
        searchParams: { resolved },
      },
    );
  }
}
