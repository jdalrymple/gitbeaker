import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type { GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';
import type {
  DiscussionNotePositionSchema,
  DiscussionSchema,
} from '../templates/ResourceDiscussions';

export class VisualReviewDiscussions<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    projectId: string | number,
    mergerequestIId: number,
    body: string,
    options?: { position?: DiscussionNotePositionSchema } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>> {
    return RequestHelper.get<DiscussionSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergerequestIId}/visual_review_discussions`,
      {
        body,
        ...options,
      },
    );
  }
}
