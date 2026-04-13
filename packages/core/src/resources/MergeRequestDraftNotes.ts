import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  BaseRequestSearchParams,
  Camelize,
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import type { DiscussionNotePositionSchema } from '../templates/ResourceDiscussions';

export type MergeRequestDraftNotePositionSchema = DiscussionNotePositionSchema & {
  line_range?: number;
};
export interface MergeRequestDraftNoteSchema extends Record<string, unknown> {
  id: number;
  author_id: number;
  merge_request_id: number;
  resolve_discussion: boolean;
  discussion_id?: number;
  note: string;
  commit_id?: number;
  line_code?: number;
  position: MergeRequestDraftNotePositionSchema;
}

export class MergeRequestDraftNotes<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    projectId: string | number,
    mergerequestIId: number,
    options?: PaginationRequestOptions<P> & BaseRequestSearchParams & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestDraftNoteSchema[], C, E, P>> {
    const { sudo, showExpanded, maxPages, ...searchParams } = options || {};

    return RequestHelper.get<MergeRequestDraftNoteSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes`,
      {
        sudo,
        showExpanded,
        maxPages,
        searchParams
      },
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    note: string,
    options?: {
      commitId?: string;
      inReplyToDiscussionId?: number;
      resolveDiscussion?: boolean;
      position?: Camelize<MergeRequestDraftNotePositionSchema>;
    } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestDraftNoteSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<MergeRequestDraftNoteSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes`,
      {
        sudo,
        showExpanded,
        body: { ...body, note },
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    draftNoteId: number,
    options?: { note?: string; position?: Camelize<MergeRequestDraftNotePositionSchema> } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestDraftNoteSchema, C, E, void>> {
    const { sudo, showExpanded, ...body } = options || {};

    return RequestHelper.post<MergeRequestDraftNoteSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes/${draftNoteId}`,
      {
        sudo,
        showExpanded,
        body,
      },
    );
  }

  publish<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    draftNoteId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestDraftNoteSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.put<MergeRequestDraftNoteSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes/${draftNoteId}/publish`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  publishBulk<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestDraftNoteSchema[], C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.post<MergeRequestDraftNoteSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes/bulk_publish`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    draftNoteId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes/${draftNoteId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    draftNoteId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestDraftNoteSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<MergeRequestDraftNoteSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes/${draftNoteId}`,
      {
        sudo,
        showExpanded,
      },
    );
  }
}
