import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions } from '../templates';
import type {
  DiscussionNotePositionSchema,
  DiscussionNoteSchema,
  DiscussionSchema,
} from '../templates/ResourceDiscussions';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  Either,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';

export interface MergeRequestDiscussionNoteSchema extends DiscussionNoteSchema {
  resolved_by: string;
  resolved_at: string;
  position?: DiscussionNotePositionSchema;
}

export type DiscussionNotePositionOptions = DiscussionNotePositionSchema & {
  line_range?: {
    start?: {
      line_code: string;
      type: 'new' | 'old';
    };
    end?: {
      line_code: string;
      type: 'new' | 'old';
    };
  };
};

export interface MergeRequestDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  addNote<E extends boolean = false>(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string,
    noteId: number,
    body: string,
    options?: { createdAt?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestDiscussionNoteSchema, C, E, void>>;

  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestId: string | number,
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DiscussionSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    mergerequestId: string | number,
    body: string,
    options?: {
      position?: DiscussionNotePositionOptions;
      commitId?: string;
      createdAt?: string;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>>;

  editNote<E extends boolean = false>(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string,
    noteId: number,
    options: Sudo & ShowExpanded<E> & Either<{ body: string }, { resolved: boolean }>,
  ): Promise<GitlabAPIResponse<MergeRequestDiscussionNoteSchema, C, E, void>>;

  removeNote<E extends boolean = false>(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string,
    noteId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  resolve<E extends boolean = false>(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string,
    resolve: boolean,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    mergerequestId: string | number,
    discussionId: string,
    options?: Sudo & ShowExpanded<E>,
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
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>> {
    return RequestHelper.put<DiscussionSchema>()(
      this,
      endpoint`${projectId}/merge_requests/${mergerequestId}/discussions/${discussionId}`,
      {
        searchParams: { resolved },
        ...options,
      },
    );
  }
}
