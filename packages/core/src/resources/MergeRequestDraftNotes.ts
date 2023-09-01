import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
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
    options?: PaginationRequestOptions<P> & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestDraftNoteSchema[], C, E, P>> {
    return RequestHelper.get<MergeRequestDraftNoteSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes`,
      options,
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
    return RequestHelper.post<MergeRequestDraftNoteSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes`,
      {
        ...options,
        note,
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
    return RequestHelper.post<MergeRequestDraftNoteSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes/${draftNoteId}`,
      options,
    );
  }

  publish<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    draftNoteId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestDraftNoteSchema, C, E, void>> {
    return RequestHelper.put<MergeRequestDraftNoteSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes/${draftNoteId}/publish`,
      options,
    );
  }

  publishBulk<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestDraftNoteSchema[], C, E, void>> {
    return RequestHelper.post<MergeRequestDraftNoteSchema[]>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes/bulk_publish`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    draftNoteId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes/${draftNoteId}`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    draftNoteId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MergeRequestDraftNoteSchema, C, E, void>> {
    return RequestHelper.get<MergeRequestDraftNoteSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/draft_notes/${draftNoteId}`,
      options,
    );
  }
}
