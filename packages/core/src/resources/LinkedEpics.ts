import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, endpoint } from '../infrastructure';
import type {
  GitlabAPIResponse,
  PaginationRequestOptions,
  PaginationTypes,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { EpicSchema } from './Epics';

export interface RelatedEpicSchema extends EpicSchema {
  related_epic_link_id: number;
}

export interface RelatedEpicLinkSchema extends Record<string, unknown> {
  source_epic: RelatedEpicSchema;
  target_epic: RelatedEpicSchema;
}

export type RelatedEpicLinkType = 'relates_to' | 'blocks' | 'is_blocked_by';

export class LinkedEpics<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends PaginationTypes = 'offset'>(
    groupId: string | number,
    epicIId: number,
    options?: Sudo & ShowExpanded<E> & PaginationRequestOptions<P>,
  ): Promise<GitlabAPIResponse<RelatedEpicSchema[], C, E, P>> {
    return RequestHelper.get<RelatedEpicSchema[]>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/related_epics`,
      options,
    );
  }

  create<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    targetEpicIId: string | number,
    targetGroupId: string | number,
    options?: { link_type?: RelatedEpicLinkType } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RelatedEpicLinkSchema, C, E, void>> {
    return RequestHelper.post<RelatedEpicLinkSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/related_epics`,
      {
        searchParams: {
          targetGroupId,
          targetEpicIId,
        },
        ...options,
      },
    );
  }

  remove<E extends boolean = false>(
    groupId: string | number,
    epicIId: number,
    relatedEpicLinkId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<RelatedEpicLinkSchema, C, E, void>> {
    return RequestHelper.del<RelatedEpicLinkSchema>()(
      this,
      endpoint`groups/${groupId}/epics/${epicIId}/related_epics/${relatedEpicLinkId}`,
      options,
    );
  }
}
